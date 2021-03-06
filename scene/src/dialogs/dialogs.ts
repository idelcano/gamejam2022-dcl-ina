
import * as npc from '@dcl/npc-scene-utils'
import { GlobalVariables } from 'src/Global/globalValues'
import { getInaData, inaData } from 'src/network/player'

let face = "images/ina2.png"
//face = inaData["face"]

export let heyhello: npc.Dialog[] = [
    {
        text: "Hey, I am Ina_dcl, bad news, not blue chip here... we are trapped... I am not going to lie you, many avatars have died in this prision, and they will try to kill you.",
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
    {
        text: "I am hidden in the last level. I have managed to program a machine premecha_alphav01 I think you will be able to overcome all the challenges.",
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
    {
            text: "Let's go out and help me to escape and destroy this prison forever, the future of decentraland depends on you!",
            image: {
                path: face,
                height: 250,
                width: 230,
                offsetX: -700,
                offsetY: -50,
            },
        },

    {
        text: "And only for you know! you could move in any direction using asdw, and rotate your mecha with e and f!",
        isEndOfDialog: true,
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]


export let heyfantasmico: npc.Dialog[] = [
    {
        text: "hey, that ghost is alone! take the opportunity to shoot him with shift!!",
        isEndOfDialog: true,
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]

export let heyglassess: npc.Dialog[] = [
    {
        text: "Hey, do you have a spanish museum glasses? you will get an extra live!",
        isEndOfDialog: true,
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]
export let heytail: npc.Dialog[] = [
    {
        text: "Hey, do you have a spanish museum tail? you will get an extra live!",
        isEndOfDialog: true,
        image: {
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]
export let gameovernot: npc.Dialog[] = [
    {
        text: "It seems that you have died...\nbut not! i managed to hack the game, i will update your health to 100, unfortunately 1000 steps will be added to you.",
        isEndOfDialog: true,
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]
export let gamefinishA: npc.Dialog[] = [
    {
        text: "You did it!!!\nCool!!\nNow you can open one of the jails.\nHey... I hope you don't choose the blue chip again!",
        isEndOfDialog: true,
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]
export let gamefinishC: npc.Dialog[] = [
    {
        text: "I can't believe you're save me!!!...\nThank you, I can only paraphrase Quevedo",
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
    {
        text: "El amigo ha de ser como la sangre,\nque acude luego a la herida sin esperar a que le llamen. \n- Francisco de Quevedo",
        isEndOfDialog: true,
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    }
]

export let gamefinishB: npc.Dialog[] = [
    {
        text: "I can't believe you're leaving me locked up here...\nI can only paraphrase Quevedo",
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
    {
        text: "A un avariento\nEn aqueste enterramiento\nhumilde, pobre y mezquino,\nyace envuelto en oro fino\nun hombre rico avariento.",
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
    {
        text: "Muri?? con cien mil dolores\nsin poderlo remediar,\ntan s??lo por no gastar\nni aun gasta malos humores.\n- Francisco de Quevedo",
        isEndOfDialog: true,
        image:{
            path: face,
            height: 250,
            width: 230,
            offsetX: -700,
            offsetY: -50,
        },
    },
]
