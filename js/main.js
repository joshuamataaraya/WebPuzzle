var parts=[];
$("#search").click(function(){
  $("#image").attr("src",$("#url").val());
  $("#can").empty();
  $("#imsSpace").empty();
});
$("#crop").click(function(){
  var d = new Date();
  var initialTime= d.getMilliseconds();
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  var part={
    quadrants:[]
  };
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var quadrants=generateQuadrants();
  var partCounter=1;
  while(quadrants.length>0 && parts.length<50){
    var quadrant=quadrants[0];
    if(isAbleHundred(quadrant,quadrants)){ //insert parts of 100x10
      var quadrantToInsert=quadrant;
      var part={
        quadrants:[],
        size:100,
        num: partCounter
      };
      partCounter++;
      for(var quadrantNumber=1;quadrantNumber<=10;quadrantNumber++){
        part.quadrants.push(quadrantToInsert);
        quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
        quadrantToInsert++;
      }
      alert(5)
      getPartImg2(part,ctx);

      parts.push(part);
      quadrant=quadrants[0]; 
    }
    if(isAbleEighty(quadrant,quadrants)){
      var quadrantToInsert=quadrant;
      var part={
        quadrants:[],
        size:80,
        num:partCounter
      };
      partCounter++;
      for(var quadrantNumber=1;quadrantNumber<=8;quadrantNumber++){
        part.quadrants.push(quadrantToInsert);
        quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
        quadrantToInsert=getDownQuadrant(quadrantToInsert,total);
      }
      alert(5)
      getPartImg2(part,ctx);   
      parts.push(part);
      quadrant=quadrants[0];
    }
    if(quadrants.length>0){
      var quadrantToInsert=quadrant
      var part={
        quadrants:[],
        size:10,
        num: partCounter
      };
      partCounter++;
      part.quadrants.push(quadrantToInsert);
      quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
      alert(5)
      getPartImg2(part,ctx);
      parts.push(part);       
      quadrant=quadrants[0];
    }
  }
  var d = new Date();
  var lastTime= d.getMilliseconds();
  var totalTime=lastTime-initialTime;
  //alert(totalTime);

  showParts(parts);
});
$("#blend").click(function(){
  $("#imsSpace").empty();
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var counter =parts.length-1;
  alert(counter)
  while (--counter) {
    var j = Math.floor((Math.random()*1000)%parts.length); 
    var i = counter; 
    var temp = parts[i];
    parts[i] = parts[j];
    parts[j] = temp;
  }
  showParts(parts);
  appendPartsToImage();
});
$("#voraz").click(function(){
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var loopNumber=1;
  var tempSolution=parts;
  while(noSolution(tempSolution,loopNumber)){
    tempSolution=selectSolution(tempSolution);
    loopNumber++;
  }
  parts=tempSolution;
  appendPartsToImage();
});
noSolution=function(tempSolution,loopNumber){
  if(loopNumber<1800){
    for(var partIndex=1;partIndex<tempSolution.length;partIndex++){
      if(tempSolution[partIndex].num<tempSolution[partIndex-1].num){
        return true;
      }
    }
    return false;
  }else{
    return false;
  }
}
selectSolution=function(tempSolution){
  for(part1=0,part2=1;part2<tempSolution.length;part1++,part2++){
    if(tempSolution[part2].num<tempSolution[part1].num){
      var temp = tempSolution[part1];
      tempSolution[part1] = tempSolution[part2];
      tempSolution[part2] = temp;
    }
  }
  return tempSolution;
}

$("#backtrack").click(function(){
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  // meto un elemento
  // si es menor que el 
  // part3={
  //   num:3
  // };
  // part4={
  //   num:4
  // };
  // part1={
  //   num:1
  // };
  // part2={
  //   num:2
  // };
  // var solution=[];
  // var p=[part3,part4,part1,part2];
  // solution=backtracking(0,p,solution,0);

  if(parts.length!=0){
    alert(parts.length)
    var solution=[];
    solution=backtracking2(0,parts,solution,0);  
    parts=solution;
    appendPartsToImage();
  }else{
    alert("You have to crop an image first")
  }
});
backtracking2=function(index,allParts,partsSol,indexToRest,isBackTrack){
  var solution=false;
  while(!solution){
    if(notIn(allParts[index],partsSol)){
      partsSol.push(allParts[index]);
      if(index==0 || partsSol.length==1|| partsSol[partsSol.length-1].num>partsSol[partsSol.length-2].num){
        if(partsSol.length==allParts.length){
          solution=true;
        }else{
          if(!isBackTrack){ //when it find a solution, cheks if there was any backTrack before 
            ++index;
          }else{
            index=indexToRest;
            indexToRest=0;
            isBackTrack=false;
          }
        }
      }else{ //backtrack here
        var beforeLastPart=allParts.indexOf(partsSol[partsSol.length-2]);
        if(isBackTrack){ //if it is comming from a backtrack 
          if(beforeLastPart<indexToRest)
          {
            indexToRest=beforeLastPart;
          }
        }else{
          indexToRest=beforeLastPart;
        }
        partsSol.pop();
        partsSol.pop();
        isBackTrack=true;
      }
    }else{
      index++;
      isBackTrack=false;
    }
  }
  return partsSol
}
backtracking=function(index,allParts,partsSol,indexToRest,isBackTrack){
  if(notIn(allParts[index],partsSol)){
    partsSol.push(allParts[index]);
    if(index==0 || partsSol.length==1|| partsSol[partsSol.length-1].num>partsSol[partsSol.length-2].num){
      if(partsSol.length==allParts.length){
        return partsSol;
      }else{
        if(!isBackTrack){ //when it find a solution, cheks if there was any backTrack before 
          return backtracking(++index,allParts,partsSol,indexToRest);
        }else{
          index=indexToRest;
          indexToRest=0;
          return backtracking(index,allParts,partsSol,indexToRest,false); 
        }
      }
    }else{ //backtrack here
      var beforeLastPart=allParts.indexOf(partsSol[partsSol.length-2]);
      if(isBackTrack){ //if it is comming from a backtrack 
        if(beforeLastPart<indexToRest)
        {
          indexToRest=beforeLastPart;
        }
      }else{
        indexToRest=beforeLastPart;
      }
      partsSol.pop();
      partsSol.pop();
      return backtracking(index,allParts,partsSol,indexToRest,true);
    }
  }else{
    return backtracking(++index,allParts,partsSol,indexToRest,false);
  }
}
notIn=function(a,b){
  for(i=0;i<b.length;i++){
    if(b[i].num==a.num){
      return false;
    }
  }
  return true;
}
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

showParts=function(){
  var partIndex=0;  
  for(;partIndex<parts.length;partIndex++){
    var elementID = 'canvas' + String(partIndex);
     $('<canvas>').attr({
        id: elementID
    }).css({
    }).appendTo('#imsSpace');
    var c = document.getElementById(elementID);
    var ctx = c.getContext("2d");
    getPartImg(parts[partIndex],1,1,ctx); 
  }
}
isAbleEighty=function(firstQuadrant,quadrants){ //check if its able to 
        //crop a part of 100x10
	var img = document.getElementById("image");
	var total=((img.width)-(img.width)%10)/10;//the quadrants are of 10x10
	var quadrant=firstQuadrant;
	for(var quadrantNumber=1;quadrantNumber<=8;quadrantNumber++){
	  if(isCroped(quadrant,quadrants) ||   
	    (quadrant>getTotalOfQuadrants())){
	      return false;
	  }
	  quadrant=getDownQuadrant(quadrant,total)
	}
	return true;
}

isAbleHundred=function(firstQuadrant,quadrants){
	var img = document.getElementById("image");
	var total=((img.width)-(img.width)%10)/10; //the quadrants are of 10x10
	var quadrant=firstQuadrant;
  if(quadrant%total==0){
    var commonValueOfTheLine=Math.floor(quadrant/total)-1; 
  }else{
    var commonValueOfTheLine=Math.floor(quadrant/total); 
  }
	for(var quadrantNumber=1;quadrantNumber<=10;quadrantNumber++){
	  if(isCroped(quadrant,quadrants) || 
	    (Math.floor(quadrant/total)>commonValueOfTheLine && quadrant%total!=0)){
	      return false;
	  }
	  quadrant++;
	};
	return true;    
}

isCroped=function(quadrant,quadrants){
	if(jQuery.inArray(quadrant,quadrants)<0){
	  return true;
	}else{
	  return false;
	}
}
generateQuadrants=function(){
        
	var totalOfQuadrants=getTotalOfQuadrants();
	var quadrants=[];
	for(var quadrant=1;quadrant<=totalOfQuadrants;quadrant++){
	  quadrants.push(quadrant);
	}
	return quadrants;
}

getTotalOfQuadrants=function(){
    var img = document.getElementById("image");
    var totalHeight=((img.height)-(img.height)%10)/10;
    var totalWidth=((img.width)-(img.width)%10)/10;
    return totalWidth*totalHeight;
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
getCanva=function(){
 // create the canvas
 // create var camera = new obscura('img/my-image.gif'[,'#target']);
 // crop  camera.crop(x,y,width,height);
 // add the canvas to a div to show, the one from the scroll
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
