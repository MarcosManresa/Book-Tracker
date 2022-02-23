let Transfiction = [];
let myChart;

fetch("/api/transaction")
  .then(response => {
    return response.json();
  })
  .then(data => {
    
    Transfiction = data;

    populateTotal();
    populateTable();
    populateChart();
  });

function populateTotal() {
  
  let total = Transfiction.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  Transfiction.forEach(Transfiction => {
    
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${Transfiction.name}</td>
      <td>${Transfiction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

function populateChart() {
  
  let reversed = Transfiction.slice().reverse();
  let sum = 0;

 
  let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  
  let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });

  
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels,
        datasets: [{
            label: "Total Over Time",
            fill: true,
            backgroundColor: "#6666ff",
            data
        }]
    }
  });
}

function sendTransfiction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");


  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  }
  else {
    errorEl.textContent = "";
  }

  
  let Transfiction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString()
  };

  
  if (!isAdding) {
    Transfiction.value *= -1;
  }

 
  Transfiction.unshift(Transfiction);

  
  populateChart();
  populateTable();
  populateTotal();
  
 
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(Transfiction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
  .then(response => {    
    return response.json();
  })
  .then(data => {
    if (data.errors) {
      errorEl.textContent = "Missing Information";
    }
    else {
      
      nameEl.value = "";
      amountEl.value = "";
    }
  })
  .catch(err => {
  
    saveRecord(Transfiction);

   
    nameEl.value = "";
    amountEl.value = "";
  });
}

document.querySelector("#add-btn").onclick = function() {
  sendTransfiction(true);
};

document.querySelector("#sub-btn").onclick = function() {
  sendTransfiction(false);
};
