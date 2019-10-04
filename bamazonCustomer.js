// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
const mysql = require("mysql");
const inquirer = require("inquirer");

// The app should then prompt users with two messages.
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start () {
    console.log("~ Items available for sale: ~");
    connection.query("SElECT * FROM products", function(err, res) {
        if (err) throw err;
        // res.forEach(element => {
        //     console.table(res);
        // });
        console.table(res)
        promptQns();
    });
};

function promptQns() {
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
        {
        name: "product",
        type: "rawlist",
        message: "Please select a product ID to make an order.",
        choices: function () {
            let itemArr = [];
            for (var i = 0; i < results.length; i++) {
                itemArr.push(results[i].item_id);
            }
            return itemArr;
            }   
        }, {
        name: "units",
        type: "input",
        message: "How many units would you like to buy?",
        }
    ])
    .then(function(answer) {
        // console.log(results);
        var productChosen;
        for (let i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.product) {
                productChosen = results[i];
                // console.log(results[i]);
                // console.log(productChosen);
                console.table(results);
            }
        }
        
        if (productChosen.stock_quantity >= answer.units) {
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {stock_quantity: productChosen.stock_quantity - answer.units},
                {item_id: productChosen.item_id}
            ],
            function(error) {
                if (error) throw err;
                console.log("Order Successful!");
                promptQns();
            });
        } else {
            console.log("Insufficient quantity!");
            promptQns();
        }
    }); 
  })
};

// Please select product ID.
// How many units of the product would you like to buy?
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase