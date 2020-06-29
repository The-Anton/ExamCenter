function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgba(" + x + "," + y + "," + z + ","+"0.7)";
    console.log(bgColor);

    return bgColor;

  
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

  var from = getUrlVars()["from"];
  var id = getUrlVars()["id"]
  var username = getUrlVars()["name"]
  var test_name = getUrlVars()["test"]

  if(from == "dailyquizLeaderboard")
    test_name = "Daily Quiz"

  test_name = test_name.split("%20").join(" ");

  document.getElementById("leaderboard__title").innerHTML = test_name
  document.getElementById("leaderboard__title").style.width = "330px"

db.collection( from +"/"+id + "/scoreboard")
.orderBy("score", "desc")
    .get().then(function(querySnapshot) {
        var first = 0;
        var userrank = 1;
          querySnapshot.forEach(function(doc) {

            
            // if(doc.data().name == username){
            //     document.getElementById("rank").innerHTML = userrank
            // }
            // else{
            //     userrank = userrank+1;
            // }
            
            if(first == 0){
                document.getElementById("leaderboard_profile_id").innerHTML += `
                <article class="leaderboard__profile">
                                    <img src="https://cdn4.iconfinder.com/data/icons/web-design-and-development-5-3/128/237-512.png" alt="Mark Zuckerberg" class="leaderboard__picture">
                                    <span class="leaderboard__name">${doc.data().name}</span>
                                    <span class="leaderboard__value">${doc.data().score}<span>B</span></span><br><span class="leaderboard__time">Time : ${doc.data().time}</span>
                </article>
                `
                console.log("for first time ")
            }
            else{
                document.getElementById("leaderboard_profile_id").innerHTML += `
                <article class="leaderboard__profile">
                                    <div  alt="Image" class="leaderboard_initials" id="${doc.id}"></div>
                                    <span class="leaderboard__name">${doc.data().name}</span>
                                    <span class="leaderboard__value">${doc.data().score}<span>B</span></span><br><span class="leaderboard__time">Time : ${doc.data().time}</span>
                </article>
                `
                document.getElementById(doc.id).innerHTML=doc.data().name[0]
            }
            elements = document.getElementsByClassName("leaderboard_initials");
            for (var i = 0; i < elements.length; i++) {
                bgColor = random_bg_color();
                elements[i].style.background=bgColor;
            }

            first = 1;

          })
        })

