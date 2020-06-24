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
       


     })
     document.getElementById("register").style="display:none;"
     document.getElementById("logout").style="display:inline; color:#fff"
     document.getElementById("login").style="display:none;"
    
     
    } else {
     console.log("User not logged in")
    }
  });

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
                  
                  document.getElementById("pending").innerHTML += `
                  <!-- Normal Demo-->
                  <div class="column">
                    <!-- Post-->
                    <div class="post-module">
                      <!-- Thumbnail-->
                      <div class="thumbnail">
                    
                        <div class="date">
                          <div class="day">27</div>
                          <div class="month">Mar</div>
                        </div><img src="${doc.data().imgUrl}"/>
                      </div>
                      <!-- Post Content-->
                      <div class="post-content">
                        <div class="category">${status}</div>
                        <h1 class="title">${doc.data().name}</h1>
                        <h2 class="sub_title">${doc.data().description}</h2>
                        <br>
                        <div>Duration : 3 hours</div>
                        <div>Difficulty : easy</div>
                        <div class="post-meta"><span class="timestamp">Questions : 50</span> </div>
                        <span><button type="button" class="btn btn-primary" style="width: 100%; margin-top: 20px;" id="${doc.data().name}" >Start Now</button></span></div>
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
                  document.getElementById("completed").innerHTML += `

                  <!-- Normal Demo-->
                  <div class="column">
                   <!-- Post-->
                   <div class="post-module">
                     <!-- Thumbnail-->
                     <div class="thumbnail">
                     
                       <div class="date">
                         <div class="day">27</div>
                         <div class="month">Mar</div>
                       </div><img src="${doc.data().imgUrl}"/>
                     </div>
                     <!-- Post Content-->
                     <div class="post-content">
                       <div class="category">${status}</div>
                       <h1 class="title">${doc.data().name}</h1>
                       <div class="sub_title">${doc.data().description}</div>
                       <br>
                       <div>Total Questions : 50</div>
                       <div>Answered : 25</div>
                       <div>Correct : 18</div>
                       <div>Score : 56</div>  
                                                
                       <div class="post-meta"><span class="timestamp">Questions : 50</span>
                       <span><button type="button" class="btn btn-primary" style="width: 100%; margin-top: 20px;" id="${course_name}" onclick="showresult(${uid},${category},${course_name});">Show Result</button></span></div>
                       
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
            completed = completed + "%"
            upsc = upsc/total * 100;
            upsc = upsc + "%"
            ssc = ssc/total * 100;
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

  window.location='result.html?u='+uid+'&category='+category+'&courseid='+coursename ;

    
  }