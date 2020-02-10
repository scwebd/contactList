const { Contact } = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and display them as JSON
	app.get("/api/contacts", (req, res) => {
        Contact.findAll({}).then(contacts => {
			res.json(contacts);
		}).catch(err => {
            console.log(err.message);
            res.status(500).send(err.message);
        });
	});

    // this route should add a new contact to the table
    app.post("/api/contacts", (req, res) => {
        req.body.phoneNumber = req.body.phoneNumber || null;
        req.body.emailAddress = req.body.emailAddress || null;

		Contact.create(req.body).then(newContact => {
			console.log("New contact:");
            console.log(newContact);
            res.json(newContact);
		}).catch(err => {
            console.log(err.message);
            res.status(422).send(err.message);
        });
    });
    
    // this route should delete a contact from the table, if the id matches the ':id' url param
	app.delete("/api/contacts/:id", (req, res) => {
		Contact.destroy({
			where: {
				id: req.params.id
			}
		}).then(deletedContact => {
			console.log(deletedContact);
			res.json(deletedContact);
        }).catch(err => {
            console.log(err.message);
            res.status(500).send(err.message);
        });
	});
}