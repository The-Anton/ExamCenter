var uid="Shekhar";

var ans=[];
var res=[];
var exp;
var totalQuestion;

const db = firebase.firestore();

console.log("Page Started");
totalQuestion();

setTimeout(downloadData(),10000);

function totalQuestion(){
    var docRef3 = db.collection(uid).doc("testData");
    docRef3.get().then(function(doc) {
    if (doc.exists) {
        totalQuestion = doc.data().TotalQuestions;
        console.log("Total Question", totalQuestion);


    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });

}



function downloadData(){


    var docRef = db.collection(uid).doc("Answers");

    docRef.get().then(function(doc) {

            ans = doc.data().ans;

            var docRef2 = db.collection(uid).doc("Responses");
            docRef2.get().then(function(doc2) {
                    res = doc2.data();
                    var docRef3 = db.collection(uid).doc("explain");
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
    console.log("Correct:", correct);
    console.log("Wrong:", wrong);
    score = correct*4;
    percentage = (correct/totalQuestion)*100;
    inncorrect = totalQuestion-correct;

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

    responseDocRef = db.collection("Shekhar");

    responseDocRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            snap = doc.data();


            questionNo = parseInt(doc.id);

            var questionText = snap.ques;

            if(questionNo<=totalQuestion){
                document.getElementById('responses').innerHTML += `
                <div class="card data-card m-5 p-5">
                    <div>
                    <h5 class="mt-3 mb-3">Q${questionNo}. ${questionText}?</h5>
                    <div>
                        <h6 class="pl-4" id="${questionNo}.1">1) ${snap.opt1}</h6>
                        </div>
                        <div>
                        <h6 class="pl-4" id="${questionNo}.2">2) ${snap.opt2}</h6>
                        </div>
                        <div>
                        <h6 class="pl-4" id="${questionNo}.3">3) ${snap.opt3}</h6>
                        </div>
                        <div>
                        <h6 class="pl-4" id="${questionNo}.4">4) ${snap.opt4}</h6>
                        </div>
                        </div>
                        <div>
                        <br>
                    <h6 class=" crt-txt pl-1">Correct Ans: ${ans[questionNo]}</h6>
                        
                    </div>

                </div>
                        
        
                    
                `;

                document.getElementById(`${questionNo}.${res[doc.id]}`).style.color="#4EC5F1";
            }
           
    
            

        });
    });

}

