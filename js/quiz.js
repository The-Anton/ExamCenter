//window.localStorage.clear();
//const querString = window.location.search;
//const urlParams = new URLSearchParams(querString);
//const uID = urlParams.get('uid');
//var quizName =urlParams.get('quiz');

//const quiz_name_text= document.getElementById('quiz_name_text');
const db = firebase.firestore();


var Name;

var data= [];

var d;
var docRef = db.collection("Shekhar").doc("W7w3Z9PK5BnYOc65qIWp");

var responseDocRef = db.collection("Shekhar").doc("Responses");

var currentQ =0;

var ans =[];
var minutes= 180;
var localQuesCache ={};
var optObj ={};
var totalQuestion;
var timeleft=180;
var marked=[];
var status=[];                                        //   Answered = 1 | Not Answered = 0 | Not Visited = undifined or null | Marked For review = -1




//var ans ={};

//var base = "/user/"
//var questionCollecPath =  base.concat(uID + '/quiz/' + quizName + "/Questions/");
//var responseCollecPath =  base.concat(uID + '/quiz/' + quizName + "/Responses/");
//var questionNumberPath =  base.concat(uID + '/quiz/');

//var isMCQ =[];
//var questionArray=[];


var totalAnswered =0;
var totalVisited =1;
var totalNotAnswered =0;
var totalMarked =0;


var docRef3 = db.collection("Shekhar").doc("testData");
    docRef3.get().then(function(doc) {
    if (doc.exists) {
        var range = doc.data().TotalQuestions;
        totalQuestion = doc.data().TotalQuestions;
        

    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });



function createPage(){
    makeVisible();
    startTimer();
}



function makeVisible(){
    document.getElementById("ques-area").innerHTML = ` 
                <div class="mt-5 mb-5" id="timer-area">
                   <h5> <span id="timer"><span>Time Left: </span><span id="hours">00</span><span>:</span><span id="minutes">00</span></span></h5>
                </div>

                <div class="mt-5 mb-5 ml-3" id="single-ques-area">

                </div>
               

                <div class="buttons mt-5" id="nav-btn-section">

                    <button type="button" class="btn btn-outline-primary mr-3 ml-3" id="next-btn" onclick="loadBackQues()"><< Back</button>
                    <button type="button" class="btn btn-outline-primary mr-3 ml-3 " id="back-btn" onclick="loadNextQues()">Next >></button>
                    <button type="button" class="btn btn-light mr-3 ml-3 " id="clear-btn" onclick="clear_opt()">Clear</button>
                    <button type="button" class="btn btn-success" id="submit-btn" onclick="submit()">Submit</button>


                </div>`;
   
    document.getElementById("initial-section").style.display = "none";
    document.getElementById("exam-section").style.display = "block";
    loadQues(1,1);
}




function startTimer(){
    var stratTime = new Date().getMinutes();
    var endTime = stratTime + minutes;
    var intervals =  setInterval(function(){
        var now = new Date().getMinutes();
         timeleft = endTime-now;
        var hours = Math.floor((timeleft / (60)));
        var minutes = Math.floor((timeleft % (60)));  
        document.getElementById("hours").innerHTML = hours + "h ";
        document.getElementById("minutes").innerHTML = minutes + "m " ;
        if(timeleft<=0){
            submit();
            clearInterval(intervals);
        }
       
    },1000)

}

function loadNextQues(){
    if(currentQ<totalQuestion){

        loadQues(currentQ+1,1);
    }
}
function loadBackQues(){
    if(currentQ>1){
        loadQues(currentQ-1, -1);
    }
}


function submit(){
    console.log("Answers:", ans);
    console.log("Answers:", optObj);

    db.collection("Shekhar").doc("Responses").set(optObj)
    .then(function() {
        console.log("Document successfully written!");
        document.getElementById("exam-section").style.display = "none";
        document.getElementById("exam-section").innerHTML = `<h4 class=" mt-5 text-center">Your Test has been submitted!.</h4>`;
        window.location.href='/quiz_result.html'
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
}



function selectOnlyThis(id){
    for (var i = 1;i <= 4; i++)
    {
        document.getElementById(`opt${i}`).checked = false;
    }
    document.getElementById(id).checked = true;
    var s= id.slice(3);
    optObj[`${currentQ}`]= `${s}`;
    ans[currentQ]=id;
    totalAnswered= Object.keys(optObj).length;

    totalNotAnswered= totalVisited-totalAnswered;
    markGreen(currentQ);
}

function clear_opt(){
    for (var i = 1;i <= 4; i++)
    {
        document.getElementById(`opt${i}`).checked = false;
    }
    delete optObj[`${currentQ}`];
    marked[currentQ]=false;
    totalAnswered= Object.keys(optObj).length;
    document.getElementById("answered-btn").innerText= totalAnswered;

    totalNotAnswered= totalVisited-totalAnswered;
    document.getElementById("not-anwered-btn").innerText= totalNotAnswered;
    markRed(currentQ);
    console.log("Answers: ", optObj);
}




function loadQues(qNo,flag){

        if(localQuesCache[`ques${qNo}`]!= null || localQuesCache[`ques${qNo}`]!= undefined){
            if(flag==1){
                currentQ++;
            }
            else if(flag==-1){
                currentQ--;
            }
            
            else if(flag==0){
                currentQ=qNo;
            }
            else{

            }
            loadFromCache(qNo);
        }else{

            var docRef2 = db.collection("Shekhar").doc(`${qNo}`);

            docRef2.withConverter(dataConverter)
            .get().then(function(doc) {
                if (doc.exists){
                    if(flag==1){
                        currentQ++;
                    }
                    else if(flag==-1){
                        currentQ--;
                    }else if(flag==0){
                        currentQ=qNo;
                    }
                    else{

                    }
                    d = doc.data();
                    d.showQues();
                } else {
                console.log("No such document!");
                }}).catch(function(error) {
                console.log("Error getting document:", error);
                });

        }

}







function loadFromCache(qNo){
    totalNotAnswered= totalVisited-totalAnswered;
    document.getElementById("not-anwered-btn").innerText= totalNotAnswered;
    
    document.getElementById("single-ques-area").innerHTML = `<h5 id="Q">Q.${qNo} ${localQuesCache[`ques${qNo}`]}</h5><br>   
    <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt1" value="${localQuesCache[`opt${qNo}.1`]}" onclick="selectOnlyThis(this.id)"> A) ${localQuesCache[`opt${qNo}.1`]}</label>    <br> 
    <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt2" value="${localQuesCache[`opt${qNo}.2`]}" onclick="selectOnlyThis(this.id)"> B) ${localQuesCache[`opt${qNo}.2`]} </label>    <br>
    <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt3" value="${localQuesCache[`opt${qNo}.3`]}" onclick="selectOnlyThis(this.id)"> C) ${localQuesCache[`opt${qNo}.3`]}</label>    <br>
    <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt4" value="${localQuesCache[`opt${qNo}.4`]}" onclick="selectOnlyThis(this.id)"> D) ${localQuesCache[`opt${qNo}.4`]} </label>    <br>`;

    document.getElementById(`opt${optObj[qNo]}`).checked =true;
    console.log("LocalQuesCache");
    


     console.log("Q:",qNo);

}





class data1 {
    constructor (ques, opt1, opt2, opt3, opt4 ) {
        this.ques = ques;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.opt4 = opt4;
    }
    toString() {
        return this.ques + ', ' + this.opt1 + ', ' + this.opt2 + ', ' + this.opt3 + ', ' + this.opt4;
    }
    showQues(){
       
        

        document.getElementById("single-ques-area").innerHTML = `<h5 id="Q">Q.${currentQ} ${this.ques}</h5><br>   
        <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt1" value="${this.opt1}" onclick="selectOnlyThis(this.id)"> A)  ${this.opt1} </label>    <br> 
        <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt2" value="${this.opt2}" onclick="selectOnlyThis(this.id)"> B)  ${this.opt2} </label>    <br>
        <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt3" value="${this.opt3}" onclick="selectOnlyThis(this.id)"> C)  ${this.opt3} </label>    <br>
        <label class="checkbox-inline mr-3 ml-3" ><input type="radio"  id="opt4" value="${this.opt4}" onclick="selectOnlyThis(this.id)"> D)  ${this.opt4} </label>    <br>`;

        localQuesCache[`ques${currentQ}`]=`${this.ques}`;
        localQuesCache[`opt${currentQ}.1`]=`${this.opt1}`;
        localQuesCache[`opt${currentQ}.2`]=`${this.opt2}`;
        localQuesCache[`opt${currentQ}.3`]=`${this.opt3}`;
        localQuesCache[`opt${currentQ}.4`]=`${this.opt4}`;

        console.log("From Firebase");
        if(currentQ==1){
            totalVisited=1;
        }else{
            totalVisited++;

        }
        
        totalNotAnswered= totalVisited-totalAnswered;

    }
}



dataConverter = {
    toFirestore: function(data1) {
        return {
            ques: data1.ques,
            opt1: data1.opt1,
            opt2: data1.opt2,
            opt3: data1.opt3,
            opt4: data1.opt4
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new data1(data.ques, data.opt1, data.opt2, data.opt3, data.opt4)
    }
}



