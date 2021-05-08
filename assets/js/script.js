var formData = new FormData();
formData.set("grant_type", "client_credentials");
formData.set("client_id", "lnAAmWl7igs0Zz53pQS7zKu7Dh4cyqGA");
formData.set("client_secret", "bsn0KuCd9bBXIVR6");

fetch("https://test.api.amadeus.com/v1/security/oauth2/token?grant_type=client_credentials&client_id=lnAAmWl7igs0Zz53pQS7zKu7Dh4cyqGA&client_secret=bsn0KuCd9bBXIVR6",
{
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: formData
})
.then(response => {
	return response.json();
})
.then(console.log)
.catch(err => {
	console.error(err);
});

