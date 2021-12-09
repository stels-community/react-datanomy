import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createServer } from "miragejs"

createServer({
  routes() {

    this.get("/api/todos", () => {
      let todos = localStorage.getItem('todos')
      return todos !== null ? JSON.parse(todos) : [
        { id: "1", text: "Integrate datanomy", complete: false },
        { id: "2", text: "Rethink app state concept", complete: false },
        { id: "3", text: "Apply Occam's razor to code", complete: false },
      ]
    }, { timing: 5000 })

    this.post("/api/todos", (schema, request) => {
      localStorage.setItem('todos', request.requestBody)
      return {success: true, message: "Saved!"}
    }, { timing: 5000 })

  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
