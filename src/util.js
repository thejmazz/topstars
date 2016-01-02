export async function fetchJSON(uri)  {
  try {
    let res = await fetch(uri)
    let data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}
