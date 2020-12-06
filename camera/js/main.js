window.addEventListener("load", event => main());
window.addEventListener("resize", event => resize());

const resize = () => {

	console.log("resize", window.innerWidth, window.innerHeight);

};

const createCube = (color, x, y, z) => {

	// create cube geom and material
	let geometry = new THREE.BoxGeometry();
	let material = new THREE.MeshBasicMaterial( { color: color } );
	let cube = new THREE.Mesh( geometry, material );
	return cube;
};

const createTonus = (color, x, y, z) => {

	let geometry = new THREE.TorusGeometry ();
	let material = new THREE.MeshBasicMaterial( { color: 0x0000FF  } );
	let torus = new THREE.Mesh( geometry, material );
	return torus;
};

const createPlane = (color,x,y,z) => {

	let geometry = new THREE.PlaneGeometry( 4, 5, 5 );
	let material = new THREE.MeshBasicMaterial( {color: 0x00FFFF, side: THREE.DoubleSide} );
	let plane = new THREE.Mesh( geometry, material );
	return plane;

};

const main = () => {

	console.log("hello world");

	// initialisation de la scène
	let scene = new THREE.Scene();

	// init camera


	let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


	// web gl renderer
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	// FPS command

	let controls = new THREE.PointerLockControls(camera, renderer.domElement);
	document.body.appendChild( renderer.domElement );


	//	let clock = new THREE.Clock();
//	controls.lookSpeed = 0.1;


	let cube = createCube("#FF0000");
	// add cube to scene
	scene.add( cube );

	let recube = createCube("#00FF00");
	// add cube to scene
	scene.add( recube );

	let torus = createTonus();
	scene.add (torus);

	let plane = createPlane();
	scene.add (plane);

	// Je donne des positions à mes formes
	plane.position.set(2,2,2);
	torus.position.set(0,0,0);


	camera.position.z = 10;

	window.addEventListener('keydown',keydown_fun, false);
	function keydown_fun(e){
		switch(e.code) {
			case "KeyV" :
				controls.moveRight(-0.5);
				console.log("VV");
				break;
			case "KeyE" :
				controls.moveRight(0.5);
				console.log("EEE");
				break;

			case "KeyN" :
				controls.moveForward(0.5);
				console.log("H");
				break;

			case "KeyS" :
				controls.moveForward(-0.5);
				console.log("Sss")
				break;

			case "KeyL" :
				controls.lock();
				break;

			case "KeyU" :
				controls.unlock();
				break;
		}
	}

	animate();

	// animate loop
	function animate() {
		requestAnimationFrame( animate ); // request next frame
		//let delta = clock.getDelta();


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

	//	controls.update(delta);

		// render !
		renderer.render( scene, camera );

	}

};
