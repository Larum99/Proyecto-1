const express = require('express');
const engine = require('ejs-mate'); //motor de plantillas
const path = require('path'); //modulo para colocar unir directorios, ruta multiplataforma
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

//initializations
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('views', path.join(__dirname, 'views'))//__dirname devuelve la dirección del archivo(ruta desde el sistema operativo hasta la carpeta src) que se ejecuta
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000); //process.env.PORT indica que se utiliza el puerto

//middleware
app.use(morgan('dev')); //puede ser dev, combine, common,done(null, user.id); tiny, entre otras. Distintos formatos para mostrar la infor en consola
app.use(express.urlencoded({ extended: false })) //indicarle a express que recibimos datos desde un formulario. extended:false para indicar que recibe datos simples//done(null, user.id);
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');//variable accesible desde toda la aplicación
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});

//Routes
app.use('/', require('./routes/index'));

//starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});