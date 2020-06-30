var ans=[];
var res=[];
var exp;
var totalQuestion;
var timeLapsed;
document.getElementById("responses").style.display = "none";

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
                    timeLapsed = doc2.data().timeLapsed;
                    var docRef3 = db.collection('/courses/categories/'+category+'/'+courseid+'/questions').doc("explain");
                    docRef3.get().then(function(doc3) {
                        exp = doc3.data().exp;
                        processData(ans, res, exp,timeLapsed);

                    });

                

            });


    });
    
}

function processData(a,r,e,timeLapsed){
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
        }else if(response==0){
            unattempted++;
        }else{
            wrong++;
        }
    }

    inncorrect = wrong;
    score = correct*4-(inncorrect);
    percentage = (correct/totalQuestion)*100;
    percentage=percentage.toFixed(2);
    attempted = totalQuestion-unattempted;
    

    var docRef = db.collection('/users/'+uid+'/courses/'+courseid+'/result').doc("Report");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            
        } else {
                            
            db.collection('/users/'+uid+'/courses/'+courseid+'/result').doc("Report").set({
  
                    Score: score,
                    Correct: correct,
                    Inncorrect: inncorrect,
                    Percentage: percentage,
                    TimeTaken: timeLapsed
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
    console.log(timeLapsed);
    document.getElementById("result").innerHTML = `
            <div class="card score-card pt-3 pb-3" id="score">
                <div class="text-center">
                <h4>Your Score</h4>
                <h3>${score}</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3" id="time">
                <div class="text-center">
                <h4>Time Taken</h4>
                <h3>${timeLapsed} min</h3>
                </div>
            </div>
            
            <div class="card score-card pt-3 pb-3" id="percentage">
                <div class="text-center">
                <h4>Percentage Scored</h4>
                <h3>${percentage}%</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3" id="correct">
                <div class="text-center">
                <h4>Total Correct</h4>
                <h3>${correct}</h3>
                </div>
            </div>
            
    `;
    document.getElementById("result2").innerHTML = `
          
            
            <div class="card  score-card pt-3 pb-3" id="incorrect">
                <div class="text-center">
                <h4>Total incorrect</h4>
                <h3>${inncorrect}</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3" id="attempted">
                <div class="text-center">
                <h4>Attempted</h4>
                <h3>${attempted}</h3>
                </div>
            </div>
            <div class="card score-card pt-3 pb-3" id="unattempted">
                <div class="text-center">
                <h4>Unattempted</h4>
                <h3>${unattempted}</h3>
                </div>
            </div>
    
    
    `;
    showCharts(correct, inncorrect,unattempted,attempted, totalQuestion);

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

function showCharts(correct, inncorrect,unattempted,attempted,totalQuestion){

    var correct_prc=(correct/totalQuestion)*100;
    var inncorrect_prc=(inncorrect/totalQuestion)*100;
    var attempted_prc=(attempted/totalQuestion)*100;
    var unattempted_prc=(unattempted/totalQuestion)*100;

    google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {
  
          var data = google.visualization.arrayToDataTable([
            ['Status', 'Percentage'],
            ['Correct', Math.floor(correct_prc)],
            ['Inncorrect', Math.floor(inncorrect_prc)]
          ]);
          var data2 = google.visualization.arrayToDataTable([
            ['Status', 'Percentage'],
            ['Unattempted',  Math.floor(unattempted_prc)],
            ['Attempted',  Math.floor(attempted_prc)]
          ]);
  
          var options = {
            title: 'Analysis 1',
            fontName: 'Raleway',
            colors: ['#0abf53','#ff0000'],
            is3D: true
          };
          var options2 = {
            title: 'Analysis 2',
            fontName: 'Raleway',
            colors: ['#28c7fa','#fd7e14'],
            is3D: true
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
          var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
  
          chart.draw(data, options);
          chart2.draw(data2, options2);
        }
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

var j = 0;
function showResponses(){

    
        

            if (j == 0) {
                document.getElementById("expand-btn").innerText = "Hide Questions";
                j = 1;
                document.getElementById("responses").style.display = "block";

            } else {
                document.getElementById("expand-btn").innerText = "Show Questions";
                j = 0;
                document.getElementById("responses").style.display = "none";

            }
       

}
