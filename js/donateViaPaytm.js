function myFunction() {
    document.getElementById("coupon").style.display="block";
    document.getElementsByClassName("card-wrap").style.marginTop = "-145px";
  }


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     var uid = user.uid;

     function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
            function(m,key,value) {
            vars[key] = value;
            });
            return vars;
        }
        var course = getUrlVars()["course"];

        
     document.getElementById('orderid').value=course+"-"+uid+"-"+Math.floor(Math.random() * 100000000);
     
     var tempIndex = course.search("-");
     var category = course.slice(0,tempIndex);
    
     if(category=="upsc"){
      document.getElementById("bg-image").style.backgroundImage = "url(assets/upsc-logo-1576674415.jpg)"
     }
     else if(category=="ssc"){
      document.getElementById("bg-image").style.backgroundImage = "url(assets/ssc_new_logo.jpeg)"
     }
     else{
      document.getElementById("bg-image").style.backgroundImage = "url(assets/logo.jpg)"
     }
    
     console.log("category : " , category)

     db.collection("courses/categories/"+category+"/").doc(course)
    .get().then(function(doc) {
      console.log("course name : " , doc.data().name)
      document.getElementById("title").innerHTML=doc.data().name
      document.getElementById("sub-title").innerHTML=doc.data().description
      document.getElementById("price").innerHTML="&#8377;"+doc.data().cost
      document.getElementById("noOfQues").innerHTML="Questions-"+doc.data().noOfQues
      document.getElementById("date").innerHTML="Date-"+doc.data().date


      document.getElementById("date").innerHTML="Date-"+doc.data().date
      document.getElementById("date").innerHTML="Date-"+doc.data().date
      document.getElementById("date").innerHTML="Date-"+doc.data().date
    
    });

    db.collection("users").doc(uid).get()
    .then(function(doc){
    
      
      document.getElementById("username").value= doc.data().Username
      document.getElementById("email").value=user.email
      document.getElementById("mobile").value=doc.data().Phoneno
    
      console.log("phone no - " , doc.data().Phoneno)
    })

            
          } 
          else {
            console.log("User not logged in")
            }
        });