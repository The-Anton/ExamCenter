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
      db.collection("users").doc("uid").set({cool : "cool again" });

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        var user = firebase.auth().currentUser;
        var uid = user.uid
        console.log("uid is here " , uid)
        logUser(user , uid); // Optional
    }, function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          
          document.getElementById("error").textContent=errorMessage;
          console.log(errorMessage);
    });

    }else{
      document.getElementById("error").textContent="Please fill out all the fields!!"
    }

    function logUser(user , uid) {
      console.log("IN loguser")
      db.collection("users").doc(uid).set({Username: name, 
        Phoneno: no})
        .then(function(){
          console.log("User Successfully registered !!")
        });
      // or however you wish to update the node
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



db.collection("dailyquiz")
.onSnapshot(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        document.getElementById("listofdailyquizes").innerHTML += `
        <a href="quiz.html" style="text-decoration: none;">
        <li class="li-list">
          ${doc.data().Name}<br/>
          ${doc.data().category}<br/>
          <div class="right top">${doc.data().Date}</div>
        </li>
        </a>
        `

    });
});   
db.collection("currentaffairs")
.onSnapshot(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        document.getElementById("listofcurrentaffairs").innerHTML += `
        <a href="${doc.data().url}" style="text-decoration: none;">
        <li class="li-list">
          ${doc.data().Name}<br/>
          ${doc.data().category}<br/>
          <div class="right top">${doc.data().Date}</div>
        </li>
        </a>
        `

    });
});  