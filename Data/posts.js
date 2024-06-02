import { headers } from "../utils/config"
const url = 'https://dummyapi.io/data/v1/post'

const getPosts = async() => {
  try {
    const res = await fetch(url,{method:'GET',headers})
    const data = res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export {getPosts}