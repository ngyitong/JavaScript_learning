// const prompt = require("prompt-sync")({sigint:true});

let wordList = ["新車", "電車", "例車", "自転車", "自動車"];

// sorts chinese characters by UTF-8 or unicode. 
wordList.sort();

// let newWord = "新車です";
let newWord = "新社会";

// const newWord = prompt("Enter the new word: ");

/*
check duplicates using kanji first then hiragana/katakana
*/

function binarySearch(newWord, wordList){
    // returns true if word already exists in the list.
    var min = 0;
    var max = wordList.length - 1;

    // iterate while min does not meet max
    while (min <= max){
        // binary shift right by 1 to half the sum
        var mid = (min + max) >>> 1;
        
        //perform binary search
        if (wordList[mid] === newWord){
            return true;
        }
        else if (wordList[mid] < newWord){
            min = mid + 1;
        }
        else{
            max = mid - 1;
        }
    }
    return false;
}

function sortedIndex(value, inputArray){
    /*
    find the position to insert the new value into the array
    returns the index of where the value should be added
    */
    var min = 0
    var max = inputArray.length;

    while (min < max){
        console.log(min, max)
        // binary shift right by 1 to half the sum
        var mid = (min + max) >>> 1;
        // do a binary search to find the position to sort the value in
        if (inputArray[mid] < value){
            min = mid + 1
        }
        else max = mid;
    }
    return min
}

function addToList(newWord, wordList){
    var newWordIndex = sortedIndex(newWord, wordList);
    console.log(newWordIndex)
    
    // add new word into the wordList
    wordList.splice(newWordIndex, 0, newWord);

    return wordList;
}


let newWordList = []

if (!binarySearch(newWord, wordList)){
    // enter if word is not found in the word list
    console.log("Adding word to array");

    newWordList = addToList(newWord, wordList);

}
else console.log("Word is inside array");

console.log(newWordList)



