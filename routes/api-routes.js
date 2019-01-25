var db = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and display them as JSON
	app.get("/api/contacts", function(req, res) {
		db.Contact.findAll({}).then(function(contacts) {
			res.json(contacts);
		}).catch(function(err) {
            console.log(err);
        });
	});

    // this route should add a new contact to the table
    app.post("/api/contacts", function(req, res) {
		db.Contact.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			contactType: req.body.contactType,
			phoneNumber: req.body.phoneNumber || null,
			emailAddress: req.body.emailAddress || null
		}).then(function(newContact) {
			console.log("New contact:");
            console.log(newContact);
            res.json(newContact);
		}).catch(function(err) {
            console.log(err);
        });
    });
    
    // this route should delete a contact from the table, if the id matches the ':id' url param
	app.delete("/api/contacts/:id", function(req, res) {
		db.Contact.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(contact) {
			console.log(contact);
			res.json(contact);
        }).catch(function(err) {
            console.log(err);
        });
	});
}