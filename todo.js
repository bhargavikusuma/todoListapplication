
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let passwordElement1 = document.getElementById('password');
let passwordElement2 = document.getElementById('password1');

let PasswordErrMsg1 =  document.getElementById('PasswordErrMsg1');
let PasswordErrMsg2 =  document.getElementById('PasswordErrMsg2');
 
let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let myFormEl = document.getElementById("myForm1");

let createFormId = document.getElementById("createForm")

let registioncontsiner = document.getElementById("registioncontsiner")
let createAccountId = document.getElementById('createAccountId')

let ButtonElement = document.getElementById('ButtonElement')

let success = document.getElementById('success')


//create page


//todoPageMain
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

let todoMainPageID = document.getElementById("todoMainPage")

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

addTodoButton.onclick = function() {
  onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }

}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;

  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };

  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
    alert('Are u sure to delete this task ?')
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}



let formData = {
  name: "",
  email: "",
  status: "Active",
  gender: "Male",
  password :"",
  passwordText : "" ,
};


createAccountId.onclick = function() {
    ButtonElement.classList.add('d-none')
    createFormId.classList.add('d-block')
}


nameEl.addEventListener("change", function(event) {
  if (event.target.value === "") {
    nameErrMsgEl.textContent = "Required*";
  } else {
    nameErrMsgEl.textContent = "";
  }

  formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
  if (event.target.value === "") {
    emailErrMsgEl.textContent = "Required*";
  } else {
    emailErrMsgEl.textContent = "";
  }

  formData.email = event.target.value;
});

passwordElement1.addEventListener("change", function(event) {
    if (event.target.value === "") {
        PasswordErrMsg1.textContent = "Required*";
    } else {
      PasswordErrMsg1.textContent = "";
    }
  
    formData.password = event.target.value;
  });
  
  passwordElement2.addEventListener("change", function(event) {
    if (event.target.value === "") {
      PasswordErrMsg2.textContent = "Required*";
    } else {
      PasswordErrMsg2.textContent = "";
    }
  
    formData.passwordText = event.target.value;
  });
  

workingStatusEl.addEventListener("change", function(event) {
  formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

function validateFormData(formData) {
  let {name, email , password , passwordText} = formData;
  if (name === "") {
    nameErrMsgEl.textContent = "Required*";
  }
  if (email === ""){
    emailErrMsgEl.textContent = "Required*";
  }
  if (password === "") {
    PasswordErrMsg1.textContent = "Required*";
  }
  if (passwordText === ""){
    PasswordErrMsg2.textContent = "Required*";
  }
}


function submitFormData(formData) {
    if(formData.password !== formData.passwordText){
        PasswordErrMsg2.textContent = 'please Enter Correct'
        alert('please Enter Correct')
    }else{

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
    },
    body: JSON.stringify(formData)
  };

  let url = "https://gorest.co.in/public-api/users";

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
      
      if (jsonData.code === 422) {
          alert('Email Already Exists please Login your account')
          success.textContent = 'success' ;
        todoMainPageID.classList.add('d-block')
        createFormId.classList.add('d-none')
        localStorage.setItem('formData' , JSON.stringify(formData) )
      }else if( jsonData.code === 201){
        success.textContent = 'success' ;
        todoMainPageID.classList.add('d-block')
        createFormId.classList.add('d-none')
        localStorage.setItem('formData' , JSON.stringify(formData) )
      }
    });
  }

}


myFormEl.addEventListener("submit", function(event){
  event.preventDefault();
  validateFormData(formData);
  submitFormData(formData);
});




