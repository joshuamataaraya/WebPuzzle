//---start cropping functions
crop=function(){
  parts=[]
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var part={
    quadrants:[]
  };
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10;
  var quadrants=new Object()
  quadrants=generateQuadrants();
  var partCounter=1;
  while(quadrants.length>0){
    var quadrant=quadrants[0];
    if(isAbleHundred(quadrant,quadrants,total)){ //insert parts of 100x10
      var quadrantToInsert=quadrant;
      var part=cropHundred(quadrantToInsert,quadrants,partCounter,total)
      parts.push(part);
      quadrant=quadrants[0]; 
      partCounter++;
    }
    if(isAbleEighty(quadrant,quadrants,total)){
      var quadrantToInsert=quadrant;
      var part=cropEighty(quadrantToInsert,quadrants,partCounter,total)
      parts.push(part);
      quadrant=quadrants[0];
      partCounter++;
    }
    if(quadrants.length>0){ //if its able to crop a piece of 10x10
      var quadrantToInsert=quadrant
      var part=cropTen(quadrantToInsert,quadrants,partCounter,total)
      parts.push(part);       
      quadrant=quadrants[0];
      partCounter++;
    }
  }
  //have to show the time
}
isAbleHundred=function(firstQuadrant,quadrants,total){
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
cropHundred=function(quadrantToInsert,quadrants,num,total){
  var part={
    quadrants:[],
    size:100,
    num: num,
    line: getLine(quadrantToInsert)
  };
  for(var quadrantNumber=1;quadrantNumber<=10;quadrantNumber++){
    part.quadrants.push(quadrantToInsert);
    quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
    quadrantToInsert++;
  }
  return part;
}
isAbleEighty=function(firstQuadrant,quadrants,total){ //check if its able to 
        //crop a part of 100x10
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
cropEighty=function(quadrantToInsert,quadrants,num,total){
  var part={
    quadrants:[],
    size:80,
    num:num,
    line: getLine(quadrantToInsert)
  };
  for(var quadrantNumber=1;quadrantNumber<=8;quadrantNumber++){
    part.quadrants.push(quadrantToInsert);
    quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
    quadrantToInsert=getDownQuadrant(quadrantToInsert,total);
  }
  return part;
}
cropTen=function(quadrantToInsert,quadrants,num,total){
  var part={
    quadrants:[],
    size:10,
    num: num,
    line: getLine(quadrantToInsert)
  };
  part.quadrants.push(quadrantToInsert);
  quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
  return part;
}
getLine=function(quadrant){
  var img = document.getElementById("image");
  var total=((img.width)-(img.width)%10)/10; 
  if(quadrant%total==0){
    return Math.floor(quadrant/total)-1; 
  }else{
    return Math.floor(quadrant/total); 
  }
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

//---End cropping functions



//---start rearming functions
//this function apply the algorithms to each line
orderByLine=function(isBackTrack){ 
  var partsByLines=[];
  var partIndex=0
  //it makes a matrix of the parts, ordering by lines
  for(;partIndex<parts.length;partIndex++){     if(partsByLines[parts[partIndex].line]==null){
      partsByLines[parts[partIndex].line]=[]
    }
    partsByLines[parts[partIndex].line].push(parts[partIndex]);
  }
  parts=partsByLines;
  if(isBackTrack){
    var d = new Date();
    var initialTime= d.getTime();
    for(partIndex=0;partIndex<parts.length;partIndex++){
      parts[partIndex]=backtracking(0,parts[partIndex],[],0); 
    }
    d=new Date();
    var lastTime= d.getTime();
    var totalTime=lastTime-initialTime;
    alert("The obscura time for cropping is: " + (totalTime/1000)%60+"s\n or: " +totalTime+"ms")
  }else{
    var d = new Date();
    var initialTime= d.getTime();
    for(partIndex=0;partIndex<parts.length;partIndex++){
      parts[partIndex]=voraz(parts[partIndex]); 
    }
    d=new Date();
    var lastTime= d.getTime();
    var totalTime=lastTime-initialTime;
    alert("The obscura time for cropping is: " + (totalTime/1000)%60+"s\n or: " +totalTime+"ms")
  }
  returnToSimpleList()

} 
//this functions changes the matrix of parts to a simple list
returnToSimpleList=function(){ 
  var partsAux=[];
  var lineIndex=0;
  var partIndex;
  for(;lineIndex<parts.length;lineIndex++){
    for(partIndex=0;partIndex<parts[lineIndex].length;partIndex++){
      partsAux.push(parts[lineIndex][partIndex])
    }
  }
  parts=partsAux
}
//---End rearming functions



//---start voraz functions
voraz=function(parts){
  var loopNumber=1;
  var tempSolution=parts;
  while(noSolution(tempSolution,loopNumber)){
    tempSolution=selectSolution(tempSolution);
    loopNumber++;
  }
  return tempSolution;
}
noSolution=function(tempSolution,loopNumber){
  if(loopNumber<tempSolution.length/2){
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

//---End voraz functions


//---start BackTrack functions
backtracking=function(index,allParts,partsSol,indexToRest,isBackTrack){
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
notIn=function(part,parts){
  for(partIndex=0;partIndex<parts.length;partIndex++){
    if(parts[partIndex].num==part.num){
      return false;
    }
  }
  return true;
}
//---End backtrack functions