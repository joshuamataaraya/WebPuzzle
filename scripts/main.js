    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function() {
        canvas.width=imageObj.width
        canvas.height=imageObj.height
        var sourceX = 0;
        var sourceY = 0;
        var sourceWidth = canvas.width;
        var sourceHeight = canvas.height;
        
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight);
        };
	function getImageid(){
            imageObj.src =document.getElementById('url').value;
        }
    function cropImg(){
    }; 