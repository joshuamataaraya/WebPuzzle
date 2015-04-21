$("#search").click(function(){
	$("#image").attr("src",$("#url").val());
});
$("#crop").click(function(){
	var c = document.getElementById("can");
      var ctx = c.getContext("2d");
      var part={
        quadrants:[]
      };
      var img = document.getElementById("image");
      var total=((img.width)-(img.width)%10)/10;
      var quadrants=generateQuadrants();
      var parts=[];
      while(quadrants.length>0){
        var quadrant=quadrants[0];
        if(isAbleHundred(quadrant,quadrants)){ //insert parts of 100x10
          var quadrantToInsert=quadrant;
          var part={
            quadrants:[],
            size:100
          };
          for(var quadrantNumber=1;quadrantNumber<=10;quadrantNumber++){
            part.quadrants.push(quadrantToInsert);
            quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
            quadrantToInsert++;
          }
          alert(100);
          getPartImg2(part,ctx);
          parts.push(part);
          quadrant=quadrants[0]; 
        }
        if(isAbleEighty(quadrant,quadrants)){
          var quadrantToInsert=quadrant;
          var part={
            quadrants:[],
            size:80
          };
          for(var quadrantNumber=1;quadrantNumber<=8;quadrantNumber++){
            part.quadrants.push(quadrantToInsert);
            quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
            quadrantToInsert=getDownQuadrant(quadrantToInsert,total);
          }
	      alert(80)
          getPartImg2(part,ctx);   
          parts.push(part);
          quadrant=quadrants[0];
        }
        if(quadrants.length>0){
          var quadrantToInsert=quadrant
          var part={
            quadrants:[],
            size:10
          };
          part.quadrants.push(quadrantToInsert);
          alert(10)
          quadrants.splice(quadrants.indexOf(quadrantToInsert),1);
          getPartImg2(part,ctx);
          parts.push(part);       
          quadrant=quadrants[0];
        }
      }
});

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
	var commonValueOfTheLine=Math.floor(quadrant/total);
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
    var result=Math.floor(quadrants[0]/total)*10;
    if(!isNaN(result)){
      return result;  
    }else{
      return 0;
    }
}
getX=function(quadrants,total){
    var result=Math.floor(((quadrants[0]%total)-1)*10);
    if(!isNaN(result))
      return result;
    else{
      return 0;
    }
}
getDownQuadrant=function(quadrantNum,total){
	return quadrantNum+total;
}
