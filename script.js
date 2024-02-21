const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");



function sendEmail(){
    const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value}<br> Phone Number: ${phone.value}<br>Message: ${message.value}`;
    Email.send({
        SecureToken : "3ad62c5d-8576-43dd-9a19-75ad698798ea",
        Host: "smtp.elasticemail.com",
        Username: "prakashkumar71106@gmail.com",
        Password: "50D81B20866A675F9C57165C39DAA075AF6E",
        To: 'prakashkumar71106@gmail.com',
        From: "prakashkumar71106@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
           if (message == "OK"){
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
           }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for(const item of items){
        if(item.value == "" ){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if(item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email")
    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != ""){
            errorTxtEmail.innerText = "Enter a valid email address";
        }else{
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    }else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && 
    !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }
});