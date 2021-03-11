var express = require('express')
const ValidationError = require('../validationError');

const check = function(country) {
    if (!country.country) {
        throw new ValidationError('The country must have a name.');
    }
    if (!country.abbreviation) {
        throw new ValidationError('The country must have a code.');
    }
}

const getCountryIndex = function(db,id){
    let countries = db.getData("/country");
    let index = countries.findIndex(x => x.id === id)
    return index;
}


module.exports = function(db){
    var router = express.Router()

    router.get('/',function(req,res){
        let countries = db.getData("/country");
        res.status(200).send(countries);
    })

    router.post('/',function(req,res){
        let country = req.body;
        check(country);
        let countries = db.getData("/country")
        let id = Math.max.apply(Math, countries.map(function(x) { return x.id; }))
        country.id = id+1;
        db.push("/country[]", {
            country: country.country,
            abbreviation: country.abbreviation,
            id : country.id
        }, true);
        res.redirect(200,"/country")
    })

    router.get('/:countryId',function(req,res){
        let countries = db.getData("/country");
        let country = countries.find(x => x.id === parseInt(req.params.countryId))

        if(country){
            res.status(200).send(country);
        } else {
            throw new ValidationError('Country not found')
        }
    })

    router.delete('/:countryId',function(req,res){
        let index = getCountryIndex(db,parseInt(req.params.countryId))
        if(index != -1){
            // db.delete("/country["+index+"]");
            db.delete("/country["+index+"]");
            res.location('/country');
            res.status(200).send(null);
        } else {
            throw new ValidationError('Country not found')
        }

    })

    router.put('/:countryId',function(req,res){
        let country = req.body;
        check(country)

        let index = getCountryIndex(db,parseInt(req.params.countryId))
        db.push("/country["+index+"]", {
            country : country.country,
            abbreviation : country.abbreviation,
            id : country.id
        }, true);

        res.status(200).send(null);
    })

    return router;
}
