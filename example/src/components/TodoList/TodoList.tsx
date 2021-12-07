import { useEffect } from 'react'
import uniqId from '../../utils/uniqId'
import { useTodo, TTodo } from '../../store/todoStore' 
import Todo from '../Todo/Todo'
import styles from './TodoList.module.css'

const { button, todoContainer, todoList, todoButtons } = styles;

const TodoList = () => {

  const [{
    todos,
  }, {
    addTodo, 
    delTodo, 
    editTodo,
  }, {
    loadTodos,
    saveTodos,
  }] = useTodo()

  useEffect(() => { loadTodos() }, [loadTodos])
  
  return (
    <div className={todoContainer}>
      <div className={todoButtons}>
        <div 
          className={button} 
          title="Add todo"
          onClick={() => addTodo({
            id: uniqId(), 
            text: 'new todo', 
            complete: false, 
            newTodo: true,
          })}
          >+</div>
        <div className={button} onClick={() => saveTodos()}>Save todos</div>
      </div>
      <div className={todoList}>
        {
          todos.map(({id, text, complete, newTodo = false}: TTodo) => (
            <Todo {...{
              key: id, 
              text, 
              complete, 
              newTodo,
              onEdit: ({text, complete}) => editTodo({
                id, text, complete,
              }),
              onDelete: () => delTodo({id}),
            }} />
          ))
        }
      </div>
    </div>
  )
}

export default TodoList
