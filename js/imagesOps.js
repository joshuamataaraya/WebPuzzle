//it insert the parts into the div with scroll
//on the left
showParts=function(isObs){
  var partIndex=0;  
  for(;partIndex<parts.length;partIndex++){
    getCanva(parts[partIndex],isObs) 
    $('<p>').css({
    }).appendTo('#imsSpace');
  }
}
//it uses the cropping frameworks
getCanva=function(part,isObs){
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var x= getX(part.quadrants,total);
  var y= getY(part.quadrants,total);
  if(part.size==10){
    height=10;
    width=10;
  }else if(part.size==80){
    height=80;
    width=10;
  }else{
    height=10;
    width=100;
  }
  var canvaID = 'canvas' + String(part.num);
    $('<canvas>').attr({
        id: canvaID
    }).css({
    }).appendTo('#imsSpace');
  if(isObs){
    var camera = new obscura('#image','#'+canvaID).crop(x,y,width,height);
  }else{
    var camera = new easyCrop('image',canvaID).crop(x,y,width,height);  
  }
  // canva=document.getElementById(canvaID);
  // context= canva.getContext("2d");
  // img=document.getElementById("image");
  // context.drawImage(img,x,y,width,height,0,0,width,height);
  // canva.width=width;
  // canva.height=height;
}
//it appends every part into the image
//according to the order of the parts list
appendPartsToImage=function(){
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  partIndex=0;
  quadrants=generateQuadrants();
  var quadrantToDraw;
  for(;partIndex<parts.length;partIndex++){
    quadrantToDraw=quadrants[0];
    var x=getX([quadrantToDraw],total);
    var y=getY([quadrantToDraw],total);
    if(parts[partIndex].size==10){
      quadrants.splice(quadrants.indexOf(quadrantToDraw),1);
    }else if (parts[partIndex].size==80) {
      for(var quadrantNumber=1;quadrantNumber<=8;quadrantNumber++){
        quadrants.splice(quadrants.indexOf(quadrantToDraw),1);
        quadrantToDraw=getDownQuadrant(quadrantToDraw,total);
      }
    }else{
      for(var quadrantNumber=1;quadrantNumber<=10;quadrantNumber++){
        quadrants.splice(quadrants.indexOf(quadrantToDraw),1);
        quadrantToDraw++;
      }
    }
    getPartImg(parts[partIndex],x,y,ctx);
  }
}
getPartsImgs=function(parts,canva){
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var partCounter=0;
  for(;partCounter<parts.length;partCounter++){
    var part=parts[partCounter];
    var x=getX(part.quadrants,total);
    var y=getY(part.quadrants,total);
    if(part.size==10){
      height=10;
      width=10;
    }else if(part.size==80){
      height=80;
      width=10;
    }else{
      height=10;
      width=100;
    }
    canva.drawImage(img,x,y,width,height,x,y,width,height);
  }
}
getPartImg=function(part,destX,destY,canva){
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var x= getX(part.quadrants,total);
  var y= getY(part.quadrants,total);
  if(part.size==10){
    height=10;
    width=10;
  }else if(part.size==80){
    height=80;
    width=10;
  }else{
    height=10;
    width=100;
  }
    canva.drawImage(img,x,y,width,height,destX,destY,width,height);
}
getPartImg2=function(part,canva){
    var img = document.getElementById("image");
    var total=Math.floor(((img.width)-(img.width)%10)/10);
    var x= getX(part.quadrants,total);
    var y= getY(part.quadrants,total);
    var height;
    var width;
  if(part.size==10){
    height=10;
    width=10;
  }else if(part.size==80){
    height=80;
    width=10;
  }else{
    height=10;
    width=100;
  }
    canva.drawImage(img,x,y,width,height,x,y,width,height);
}
getY=function(quadrants,total){
  if(quadrants[0]%total!=0){
    var result=Math.floor(quadrants[0]/total)*10;
    if(!isNaN(result)){
      return result;  
    }else{
      return 0;
    }
  }else{
    return ((quadrants[0]/total)-1)*10;
  }
}
getX=function(quadrants,total){ 
    if(quadrants[0]%total!=0){
      var result=Math.floor(((quadrants[0]%total)-1)*10);
      if(!isNaN(result))
        return result;
      else{
        return 0;
      }
    }else{
      return (total-1)*10;
    }
}
getDownQuadrant=function(quadrantNum,total){
  return quadrantNum+total;
}
