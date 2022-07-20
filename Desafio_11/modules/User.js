const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/UserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

//helpful functions: compare passwords
// UserSchema.methods.comparePassword = function(plaintText, callback) {
//     return callback(null, bcrypt.compareSync(plaintText, this.password));
// }
UserSchema.methods.comparePassword = (password, hash) => {
    let comp = bcrypt.compareSync(password, hash)
    return comp;
}

module.exports = mongoose.model('User', UserSchema)