import "./styles.css";

import orbits           from "./public/orbits.json";
import { Satellite }    from "./src/satellite";
import { Simulation }   from "./src/simulation";

// create simulation
const simulation = new Simulation();

let numberOfSatellites = 5000;
for( const orbit of orbits ) {
    const satellite = new Satellite( orbit, simulation.baseMaterial, simulation.scale );
    simulation.addSatellite( satellite );

    if( !numberOfSatellites-- )
        break;
}

simulation.addEarth();
simulation.addOrbitControl();
simulation.animate();
