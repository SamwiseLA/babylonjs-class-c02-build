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

    // Our built-in 'box' shape. Params: name, options, scene
    this.appMain.box = BABYLON.MeshBuilder.CreateBox("box", {});
    this.appMain.box.position.y = 0.5; //box created with default size so height is 1

    // Move the sphere upward 1/2 its height
    //this.appMain.box.position.y = 2;    //this.appMain.box.position = new BABYLON.Vector3(0, 0.5, -5);

    //this.appMain.box.rotation = this._light.direction;
    //this.appMain.box.scaling.x = .1;
    //this.appMain.box.scaling.z = 0.1;
  }

  EnvironmentNodes(): void {
    this.appMain.ground = BABYLON.MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    // Load the sound and play it automatically once ready

    const uri =
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1793021533619224851/ogg_220173__gameaudio__spacey-1up-power-up.ogg";

    //this.appMain.music = new BABYLON.Sound("cello", "sounds/cellolong.wav", this.appMain._scene, null, { loop: true, autoplay: true });
    this.appMain.music = new BABYLON.Sound(
      "sound1",
      uri,
      this.appMain._scene,
      null,
      { loop: false, autoplay: true, volume: 0.5 }
    );

    //this.appMain.music = new BABYLON.Sound("sound2", uri, this.appMain._scene);

    // Load the sound, give it time to load and play it every 3 seconds
    const bounce = new BABYLON.Sound(
      "bounce",
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1907681589261763077/ogg_321808__lloydevans09__pvc-pipe-hit-3.ogg",
      this.appMain._scene,
      null,
      { loop: false, autoplay: false, volume: 0.2 }
    );
    setInterval(() => bounce.play(), 3000);
  }
}
