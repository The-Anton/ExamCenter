
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




// var imagesRef = storageRef.child('course images');

db.collection("courses/categories/"+category)
    .onSnapshot(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            // console.log("name of course " , doc.data().name)
            // console.log("cost " , doc.data().cost)
            // console.log("description " , doc.data().description )
            
          document.getElementById("all-cards-ul").innerHTML += `
          <li class="booking-card" style="background-image: url(${doc.data().imgUrl})">
            <div class="book-container">
              <div class="content">
              
              <button class="btn" id="buyNow"><a href="donateViaPaytm.html?course=${doc.id}">Buy Now</a></button>
               
              </div>
            </div>
            <div class="informations-container">
              <h2 class="title">${doc.data().name}</h2>
              <p class="sub-title">${doc.data().description}</p>
              <p class="price"><span>&#8377;</span>${doc.data().cost}</p>
              <div class="more-information">
                <div class="info-and-date-container">
                  <div class="box info">
                    <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                   
                    <path d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412"></path>
              
          </svg>
                    <p>Parc des expositions à NANTES</p>
                  </div>
                  <div class="box date">
                    <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
          </svg>
                    <p>Samedi 1er février 2020</p>
                  </div>
                </div>
                <p class="disclaimer">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eveniet perferendis culpa. Expedita architecto nesciunt, rem distinctio</p>
                </div>
            </div>
          </li>
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

