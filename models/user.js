//passport packages
const bcrypt = require("bcryptjs");

// models for database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

//User schema 
const userSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	userName: { type: String },
	password: { type: String },
}, {
	timestamps: true
});

// Schema methods to check and hash passwords
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');

		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", userSchema);

module.exports = User;
