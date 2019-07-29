import React from 'react';
import {Link} from 'react-router-dom';
import Fox from '../components/fox/fox.jsx';
import styles from './welcome.module.css';

export default class WelcomeComponent extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <div className="welcomeContainer">
        <Fox></Fox>
        <div className={styles.dialogContent}>
          <p>Hi, I'm Co! Who are you?</p>
          <Link to="/login">Tell me</Link>
        </div>
        <div className={styles.textContainer}>
          <p className="lf">随波逐流好看</p>
          <p className="rf">心随你动难见</p>
        </div>
      </div>
    )
  }
}