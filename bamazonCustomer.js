const mysql = require('mysql');
const inquirer = require('inquirer');
const colors = require('colors');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    start();
})

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        runInquirer();
    });
};

function runInquirer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'customerItem_id',
            message: 'Enter the ID of the product you would like to buy',
        },
        {
            type: 'input',
            name: 'customer_quantity',
            message: 'How many would you like to buy?',
        }

    ]).then(answer => {
        console.log(answer);
        checkQuantity(answer);
    });
};

function checkQuantity(answer) {
    var customerItem_id = parseInt(answer.customerItem_id);
    var customer_quantity = parseInt(answer.customer_quantity);
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?;", [customerItem_id], function (err, res, fields) {
        if (err) throw err;
        var currentStock = res[0].stock_quantity;
        if (currentStock >= customer_quantity) {
            //allow user to proceed to checkout
            console.log("Proceed to checkout.".green);
            checkout(currentStock, customerItem_id, customer_quantity);
        }
        else {
            console.log("Not enough items in stock - only ".red + currentStock + " available for purchase.".red)
        }
    })

};

function checkout(currentStock, customerItem_id, customer_quantity) {
    var updatedStock = currentStock - customer_quantity;
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [updatedStock, customerItem_id], function (err, res, fields) {
        if (err) throw err;
        showPurchase(customerItem_id, customer_quantity);
    });
};

function showPurchase(customerItem_id, customer_quantity){
    connection.query("SELECT product_name, price FROM products WHERE item_id = ?;" , [customerItem_id], function (err, res, fields) {
        if (err) throw err;
        var product = res[0].product_name;
        var itemPrice= res[0].price;
        var totalPurchase = itemPrice * customer_quantity;

        console.log("Thank you for your purchase. You bought ".blue + product + " for a total of ".blue + "$" + totalPurchase + "! " + "Have a wonderful day".blue)
    connection.end();
    });
}