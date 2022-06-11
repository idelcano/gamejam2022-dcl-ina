import * as utils from "@dcl/ecs-scene-utils";
import { getData } from "src/network/player";
import { doorHit1, doorHit2, levelCompleted } from "src/ui/ui";

const cube = new Entity();
const cube2 = new Entity();
const cube3 = new Entity();
const cube4 = new Entity();
const cube5 = new Entity();
const cube6 = new Entity();
const cube7 = new Entity();

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

// Add AudioSource component to entity
cube.addComponent(zas);
cube2.addComponent(accesoConcedido);
cube3.addComponent(fire);
cube4.addComponent(hitEnemy);
cube5.addComponent(steps);
cube6.addComponent(yes);
cube7.addComponent(hey_listen);
engine.addEntity(cube);
engine.addEntity(cube2);
engine.addEntity(cube3);
engine.addEntity(cube4);
engine.addEntity(cube5);
engine.addEntity(cube6);
engine.addEntity(cube7);

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
export function hitFantasmicoSound(){
  hitEnemy.playOnce()
}
export function hitui() {
  zas.playOnce();
  hitEnemy.playOnce();
  utils.setTimeout(100, () => {
    doorHit1.visible = true;
    doorHit2.visible = false;
  });
  utils.setTimeout(200, () => {
    doorHit1.visible = false;
    doorHit2.visible = true;
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
  utils.setTimeout(1000, () => {
    levelCompleted.visible = false;
  });
}

export function accessGranted() {
  accesoConcedido.playOnce();
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
  //steps.playOnce();
}
