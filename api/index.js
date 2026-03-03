import axios from 'axios';

const baseUrl = 'https://api.dineshshaw.in/api';

const VIEWS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const viewsCache = new Map(); // { [id]: { count, fetchedAt } }

const getBlogViews = (id, signal) => {
    const cached = viewsCache.get(id);
    if (cached && Date.now() - cached.fetchedAt < VIEWS_CACHE_TTL) {
        return Promise.resolve({ success: true, data: { count: cached.count }, fromCache: true });
    }

    return axios.get(`${baseUrl}/views/${id}`, { signal })
        .then(({ data }) => {
            viewsCache.set(id, { count: data.count, fetchedAt: Date.now() });
            return { success: true, data };
        })
        .catch((error) => {
            console.log("Error getting Views", error);
            return { success: false };
        });
};

const updateBlogViews = (id, signal) =>
    axios.post(`${baseUrl}/views/${id}`, {}, { signal })
        .then(({ data }) => {
            // Refresh cache with incremented count
            viewsCache.set(id, { count: data.count, fetchedAt: Date.now() });
            return { success: true, data };
        })
        .catch((error) => {
            console.log("Error updating Views", error);
            return { success: false };
        });


const isViewsCached = (id) => {
    const cached = viewsCache.get(id);
    return !!(cached && Date.now() - cached.fetchedAt < VIEWS_CACHE_TTL);
};

export { getBlogViews, updateBlogViews, isViewsCached };