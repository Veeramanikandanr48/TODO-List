let todos = [];

    // Function to generate a random motivation quote
    function generateMotivationQuote() {
      const quotes = [
        "Your only limit is you.",
        "Believe you can and you're halfway there.",
        "Don't watch the clock; do what it does. Keep going.",
        "Push yourself because no one else is going to do it for you.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "The only way to do great work is to love what you do.",
        "Don't stop when you're tired. Stop when you're done.",
        "The best way to predict the future is to create it."
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    }

    // Function to add a new todo
    function addTodo() {
      const todoInput = document.getElementById("todo-input");
      const todoText = todoInput.value.trim();

      if (todoText !== "") {
        // Check if the todo already exists
        const exists = todos.some(todo => todo.text.toLowerCase() === todoText.toLowerCase());
        if (exists) {
          alert("Task already exists!");
          return;
        }

        const todo = {
          id: Date.now(),
          text: todoText.charAt(0).toUpperCase() + todoText.slice(1), // Capitalize the first letter
          completed: false
        };

        todos.push(todo);
        updateLocalStorage(); // Save todos to localStorage
        renderTodos();

        todoInput.value = "";
        todoInput.focus();
      }
    }
// Function to edit a todo
function editTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  const todoText = prompt("Edit the task:", todo.text);

  if (todoText !== null) {
    const editedTodoText = todoText.trim();
    
    if (editedTodoText !== "") {
      const exists = todos.some(todo => todo.text.toLowerCase() === editedTodoText.toLowerCase());
      if (exists) {
        alert("Task already exists!");
        return;
      }

      todo.text = editedTodoText.charAt(0).toUpperCase() + editedTodoText.slice(1);
      updateLocalStorage(); // Save todos to localStorage
      renderTodos();
    }
  }
}

    // Function to remove a todo
    function removeTodo(id) {
      todos = todos.filter(todo => todo.id !== id);
      updateLocalStorage(); // Save todos to localStorage
      renderTodos();
    }

    // Function to toggle the completed status of a todo
    function toggleTodoCompleted(id) {
      todos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      updateLocalStorage(); // Save todos to localStorage
      renderTodos();
    }

    // Function to show all todos
    function showAllTodos() {
      const tabs = document.getElementsByClassName("nav-link");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      document.getElementById("pending-list").style.display = "none";
      document.getElementById("completed-list").style.display = "none";
      document.getElementById("all-list").style.display = "block";
      document.getElementsByClassName("nav-link")[0].classList.add("active");
    }

    // Function to show pending todos
    function showPendingTodos() {
      const tabs = document.getElementsByClassName("nav-link");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      document.getElementById("all-list").style.display = "none";
      document.getElementById("completed-list").style.display = "none";
      document.getElementById("pending-list").style.display = "block";
      document.getElementsByClassName("nav-link")[1].classList.add("active");
    }

    // Function to show completed todos
    function showCompletedTodos() {
      const tabs = document.getElementsByClassName("nav-link");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      document.getElementById("all-list").style.display = "none";
      document.getElementById("pending-list").style.display = "none";
      document.getElementById("completed-list").style.display = "block";
      document.getElementsByClassName("nav-link")[2].classList.add("active");
    }

    // Function to toggle the theme
    function toggleTheme() {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("dark-theme");
    }

    // Function to update localStorage with the current todos
    function updateLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Function to retrieve todos from localStorage
    function retrieveLocalStorage() {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        todos = JSON.parse(storedTodos);
      }
    }

    // Function to render the todos
    function renderTodos() {
      const allList = document.getElementById("all-list");
      const pendingList = document.getElementById("pending-list");
      const completedList = document.getElementById("completed-list");

      allList.innerHTML = "";
      pendingList.innerHTML = "";
      completedList.innerHTML = "";

      todos.forEach(todo => {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("class", "todo-item animated fadeIn");
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="toggleTodoCompleted(${todo.id})">
      <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
      <span class="todo-remove-btn remove-icon" onclick="removeTodo(${todo.id})"><i class="fas fa-trash-alt"></i></span>
      <button class="edit-btn" onclick="editTodo(${todo.id})"><i class="fas fa-edit"></i></button>
    `;

        allList.appendChild(todoItem);

        if (todo.completed) {
          const completedItem = todoItem.cloneNode(true);
          completedList.appendChild(completedItem);
        } else {
          const pendingItem = todoItem.cloneNode(true);
          pendingList.appendChild(pendingItem);
        }
      });
    }

    // Retrieve todos from localStorage on page load
    retrieveLocalStorage();

    // Render the initial todos
    renderTodos();

    // Generate a random motivation quote on page load
    document.getElementById("motivation-quote").textContent = generateMotivationQuote();

    // Handle Enter key press event
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        addTodo();
      }
    });