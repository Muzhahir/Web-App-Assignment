function uponSubmit(event) {
     event.preventDefault();
     
     const goalName = document.getElementById("goalName").value;
     const currency = document.getElementById("currency").value || document.getElementById("typeCurrency").value;
     const target = document.getElementById("target").value;
     const category = document.querySelector('input[name="category"]:checked')?.value;
     const priority = document.querySelector('input[name="priority"]:checked')?.value;
     const startDate = document.getElementById('startDate').value || "Not set";
     const deadline = document.getElementById('deadline').value || "Not set";
     const note = document.getElementById("note").value || "NA";
     
     if(!goalName){
         event.preventDefault();
         gName_error.innerHTML="Required<br>";
     }
     if(!currency){
         event.preventDefault();
         currency_error.innerHTML="Required<br>";
     }
     if(!target){
         event.preventDefault();
         target_error.innerHTML="Required<br>";
     }
     if(!category){
         event.preventDefault();
         category_error.innerHTML="Required<br>";
     }
     if(!priority){
         event.preventDefault();
         priority_error.innerHTML="Required<br>";
     }
     else{
    const goal = {
        goalName,
        currency,
        target,
        category,
        priority,
        startDate: startDate || "Not set",
        deadline: deadline || "Not set",
        note,
        id: new Date().getTime() 
    };

    const goals = JSON.parse(localStorage.getItem('goals')) || [];

    goals.push(goal);

    localStorage.setItem('goals', JSON.stringify(goals));

    displayGoals();
    }
}

function displayGoals() {
    //
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const outputSection = document.getElementById("outputSection");

    outputSection.innerHTML = "";

    goals.forEach(goal => {
        outputSection.innerHTML += `

        </head>
        <body>
            <div class="goal" id="goal-${goal.id}" style="background-color: #f9f9f9; padding: 15px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px;">
                
                <h2>Goal Name: ${goal.goalName}</h2><br>
                <p class="one"><strong>Target Amount:</strong> ${goal.currency}${goal.target}</p>
                <p><strong>Remaining:</strong> ${goal.currency}${goal.remaining !== undefined ? goal.remaining : goal.target}</p>
                <p><strong>Category:</strong> ${goal.category}</p>
                <p><strong>Priority:</strong> ${goal.priority}</p>
                <p><strong>Start Date:</strong> ${goal.startDate}</p>
                <p><strong>Deadline:</strong> ${goal.deadline}</p>
                <p><strong>Note:</strong> ${goal.note}</p>
                <button onclick="addSavings(${goal.id})">Add Saving</button>
                <button onclick="deleteGoal(${goal.id})" class="del">Delete</button>
            </div>

        </body>
        `;
    });
}

function addSavings(goalId) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const goal = goals.find(g => g.id === goalId);

    if (goal) {
        if (goal.remaining === undefined) {
            goal.remaining = parseFloat(goal.target);
        }

        const expenseAmount = prompt("Enter expense amount:");
        if (expenseAmount) {
            goal.remaining -= parseFloat(expenseAmount);

            localStorage.setItem('goals', JSON.stringify(goals));

            displayGoals();
        }
    }
}

function deleteGoal(goalId) {

    const confirmDeletion = confirm("Are you sure you want to delete this goal?");

    if(confirmDeletion){
        const goals = JSON.parse(localStorage.getItem('goals')) || [];

        const updatedGoals = goals.filter(goal => goal.id !== goalId);

        localStorage.setItem('goals', JSON.stringify(updatedGoals));

        displayGoals();
    }
}

document.addEventListener('DOMContentLoaded', displayGoals);
