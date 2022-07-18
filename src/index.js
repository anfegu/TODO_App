import './styles.css';
import {crearTodoHtml} from './js/componentes';
import { TodoList } from './classes';

export const todoList = new TodoList();
todoList.todos.forEach(crearTodoHtml);


