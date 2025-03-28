import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as atlas from 'azure-maps-control';

var map, layer;

        // 3D model to render
var modelDetails = {
        url: "simple-helicopter.glb",
        origin: [-122.128929, 47.644042],
        mercatorOrigin: atlas.data.MercatorPoint.fromPosition([-122.128929, 47.644042]),
        rotateX: Math.PI / 2,
        rotateY: 0,
        rotateZ: 0, 
        scale: 1e-6,
        animate: true
    };


var renderer = {
    renderingMode: "3d",
    loader: new GLTFLoader(),
    modelDetails: modelDetails,

    // Method called when the layer is added to the map
    onAdd: function (map, gl) {
        this.map = map;
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        // Create lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight);

        var ambientLight = new THREE.AmbientLight(0x808080);
        this.scene.add(ambientLight);

        // Load the model
        this.loadModel();

        //Use the Azure Maps map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl
        });

        this.renderer.autoClear = false;
    },

    // Method called on each animation frame
    render: function (gl, matrix) {
        var md = this.modelDetails;

        if (md) {
            var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), md.rotateX);
            var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), md.rotateY);
            var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), md.rotateZ);

            var m = new THREE.Matrix4().fromArray(matrix);
            var l = new THREE.Matrix4()
                .makeTranslation(md.mercatorOrigin[0], md.mercatorOrigin[1], md.mercatorOrigin[2])
                .scale(new THREE.Vector3(md.scale, -md.scale, md.scale))
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            this.camera.projectionMatrix.elements = matrix;
            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.renderer.resetState();
        }

        map.triggerRepaint();
    },

    loadModel: function () {
        var md = this.modelDetails;
        this.mixer = null;

        if (md) {
            // Use the three.js GLTF loader to add the 3D model to the three.js scene
            this.loader.load(
                md.url,
                function (gltf) {
                    this.gltfModelScene = gltf.scene;

                    this.scene.add(gltf.scene);

                    if (md.animate) {
                        this.mixer = new THREE.AnimationMixer(gltf.scene);
                        var action = this.mixer.clipAction(gltf.animations[0]);
                        action.play();

                        this.animate();
                    }
                }.bind(this)
            );

            this.map.setCamera({
                center: md.origin
            });
        }
    },

    animate: function () {
        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(() => {
                this.animate();
            });
        }
    }
};



export const initializeMap = (mapRef) => {

    console.log("Function Activated")

    map = new atlas.Map(mapRef.current, {
        zoom: 16,
        pitch: 60,
        bearing: -45,
        antialias: true,

        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: AZURE_MAP_KEY

        }
    });
    console.log("Function Log 2")

    // Wait until the map resources are ready
    map.events.add("ready", function () {
        // Create a WebGL layer
        layer = new atlas.layer.WebGLLayer("3d-model", { renderer });
        // Add the layer to the map
        map.layers.add(layer);

        // Add controls
        map.controls.add(
            [
                new atlas.control.ZoomControl(),
                new atlas.control.PitchControl(),
                new atlas.control.CompassControl(),
                new atlas.control.StyleControl({
                    mapStyles: "all"
                })
            ],
            {
                position: "top-right"
            }
        );
    });

    console.log("Function Log 3")
    console.log(map == null)

    return map;
}



export const setMapControls = (map, coordinates) => {

    console.log("Function Log 4")
        
    map.controls.add(
        [
            new atlas.control.ZoomControl(),
            new atlas.control.PitchControl(),
            new atlas.control.FullscreenControl(),
            new atlas.control.ScaleControl(),
        ],
        {
            position: 'top-right',
        }
    );

    console.log("Function Log 5")

    map.controls.add(new atlas.control.StyleControl({
        mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
        layout: 'list'
    }), {
        position: 'top-right'
    });
} 


