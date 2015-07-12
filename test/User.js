var modelize = require('../lib/index');
var User = function(role) {
	this.role = role;
	this.fullName = function(){
		return this.firstName + " " + this.lastName;
	}
}
User.mapping = {
	firstName: "first_name",
	lastName: "last_name",
	age: "age",
	gender: {
		key: "is_male",
		transformer: function(isMale) {
			return isMale ? "male" : "female";
		}
	}
};
User.modelizeConstructor = function() {
	return new User("Member");
};
module.exports = User;
