var should = require('chai').should(),
	modelize = require('../lib/index'),
	Post = require('./Post'),
	User = require('./User'),
	Comment = require('./Comment');

describe('modelize', function() {
	it('convert hash to model', function() {
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
		post.user.fullName().should.equal('Howard Yang');

	});
});

