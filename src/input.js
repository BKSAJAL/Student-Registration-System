//on load listener on window object to fetch data from session storage when page reloads
window.addEventListener("load", updateTable);

//function to update the table from the sesison storage
function updateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  const rows = JSON.parse(sessionStorage.getItem("Rows"));
  if (rows) {
    rows.forEach((ele, idx) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td>${ele.stdName}</td> 
              <td>${ele.stdId}</td> 
              <td>${ele.email}</td> 
              <td>${ele.contactNo}</td>
              <td><button data-index="${idx}" onclick="resetRow(event)">Reset</button> 
              <button data-index="${idx}" onclick="deleteRow(event)">Delete</button></td>`;
      tableBody.appendChild(tableRow);
    });
  }
}

//function to delete clicked student data
function deleteRow(e) {
  const index = parseInt(e.target.dataset.index);

  let items = JSON.parse(sessionStorage.getItem("Rows"));
  items.splice(index, 1); //remove item from array
  sessionStorage.setItem("Rows", JSON.stringify(items)); // update storage

  updateTable(); // re-render table
}

const form = document.getElementById("form");

//form submit event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //collecting data from form
  const stdName = form["std_name"].value;
  const stdId = form["std_id"].value;
  const email = form["email"].value;
  const contactNo = form["contact_no"].value;

  const newStudent = { stdName, stdId, email, contactNo };
  const rows = JSON.parse(sessionStorage.getItem("Rows"));

  //saving form data in session storage
  if (rows)
    sessionStorage.setItem("Rows", JSON.stringify([...rows, newStudent]));
  else sessionStorage.setItem("Rows", JSON.stringify([newStudent]));

  updateTable(); //calling the function to populate data in table
  form.reset(); //form reset to empty input fields
});

//Reset function to allow user to edit a specific student data
function resetRow(e) {
  const index = parseInt(e.target.dataset.index);

  let items = JSON.parse(sessionStorage.getItem("Rows"));
  const form = document.getElementById("form");
  form["std_name"].value = items[index].stdName;
  form["std_id"].value = items[index].stdId;
  form["email"].value = items[index].email;
  form["contact_no"].value = items[index].contactNo;

  deleteRow(e);
}
