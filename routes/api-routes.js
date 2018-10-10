var db = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and render them using the Handlebars 
    // 'contacts' // template, sorted ascending by firstName
    app.get("/", function(req, res) {
		db.Contact.findAll({
			order: [['firstName', 'ASC'], ['lastName', 'ASC']]
		}).then(function(contacts) {
			res.render("contacts", { name: "Sarah", contacts: contacts });
		});
    });
    
    // this route should find all contacts of a particular type (Personal or Business) and render them 
    // using the Handlebars 'contacts' template, sorted ascending by firstName
    app.get("/:type", function(req, res) {
        // making the contact type title-cased
        var type = req.params.type.charAt(0).toUpperCase() + req.params.type.substring(1);
        
        db.Contact.findAll(
            {
                where: { contactType: req.params.type }
            },
            {
                order: [['firstName', 'ASC'], ['lastName', 'ASC']]
            }
        ).then(function(contacts) {
            res.render("contacts", { name: "Sarah", contacts: contacts, type: type });
        });
    });

    // this route should find all contacts in the table and display them as JSON
	app.get("/api/contacts", function(req, res) {
		db.Contact.findAll({}).then(function(contacts) {
			res.json(contacts);
		});
	});

    // this route should add a new contact to the table, and should then redirect to the route '/api/contacts'
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
			res.redirect("/api/contacts");
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
		});
	});
}