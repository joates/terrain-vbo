
  function loadTriangleMeshToVBO( triangleMesh ) {

    var triangles = triangleMesh.geometry.faces.length;

    var geometry = new THREE.BufferGeometry();
    geometry.attributes = {
      index: {
        itemSize: 1,
        array: new Int16Array( triangles * 3 ),
        numItems: triangles * 3
      },
      position: {
        itemSize: 3,
        array: new Float32Array( triangles * 3 * 3 ),
        numItems: triangles * 3 * 3
      },
      normal: {
        itemSize: 3,
        array: new Float32Array( triangles * 3 * 3 ),
        numItems: triangles * 3 * 3
      },
      color: {
        itemSize: 3,
        array: new Float32Array( triangles * 3 * 3 ),
        numItems: triangles * 3 * 3
      }
    }

    var chunkSize = 2000;

    var indices = geometry.attributes.index.array;

    for ( var i = 0; i < indices.length; i ++ ) {
      indices[ i ] = i % ( 3 * chunkSize );
    }
                
    var positions = geometry.attributes.position.array;
    var normals = geometry.attributes.normal.array;
    var colors = geometry.attributes.color.array;

    var color = new THREE.Color();

    var faces = triangleMesh.geometry.faces;
    var verts = triangleMesh.geometry.vertices;

    for ( var i = 0; i < triangles; i++ ) {

      var ai = faces[ i ].a
      var bi = faces[ i ].b
      var ci = faces[ i ].c

      positions[ i * 9 ]     = verts[ ai ].x;
      positions[ i * 9 + 1 ] = verts[ ai ].y;
      positions[ i * 9 + 2 ] = verts[ ai ].z;

      positions[ i * 9 + 3 ] = verts[ bi ].x;
      positions[ i * 9 + 4 ] = verts[ bi ].y;
      positions[ i * 9 + 5 ] = verts[ bi ].z;

      positions[ i * 9 + 6 ] = verts[ ci ].x;
      positions[ i * 9 + 7 ] = verts[ ci ].y;
      positions[ i * 9 + 8 ] = verts[ ci ].z;

      //

      var vn = triangleMesh.geometry.faces[ i ].vertexNormals

      normals[ i * 9 ]     = vn[ 0 ].x;
      normals[ i * 9 + 1 ] = vn[ 0 ].y;
      normals[ i * 9 + 2 ] = vn[ 0 ].z;

      normals[ i * 9 + 3 ] = vn[ 1 ].x;
      normals[ i * 9 + 4 ] = vn[ 1 ].y;
      normals[ i * 9 + 5 ] = vn[ 1 ].z;

      normals[ i * 9 + 6 ] = vn[ 2 ].x;
      normals[ i * 9 + 7 ] = vn[ 2 ].y;
      normals[ i * 9 + 8 ] = vn[ 2 ].z;

      //

      var ca = verts[ai].y + verts[bi].y + verts[ci].y / 3
      var cb = 2.0 / ca;

      if ( ca > 42 ) {
        color.setRGB( 0.5, 0.6, 0.02 );
      } else if ( ca > 7.3 ) {
        color.setRGB( 0.1, 0.5 + cb, 0.1 );
      } else if ( ca > 6.3 ) {
        color.setRGB( 0.3, 0.3, 0.5 );
      } else if ( ca > 5.3 ) {
        color.setRGB( 0.5, 0.5, 0.0 );
      } else {
        color.setRGB( 0.0, 0.2, 0.5 );
      }

      colors[ i * 9 ]     = color.r;
      colors[ i * 9 + 1 ] = color.g;
      colors[ i * 9 + 2 ] = color.b;

      colors[ i * 9 + 3 ] = color.r;
      colors[ i * 9 + 4 ] = color.g;
      colors[ i * 9 + 5 ] = color.b;

      colors[ i * 9 + 6 ] = color.r;
      colors[ i * 9 + 7 ] = color.g;
      colors[ i * 9 + 8 ] = color.b;

    }

    //

    geometry.offsets = [];

    var offsets = triangles / chunkSize;

    for ( var i = 0; i < offsets; i ++ ) {

      var offset = {
        start: i * chunkSize * 3,
        index: i * chunkSize * 3,
        count: Math.min( triangles - ( i * chunkSize ), chunkSize ) * 3
      };

      geometry.offsets.push( offset );

    }
                
    geometry.computeBoundingSphere();

    //

    var material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, ambient: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.FrontSide, vertexColors: THREE.VertexColors
    } );

    var mesh = new THREE.Mesh( geometry, material );

    //

    return mesh;

  }
