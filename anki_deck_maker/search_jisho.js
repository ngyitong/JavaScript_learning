/*
Unoffical api for jisho
https://mistval.github.io/unofficial-jisho-api/

Using CommonJS instead of ES Module as jisho api does not work with ES Module
*/

// const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// import the JishoAPI
const JishoAPI = require("unofficial-jisho-api");
const jisho = new JishoAPI();

// jisho.searchForKanji('回').then(result => {
//   console.log('Meaning: ' + result.meaning);
//   console.log('Kunyomi: ' + JSON.stringify(result.kunyomi));
// //   console.log('Kunyomi example: ' + JSON.stringify(result.kunyomiExamples[0]));
//   console.log('Onyomi: ' + JSON.stringify(result.onyomi));
// //   console.log('Onyomi example: ' + JSON.stringify(result.onyomiExamples[0]));
//   console.log('Radical: ' + JSON.stringify(result.radical));
//   console.log('Jisho Uri: ' + result.uri);
// });

async function searchKanji(words){
    try {
        const result = await jisho.searchForKanji(words);
        let resultLength = result.data.length;
        if (resultLength == 0){
            console.log("言葉を調べなかった。Exiting");
            rl.close();
            return null; //stop execution
        }
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

async function searchPhrase(phrase){
    try {
        const result = await jisho.searchForPhrase(phrase);
        let resultLength = result.data.length;
        /* word was not found, exiting */
        if (resultLength == 0){
            console.log("言葉を調べなかった。Exiting");
            rl.close();
            return null; //stop execution
        }

        /* word was found, return the result*/
        return result;
        
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

async function createPhraseCard(result){
    let resultLength = result.data.length;
    /* word was found, continuing */
    let resultWordList = {};
    for (let i = 0; i < resultLength; i++){
        resultWordList[i + 1] = result.data[i].slug;
    }
    console.log(resultWordList);
    
    let choice = "";

    
    /* wrap the prompt in a Promise,
    so that the output is not returned 
    before the array is filled (race condition) */
    return new Promise((resolve) => {
        rl.question("言葉を選んでください: ", (selection) => {
            choice = parseInt(selection);
            choice--; /* decrement */
            
            if (isNaN(choice) || choice < 0 || choice >= resultLength){
                console.error("Select from the available numbers");
                rl.close();
                return;
            }
            
            console.log(`You selected ${selection}: ${resultWordList[selection]}`);
            const selectedEntry = result.data[choice]; 
            let output = [];
            /* push kanji and hiragana of the phrase to the output array*/
            output.push(selectedEntry.japanese[0]["word"])
            output.push(selectedEntry.japanese[0]["reading"])
            const allDefinitions = selectedEntry.senses.map(sense => sense.english_definitions.join(", ")).join("; ");
            output.push(allDefinitions);
            // they are often repeated
            const allPartOfSpeech = [...new Set(selectedEntry.senses.flatMap(sense => sense.parts_of_speech[0]))].join(", ");
            output.push(allPartOfSpeech);
            
            rl.close();

            /* resolve the promise with the filled array */
            resolve(output);
        });

    });

    return output;
}

// Wrap the execution in a main function
async function main(){

    /** finding words (kanji only) */
    let wordResult = await 
    
    /** finding phrases (kanji + hiragana) */
    let phraseResult = await searchPhrase('回る');
    let output = await createPhraseCard(phraseResult);

    console.log(output);

}


main();