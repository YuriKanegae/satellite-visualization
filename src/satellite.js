import * as THREE     from "three";
import * as satellite from "satellite.js";

class Satellite {
    
    /**
     * create a basic sphere shape and update it position
     * @param {*} ommData 
     * @param {*} baseMaterial 
     * @param {number} scale
     */
    constructor( ommData, baseMaterial, scale ) {
        this.scale  = scale;
        this.satrec = satellite.json2satrec(ommData);
        
        this.satelliteGeometry = new THREE.SphereGeometry( 1, 16, 8 );
        this.satelliteMesh     = new THREE.Mesh( this.satelliteGeometry, baseMaterial );

        this.updatePosition(new Date());
    }

    /**
     * update satellite position based on date
     * @param {Date} currentDate reference date
     */
    updatePosition( currentDate ) {
        const gmst = satellite.gstime(currentDate);
        const ECICoordinates = satellite.propagate(this.satrec, currentDate);

        if(ECICoordinates) { 
            const ECFCoordinates = satellite.eciToEcf(ECICoordinates.position, gmst);

            this.satelliteMesh.position.z = ECFCoordinates.x * this.scale * 1.5;
            this.satelliteMesh.position.x = ECFCoordinates.y * this.scale * 1.5;
            this.satelliteMesh.position.y = ECFCoordinates.z * this.scale * 1.5;
        }
    }
}

export { Satellite };