function delUnnecessarySymbols(_string, _symbolsArray) { // удаляем из строки символы, которых нет в алфавите
    _symbolsArray.forEach(function(_symbol) {
        var _newString = "";
        for (i = 0; i < _string.length; i++) {
            if (_string.charAt(i) !== _symbol) {
                _newString += _string.charAt(i);
            }

        }
        _string = _newString;
    });
    return _string;
}


function replaceSymbols(_string) { // унифицируем
    _string= _string.replace(new RegExp("ъ",'g'),"ь");
    _string = _string.replace(new RegExp("ё",'g'),"е");
    _string = _string.replace(new RegExp("й",'g'),"и");


    console.log(_string);
    return _string;
}



function delRepeats(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function get_index_array(_letter, array) { // перенесла
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[i].length; j++) {
            if (array[i][j] === _letter) return [i, j];
        }
    }
    return false;
}


function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
}

// ШИФР ПЛЕЙФЕРА
let alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'э', 'ю', 'я'];

function splitString(_string) {  //разбиваем на биграммы и добавляем ф
    var i = 0, stringList = [], stringLen = _string.length;
    while (true) {
        if (i >= stringLen) break

        else if (i === stringLen-1) {
            var _bigram = _string.charAt(i) + "ф";
            stringList.push(_bigram);
            console.log(_string);
        }

        else {
            _bigram = _string.charAt(i) + _string.charAt(i+1);
            if (_bigram.charAt(0) === _bigram.charAt(1)) {
                _string = _string.substr(0, i+1) + "ф" + _string.substr(i+1);
                stringList.push(_string.charAt(i) + "ф");
                stringLen = _string.length;
            }
            else stringList.push(_bigram);
        }
        i += 2;
    }
    return stringList;
}

function playfairEnc(_bigramList, _enc, _alphabetSquare) { // шифруем/расшифровываем
    var _newString = "";
    _bigramList.forEach(function(bigram) {
        var ij1 = get_index_array(bigram.charAt(0), _alphabetSquare);
        var ij2 = get_index_array(bigram.charAt(1), _alphabetSquare);

        var i1 = ij1[0], j1 = ij1[1], i2 = ij2[0], j2 = ij2[1];


        if (i1 === i2) { //в одной строке
            if (_enc === true) {
                j1 = (j1 + 1) % 6;
                j2 = (j2 + 1) % 6;
            }
            else {
                j1 = (j1 - 1) % 6;
                j2 = (j2 - 1) % 6;
            }

            if (j1 < 0) j1 += 6;
            if (j2 < 0) j2 += 6;
        }

        if (j1 === j2) { //в одном столбце
            if (_enc === true) {
                i1 = (i1 + 1) % 5;
                i2 = (i2 + 1) % 5;
            }
            else {
                i1 = (i1 - 1) % 5;
                i2 = (i2 - 1) % 5;
            }

            if (i1 < 0) i1 += 5;
            if (i2 < 0) i2 += 5;
        }

        else { // квадрат
            var _j1 = j1;
            j1 = j2;
            j2 = _j1;
        }
        _newString += _alphabetSquare[i1][j1] + _alphabetSquare[i2][j2];
    });
    return _newString;
}




function playfairSquare(_key) {
    var _keyArray = _key.split("");
    _keyArray = _keyArray.concat(alphabet);
    _keyArray = delRepeats(_keyArray);

    _keyArray2D = fillMatrix(6, 5, _keyArray);
    console.log(_keyArray2D); // формируем алфавит в двумерном массиве

    var table = $('table'); // выводим алфавит в таблицу
    table.empty();
    for(let i = 0; i < 5; i++){
        var tr = $('<tr>');
        for(let j = 0; j < 6; j++) {
            tr.append($('<td>' + _keyArray2D[i][j] + '</td>'));
        }
        table.append(tr);
    }

    return _keyArray2D;
}

$("#encrypt").click(function () {
    var key = $("#key").val();
    var _keyArray2D = playfairSquare(key); // создаём квадрат для шифра Плейфера и выводим в таблицу
    var text = $("#text").val().toLowerCase();
    text = delUnnecessarySymbols(text, [" ", ".", ",", "?", "!", "-", "(", ")"]); //удаляем ненужные символы
    text = text.replace(/\r|\n/g, '');
    text = replaceSymbols(text);
    var bigramArray = splitString(text);

    console.log(bigramArray);

    var newString = playfairEnc(bigramArray, true, _keyArray2D);
    $("#result").empty();
    $("#result").append(newString);
});

$("#decrypt").click(function () {
    var key = $("#key").val();
    var _keyArray2D = playfairSquare(key); // создаём квадрат для шифра Плейфера и выводим в таблицу
    var text = $("#text").val();
    var bigramArray = splitString(text);

    console.log(bigramArray);

    var newString = playfairEnc(bigramArray, false, _keyArray2D);
    $("#result").empty();
    $("#result").append(newString);
});

$("#copy").click(function () {
    copytext("#result");
});

