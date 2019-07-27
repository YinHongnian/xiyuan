import React from 'react';
import Fox from '../components/fox/fox.jsx';
import styles from './welcome.css';

export default class WelcomeComponent extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <div class="welcomeContainer">
        <Fox></Fox>
        <div className={styles.textContainer}>
          <p className="lf">随波逐流好看</p>
          <p className="rf">心随你动难见</p>
        </div>
      </div>
    )
  }
}