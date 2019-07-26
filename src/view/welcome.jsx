import React from 'react';
import Fox from '../components/fox/fox.jsx';

export default class WelcomeComponent extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <Fox el={this}></Fox>
    )
  }
}