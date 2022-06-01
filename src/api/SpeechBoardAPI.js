const BASE_URL = "https://cors-anywhere.herokuapp.com/https://speechboard.herokuapp.com/"

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
        console.log(e)
        return null
    }
}

const fetchBoards = async () => {
    const url = BASE_URL 
    return await tryCatchFetch(url)
}

const fetchBoardByID = async (boardID) => {
    const url = BASE_URL + `${boardID}/`
    return await tryCatchFetch(url)
}

const addBoard = async (boardObj) => {
    console.log('the board obj is ', boardObj)
    const url = BASE_URL
    const init = {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify(boardObj)
    }
    return await tryCatchFetch(url, init)
}

const exportItems = {
    fetchBoards,
    fetchBoardByID,
    addBoard
}

export default exportItems