# MINI PROJET API

👨 Author : Colin RENAUD

## Client

```bash
cd client
npm install && npm start
```

[localhost:3000/](localhost:3000/)

## Server

```bash
cd server
npm install && npm start
```
[localhost:8080/](localhost:8080/)

### Data

source : [country-json](https://github.com/samayo/country-json/blob/master/src/country-by-abbreviation.json)
```json
    {

        country:[
            {
                country : "Azerbaijan",
                abbreviation : "AZ",
                id : 1,
            },
            {
                ...
            }
        ]
    }
```


### Routes

[Swagger documentation](https://app.swaggerhub.com/apis/Polytech-Nantes/NEWDEAL_API/1.0.0#free) (https://app.swaggerhub.com/apis/Polytech-Nantes/NEWDEAL_API/1.0.0#free)

`/country` : `GET` `POST`

`/country/{countryId}` : `GET`, `PUT`, `DELETE`
