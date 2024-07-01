import inquirer from "inquirer";
 

interface BankAccount{
    accountNo: number;
    balance:number;
    withdraw(amount: number):void
    deposit(amount:number): void
    checkBalance():void
}

// Class Bank Account 
class BankAccount implements BankAccount{

   
    accountNo: number;
    balance: number;

    constructor(accountNo: number, balance: number) {
        this.accountNo = accountNo;
        this.balance = balance;
    }

    // Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`withdrawl of $${amount} successful.Remaining balance: $${this.balance}`)
        }else{
            console.log("Insufficient Balance")
        }
    }

    //Credit money
    deposit(amount:number):void{
        if (amount > 100) {
            amount -=1 //$ fee chargedif more than $ 100 is deposited
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`)
}

//Check balance
checkBalance(): void {
    console.log(`current balance $${this.balance}`);
}
}

//Customer class

class Customer{
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    mobileno: number;
    account: BankAccount;

    constructor(firstname: string, lastname: string, gender: string, age: number, mobileno: number, account: BankAccount
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobileno = mobileno;
        this.account = account;
    }
}

// Create BankAccount

const accounts: BankAccount[]=[
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),

];

//Create customer

const Customers: Customer[] = [
    new Customer ("Faizan", "khan", "Male", 30, 315224871, accounts[0]),
    new Customer ("Sarah", "khan", "Female", 28, 315224871, accounts[1]),
    new Customer ("Bilal", "khan", "Male", 30, 315224871, accounts[2]),
]

//Function to interact with bank account

async function service() {
    do{
        const accountNoInput = await inquirer.prompt({
            name: "accountno",
            type: "number",
            message: " Enter your account number:"
        })

        const customer = Customers.find(customer => customer.account.accountNo === accountNoInput.accountno)
     if (customer){
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}!\n`)
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Deposit", "WithDraw", "Checkbalance", "Exit"]
            }]);

            switch (ans.select){
     case "Deposit":
                const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })

            customer.account.deposit(depositAmount.amount);
            break;

   case "WithDraw":
                const WithDrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })

            customer.account.deposit(WithDrawAmount.amount);
            break;

     case "checkBalance":
                customer.account.checkBalance();
                break;
            
    case "Exit" :
            console.log("Exiting bank program...");
            console.log("\n Thank you for using our bank services. Have a great day!")
            return;
        }
    }else{
            console.log("invalid account number. Please try again");
        }
    } while(true)
}
service()


                
            
        
        
    

