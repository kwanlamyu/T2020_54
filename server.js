const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//template obj to send a request
var options = {
  //placeholder
  //url: "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/" + req.body.userName,
  //
  url: "",
  method: "GET",
  headers: {
    identity: "T77",
    token: "d74f68a7-ade9-4996-b74e-985353d31892"
  }
};

//req.body.<name of form>
//homepage/login page

app.get("/login", function(req, res) {
  //send home screen html
  //console.log("asdhksd               " , req.body);
  res.sendFile(__dirname + "/t2020-54/src/app/login/login.component.html");
  //console.log(__dirname + "/t2020-54/src/app/login/login.component.html");
  //res.send("<h1>Hello!</h1>");
});

// Customer ID
// app.get("/customerId", function(req, res) {
//   //http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/:userName
//   options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan";
//   request(options, function(error, response, body){
//     //convert JSON to javascript obj
//     //var data = JSON.parse(body);
//     //console.log(data);
//     res.write(body);
//     res.send();
//   });
// });


app.post("/login", function(req, res) {
  //
  var personStuff = {
    userName: "",
    // accountId: 0,
    // type: "",
    // displayName: "",
    // accountNumber: 0,
    customerId: 0
  };
  //http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/:userName
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/" + req.body.userId;
  //console.log(req.body);
  request(options, function(error, response, body) {
    personStuff.userName = req.body.userId;

    var data = JSON.parse(body);
    personStuff.customerId = data.customerId;

    res.json(personStuff);
  });
});


//customer details
app.post("/profile", function(req, res) {
  //http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/:customerId/details
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/" + req.body.customerId + "/details";
  //options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/" + "2" + "/details";
  request(options, function(error, response, body) {


    var data = JSON.parse(body);

    var profileDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dateOfBirth,
      gender: data.gender
    };

    res.json(profileDetails);
  });
});

app.post("/dashboard", function(req, res) {

  var personStuff = {
    accountId: 0,
    type: "",
    displayName: "",
    accountNumber: 0
  };

  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/" + req.body.customerId;
  request(options, function(error, response, body) {
    res.json(body);
  });
});

app.post('/account-details', function(req, res) {

  var transacDetails = {
    transactions: {},
    monthlyExpenses: {
      atm: 0,
      leisure: 0,
      food: 0,
      transport: 0,
      others: 0,
      total: 0
    }
  };

  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/"+ req.body.accountId + "?from=" + req.body.startDate + "&to=" + req.body.endDate;
  request(options, function(error, response, body) {
    transacDetails.transactions = body;
    //get the json data
    var jsonData = JSON.parse(body);
    //total amount spent for each category
    var atm = 0;
    var leisure = 0;
    var food = 0;
    var transport = 0;
    var others = 0;

    for (var id in jsonData) {
      if (jsonData[id].tag.toString() === "ATM") {
        atm += Number(jsonData[id].amount);
      } else if (jsonData[id].tag.toString() === "LEISURE") {
        leisure += Number(jsonData[id].amount);
      } else if (jsonData[id].tag.toString() === "F&B") {
        food += Number(jsonData[id].amount);
      } else if (jsonData[id].tag.toString() === "TRANSFER") {
        transport += Number(jsonData[id].amount);
      } else {
        others += Number(jsonData[id].amount);
      }
    }
    // total amount spent for the month
    var total = Number(atm.toFixed(2)) + Number(leisure.toFixed(2)) + Number(food.toFixed(2)) + Number(transport.toFixed(2)) + Number(others.toFixed(2));
    transacDetails.monthlyExpenses.atm = atm.toFixed(2);
    transacDetails.monthlyExpenses.leisure = leisure.toFixed(2);
    transacDetails.monthlyExpenses.food = food.toFixed(2);
    transacDetails.monthlyExpenses.transport = transport.toFixed(2);
    transacDetails.monthlyExpenses.others = others.toFixed(2);
    transacDetails.monthlyExpenses.total = total.toFixed(2);
    console.log(transacDetails);
    res.json(transacDetails)
  });
});

//List of Deposit Accounts
app.get("/depositAccounts", function(req, res) {
  //"http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/:customerId"
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/2";
  request(options, function(error, response, body) {
    //convert JSON to javascript obj
    //var data = JSON.parse(body);
    //console.log(data);
    res.write(body);
    res.send();
  });
});

//Get balance of deposit accounts
app.get("/depositAccountsBalance", function(req, res) {
  //"http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/:accountId/balance?month=1&year=2018"
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/79/balance?month=0&year=2018";
  request(options, function(error, response, body) {
    //convert JSON to javascript obj
    //var data = JSON.parse(body);
    //console.log(data);
    res.write(body);
    res.send();
  });
});

//List of Marketing Messages
app.get("/marketingMessages", function(req, res) {
  //"http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/marketing"
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/marketing";
  request(options, function(error, response, body) {
    //convert JSON to javascript obj
    //var data = JSON.parse(body);
    //console.log(data);
    res.write(body);
    res.send();
  });
});

//Details of Marketing Messages
app.get("/marketingMessageDetails", function(req, res) {
  //"http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/marketing/:id"
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/marketing/1";
  request(options, function(error, response, body) {
    //convert JSON to javascript obj
    //var data = JSON.parse(body);
    //console.log(data);
    res.write(body);
    res.send();
  });
});

//Personal Messages
app.get("/personalMessage", function(req, res) {
  //"http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/message/:customerId"
  options.url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/message/2";
  request(options, function(error, response, body) {
    //convert JSON to javascript obj
    //var data = JSON.parse(body);
    //console.log(data);
    res.write(body);
    res.send();
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
