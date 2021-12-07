import { 
  memo, 
  useRef, 
  useState, 
  useEffect,
  useCallback
} from 'react'
import './Todo.css'

const Todo = ({
  text = "", 
  complete = false, 
  newTodo = false, 
  onEdit = (arg: {[key: string]: any}) => {}, 
  onDelete = () => {}
}) => {
  
  const [edit, setEdit] = useState(newTodo)
  const [textValue, setTextValue] = useState(text)
  const [completeValue, setCompleteValue] = useState(complete)    
  
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if(inputRef.current && inputRef.current !== document.activeElement) {
      inputRef.current.focus()
    }
  })

  const handleTextChange = useCallback(({target, type, key}) => {
    setTextValue(target.value)
    if(type === 'blur' || key === 'Enter') {
      onEdit({
        text: target.value, 
        complete: completeValue
      })
      setEdit(false)
    }
  }, [completeValue, onEdit])
  
  const handleCompleteChange = useCallback(({target}) => {
    setCompleteValue(target.checked)
    onEdit({
      text: textValue, 
      complete: target.checked
    })
  }, [textValue, onEdit])
  
  const handleEditClick = useCallback(() => {
    if(!completeValue) setEdit(true)
  }, [completeValue])
  
  return (
    <div className="todo">
      <span className="delete-todo" onClick={onDelete}>❌</span>
      <span className="complete-todo">
        <input 
          type="checkbox" 
          checked={completeValue} 
          onChange={handleCompleteChange}/>
      </span>
      <span className="edit-todo">
        { 
          edit
          ? <input 
              ref={inputRef} 
              type="text" 
              value={textValue} 
              onChange={handleTextChange} 
              onBlur={handleTextChange}
              onKeyPress={handleTextChange}/>
          : <span 
              className={`${completeValue ? "" : "not-"}complete`} 
              onClick={handleEditClick}>
              { textValue }
            </span>
        }
      </span>
    </div>
  )
}

export default memo(Todo)