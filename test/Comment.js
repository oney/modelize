var modelize = require('../lib/index');
var User = require('./User');
var Comment = function() {
}
Comment.mapping = {
	message: "message",
	user: function(userData) {
		return modelize(userData, User);
	},
	createdAt: {
		key: "created_at",
		transformer: function(createdAt) {
			return new Date(createdAt);
		}
	},
};
module.exports = Comment;
