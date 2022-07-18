import { Todo } from './';

const countTodo = document.querySelector('.todo-count');

export class TodoList {
    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
        this.cargarPendientes();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
        this.cargarPendientes();
    }

    marcarCompletado(id){

        for(const todo of this.todos) {
            if (todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.cargarPendientes();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = localStorage.getItem('todo') ? 
                     JSON.parse(localStorage.getItem('todo')).map(Todo.fromJson) : [];
        this.cargarPendientes();
    }

    cargarPendientes(){
        let pend = 0;
        for (let todo of this.todos) {
            (!todo.completado) ?  pend++ : null;
        }
        countTodo.firstElementChild.innerHTML = pend;
    }
}