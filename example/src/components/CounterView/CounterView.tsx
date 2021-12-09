import { todoContext } from "../../store/todoStore"
import './CounterView.css'

const CounterView = () => (
  <todoContext.Consumer>
    { ([{counter}]) => <div className="counter">{counter}</div> }
  </todoContext.Consumer>
)
export default CounterView