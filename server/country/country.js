var express = require('express')
const ValidationError = require('../validationError');

//function for checking the data
const check = function(country) {
    if (!country.country) {
        throw new ValidationError('The country must have a name.');
    }
    if (!country.abbreviation) {
        throw new ValidationError('The country must have a code.');
    }
}

//function for retrieving the index of a country by its id
const getCountryIndex = function(db,id){
    let countries = db.getData("/country");
    let index = countries.findIndex(x => x.id === id)
    return index;
}

module.exports = function(db){
    var router = express.Router()

    //GET all the countries
    router.get('/',function(req,res){
        let countries = db.getData("/country");
        res.status(200).send(countries);
    })

    //ADD one country
    router.post('/',function(req,res){
        let country = req.body; //recovering the country
        check(country); //checking
        let countries = db.getData("/country") //data
        let id = Math.max.apply(Math, countries.map(function(x) { return x.id; })) //getting the max id
        country.id = id+1; //increment id

        //push in the DB
        db.push("/country[]", {
            country: country.country,
            abbreviation: country.abbreviation,
            id : country.id
        }, true);

        res.redirect(200,"/country")
    })

    //GET a country by its id
    router.get('/:countryId',function(req,res){
        let countries = db.getData("/country"); //getting all the countries
        let country = countries.find(x => x.id === parseInt(req.params.countryId)) //finding the right one

        if(country){
            res.status(200).send(country);
        } else {
            //the country hasn't been found
            throw new ValidationError('Country not found')
        }
    })

    //DELETE a country
    router.delete('/:countryId',function(req,res){
        let index = getCountryIndex(db,parseInt(req.params.countryId))
        if(index != -1){
            db.delete("/country["+index+"]");
            res.location('/country');
            res.status(200).send(null);
        } else {
            //country hasn't been found
            throw new ValidationError('Country not found')
        }

    })

    //PUT a country (update)
    router.put('/:countryId',function(req,res){
        let country = req.body;
        check(country) //checking the country

        let index = getCountryIndex(db,parseInt(req.params.countryId)) //getting the index

        //adding in the DB
        db.push("/country["+index+"]", {
            country : country.country,
            abbreviation : country.abbreviation,
            id : country.id
        }, true);

        res.status(200).send(null);
    })

    //exporting module
    return router;
}
