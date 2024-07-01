import inquirer from "inquirer";
// Class Bank Account 
class BankAccount {
    accountNo;
    balance;
    constructor(accountNo, balance) {
        this.accountNo = accountNo;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawl of $${amount} successful.Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$ fee chargedif more than $ 100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    //Check balance
    checkBalance() {
        console.log(`current balance $${this.balance}`);
    }
}
//Customer class
class Customer {
    firstname;
    lastname;
    gender;
    age;
    mobileno;
    account;
    constructor(firstname, lastname, gender, age, mobileno, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobileno = mobileno;
        this.account = account;
    }
}
// Create BankAccount
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create customer
const Customers = [
    new Customer("Faizan", "khan", "Male", 30, 315224871, accounts[0]),
    new Customer("Sarah", "khan", "Female", 28, 315224871, accounts[1]),
    new Customer("Bilal", "khan", "Male", 30, 315224871, accounts[2]),
];
//Function to interact with bank account
async function service() {
    do {
        const accountNoInput = await inquirer.prompt({
            name: "accountno",
            type: "number",
            message: " Enter your account number:"
        });
        const customer = Customers.find(customer => customer.account.accountNo === accountNoInput.accountno);
        if (customer) {
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "WithDraw", "Checkbalance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "WithDraw":
                    const WithDrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(WithDrawAmount.amount);
                    break;
                case "checkBalance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("invalid account number. Please try again");
        }
    } while (true);
}
service();
