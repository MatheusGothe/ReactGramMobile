
const getUsersStories = async() => {

    try {
        const res = await fetch('https://dummyjson.com/users')
        const data = await res.json()
       
        return data
        
    } catch (error) {
        console.log(error)
    }
}
export {getUsersStories}