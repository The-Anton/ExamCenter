var ans=[];
var res=[];
var exp;
var totalQuestion;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

var uid = getUrlVars()["u"];
var category = getUrlVars()["category"];
var courseid = getUrlVars()["courseid"];

const db = firebase.firestore();


totalQuestion();

setTimeout(downloadData(),10000);

function totalQuestion(){
    var docRef3 = db.collection('/courses/categories/'+category+'/'+courseid+'/questions').doc("testData");
    docRef3.get().then(function(doc) {
    if (doc.exists) {
        totalQuestion = doc.data().TotalQuestions;
       


    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });

}



function downloadData(){


    var docRef = db.collection('/courses/categories/'+category+'/'+courseid+'/questions').doc("Answers");

    docRef.get().then(function(doc) {

            ans = doc.data().ans;

            var docRef2 = db.collection('/users/'+uid+'/courses/'+courseid+'/result').doc("Responses");
            docRef2.get().then(function(doc2) {
                    res = doc2.data();
                    var docRef3 = db.collection('/courses/categories/'+category+'/'+courseid+'/questions').doc("explain");
                    docRef3.get().then(function(doc3) {
                        exp = doc3.data().exp;
                        processData(ans, res, exp);

                    });

                

            });


    });
    
}

function processData(a,r,e){
    var correct=0;
    var inncorrect=0;
    var wrong=0;
    var percentage=0;
    var unattempted=0;
    var score=0
    var questionNo;
  
    
    for(i=1; i<=totalQuestion ; i++){
        var response = parseInt(r[i]);
        var answer=parseInt(a[i]);

        if(response==answer){
            correct++;
        }else{
            wrong++;
        }
    }

    score = correct*4;
    percentage = (correct/totalQuestion)*100;
    inncorrect = totalQuestion-correct;

    var docRef = db.collection('/users/'+uid+'/courses/'+courseid+'/result').doc("Report");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            
        } else {
                            
            db.collection('/users/'+uid+'/courses/'+courseid+'/result').doc("Report").set({
                    
                    Score: score,
                    Correct: correct,
                    Inncorrect: inncorrect,
                    Percentage: percentage
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    document.getElementById("result").innerHTML = `
            <div class="card score-card pt-3 pb-3">
                <div class="text-center">
                <h4>Your Score</h4>
                <h3>${score}</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3">
                <div class="text-center">
                <h4>Percentage Scored</h4>
                <h3>${percentage}%</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3">
                <div class="text-center">
                <h4>Total Correct</h4>
                <h3>${correct}</h3>
                </div>
            </div>
            <div class="card  score-card pt-3 pb-3">
                <div class="text-center">
                <h4>Total incorrect</h4>
                <h3>${inncorrect}</h3>
                </div>
            </div>
    
    
    `;

    responseDocRef = db.collection('/courses/categories/'+category+'/'+courseid+'/questions');


    var count=0;
    var quesData={};

    responseDocRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            snap = doc.data();


            questionNo = parseInt(doc.id);

            var questionText = snap.ques;



            if(questionNo<=totalQuestion){
                quesData[questionNo]= questionText;
                quesData[`${questionNo}.1`] = snap.opt1;
                quesData[`${questionNo}.2`] = snap.opt2;
                quesData[`${questionNo}.3`] = snap.opt3;
                quesData[`${questionNo}.4`] = snap.opt4;

                

                count++;

            
                if(count== totalQuestion){
                    //showQuestions(quesData, totalQuestion, ans ,res,e);

                
                    
                    for(qNo=1; qNo<=totalQuestion; qNo++){
                        

                        document.getElementById('responses').innerHTML += `
                        <div class="card data-card m-2">
                            <div>
                            <h5 class="mt-3 mb-3">Q${qNo}. ${quesData[qNo]}?</h5>
                            <div>
                                <h6 class="pl-4" id="${qNo}.1">1) ${quesData[`${qNo}.1`]}</h6>
                                </div>
                                <div>
                                <h6 class="pl-4" id="${qNo}.2">2) ${quesData[`${qNo}.2`]}</h6>
                                </div>
                                <div>
                                <h6 class="pl-4" id="${qNo}.3">3) ${quesData[`${qNo}.3`]}</h6>
                                </div>
                                <div>
                                <h6 class="pl-4" id="${qNo}.4">4) ${quesData[`${qNo}.4`]}</h6>
                                </div>
                                </div>
                                <div>
                                <br>
                                <h6 class="status pl-1" id="status${qNo}">Status:</h6>
                                <h6 class="crt-txt pl-1">Correct Ans: ${ans[qNo]}</h6>
                                <p class="expand-txt mt-3 mb-3 p-1" type="button" data-toggle="collapse" data-target="#multiCollapseExample${qNo}" aria-expanded="false" aria-controls="multiCollapseExample${qNo}">Show Explaination</p>

                                <div class="exp-card card collapse multi-collapse" id="multiCollapseExample${qNo}">
                                    <div class="card-body">
                                        <p class="card_text ">${e[qNo]}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                                

                            
                        `;
                        if(res[qNo]==0){
                            document.getElementById(`status${qNo}`).innerText="Status: Unattempted";
                            document.getElementById(`status${qNo}`).style.color="#e51f1f";      // red
                        }
                        else{
                            document.getElementById(`status${qNo}`).innerText="Status: Attempted";
                            document.getElementById(`status${qNo}`).style.color="#21ab2c";      // green
                            document.getElementById(`${qNo}.${res[qNo]}`).style.color="#4EC5F1";
                        }
                    }
                
                
                
                }
            }

        });
    });

}



function showQuestions(quesData, totalQuestion ,ans, res, e){



    for(qNo=1; qNo<=totalQuestion; qNo++){
        document.getElementById('responses').innerHTML += `
        <div class="card data-card m-5 p-5">
            <div>
            <h5 class="mt-3 mb-3">Q${qNo}. ${quesData[qNo]}?</h5>
            <div>
                <h6 class="pl-4" id="${qNo}.1">1) ${quesData[`${qNo}.1`]}</h6>
                </div>
                <div>
                <h6 class="pl-4" id="${qNo}.2">2) ${quesData[`${qNo}.2`]}</h6>
                </div>
                <div>
                <h6 class="pl-4" id="${qNo}.3">3) ${quesData[`${qNo}.3`]}</h6>
                </div>
                <div>
                <h6 class="pl-4" id="${qNo}.4">4) ${quesData[`${qNo}.4`]}</h6>
                </div>
                </div>
                <div>
                <br>
            <h6 class=" crt-txt pl-1">Correct Ans: ${ans[qNo]}</h6>
                <p class="expand-txt mt-3 mb-3 p-1" type="button" data-toggle="collapse" data-target="#multiCollapseExample${qNo}" aria-expanded="false" aria-controls="multiCollapseExample${qNo}">Show Explaination</p>

                <div class="exp-card card collapse multi-collapse" id="multiCollapseExample${qNo}">
                    <div class="card-body">
                        <p class="card_text ">${e[qNo]}</p>
                    </div>
                </div>
            </div>

        </div>
                

            
        `;

       // document.getElementById(`${questionNo}.${res[doc.id]}`).style.color="#4EC5F1";
    }
}
