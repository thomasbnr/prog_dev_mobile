window.addEventListener("load", event => main());
window.addEventListener("resize", event => resize());

const resize = () => {

	console.log("resize", window.innerWidth, window.innerHeight);

};

const createCube = (color, x, y, z) => {

	// create cube geom and material
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshBasicMaterial( { color: color } );
	var cube = new THREE.Mesh( geometry, material );
	return cube;
};

const createTonus = (color, x, y, z) => {

	var geometry = new THREE.TorusGeometry ();
	var material = new THREE.MeshBasicMaterial( { color: 0x0000FF  } );
	var torus = new THREE.Mesh( geometry, material );
	return torus;
};

const createPlane = (color,x,y,z) => {

	var geometry = new THREE.PlaneGeometry( 4, 5, 5 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00FFFF, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
	return plane;

};

const main = () => {

	console.log("hello world");

	// initialisation de la scène
	var scene = new THREE.Scene();

	// init camera
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// web gl renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	let controls = new THREE.OrbitControls(camera, renderer.domElement);


	var cube = createCube("#FF0000");
	// add cube to scene
	scene.add( cube );

	var recube = createCube("#00FF00");
	// add cube to scene
	scene.add( recube );

	var torus = createTonus();
	scene.add (torus);

	var plane = createPlane();
	scene.add (plane);

	plane.position.set(2,2,2);
	torus.position.set(0,0,0);

	camera.position.z = 10;

	animate();

	// animate loop
	function animate() {
		requestAnimationFrame( animate ); // request next frame

		// move cube
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		// move torus
		torus.rotation.x += 0.02;
		torus.rotation.y -= 0.05;

		plane.rotation.x += 0.03;
		plane.rotation.y += 0.03;

		// move cube
		recube.rotation.x -= 0.01;
		recube.rotation.y -= 0.01;

		// render !
		renderer.render( scene, camera );
	}

};
