//construcción del esquema de datos
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

//almacenar datos del cliente
const userSchema = new Schema({
    email: String,
    password: String
});

//método para cifrar constraseña
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

//comparar datos cifrados cuando vuelva a loguearse
userSchema.methods.comparePassword = function (password) {
    bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);