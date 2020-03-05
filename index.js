const clear = document.querySelector(".clear-completed");
const list = document.getElementById("list");
const input = document.getElementById("newtodo");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
let LIST = [];
let id = 0;

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length;
} else {
  LIST = [];
  id = 0;
}

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? "checked" : "";
  const LINE = done ? "completed" : "";

  const text = `<li class="${LINE}">
    <div class="view">
      <input class="toggle" type="checkbox" ${DONE} id=${id}><label>${toDo}</label>
      <button class="destroy" id=${id}></button>
    </div>
    </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}
//------------------------------------------------
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
    }
    input.value = "";
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
});
//====================================================

list.addEventListener("click", function(event) {
  let element = event.target;
  console.log(element);
  console.log(event.target.classList[0]);
  if (event.target.classList[0] === "toggle") {
    completeToDo(element);
  } else if (event.target.classList[0] === "destroy") {
    removeTo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//---------------------------------------------
function completeToDo(element) {
  //  element.classList.toggle(uncheck);
  //  element.classList.toggle(check);
  console.log(element.parentNode.parentNode);
  console.log(LIST[element.id]);
  if (element.parentNode.parentNode.classList.contains("completed")) {
    element.parentNode.parentNode.classList.remove("completed");
  } else {
    element.parentNode.parentNode.classList.add("completed");
  }
  //  element.parentNode.querySelector("text").classList.toggle(line_through);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
//--------------------------------------------------

function removeTo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//-----------------LOCAL STORAGE----------------------------

function loadToDo(ar) {
  ar.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//-----------------FILTERS-----------------------------
//------------------ACTIVE-----------------------------

active.addEventListener("click", function(event) {
  //const activeToDo = [];
  let element = event.target;
  let filterlist = element.parentNode.parentNode.querySelectorAll("li");
  filterlist.forEach((item, index) => {
    if (item.children[0].classList.contains("selected")) {
      item.children[0].classList.remove("selected");
    }
  });
  element.classList.add("selected");

  list.innerHTML = "";
  for (let i = 0; i < LIST.length; i++) {
    if (LIST[i].done === false) {
      //    activeToDo.push(LIST[i]);
      //    console.log(activeToDo);
      addToDo(LIST[i].name, i, LIST[i].done, LIST[i].trash);
    }
  }
});

//--------------COMPLETED---------------------------

completed.addEventListener("click", function(event) {
  //const activeToDo = [];
  let element = event.target;
  let filterlist = element.parentNode.parentNode.querySelectorAll("li");
  filterlist.forEach((item, index) => {
    if (item.children[0].classList.contains("selected")) {
      item.children[0].classList.remove("selected");
    }
  });
  element.classList.add("selected");

  list.innerHTML = "";
  for (let i = 0; i < LIST.length; i++) {
    if (LIST[i].done === true) {
      //    activeToDo.push(LIST[i]);
      //    console.log(activeToDo);
      addToDo(LIST[i].name, i, LIST[i].done, LIST[i].trash);
    }
  }
});

//------------------CLEAR COMPLETED--------------------------------

clear.addEventListener("click", function(event) {
  //const activeToDo = [];
  let element = event.target;
  let filterlist = element.parentNode.parentNode.querySelectorAll("li");
  filterlist.forEach((item, index) => {
    if (item.children[0].classList.contains("selected")) {
      item.children[0].classList.remove("selected");
    }
  });
  element.classList.add("selected");

  list.innerHTML = "";
  let clearComplete = [];
  // тут очистить все li

  for (let i = 0; i < LIST.length; i++) {
    if (LIST[i].done === false) {
      addToDo(LIST[i].name, i, LIST[i].done, LIST[i].trash);
      clearComplete.push(LIST[i]);
    }

    console.log(clearComplete);
    localStorage.setItem("TODO", JSON.stringify(clearComplete));
  }
});
