
function roundMatrix(matrix) {
    console.log(matrix.length);
    let newMatrix = Array.from({
        length: matrix.length
    }, () => new Array(matrix[0].length).fill(0));

    for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
            newMatrix[newMatrix.length-1-i][j] = matrix[i][j];
            console.log(newMatrix[i][j]);
        }
    }

    return newMatrix;
}

function fillMatrix(rows, columns, vector) {
    var _array2D = [], i, j, n = 0;
    for (i = 0; i < columns; i++) {
        _array2D.push(i);
        _array2D[i] = [];
        for (j = 0; j < rows; j++) {
            _array2D[i].push(vector[n]);
            n++;
        }
    }
    return _array2D;
}

function fillingMatrixColumn(columns, rows, stringList) { // заполняем матрицу из одномерного массива по столбцам
    let newMatrix = Array.from({
        length: rows
    }, () => new Array(columns).fill(0));

    let n = 0;

    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows; i++) {
            newMatrix[i][j] = stringList[n];
            n += 1;
        }
    }

    return newMatrix;
}

function xorMatrix(matrix1, matrix2) {
    if ((matrix1.length === matrix2.length) && (matrix1[0].length === matrix2[0].length)) {

        let newElem;

        let newMatrix = Array.from({
            length: matrix1[0].length
        }, () => new Array(matrix1.length).fill(0));

        for (let i = 0; i < matrix1.length; i++) {
            for (let j = 0; j < matrix1[i].length; j++) {
                newElem = xorHex(matrix1[i][j], matrix2[i][j]);
                newMatrix[i][j] = newElem.padStart(2, "0");
            }
        }

        return newMatrix;
    }

    else console.log("РАЗНЫЙ РАЗМЕР МАТРИЦ!");
}

function mod(_num, _mod) {
    if (_num >= 0) {
        return _num % _mod;
    }

    else {
        while (true) {
            _num += _mod
            if (_num >= 0) return _num;
        }
    }
}

function wrapString(str, len) {
    var regex = new RegExp('.{' + len + '}|.{1,' + Number(len-1) + '}', 'g');
    return str.match(regex );
}

function xor(number1, number2) {
    let len = 0, newString = "";

    if (number1.length > number2.length) len = number1.length;
    else if (number1.length < number2.length) len = number2.length;
    else len = number1.length;

    number1 = number1.padStart(len, "0");
    number2 = number2.padStart(len, "0");

    for (let i = 0; i < len; i++) {
        newString += number1[i] ^ number2[i];
    }

    return newString;
}

function xorHex(item1, item2) {
    let xorBin = xor(fromHexToBin(item1), fromHexToBin(item2));
    return fromBinToHex(xorBin);
}

function fromHexToBin(string) {
    let newString = "";
    for (let i = 0; i < string.length; i++) {
        newString += parseInt(string[i], 16).toString(2).padStart(4, "0");
    }

    return newString;
}

function fromBinToHex(string) {
    let stringList = wrapString(string, 4);
    let newString = "";
    for (let i = 0; i < stringList.length; i++) {
        newString += parseInt(stringList[i], 2).toString(16);
    }

    return newString;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function stringToNumber2(_string) {
    let number, _string2CodeArray = [], _newString = "";

    for (let i = 0; i < _string.length; i++) {
        number = _string.charCodeAt(i); // получаем номер символа
        // _string2CodeArray.push(completeNum(+(number).toString(2), 16));
        _newString += (number).toString(2).padStart(16, "0");
    }

    return _newString;
}

function stringToHEX(_string) {
    let number, _stringHexArray = [], _newString = "";

    for (let i = 0; i < _string.length; i++) {
        number = _string.charCodeAt(i); // получаем номер символа
        // _string2CodeArray.push(completeNum(+(number).toString(2), 16));
        _newString += (number).toString(16).padStart(4, "0");
    }

    return _newString;
}

function HEXToString(_string) {
    let _string2Array = _string.match(/.{4}|.{1,2}/g), _newString = "";

    _string2Array.forEach(function(_num) {
        _newString += String.fromCharCode(parseInt(_num, 16));
    });

    return _newString;

}

function stringToNumber(_string) {
    let number, _stringCodeArray = [], _newString = "";

    for (let i = 0; i < _string.length; i++) {
        number = _string.charCodeAt(i); // получаем номер символа
        _stringCodeArray.push(number);
    }

    return _stringCodeArray;
}

function num2ToString(_string) {
    let _string2Array = _string.match(/.{16}|.{1,2}/g), _newString = "";

    _string2Array.forEach(function(_num) {
        _newString += String.fromCharCode(parseInt(_num, 2));
    });

    return _newString;

}

function completeNumMod(string, mod) {
    if (string.length % mod !== 0) {
        let num = (mod - (string.length % mod)) + string.length;
        string = String(string).padStart(num);
    }

    return string;
}

function get_key(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function rotateRight90 (matrix) {
    let result = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(matrix[i][j]);
        }
    }
    return result;
}

function stringArray2ToNum(_array2) {
    for (let i = 0; i < _array2.length; i++) {
        for (let j = 0; j < _array2[0].length; j++) {
            _array2[i][j] = Number(_array2[i][j]);
        }
    }
}

function get_index_array(_letter, array) {  // получить индекс элемента двумерного массива
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[i].length; j++) {
            if (array[i][j] === _letter) return [i, j];
        }
    }
    return false;
}

function resizeMatrix(row, coll, _matrix) {
    _matrix.length = 0;
    _matrix.length = row;

    for (var i = 0; i < _matrix.length; i++) {
        _matrix[i] = new Array(coll);
    }
}

function fullBlock(hexString, blockLength) {
    let binNum = fromHexToBin(hexString);
    binNum = completeNumMod(binNum, 16); // дополняем нулями

    if (binNum.length % (blockLength*4) !== 0) {
        let span = (blockLength*4) - binNum.length % (blockLength*4) - 1;
        binNum += "1";

        for (let i = 0; i < span; i++) binNum += "0";
    }

    hexString = fromBinToHex(binNum);
    hexString = completeNumMod(hexString, blockLength);  // дополняем нулями

    return hexString;
}

function shortBlock(hexString, blockLength) {
    let binNum = fromHexToBin(hexString).padStart(blockLength * 4, "0");

    let delString = "";
    if (binNum[binNum.length - 1] === "0") {
        while (binNum[binNum.length - 1] === "0") {
            delString += binNum[binNum.length - 1];
            binNum = binNum.slice(0, -1);
        }

        delString = binNum[binNum.length - 1] + delString;
        binNum = binNum.slice(0, -1);
    }

    if (binNum.length % 16 !== 0) {
        binNum = binNum + delString;
    }

    console.log(binNum);

    hexString = fromBinToHex(binNum).padStart(4, "0");

    return hexString;
}

function TwoDimensional(arr, size) { // группируем по size элементов из одномерного массива в двумерный
    let res = [];
    for(let i=0;i < arr.length;i = i+size)
        res.push(arr.slice(i,i+size));

    return res;
}

function euler(n) { // функция эйлера
    let r = n;
    let i = 2;
    while (i*i <= n) {
        if (n % i === 0){
            while (n % i === 0) n /= i;
            r -= r/i;
        }

        else i += 1;
    }
    if (n > 1) r -= r/n;
    return r;
}

function getDivisorsNumber(num) {
    let divisorsArray = [];

    for (let i = 1; i < num+1; i++) {
        if ((num % i) === 0) {
            divisorsArray.push(i);
        }
    }

    return divisorsArray;
}

function randomArr(length, min, max) {
    return Array.from({length: length}, () => Math.floor(Math.random() * (max+1 - min) + min));
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}

function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
}

// вычисляет (n ** p) % m
function powMod(n, p, m) {
    if (n < 1) { return 0; }
    if (m < 0) { m = 0; }
    p = Math.round(p);
    n = n % m;
    var r = 1;
    while (p >= 1) {
        if (p % 2) {
            r = (r * n) % m;
        }
        n = (n * n) % m;
        p = Math.floor(p / 2);
    }
    return r;
}

function findHash(CodeArray, p) {
    let h = 0;
    CodeArray.forEach(function (Mi) {
        h = ((h + Mi) ** 2) % p;
    });

    return h;
}

function calculatePoint(num, point, p, a) {
    let num_2 = Number(num).toString(2).split(""), Q = [0, 0];

    num_2.forEach(function (m, i) {
        if (i === 0) Q = point;

        else {
            Q = doublePoint(Q, p, a);

            if (Q === [0, 0]) {
                return Q;
            }

            if (m === "1") {
                Q = sumPoints(Q, point, p);

                if (Q === [0, 0]) {
                    return Q;
                }
            }
        }
    });

    return Q;
}

function doublePoint(point, p, a) {
    let x1 = point[0], y1 = point[1];
    let lambdaArray = [(3 * x1**2 + a), 2 * y1];

    if (lambdaArray[1] === 0) {
        return [0, 0];
    }

    let lambda = lambdaArray[0] * powMod(lambdaArray[1], euler(p) - 1, p) % p;

    let x2 = mod(lambda ** 2 - (2 * x1), p);
    let y2 = mod(lambda * (x1 - x2) - y1, p);

    return [x2, y2];
}

function sumPoints(point1, point2, p) {
    let x1 = point1[0], x2 = point2[0];
    let y1 = point1[1], y2 = point2[1];

    let lambdaArray = [y2 - y1, x2 - x1];
    if (lambdaArray[1] === 0) {
        return [0, 0];
    }

    let lambda = mod(lambdaArray[0] * powMod(mod(lambdaArray[1], p), (euler(p) - 1), p), p);

    let x3 = mod(lambda ** 2 - x1 - x2, p);
    let y3 = mod(lambda * (x1 - x3) - y1, p);

    return [x3, y3];
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
} // выбрать рандомный элемент из массива


