// add contact functionality
$("#addContact").on("submit", function(event) {
	event.preventDefault();

	var newContact = {
		firstName: $("#firstName").val().trim(),
		lastName: $("#lastName").val().trim(),
		contactType: $("#contactType").val(),
		phoneNumber: $("#phoneNum").val().trim(),
		emailAddress: $("#emailAddr").val().trim()
	};

	$.ajax("/api/contacts", {
		method: "POST",
		data: newContact
	}).then(function(data) {
		console.log(data);
		location.href = "/";
	});
});

// filter contact by type functionality
$("#filterContacts").on("change", function() {
    var type = $(this).val().toLowerCase();
    location.href = "/" + type;
})

// delete contact functionality
$(".delete").on("click", function() {
	var id = $(this).attr("data-id");

	$.ajax("api/contacts/" + id, {
		method: "DELETE"
	}).then(function(data) {
		console.log(data);
		location.reload();
	});
});