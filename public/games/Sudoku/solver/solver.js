// Replaces single missing number from array
function replaceSingleMissingNumber(array) {
    // Checks which index has null
    var missingIndex = jQuery.inArray(null, array);

    // Find missing number
    var missingNum = findMissingNumber(array);

    // Add missing number to array
    array.splice(missingIndex, 1, missingNum);
}

// Counts # of null in array 
// returns true if only 1 null [m]
function oneNullCounter(array) {
    var counter = 0;
    for (m = 0; m < array.length; m++) {
        if (array[m] === null) {
            counter++;
        }
    }
    // If there's only one null
    if (counter === 1) {
        return true
    }
    return false;
}

// Find missing number
// Returns missing number [k]
function findMissingNumber(array) {
    // Copies array for manipulation
    var copyArray = [...array];
    // Sorts array
    copyArray.sort();
    // Returns which number is missing
    if (copyArray[0] !== 1) {
        return 1;
    } else {
        for (k = 0; k < copyArray.length; k++) {
            if (copyArray[k] + 1 !== copyArray[k + 1]) {
                return copyArray[k] + 1;
            }
        }
    }
}

// Finishes all rows missing 1 [n]
function replaceRows() {
    for (n = 1; n < 10; n++) {

        var rowNumber = n;
        var array = rowArrayMaker(rowNumber);
        var nullChceck = oneNullCounter(array);
        if (nullChceck === true) {
            findMissingNumber(array);
            replaceSingleMissingNumber(array);
            rowRender(rowNumber, array);
        }
    }
}

// Makes an array with a game row
// Returns an array [i]
function rowArrayMaker(rowNumber) {
    var array = [];
    for (i = 1; i < 10; i++) {
        var letter = String.fromCharCode(65 + i - 1);
        var num = $(`#row-${rowNumber}`).children(`#block_${letter}${rowNumber}`).text();

        if (num == '') {
            array.push(null);
        } else {
            array.push(parseInt(num));
        }
    }
    return array;
}

// Adds numbers to the board [j]
function rowRender(rowNumber, array) {
    for (j = 1; j < 10; j++) {
        var letter = String.fromCharCode(65 + j - 1);
        var ele = $(`#block_${letter}${rowNumber}`);
        ele.text(array[j - 1]);
    }
}

// Finishes all colums missing 1 [n2]
function replaceCols() {
    for (n2 = 0; n2 < 9; n2++) {
        // start with A col
        var colLetter = String.fromCharCode(65 + n2);

        var array = colArrayMaker(colLetter);
        console.log(array)
        var nullChceck = oneNullCounter(array);
        if (nullChceck === true) {
            findMissingNumber(array);
            replaceSingleMissingNumber(array);
            colRender(colLetter, array);
        }
    }
}

// Makes an array with a game column
// Returns an array [i2]
function colArrayMaker(colLetter) {
    var array = [];
    for (i2 = 1; i2 < 10; i2++) {
        var num = $(`#block_${colLetter}${i2}`).text();

        if (num == '') {
            array.push(null);
        } else {
            array.push(parseInt(num));
        }
    }
    return array;
}
// Adds numbers to the board [j2]
function colRender(colLetter, array) {
    // console.log(array)
    for (j2 = 1; j2 < 10; j2++) {
        var letter = String.fromCharCode(65 + j2 - 1);
        var ele = $(`#block_${colLetter}${j2}`);
        ele.text(array[j2 - 1]);
    }
}


function replaceSquares() {

}

function squareArrayMaker() {
    var array = [];
    // Go through 9 blocks of the square
    for (i3 = 1; i3 < 10; i3++) {
        // For each letter
        var num = $(`#block_${colLetter}${i2}`).text();
        var letter = String.fromCharCode(65 + i - 1);

    }
}

function squareRender() {

}