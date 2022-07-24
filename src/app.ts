import MyScene from './my_scene00'
window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new MyScene('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.SUMod.doRender();
  });