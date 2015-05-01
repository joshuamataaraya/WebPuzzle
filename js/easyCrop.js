(function (){
	//receives the url of the image and the id of the canvas
	easyCrop=function(imgID,tarjetID){ 
		this.canva=document.getElementById(tarjetID);
  		this.context= this.canva.getContext("2d");
		this.img=document.getElementById(imgID);
		this.crop=function(x,y,width,height){
			this.canva.width=width;
    		this.canva.height=height;
    		this.context.drawImage(this.img,x,y,width,height,0,0,width,height);
    		return this;
		}
		return this;
	}
}).call(this);