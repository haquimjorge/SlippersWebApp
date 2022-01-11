import axios from 'axios'

const categoryActions = {
    getCategories = async () => {
        return await axios.get(
            "http://localhost:4000/api/categories"
        )
    },
    getCategory = async (slug) => {
        return await axios.get(
            `http://localhost:4000/api/category/${slug}`
        )
    },
    removeCategory = async (slug) => { // pasarle token de admin cuando este por parametro ademas de slug
        return await axios.delete(
            `http://localhost:4000/api/category/${slug}` // aca falta el headers del token
        )
    },
    updateCategory = async (slug, category) => {
        return await axios.put(
            `http://localhost:4000/api/category/${slug}`, category
        )
    },
    createCategory = async (category) => {
        return await axios.get(
            `http://localhost:4000/api/category`, category
        )
    }
}

export default categoryActions