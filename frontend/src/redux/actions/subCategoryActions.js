import axios from 'axios'

const subCategoryActions = {
    getSubCategories : async () => {
        return await axios.get(
            "http://localhost:4000/api/subcategories"
        )
    },
    getSubCategory : async (slug) => {
        return await axios.get(
            `http://localhost:4000/api/subcategory/${slug}`
        )
    },
    removeSubCategory : async (slug) => { // pasarle token de admin cuando este por parametro ademas de slug
        return await axios.delete(
            `http://localhost:4000/api/subcategory/${slug}` // aca falta el headers del token
        )
    },
    updateSubCategory : async (slug, subcategory) => {
        return await axios.put(
            `http://localhost:4000/api/subcategory/${slug}`, subcategory
        )
    },
    createCategory : async (subcategory) => {
        return await axios.get(
            `http://localhost:4000/api/subcategory`, subcategory
        )
    },
    getSubcategoriesByParentId: async (parentId)=>{
        return await axios.get(`http://localhost:4000/api/subcategories/${parentId}`)
    }
}

export default subCategoryActions