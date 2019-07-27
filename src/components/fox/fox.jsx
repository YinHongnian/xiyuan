import React from 'react';

export default class Fox extends React.Component{
  constructor(){
    super();
    this.state={
      ctx:null,
      leftEye:{x:470,y:420}, //左眼球中心位置
      rightEye:{x:870,y:420},  //右眼球中心位置
      lastP:[window.innerWidth/4,window.innerHeight/2],  //鼠标的位置
    }
    this.drawEye=this.drawEye.bind(this);
    this.clearArc=this.clearArc.bind(this);
    this.moveEye=this.moveEye.bind(this);
    this.drawEar=this.drawEar.bind(this);
  }
  componentDidMount(){
    var foxConvas = document.getElementById('fox');
    var ctx = foxConvas.getContext('2d');
    this.setState({ctx:ctx});

    //脸
    ctx.beginPath();
    ctx.arc(670,620,400,0,Math.PI,true);
    ctx.fillStyle="rgb(255,255,0)";
    ctx.fill();
    ctx.stroke();

    //眼眶
    ctx.beginPath();
    ctx.arc(470,420,80,0,2*Math.PI,true);
    ctx.moveTo(950,420);
    ctx.arc(870,420,80,0,2*Math.PI,true);
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();

    this.moveEye();
  }
  componentDidUpdate(){
    this.drawEye();
    this.drawEar();
  }
  drawEye(){
    let {ctx,leftEye,rightEye} = this.state;
    // 清除眼眶内的眼球
    this.clearArc(470,420,80,1);
    this.clearArc(870,420,80,1);

    //画眼球
    ctx.beginPath();
    ctx.arc(leftEye.x,leftEye.y,40,0,2*Math.PI,true);
    ctx.moveTo(rightEye.x+40,rightEye.y);
    ctx.arc(rightEye.x,rightEye.y,40,0,2*Math.PI,true);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fill();
    ctx.stroke();
  }
  clearArc(x,y,radius,stepClear){
    let {ctx} = this.state;
    var calcWidth=radius-stepClear;
    var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);
    
    var posX=x-calcWidth;
    var posY=y-calcHeight;
    
    var widthX=2*calcWidth;
    var heightY=2*calcHeight;
    
    if(stepClear<=radius){
      ctx.clearRect(posX,posY,widthX,heightY);
      stepClear+=1;
      this.clearArc(x,y,radius,stepClear);
    }
  }
  moveEye(){
    let {lastP,leftEye,rightEye} = this.state;
    var that = this;
    window.addEventListener('mousemove',function(e){
      var ex = e.clientX, ey = e.clientY;
      var theta = (ex===lastP[0]?Math.PI/2 : Math.atan((ey-lastP[1])/(ex-lastP[0])));
      var bx = window.innerWidth/4;  // x方向边界值, 屏幕分为四等分
      var by = window.innerHeight/4;
      var cosTheta = Math.abs(Math.cos(theta));
      var sinTheta = Math.abs(Math.sin(theta));
      var leftSphere = {x:leftEye.x,y:leftEye.y};
      var rightSphere = {x:rightEye.x,y:rightEye.y};

      //向右移动
      if(ex>lastP[0]){
        // 左方不动,右方动
        if(ex>2*bx){
          if(ex>3*bx){
            leftSphere.x = 470 + 40*cosTheta;
            rightSphere.x = 870 + 40*cosTheta;
          } else {
            leftSphere.x = 470 + 40*((ex-2*bx)/bx)*cosTheta;
            rightSphere.x = 870 + 40*((ex-2*bx)/bx)*cosTheta;
          }
        }
      } else {  //向左移动
        if(ex<2*bx){
          if(ex<bx){
            leftSphere.x = 470 - 40*cosTheta;
            rightSphere.x = 870 - 40*cosTheta;
          } else{
            leftSphere.x = 470 - 40*((2*bx-ex)/bx)*cosTheta;
            rightSphere.x = 870 - 40*((2*bx-ex)/bx)*cosTheta;
          }
        }
      }

      if(ey<lastP[1]){ //向上移动
        if(ey<2*by){
          if(ey<by){
            rightSphere.y = leftSphere.y = 420 - 40*sinTheta;
          } else {
            rightSphere.y = leftSphere.y = 420 - 40*((2*by-ey)/by)*sinTheta;
          }
        }
      } else {
        if(ey>2*by){
          if(ey>3*by){
            rightSphere.y = leftSphere.y = 420 + 40*sinTheta;
          } else {
            rightSphere.y = leftSphere.y = 420 + 40*((ey-2*by)/by)*sinTheta;
          }
        }
      }

      that.setState({
        leftEye:leftSphere,
        rightEye:rightSphere,
        lastP:[ex,ey]
      })
    })
  }
  drawEar(){
    let {ctx,leftEye,rightEye} = this.state;
    var startX = 400*Math.cos(3*Math.PI/8);
    var startY = 400*Math.sin(3*Math.PI/8)

     //画耳朵
     ctx.beginPath();
     ctx.moveTo(670-startX,620-startY);
     ctx.lineTo(670-startX,520-startY);
     ctx.arc(640-startX,520-startY,30,0,Math.PI,true);
     ctx.lineTo(640-startX,635-startY);

     ctx.moveTo(670+startX,620-startY);
     ctx.lineTo(670+startX,520-startY);
     ctx.arc(700+startX,520-startY,30,Math.PI,2*Math.PI,false);
     ctx.lineTo(700+startX,635-startY);
     ctx.fillStyle="rgb(255,255,0)";
     ctx.fill();
     ctx.stroke();
  }
  render(){
    return(
      <canvas id="fox" width="1340" height="620"></canvas>
    )
  }
}