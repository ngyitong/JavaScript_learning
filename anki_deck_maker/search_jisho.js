/*
https://mistval.github.io/unofficial-jisho-api/
*/

// const url = "https://randomuser.me/api/";
const url = "https://jisho.org/search/";


async function searchWord(url, word){
    newUrl = url + word
    try {
        const response = await fetch(newUrl);
        console.log(response);
        if (!response.ok){
            throw new Error(`Reponse status: ${response.status}`);
        }

        const result = await response.text();
        console.log("printing out the result")
        console.log(result);
    } catch (error){
        console.error(error.message);
    }
}

searchWord(url, "splinter");