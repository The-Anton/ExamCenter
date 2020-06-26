 //getting course params
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  
  var course_name = getUrlVars()["course_name"];
  var category = getUrlVars()["category"];
  var amount = getUrlVars()["amount"];
  var date = getUrlVars()["date"];
  var txn_id = getUrlVars()["txn_id"];

  console.log(" category : ", category)
  console.log(" course_name : ", course_name)
  console.log(" amount : ", amount)
  console.log(" date : ", date)

  document.getElementById("invoice-no").innerHTML=Math.floor(Math.random() * 10000) + 1;
   
  document.getElementById("amount").innerHTML="&#8377; "+amount
  document.getElementById("amount_table").innerHTML="&#8377; "+amount
  document.getElementById("paid_amount").innerHTML="&#8377; "+amount
  document.getElementById("date").innerText=date
  document.getElementById("txn_id").innerHTML=txn_id
  document.getElementById("category").innerHTML=category.toUpperCase()
  document.getElementById("course_name").innerHTML=course_name.toUpperCase()
