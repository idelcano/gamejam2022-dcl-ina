import { movePlayerTo } from "@decentraland/RestrictedActions"

let glb = new GLTFShape("models/player/block_user_col.glb")

const moveMeters=1
const hideAvatarsEntity = new Entity()
hideAvatarsEntity.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(16, 16, 16) },
    modifiers: [AvatarModifiers.HIDE_AVATARS]
  })
)
engine.addEntity(hideAvatarsEntity)

const player = new Entity()
player.addComponent(new BoxShape())
player.addComponent(new Transform({position: Vector3.Zero(), scale: new Vector3(0.4,0.4,0.4)}))
//engine.addEntity(player)
//player.setParent(Attachable.AVATAR)

const shipCollider = new Entity()
shipCollider.addComponent(glb)
shipCollider.addComponent(new Transform({position: new Vector3(2,0,8), scale: new Vector3(1.5,1,1.5)}))
engine.addEntity(shipCollider)

movePlayerTo({ x: 2, y: 0, z: 8 })
let isWrapped = false
/* 
const myEntity2 = new Entity()
myEntity2.addComponent(glb)
myEntity2.addComponent(new Transform({position: new Vector3(3,0,3)}))
engine.addEntity(myEntity2) */
// Instance the input objectw
const input = Input.instance
let moveUp=false
let moveDown=false
let moveLeft=false
let moveRight=false
let moveRotateRight = false
let moveRotateLeft = false
let moving = false
// button up event
let maxPos = 2
let position = shipCollider.getComponent(Transform)
input.subscribe("BUTTON_UP", ActionButton.FORWARD, false, (e) => {
    log("pointer Up", e)
    let localPos = shipCollider.getComponent(Transform).position.x + moveMeters
    if (localPos>=15){
        return
    }
    if (!moving){
        position = shipCollider.getComponent(Transform)
        maxPos = position.position.x + moveMeters
        moving = true
        moveUp = true
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.BACKWARD, false, (e) => {
    log("pointer Up", e)
    let localPos = shipCollider.getComponent(Transform).position.x - moveMeters
    if (localPos<=1){
        return
    }
    if (!moving){
        position = shipCollider.getComponent(Transform)
        maxPos = position.position.x - moveMeters
        moving = true
        moveDown=true
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.LEFT, false, (e) => {
    log("pointer Up", e)
    if (!moving){
        moving = true
        moveLeft=true
        position = shipCollider.getComponent(Transform)
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.RIGHT, false, (e) => {
    log("pointer Up", e)
    if (!moving){
        moving = true
        moveRight = true
        position = shipCollider.getComponent(Transform)
    }
  })


  input.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, (e) => {
    log("pointer Up", e)
    if (!moving){
        moving = true
        moveRotateRight = true
        position = shipCollider.getComponent(Transform)
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.SECONDARY, false, (e) => {
    log("pointer Up", e)
    if (!moving){
        moving = true
        moveRotateLeft = true
        position = shipCollider.getComponent(Transform)
    }
  })
  export class SimpleMove implements ISystem {
    update(dt:number) {
        if(moving){
            if(!isWrapped){
                isWrapped = true
                shipCollider.getComponent(Transform).scale.setAll(1.1)
                return
            }
        let transform = shipCollider.getComponent(Transform)
        if(moveUp){
            
            //forward == left
            //left == down
            transform.position.x = transform.position.x+(0.25*dt)
            if(transform.position.x >= maxPos){
                transform.position.x = maxPos
                moveUp = false
                moving = false
            }
        }
      else if (moveDown){
        //forward == left
        //left == down
            transform.position.x = transform.position.x-(0.25*dt)
            if(transform.position.x <= maxPos){
                transform.position.x = maxPos
                moveDown = false
                moving = false
            }
      }
      else if (moveLeft){
        let distance = Vector3.Forward().scale(1)
        //forward == left
        //left == down
        transform.translate(distance)
        moveLeft=false
      }
      else if (moveRight){
        let distance = Vector3.Backward().scale(1)
        //forward == left
        //left == down
        transform.translate(distance)
        moveRight=false
        }
        else if (moveRotateLeft){
          
            let transform = shipCollider.getComponent(Transform)
            if (transform.rotation >= Vector3.Left().toQuaternion()){
            transform.rotate(Vector3.Left(), 0.15*dt)
            moveRotateLeft=false
            } 
          }
        }
    }
  }
  engine.addSystem(new SimpleMove())