
const titleField = document.getElementById("title");
const descriptionField = document.getElementById("description");
const successMsg = document.getElementById("success");
const displayData = document.getElementById("display");
const showAllTable = document.getElementById("showAll");
const updateMsg = document.getElementById("update");
let currentUpdateId;
let currentRow;
successMsg.style.display = "none";
updateMsg.style.display = "none";
getAllTodoFromServer();

function clearField(){
    console.log("clear clicked")
    titleField.value = "";
    descriptionField.value = "";
}
function submitTodo(){
    console.log("Submit clicked!")
    const title = titleField.value.trim();
    const desc = descriptionField.value.trim();
    if(title.length == 0){
        alert("Title is Required!");
        return;
    }
    if(desc.length == 0){
        alert("Description is Required!");
        return;
    }

    createTodoOnServer(title, desc);
}
function updateTodo(){
    console.log("Update clicked!")
    const title = titleField.value;
    const desc = descriptionField.value;
    updateRow(currentUpdateId, title, desc);
}

function updateRow(id, title, desc){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "description": desc
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/update?id="+id, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            updateMsg.style.display = "block";
            clearField();
            currentUpdateId = 0;
            currentRow.cells[1].innerHTML = title;
            currentRow.cells[2].innerHTML = desc;

        })
        .catch(error => console.log('error', error));
}


function createTodoOnServer(title, desc){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "description": desc
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/new", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            successMsg.style.display = "block";
            clearField();
            getTodoFromServer(result);
        })
        .catch(error => console.log('error', error));
}
function getTodoFromServer(id){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/get?id=" + id, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            const obj = JSON.parse(result);
            console.log(obj);
            const row = displayData.insertRow(1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerHTML = obj.id;
            cell2.innerHTML = obj.title;
            cell3.innerHTML = obj.description;
            addNewRowInShowAllTable(obj);
        })
        .catch(error => console.log('error', error));
}



function getAllTodoFromServer(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/findAll/get", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            const todoArray = JSON.parse(result);
            console.log(todoArray);
            for(let i = 0; i < todoArray.length; i++){
                addNewRowInShowAllTable(todoArray[i])
            }
        })
        .catch(error => console.log('error', error));
}
function addNewRowInShowAllTable(todo){
    const row = showAllTable.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.innerHTML = todo.id;
    cell2.innerHTML = todo.title;
    cell3.innerHTML = todo.description;
    cell4.innerHTML = "<button onclick='editRow("+todo.id+",this)' class = 'btn btn-primary'>Edit</button>";
    cell5.innerHTML = "<button onclick='deleteRow("+todo.id+",this)' class = 'btn btn-danger'>Delete</button>";

}
function deleteRow(id, x){
    var rowIndex = x.parentElement.parentElement.rowIndex;
    console.log("deleted clicked: " +id)
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/delete?id=" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            showAllTable.deleteRow(rowIndex)
        })
        .catch(error => console.log('error', error));

}

function editRow(id, x){

    currentRow = x.parentElement.parentElement;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/todo/get?id=" + id, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            const obj = JSON.parse(result);
            console.log(obj);
            titleField.value = obj.title;
            descriptionField.value = obj.description;
            currentUpdateId = obj.id;
        })
        .catch(error => console.log('error', error));
}


