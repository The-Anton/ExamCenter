var uid;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      uid = user.uid;
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


//getting course params
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

  var category = getUrlVars()["category"];


//storing backgrounds
var background_shades = ["https://image.freepik.com/free-vector/bright-orange-diagonal-lines-background_1017-14211.jpg"
            , "https://img.freepik.com/free-vector/orange-abstract-background-with-dark-light-straight-lines_132230-86.jpg?size=626&ext=jpg"
            ,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxfxGRGSOfGH2-Wy06er6iM9-1HpapxavB5w&usqp=CAU"
             , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWfqRHI7kSdiZPMkwxKc40ubg-uZo-Hl-O7RV7io4hDWcR9zBLQ&s"];

function getRndInteger(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
}



// var imagesRef = storageRef.child('course images');

db.collection("courses/categories/"+category)
    .get().then(function(querySnapshot) {

      console.log(uid)

        //Getting all courses purchased
        var courses_purchased=[];

        db.collection("users/"+uid+"/courses").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            courses_purchased.push(doc.id)
          });
          details(courses_purchased)
        });

        function details(courses_purchased){
        querySnapshot.forEach(function(doc) {

            var date = doc.data().date;
            var month = date.substring(0,3);
            var day = date.substring(4,6);
          document.getElementById("all-cards").innerHTML += `
          
            <div class="card card-custom bg-white border-white border-0">
              <div class="card-custom-img" style="background-image: url(${background_shades[getRndInteger(0,3)]});"></div>
              <div class="card-custom-avatar">
                <img class="img-fluid" id="${doc.data().name}" alt="Avatar" />
              </div>
              <div class="card-date">
              <div class="day">${day}</div>
              <div class="month">${month}</div>
              </div>
              <div class="card-body" style="overflow-y: auto">
                <h4 class="card-title">${doc.data().name}</h4>
                <p class="card-subtitle">${doc.data().description}</p>
                <div class="bottom-details">
                <a class="icons">${doc.data().difficulty}</a>  &nbsp; &nbsp;&nbsp;
                <a class="icons">&#8377; ${doc.data().cost}</a> &nbsp;  &nbsp;&nbsp;
                <a class="icons"> Questions-${doc.data().noOfQues}</a> 
                <div>
                </div>
              <div class="card-footer m-0 p-0 pt-3 pb-2" style="background: inherit; border-color: inherit;">
                <a href="donateViaPaytm.html?course=${doc.id}" id=${doc.id}><div class="pay-btn">Buy Now</div></a>
              </div>
            </div>
            <!-- Copy until here -->        
          `
          if(category=='upsc'){
            document.getElementById(doc.data().name).src= "assets/upsc-icon.jpg"
          }
          else{
            document.getElementById(doc.data().name).src= "assets/ssc_new_logo.jpeg";

          }
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              if(courses_purchased.includes(doc.id)){
                document.getElementById(doc.id).innerHTML = "Enrolled"
                document.getElementById(doc.id).classList.add("enrolled-btn")
                document.getElementById(doc.id).href = "profile.html"
              }
            } else {
              document.getElementById(doc.id).href = "login.html"
              
            }
          })

        });
      }
      
    });

   


