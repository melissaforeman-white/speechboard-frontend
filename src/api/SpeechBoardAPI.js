// const BASE_URL = "https://cors-anywhere.herokuapp.com/https://speechboard.herokuapp.com/"
// const BASE_URL = "https://speechboard.herokuapp.com/"
const BASE_URL = "http://localhost:8000/"

const tryCatchFetch = async (url, init = null) => {
    try {
        const response = await fetch(url, init)
        console.log('url ', url)
        console.log('init ', init)
        if (response.ok) {
            return await response.json()
        }
        else {
            throw new Error(`Bad response: ${response.status} ${response.statusText}`)
        }
    }
    catch (e) {
        // console.log(e)
        return null
    }
}

const fetchBoards = async (token) => {
    const url = BASE_URL 
    const init = {
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json'
        },
        method:'GET',
    }
    return await tryCatchFetch(url, init)
}

const fetchBoardByID = async (boardID, token) => {
    const url = BASE_URL + `${boardID}/`
    const init = {
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json'
        },
        method:'GET',
    }
    return await tryCatchFetch(url, init)
}

const addBoard = async (boardObj, token) => {
    console.log('the board obj is ', boardObj)
    const url = BASE_URL 
    const init = {
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify(boardObj)
    }
    return await tryCatchFetch(url, init)
}
const editBoard = async (boardObj, token) => {
    console.log('the board obj is ', boardObj)
    const url = BASE_URL + boardObj.id + '/'
    const init = {
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json'
        },
        method:'PUT',
        body: JSON.stringify(boardObj)
    }
    return await tryCatchFetch(url, init)
}
const deleteBoard = async (boardID, token) => {
    console.log('the board id is ', boardID)
    const url = BASE_URL + boardID + '/'
    const init = {
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json'
        },
        method:'DELETE'
    }
    return await tryCatchFetch(url, init)
}

const exportItems = {
    fetchBoards,
    fetchBoardByID,
    addBoard,
    editBoard,
    deleteBoard
}

export default exportItems