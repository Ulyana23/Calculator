//############### АТБАШ ###############
function atbash() {
    let text = getValues(["text"]);
    result(atbashEncDec(text, alphabetStandard));
}

function atbashEncDec(_string, _alphabetArray) {

    let _oldAlphabet = _alphabetArray.slice(); // создаём независимую копию массива
    let _stringArray = _string.split(""), _newString = "", _index;

    _alphabetArray.reverse();

    console.log(_oldAlphabet);
    console.log(_alphabetArray);

    _stringArray.forEach(function (_symbol) {
        _index = _oldAlphabet.indexOf(_symbol);
        _newString += _alphabetArray[_index];
    });

    console.log(_newString);
    return _newString;
}

//############### ЦЕЗАРЬ ###############
function caesar(_alphabetArray) {
    let _string = getValues(["text"]);
    let key = parseInt(getValues(["key"]));
    let stringArray = _string.split(""), alphabetLength = _alphabetArray.length, newString = "", index;

    stringArray.forEach(function (_symbol) {
        index = _alphabetArray.indexOf(_symbol);
        if (typeOperation === "encrypt") newString += _alphabetArray[(index + key) % alphabetLength];
        if (typeOperation === "decrypt") {
            index = (index - key);
            while (index < 0) {
                index += alphabetLength;
            }
            newString += _alphabetArray[index % alphabetLength];
        }
    });

    result(newString);
}


//############### КВАДРАТ ПОЛИБИЯ ###############
function polybiusSquare(_polybiusSquare) {
    let maxValue = Math.max(_polybiusSquare.length, _polybiusSquare[0].length);
    let discharge = 1, _x, _y;

    let _string = getValues(["text"]);
    let _newString = "", _item;

    if (maxValue > 9) {
        discharge = 2;
    }

    if (typeOperation === "encrypt") {
        let _stringArray = _string.split("");


        _stringArray.forEach(function (_symbol) {
            _item = get_index_array(_symbol, _polybiusSquare);

            _x = String(_item[0] + 1);
            _y = String(_item[1] + 1);

            if (discharge === 2) {
                if (_x.length === 1) _x = "0" + _x;
                if (_y.length === 1) _y = "0" + _y;
            }

            _newString += _x + _y + " ";
        });

        _newString = _newString.slice(0, -1);
    }

    if (typeOperation === "decrypt") {
        let _stringArray = _string.split(" "), _xNum, _yNum;

        _stringArray.forEach(function (_symbol) {
            let len = Math.round(_symbol.length / 2);
            _x = _symbol.substr(0, len);
            _y = _symbol.substr(len, _symbol.length);
            _xNum = Number(_x) - 1;
            _yNum = Number(_y) - 1;

            _newString += _polybiusSquare[_xNum][_yNum];
        });

    }

    result(_newString);
}


//############### ШИФР ТРИТЕМИЯ ###############
function trythemia(_alphabetArray) {
    let _string = getValues(["text"]);
    let _stringArray = _string.split(""), newString = "", alphabetLength = _alphabetArray.length, index;

    _stringArray.forEach(function (_symbol, i) {
        index = _alphabetArray.indexOf(_symbol);

        if (typeOperation === "encrypt") newString += _alphabetArray[(index + i) % alphabetLength];

        else if (typeOperation === "decrypt") {
            newString += _alphabetArray[mod((index - i), alphabetLength)];
        }
    });

    result(newString);
}


//############### ШИФР БЕЛАЗО ###############
function belazo(_alphabetArray) {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);
    let stringArray = _string.split(""), keyArray = key.split(""), newString = "",
        alphabetLength = _alphabetArray.length, n = keyArray.length, i = 0, index;

    while (keyArray.length < stringArray.length) {
        keyArray.push(keyArray[i]);
        i += 1;
        if (i === n) {
            i = 0;
        }
    }

    stringArray.forEach(function (_symbol, i) {
        index = _alphabetArray.indexOf(_symbol);

        if (typeOperation === "encrypt") {
            newString += _alphabetArray[(index + _alphabetArray.indexOf(keyArray[i])) % alphabetLength];
        }

        else if (typeOperation === "decrypt") {

            if ((index - _alphabetArray.indexOf(keyArray[i])) < 0) {
                newString += _alphabetArray[(index - _alphabetArray.indexOf(keyArray[i])) + alphabetLength];
            } else newString += _alphabetArray[(index - _alphabetArray.indexOf(keyArray[i])) % alphabetLength];
        }
    });

    result(newString);

}


//############### ШИФР ВИЖЕНЕРА ###############
function vigenere(_alphabetArray) {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);
    if (typeOperation === "encrypt") vigenereEnc(_alphabetArray, _string, key);
    if (typeOperation === "decrypt") vigenereDec(_alphabetArray, _string, key);
}

function vigenereEnc(_alphabetArray, _string, key) {
    let stringArray = _string.split(""), newString = "", index, alphabetLength = _alphabetArray.length,
        keyArray = stringArray.slice(0);

    keyArray.unshift(key); // в начало массива добавляем ключ
    keyArray.pop(); // удаляем последний элемент массива

    stringArray.forEach(function (_symbol, i) {
        index = _alphabetArray.indexOf(_symbol);
        newString += _alphabetArray[(index + _alphabetArray.indexOf(keyArray[i])) % alphabetLength];
    });

    result(newString);
}

function vigenereDec(_alphabetArray, _string, key) {
    let _stringArray = _string.split(""), newString = "", newLetter = "", index,
        alphabetLength = _alphabetArray.length;

    _stringArray.forEach(function (_symbol) {
        index = _alphabetArray.indexOf(_symbol);

        if ((index - _alphabetArray.indexOf(key)) < 0) newLetter = _alphabetArray[(index - _alphabetArray.indexOf(key)) + alphabetLength];

        else newLetter = _alphabetArray[(index - _alphabetArray.indexOf(key)) % alphabetLength];

        newString += newLetter;
        key = newLetter;
    });

    result(newString);
}


//############### МАГМА S-БЛОК ЗАМЕНЫ ###############
function magmaSBlocks() {
    let _string = getValues(["text"]);
    if (typeOperation === "encrypt") _string = stringToNumber2(_string);
    let string2Array = wrapString(_string, 32); // разбиваем полученную строку по 32 символа
    let newString = "", newArray = [];
    console.log(string2Array);
    console.log(_string);

    if (typeOperation === "decrypt") {
        for (let i = 0; i < string2Array.length; i++) {
            string2Array[i] = string2Array[i].substr(-11) + string2Array[i].substr(0, string2Array[i].length - 11);
        }
    }

    string2Array.forEach(function (_symbol, i) {
        string2Array[i] = wrapString(_symbol, 4);
    });

    string2Array.forEach(function (_block) {
        _block.forEach(function (_elem, i) {
            if (typeOperation === "encrypt") newString += blocksMagmaS[i][_elem];
            else if (typeOperation === "decrypt") {
                newString += get_key(blocksMagmaS[i], _elem);
            }
        });

        newArray.push(newString);
        newString = "";
    });

    if (typeOperation === "encrypt") {
        newArray.forEach(function (_str) {
            newString += _str.substr(11) + _str.substr(0, 11);
        });
    } else if (typeOperation === "decrypt") {
        newArray.forEach(function (_str) {
            newString += _str;
        });

        newString = num2ToString(newString);
    }

    result(newString);
}


//############### ШИФР ПЛЕЙФЕРА ###############
function playfair(_alphabetArray) {
    let _string = getValues(["text"]);
    let _key = getValues(["key"]);
    let _stringArray = _string.split(""), _newString = "";

    playfairSquare(_key, _alphabetArray);

    let bigramArray = splitString(_string);

    console.log(bigramArray);

    _newString = playfairEnc(bigramArray, alphabetSquare);

    result(_newString);
}

function delRepeats(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function playfairSquare(_key, _alphabetArray) {
    var _keyArray = _key.split("");
    _keyArray = _keyArray.concat(_alphabetArray);
    _keyArray = delRepeats(_keyArray);

    alphabetSquare = fillMatrix(9, 15, _keyArray);
    console.log(alphabetSquare); // формируем алфавит в двумерном массиве
}

function splitString(_string) {  //разбиваем на биграммы и добавляем ф
    var i = 0, stringList = [], stringLen = _string.length;
    while (true) {
        if (i >= stringLen) break;

        else if (i === stringLen - 1) {
            var _bigram = _string.charAt(i) + "ф";
            stringList.push(_bigram);
            console.log(_string);
        } else {
            _bigram = _string.charAt(i) + _string.charAt(i + 1);
            if (_bigram.charAt(0) === _bigram.charAt(1)) {
                _string = _string.substr(0, i + 1) + "ф" + _string.substr(i + 1);
                stringList.push(_string.charAt(i) + "ф");
                stringLen = _string.length;
            } else stringList.push(_bigram);
        }
        i += 2;
    }
    return stringList;
}

function playfairEnc(_bigramArray, _alphabetSquare) { // шифруем/расшифровываем
    let _newString = "";
    let colls = _alphabetSquare.length, rows = _alphabetSquare[0].length;
    _bigramArray.forEach(function (bigram) {
        var ij1 = get_index_array(bigram.charAt(0), _alphabetSquare);
        var ij2 = get_index_array(bigram.charAt(1), _alphabetSquare);

        var i1 = ij1[0], j1 = ij1[1], i2 = ij2[0], j2 = ij2[1];


        if (i1 === i2) { //в одной строке
            if (typeOperation === "encrypt") {
                j1 = (j1 + 1) % rows;
                j2 = (j2 + 1) % rows;

            } else if (typeOperation === "decrypt") {
                j1 = mod((j1 - 1), rows);
                j2 = mod((j2 - 1), rows);
            }
        } else if (j1 === j2) { //в одном столбце
            if (typeOperation === "encrypt") {
                i1 = (i1 + 1) % colls;
                i2 = (i2 + 1) % colls;
            } else if (typeOperation === "decrypt") {
                i1 = mod((i1 - 1), colls);
                i2 = mod((i2 - 1), colls);
            }
        } else { // квадрат
            let _j1 = j1;
            j1 = j2;
            j2 = _j1;
        }
        _newString += _alphabetSquare[i1][j1];
        _newString += _alphabetSquare[i2][j2];
    });
    return _newString;
}


//############### МАТРИЧНЫЙ ШИФР ###############
function determinant(A) { // Функция для вычисления определителя матрицы
    var n = A.length, subA = [], detA = 0;

    if (n === 1) return A[0][0];
    if (n === 2) return (A[0][0] * A[1][1] - A[0][1] * A[1][0]);
    if (n === 3) {
        return ((A[0][0] * A[1][1] * A[2][2] + A[0][1] * A[1][2] * A[2][0] + A[0][2] * A[1][0] * A[2][1])
            - (A[0][0] * A[1][2] * A[2][1] + A[0][1] * A[1][0] * A[2][2] + A[0][2] * A[1][1] * A[2][0]));
    }

    for (var i = 0; i < n; i++) {
        for (var h = 0; h < n - 1; h++) subA[h] = [];
        for (var a = 1; a < n; a++) {
            for (var b = 0; b < n; b++) {
                if (b < i) subA[a - 1][b] = A[a][b];
                else if (b > i) subA[a - 1][b - 1] = A[a][b];
            }
        }
        var sign = (i % 2 === 0) ? 1 : -1;
        detA += sign * A[0][i] * determinant(subA);
    }

    return detA;
}

function dotMatrix(A, B) {
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA !== rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            C[i][k] = t;
        }
    }
    return C;
}

function inverseMatrix(A) { // A - двумерный квадратный массив
    var det = determinant(A);                // Функцию Determinant см. выше
    if (det === 0) return false;
    var N = A.length, A = adjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) A[i][j] /= det;
    }
    return A;
}

function adjugateMatrix(A) { // A - двумерный квадратный массив
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++) {
        adjA[i] = [];
        for (var j = 0; j < N; j++) {
            var B = [], sign = ((i + j) % 2 === 0) ? 1 : -1;
            for (var m = 0; m < j; m++) {
                B[m] = [];
                for (var n = 0; n < i; n++) B[m][n] = A[m][n];
                for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
            }
            for (var m = j + 1; m < N; m++) {
                B[m - 1] = [];
                for (var n = 0; n < i; n++) B[m - 1][n] = A[m][n];
                for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
            }
            adjA[i][j] = sign * determinant(B);   // Функцию Determinant см. выше
        }
    }
    return adjA;
}

function matrix() {
    let _string = getValues(["text"]);
    let newString = "";

    if (typeOperation === "encrypt") {
        stringArray2ToNum(matrixNum);
        let a = determinant(matrixNum); // находим определитель
        console.log("определитель: " + a);

        if (a === 0) {
            alert("Определитель вашей матрицы-ключа равен 0. Попробуйте ещё раз.");
            return false;
        }

        _string = completeNumMod(_string, matrixKeyLen);

        let newArray = matrixEnc(matrixNum, _string, matrixNum.length);

        newArray.forEach(function (_symbol, i) {
            if (i === (newArray.length - 1)) newString += newArray[i];
            else newString += newArray[i] + ", ";
        });
    }

    else if (typeOperation === "decrypt") {
        let a_1 = inverseMatrix(matrixNum); // вычисляем обратную матрицу
        let _stringArray = _string.split(", ");

        let newArray = multiplicationMatrix(_stringArray, a_1, matrixNum.length);
        console.log(newArray);

        newArray.forEach(function (_symbol) {
            newString += String.fromCharCode(Math.round(_symbol));
        });
    }

    result(newString);

}

function matrixEnc(key_matrix, _string, n) {
    let stringArray = _string.split("");
    let newString = [];

    stringArray.forEach(function (_symbol) {
        newString.push(_symbol.charCodeAt(0));
    });

    let newArray = multiplicationMatrix(newString, key_matrix, n);

    return newArray;
}

function multiplicationMatrix(_newString, _key_matrix, n) {
    let i = 0, newArray = [];
    while (i < _newString.length) {
        let temporaryArray = [];
        for (let j = 0; j < n; j++) temporaryArray.push(_newString[i + j]);

        let newTemporaryArray = [];
        newTemporaryArray.push(temporaryArray);

        newArray = newArray.concat(rotateRight90(rotateRight90(rotateRight90(dotMatrix(_key_matrix, rotateRight90(newTemporaryArray))))));
        i += n;
    }

    newArray = newArray.reduce((acc, val) => acc.concat(val), []); // В одномерный массив
    return newArray;
}


//############### БЛОКНОТ ШЕННОНА ###############
function shannon(_alphabetArray) {
    let _string = getValues(["text"]);

    let Ti = Number(getValues(["Ti"])), a = Number(getValues(["a"]));
    let c = Number(getValues(["c"])), m = Number(getValues(["m"]));

    let keyArray = generation(Ti, _string, a, c, m);
    let newString = shannonEncDec(_string, keyArray, _alphabetArray);

    result(newString);
}

function generation(_Ti, _string, _a, _c, _m) {
    let _keyArray = [];
    _keyArray.push(_Ti);
    for (let i = 0; i < _string.length-1; i++) {// генерация
        _Ti = (_a * _Ti + _c) % _m
        _keyArray.push(_Ti);
    }

    return _keyArray;
}

function shannonEncDec(_string, _keyArray, _alphabetArray) {
    let _newString = "", m = _alphabetArray.length, n;
    for (let i = 0; i < _string.length; i++) {
        let indexLetter = _alphabetArray.indexOf(_string[i]);
        if (typeOperation === "encrypt")  {
            n = (_keyArray[i] + indexLetter) % m;
        }
        if (typeOperation === "decrypt")  {
            n = mod((indexLetter - _keyArray[i]), m);
        }

        _newString += _alphabetArray[n];
    }

    return _newString;
}


//############### РЕШЁТКА КАРДАНО ###############
function cardano() {
    let _string = getValues(["text"]);
    let stringBlocks = wrapString(_string, 60);
    let stringArrayBlocks = TwoDimensional(_string.split(""), 60);

    let key = getValues(["key"]);
    let latticeKey = key.split(", ");
    latticeKey.forEach(function (elem, i) {
        latticeKey[i] = Number(elem);
    });
    console.log(latticeKey);

    let newString = "";

    let array = allSides(latticeKey);  // все стороны
    let KeyMatrix_1 = array[0], KeyMatrix_2 = array[1], KeyMatrix_3 = array[2], KeyMatrix_4 = array[3];

    if (typeOperation === "encrypt") {
        stringBlocks.forEach(function (string) {

            let textMatrix = Array.from({
                length: 6
            }, () => new Array(10).fill(0));

            let n = fillMatrixCardano(textMatrix, KeyMatrix_1, string, 0);
            if (!n) return false;
            n = fillMatrixCardano(textMatrix, KeyMatrix_2, string, n);
            if (!n) return false;
            n = fillMatrixCardano(textMatrix, KeyMatrix_3, string, n);
            if (!n) return false;
            n = fillMatrixCardano(textMatrix, KeyMatrix_4, string, n);
            if (!n) return false;

            for (let i = 0; i < textMatrix.length; i++) {
                for (let j = 0; j < textMatrix[i].length; j++) {
                    newString += textMatrix[i][j];
                }
            }
        });
    }

    if (typeOperation === "decrypt") {
        stringArrayBlocks.forEach(function (stringArray) {
            let textMatrix = fillMatrix(10, 6, stringArray);

            newString = decryption(textMatrix, KeyMatrix_1, newString);
            newString = decryption(textMatrix, KeyMatrix_2, newString);
            newString = decryption(textMatrix, KeyMatrix_3, newString);
            newString = decryption(textMatrix, KeyMatrix_4, newString);
        });
    }

    result(newString);
}

function allSides(latticeKey) {
    let keyMatrix_1 = Array.from({
        length: 6
    }, () => new Array(10).fill(0));

    let n = 0;
    for (let i = 0; i < keyMatrix_1.length; i++) {
        for (let j = 0; j < keyMatrix_1[i].length; j++) {
            if (latticeKey.indexOf(n) !== -1) keyMatrix_1[i][j] = "X";
            n += 1;
        }
    }

    let keyMatrix_4 = roundMatrix(keyMatrix_1);
    let keyMatrix_2 = rotateRight90(rotateRight90(keyMatrix_1));
    let keyMatrix_3 = rotateRight90(rotateRight90(keyMatrix_4));

    return [keyMatrix_1, keyMatrix_2, keyMatrix_3, keyMatrix_4];
}

function fillMatrixCardano(textMatrix, keyMatrix_n, string, n) {
    for (let i = 0; i < textMatrix.length; i++) {
        for (let j = 0; j < textMatrix[i].length; j++) {
            if (n < string.length) {
                if (keyMatrix_n[i][j] === "X") {
                    if (textMatrix[i][j] === 0) {
                        textMatrix[i][j] = string[n];
                        n += 1;
                    }
                    else {
                        alert("Вы ввели неверный ключ, попробуйте ещё раз.");
                        return false;
                    }
                }
            }

            else {
                if (keyMatrix_n[i][j] === "X") {
                    if (textMatrix[i][j] === 0) {
                        textMatrix[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
                    }

                    else {
                        alert("Вы ввели неверный ключ, попробуйте ещё раз.");
                        return false;
                    }
                }
            }
        }
    }

    return n;
}

function decryption(textMatrix, keyMatrix_n, newString) {
    for (let i = 0; i < textMatrix.length; i++) {
        for (let j = 0; j < textMatrix[i].length; j++) {
            if (keyMatrix_n[i][j] === "X") newString += textMatrix[i][j];
        }
    }

    return newString;
}

//############### ВЕРТИКАЛЬНАЯ ПЕРЕСТАНОВКА ###############
function vertical() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);
    let keyArray = key.split("");

    let matrixRows = Math.ceil(_string.length / keyArray.length);
    let matrixColumns = keyArray.length;

    let stringMatrix = Array.from({
        length: matrixRows
    }, () => new Array(matrixColumns).fill(0));

    let stringMatrixNew = Array.from({
        length: matrixRows
    }, () => new Array(matrixColumns).fill(0));

    for (let i = 0; i < keyArray.length; i++) {
        keyArray[i] = key.charCodeAt(i);
    }

    let indexKey = findIndex(keyArray);  // получаем позиции, по которым будем менять столбцы местами

    console.log("ключ: " + keyArray);

    if (typeOperation === "encrypt") {
        stringMatrix = fillMatrixVertical(stringMatrix, _string);

        stringMatrixNew = fillFinalMatrix(indexKey, matrixRows, stringMatrixNew, stringMatrix);  // заполняем новую матрицу

        let stringNew = "";

        for (let j = 0; j < stringMatrixNew[0].length; j++) {
            for (let i = 0; i < stringMatrixNew.length; i++) {
                stringNew += stringMatrixNew[i][j];
            }
        }

        result(stringNew);
    }

    if (typeOperation === "decrypt") {
        let n = 0;
        for (let j = 0; j < stringMatrix[0].length; j++) {
            for (let i = 0; i < stringMatrix.length; i++) {
                stringMatrix[i][j] = _string[n];
                n += 1;
            }
        }

        let j = 0;
        indexKey.forEach(function (k) {
            let n = 0;
            while (n < matrixRows) {
                stringMatrixNew[n][k] = stringMatrix[n][j];
                n++;
            }
            j++;
        });

        let stringNew = "";
        for (let i = 0; i < stringMatrixNew.length; i++) {
            for (let j = 0; j < stringMatrixNew[i].length; j++) {
                stringNew += stringMatrixNew[i][j];
            }
        }

        result(stringNew);
    }
}

function findIndex(key) {
    let myList = [];
    let keyCopy = key.slice();

    let keyList = Array(key.length);

    let n = 0;
    while (keyCopy.length > 0) {
        let currentIndex = [];
        let el = Math.min.apply(null, keyCopy);
        key.forEach(function (d, i) {
            if (d === el) {
                currentIndex.push(i);
            }
        });

        myList = myList.concat(currentIndex);

        currentIndex.forEach(function (c) {
            keyList[c] = n;
            n += 1;

            keyCopy.splice(keyCopy.indexOf(el), 1);
        });
    }

    console.log(myList);
    return myList;
}

function fillMatrixVertical(stringMatrix, string) {
    let n = 0;
    for (let i = 0; i < stringMatrix.length; i++) {
        for (let j = 0; j < stringMatrix[i].length; j++) {
            if (n < string.length) stringMatrix[i][j] = string[n];
            else stringMatrix[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
            n++;
        }
    }

    return stringMatrix;
}

function fillFinalMatrix(indexKey, matrixRows, stringMatrixNew, stringMatrix) {
    let j = 0;
    indexKey.forEach(function (k) {
        let n = 0;
        while (n < matrixRows) {
            stringMatrixNew[n][j] = stringMatrix[n][k];
            n += 1;
        }

        j += 1;
    });

    return stringMatrixNew;
}

//############### ГОСТ ГАММИРОВАНИЕ ###############
function gamming() {
    let _string = getValues(["text"]);
    let key = getValues(["gammingKey"]);
    let S = getValues(["S"]);
    let newString;

    key = key.substr(0, 16);
    S = S.substr(0, 4);

    console.log("KEY ", key);
    console.log("S ", S);

    if (typeOperation === "encrypt") _string = stringToNumber2(_string);
    key = stringToNumber2(key);
    S = stringToNumber2(S);

    console.log(_string);
    console.log(key);
    console.log(S);

    let stringToArray = wrapString(_string, 64);
    console.log("stringToArray " + stringToArray);

    let array = findN1_N2(S);
    let N1 = array[0];
    let N2 = array[1];

    let keyArray = breakKey(key);

    array = firstCycles(N1, N2, keyArray);
    N1 = array[0];
    N2 = array[1];

    console.log(N1);
    console.log(N2);
    console.log(keyArray);

    newString = enc(N1, N2, stringToArray, keyArray);

    if (typeOperation === "decrypt") newString = num2ToString(newString);

    result(newString);
}

function enc(N1, N2, stringArray, key) {
    let newString = "", N3 = "", N4 = "", CM4, CM3, CM5;

    for (let i = 0; i < stringArray.length; i++) {
        if (i === 0) {
            N3 = N1;
            N4 = N2;
        }

        CM4 = ((parseInt(N4, 2) + parseInt(N6, 2)) % (2 ** 32 - 1)).toString(2).padStart(32, "0");  // суммируем по модулю 2^32-1

        CM3 = ((parseInt(N3, 2) + parseInt(N5, 2)) % (2 ** 32)).toString(2).padStart(32, "0");  // суммируем по модулю 2^32

        N4 = CM4;
        N3 = CM3;
        N1 = N3;
        N2 = N4;

        let array = firstCycles(N1, N2, key);
        N1 = array[0];
        N2 = array[1];

        // накладываем гамму
        let gamma = reverseString(N1) + reverseString(N2);

        let n = stringArray[i].length;

        gamma = gamma.substr(0, n); // обрезаем гамму

        CM5 = xor(gamma, stringArray[i]).padStart(gamma.length, "0");  // наложили гамму

        newString += CM5;
    }

    return newString;

}

function findN1_N2(_S) {
    let n = Math.floor(_S.length / 2);
    let _N1 = reverseString(_S.substr(0, n));
    let _N2 = reverseString(_S.substr(n));

    return [_N1, _N2];
}

function breakKey(_key) {
    let _keyArray = wrapString(_key, 32);
    for (let i = 0; i < _keyArray.length; i++) {
        _keyArray[i] = reverseString(_keyArray[i]);
    }

    return _keyArray;
}

function firstCycles(N1, N2, key) {
    let CM1, CM2;

    for (let i = 0; i < 4; i++) {
        if (i !== 3) {
            key.forEach(function (k_block) {
                CM1 = ((parseInt(N1, 2) + parseInt(k_block, 2)) % (2 ** 32)).toString(2).padStart(32, "0");  // суммируем по модулю 2^32

                CM1 = wrapString(CM1, 4);

                CM1 = enc_magma(CM1);  // шифруем как в магме

                // console.log("СМ1 " + CM1);

                CM2 = xor(CM1, N2).padStart(32, "0"); // суммируем поразрядно по модулю 2 и добавляем нули в начало, если надо

                N2 = N1
                N1 = CM2
            });
        }

        else {
                let revKey = key.slice();
            revKey.reverse();

            for (let j = 0; j < revKey.length; j++) {
                CM1 = ((parseInt(N1, 2) + parseInt(revKey[j], 2)) % (2 ** 32)).toString(2).padStart(32, "0"); // суммируем по модулю 2^32 и добавляем нули в начало, если надо

                CM1 = wrapString(CM1, 4);
                CM1 = enc_magma(CM1);

                CM2 = xor(CM1, N2).padStart(32, "0");  // суммируем поразрядно по модулю 2

                if (j !== 7) {
                    N2 = N1;
                    N1 = CM2;
                }

                else N2 = CM2;
            }

        }
    }

    return [N1, N2];
}

function enc_magma(_string2) {
    let newString = "";

    _string2.forEach(function (b, i) {
        newString += blocksMagmaS[i][b];
    });

    newString = newString.substr(11) + newString.substr(0, 11);

    return newString;
}


//############### A5/1 ###############
function A5_1() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);

    key = key.substr(0, 4);

    if (typeOperation === "encrypt") _string = stringToNumber2(_string);
    key = stringToNumber2(key);

    let newString = encA5_1(key, _string);

    if (typeOperation === "decrypt") newString = num2ToString(newString);

    result(newString);
}

function encA5_1(key, string) {
    let stringArray = string.split("");
        let array = fillRegisters(key); // заполняем регистры
    let R1 = array[0], R2 = array[1], R3 = array[2];

    /* console.log("R1 = " + R1);
    console.log("R2 = " + R2);
    console.log("R3 = " + R3); */

    let newBits = "", gamma = "";

    stringArray.forEach(function (symbol) {
        let array = generateBit(R1, R2, R3);
        let resultBit = array[0]; R1 = array[1]; R2 = array[2]; R3 = array[3];

        console.log("resultBit = " + resultBit);
        console.log("symbol = " + symbol);

        newBits += String(resultBit ^ symbol);
        gamma += String(resultBit);
    });

    return newBits;
}

function generateBit(R1, R2, R3) {
    let array;

    let x = parseInt(reverseString(R1)[8]),
        y = parseInt(reverseString(R2)[10]),
        z = parseInt(reverseString(R3)[10]);

    let F = x & y | x & z | y & z;

    array = newBit(R1, R1_polynomials, F, x);
    R1 = array[0]; let R1_XorBit = array[1];

    array = newBit(R2, R2_polynomials, F, y);
    R2 = array[0]; let R2_XorBit = array[1];

    array = newBit(R3, R3_polynomials, F, z);
    R3 = array[0]; let R3_XorBit = array[1];

    let resultBit = 0;
    resultBit += R1_XorBit;
    resultBit += R2_XorBit;
    resultBit += R3_XorBit;

    resultBit = resultBit % 2;

    return [resultBit, R1, R2, R3];

}

function newBit(R, R_polynomials, F, xyz) {
    let resultBit;

        if (xyz === F) {
        let NewBit = 0;

        R_polynomials.forEach(function (bit) {
            NewBit += parseInt(reverseString(R)[bit - 1]);
        });
        NewBit = NewBit % 2;
        resultBit = parseInt(R[0]);
        R = R.slice(1);

        R += String(NewBit)

    }

    else {
        resultBit = parseInt(R[0]);
    }

    return [R, resultBit];
}

function fillRegisters(key) {
    let R1 = "", R2 = "", R3 = "";
    for (let i = 0; i < 64; i++) {

        if (i < R1_len) R1 += key[i];
        else if (((R2_len + R1_len) > i) && (i >= R1_len)) R2 += key[i];
        else R3 += key[i];
    }

    console.log(R1 + " " + R2 + " " + R3);

    return [R1, R2, R3];
}


//############### A5/2 ###############
function A5_2() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);

    key = key.substr(0, 6);

    if (typeOperation === "encrypt") _string = stringToNumber2(_string);
    key = stringToNumber2(key);

    let newString = encA5_2(key, _string);

    if (typeOperation === "decrypt") newString = num2ToString(newString);

    result(newString);
}

function encA5_2(key, string) {

    let stringArray = string.split("");
    let array = fillRegisters2(key); // заполняем регистры
    let R1 = array[0], R2 = array[1], R3 = array[2], R4 = array[3];
    let newBits = "", gamma = "";

    stringArray.forEach(function (symbol) {
        let array = generateBit2(R1, R2, R3, R4);
        let resultBit = array[0]; R1 = array[1]; R2 = array[2]; R3 = array[3]; R4 = array[4];

        console.log("resultBit = " + resultBit);
        console.log("symbol = " + symbol);

        newBits += String(resultBit ^ symbol);
        gamma += String(resultBit);
    });

    return newBits;
}

function generateBit2(R1, R2, R3, R4) {
    let array;

    let x = parseInt(reverseString(R4)[3]),
        y = parseInt(reverseString(R4)[7]),
        z = parseInt(reverseString(R4)[10]);

    let F = x & y | x & z | y & z;

    array = newBit2(R1, R1_polynomials, F, z, R1_majorityBits);
    R1 = array[0]; let R1_XorBit = array[1];

    array = newBit2(R2, R2_polynomials, F, x, R2_majorityBits);
    R2 = array[0]; let R2_XorBit = array[1];

    array = newBit2(R3, R3_polynomials, F, y, R3_majorityBits);
    R3 = array[0]; let R3_XorBit = array[1];

    R4 = shiftFunction(R4, R4_polynomials);

    let resultBit = 0;
    resultBit += R1_XorBit;
    resultBit += R2_XorBit;
    resultBit += R3_XorBit;

    resultBit = resultBit % 2;

    return [resultBit, R1, R2, R3, R4];

}

function newBit2(R, R_polynomials, F, xyz, R_majorityBits) {

    let x = parseInt(reverseString(R)[R_majorityBits["x"]]),
        y = parseInt(reverseString(R)[R_majorityBits["y"]]),
        z = parseInt(reverseString(R)[R_majorityBits["z"]]);

    let resultBit = x & y | x & z | y & z;

    if (xyz === F) {
        R = shiftFunction(R, R_polynomials);
    }

    return [R, resultBit];
}

function shiftFunction(R, R_polynomials) {

    let NewBit = 0;
    R_polynomials.forEach(function (bit) {
        NewBit += parseInt(reverseString(R)[bit - 1]);
    });

    NewBit = NewBit % 2;

    R = R.slice(1);

    R += String(NewBit);

    return R;
}

function fillRegisters2(key) {
    let R1 = "", R2 = "", R3 = "", R4 = "";
    for (let i = 0; i < 81; i++) {

        if (i < R1_len) R1 += key[i];
        else if (((R2_len + R1_len) > i) && (i >= R1_len)) R2 += key[i];
        else if (((R2_len + R1_len + R3_len) > i) && (i >= (R2_len + R1_len))) R3 += key[i];
        else R4 += key[i];

    }

    return [R1, R2, R3, R4];
}


//############### МАГМА ###############
function magma() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);

    key = key.substr(0, 16);

    if (typeOperation === "encrypt") _string = stringToHEX(_string);
    console.log(_string);
    key = stringToHEX(key);

    let keyList = cutKey(key);

    console.log(keyList);

    if (typeOperation === "encrypt") _string = fullBlock(_string, 16);

    console.log(_string);

    if (typeOperation === "decrypt") keyList = keyList.reverse();

    let newString = encMagma(_string, keyList);

    if (typeOperation === "decrypt") {
        newString = shortBlock(newString, 16);
        newString = HEXToString(newString);
    }

    result(newString);
}

function encMagma(string, keyList) {
    let stringList = wrapString(string, 16), newString = "", blockList;
    stringList.forEach(function (block) {
        blockList = wrapString(block, 8);
        newString += encDecOneBlock(blockList, keyList);
    });

    return newString;
}

function encDecOneBlock(stringList, keyList) {
    let a1 = stringList[0], a0 = stringList[1];

    for (let i = 0; i < 32; i++) {
        let array = transformG(a1, a0, keyList[i]);
        a1 = array[0]; a0 = array[1];
    }

    return a0 + a1;
}

function transformG(a1, a0, shortKey) {

    a1 = xor(parseInt(transform_g(a0, shortKey), 16).toString(2), parseInt(a1, 16).toString(2));

    a1 = parseInt(a1, 2).toString(16).padStart(8, "0");

    return [a0, a1];
}

function transform_g(block, key) { // Преобразование g
    let newItem = (parseInt(block, 16) + parseInt(key, 16)) % (2 ** 32);
    let newString = newItem.toString(16).padStart(8, "0");

    newString = fromHexToBin(transformT(newString));
    newString = newString.padStart(32, "0");
    newString = newString.substr(11) + newString.substr(0, 11);
    newString = fromBinToHex(newString).padStart(8, "0");

    return newString;
}

function transformT(block) {
    block = block.toUpperCase();
    let newString = "", n = 0, letter;

    for (let i = 7; i > -1; i--) {
        letter = blocksMagma[i][block[n]];
        newString += letter.toLowerCase();
        n += 1;
    }

    return newString;
}

function cutKey(key) {
    let keyList = wrapString(key, 8);
    let newKeyList = keyList.slice();
    newKeyList.reverse();

    return keyList.concat(keyList, keyList, newKeyList);
}


//############### AES ###############
function aes() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);

    key = key.substr(0, 8);

    if (typeOperation === "encrypt") _string = stringToHEX(_string);
    console.log(_string);
    key = stringToHEX(key);

    let keyArray = wrapString(key, 8);
    keyArray = wiGeneration(keyArray);

    if (typeOperation === "encrypt") _string = fullBlock(_string, 32);

    let newString = encAES(_string, keyArray);

    if (typeOperation === "decrypt") {
        newString = shortBlock(newString, 32);
        console.log(newString);
        newString = HEXToString(newString);
    }

    result(newString);
}

function encAES(string, keyArray) {
    let stringArray = wrapString(string, 32);
    // console.log("stringArray = " + stringArray);
    let newString = "";

    stringArray.forEach(function (block) {
        if (typeOperation === "encrypt") newString += encBlock(block, keyArray.slice());
        if (typeOperation === "decrypt") newString += decBlock(block, keyArray.slice());
    });

    return newString;
}

function encBlock(string, keyArray) {
    let keyMatrix;
    let stringArray = wrapString(string, 2);
    keyArray = TwoDimensional(keyArray, 4);

    let stringMatrix = fillingMatrixColumn(4, 4, stringArray);  // матрица для шифруемого текста

    keyArray.forEach(function (kValue, i) {
        kValue = wrapString(kValue.join(''), 2);
        keyMatrix = fillingMatrixColumn(4, 4, kValue.slice());

        if (i > 0) {
            stringMatrix = SubBytes(stringMatrix.slice());
            stringMatrix = ShiftRows(stringMatrix.slice());

            if (i !== 10) stringMatrix = MixColumns(stringMatrix.slice());
        }

        stringMatrix = xorMatrix(keyMatrix.slice(), stringMatrix.slice());  // ксорим
    });

    let newString = "";

    for (let j = 0; j < stringMatrix[0].length; j++) {
        for (let i = 0; i < stringMatrix.length; i++) {
            newString += stringMatrix[i][j];
        }
    }

    return newString;
}

function decBlock(string, keyArray) {
    let keyMatrix;
    let stringArray = wrapString(string, 2);
    keyArray = TwoDimensional(keyArray, 4);

    keyArray.reverse();

    let stringMatrix = fillingMatrixColumn(4, 4, stringArray);  // матрица для шифруемого текста

    keyArray.forEach(function (kValue, i) {
        kValue = wrapString(kValue.join(''), 2);
        keyMatrix = fillingMatrixColumn(4, 4, kValue);
        stringMatrix = xorMatrix(keyMatrix.slice(), stringMatrix.slice());  // ксорим

        if (i !== 10) {
            if (i > 0) {
                stringMatrix = InvMixColumns(stringMatrix.slice());
            }

            stringMatrix = InvShiftRows(stringMatrix.slice());
            stringMatrix = InvSubBytes(stringMatrix.slice());
        }
    });

    let newString = "";

    for (let j = 0; j < stringMatrix[0].length; j++) {
        for (let i = 0; i < stringMatrix.length; i++) {
            newString += stringMatrix[i][j];
        }
    }

    return newString;
}

function SubBytes(matrix) {
    let newMatrix = Array.from({
        length: matrix[0].length
    }, () => new Array(matrix.length).fill(0));

    let n = 0;
    for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
            newMatrix[i][j] = SubWord(matrix[i][j]);
            n++;
        }
    }

    return newMatrix.slice();
}

function InvSubBytes(matrix) {
    let newMatrix = Array.from({
        length: matrix[0].length
    }, () => new Array(matrix.length).fill(0));

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            newMatrix[i][j] = InvSubWord(matrix[i][j]);
        }
    }

    return newMatrix;
}

function MixColumns(string) {
    string = rotateRight90(string.reverse());

    let a = [0, 0, 0, 0],
        b = [0, 0, 0, 0],
        newString = "", r;

    string.forEach(function (i) {
        r = i;
        for (let c = 0; c < 4; c++) {
            a[c] = r[c];
            let h = (parseInt(r[c], 16) >> 7) & 1;
            b[c] = parseInt(r[c], 16) << 1;
            b[c] ^= h * parseInt('1B', 16);
        }

        r[0] = ((b[0] ^ parseInt(a[3], 16) ^ parseInt(a[2], 16) ^ b[1] ^ parseInt(a[1], 16)) % 256).toString(16).padStart(2, "0");

        r[1] = ((b[1] ^ parseInt(a[0], 16) ^ parseInt(a[3], 16) ^ b[2] ^ parseInt(a[2], 16)) % 256).toString(16).padStart(2, "0");

        r[2] = ((b[2] ^ parseInt(a[1], 16) ^ parseInt(a[0], 16) ^ b[3] ^ parseInt(a[3], 16)) % 256).toString(16).padStart(2, "0");

        r[3] = ((b[3] ^ parseInt(a[2], 16) ^ parseInt(a[1], 16) ^ b[0] ^ parseInt(a[0], 16)) % 256).toString(16).padStart(2, "0");

        newString += r[0] + r[1] + r[2] + r[3];
    });

    let newStringArr = wrapString(newString, 8);
    let outputList = [];

    newStringArr.forEach(function (item) {
        outputList.push(wrapString(item, 2));
    });

    outputList = rotateRight90(outputList.reverse());

    return outputList;
}

function InvMixColumns(string) {
    string = rotateRight90(string.reverse());

    let newString = '', item;

    let r = Array.from({
        length: 4
    }, () => new Array(4).fill(0));

    for (let i = 0; i < string.length; i++) {

        item = (parseInt(multiply_by_14[parseInt(string[i][0][0], 16)][parseInt(string[i][0][1], 16)], 16) ^ parseInt(multiply_by_11[parseInt(string[i][1][0], 16)][parseInt(string[i][1][1], 16)], 16) ^ parseInt(multiply_by_13[parseInt(string[i][2][0], 16)][parseInt(string[i][2][1], 16)], 16) ^ parseInt(multiply_by_9[parseInt(string[i][3][0], 16)][parseInt(string[i][3][1], 16)],16)).toString(16);

        r[i][0] = item.padStart(2, "0");

        item = (parseInt(multiply_by_9[parseInt(string[i][0][0], 16)][parseInt(string[i][0][1], 16)], 16) ^ parseInt(multiply_by_14[parseInt(string[i][1][0], 16)][parseInt(string[i][1][1], 16)], 16) ^ parseInt(multiply_by_11[parseInt(string[i][2][0], 16)][parseInt(string[i][2][1], 16)], 16) ^ parseInt(multiply_by_13[parseInt(string[i][3][0], 16)][parseInt(string[i][3][1], 16)],16)).toString(16);

        r[i][1] = item.padStart(2, "0");

        item = (parseInt(multiply_by_13[parseInt(string[i][0][0], 16)][parseInt(string[i][0][1], 16)], 16) ^ parseInt(multiply_by_9[parseInt(string[i][1][0], 16)][parseInt(string[i][1][1], 16)], 16) ^ parseInt(multiply_by_14[parseInt(string[i][2][0], 16)][parseInt(string[i][2][1], 16)], 16) ^ parseInt(multiply_by_11[parseInt(string[i][3][0], 16)][parseInt(string[i][3][1], 16)],16)).toString(16);

        r[i][2] = item.padStart(2, "0");

        item = (parseInt(multiply_by_11[parseInt(string[i][0][0], 16)][parseInt(string[i][0][1], 16)], 16) ^ parseInt(multiply_by_13[parseInt(string[i][1][0], 16)][parseInt(string[i][1][1], 16)], 16) ^ parseInt(multiply_by_9[parseInt(string[i][2][0], 16)][parseInt(string[i][2][1], 16)], 16) ^ parseInt(multiply_by_14[parseInt(string[i][3][0], 16)][parseInt(string[i][3][1], 16)],16)).toString(16);

        r[i][3] = item.padStart(2, "0");

        newString += r[i][0] + r[i][1] + r[i][2] + r[i][3];
    }


    let newMatrix = Array.from({
        length: 4
    }, () => new Array(4).fill(0));

    let newList = wrapString(newString, 2), n = 0;

    for (let j = 0; j < newMatrix[0].length; j++) {
        for (let i = 0; i < newMatrix.length; i++) {
            newMatrix[i][j] = newList[n];
            n += 1;
        }
    }

    return newMatrix;
}

function ShiftRows(matrix) {
    let indexArray = [0, 2, 4, 6];

    matrix.forEach(function (item, i) {
        matrix[i] = wrapString((item.join('').substr(indexArray[i]) + item.join('').substr(0, indexArray[i])), 2);
    });

    return matrix;
}

function InvShiftRows(matrix) {
    let indexArray = [0, 2, 4, 6], elem;

    matrix.forEach(function (item, i) {

        if (indexArray[i] !== 0) {
            elem = (item.join('').substr(-indexArray[i]) + item.join('').substr(0, item.join('').length - indexArray[i]));

            matrix[i] = wrapString(elem, 2);
        }

        else {
            matrix[i] = wrapString(item.join(''), 2);
        }
    });

    return matrix;
}

function wiGeneration(keyArray) {
    let i = 4, j = 0, temp, subWord, num;

    while (i <= 43) {
        temp = keyArray[keyArray.length - 1];

        if ((i % 4) === 0) {
            subWord = SubWord(RotWord(temp));
            temp = xorHex(Rcon[j], subWord);
            j += 1;
        }

        num = i - Nk;
        keyArray.push(xorHex(temp, keyArray[num]).padStart(8, "0"));
        i += 1;
    }

    return keyArray;
}

function SubWord(wi) {
    let wiList = wrapString(wi, 2), i, j;
    wi = "";

    wiList.forEach(function (item) {
        i = parseInt(item[0], 16);
        j = parseInt(item[1], 16);

        wi += sBox[i][j];
    });

    return wi;
}

function InvSubWord(wi) {
    let wiList = wrapString(wi, 2), i, j;
    wi = "";

    wiList.forEach(function (item) {
        i = parseInt(item[0], 16);
        j = parseInt(item[1], 16);

        wi += inverseSBox[i][j];
    });

    return wi;
}

function RotWord(wi) {
    return wi.substr(2) + wi.substr(0, 2);
}


//############### КУЗНЕЧИК ###############
function grasshopper() {
    let _string = getValues(["text"]);
    let key = getValues(["key"]);

    key = key.substr(0, 16);

    if (typeOperation === "encrypt") _string = stringToHEX(_string);
    console.log(_string);
    key = stringToHEX(key);

    console.log(key);
    let keyArray = keyGeneration(key);
    console.log(keyArray);

    if (typeOperation === "encrypt") _string = fullBlock(_string, 32);

    let newString = encGrasshopper(_string, keyArray);

    if (typeOperation === "decrypt") {
        newString = shortBlock(newString, 32);
        console.log(newString);
        newString = HEXToString(newString);
    }

    result(newString);
}

function encGrasshopper(string, keyArray) {
    let stringArray = wrapString(string, 32);
    let newString = "";

    stringArray.forEach(function (block) {
        if (typeOperation === "encrypt") newString += encBlockGr(block, keyArray.slice());
        if (typeOperation === "decrypt") newString += decBlockGr(block, keyArray.slice());
    });

    return newString;
}

function encBlockGr(string, keyArray) {
    keyArray.forEach(function (keyItem, i) {
        string = functionX(string, keyItem);

        if (i < 9) {
            string = functionL(functionS(string));
        }
    });

    return string;
}

function decBlockGr(string, keyArray) {
    keyArray.reverse();

    keyArray.forEach(function (keyItem, i) {
        string = functionX(string, keyItem);

        if (i < 9) {
            string = invFunctionS(invFunctionL(string));
        }
    });

    return string;
}

function keyGeneration(key) {
    let keyArray = wrapString(key, 32), array;
    let K1 = keyArray[0], K2 = keyArray[1];

    for (let i = 0; i < 4; i++) {
         array = twoKeyGeneration(8*i, K1, K2);
         K1 = array[0]; K2 = array[1];

        keyArray.push(K1);
        keyArray.push(K2);
    }

    return keyArray;
}

function twoKeyGeneration(j, K1, K2) {
    let _K2;
    for (let i = 1; i < 9; i++) {
        _K2 = K1;
        K1 = functionF(i+j, K1, K2);
        K2 = _K2;
    }

    return [K1, K2];
}

function functionF(index, K1, K2) {
    let C = functionL(index.toString(16).padStart(32, "0"));
    let _xor = functionX(C, K1);
    let resultS = functionS(_xor);
    let resultL = functionL(resultS);
    _xor = functionX(resultL, K2);

    return _xor;
}

function functionX(string1, string2) {
    let xorBin = xor(fromHexToBin(string1), fromHexToBin(string2));
    return fromBinToHex(xorBin).padStart(string1.length, "0");
}

function functionS(string) {
    let stringArray = wrapString(string, 2), newString = "";

    stringArray.forEach(function (item) {
        item = P[parseInt(item, 16)];
        newString += item.toString(16).padStart(2, "0");
    });

    return newString;
}

function invFunctionS(string) {
    let stringArray = wrapString(string, 2), newString = "";

    stringArray.forEach(function (item) {
        item = invP[parseInt(item, 16)];
        newString += item.padStart(2, "0");
    });

    return newString;
}

function functionL(string) {
    for (let i = 0; i < 16; i++) {
        string = functionR(string);
    }
    return string;
}

function invFunctionL(string) {
    for (let i = 0; i < 16; i++) {
        string = invFunctionR(string);
    }
    return string;
}

function functionR(string) {
    let stringArray = wrapString(string, 2), newString = 0;

    for (let i = (stringArray.length - 1); i > -1; i--) {
        newString ^= (multiField(parseInt(stringArray[i], 16), L_vector[i]));
    }

    for (let i = 0; i < stringArray.length; i++) {
        stringArray[stringArray.length - i - 1] = stringArray[stringArray.length - i - 2];
    }

    stringArray[0] = (newString).toString(16).padStart(2, "0");

    return stringArray.join("");
}

function invFunctionR(string) {
    let stringArray = wrapString(string, 2), newString = 0;
    let _stringArray = stringArray.slice(1).concat(stringArray.slice(0, 14));

    for (let i = (stringArray.length - 1); i > -1; i--) {
        newString ^= (multiField(parseInt(_stringArray[i], 16), L_vector[i]));
    }

    stringArray.splice(0, 1);
    stringArray.push((newString).toString(16).padStart(2, "0"));

    return stringArray.join("");
}

function multiField(x, y) {
    let p = 0;
    while (x) {
        if (x & 1) p ^= y;
        if (y & 0x80) y = (y << 1) ^ 0x1C3;
        else y <<= 1;
        x >>= 1;
    }
    return p;
}


//############### RSA ###############
function rsa() {
    let _string = getValues(["text"]);
    let P = getValues(["P"]);
    let Q = getValues(["Q"]);

    let stringArray;
    if (typeOperation === "encrypt") stringArray = stringToNumber(_string);

    let D, E, N;
    if (typeOperation === "encrypt") {
        let array = keyGenerationRSA(P, Q);
        D = array[0]; E = array[1]; N = array[2];
    }

    if (typeOperation === "decrypt") N = P * Q;

    // ошибка
    if (typeOperation === "encrypt") {
        if (N < Math.max.apply(null, stringArray)) {
            alert("Вы выбрали слишком маленькие значения P и Q, попробуйте ещё раз.");
            return false;
        }
    }

    let newString = "";
    if (typeOperation === "encrypt") newString = encRSA(stringArray, E, N);
    if (typeOperation === "decrypt") {
        let D = getValues(["D"]);
        newString = decRSA(_string, N, D);
    }

    if (typeOperation === "encrypt") $("#D").val(D);
    result(newString);
}

function encRSA(stringCodeArr, e, n) {
    let newString = "", Ci;
    stringCodeArr.forEach(function (Mi) {
        Ci = powMod(Mi, e, n);
        newString += (String(Ci)).padStart(String(n).length, "0");
    });

    return newString;
}

function decRSA(newString, n, d) {
    let newArray = wrapString(newString, String(n).length), Mi;
    newString = "";
    newArray.forEach(function (Ci) {
        Mi = powMod(Number(Ci), d, n);
        newString += String.fromCharCode(Mi);
    });

    return newString;
}

function keyGenerationRSA(P, Q) {
    let N = P * Q;
    let N_euler = (P - 1) * (Q - 1);

    let randomArray = randomArr(1000, 2, N);

    let E = 0;  // выбирается случайное целое число E, взаимно простое с φ(N)

    randomArray.forEach(function (x) {
        if (gcd(x, N_euler) === 1) {
            E = x;
            return x;
        }
    });

    let D = findD(N_euler, 1, E);  // высчитываем D

    return [D, E, N];
}

function findD(N_euler, num, e) {
    let degree = euler(N_euler)-1;
    return (num * powMod(e, degree, N_euler)) % N_euler;
}


//############### ELGAMAL ###############
function elgamal() {
    let _string = getValues(["text"]);
    let p = getValues(["p"]);
    let x = getValues(["x"]);
    let g = getValues(["g"]);

    let stringArray;
    if (typeOperation === "encrypt") stringArray = stringToNumber(_string);

    console.log(stringArray);

    // ошибка
    if (p < Math.max.apply(null, stringArray)) {
        alert("Вы выбрали слишком маленькое значение p, попробуйте ещё раз.");
        return false;
    }

    let kArray = randomKGeneration(_string, p);

    let newString;

    if (typeOperation === "encrypt") {
        let y = powMod(g, x, p);
        newString = encElgamal(kArray, g, y, p, stringArray);
    }

    if (typeOperation === "decrypt") newString = decElgamal(_string, p, x);

    console.log(newString);

    result(newString);
}

function randomKGeneration(string, p) {
    let kArray = [], k;
    while (kArray.length < string.length) {
        k = randomNum(1, p-1);
        if (gcd(k, p-1) === 1) {
            kArray.push(k);
        }
    }

    return kArray;
}

function encElgamal(kArray, g, y, p, stringArray) {
    let newString = "", ki, Mi, ai, bi;

    for (let i = 0; i < stringArray.length; i++) {
        ki = kArray[i];
        Mi = stringArray[i];

        ai = powMod(g, ki, p);
        bi = (powMod(y, ki, p) * Mi) % p;

        ai = String(ai).padStart(String(p).length, "0");
        bi = String(bi).padStart(String(p).length, "0");

        newString += ai + bi;
    }

    return newString;
}

function decElgamal(newString, p, x) {
    let ai, bi, Mi;
    let newStringArray = wrapString(newString, String(p).length * 2);

    newString = "";

    newStringArray.forEach(function (ab) {
        ai = ab.substr(0, ab.length / 2);
        bi = ab.substr(ab.length / 2);

        bi = bi % p;
        ai = powMod(ai, x, p);
        Mi = (bi * powMod(ai, p-2, p)) % p;

        newString += String.fromCharCode(Mi);
    });

    return newString;
}


//############### ECC ###############
function ecc() {
    let _string = getValues(["text"]);
    let p = Number(getValues(["p"]));
    let a = Number(getValues(["a"]));
    let b = Number(getValues(["b"]));
    let Cb = Number(getValues(["Cb"]));

    let stringArray;
    if (typeOperation === "encrypt") stringArray = stringToNumber(_string);

    // ошибка
    if (typeOperation === "encrypt") {
        if (p < Math.max.apply(null, stringArray)) {
            alert("Вы выбрали слишком маленькое значение P, попробуйте ещё раз.");
            return false;
        }
    }

    if (typeOperation === "decrypt") {
        stringArray = wrapString(_string, String(p).length * 3);

        stringArray.forEach(function (elem, i) {
            stringArray[i] = wrapString(elem, String(p).length);
        });
    }

    if (typeOperation === "encrypt") {
        let G = generationG(p, a, b);
        let newArray = encECC(stringArray, p, Cb, G, a);
        result(newArray);
    }

    if (typeOperation === "decrypt") {
        let newString = decECC(stringArray, p, Cb, a);
        result(newString);
    }
}

function generationG(p, a, b) {
    let x = randomNum(2, p);
    return [x, (x ** 3 + a * x + b) % p];
}

function encECC(stringArray, p, Cb, G, a) {
    let newArray = [], Db, array, R, e;
    stringArray.forEach(function (letter) {
        Db = encRecipient(p, a, G, Cb);

        array = encSender(p, a, G, Db, letter);
        R = [array[0][0].toString().padStart(String(p).length, "0"), array[0][1].toString().padStart(String(p).length, "0")];

        e = array[1].toString().padStart(String(p).length, "0");

        newArray.push([R, e]);
    });

    newArray = newArray.flat(2);

    return newArray;
}

function decECC(newArray, p, Cb, a) {
    let string = "";
    newArray.forEach(function (elem) {
        string += String.fromCharCode(decRecipient(p, Cb, [elem[0], elem[1]], a, elem[2]));
    });

    return string;
}

function encRecipient(p, a, G, Cb) { //шифрование на стороне получателя
    let Db = calculatePoint(Cb, G, p, a);
    return Db;
}

function decRecipient(p, Cb, R, a, e) {
    let Q = calculatePoint(Cb, R, p, a);
    let m = (e * powMod(Q[0], (euler(p)-1), p)) % p;
    return m;
}

function encSender(p, a, G, Db, m) {
    let k = generationK(p);

    let R = calculatePoint(k, G, p, a);
    let P = calculatePoint(k, Db, p, a);

    let e = m * P[0] % p;

    return [R, e];
}

function generationK(p) {
    return randomNum(2, p);
}


//############### ГОСТ Р 34.10-94 ###############
function gost94() {
    let _string = getValues(["text"]);
    let p = Number(getValues(["p"]));
    let a = Number(getValues(["a"]));
    let q = Number(getValues(["q"]));

    let stringArray;
    stringArray = stringToNumber(_string);
    console.log(stringArray);

    // ошибка
    if (p < Math.max.apply(null, stringArray)) {
        alert("Вы выбрали слишком маленькое значение P, попробуйте ещё раз.");
        return false;
    }

    if (typeOperation === "encrypt") {
        let x = Number(getValues(["x"]));
        let y = powMod(a, x, p);

        $("#y").val(y);
        let array = userA(p, q, a, findHash(stringArray, p), x);
        let r = array[0], s = array[1];
        $("#r").val(r);
        $("#s").val(s);
    }

    if (typeOperation === "decrypt") {
        let r = $("#r").val(), s = $("#s").val();
        let y = Number(getValues(["y"]));

        userB(p, q, findHash(stringArray, p), Number(r), Number(s), a, y);
    }
}

function userA(p, q, a, Hm, x) {
    if (Hm % q === 0) Hm = 1;
    let k = kGeneration(q);

    let r = mod(powMod(mod(a, p), k, p), q);
    let s = mod((x * r + k * Hm), q);

    if (r === 0) {
        let array = userA(p, q, a, Hm, x);
        r = array[0]; s = array[1];
    }

    return [r, s];
}

function userB(p, q, Hm, r, s, a, y) {
    if (Hm % q === 0) {
        Hm = 1;
    }

    let v = powMod(Hm, q-2, q);
    let z1 = mod((s * v), q);
    let z2 = mod(((q - r) * v), q);
    let u = mod(mod(powMod(a, z1, p) * powMod(y, z2, p), p), q);

    console.log(u);
    if (u === r) {
        alert("Подпись верна");
    }

    else {
        alert("Подпись не верна");
    }
}

function kGeneration(q) {
    return randomNum(1, q);
}


//############### ГОСТ Р 34.10-2012 ###############
function gost12() {
    let _string = getValues(["text"]);
    let p = Number(getValues(["p"]));
    let xa = Number(getValues(["xa"]));
    let a = Number(getValues(["a"]));
    let b = Number(getValues(["b"]));

    let stringArray;
    stringArray = stringToNumber(_string);
    console.log(stringArray);

    let array = findQ(p, a, b);  // ищем q
    let q = array[0], dictPoints = array[1];

    let G = [], Ya = [], r, s;
    if (typeOperation === "decrypt") {
        let G1 = Number(getValues(["G1"]));
        let G2 = Number(getValues(["G2"]));

        G.push(G1);
        G.push(G2);

        let Ya1 = Number(getValues(["Ya1"]));
        let Ya2 = Number(getValues(["Ya2"]));

        Ya.push(Ya1);
        Ya.push(Ya2);

        r = Number(getValues(["r"]));
        s = Number(getValues(["s"]));
    }

    if (typeOperation === "encrypt") {
        if (xa <= 0 || xa >= q) {
            alert("Ваше число xa не входит в промежуток (0 < xa < q), попробуйте ещё раз.");
            return false;
        }
        G = gost12GenerationG(p, a, b, q, dictPoints);
        //G = [107, 214];
    }

    console.log("q: " + q);
    console.log("G: " + G);

    if (typeOperation === "encrypt") {
        array = gost12UserA(p, stringArray, a, xa, G, q);
        r = array[0]; s = array[1]; Ya = array[2];
        $("#r").val(r);
        $("#s").val(s);
        $("#Ya1").val(Ya[0]);
        $("#Ya2").val(Ya[1]);
        $("#G1").val(G[0]);
        $("#G2").val(G[1]);
    }

    if (typeOperation === "decrypt") {
        gost12UserB(stringArray, s, r, q, Ya, p, a, G);
    }
}

function findQ(p, a, b) {
    let d = {}, y2;
    for (let y = 0; y < p; y++) {
        y2 = powMod(y, 2, p);

        if(d.hasOwnProperty(y2)) {
            d[y2].push(y);
        }
        else {
            d[y2] = [y];
        }
    }

    let Ep = 1;
    for (let x = 0; x < p; x++) {
        y2 = (x**3 + a * x + b) % p;

        if (d.hasOwnProperty(y2)) Ep += d[y2].length;
    }

    let q = getMaxOfArray(Factor(Ep));

    return [q, d];
}

function Factor(n) {
    let Ans = [], d = 2;

    while (d * d <= n) {
        if (n % d === 0) {
            Ans.push(d)
            n /= d;
        }

        else {
            d += 1;
        }
    }

    if (n > 1) Ans.push(n);

    return Ans;
}

function gost12GenerationG(p, a, b, q, dictPoints) {
    let x, y2, G;
    while (true) {
        x = randomNum(0, p-1);
        y2 = (x ** 3 + a * x + b) % p;

        if (y2 in dictPoints) {
            G = [x, (dictPoints[y2]).sample()];

            for (let elemQ = 1; elemQ < q + 1; elemQ++) {
                if (String(calculatePoint(elemQ, G, p, a)) === String([0, 0])) {
                    if (elemQ !== q) break;
                    else return G;
                }
            }
        }

    }
}

function gost12GenerationK(q) {
    return randomNum(1, q-1);
}

function gost12UserA(p, stringArray, a, xa, G, q) {
    let Ya = calculatePoint(xa, G, p, a);
    let h = findHash(stringArray, p), k, P, xp, y, r, s;

    while (true) {
        k = gost12GenerationK(q);
        //k = 40;
        P = calculatePoint(k, G, p, a);

        xp = P[0]; y = P[1];

        r = xp % q;
        s = (k * h + r * xa) % q;

        if ((s !== 0) && (r !== 0)) break;
    }

    return [r, s, Ya];
}

function gost12UserB(stringArray, s, r, q, Ya, p, a, G) {
    let h = findHash(stringArray, p), P;

    let u1 = mod(s * powMod(h, (euler(q)-1), q), q);
    let u2 = mod(-r * powMod(h, (euler(q)-1), q), q);

    let point1 = calculatePoint(u1, G, p, a);
    let point2 = calculatePoint(u2, Ya, p, a);

    if (point1 === point2) P = doublePoint(point1, p, a);

    else P = sumPoints(point1, point2, p);

    if ((P[0] % q) === r) {
        alert("Подпись принята.");
    }

    else {
        alert("Подпись не принята.");
    }

}


//############### RSA ЦИФРОВАЯ ПОДПИСЬ ###############
function rsaDigital() {
    let _string = getValues(["text"]);
    let P = getValues(["P"]);
    let Q = getValues(["Q"]);

    let stringArray;
    stringArray = stringToNumber(_string);

    console.log(stringArray);

    let D, E, N;
    if (typeOperation === "encrypt") {
        let array = keyGenerationRSA(P, Q);
        D = array[0]; E = array[1]; N = array[2];
    }

    if (typeOperation === "decrypt") N = P * Q;

    if (typeOperation === "encrypt") {
        let S = generationS(findHash(stringArray, N), D, N);
        $("#S").val(S);
        $("#E").val(E);
    }

    if (typeOperation === "decrypt") {
        E = getValues(["E"]);
        let S = getValues(["S"]);
        recipient(stringArray, S, E, N);
    }
}

function generationS(m, D, N) {
    let S = powMod(m, D, N);
    return S;
}

function recipient(M, S, E, N) {
    let m2 = powMod(S, E, N);
    let m = findHash(M, N);

    if (m === m2) {
        alert("Цифровая подпись верна.");
    }

    else {
        alert("Цифровая подпись не верна.");
    }
}


//############### ELGAMAL ЦИФРОВАЯ ПОДПИСЬ ###############
function elgamalDigital() {
    let y, x, k;
    let _string = getValues(["text"]);
    let p = getValues(["P"]);
    if (typeOperation === "encrypt") x = getValues(["X"]);
    if (typeOperation === "decrypt") y = getValues(["Y"]);
    let g = getValues(["G"]);
    let S;

    if (typeOperation === "decrypt") S = [getValues(["a"]), getValues(["b"])];

    let stringArray;
    stringArray = stringToNumber(_string);

    console.log(stringArray);

    if (typeOperation === "encrypt") {
        y = powMod(g, x, p);
        $("#Y").val(y);
        k = randomKGenerationDigital(p);
    }

    if (typeOperation === "encrypt") {
        S = signing(p, g, k, findHash(stringArray, p), x);
        $("#a").val(S[0]);
        $("#b").val(S[1]);
    }

    if (typeOperation === "decrypt") checkDigital(findHash(stringArray, p), S[0], S[1], y, g, p);
}

function checkDigital(m, a, b, y, g, p) {
    let A1 = mod(powMod(y, a, p) * powMod(a, b, p), p);
    let A2 = powMod(g, m, p);

    if (A1 === A2) alert("Цифровая подпись верна.");
    else alert("Цифровая подпись не верна.");
}

function signing(p, g, k, m, x) {
    let a = powMod(g, k, p);
    let b = findB(m, x, a, k, p);
    return [a, b];
}

function findB(m, x, a, k, p) {
    for (let b = 0; b < p; b++) {
        let _m = mod(x * a + k * b, p - 1);

        if (m === _m) return b;
    }
}

function randomKGenerationDigital(p) {
    let k;
    while (true) {
        k = randomNum(2, p-1);
        if (gcd(k, p-1) === 1) {
            break
        }
    }
    return k;
}


//############### ДИФФИ-ХЕЛЛМАН ###############
function diffieHellman() {
    let Ya, Yb, a;
    let n = getValues(["n"]);
    let Ka = getValues(["Ka"]);
    let Kb = getValues(["Kb"]);

    if (typeOperation === "decrypt") {
        Ya = getValues(["Ya"]);
        Yb = getValues(["Yb"]);
    }

    if (typeOperation === "encrypt") {
        a = getValues(["a"]);
        Ya = calculateY(a, Ka, n);
        Yb = calculateY(a, Kb, n);

        if (Ya === Ka) {
            alert("Здачения Ka и Ya совпадают, попробуйте другие значения.");
            return false;
        }

        if (Yb === Kb) {
            alert("Здачения Kb и Yb совпадают, попробуйте другие значения.");
            return false;
        }

        $("#Ya").val(Ya);
        $("#Yb").val(Yb);
    }

    if (typeOperation === "decrypt") {
        let mainKa = calculateK(n, Yb, Ka);
        let mainKb = calculateK(n, Ya, Kb);

        if (mainKa === mainKb) {
            $("#sharedKey").val(mainKa);
            alert("Общий ключ совпадает.");
        }

        else {
            alert("Общий ключ не совпадает, попробуйте ещё раз.");
        }
    }
}

function calculateY(a, K, n) {
    return powMod(a, K, n);
}

function calculateK(n, Yb, Ka) {
    return powMod(Yb, Ka, n);
}



