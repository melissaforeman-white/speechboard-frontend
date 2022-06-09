const BASE_URL = "http://localhost:8000/accounts/token/"

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
    catch (e) {
        return null
    }
}

const accountLogin = async (username, password) => {
    const url = BASE_URL
    const init = {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({username, password})
    }
    console.log(url, init)
    return await tryCatchFetch(url, init)
}
const updateToken = async (refreshToken) => {
    const url = BASE_URL + 'refresh/'
    const init = {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({'refresh': refreshToken}),
    }
    console.log(url, init)
    return await tryCatchFetch(url, init)
}
const exportItems = {
    accountLogin,
    updateToken
}

export default exportItems