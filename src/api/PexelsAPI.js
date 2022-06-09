// All requests made with the client will be authenticated

// import { createClient } from 'pexels';

const IMAGE_BASE_URL = `https://api.pexels.com/v1/search?query=`
const VIDEO_BASE_URL = 'https://api.pexels.com/videos/search?query='
const api_key = '563492ad6f91700001000001f73cda52ce9e40d7a286b1ca85de2455'

const tryCatchFetch = async (url, init = null) => {
    try {
        const response = await fetch(url, init)
        if (response.ok) {
            return await response.json()
        }
        else {
            throw new Error(`Bad response: ${response.status} ${response.statusText}`)
        }
    }
    catch(e) {
        return null
    }
}

const fetchImage = async (query) => {
    const url = IMAGE_BASE_URL + query
    const init = {
        headers: {
            'Authorization': `${api_key}`,
        }
    }
    return await tryCatchFetch(url, init)
}

const fetchVideo = async (query) => {
    const url = VIDEO_BASE_URL + query
    const init = {
        headers: {
            'Authorization': `${api_key}`,
        }
    }
    return await tryCatchFetch(url, init)
}
// const fetchImage =  async (query) => {
//     try {
//         console.log('the query is ', query)
//         const url = BASE_URL + query
//         const init = {
//             headers: {
//                 'Authorization': `${api_key}`,
//             }
//         }
//         const response = await fetch(url, init)
//         if (response.ok) {
//             return await response.json()
//         }
//         else {
//             throw new Error(`Bad response: ${response.status} ${response.statusText}`)
//         }
//     }
//     catch(e) {
//         return null
//     }
// } 

const exportItems = {
    fetchImage,
    fetchVideo
}

export default exportItems;