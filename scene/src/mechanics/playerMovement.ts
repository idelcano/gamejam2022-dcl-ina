import { movePlayerTo } from "@decentraland/RestrictedActions"

const velocity = 0.5
let isWrapped = false
let moveUp=false
let moveDown=false
let moveLeft=false
let moveRight=false
let moveRotateRight = false
let moveRotateLeft = false
let moving = false
// button up event
let maxXPos = 2
let maxZPos = 2
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
/* 
const myEntity2 = new Entity()
myEntity2.addComponent(glb)
myEntity2.addComponent(new Transform({position: new Vector3(3,0,3)}))
engine.addEntity(myEntity2) */
// Instance the input objectw
const input = Input.instance
let position = shipCollider.getComponent(Transform)
input.subscribe("BUTTON_UP", ActionButton.FORWARD, false, (e) => {
    log("pointer Up", e)
    let localPos = shipCollider.getComponent(Transform).position.x + moveMeters
    if (localPos>=15){
        return
    }
    if (!moving){
        position = shipCollider.getComponent(Transform)
        maxXPos = position.position.x + moveMeters
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
        maxXPos = position.position.x - moveMeters
        moving = true
        moveDown=true
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.LEFT, false, (e) => {
    log("pointer Up", e)
    let localPos = shipCollider.getComponent(Transform).position.z + moveMeters
    if (localPos>=15){
        return
    }
    if (!moving){
      position = shipCollider.getComponent(Transform)
      maxZPos = position.position.z + moveMeters
        moving = true
        moveLeft = true
    }
  })

  input.subscribe("BUTTON_UP", ActionButton.RIGHT, false, (e) => {
    log("pointer Up", e)
    let localPos = shipCollider.getComponent(Transform).position.z - moveMeters
    if (localPos<=1){
        return
    }
    if (!moving){
      position = shipCollider.getComponent(Transform)
      maxZPos = position.position.z - moveMeters
      moving = true
      moveRight=true
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
            transform.position.x = transform.position.x+(velocity*dt)
            if(transform.position.x >= maxXPos){
                transform.position.x = maxXPos
                moveUp = false
                moving = false
            }
        }
      else if (moveDown){
        //forward == left
        //left == down
            transform.position.x = transform.position.x-(velocity*dt)
            if(transform.position.x <= maxXPos){
                transform.position.x = maxXPos
                moveDown = false
                moving = false
            }
      }
      else if (moveLeft){
        transform.position.z = transform.position.z+(velocity*dt)
        if(transform.position.z >= maxZPos){
            transform.position.z = maxZPos
            moveLeft = false
            moving = false
        }
        log(transform.position.z)
      }
      else if (moveRight){
        transform.position.z = transform.position.z- (velocity*dt)
        if(transform.position.z <= maxZPos){
            transform.position.z = maxZPos
            moveLeft = false
            moving = false
        }
        log(transform.position.z)
        }
        else if (moveRotateLeft){
            let transform = shipCollider.getComponent(Transform)
            transform.rotate(new Vector3(0,1,0), 90)
            moveRotateLeft=false
            moving=false
          }
          else if (moveRotateRight){
              let transform = shipCollider.getComponent(Transform)
              transform.rotate(new Vector3(0,1,0), -90)
              moveRotateRight=false
              moving=false
            }
        }
    }
  }
  engine.addSystem(new SimpleMove())