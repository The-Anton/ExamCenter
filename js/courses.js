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


// Toggle between showing and hiding the sidebar when clicking the menu ico


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

        querySnapshot.forEach(function(doc) {
            // console.log("name of course " , doc.data().name)
            // console.log("cost " , doc.data().cost)
            // console.log("description " , doc.data().description )
            var date = doc.data().date;
            var month = date.substring(0,3);
            var day = date.substring(4,6);
          document.getElementById("all-cards").innerHTML += `
          <!-- Copy the content below until next comment -->
            <div class="card card-custom bg-white border-white border-0">
              <div class="card-custom-img" style="background-image: url(${background_shades[getRndInteger(0,3)]});"></div>
              <div class="card-custom-avatar">
                <img class="img-fluid" src="/assets/upsc-icon.jpg" alt="Avatar" />
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
              <div class="card-footer m-1" style="background: inherit; border-color: inherit;">
                <a href="donateViaPaytm.html?course=${doc.id}"><div class="pay-btn">Buy Now</div></a>
              </div>
            </div>
            <!-- Copy until here -->        
          `
        });
    });


    //footer
    

    





    // document.getElementById("buyNow").onclick = function () {
    //     location.href = "PaytmKit/TxnTest.php";
    // };














































// class City {
//     constructor (name, cost, description ,imgUrl) {
//         this.name = name;
//         this.cost = cost;
//         this.description = description;
//         this.imgUrl = imgUrl
//     }
//     toString() {
//         return this.name + ', ' + this.cost + ', ' + this.description + ', ' + this.imgUrl;
//     }
// }

//     // Firestore data converter
//   cityConverter = {
//       toFirestore: function(city) {
//           return {
//               name: city.name,
//               cost: city.cost,
//               description: city.description,
//               imgUrl: city.imgUrl
//               }
//       },
//       fromFirestore: function(snapshot, options){
//           const data = snapshot.data(options);
//           return new City(data.name, data.cost, data.description, data.imgUrl)
//       }
//   }

// db.collection("courses/categories/ssc").doc("PHP")
//   .withConverter(cityConverter)
//   .set(new City("PHP", "150", "This is the course oriented for PHP lovers.","https://www.prodjex.com/wp-content/uploads/2018/04/PHP-Tutorials-Guides-and-More.png"));

