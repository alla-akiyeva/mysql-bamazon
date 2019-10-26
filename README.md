# Bamazon
This Node.js app uses command line interface to imitate an online storefront. It takes orders from customers via the command prompt and depletes stock from the store's MySQL inventory.

## Getting Started
Clone the repo and run `npm i` to install dependencies. You will also need to have a MySQL server running and connect to the database with the password provided. To populate the database with items from the store, run the code in the `sql` file. Finally, start the app by running the BamazonCustomer.js file in the command line.

### Deployment
Since it is a CLI application, Bamazon is not deployed on GitHub or Heroku. To see it in action, please run the app locally.

### How It Works
The app prompts users with two messages. The first asks the ID of the product they would like to buy. By using the arrow keys, users can navigate the prompt to select the ID of a preferred product. The second message ask how many units of the product they would like to buy.

![](/assets/Bamazon-successful_order.gif)

Once the customer has placed the order, the application will check if the store has enough units of the product to complete the customer's request. If not, the app will alert the user that the quantity is insufficient, and the order will not go through. If the store does have enough of the product, it will fulfill the customer's order and the database will be updated accordingly. In either case, the customer will be able to place another order. 

![](/assets/Bamazon-insufficient.gif)


### Built With
* [mysql](https://www.npmjs.com/package/mysql) - used to connect to database from Node.js
* [inquirer](https://www.npmjs.com/package/inquirer) - used for interactive command line user interfaces
