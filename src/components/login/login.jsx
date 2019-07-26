import React from 'react';
import styles from './login.css';

export default class LoginComponent extends React.Component{
  constructor(){
    super()
  }
  render(){
    // var bgImg = require("../static/img/1.jpg")
    return (
      <div className={styles.logonContainer}>
        {/* <img src={bgImg} alt="" className={styles.bgImg}/> */}
          <div className={styles.loginForm}>
              <p>
                <label htmlFor="user">用户名</label>
                <input type="text" id="user" placeholder="请输入用户名"/>
              </p>
              <p>
                <label htmlFor="password">密码</label>
                <input type="text" id="password" placeholder="请输入密码"/>
              </p>
              <div>
                <button>登录</button>
                <button>取消</button>
                <a className={styles.forgetPassword}>忘记密码?</a>
              </div>
          </div>
      </div>
    )
  }
}