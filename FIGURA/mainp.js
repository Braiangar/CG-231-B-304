

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();


    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000); 
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(0, 0, 0);
    scene.add(light);
    
    const size = 150;
    const divisions = 160;
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);
    
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);  
 

    function poligono(nlados, ladoigual) {
      const vertices = [];
      const ang = 2 * Math.PI / nlados;
      for (let i = 0; i <= nlados; i++) {
        let x = ladoigual * Math.cos(i * ang);
        let y = ladoigual * Math.sin(i * ang);
        vertices[i] = { x, y };
      }
      return vertices;
    }
    
    const vertices = poligono(6, 1);
    const shape = new THREE.Shape();
    shape.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      shape.lineTo(vertices[i].x, vertices[i].y);
    }
    
    const extrudeSettings = {
      steps: 1,
      depth: 1,
      bevelEnabled: false
    };
    const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

   function render() {
     requestAnimationFrame(render);
     renderer.render(scene, camera);
   }
   
   render();


   
 


    