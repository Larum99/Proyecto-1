const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//requerir esquema de datos
const User = require('..//models/user');

//cuando ya se tiene el usuario se serializa
passport.serializeUser((user, done) => {
    done(null, user);
});

//deserializar
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user.id);
});

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // en caso de que se pidan otros datos como dirección o edad el req permitirá recibirlos y almacenarlos
    // done es un call back funcion que una vez terminado el proceso le envia una respuesta al cliente
}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The email has already taken.'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save(); //async y await código asincrono?
        done(null, newUser); //termina el proceso, devuelve null para error y el usuario guardado, se debe serializar 
    }


})); //recibe 2 parametros, un objeto de configuracion, indica que tipo de dato recibe y un call back de ejecución, esta función es para saber que hacer con los datos, si validarlos...

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // en caso de que se pidan otros datos como dirección o edad el req permitirá recibirlos y almacenarlos
    // done es un call back funcion que una vez terminado el proceso le envia una respuesta al cliente
}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email });
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'No user Found.'));
    }
    if(!user.encryptPassword(password)) { //encrypt porque se está comparando la contrasela cifrada
        return done(null, false, req.flash('signinMessage', 'Incorrect Password.'));
    } 
    done (null, user);
}));