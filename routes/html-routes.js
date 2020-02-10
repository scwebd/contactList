const db = require("../models");

module.exports = function(app) {
    // this route should render the Handlebars 'form' template
	app.get("/contacts/new", (req, res) => {
		res.render("form");
    });
    
    // this route should find all contacts in the table and render them using the Handlebars 
    // 'contacts' // template, sorted ascending by firstName
    app.get("/", (req, res) => {
        db.Contact.findAll({
            order: [['firstName', 'ASC'], ['lastName', 'ASC']],
            raw: true
        }).then(contacts => {
            res.render("contacts", { 
                name: "Sarah", 
                contacts: contacts 
            });
        }).catch(err => {
            console.log(err.message);
            res.status(500).json(err.message);
        });
    });

    // this route should find all contacts of a particular type (Personal or Business) and render them 
    // using the Handlebars 'contacts' template, sorted ascending by firstName
    app.get("/:type", (req, res) => {
        // making the contact type title-cased
        var type = req.params.type.charAt(0).toUpperCase() + req.params.type.substring(1);

        db.Contact.findAll({
            order: [['firstName', 'ASC'], ['lastName', 'ASC']],
            raw: true,
            where: { 
                contactType: req.params.type 
            }    
        }).then(contacts => {
            res.render("contacts", { 
                name: "Sarah", 
                contacts: contacts, 
                type: type 
            });
        }).catch(err => {
            console.log(err.message);
            res.status(500).json(err.message);
        });
    });
}