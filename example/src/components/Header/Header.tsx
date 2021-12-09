import CounterView from '../CounterView'
import { NetworkStatus } from '../NetworkStatus';
import { useTodo } from '../../store/todoStore' 
import styles from './Header.module.css'

const { button } = styles;

const Header = () => {

  const [ , {
    increment, 
    decrement,
  }] = useTodo()
  
  return (
    <header>
      <h1>Datanomy demo</h1>
      <div>
        <div className={button} onClick={() => increment()}>⏶</div>
        <div className={button} onClick={() => decrement()}>⏷</div>
      </div>
      <CounterView/>
      <NetworkStatus/>
    </header>
  )
}
export default Header