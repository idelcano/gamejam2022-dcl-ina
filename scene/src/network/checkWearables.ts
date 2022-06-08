import * as crypto from '@dcl/crypto-scene-utils'
import { morrionContract } from './contracts'
import { getData } from './player'
export async function checkWearableCategory(item: string) {

  let userData = await getData()

 let inventory = await crypto.avatar.getUserInventory(userData.publicKey!!)
 for (let item of inventory){
     if (item.indexOf(item) !== -1 
     || item.indexOf(morrionContract) !== -1)
     return true
 }
  log('no matching wearables')
  return false
}