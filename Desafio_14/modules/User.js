const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
})

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


UserSchema.methods.comparePassword = (password, hash) => {
    let comp = bcrypt.compareSync(password, hash)
    return comp;
}

module.exports = mongoose.model('User', UserSchema)