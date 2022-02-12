import { createDatanomy, TReducers, TScenarios } from "react-datanomy";

export type TTodo = {
  id: string;
  complete: boolean;
  text: string;
  newTodo?: boolean; 
}

type TState = {
  counter: number;
  todos: Array<TTodo>;
  loading: boolean;
  saving: boolean;
}

const initialState: TState = {
  counter: 0,
  todos: [],
  loading: false,
  saving: false
}

const reducers: TReducers<TState> = {

  increment: (state) => ({ ...state, counter: state.counter + 1 }),
  
  decrement: (state) => ({ ...state, counter: state.counter - 1 }),
  
  setLoading: (state, loading) => ({ ...state, loading }),

  setSaving: (state, saving) => ({ ...state, saving }),
  
  addTodo: (state, todo) => ({
    ...state, 
    todos: [ todo, ...state.todos ]
  }),
  
  delTodo: (state, todo) => ({
    ...state, 
    todos: state.todos.filter(({id}) => id !== todo.id)
  }),

  editTodo: (state, todo) => ({
    ...state, 
    todos: state.todos.map(
      ({id, text, complete}) => id === todo.id ? todo : {id, text, complete}
    )
  }),
}


const logCounter = (getContext: Function) => console.log(getContext()[0].counter)

const scenarios: TScenarios<TState> =  { 
  loadTodos: async (getContext: Function) => {
    const [,{
      addTodo, delTodo, setLoading
    }] = getContext()

    logCounter(getContext)
    
    setLoading(true)
    
    const response = await fetch('/api/todos')
    const todos = await response.json()
    
    todos.forEach((todo: TTodo) => {
      delTodo(todo)
      addTodo(todo)
    });

    setLoading(false)
    
    logCounter(getContext)
    
  },

  saveTodos: async (getContext, todos = null) => {
    var [ state, {
      setSaving
    }] = getContext()
    const data = todos !== null ? todos : state.todos

    setSaving(true);
    let response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data)
    });
    
    let result = await response.json();
    setSaving(false);

    console.log(result);
  },
}

export const [ 
  TodoProvider, 
  useTodo,
  todoContext
] = createDatanomy<TState>(initialState, reducers, scenarios)
