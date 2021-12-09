import { PureComponent } from "react";
import { todoContext } from "../../store/todoStore";
import styles from './NetworkStatus.module.css';

export class NetworkStatus extends PureComponent {

  static contextType = todoContext;

  render () {

    const [{ loading, saving, }] = this.context

    return <>
      {loading ? <div className={styles.info}>Loading...</div> : ''}
      {saving ? <div className={styles.info}>Saving...</div> : ''}
    </>
  }
}