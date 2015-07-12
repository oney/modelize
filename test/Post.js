var modelize = require('../lib/index');
var User = require('./User');
var Comment = require('./Comment');
var Post = function() {
	this.selected = false;
	this.sticky = false;
}
Post.mapping = {
	title: "title",
	content: "message",
	state: function(state) {
		switch(state) {
		case Post.State.Draft:
			return Post.State.Draft;
			break;
		case Post.State.Published:
			return Post.State.Published;
			break;
		default:
			return Post.State.archived;
		}
	},
	createdAt: {
		key: "created_at",
		transformer: function(createdAt) {
			return new Date(createdAt);
		}
	},
	user: function(user) {
		return modelize(user, User);
	},
	comments: function(comments) {
		return modelize(comments, Comment);
	}
};
Post.State = {
	Draft : 1,
	Published : 2,
	archived : 3
};
module.exports = Post;
