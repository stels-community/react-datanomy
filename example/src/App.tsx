import { TodoProvider } from './store/todoStore'
import Header from './components/Header'
import Main from './components/Main'
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Header/>
        <Main/>
      </div>
    </TodoProvider>
  );
}

export default App;
