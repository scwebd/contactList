var path = require("path");

module.exports = function(app) {
    // this route should render the Handlebars 'form' template
	app.get("/contacts/new", function(req, res) {
		res.render("form");
    });
    
    // this route should find all contacts in the table and render them using the Handlebars 
    // 'contacts' // template, sorted ascending by firstName
    app.get("/", function(req, res) {
        db.Contact.findAll({
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        }).then(function(contacts) {
            res.render("contacts", { 
                name: "Sarah", 
                contacts: contacts 
            });
        }).catch(function(err) {
            console.log(err);
        });
    });

    // this route should find all contacts of a particular type (Personal or Business) and render them 
    // using the Handlebars 'contacts' template, sorted ascending by firstName
    app.get("/:type", function(req, res) {
        // making the contact type title-cased
        var type = req.params.type.charAt(0).toUpperCase() + req.params.type.substring(1);

        db.Contact.findAll(
            {
                where: { 
                    contactType: req.params.type 
                }
            },
            {
                order: [['firstName', 'ASC'], ['lastName', 'ASC']]
            }
        ).then(function(contacts) {
            res.render("contacts", { 
                name: "Sarah", 
                contacts: contacts, 
                type: type 
            });
        }).catch(function(err) {
            console.log(err);
        });
    });
}