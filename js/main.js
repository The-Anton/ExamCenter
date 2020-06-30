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




function fetchdata(){
  database= firebase.firestore()
  database.collection("dailyquiz")
  .onSnapshot(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        document.getElementById("listofdailyquizes").innerHTML += `
        <a href="quiz.html" style="text-decoration: none;">
        <li class="li-list">
        <div class="dailyquizhead">
        ${doc.data().Name}
        </div>
          ${doc.data().category}<br/>
          <a href="leaderboard.html?from=dailyquizLeaderboard&quizid=${doc.data().id}" style="text-decoration: none;">
          <button class="right btn-leaderboard">Leaderboard</button>
          </a>
          <div class="right top">${doc.data().Date}</div>
        </li>
        </a>
        `

    });
}); 
  
database.collection("currentaffairs")
  .onSnapshot(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        document.getElementById("listofcurrentaffairs").innerHTML += `
        <a  href="/pdfviewer.html?id=${doc.data().id}" style="text-decoration: none;">
        <li class="current-affairs" style="color: red;">
        <svg class="bi bi-arrow-right-circle-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
</svg> &nbsp &nbsp
          ${doc.data().Date} &nbsp
          ${doc.data().Name}
          <img src="/assets/new.gif" alt="New">
        </li>
        </a>
        `

    });
});  
}


fetchdata()


window.addEventListener("load", function(){
  document.getElementById("loader").style.display="none";
  document.getElementById("maincontent").style.display="inline"
})
