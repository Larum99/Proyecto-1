// en este archivo se gestionan las rutas principales

const express = require('express');
const router = express.Router();

const passport = require('passport');

//manejador de peticiones
router.get('/', (req, res, next) => {
    res.render('index');
});

//registro
//envío de ventana para ingreso de datos del usuario
router.get('/signup', (req, res, next) => {
    res.render('signup') //cuando el usuario ingrese a esta ruta el servidor le va a mostrar la vista signup
});

//el servidor escucha los datos ingresados al enviarlos 
/* router.post('/signup', (req, res, next) => {
    console.log(req.body)
    res.send('received')
}) */
router.post('/signup',  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true //para pasar todos los datos que recibe del cliente
})); //local-signup metodo de local-auth

//inicio de sesión
//envío de ventana para ingreso de datos del usuario
router.get('/signin', (req, res, next) => {
    res.render('signin');
});

//el servidor escucha los datos ingresados al enviarlos 
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true //para pasar todos los datos que recibe del cliente
})); //local-signin metodo de local-auth

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

//se usa cuando necesitas autenticar varias rutas, el router.use debe ir antes de dichas rutas 
/* router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
}); */

router.get('/profile', isAuthenticated, (req, res, next) => { /* se usa cuando solo necesitas autenticar en una ruta*/
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
};

module.exports = router;