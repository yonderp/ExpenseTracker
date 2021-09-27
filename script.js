const balance = document.getElementById("balance");
const money_plus = document.getElementById("money_plus");
const money_minus = document.getElementById("money_minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 }//AQUI POSIBLE ERROR 
];

let transactions = dummyTransactions;

//add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionsDOM(transaction);

    updateValues();

    text.value = "";
    amount.value = "";
  }
}

//generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// add transactions to DOM
function addTransactionsDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  }">x</button>
  `;

  list.appendChild(item);
}

//update the balance, kincome and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc+= item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc +=item), 0)
    .toFixed(2);
  
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc +=item), 0) *
    -1
  ).toFixed(2);
   
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  }

  //remove transactio by id
  function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
  }

//init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionsDOM);
}

init();

form.addEventListener("submit", addTransaction);
