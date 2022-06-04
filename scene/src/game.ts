
let map_glb = new GLTFShape("models/map1.glb");
let map1 = new Entity()
map1.addComponent(map_glb);
map1.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
);
//engine.addEntity(map1);