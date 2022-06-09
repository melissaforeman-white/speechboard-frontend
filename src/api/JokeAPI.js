// const BASE_URL = "https://api.humorapi.com/jokes/search?api-key=9db1cc5ff9ab4212ad44d265af691b71&keywords=kids&number=1"

const BASE_URL = "https://v2.jokeapi.dev/joke/Pun?safe-mode";
const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init);
    console.log("url ", url);
    console.log("init ", init);
    console.log("response", response);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Bad response: ${response.status} ${response.statusText}`
      );
    }
  } catch (e) {
    return null;
  }
};

const fetchJoke = async () => {
  const url = BASE_URL;
  return await tryCatchFetch(url);
};

export default fetchJoke;
