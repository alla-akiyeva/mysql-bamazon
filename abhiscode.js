// Running this application will first display all of the items available for sale.
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "docker",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  afterConnection()

});

function afterConnection() {
  console.log("Here is the information of Products available for sale")
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    res.forEach(element => {
      //Print options.
      console.log(`Id(${element.item_id}) | Product (${element.product_name}) | Price ($${element.price}) | Stock (${element.stock_quantity})`);
  })
    console.log(res);
    start();
  });
}

// The app should then prompt users with two messages.
// Q1 The first should ask them the ID of the product they would like to buy.
// Q2 The second message should ask how many units of the product they would like to buy.
function start() {
  inquirer
    .prompt({
      name: "product",
      type: "list",
      message: "Would like to buy products?",
      choices: ["Yes", "No"]
    })
    .then(function(answer) {
      // based on their answer, either start or end buying process
      if (answer.product === "Yes") {
        buyProduct();
      }
      else if(answer.product === "No") {
        console.log("Good Bye!")
        connection.end();
      }
    });
}


function buyProduct() {
  // prompt for info about the item being put up for auction
  
      connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which items they'd like to buy
        inquirer
          .prompt([
            {
              name: "choice",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].item_id);
                }
                return choiceArray;
              },
              message: "What is the ID of the product they would like to buy?"
            },
            {
              name: "units",
              type: "input",
              message: "How many units you would like to buy?"
            }
          ])
          .then(function(answer) {
            // console.log(answer.units.stock_quantity)
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].item_id === answer.choice) {
                chosenItem = results[i];
                console.log(results);
                console.log(results[i])
                // console.log(chosenItem)
              }
            }
    
            // determine if stock was high enough
            if (chosenItem.stock_quantity >= answer.units) {
              // if stock high enough, so update db, let the user know, and start over
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {stock_quantity: chosenItem.stock_quantity - answer.units},
                  {item_id: chosenItem.item_id}
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Order Successful!");
                  start();
                }
              );
            }
            else {
              // not enough quantity, so apologize and start over
              console.log("Insufficient quantity!");
              start();
            }
          });
      });
    }