window.addEventListener("load", event => main());
window.addEventListener("resize", event => resize());

const resize = () => {

	console.log("resize", window.innerWidth, window.innerHeight);

};

const main = () => {

	console.log("Welcome to my world. Pressez la touche espace pour monter au ciel !")

	let rand;
	const cubePlace = [];
	let detruire = false;

	//texture
	const Sol = new THREE.TextureLoader().load('/texture/top.jpg');
	const Dirt = new THREE.TextureLoader().load('/texture/dirt.jpg');
	const Cobble = new THREE.TextureLoader().load('/texture/cobblestone.png');
	const Wood = new THREE.TextureLoader().load('/texture/wood.png');

	Sol.wrapS = THREE.RepeatWrapping;
	Sol.wrapT = THREE.RepeatWrapping;
	Sol.repeat.set(500, 500);

	// initialisation de la scène
	let scene = new THREE.Scene();
	scene.background = new THREE.Color('skyblue');

	//sol
	const floorMaterial = new THREE.MeshBasicMaterial({map: Sol});
	const floorGeometry = new THREE.PlaneBufferGeometry( 100, 100, 100, 100 );
	floorGeometry.rotateX( - Math.PI / 2 );
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	scene.add(floor);
	cubePlace.push(floor);

	//cube
	const cube_dirt = new THREE.MeshBasicMaterial({map: Dirt});
	const cube_cobble = new THREE.MeshBasicMaterial({map: Cobble});
	const cube_Wood = new THREE.MeshBasicMaterial({map: Wood});
	const cubeGeometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
	
	let choix = cube_cobble; 
	

	/*if(rand % 2){
		choix == cube_Wood;
	}*/
	//let choix = cube_cobble

	// init camera
	let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 0.5;
	camera.position.y = 0.5;
	//camera.position.x = 0.5;

	// web gl renderer
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//Raycaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	//action souris
	window.addEventListener('click', mousedown_fun, false);
	function mousedown_fun(event){
		console.log(event.clientX);
		console.log(event.clientX);

		mouse.x = ( event.clientX / (window.innerWidth) ) * 2 - 1;
		mouse.y = - ( event.clientY / (window.innerHeight) ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
		//console.log(mouse.x);
		//console.log(mouse.y);
		const intersects = raycaster.intersectObjects( cubePlace );
		
		if (intersects.length > 0){
			const inter = intersects[0];
			
			
			if(detruire == false){
				const cube = new THREE.Mesh(cubeGeometry,choix);
				cube.position.copy( inter.point ).add( inter.face.normal );
				cube.position.divideScalar(1).floor().multiplyScalar( 0.1 ).addScalar( 0.01 );
				scene.add( cube );
				cubePlace.push( cube );

				rand = Math.floor(Math.random()* (4-1)) + 1;
				console.log(rand);

				if (rand ==1 ) 
					choix = cube_Wood;
				if (rand == 2)
					choix = cube_dirt;
				if (rand == 3)
					choix = cube_cobble;
			}
			else{
				if(inter.object !== floor){
					scene.remove(inter.object);
					cubePlace.splice(cubePlace.indexOf(inter.object), 1);
				}
			}
		}

	}

	//controls Mouvement clavier avec camera FPS et choix des blocs   
	let controls = new THREE.PointerLockControls(camera, renderer.domElement); 
	window.addEventListener('keydown', keydown_fun, false);
	function keydown_fun(e) {
		switch(e.code) {
			// Aller a gauche (en qwerty donc A en en azerty)
			case "KeyQ":
				controls.moveRight(-0.025);
				break;
			//	Aller à droite
			case "KeyD":
				controls.moveRight(0.025);
				break;

			// En qwerty --> Z en azerty --> avancer
			case "KeyW":
				controls.moveForward(0.025);
				break;

			// Reculer 	
			case "KeyS":
				controls.moveForward(-0.025);
				break;

			// Presser touch L pour activez camera 
			case "KeyL":
				controls.lock();
				break;

			// Désactivez camera 
			case "KeyU":
				controls.unlock();
				break;
			case "Space":
				camera.position.y += 0.025;
				break;
			case "ArrowDown":
				camera.position.y -= 0.025;
				break;

			// Enlever le bloc avec E
			case "KeyE":
				detruire = true;
				break;
			// Faire avec Q en azerty pour ne pas détruire des blocs une fois E déclenchée
			case "KeyA":
				detruire = false;
				break;
			/*case "Digit1":
				choix = cube_dirt;
				break;
			case "Digit2":
				choix = cube_cobble;
				break;
			case "Digit3":
				choix = cube_Wood;
				break; */

		}
		//console.log(choix);
	}

	animate();

	// animate loop
	function animate() {
		requestAnimationFrame( animate ); // request next frame 

		// render !
		renderer.render( scene, camera );
	}

};


