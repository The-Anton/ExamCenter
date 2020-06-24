var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    
     document.getElementById("register").style="display:none;"
     document.getElementById("login").style="display:none;"
     document.getElementById("myprofile").innerHTML+=`
     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     My Profile
   </a>
   <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
     <a class="dropdown-item" href="/profile.html">Profile</a>
     <a class="dropdown-item" href="/profile.html">My Tests</a>
     <div class="dropdown-divider"></div>
     <a class="dropdown-item" id="logout" href="#" onclick="logout()">Logout</a>
   </div>
     `
     
    } else {
     console.log("User not logged in")
    }
  });

function  logout(){
    firebase.auth().signOut().then(function() {
        console.log("Succesfully logged out")
        window.location.reload();
      }).catch(function(error) {
        console.log(error.message)
      });
}



function sendMail(){
  var firstName = document.getElementById("validationCustom01").value;
  var lastName = document.getElementById("validationCustom02").value;
  var city = document.getElementById("validationCustom03").value;
  var state = document.getElementById("validationCustom04").value;
  var pincode = document.getElementById("validationCustom05").value;
  var userEmail = document.getElementById("exampleInputEmail1").value;
  var userMsg = document.getElementById("exampleInputMsg").value;
  Email.send({

      Host : 'smtp.gmail.com',
      Username : "mailforwardingexamcentre@gmail.com",
      Password : "ArduinoBoard",
      To : 'exam.centre2020@gmail.com',
      From : `${userEmail}`,
      Subject : "Contact Form Details (Exam-Centre)",
      Body : `<br><p>First Name : ${firstName}</p><p>Last Name : ${lastName}</p><p>City  : ${city}</p><p>State : ${state}</p><p>Pin Code : ${pincode}</p><p>Email : ${userEmail}</p><p>Message : ${userMsg}</p>`
  }).then(
      message => alert("Mail Send")
  );
}