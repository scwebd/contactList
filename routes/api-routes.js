var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
		// this route should find all contacts in the table and render them using the Handlebars 'contacts' template, sorted ascending by firstName
		db.Contact.findAll({
			order: [['firstName', 'ASC'], ['lastName', 'ASC']]
		}).then(function(contacts) {
			res.render("contacts", { name: "Sarah", contacts: contacts });
		});
	});

	app.get("/api/contacts", function(req, res) {
		// this route should find all contacts in the table and display them as JSON
		db.Contact.findAll({}).then(function(contacts) {
			res.json(contacts);
		});
	});

	app.post("/api/contacts", function(req, res) {
		// this route should add a new contact to the table, and should then redirect to the route '/api/contacts'
		db.Contact.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			contactType: req.body.contactType,
			phoneNumber: req.body.phoneNumber || null,
			emailAddress: req.body.emailAddress || null
		}).then(function(newContact) {
			console.log("New contact:");
			console.log(newContact);
			res.redirect("/api/contacts");
		});
	});

	app.delete("/api/contacts/:id", function(req, res) {
		// this route should delete a contact from the table, if the id matches the ':id' url param
		db.Contact.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(contact) {
			console.log(contact);
			res.json(contact);
		});
	});
}