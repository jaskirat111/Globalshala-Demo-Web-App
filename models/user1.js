var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = mongoose.Schema({
	
	// facebook: {
	// 	id: String,
	// 	token: String,
	// 	email: String,
	// 	name: String
	// },
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

// userSchema.methods.generateHash = function(password){
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// }

// userSchema.methods.validPassword = function(password){
// 	return bcrypt.compareSync(password, this.local.password);
// }

module.exports = mongoose.model('User1', userSchema);