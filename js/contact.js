

function sendMail(){
    var firstName = document.getElementById("validationCustom01").value;
    var lastName = document.getElementById("validationCustom02").value;
    var city = document.getElementById("validationCustom03").value;
    var state = document.getElementById("validationCustom04").value;
    var pincode = document.getElementById("validationCustom05").value;
    var userEmail = document.getElementById("exampleInputEmail1").value;
    Email.send({

        Host : 'smtp.gmail.com',
        Username : "mailforwardingexamcentre@gmail.com",
        Password : "ArduinoBoard",
        To : 'shekharbrilliant@gmail.com',
        From : `${userEmail}`,
        Subject : "Contact Form Details (Exam-Centre)",
        Body : `<br><p>First Name : ${firstName}</p><p>Last Name : ${lastName}</p><p>City  : ${city}</p><p>State : ${state}</p><p>Pin Code : ${pincode}</p><p>Email : ${userEmail}</p>`
    }).then(
        message => alert("Mail Send")
    );
}