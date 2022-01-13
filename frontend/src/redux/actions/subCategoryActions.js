import axios from 'axios'

export const getSubCategories = async () => {
    return await axios.get(
        "http://localhost:4000/api/subcategories"
    )
}

export const getSubCategory = async (slug) => {
    return await axios.get(
        `http://localhost:4000/api/subcategory/${slug}`
    )
}

export const removeSubCategory = async (slug) => { // pasarle token de admin cuando este por parametro ademas de slug
    return await axios.delete(
        `http://localhost:4000/api/subcategory/${slug}` // aca falta el headers del token
    )
}

export const updateSubCategory = async (slug, subcategory) => {
    return await axios.put(
        `http://localhost:4000/api/subcategory/${slug}`, subcategory
    )
}

export const createSubCategory = async (subcategory) => {
    return await axios.post(
        `http://localhost:4000/api/subcategory`, subcategory
    )
}

// const subCategoryActions = {
//     getSubCategories = async () => {
//         return await axios.get(
//             "http://localhost:4000/api/subcategories"
//         )
//     },
//     getSubCategory = async (slug) => {
//         return await axios.get(
//             `http://localhost:4000/api/subcategory/${slug}`
//         )
//     },
//     removeSubCategory = async (slug) => { // pasarle token de admin cuando este por parametro ademas de slug
//         return await axios.delete(
//             `http://localhost:4000/api/subcategory/${slug}` // aca falta el headers del token
//         )
//     },
//     updateSubCategory = async (slug, subcategory) => {
//         return await axios.put(
//             `http://localhost:4000/api/subcategory/${slug}`, subcategory
//         )
//     },
//     createSubCategory = async (subcategory) => {
//         return await axios.post(
//             `http://localhost:4000/api/subcategory`, subcategory
//         )
//     }
// }

// export default subCategoryActions