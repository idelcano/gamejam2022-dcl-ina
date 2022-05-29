import { getUserData } from "@decentraland/Identity"
let data
executeTask(async () => {
  data = await getUserData()
  log(data)
})