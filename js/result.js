var ans={};

var totalQuestion;
const db = firebase.firestore();

console.log("Page Started");
totalQuestion();

setTimeout(downloadData(),10000);
console.log("Ans :" ,ans);


function totalQuestion(){
    var docRef3 = db.collection("Shekhar").doc("testData");
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


    var docRef = db.collection("Shekhar").doc("Answers");

    docRef.get().then(function(doc) {

            snap = doc.data();
            console.log(doc.data().Q1);

            for(var i=1; i<=totalQuestion ; i++){
                var s = 'Q'+i;
                console.log(s);
                ans[`i`]= `${doc.data().s}`;
                console.log(doc.data().);
            }
    });
    
}
