 //    var canvas = document.getElementById('myCanvas');
 //    var canvas2= document.getElementById('can2');
 //    var context = canvas.getContext('2d');
 //    var context2=canvas2.getContext('2d');
 //    var imageObj = new Image();
 //    imageObj.onload = function() {
 //        canvas.width=imageObj.width
 //        canvas.height=imageObj.height
 //        var sourceX = 0;
 //        var sourceY = 0;
 //        var sourceWidth = canvas.width;
 //        var sourceHeight = canvas.height;
        
 //        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight);
 //        };
	// function getImageid(){
 //            imageObj.src =document.getElementById('url').value;
 //        };

    function loadImg(){
        var image=document.createElement("IMG");
        image.setAttribute("src", document.getElementById('url').value)
        image.setAttribute("width", "500");
        image.setAttribute("width", "500");
        image.setAttribute("id","imageObj")
        document.getElementById('image').appendChild(image);

        var buttonCrop=document.createElement("BUTTON"); 
        var btnText=document.createTextNode("Crop image");
        buttonCrop.appendChild(btnText);
        buttonCrop.className="btn btn-default"

        buttonCrop.setAttribute("onclick","cropImg()");
        document.getElementById('functions').appendChild(buttonCrop);        
    } 
    function cropImg(){
       

        var image=document.createElement("IMG");
        
        image.setAttribute("src", document.getElementById('imageObj').src)
        image.setAttribute("width", "500");
        image.setAttribute("width", "500");
        image.setAttribute("id","img")
        document.getElementById('imagesStock').appendChild(image);
        im=new YAHOO.widget.ImageCropper('img');
        
        // new uvumiCropper('img',{
        //         keepRatio:true,
        //         preview:'myPreview',
        //         handles: [
        //             ['top','left'],
        //             ['top','right'],
        //             ['bottom','left'],
        //             ['bottom','right']
        //             ],
        //         coordinates:true
        //     });

        }
        // part={
        //     Imag:img,
        //     x:0,
        //     y:0,
        //     pWidth:10,
        //     pHeight:10
        // }
        // parts=[]
        // parts[0]=part
        // alert(parts[0].Imag)

        // context.drawImage(parts[0].Imag,parts[0].x,parts[0].y,parts[0].pHeight,parts[0].pWidth)
    
    function drawParts(parts){
        for(i=0;i<parts.length;i++ ){
            
        }
    }; 