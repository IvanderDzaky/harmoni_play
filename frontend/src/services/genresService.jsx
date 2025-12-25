const BASE_URL = "http://localhost:5000/api/genres"

export const getAllCategories = async () => {
    try{
        const response = await fetch(BASE_URL)
        if(!response.ok){
            throw new Error("Tidak ada categories")
        }
        const categories = await response.json()
        return categories
    }catch (error) {
        console.log(error)
        return []
    }
}