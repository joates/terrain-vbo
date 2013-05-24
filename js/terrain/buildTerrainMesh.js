
  function buildTerrainMesh(size, heightData, seaLevel) {

    var sL = seaLevel || 0;

    var terrain = new THREE.PlaneGeometry(size, size, size-1, size-1);

    for ( var i=0, l=terrain.vertices.length; i<l; i++ ) {

      if ( sL == 0 ) {
        terrain.vertices[i].z = heightData[i];
      } else {
        terrain.vertices[i].z = heightData[i] > sL ? heightData[i] : sL;
      }

    }

    THREE.GeometryUtils.triangulateQuads( terrain );

    terrain.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    // Calculate per-vertex normals.
    terrain.computeFaceNormals();
    terrain.computeVertexNormals();
    terrain.verticesNeedUpdate = true;
    terrain.elementsNeedUpdate = true;
    terrain.normalsNeedUpdate  = true;

    var material = new THREE.MeshBasicMaterial( {
      color: 0x448844, shading: THREE.FlatShading,
      wireframe: true, wireframeLinewidth: 2,
      transparent: true } );

    var mesh = new THREE.Mesh( terrain, material );

    return mesh;

  }
