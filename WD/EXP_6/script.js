document.getElementById("regForm").addEventListener("submit", function(event) {
    let name = document.getElementById("name").value.trim();
    let password = document.getElementById("password").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let namePattern = /^[A-Za-z ]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    if (!name.match(namePattern) || name.length < 6) {
        alert("Name must contain only alphabets and be at least 6 characters long.");
        event.preventDefault();
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        event.preventDefault();
        return;
    }

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }

    if (!phone.match(phonePattern)) {
        alert("Phone number must be exactly 10 digits.");
        event.preventDefault();
        return;
    }

    alert("Registration Successful!");
});
