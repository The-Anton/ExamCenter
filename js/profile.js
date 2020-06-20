var uid;
var total = 0;
var pending = 0;
var completed = 0;
var upsc = 0;
var ssc = 0;
  
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
     uid = user.uid;
     showCourses(uid)
     var docref = db.collection("users").doc(uid);
     docref.get().then(function(doc){
         document.getElementById("username").textContent=doc.data().Username;
         document.getElementById("h22").textContent=doc.data().Username;
         document.getElementById("pn").textContent=doc.data().Phoneno;
         document.getElementById("ema").textContent=user.email;
       


     })
     document.getElementById("register").style="display:none;"
     document.getElementById("logout").style="display:inline; color:#fff"
     document.getElementById("login").style="display:none;"
     document.getElementById("username").style="display:inline;color:#fd5f00;"
     
    } else {
     console.log("User not logged in")
    }
  });

  function showCourses(uid){
    db.collection("users/"+uid+"/courses")
    .onSnapshot(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
  
            var category = doc.data().category
            var course_name = doc.data().course_name
            var status = doc.data().status
            total += 1;

          db.collection("courses").doc("categories").collection(category).doc(course_name)
            .get()
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
                        <p class="description">New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                        <div class="post-meta"><span class="timestamp"><i class="fa fa-clock-">Questions : </i> 50</span><span class="comments"><a href="www.google.com"> Status</a></span></div>
                      </div>
                    </div>
                  </div>
                  `
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
                        <h2 class="sub_title">${doc.data().description}</h2>
                        <p class="description">New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                        <div class="post-meta"><span class="timestamp"><i class="fa fa-clock-">Questions : </i> 50</span><span class="comments"><a href="www.google.com"> Status</a></span></div>
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
     