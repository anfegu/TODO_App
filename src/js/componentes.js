import { todoList } from '..';
import { Todo } from '../classes';

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'),
    txtInput = document.querySelector('.new-todo'),
    btnBorrar = document.querySelector('.clear-completed'),
    ulFilters = document.querySelector('.filters'),
    anchorFiltros = document.querySelectorAll('.filtro');
    
export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
   
    if (event.keyCode === 13 && txtInput.value.trim() !== ''){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml (nuevoTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {
    
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', () => {
    if (todoList.todos.length > 0){
        todoList.eliminarCompletados();
        for ( let i= divTodoList.children.length - 1; i >= 0; i--){
            if (divTodoList.children[i].classList.contains('completed')){
                divTodoList.removeChild(divTodoList.children[i]);
            }
        }
    }   
 
});

ulFilters.addEventListener('click', (event) => {
    if (!event.target.text) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
        elemento.classList.remove('hidden');

        switch ( event.target.text ) {
            case 'Pendings': 
                if (elemento.classList.contains('completed')) elemento.classList.add('hidden');
                break;
            case 'Completes': 
                if (!elemento.classList.contains('completed')) elemento.classList.add('hidden');
                break;    
            default:
                break;
        }
    }
});
