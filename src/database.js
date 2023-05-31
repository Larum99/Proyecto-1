const mongoose = require('mongoose');
const { mongodb } = require('./keys'); //como keys es un objeto puedo requerir su propiedad mongodb

mongoose.set('strictQuery', true); //para solucionar el error que aparece

mongoose.connect(mongodb.URI, {})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));