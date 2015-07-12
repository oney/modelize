var modelize = require('./lib/index');
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
}
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

var postData = {
	title: "Hello",
	message: "Let's do something cool",
	state: 1,
	created_at: "2015-07-11 16:34:40.122",
	user: {
		first_name: "Howard",
		last_name: "Yang",
		age: 24,
		is_male: false
	},
	comments: [
		{
			message: "so cool",
			user: {
				first_name: "Andy",
				last_name: "Jackson",
			},
			created_at: "2015-07-11 16:34:40.122"
		},
		{
			message: "good",
			user: {
				first_name: "Julia",
				last_name: "Huang",
			},
			created_at: "2015-06-20 16:34:40.122"
		}
	]
};

var post = modelize(postData, Post);
console.log(post);