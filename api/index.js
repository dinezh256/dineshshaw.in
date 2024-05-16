import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = 'https://api.dineshshaw.in/api'

const getBlogViews = (id) =>
    axios.get(`${baseUrl}/views/${id}`)
        .then(({ data }) => ({ success: true, data }))
        .catch((error) => {
            console.log("Error getting Views", error);
            return ({ success: false })
        });


const updateBlogViews = (id) =>
    axios.post(`${baseUrl}/views/${id}`)
        .then(({ data }) => ({ success: true, data }))
        .catch((error) => {
            console.log("Error updating Views", error);
            return ({ success: false })
        });


export { getBlogViews, updateBlogViews };