var parts=[];
$("#search").click(function(){
  $("#image").attr("src",$("#url").val());
  $("#url").val("");
  $("#imsSpace").empty();
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  parts=[];
});
$("#cropObs").click(function(){
  var d = new Date();
  var initialTime= d.getTime();
  crop(); 
  showParts(parts,true); //true means to crop with obscura
  appendPartsToImage();
  d=new Date();
  var lastTime= d.getTime();
  var totalTime=lastTime-initialTime;
  alert("The obscura time for cropping is: " + (totalTime/1000)%60+"s\n or: " +totalTime+"ms")
});
$("#cropEas").click(function(){
  var d = new Date();
  var initialTime= d.getTime();
  crop(); 
  showParts(parts,false); //true means to crop with easyCrop
  appendPartsToImage();
  d=new Date();
  var lastTime= d.getTime();
  var totalTime=lastTime-initialTime;
  alert("The easyCrop time for cropping is: " + (totalTime/1000)%60+"s\n or: " +totalTime+"ms")
});
$("#blend").click(function(){
  $("#imsSpace").empty();
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var counter =parts.length-1;
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
  if(parts.length!=0){
    orderByLine(false); //false means that the algorithm is going to use a voraz strategy
    appendPartsToImage();
  }else{
    alert("You have to crop an image first")
  }
});

$("#backtrack").click(function(){
  var c = document.getElementById("can");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  if(parts.length!=0){
    orderByLine(true); //true means that the algorithm is going to use backtrack strategy
    appendPartsToImage();
  }else{
    alert("You have to crop an image first")
  }
});