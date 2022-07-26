import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneObjects {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  SpawnTestBox(): void {
    this.appMain.METHMod.DMM("SpawnBox");

    const mat = new BABYLON.StandardMaterial("Material", this.appMain._scene);
    mat.diffuseColor = BABYLON.Color3.Green();

    // Our built-in 'box' shape. Params: name, options, scene
    this.appMain.box = BABYLON.MeshBuilder.CreateBox("box", {});

    this.appMain.box.material = mat;

    this.appMain.box.scaling = new BABYLON.Vector3(0.5, 1.5, 0.5);

    this.appMain.box.position.y = this.appMain.box.scaling.y / 2; //box created with default size so height is 1
    this.appMain.box.position.z = -4;
    this.appMain.box.position.x = -4;

    // Move the sphere upward 1/2 its height
    //this.appMain.box.position.y = 2;    //this.appMain.box.position = new BABYLON.Vector3(0, 0.5, -5);

    //this.appMain.box.rotation = this._light.direction;
    //this.appMain.box.scaling.x = .1;
    //this.appMain.box.scaling.z = 0.1;
  }

  SpawnBarn(): BABYLON.Mesh {
    this.appMain.METHMod.DMM("SpawnHouse");

    const mat = [
      new BABYLON.StandardMaterial("House Material", this.appMain._scene),
    ];

    mat.push(
      new BABYLON.StandardMaterial("Roof Material", this.appMain._scene)
    );

    mat.push(
      new BABYLON.StandardMaterial("Front Barn Material", this.appMain._scene)
    );

    mat[0].diffuseColor = new BABYLON.Color3(175 / 255, 150 / 255, 0);
    mat[1].diffuseColor = new BABYLON.Color3(100 / 255, 100 / 255, 0);
    //mat[2].diffuseColor = new BABYLON.Color3(1, 1, 0);

    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 1, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.2, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.0, 0.0, 0.75, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.75, 1.0); //left side

    // Our built-in 'box' shape. Params: name, options, scene
    const barn = BABYLON.MeshBuilder.CreateBox("box", {
      width: 1,
      faceUV: faceUV,
      wrap: true,
    });

    var multimat = new BABYLON.MultiMaterial("multi", this.appMain._scene);
    multimat.subMaterials.push(mat[0]);
    multimat.subMaterials.push(mat[2]);

    //apply material
    barn.subMeshes = [];
    var verticesCount = barn.getTotalVertices();

    barn.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, barn));
    barn.subMeshes.push(new BABYLON.SubMesh(1, 1, verticesCount, 6, 6, barn));
    barn.subMeshes.push(new BABYLON.SubMesh(0, 2, verticesCount, 12, 6, barn));
    barn.subMeshes.push(new BABYLON.SubMesh(0, 3, verticesCount, 18, 6, barn));
    barn.subMeshes.push(new BABYLON.SubMesh(0, 4, verticesCount, 24, 6, barn));
    barn.subMeshes.push(new BABYLON.SubMesh(0, 5, verticesCount, 30, 6, barn));

    barn.material = multimat;

    barn.scaling = new BABYLON.Vector3(1, 1, 1.5);

    barn.position.y = barn.scaling.y / 2; //box created with default size so height is 1

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
      diameter: 1.3,
      height: 1.2,
      tessellation: 7,
    });
    roof.parent = barn;
    roof.material = mat[1];

    roof.scaling.x = 0.75;
    roof.scaling.y = 0.825;
    roof.rotation.z = Math.PI / 2;
    roof.rotation.y = Math.PI / 2;

    roof.position.y = 1.22 / 2;

    mat[0].diffuseTexture = new BABYLON.Texture(
      "https://cdn-content-ingress.altvr.com/uploads/photo/image/2053976466940494379/barnWall.png",
      this.appMain._scene
    );
    mat[1].diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/roof.jpg",
      this.appMain._scene
    );
    mat[2].diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/semihouse.png",
      this.appMain._scene
    );

    const matfront = [
      new BABYLON.StandardMaterial("House Front Material", this.appMain._scene),
    ];

    return barn;
  }

  SpawnMultipleBoxes(): void {
    this.appMain.METHMod.DMM("SpawnMultipleBoxes");

    let mat: BABYLON.StandardMaterial[] = [
      new BABYLON.StandardMaterial("Box0 Material", this.appMain._scene),
      new BABYLON.StandardMaterial("Box1 Material", this.appMain._scene),
      new BABYLON.StandardMaterial("Box2 Material", this.appMain._scene),
    ];

    mat[0].diffuseColor = BABYLON.Color3.Yellow();
    mat[1].diffuseColor = BABYLON.Color3.Red();
    mat[2].diffuseColor = BABYLON.Color3.Blue();

    let boxTextureRed = new BABYLON.Texture(
      "https://dl.dropbox.com/s/d774xc5km3l1gst/Floor-Stone-Portuguesa-Ground-Texture-Sidewalk-5224213.jpg?dl=0",
      this.appMain._scene
    );
    let boxTextureBlue = new BABYLON.Texture(
      "https://image.shutterstock.com/image-photo/basalt-stones-background-reynisfjara-beach-600w-2124570419.jpg",
      this.appMain._scene
    );

    mat[1].diffuseTexture = boxTextureRed;
    mat[2].diffuseTexture = boxTextureBlue;

    const box: BABYLON.Mesh[] = [undefined, undefined, undefined];

    box[0] = BABYLON.MeshBuilder.CreateBox("box0", {});
    box[0].material = mat[0];

    box[0].scaling.x = 2;
    box[0].scaling.y = 1.5;
    box[0].scaling.z = 3;
    box[0].position = new BABYLON.Vector3(-3, 0.75, 0);
    box[0].rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(30),
      BABYLON.Tools.ToRadians(0)
    );

    box[1] = BABYLON.MeshBuilder.CreateBox("box1", {
      width: 2,
      height: 1.5,
      depth: 3,
    });
    box[1].material = mat[1];

    box[1].position.y = 1.25;
    box[1].rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(-20),
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(0)
    );

    box[2] = BABYLON.MeshBuilder.CreateBox("box2", {});
    box[2].material = mat[2];
    box[2].scaling = new BABYLON.Vector3(2, 1.5, 3);
    box[2].position.x = 3;
    box[2].position.y = 1.75;
    box[2].position.z = 0;
    box[2].rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(-30),
      BABYLON.Tools.ToRadians(0)
    );
  }

  // Environment Node Objects (Ground, Trees, Buildings, Sound)

  EnvironmentNodes(): void {
    // Ground

    this.appMain.ground = BABYLON.MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    const mat = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.appMain._scene
    );
    mat.diffuseTexture = new BABYLON.Texture(
      "https://www.babylonjs-playground.com/textures/floor.png",
      this.appMain._scene
    );

    this.appMain.ground.material = mat;

    // Load the Sound
    //
    // and play it automatically once ready
    //

    //const uri =
    //  "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1793021533619224851/ogg_220173__gameaudio__spacey-1up-power-up.ogg";

    const uri =
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1734282589813867336/ogg_Girl_From_Ipanema_-_Frank_Sinatra.ogg";

    //this.appMain.music = new BABYLON.Sound("cello", "sounds/cellolong.wav", this.appMain._scene, null, { loop: true, autoplay: true });

    //this.appMain.music = new BABYLON.Sound("sound2", uri, this.appMain._scene);

    //this.IntervalSound();
    var startMusic = new BABYLON.Sound(
      "sound1",
      uri,
      this.appMain._scene,
      null,
      { loop: true, autoplay: true, volume: 0.05 }
    );

    var playing = false;
    document.onclick = () => {
      if (playing) {
        if (startMusic) {
          startMusic.stop();
          startMusic.dispose();
          startMusic = undefined;
        }
        this.appMain.music.pause();
      } else {
        if (startMusic) {
          startMusic.stop();
          startMusic.dispose();
          startMusic = undefined;
          this.appMain.music = new BABYLON.Sound(
            "sound1",
            uri,
            this.appMain._scene,
            null,
            { loop: true, autoplay: true, volume: 0.05 }
          );
        }
        this.appMain.music.play();
      }
      playing = !playing;
    };
  }

  IntervalSound() {
    // Load Repeating the sound,
    // give it time to load and play it every 3 seconds
    //

    const bounce = new BABYLON.Sound(
      "bounce",
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1907681589261763077/ogg_321808__lloydevans09__pvc-pipe-hit-3.ogg",
      this.appMain._scene,
      null,
      { loop: false, autoplay: false, volume: 0.2 }
    );

    this.appMain.METHMod.DelayIt(10);

    setInterval(() => bounce.play(), 3000);
  }
}
