import { ToDo } from "./todo.js";

let todos = [];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById("todolist");

  // ToDo-Liste wird geleert
  todoListElement.innerHTML = "";

  // ToDos werden eingefügt
  for (const todo of todos) {
    const toDoListEntry = todo.element();
    todoListElement.appendChild(toDoListEntry);
  }

  // Alle offene ToDos
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById("anzahl");
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateToDoListOnScreen();

  const neuesToDoElement = document.getElementById("neuesToDo");

  //Neuer Task hinzufügen mit Enter
  neuesToDoElement.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      const todo = new ToDo(neuesToDoElement.value, false);
      todos.push(todo);
      neuesToDoElement.value = "";

      //Event löschen (Listener)
      todo.addEventListener("loeschen", (e) => {
        const index = todos.indexOf(e.target);
        todos.splice(index, 1);
        updateToDoListOnScreen();
      });

      //Event Checkbox (Listener)
      todo.addEventListener("changeCheckbox", (e) => {
        const index = todos.indexOf(e.target);
        todo.erledigt = !todo.erledigt;
        updateToDoListOnScreen();
      });

      const aufraeumen = document.getElementById("aufraeumen");

      //Event Anklicken (Listener)
      aufraeumen.addEventListener("click", (event) => {
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].erledigt) {
            todos.splice(i, 1);
            updateToDoListOnScreen();
          }
        }
      });
      updateToDoListOnScreen();
    }
  });
});
