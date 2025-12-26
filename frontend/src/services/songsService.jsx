const BASE_URL = "http://localhost:5000/api/songs"

export const getAllSongs = async () => {
    try{
        const response = await fetch(BASE_URL)
        if(!response.ok) {
            throw new Error("Tidak bisa fetching data")
        }
        const songs = await response.json()
        return songs
    }catch (error) {
        console.log(error)
        return []
    }
}

export const getSongsByName = async  (q) => {
    try{
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}`)
        if(!response.ok) {
            throw new Error("Tidak bisa fetching data")
        }
        const songs = await response.json()
        return songs
    }catch (error) {
        console.log(error)
        return []
    }


}

export const getSongsByCategoryId = async (id) => {
    try{
        if(!id) return []

        const response = await fetch(`${BASE_URL}/category/${id}`)
        if (!response.ok) return []
        
        return await response.json()
    }catch (err) {
        console.log(err)
        return []
    }
}