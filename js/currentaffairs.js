
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





database= firebase.firestore()
database.collection("currentaffairs")
.onSnapshot(function(querySnapshot) {

  querySnapshot.forEach(function(doc) {
      
      document.getElementById("listofdailyquizes").innerHTML += `
      <a href="/pdfviewer.html?id=${doc.data().id}" style="text-decoration: none;">
      <li class="li-list">
        ${doc.data().Name}<br/>
        ${doc.data().category}<br/>
        <div class="right top">${doc.data().Date}</div>
      </li>
      </a>
      `

  });
}); 