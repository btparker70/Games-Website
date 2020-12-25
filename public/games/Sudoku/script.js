var rowSingle = [
    [null, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, null, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, null, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, null, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, null, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, null, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, null, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, null, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, null],
];

var colSingle = [
    [null, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, null, 2, 2, 2, 2, 2, 2, 2],
    [3, 3, null, 3, 3, 3, 3, 3, 3],
    [4, 4, 4, null, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, null, 5, 5, 5, 5],
    [6, 6, 6, 6, 6, null, 6, 6, 6],
    [7, 7, 7, 7, 7, 7, null, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, null, 8],
    [9, 9, 9, 9, 9, 9, 9, 9, null],
]
var easyGame4Solved = [
    [3, 7, 4, 1, 6, 8, 2, 5, 9],
    [5, 1, 9, 4, 2, 7, 6, 8, 3],
    [2, 8, 6, 3, 9, 5, 7, 1, 4],
    [6, 9, 8, 5, 4, 1, 3, 7, 2],
    [1, 2, 3, 7, 8, 6, 9, 4, 5],
    [4, 5, 7, 9, 3, 2, 1, 6, 8],
    [9, 6, 2, 8, 7, 4, 5, 3, 1],
    [8, 3, 5, 6, 1, 9, 4, 2, 7],
    [7, 4, 1, 2, 5, 3, 8, 9, null],
];
// window.clearInterval(winAnimationSwitch);

gamePopulator(easyGame4Solved);
// Populates game board
function gamePopulator(gameArray) {
    $(".block").removeClass('anchored block-anchored').css('background-color', 'white');
    clearInterval(winAnimationSwitch);
    for (i = 0; i < gameArray.length; i++) {
        for (j = 0; j < gameArray[i].length; j++) {
            var letter = String.fromCharCode(65 + j);
            if (gameArray[i][j] !== null) {
                $(`#block_${letter}${i + 1}`).text(gameArray[i][j]).addClass('anchored block-anchored');
            } else {
                $(`#block_${letter}${i + 1}`).text(gameArray[i][j]);
            }
        }
    }
}

// New-game button
$('#new-game').on('click', function () {
    $('.block').empty();
    var randomNum = Math.floor(Math.random() * easyGames.length);
    gamePopulator(easyGames[randomNum]);
    clearInterval(winAnimationSwitch);
})

// Solver button
$('#solver').on('click', function () {

    replaceCols();
        replaceRows();

})

// Undo button
$('#undo').on('click', function () {

})

// Select empty block: Change block color when clicked
$('.block').on('click', function () {
    $('.block').css('background-color', 'white').removeClass('selected');
    $(this).css('background-color', 'rgb(64, 187, 64)').addClass('selected');

})

// Select empty block: Change row/col color when clicked
$('.block').on('click', function () {
    // If the block is empty
    if ($(this).text() === '') {
        // Letter
        var row = $(this).attr('id').charAt(6);
        // Number
        var col = $(this).attr('id').charAt(7);
        $('.block').css('background-color', 'white');

        // Colors the row and column selected
        for (i = 1; i < 10; i++) {
            $(`#block_${row}${i}`).css('background-color', 'rgb(131, 207, 131)');
        }
        for (j = 0; j < 9; j++) {
            var letter = String.fromCharCode(65 + j);
            $(`#block_${letter}${col}`).css('background-color', 'rgb(131, 207, 131)');
        }

        // Colors the selected square
        $(this).css('background-color', 'rgb(64, 187, 64)');
    } else
    // Color all same blocks with number
    {
        $('.block').css('background-color', 'white');
        var num = $(this).text();
        $(`.block:contains('${num}')`).css('background-color', 'rgb(64, 187, 64)');
    }
})

// Enter number on board from button
$('.clicker-block').on('click', function () {
    if ($(".block[class*='selected']").hasClass('anchored') === false) {
        const getNum = $(this).text();
        $(".block[class*='selected']").text(getNum);
    }
    boardFullChecker();
})

// var winAnimationSwitch;
// var winAnimationSwitch = clearInterval(winAnimation);

// Win animation
// function winAnimation() {

//     $('.block').css('background-color', 'white');
//     var i = 1;
//     var j = 0;
//     setInterval(function(){ 
//         var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'rgb(250, 92, 0)', 'rgb(0, 245, 245)', 'rgb(204, 23, 114)']
//             $(`.block:contains('${(i%9) + 1}')`).css('background-color', `${colors[j%8]}`);
//         i++;
//         j++;
//     }, 100);
// }


// var winInc1 = 1;
// var winInc2 = 0;
// var winAnimationSwitch;
// var winAnimation = function() {
//     var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'rgb(250, 92, 0)', 'rgb(0, 245, 245)', 'rgb(204, 23, 114)']
//     $(`.block:contains('${(winInc1%9) + 1}')`).css('background-color', `${colors[winInc2%8]}`);
//     winInc1++;
//     winInc2++;
// }

var winInc1 = 1;
var winInc2 = 0;
var winAnimationSwitch;
function winAnimation() {
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'rgb(250, 92, 0)', 'rgb(0, 245, 245)', 'rgb(204, 23, 114)']
    $(`.block:contains('${(winInc1%9) + 1}')`).css('background-color', `${colors[winInc2%8]}`);
    winInc1++;
    winInc2++;
}
// var winAnimationSwitch = setInterval(winAnimation, 100)


function boardFullChecker() {
    var counter = 0;

    $('.block').each(function() {
        if ($(this).text().length) {
            counter++;
        }
        if(counter == 81) {
            var winAnimationSwitch = setInterval(winAnimation, 100)

        }
    })
    var counter = 0;

}
