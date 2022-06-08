import * as utils from "@dcl/ecs-scene-utils";

export class Trigger {
  position: Vector3;
  callback: () => void;
  constructor(position: Vector3, callback: () => void, debug:boolean, entity?: Entity) {
    this.position = position;
    this.callback = callback

    
    // create trigger area object, setting size and relative position
    let triggerBox = new utils.TriggerBoxShape();
    

    //create entity
    if (entity == null){
        const box = new Entity();
    
        //create shape for entity and disable its collision
        box.addComponent(new BoxShape());
        box.getComponent(BoxShape).withCollisions = false;
        box.getComponent(BoxShape).visible = false;
    
        //set transform component with initial position
        box.addComponent(new Transform({ position: this.position }));
        //create trigger for entity
        box.addComponent(
            new utils.TriggerComponent(
                triggerBox, //shape
                {
                  onCameraEnter: () => {
                    this.callback();
                  },
                  enableDebug: debug,
                }
              )
        );
    
        //add entity to engine
        engine.addEntity(box);
        
    }else{    
        //create trigger for entity
        entity.addComponent(
            new utils.TriggerComponent(
                triggerBox, //shape
                {
                  onCameraEnter: () => {
                    this.callback();
                  },
                  enableDebug: debug,
                }
              )
        );
    }
  }
}
