import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneMethods {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  // Display Module And Method Name

  DMM(methodName: string) {
    console.log(`\n>=====>`);
    console.log(`      In Module: ${this.constructor.name}`);
    console.log(`         Method: ${methodName} \n>=====>`);
    console.log(`>=====>`);
  }

  DisplayText(
    text: string,
    width =  4,
    x = 0,
    y = 30,
    color = "black",
    clearColor = "white",
    font = "bold 22px monospace"
  ): BABYLON.Mesh {
    this.DMM("DisplayText");

    const groundWidth = 4 * (width / 4)
    const groundHeight = .1

    const mesh = BABYLON.MeshBuilder.CreatePlane(
      "textMesh",
      { width: groundWidth, height: groundHeight },
      this.appMain._scene
    );

    const  compress = 4 * (4 / width) * .01

    //Create dynamic texture
    const textWidth = 512 * (1.6 + compress);
    const textHeight = 256 / 6;

    var textureText = new BABYLON.DynamicTexture(
      "dynamicTextureText",
      { width: textWidth, height: textHeight },
      this.appMain._scene,
      false
    );
    var textureContext = textureText.getContext();

    var materialText = new BABYLON.StandardMaterial(
      "matText",
      this.appMain._scene
    );
    
    materialText. disableLighting = true;
    materialText.emissiveColor = BABYLON.Color3.White();

    //Add text to dynamic texture
    textureText.drawText(text, x, y, font, color, clearColor, true, true);

    materialText.diffuseTexture = textureText;
    mesh.material = materialText;

    return mesh;
  }

  public DelayIt = (secs: number) =>
    new Promise((res) => setTimeout(res, secs * 1000));
}
