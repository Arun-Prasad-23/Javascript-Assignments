var expenses = [];

function addExpense() {
    var description = document.getElementById("description").value.trim();
    var amount = parseFloat(document.getElementById("amount").value);
    var date = document.getElementById("date").value;

    if (description === "" || isNaN(amount) || amount <= 0 || date === "") {
        alert("Please enter valid expense details!");
        return;
    }

    expenses.push({ description, amount, date });
    displayExpenses();

    document.getElementById("expense-form").reset();
}

function displayExpenses() {
    var expenseList = document.getElementById("expense-list");
    var totalSpan = document.getElementById("total");
    expenseList.innerHTML = "";

    var total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        var li = document.createElement("li");
        li.innerHTML = `
            ${expense.description} - ₹${expense.amount} - ${expense.date}
            <button class="edit" onclick="editExpense(${index})">Edit</button>
            <button class="delete" onclick="deleteExpense(${index})">Delete</button>
        `;

        expenseList.appendChild(li);
    });

    totalSpan.textContent = total;
}

function editExpense(index) {
    var newDesc = prompt("Enter new description:", expenses[index].description);
    var newAmount = parseFloat(prompt("Enter new amount:", expenses[index].amount));
    var newDate = prompt("Enter new date:", expenses[index].date);

    if (newDesc && !isNaN(newAmount) && newAmount > 0) {
        expenses[index].description = newDesc;
        expenses[index].amount = newAmount;
        expenses[index].date = newDate;
        displayExpenses();
    }
}

function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        displayExpenses();
    }
}
