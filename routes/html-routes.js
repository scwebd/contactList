var path = require("path");

module.exports = function(app) {
	app.get("/contacts/new", function(req, res) {
		// this route should render the Handlebars 'form' template
		res.render("form");
	});
}