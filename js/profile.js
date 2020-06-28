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

function  logout(){
    firebase.auth().signOut().then(function() {
        console.log("Succesfully logged out")
        window.location.reload();
      }).catch(function(error) {
        console.log(error.message)
      });
}



var uid;
var total = 0;
var pending = 0;
var completed = 0;
var upsc = 0;
var ssc = 0;
var marks = 10;

  

  
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     uid = user.uid;
     showCourses(uid)
     var docref = db.collection("users").doc(uid);
     docref.get().then(function(doc){
         
         document.getElementById("h22").textContent=doc.data().Username;
         document.getElementById("pn").textContent=doc.data().Phoneno;
         document.getElementById("ema").textContent=user.email;

         if(doc.data().Gender=="Female")
            document.getElementById("avatar").src="/assets/female.jpg"
        else
           document.getElementById("avatar").src="/assets/male.jpg"

     })
     document.getElementById("register").style="display:none;"

     document.getElementById("login").style="display:none;"
    
     
    } else {
     console.log("User not logged in")
    }
  });

var background_shades = ["https://image.freepik.com/free-vector/bright-orange-diagonal-lines-background_1017-14211.jpg"
            , "https://img.freepik.com/free-vector/orange-abstract-background-with-dark-light-straight-lines_132230-86.jpg?size=626&ext=jpg"
            ,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxfxGRGSOfGH2-Wy06er6iM9-1HpapxavB5w&usqp=CAU"
             , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWfqRHI7kSdiZPMkwxKc40ubg-uZo-Hl-O7RV7io4hDWcR9zBLQ&s"];

function getRndInteger(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
}

  function showCourses(uid){
    db.collection("users/"+uid+"/courses")
    .get().then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
  
            var category = doc.data().category
            var course_name = doc.data().course_name
            var status = doc.data().status
            total += 1;

            var getOptions = {
              source: 'default'
          };

          db.collection("courses").doc("categories").collection(category).doc(course_name)
            .get(getOptions)
            .then(doc => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                if(status=="pending"){
                  var date = doc.data().date;
                  var month = date.substring(0,3);
                  var day = date.substring(4,6);
                  document.getElementById("pending").innerHTML += `
                  <!-- Normal Demo-->
                  <div class="column" style="width: auto;">
                  <div class="card card-custom bg-white border-white border-0 m-2">
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
                        <br>
                        <div>Duration : 3 hours</div>
                        <div>Difficulty : Easy</div>
                        <div class="post-meta"><span class="timestamp">Questions : ${doc.data().noOfQues}</span> </div>
                  </div>
                  <div>      
                        <span><button type="button" class="btn btn-primary" style="width: 90%; margin: 15px;" id="${doc.data().name}" ></button></span></div>
                    </div>
                    </div>
                  </div>
                  `
                  settimer(doc.data().date,doc.data().name,course_name,category,uid)
                  
                }
                else{

                  if(category == "upsc"){
                    upsc += 1;
                  }
                  else{
                    ssc += 1;
                  }

                  completed += 1;
                  var date = doc.data().date;
                  var month = date.substring(0,3);
                  var day = date.substring(4,6);

                  function getReport(){
                    var docRef = db.collection('/users/'+uid+'/courses/'+course_name+'/result').doc("Report");

                    docRef.get().then(function(doc) {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            
                            var score= doc.data().Score ;
                            var correct =doc.data().Correct ;
                            var incorrect = doc.data().Inncorrect;
                            var percentage = doc.data().Percentage;
                            document.getElementById(course_name).innerHTML=`
                            <div id="score">Score : ${score}</div>
                            <div id="correct">Correct : ${correct}</div>
                            <div id="incorrect">Incorrect : ${incorrect}</div>
                            <div id="percentage">Percentage : ${percentage}%</div>
                            `
  
                        } else {
                            
                            console.log("No such document!");
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                  }
                  getReport();



                  document.getElementById("completed").innerHTML += `

                  <!-- Normal Demo-->
                  <div class="column" style="width: auto;">
                  <div class="card card-custom bg-white border-white border-0 m-2">
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
                       <br>
                       <div id="${course_name}">
  
                        </div>    
                       <div class="post-meta"><span class="timestamp">Questions : ${doc.data().noOfQues}</span>
                       <span><button type="button" class="btn btn-primary" style="width: 100%; margin-top: 20px;" id="${course_name}" onclick="window.open('result.html?u=${uid}&category=${category}&courseid=${course_name}');">Show Result</button></span></div>
                       <span><button type="button" class="btn btn-primary" style="width: 100%; margin-top: 5px;" onclick="window.open('leaderboard.html?from=coursesLeaderboard&id=${doc.data().id}&test=${doc.data().name}');">Show LeaderBoard</button></span>
                     </div>
                   </div>
                 </div>
                  `
                  
                }
                
              }
              console.log("completed : " , completed / total * 100)
              stats(completed , upsc , ssc)
              

            })
            
            
          })
          console.log("total tests : " , total)
          function stats(completed , upsc , ssc){
            completed = completed/total * 100;
            completed = completed.toFixed(2)
            completed = completed + "%"
            upsc = upsc/total * 100;
            upsc = upsc.toFixed(2);
            upsc = upsc + "%"
            ssc = ssc/total * 100;
            ssc = ssc.toFixed(2);
            ssc = ssc + "%"
            document.getElementById("total-tests").style.width = completed
            document.getElementById("total-tests-text").textContent = completed
            document.getElementById("upsc-tests").style.width = upsc
            document.getElementById("upsc-tests-text").textContent = upsc
            document.getElementById("ssc-tests").style.width = ssc
            document.getElementById("ssc-tests-text").textContent = ssc

            console.log("completed percent : " , completed)
          }
          
        });
        
      
  }
     
function settimer(startDate,id,course_name,category,uid){
  var countDownDate = new Date(startDate).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
     document.getElementById(id).textContent = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(id).innerHTML = "Start Now";
     
    document.getElementById(id).addEventListener("click", function(){
      window.location = 'exam.html?id='+course_name+'&category='+category+'&uid='+uid ; 
 });

    }
  }, 1000);
  }

function showresult(uid,category,coursename){
   window.open('result.html?u='+uid+'&category='+category+'&courseid='+coursename+'');
    
  }
  
 
window.addEventListener("load", function(){
    document.getElementById("loader").style.display="none";
    document.getElementById("maincontent").style.display="inline"
  })  