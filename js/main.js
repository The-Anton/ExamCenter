var regemailinput = document.getElementById("regemail");
var regpasswordinput = document.getElementById("regpassword");
var lgnemailinput = document.getElementById("lgnemail");
var lgnpasswordinput = document.getElementById("lgnpassword");
var username = document.getElementById("usrname");
var phoneno = document.getElementById("phoneno")


var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     var uid = user.uid;
     var docref = db.collection("users").doc(uid);
     docref.get().then(function(doc){
         document.getElementById("username").textContent=doc.data().Username
         document.getElementById("usernameside").textContent=doc.data().Username
     })
     document.getElementById("register").style="display:none;"
     document.getElementById("logout").style="display:inline; color:#fff"
     document.getElementById("login").style="display:none;"
     document.getElementById("username").style="display:inline;color:#fff;"
     document.getElementById("registerside").style="display:none;"
     document.getElementById("logoutside").style="display:inline; color:#fff"
     document.getElementById("loginside").style="display:none;"
     document.getElementById("usernameside").style="display:inline;color:#fff;"
     
    } else {
     console.log("User not logged in")
    }
  });


function register(){
    var email = regemailinput.value;
    var password = regpasswordinput.value;
    var name = username.value; 
    var no = phoneno.value;
    if(name!="" || no!=""){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
          var user = firebase.auth().currentUser;
          uid = user.uid;
          saveuserdata(uid,name,no);
          modal = document.getElementById("exampleModal")
          modal.style.display = "none";
          window.location.reload();
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
    db.collection("users").doc(uid).set({
       Username: name, 
       Phoneno: no
    })
    .then(function(uid) {
        console.log("Document written with ID: ", uid);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

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


// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  
  // Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");
  
function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
    } else {
      mySidebar.style.display = 'block';
    }
  }
  
  // Close the sidebar with the close button
function w3_close() {
      mySidebar.style.display = "none";
  }

db.collection("dailyquiz")
.onSnapshot(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        console.log("name of course " , doc.data().name)
        console.log("cost " , doc.data().cost)
        console.log("description " , doc.data().description )
        document.getElementById("listofdailyquizes").innerHTML += `
        <a href="#" style="text-decoration: none;">
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
        console.log("name of course " , doc.data().name)
        console.log("cost " , doc.data().cost)
        console.log("description " , doc.data().description )
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