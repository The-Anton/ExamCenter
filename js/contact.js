var regemailinput = document.getElementById("regemail");
var regpasswordinput = document.getElementById("regpassword");
var lgnemailinput = document.getElementById("lgnemail");
var lgnpasswordinput = document.getElementById("lgnpassword");
var regusername = document.getElementById("usrname");
var regphoneno = document.getElementById("phoneno")


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


function register(){
    var email = regemailinput.value;
    var password = regpasswordinput.value;
    var name = regusername.value; 
    var no = regphoneno.value;
    if(name!="" || no!=""){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
          var user = firebase.auth().currentUser;
          uid = user.uid;
          /*saveuserdata(uid,name,no);*/
        db.collection("users").doc(uid).set({
            Username : name,
            phoneno: no
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      })
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          
          document.getElementById("error").textContent=errorMessage;
          console.log(errorMessage);
        });

    }else{
      document.getElementById("error").textContent="Please fill out all the fields!!"
    }
      
    
}
function saveuserdata(uid,name,no){
    console.log("Saveuserdata starts")
    

}
function  logout(){
    firebase.auth().signOut().then(function() {
        console.log("Succesfully logged out")
        window.location.reload();
      }).catch(function(error) {
        console.log(error.message)
      });
}

function login(){
    var email = lgnemailinput.value;
    var password = lgnpasswordinput.value;
    if(email!="" || password!=""){
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        modal = document.getElementById("loginmodal")
        modal.style.display = "none";
        window.location.reload();
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        document.getElementById("errorlogin").textContent=errorMessage;
      });
    }else{
      document.getElementById("errorlogin").textContent="Please fill out all the fields!!"
    }
}


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