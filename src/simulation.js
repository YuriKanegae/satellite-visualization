import * as THREE        from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { Regulator }     from "./regulator";

class Simulation {

    /**
     * create a simple scene with basic config
     * @param {number} fov field of view
     * @param {number} near near plane
     * @param {number} far far plane
     * @param {number} defaultZ default camera z position
     */
    constructor(fov = 75, near = 0.1, far = 5000, defaultZ = 100) {
        // defaults
        this.scale        = 1/100;
        
        // base threejs objects
        this.scene        = new THREE.Scene();
        this.camera       = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
        this.renderer     = new THREE.WebGLRenderer({ canvas: document.querySelector("#satellite-visualization") });
        this.baseMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );

        // basic render config
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.position.setZ( defaultZ );

        // frame regulator
        this.regulator = new Regulator(21);

        // satellite data
        const satelliteCommonGeometry = new THREE.SphereGeometry( 1 );
        this.satelliteCommonMesh      = new THREE.Mesh( satelliteCommonGeometry, this.baseMaterial );
        this.satellites               = [];
    }

    /** add default orbital control */
    addOrbitControl() {
        this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement);
    }

    /**
     * add centered sphere with defined radius
     * @param {number} radius - earth radius
     */
    addEarth( radius = 6378 ) {
        const earthGeometry = new THREE.SphereGeometry( radius * this.scale );
        const earthMesh     = new THREE.Mesh( earthGeometry, this.baseMaterial );
        this.scene.add(earthMesh);
    }

    /**
     * add satellite to simulation
     * @param {Satellite} satellite 
     */
    addSatellite( satellite ) {
        this.satellites.push( satellite );
        this.scene.add( satellite.satelliteMesh );
    }

    animate() {
        requestAnimationFrame( () => this.animate() );

        if(!this.regulator.ready())
            return;

        const currentDate = new Date();
        for(const satellite of this.satellites)
            satellite.updatePosition(currentDate);

        this.orbitControl?.update();    
        this.renderer.render( this.scene, this.camera );
    }
}

export { Simulation };