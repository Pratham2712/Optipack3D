import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/geometries/TextGeometry.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerInfPath = JSON.parse(localStorage.getItem("container_inf"));
  const urlParams = new URLSearchParams(window.location.search);
  const ind = parseInt(urlParams.get("container"), 0);
  const threedPath = JSON.parse(localStorage.getItem("threed_paths"));

  function getLocalStorageItem(key) {
    return new Promise((resolve, reject) => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          if (key == "threed_paths") {
            resolve(JSON.parse(item)[ind]);
          } else {
            resolve(JSON.parse(item));
          }
        } catch (error) {
          reject(
            new Error(`Error parsing JSON from localStorage for key: ${key}`)
          );
        }
      } else {
        reject(new Error(`No item found in localStorage for key: ${key}`));
      }
    });
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    500000
  );
  const orbit = new OrbitControls(camera, renderer.domElement);

  // For making restrictions to the rotation of the camera like they have done in Easy Cargo.
  // orbit.enablePan = false; // Disable panning for simplicity
  // orbit.minPolarAngle = Math.PI / 8; // Minimum polar angle (from top view)
  // orbit.maxPolarAngle = Math.PI / 2.1; // Maximum polar angle (from top view)
  // orbit.minAzimuthAngle = -Infinity; // Minimum azimuth angle
  // orbit.maxAzimuthAngle = Infinity; // Maximum azimuth angle
  // orbit.update();

  const textureLoader = new THREE.TextureLoader();
  const rustyTexture = textureLoader.load("/rust3.png", function (texture) {
    // Adjust texture wrapping and repeat as needed
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1); // Adjust these values to control how the texture is repeated
  });

  let containerWidth;
  let containerHeight;
  let containerDepth;

  // Function to initialize container dimensions
  function fetchContainerDimensions() {
    return getLocalStorageItem("container_inf")
      .then((containerInfo) => {
        containerWidth = containerInfo.containerWidth;
        containerHeight = containerInfo.containerHeight;
        containerDepth = containerInfo.containerLength; // Ensure this field name matches your JSON

        console.log("Container Width (inside fetch):", containerWidth);
        console.log("Container Height (inside fetch):", containerHeight);
        console.log("Container Depth (inside fetch):", containerDepth);

        // Return an object with the dimensions
        return { containerWidth, containerHeight, containerDepth };
      })
      .catch((error) => console.error("Error loading container info:", error));
  }

  // Call the function and use the dimensions once fetched

  const aspectWidth = 1; // This is the base aspect (1x)
  const aspectHeight = 1; // Height relative to width
  const aspectDepth = 2;
  fetchContainerDimensions().then((dimensions) => {
    // Your further logic here, using the dimensions
    const faces = [
      {
        normal: new THREE.Vector3(1, 0, 0),
        position: new THREE.Vector3(containerWidth, 0, 0),
      }, // Right face
      {
        normal: new THREE.Vector3(-1, 0, 0),
        position: new THREE.Vector3(-containerWidth, 0, 0),
      }, // Left face
      {
        normal: new THREE.Vector3(0, 1, 0),
        position: new THREE.Vector3(0, containerHeight, 0),
      }, // Top face
      // { normal: new THREE.Vector3(0, -1, 0), position: new THREE.Vector3(0, -containerHeight, 0) }, // Bottom face
      {
        normal: new THREE.Vector3(0, 0, 1),
        position: new THREE.Vector3(0, 0, containerDepth),
      }, // Front face
      {
        normal: new THREE.Vector3(0, 0, -1),
        position: new THREE.Vector3(0, 0, -containerDepth),
      }, // Back face
    ];

    // Set the target of the OrbitControls to the center of the container
    orbit.target.set(
      (containerWidth / 2) * aspectWidth,
      (containerHeight / 2) * aspectHeight,
      (containerDepth / 2) * aspectDepth
    );
    orbit.update();
    const animateSmallBoxes = (boxes) => {
      boxes.forEach((box, index) => {
        // Delay each animation to occur sequentially
        setTimeout(() => {
          console.log(isAnimating);
          console.log("inside animateboxes");
          // Create and add the small box to the scene
          createSmallBox(box);
        }, index * 10); // Adjust the delay (500ms) as needed
      });
    };
    const createSmallBox = (box) => {
      const startX = box.start.x;
      const startZ = containerDepth - box.start.y;
      const startY = box.start.z;

      const endX = box.end.x;
      const endY = box.end.z;
      const endZ = containerDepth - box.end.y;
      const colorName = box.color;

      const smallBoxWidth = box.dimensions.width;
      const smallBoxHeight = box.dimensions.height;
      const smallBoxDepth = box.dimensions.length;

      const centerX = startX + smallBoxWidth / 2;
      const centerY = startY + smallBoxHeight / 2;
      const centerZ = startZ - smallBoxDepth / 2;

      const smallBoxGeometry = new THREE.BoxGeometry(
        smallBoxWidth,
        smallBoxHeight,
        smallBoxDepth
      );
      const smallBoxMaterial = new THREE.MeshStandardMaterial({
        color: parseInt(colorName, 16) || 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const smallBox = new THREE.Mesh(smallBoxGeometry, smallBoxMaterial);

      smallBox.scale.set(aspectWidth, aspectHeight, aspectDepth);

      smallBox.position.set(
        centerX * aspectWidth,
        centerY * aspectHeight,
        centerZ * aspectDepth
      );

      scene.add(smallBox);

      const smallBoxEdges = new THREE.EdgesGeometry(smallBoxGeometry);
      const smallBoxEdgesMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5,
      });
      const smallBoxWireframe = new THREE.LineSegments(
        smallBoxEdges,
        smallBoxEdgesMaterial
      );
      smallBoxWireframe.scale.set(aspectWidth, aspectHeight, aspectDepth);

      smallBoxWireframe.position.set(
        centerX * aspectWidth,
        centerY * aspectHeight,
        centerZ * aspectDepth
      );

      scene.add(smallBoxWireframe);
      const start_X = containerWidth + 100; // Start position off to the right
      const end_X = smallBox.position.x; // Target x position (left side)
      const start_Y = smallBox.position.y + 150; // Start a bit higher than final position
      const end_Y = smallBox.position.y; // Final y position (settled down)

      // Set the initial position off-screen to the right
      smallBox.position.set(start_X, start_Y, smallBox.position.z);
      smallBoxWireframe.position.set(start_X, start_Y, centerZ * aspectDepth);
      // First, animate the horizontal movement
      new TWEEN.Tween(smallBox.position)
        .to(
          {
            x: end_X, // Move to the left
          },
          2000 // Duration for horizontal movement
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          // After horizontal movement is done, start the vertical settling
          new TWEEN.Tween(smallBox.position)
            .to(
              {
                y: end_Y, // Settle down to the final y position
              },
              1000 // Duration for settling down
            )
            .easing(TWEEN.Easing.Bounce.Out) // Use a bounce effect for settling down
            .start();
        })
        .start();
      new TWEEN.Tween(smallBoxWireframe.position)
        .to(
          {
            x: end_X, // Move to the left (same as small box)
          },
          2000 // Duration for horizontal movement
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          // After horizontal movement is done, start the vertical settling for the wireframe
          new TWEEN.Tween(smallBoxWireframe.position)
            .to(
              {
                y: end_Y, // Settle down to the final y position
              },
              1000 // Duration for settling down
            )
            .easing(TWEEN.Easing.Bounce.Out) // Use a bounce effect for settling down
            .start();
        })
        .start();
    };
    const clearContainer = () => {
      for (let i = scene.children.length - 1; i >= 0; i--) {
        const child = scene.children[i];
        if (child.isPersistent) continue;
        if (
          child.isPlate ||
          (child.material && child.material.map === rustyTexture)
        )
          continue;
        if (child.isLinePreserved) continue;
        if (child === containerWireframe) continue;
        // Remove only smallBox and smallBoxWireframe based on specific conditions
        if (
          (child.isMesh && child.geometry instanceof THREE.BoxGeometry) ||
          child.isLineSegments
        ) {
          scene.remove(child); // Remove the smallBox or smallBoxWireframe
        }
      }
    };
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/3dmodels/group1.gltf", (gltf) => {
      const model = gltf.scene;
      model.isPersistent = true;

      // Scale the model to fit into the viewport
      model.scale.set(0.1, 0.1, 0.1);

      // Create an Object3D container for the model
      const modelContainer = new THREE.Object3D();
      modelContainer.add(model);
      // Create a secondary scene for the fixed model
      const fixedScene = new THREE.Scene();
      fixedScene.background = new THREE.Color("rgba(255, 255, 255, 1)");

      // Adjust the orthographic camera to the model

      // Set up lighting
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(1, 1, 1);
      directionalLight.castShadow = true;
      fixedScene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      fixedScene.add(ambientLight);

      // Enable shadows for the model
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      // Configure the renderer to handle shadows
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const fixedCamera = new THREE.OrthographicCamera(-1, 1, 1, 1, 0.1, 10000);
      fixedCamera.position.set(0, 0, 14); // Position the camera so it looks at the model
      fixedCamera.lookAt(0, 0, 0);

      // Position the model container in the fixed scene
      fixedScene.add(modelContainer);

      // Center the model based on its bounding box
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // Center the model at the origin

      // Animation loop
      // const addedPlates = [];

      // Initialize an array to store references to added plates
      const addedPlates = [];

      // Function to add a plate to the side based on the face
      function putPlateSide(face) {
        if (face.position.x !== 0) {
          // Check if the face is along the x-axis
          // Define the geometry and material for the plate
          const plate = new THREE.BoxGeometry(
            containerHeight,
            containerDepth * aspectDepth,
            50
          );
          const makeBasePlate = new THREE.Mesh(plate, plateMaterialforSides);

          // Rotate and position the plate based on the face
          makeBasePlate.rotation.x = Math.PI / 2;
          makeBasePlate.rotation.y = Math.PI / 2;
          if (face.position.x > 0) {
            makeBasePlate.position.set(
              1 * containerWidth + 25,
              containerHeight / 2,
              containerDepth
            );
          } else {
            makeBasePlate.position.set(
              -25,
              containerHeight / 2,
              containerDepth
            );
          }
          makeBasePlate.isPlate = true;
          // Add the plate to the scene
          scene.add(makeBasePlate);

          // Store a reference to the plate and its corresponding face's normal in the array
          addedPlates.push({
            plate: makeBasePlate,
            normal: face.normal.clone(),
          });
        }
      }

      // Function to remove the plate from the side based on the face
      function removePlateSide(face) {
        // Iterate through the addedPlates array to find the plate with the same normal as the face
        for (let i = 0; i < addedPlates.length; i++) {
          const plateEntry = addedPlates[i];

          // Check if the normal matches
          if (plateEntry.normal.equals(face.normal)) {
            // Remove the plate from the scene
            scene.remove(plateEntry.plate);

            // Dispose of the geometry and material to free up resources
            plateEntry.plate.geometry.dispose();
            plateEntry.plate.material.dispose();

            // Remove the entry from the array
            addedPlates.splice(i, 1);
          }
        }
      }

      function animate() {
        requestAnimationFrame(animate);

        // Update camera controls
        orbit.update();

        // Render the main scene
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissorTest(true);
        renderer.clear();
        renderer.render(scene, camera);

        // Set the viewport for the fixed scene rendering (top-right corner)
        const viewportWidth = window.innerWidth / 6; // 1/4 of the width
        const viewportHeight = window.innerHeight / 4; // 1/4 of the height
        renderer.setViewport(
          window.innerWidth - viewportWidth - window.innerWidth / 20,
          window.innerHeight - viewportHeight - window.innerHeight / 20,
          viewportWidth,
          viewportHeight
        );
        renderer.setScissor(
          window.innerWidth - viewportWidth - window.innerWidth / 20,
          window.innerHeight - viewportHeight - window.innerHeight / 20,
          viewportWidth,
          viewportHeight
        );
        renderer.setScissorTest(true);

        // Ensure the fixed model container follows the main camera's rotation
        modelContainer.quaternion.copy(camera.quaternion.clone().invert());

        // Adjust the fixed camera to fit the viewport
        fixedCamera.left = -viewportWidth / 2 / 10; // Adjust based on model scale
        fixedCamera.right = viewportWidth / 2 / 10;
        fixedCamera.top = viewportHeight / 2 / 10;
        fixedCamera.bottom = -viewportHeight / 2 / 10;
        fixedCamera.updateProjectionMatrix();

        // Render the fixed scene in the small viewport
        renderer.clearDepth(); // Clear depth buffer so fixedScene renders on top
        renderer.render(fixedScene, fixedCamera);

        // Iterate over faces and apply the visibility logic
        faces.forEach((face) => {
          // Compute the vector from the camera to a point on the face
          const vectorToFace = new THREE.Vector3().subVectors(
            face.position,
            camera.position
          );

          // Calculate the dot product
          const dotProduct = vectorToFace.dot(face.normal);

          // Determine visibility based on the sign of the dot product
          if (dotProduct > 0) {
            putPlateSide(face);
          } else {
            removePlateSide(face);
          }
        });
      }

      animate();
    });
    function animato() {
      // if (!isAnimating) return;
      animationFrameId = requestAnimationFrame(animato);
      TWEEN.update(); // Update TWEEN animations
      orbit.update();
      renderer.render(scene, camera);
    }

    animato();
    window.addEventListener("message", (event) => {
      if (event.data === "startAnimation") {
        clearContainer();
        isAnimating = true; // Start animating
        animateSmallBoxes(threedPath[ind]);
        animato();
      }
    });
  });
});
