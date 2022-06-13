import { getUserData, UserData } from "@decentraland/Identity";
export let userData: UserData

export let inaData: any

export async function setUserData() {
  const data = await getUserData()
  log(data!.displayName)
  userData = data!
}
export async function setInaData() {
  let url = "https://peer.decentraland.org/lambdas/profile/0xAf0E126d11161fd002200e980103b78470e660E4"
  let response = await fetch(url)
  let json = await response.json()
  inaData = { body: json["avatars"][0]["avatar"]["snapshots"]["body"], face: json["avatars"][0]["avatar"]["snapshots"]["face256"]}
  return inaData
}


export async function getData() {
  
  if (!userData) {
    await setUserData()
  }
  return await userData
}

export async function getInaData() {
  
  if (!inaData) {
    await setInaData()
  }
  return await inaData
}
