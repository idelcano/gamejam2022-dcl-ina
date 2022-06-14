import * as utils from "@dcl/ecs-scene-utils";
import { GlobalVariables } from "src/Global/globalValues";
import {
  doorHit1,
  doorHit2,
  endIntro,
  secondIntro,
  firstPersonText,
  levelCompleted,
  firstIntro,
  thirdintro,
  gameover,
  gameendtext,
  info,
  info1,
  gameendscore,
} from "src/ui/ui";
import { DialogWindow } from "@dcl/npc-scene-utils";
import { gamefinishA, gamefinishB, gamefinishC, gameovernot } from "src/dialogs/dialogs";
import { getScores, signScore } from "src/network/score";

const cube = new Entity();
const cube2 = new Entity();
const cube3 = new Entity();
const cube4 = new Entity();
const cube5 = new Entity();
const cube6 = new Entity();
const cube7 = new Entity();
const cube8 = new Entity();
const cube9 = new Entity();
const cube10 = new Entity();
const cube11 = new Entity();

const clip = new AudioClip("sounds/zas2.mp3");
const zas = new AudioSource(clip);

const clip2 = new AudioClip("sounds/accesoConcedido.mp3");
const accesoConcedido = new AudioSource(clip2);

const clip3 = new AudioClip("sounds/fire.mp3");
const fire = new AudioSource(clip3);

const clip4 = new AudioClip("sounds/hitEnemy.mp3");
const hitEnemy = new AudioSource(clip4);

const clip5 = new AudioClip("sounds/steps.mp3");
const steps = new AudioSource(clip5);

const clip6 = new AudioClip("sounds/yes.mp3");
const yes = new AudioSource(clip6);
const clip7 = new AudioClip("sounds/hey_listen.mp3");
const hey_listen = new AudioSource(clip7);

const clip8 = new AudioClip("sounds/bulletclack.mp3");
const bullet_clac = new AudioSource(clip8);

const clip9 = new AudioClip("sounds/playerherido.mp3");
const player_hit = new AudioSource(clip9);

const clip10 = new AudioClip("sounds/malo.mp3");
const malo = new AudioSource(clip10);
const clip11 = new AudioClip("sounds/golpe.mp3");
const golpemalo = new AudioSource(clip11);

// Add AudioSource component to entity
cube.addComponent(zas);
cube2.addComponent(accesoConcedido);
cube3.addComponent(fire);
cube4.addComponent(hitEnemy);
cube5.addComponent(steps);
cube6.addComponent(yes);
cube7.addComponent(hey_listen);
cube8.addComponent(bullet_clac);
cube9.addComponent(player_hit);
cube10.addComponent(malo);
cube11.addComponent(golpemalo);
engine.addEntity(cube);
engine.addEntity(cube2);
engine.addEntity(cube3);
engine.addEntity(cube4);
engine.addEntity(cube5);
engine.addEntity(cube6);
engine.addEntity(cube7);
engine.addEntity(cube8);
engine.addEntity(cube9);
engine.addEntity(cube10);
engine.addEntity(cube11);

/* executeTask(async () => {
    let n = new AttachToAvatar({
        avatarId: await (await getData()).publicKey!!!,
        anchorPointId: AttachToAvatarAnchorPointId.NameTag,
      })
      cube.addComponentOrReplace(
          n
      )
      cube2.addComponentOrReplace(
          n
      )
      cube3.addComponentOrReplace(
          n
      )
      cube4.addComponentOrReplace(
          n
      )
      cube5.addComponentOrReplace(
          n
      )
      cube6.addComponentOrReplace(
          n
      )
    }
)  */
export function hitFantasmicoSound() {
  hitEnemy.playOnce();
}
export function intro() {
  firstPersonText.visible = true;
  malo.playOnce();
  utils.setTimeout(100, () => {
    firstIntro.visible = true;
  });
  utils.setTimeout(2000, () => {
    firstIntro.visible = false;
    secondIntro.visible = true;
  });
  utils.setTimeout(4000, () => {
    secondIntro.visible = false;
    thirdintro.visible = true;
  });
  utils.setTimeout(6000, () => {
    thirdintro.visible = false;
    endIntro.visible = true;
  });
  utils.setTimeout(8000, () => {
    firstPersonText.visible = false;
    endIntro.visible = false;
    info1.visible=true
    GlobalVariables.startGame=true
  });
}

export function gameoverui() {
  player_hit.playOnce();
  firstPersonText.visible = true;
  gameover.visible = true;
  utils.setTimeout(1000, () => {
    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(gameovernot, 0);
  });
  utils.setTimeout(3000, () => {
    hidegameoverui();
  });
}

export function showInfo() {
  firstPersonText.visible = !firstPersonText.visible;
  info.visible = !info.visible;
  utils.setTimeout(10000, () => {
    firstPersonText.visible = false;
    info.visible = false;
  });
}

export function hideInfo() {;
  firstPersonText.visible = false;
  info.visible = true;
}


export function gameend() {
  yeah();
  
  utils.setTimeout(1000, () => {
    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(gamefinishA, 0);
  });
}


export function gamebad() {
  firstPersonText.visible = true;
  gameendtext.visible = true;
  malorisa()
  executeTask(async () => {
 
  let scores = await signScore(GlobalVariables.steps-GlobalVariables.lives  + "", "Ina was died in prision")
  let stringify_score =""
  for(let score of await scores) {
    stringify_score = "Name: "+score["name"] + " score: "+score["score"] + " final: "+ score["comment"] + "\n" + stringify_score
    
  }
  log(stringify_score)
  gameendscore.value= stringify_score
  gameendscore.visible=true
  })
    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(gamefinishB, 0);
}


export function gamegood() {
  firstPersonText.visible = true;
  gameendtext.visible = true;
  yeah();
  executeTask(async () => {
 
    let scores = await signScore(GlobalVariables.steps-GlobalVariables.lives  + "", "Ina was saved")
    let stringify_score =""
    for(let score of await scores) {
      stringify_score = "Name: "+score["name"] + " score: "+score["score"] + " final: "+ score["comment"] + "\n" + stringify_score
      
    }
    log(stringify_score)
    stringify_score = stringify_score+ "\n\nThanks for playing!\nRemember that less score its better in this game!\nRefresh or move to another location.\nSpecial thanks to Okita for its tests"
    gameendscore.value= stringify_score
    gameendscore.visible=true
    info1.visible = false
    })
  let dialogWindow = new DialogWindow();
  dialogWindow.openDialogWindow(gamefinishC, 0);

  utils.setTimeout(10000, () => {
    log("end")
  });
}

export function hidegameoverui() {
  firstPersonText.visible = false;
  gameover.visible = false;
}

export function hitui() {
  zas.playOnce();
  player_hit.playOnce();
  utils.setTimeout(100, () => {
    doorHit1.visible = true;
    doorHit2.visible = false;
  });
  utils.setTimeout(200, () => {
    doorHit1.visible = false;
    doorHit2.visible = true;
    GlobalVariables.lives = GlobalVariables.lives - 10;
    GlobalVariables.livesui.decrease(10);
  });
  utils.setTimeout(300, () => {
    doorHit1.visible = true;
    doorHit2.visible = false;
  });
  utils.setTimeout(300, () => {
    doorHit1.visible = false;
    doorHit2.visible = false;
  });
}

export function changeLevel() {
  yes.playOnce();
  levelCompleted.visible = true;
  utils.setTimeout(2000, () => {
    levelCompleted.visible = false;
  });
}

export function accessGranted() {
  accesoConcedido.playOnce();
}
export function malorisa() {
  malo.playOnce();
}
export function yeah() {
  yes.playOnce();
}
export function walk() {
  steps.playOnce();
}
export function openfire() {
  fire.playOnce();
}
export function listen() {
  hey_listen.playOnce();
}
export function bulletWall() {
  bullet_clac.playOnce();
}
export function golpeBoss() {
  golpemalo.playOnce();
}

