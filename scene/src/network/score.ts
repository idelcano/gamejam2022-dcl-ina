import { setUserData, userData } from "./player"

export let server =
'https://dcl.spanishmuseum.es/dcl/'
  // change data in scoreboard
  export async function signScore(score: string, comment: string) {
    if (!userData) {
      await setUserData()
    }
    try {
      let url = server + 'add_gm_score.php'
      let body = JSON.stringify({
        id: (await userData).userId,
        name: (await userData).displayName,
        score: score,
        comment:comment
      })
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      })
      return await response.json()
    } catch (e) {
      log('error posting to server ', e)
    }
  }
  export async function getScores() {
      try {
        let url = server + 'get_gm_scores.php'
        let response = await fetch(url)
        let json = await response.json()
        return json
      } catch (e) {
        log('text call error fetching scores from server ', e)
      }
    }