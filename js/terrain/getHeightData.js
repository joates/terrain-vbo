
  function getHeightData(img, size) {

    var canvas = document.createElement( 'canvas' );
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext( '2d' );

    var area = size * size, data = new Float32Array( area );

    context.drawImage(img,0,0);

    for ( var i = 0; i < area; i ++ ) {
      data[i] = 0
    }

    var imgd = context.getImageData(0, 0, size, size);
    var pix = imgd.data;

    var j=0;
    for (var i = 0, n = pix.length; i < n; i += (4)) {
      var all = pix[i]+pix[i+1]+pix[i+2];
      data[j++] = all/30;
    }

    return data;
  }

