// add contact functionality
$("#addContact").on("submit", function(event) {
	event.preventDefault();

	const newContact = {
		firstName: $("#firstName").val().trim(),
		lastName: $("#lastName").val().trim(),
		contactType: $("#contactType").val(),
		phoneNumber: $("#phoneNumber").val().trim(),
		emailAddress: $("#emailAddress").val().trim()
	};

	$.ajax("/api/contacts", {
		method: "POST",
		data: newContact
	}).then(data => {
		console.log(data);
		location.href = "/";
	}).catch(err => {
        console.log(err);
        alert(err.responseText)   
    });
});

// filter contact by type functionality
$("#filterContacts").on("change", function() {
    const type = $(this).val().toLowerCase();
    location.href = `/${type}`;
})

// delete contact functionality
$(".delete").on("click", function() {
	const id = $(this).parents("tr").data("id");

	$.ajax(`/api/contacts/${id}`, {
		method: "DELETE"
	}).then(data => {
		console.log(data);
		location.reload();
	});
});