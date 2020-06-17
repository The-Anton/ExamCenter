
  
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

  $(window).load(function () {
    $(".post-module").hover(function () {
      $(this).find(".description").stop().animate(
        {
          height: "toggle",
          opacity: "toggle"
        },
        300
      );
    });
  });
  
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     var uid = user.uid;
     var docref = db.collection("users").doc(uid);
     docref.get().then(function(doc){
         document.getElementById("username").textContent=doc.data().Username;
         document.getElementById("h22").textContent=doc.data().Username;
         document.getElementById("pn").textContent=doc.data().Phoneno;
         document.getElementById("ema").textContent=user.email;
         document.getElementById("h2").textContent=doc.data().Username


     })
     document.getElementById("register").style="display:none;"
     document.getElementById("logout").style="display:inline; color:#000"
     document.getElementById("login").style="display:none;"
     document.getElementById("username").style="display:inline;color:#000;"
     
    } else {
     console.log("User not logged in")
    }
  });