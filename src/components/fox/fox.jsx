import React from 'react';

export default class Fox extends React.Component{
  constructor(el){
    super()
  }
  componentDidMount(){
    debugger
    var foxConvas = document.getElementById('foxContainer');
    var ctx = foxConvas.getContext('2d');
    ctx.clearRect(0,0,500,500);
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true);
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    ctx.stroke();
  }
  render(){
    return(
      <canvas id="foxContainer"></canvas>
    )
  }
}