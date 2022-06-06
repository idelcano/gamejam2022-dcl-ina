import { movePlayerTo } from "@decentraland/RestrictedActions";

const velocity = 0.5;
let isWrapped = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let moveRotateRight = false;
let moveRotateLeft = false;
let rotationDiff = 0;
let moving = false;
// button up event
let maxXPos = 2;
let maxZPos = 2;
let glb = new GLTFShape("models/player/block_user_col.glb");

const moveMeters = 1;

let physicsCast = PhysicsCast.instance


let cabina_glb = new GLTFShape("models/cabina.glb");
 const player = new Entity();
player.addComponent(cabina_glb);
player.addComponent(
  new Transform({ 
    position: Vector3.Zero(), scale: new Vector3(0.8, 1, 0.8) })
); 
engine.addEntity(player)

const shipCollider = new Entity();
shipCollider.addComponent(glb);
shipCollider.addComponent(
  new Transform({
    position: new Vector3(2, 0, 8),
    scale: new Vector3(1.5, 1, 1.5),
  })
);
engine.addEntity(shipCollider);
player.setParent(shipCollider)

movePlayerTo({ x: 2, y: 0, z: 8 });
/* 
const myEntity2 = new Entity()
myEntity2.addComponent(glb)
myEntity2.addComponent(new Transform({position: new Vector3(3,0,3)}))
engine.addEntity(myEntity2) */
// Instance the input objectw
const input = Input.instance;
let position = shipCollider.getComponent(Transform);
input.subscribe("BUTTON_UP", ActionButton.FORWARD, false, (e) => {
  log("pointer Up", e);
  if(rotationDiff==0){
    moveForward()
  }
  else if(rotationDiff==1 || rotationDiff== -3){
    moveToRight()
  }
  else if(rotationDiff==2 || rotationDiff == -2){
    moveBackward()
  }
  else if(rotationDiff==3 || rotationDiff -1){
    moveToLeft()
  }
});

input.subscribe("BUTTON_UP", ActionButton.BACKWARD, false, (e) => {
  log("pointer Up", e);
  if(rotationDiff==0){
    moveBackward()
  }
  else if(rotationDiff==1 || rotationDiff== -3){
    moveToLeft()
  }
  else if(rotationDiff==2 || rotationDiff == -2){
    moveForward()
  }
  else if(rotationDiff==3 || rotationDiff -1){
    moveToRight()
  }
});

input.subscribe("BUTTON_UP", ActionButton.LEFT, false, (e) => {
  log("pointer Up", e);
  if(rotationDiff==0){
    moveToLeft()
  }
  else if(rotationDiff==1 || rotationDiff== -3){
    moveForward()
  }
  else if(rotationDiff==2 || rotationDiff == -2){
    moveToRight()
  }
  else if(rotationDiff==3 || rotationDiff -1){
    moveBackward()
  }
});

input.subscribe("BUTTON_UP", ActionButton.RIGHT, false, (e) => {
  log("pointer Up", e);
  if(rotationDiff==0){
    moveToRight()
  }
  else if(rotationDiff==1 || rotationDiff== -3){
    moveBackward()
  }
  else if(rotationDiff==2 || rotationDiff == -2){
    moveToLeft()
  }
  else if(rotationDiff==3 || rotationDiff -1){
    moveForward()
  }
});

input.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, (e) => {
  log("pointer Up", e);
  if (!moving) {
    moving = true;
    moveRotateRight = true;
    position = shipCollider.getComponent(Transform);
    rotationDiff = rotationDiff -1
    if (rotationDiff==-4){
      rotationDiff=0
    }
  }
});

input.subscribe("BUTTON_UP", ActionButton.SECONDARY, false, (e) => {
  log("pointer Up", e);
  if (!moving) {
    moving = true;
    moveRotateLeft = true;
    position = shipCollider.getComponent(Transform);
    rotationDiff = rotationDiff +1
    if (rotationDiff==4){
      rotationDiff=0
    }
  }
});
export class SimpleMove implements ISystem {
  update(dt: number) {
    if (moving) {
      if (!isWrapped) {
        isWrapped = true;
        shipCollider.getComponent(Transform).scale.setAll(1.1);
        return;
      }
      let transform = shipCollider.getComponent(Transform);
      if (moveUp) {
        //forward == left
        //left == down
        transform.position.x = transform.position.x + velocity * dt;
        if (transform.position.x >= maxXPos) {
          transform.position.x = maxXPos;
          moveUp = false;
          moving = false;
        }
      } else if (moveDown) {
        //forward == left
        //left == down
        transform.position.x = transform.position.x - velocity * dt;
        if (transform.position.x <= maxXPos) {
          transform.position.x = maxXPos;
          moveDown = false;
          moving = false;
        }
      } else if (moveLeft) {
        transform.position.z = transform.position.z + velocity * dt;
        if (transform.position.z >= maxZPos) {
          transform.position.z = maxZPos;
          moveLeft = false;
          moving = false;
        }
        log(transform.position.z);
      } else if (moveRight) {
        transform.position.z = transform.position.z - velocity * dt;
        if (transform.position.z <= maxZPos) {
          transform.position.z = maxZPos;
          moveRight = false;
          moving = false;
        }
        log(transform.position.z);
      } else if (moveRotateLeft) {
        let transform = shipCollider.getComponent(Transform);
        transform.rotate(new Vector3(0, 1, 0), 90);
        moveRotateLeft = false;
        moving = false;
      } else if (moveRotateRight) {
        let transform = shipCollider.getComponent(Transform);
        transform.rotate(new Vector3(0, 1, 0), -90);
        moveRotateRight = false;
        moving = false;
      }
    }
  }
}
engine.addSystem(new SimpleMove());
function moveForward() {
  let targetPos = new Vector3(shipCollider.getComponent(Transform).position.x+moveMeters, 
  shipCollider.getComponent(Transform).position.y, shipCollider.getComponent(Transform).position.z)
  detectWallBeforeMove(targetPos, moveToForwardNow)

}
function moveToForwardNow(hasWall: boolean) {
  let localPos = shipCollider.getComponent(Transform).position.x + moveMeters;
  if (localPos >= 15 || hasWall) {
    return;
  }
  if (!moving) {
    position = shipCollider.getComponent(Transform);
    maxXPos = position.position.x + moveMeters;
    moving = true;
    moveUp = true;
  }

}

function moveBackward(){
  let targetPos = new Vector3(shipCollider.getComponent(Transform).position.x - moveMeters, 
  shipCollider.getComponent(Transform).position.y, 
  shipCollider.getComponent(Transform).position.z)
  detectWallBeforeMove(targetPos, moveToBackwardNow)
}

function moveToBackwardNow(hasWall: boolean) {
  let localPos = shipCollider.getComponent(Transform).position.x - moveMeters;
  if (localPos <= 1 || hasWall) {
    return;
  }
  if (!moving) {
    position = shipCollider.getComponent(Transform);
    maxXPos = position.position.x - moveMeters;
    moving = true;
    moveDown = true;
  }
}
function moveToLeft(){
  let targetPos = new Vector3(shipCollider.getComponent(Transform).position.x, 
  shipCollider.getComponent(Transform).position.y, 
  shipCollider.getComponent(Transform).position.z + moveMeters)
  detectWallBeforeMove(targetPos, moveToLeftNow)
}

function moveToLeftNow(hasWall: boolean){
  let localPos = shipCollider.getComponent(Transform).position.z + moveMeters;
  if (localPos >= 15 || hasWall) {
    return;
  }
  if (!moving) {
    position = shipCollider.getComponent(Transform);
    maxZPos = position.position.z + moveMeters;
    moving = true;
    moveLeft = true;
  }
}

function moveToRight(){
  let targetPos = new Vector3(shipCollider.getComponent(Transform).position.x, 
  shipCollider.getComponent(Transform).position.y, 
  shipCollider.getComponent(Transform).position.z - moveMeters)
  detectWallBeforeMove(targetPos, moveToRightNow)
}

function moveToRightNow(hasWall: boolean) {
  let localPos = shipCollider.getComponent(Transform).position.z - moveMeters;
  if (localPos <= 1 || hasWall) {
    return;
  }
  if (!moving) {
    position = shipCollider.getComponent(Transform);
    maxZPos = position.position.z - moveMeters;
    moving = true;
    moveRight = true;
  }
}

function detectWallBeforeMove(targetPos: Vector3, move: (hasWall: boolean) => void) { 
  let originPos = shipCollider.getComponent(Transform).position
  let rayFromPoints = physicsCast.getRayFromPositions(originPos, targetPos)
  rayFromPoints.distance = 2
  let hasWall = false
  physicsCast.hitAll(
    rayFromPoints,
    (e) => {
      if (e == undefined){
        return
      }
      for (let entityHit of e.entities) {

        log(entityHit.entity.meshName)
        if (entityHit.entity.meshName.indexOf("wall") == 0){
          hasWall= true
        }
      }
      move(hasWall)
    },
    2
  )
}

