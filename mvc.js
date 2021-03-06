/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor () {
    this.todos = [
      { id: 1, text: 'Run a marathon', complete: false },
      { id: 2, text: 'Plant a garden', complete: false }
    ]
  }

  bindTodoListChanged (callback) {
    this.onTodoListChanged = callback
  }

  _commit (todos) {
    this.onTodoListChanged(todos)
  }

  addTodo (todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false
    }

    this.todos.push(todo)

    this._commit(this.todos)
  }

  // Filter a todo out of the array by id
  deleteTodo (id) {
    // TODO: Uncomment next lines to see the result of the action
    // this.todos = this.todos.filter(todo => todo.id !== id)
    // this._commit(this.todos)
  }
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  constructor () {
    this.app = this.getElement('#root')
    this.form = this.getElement('#form')
    this.input = this.getElement('#input')
    this.submitButton = this.getElement('#button')
    this.todoList = this.getElement('#todo-list')
    this.app.append(this.todoList)
  }

  createElement (tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    return element
  }

  getElement (selector) {
    const element = document.querySelector(selector)
    return element
  }

  displayTodos (todos) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    // Create nodes
    todos.forEach(todo => {
      const li = this.createElement('li')
      li.id = todo.id

      const span = this.createElement('span')
      span.textContent = todo.text

      const deleteButton = this.createElement('button', 'delete')
      deleteButton.textContent = 'Delete'
      li.append(span, deleteButton)

      // Append nodes
      this.todoList.append(li)
    })

    // Debugging
    console.log(todos)
  }

  bindAddTodo (handler) {
    // this.form.addEventListener('submit', event => {
    //   event.preventDefault()
    //   if (this.input.value) {
    //     handler(this.input.value)
    //     this.input.value = ''
    //   }
    // })
  }

  bindDeleteTodo (handler) {
    // this.todoList.addEventListener('click', event => {
    //   if (event.target.className === 'delete') {
    //     const id = parseInt(event.target.parentElement.id)
    //     handler(id)
    //   }
    // })
  }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view

    // Explicit this binding
    this.model.bindTodoListChanged(this.onTodoListChanged)
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)

    // Display initial todos
    this.onTodoListChanged(this.model.todos)
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos)
  }

  handleAddTodo = todoText => {
    // TODO: Uncomment next lines to see the result of the action
    // this.model.addTodo(todoText)
  }

  handleDeleteTodo = id => {
    // TODO: Complete the challenge to handle delete todo
    // ...
  }
}

const app = new Controller(new Model(), new View())
