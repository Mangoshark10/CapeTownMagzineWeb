function validationOfForm(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let feedback = document.getElementById("feedback").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;

    if (name == "") {
        alert("name is required");
        return false;
    }
    if (email == "") {
        alert("email is required");
        return false;
    }
    if (feedback == "") {
        alert("feedback is required");
        return false;
    }
    if (password == "") {
        alert("password is required");
        return false;
    }
    if (dob == "") {
        alert("date of birth is required");
        return false;
    }

    return true;
}