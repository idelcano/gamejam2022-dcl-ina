import * as ui from '@dcl/ui-scene-utils'
export class GlobalVariables {

static lives:number = 3
static steps:number = 0
static livesui = new ui.UICounter( GlobalVariables.lives, 0, 60, Color4.Yellow(), 30, true)
static stepsui = new ui.UICounter( GlobalVariables.steps, 0, 90, Color4.Yellow(), 30, true)
}

let healthLabel = new ui.CornerLabel('Health:', -100, 60, Color4.Yellow(), 30, true)
let stepsLabel = new ui.CornerLabel('Steps:', -100, 90, Color4.Yellow(), 30, true)
