import axios, { } from 'axios';

const baseUrl = 'https://api.dineshshaw.in/api';

const getBlogViews = (id, signal) =>
    axios.get(`${baseUrl}/views/${id}`, { signal })
        .then(({ data }) => ({ success: true, data }))
        .catch((error) => {
            console.log("Error getting Views", error);
            return ({ success: false })
        });


const updateBlogViews = (id, signal) =>
    axios.post(`${baseUrl}/views/${id}`, {}, { signal })
        .then(({ data }) => ({ success: true, data }))
        .catch((error) => {
            console.log("Error updating Views", error);
            return ({ success: false })
        });


export { getBlogViews, updateBlogViews };