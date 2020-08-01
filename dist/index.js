const mainTitle = document.querySelector('#mainTitle');
const mainSubTitle = document.querySelector('#mainSubTitle');
const headerText = {
    registerHeader: {
        title: 'Creat an Account',
        subTitle: 'Fill the form below to create bank account',
    },
    accountHeader: {
        title: '',
        subTitle: 'What would you like to do today ?',
    },
    withdrawHeader: {
        title: 'Withdrawal Funds',
        subTitle: 'Please input amount funds to withdraw',
    },
    depositHeader: {
        title: 'Deposit Funds',
        subTitle: 'Please input amount funds to deposit',
    },
    balanceHeader: {
        title: 'Account Balance',
        subTitle: 'Account balance includes your lasts actions',
    },
};
const UserInterface = {
    accountUI: drawAccountUI,
    balanceUI: drawBalanceUI,
};
class BankAccount {
    constructor(ownerName = "Guest", accountPassword, accountNum, balance) {
        this.ownerName = ownerName;
        this.accountPassword = accountPassword;
        this.accountNum = accountNum;
        this.balance = balance;
    }
    withdrawalFunds(amountToWithdraw) {
        this.balance = this.balance - Number(amountToWithdraw);
    }
    depositFunds(amountToDeposit) {
        this.balance = this.balance + Number(amountToDeposit);
    }
    getBalance() {
        return this.balance;
    }
    getOwnerName() {
        return this.ownerName;
    }
    getPassword() {
        return this.accountPassword;
    }
    getAccountNumber() {
        return this.accountNum;
    }
}
(function () {
    const createAccountBtn = document.querySelector('#createAccountBtn');
    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const account = createAccountProcedure();
        console.log(account);
        drawUI(null, UserInterface.accountUI, headerText.accountHeader, account);
    });
})();
function drawUI(currentProcedure, requestedUI, headersObj, account) {
    const contextContainer = document.querySelector('#contextContainer');
    mainTitle.innerText = headersObj.title;
    mainSubTitle.innerText = headersObj.subTitle;
    const UI = currentProcedure === null ? requestedUI(account) : withdrawOrDepositUI(currentProcedure, account);
    contextContainer.innerHTML = '';
    contextContainer.append(UI);
}
function drawAccountUI(account) {
    const container = document.createElement('div');
    const withdrawBtn = document.createElement('button');
    const depositBtn = document.createElement('button');
    const balanceBtn = document.createElement('button');
    withdrawBtn.addEventListener('click', () => {
        drawUI('withdrawalFunds', null, headerText.withdrawHeader, account);
    });
    depositBtn.addEventListener('click', () => {
        drawUI('depositFunds', null, headerText.depositHeader, account);
    });
    balanceBtn.addEventListener('click', () => {
        drawUI(null, UserInterface.balanceUI, headerText.balanceHeader, account);
    });
    container.setAttribute('class', 'container d-flex flex-row justify-content-center border-bottom');
    withdrawBtn.setAttribute('class', 'btn btn-danger w-25 m-5');
    depositBtn.setAttribute('class', 'btn btn-success w-25 m-5');
    balanceBtn.setAttribute('class', 'btn btn-warning w-25 m-5');
    withdrawBtn.innerText = 'Withdraw Funds';
    depositBtn.innerText = 'Deposit Funds';
    balanceBtn.innerText = 'Account Balance';
    mainTitle.innerText = `Hello ${account.getOwnerName()}`;
    container.append(withdrawBtn, depositBtn, balanceBtn);
    return container;
}
const withdrawOrDepositUI = function (classMethod, account) {
    const container = document.createElement('div');
    const row = document.createElement('div');
    const procedureInput = document.createElement('input');
    const procedureBtn = document.createElement('button');
    const backBtn = document.createElement('button');
    procedureBtn.addEventListener('click', () => {
        if (Math.sign(Number(procedureInput.value)) === -1 || procedureInput.value === '') {
            alert('You must insert a vaild number !');
            return;
        }
        account[classMethod](procedureInput.value);
    });
    backBtn.addEventListener('click', () => {
        drawUI(null, UserInterface.accountUI, headerText.accountHeader, account);
    });
    container.setAttribute('class', 'container');
    row.setAttribute('class', 'd-flex');
    procedureInput.setAttribute('class', 'form-control w-25 mr-4');
    procedureInput.setAttribute('type', 'number');
    procedureInput.setAttribute('placeholder', 'Amount');
    procedureBtn.setAttribute('class', 'btn btn-primary');
    backBtn.setAttribute('class', 'btn btn-info ml-auto');
    procedureBtn.innerText = 'Submit';
    backBtn.innerText = 'Back to Account';
    row.append(procedureInput, procedureBtn, backBtn);
    container.append(row);
    return container;
};
function drawBalanceUI(account) {
    const container = document.createElement('div');
    const balance = document.createElement('h1');
    const backBtn = document.createElement('button');
    backBtn.addEventListener('click', () => { drawUI(null, UserInterface.accountUI, headerText.accountHeader, account); });
    container.setAttribute('class', 'container');
    balance.setAttribute('class', 'text-center mb-5');
    backBtn.setAttribute('class', 'btn btn-info d-block m-auto');
    backBtn.innerText = 'Back to Account';
    if (Math.sign(account.getBalance()) !== -1) {
        balance.setAttribute('class', 'text-center text-success mb-5');
        balance.innerText = `+ ${account.getBalance()} ILS`;
    }
    else {
        balance.setAttribute('class', 'text-center text-danger mb-5');
        balance.innerText = `${account.getBalance()} ILS`;
    }
    container.append(balance, backBtn);
    return container;
}
function createAccountProcedure() {
    const fullNameInput = document.querySelector('#fullNameInput');
    const passwordInput = document.querySelector('#passwordInput');
    const accountNumber = Number(_getAccountNumber());
    const isName = fullNameInput.value === "" ? undefined : fullNameInput.value;
    const currentNewAccount = new BankAccount(isName, passwordInput.value, accountNumber, 0);
    return currentNewAccount;
    function _getAccountNumber() {
        return Math.ceil(100000 + Math.random() * 999999);
    }
}
