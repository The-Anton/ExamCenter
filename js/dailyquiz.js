
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
database.collection("dailyquiz")
.onSnapshot(function(querySnapshot) {

  querySnapshot.forEach(function(doc) {
      
    if(doc.id!="tempData"){

      document.getElementById("listofdailyquizes").innerHTML += `
      <a href="quiz.html?quizid=${doc.id}" style="text-decoration: none;">
      <li class="li-list">
      <div class="dailyquizhead">
      ${doc.data().Name}
      </div>
        ${doc.data().category}<br/>
        <a href="leaderboard.html?from=dailyquizLeaderboard&id=${doc.data().id}" style="text-decoration: none;">
        <button class="right btn-leaderboard">Leaderboard</button>
        </a>
        <div class="right top">${doc.data().Date}</div>
      </li>
      </a>
      `

  };

  });
}); 