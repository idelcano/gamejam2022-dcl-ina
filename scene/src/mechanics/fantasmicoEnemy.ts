
import * as utils from "@dcl/ecs-scene-utils";
import { GlobalVariables } from "src/Global/globalValues";

let fantasmico_glb = new GLTFShape("models/enemies/fantasmico.glb");
export enum Direction {
    Up,
    Down,
    Left,
    Right,
  }
@Component('FantasmicoDetails')
export class FantasmicoDetails{
    lives: number
    active: boolean = true
    direction: Direction = Direction.Up
    position: Vector3
    moving: boolean = false
    hitPlayer: boolean = false
    alive: boolean = true
    constructor(position: Vector3, rotationPos: Direction, startDisabled: boolean){
        this.lives = 1
        this.position = position
        this.direction = rotationPos
        this.active = startDisabled
    }
}
export class Fantasmico extends Entity{
    entity: Entity
    lives: number
    active: boolean
    public direction: Direction
    constructor(position: Vector3, rotationPos: Direction, startDisabled: boolean){
    super()
    this.active =startDisabled
    this.direction = rotationPos
    this.lives = 1
    let fantasmicoDetails: FantasmicoDetails = new FantasmicoDetails(position, rotationPos, startDisabled)
    this.entity = new Entity("fantasmico" + GlobalVariables.activeFantasmicos.length)
    this.entity.addComponent(fantasmicoDetails)
    this.entity.addComponent(fantasmico_glb);
    this.entity.addComponent(
      new Transform({
        position: position,
        scale: new Vector3(1, 1, 0.3),
      })
    );
    if (rotationPos == Direction.Left){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),180)
    }else if  (rotationPos == Direction.Right){
        this.entity.getComponent(Transform).rotate(new Vector3(0,0,0),0)
    }else if (rotationPos == Direction.Up){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),75)
    }else if  (rotationPos == Direction.Down){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),255)
    }
    engine.addEntity(this.entity);
    this.entity.addComponent(new Billboard())

    let triggerBox = new utils.TriggerBoxShape(new Vector3(0.5,0.8,0.5)
    );
    this.entity.addComponentOrReplace(
      new utils.TriggerComponent(
        triggerBox,
        {
          onTriggerEnter(entity) {
              log("fantasmico hit " +entity.name)
              if (entity.name?.indexOf("Circle") !== -1) {
                 //hitFantasmico()
              }
              if (entity.name?.indexOf("Bullet") !== -1) {
              }
          },
          enableDebug: false,
        }
      )
    );
    GlobalVariables.activeFantasmicos.push(this)
    }
}