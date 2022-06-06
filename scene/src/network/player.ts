import { getUserData, UserData } from "@decentraland/Identity";
export let userData: UserData

export async function setUserData() {
  const data = await getUserData()
  log(data!.displayName)
  userData = data!
}

export async function getData() {
  
  if (!userData) {
    await setUserData()
  }
  return await userData
}
