function copytext(el) {  // копируем текст результата по нажатию на кнопку
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
}

function getAlphabet() {
    let _alphabet = $('#alphabet_value').val();
    alphabetStandard = _alphabet.split("");
}

function getValues(element) { // получить значение поля по id
    let _value = $('#' + element).val();
    return _value;
}

function isNumber(n) {  // проверка, все ли цифры
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createMatrixInputPolybius() {
    let collNum = polybiusMatrix[0].length, rowNum = polybiusMatrix.length, indexId = 1, value = "";

    var table = $('<table>');
    for(i=0; i<rowNum; i++) {
        let row = $('<tr>'), coll = "";
        for(j=0; j<collNum; j++) {

            if (typeof polybiusMatrix[i][j] !== 'undefined') value = polybiusMatrix[i][j]
            else value = "";

            coll += '<td><input type="text" value ="' + value + '" class="main-input input-square" maxlength="1" tabindex="' + indexId + '"></td>';
            indexId++;
        }
        row.append(coll);
        table.append(row);
    }

    $('#matrix').empty();
    $('#matrix').append(table);
    $('.square__title').empty();
    $('.square__title').append("Квадрат Полибия");


    // перевод курсора в следующий инпут
    $('input[tabindex]').keyup(function(e) {

        if(e.keyCode === 8) {
            let newIndex = $(this).prop("tabindex") - 1;
            if($("input").is('input[tabindex= ' + newIndex + ']')) {
                $('input[tabindex=' + newIndex + ']').focus().select();
            }
        }

        else if ($(this).val().length !== 0) {
            let newIndex = $(this).prop("tabindex") + 1;
            if($("input").is('input[tabindex= ' + newIndex + ']')) {
                $('input[tabindex=' + newIndex + ']').focus().select();
            }

            /*else {
                $('input[tabindex=1]').focus().select();
            }*/
        }
    });
}

function createMatrixInputKey(_matrixKeyLen) {
    let collNum = _matrixKeyLen, rowNum = _matrixKeyLen, indexId = 1;

    console.log(collNum);
    console.log(rowNum);

    var table = $('<table class="key-matrix">');
    for(let i = 0; i < rowNum; i++) {
        let row = $('<tr>'), coll = "";
        for(let j = 0; j < collNum; j++) {

            coll += '<td><input type="text" class="main-input input-square" tabindex="' + indexId + '"></td>';
            indexId++;
        }
        row.append(coll);
        table.append(row);
    }

    var size = '<div style="margin-top: 20px"><div style="margin-top: 5px"><input type="text" placeholder="размер" class="main-input" id="key-matrix" style="width: 150px; margin-right: 15px; padding: 10px 20px"><button class="btn" id="change" style="padding: 10px 15px">изменить</button></div></div>';

    $('#matrix').empty();
    $('#matrix').append(table, size);
    $('.square__title').empty();
    $('.square__title').append("Ключ-матрица");

    // меняем значение размера матрицы
    $('#change').click(function() {
        matrixKeyLen = getValues(["key-matrix"]);
        console.log(getValues(["key-matrix"]));
        createMatrixInputKey(matrixKeyLen);

        // перевод курсора в следующий инпут
        $('input[tabindex]').keyup(function(e) {
            if(e.keyCode === 8) {
                if ($(this).val().length === 0) {
                    let newIndex = $(this).prop("tabindex") - 1;
                    if ($("input").is('input[tabindex= ' + newIndex + ']')) {
                        $('input[tabindex=' + newIndex + ']').focus().select();
                    }
                }
            }

            else if(e.keyCode === 13) {
                let newIndex = $(this).prop("tabindex") + 1;
                if($("input").is('input[tabindex= ' + newIndex + ']')) {
                    $('input[tabindex=' + newIndex + ']').focus().select();
                }
            }
        });

        // вводим только цифры
        $('.key-matrix input').on('keydown', function(e) {
            if(e.key.length === 1 && e.key.match(/[^0-9'"]/)){
                return false;
            }
        });
    });
}

// отрисовываем ключ для матричного шифра
function matrixInputKey() {
    createMatrixInputKey(matrixKeyLen);

    // перевод курсора в следующий инпут
    $('input[tabindex]').keyup(function(e) {
        if(e.keyCode === 8) {
            if ($(this).val().length === 0) {
                let newIndex = $(this).prop("tabindex") - 1;
                if ($("input").is('input[tabindex= ' + newIndex + ']')) {
                    $('input[tabindex=' + newIndex + ']').focus().select();
                }
            }
        }

        else if(e.keyCode === 13) {
            let newIndex = $(this).prop("tabindex") + 1;
            if($("input").is('input[tabindex= ' + newIndex + ']')) {
                $('input[tabindex=' + newIndex + ']').focus().select();
            }
        }
    });

    // вводим только цифры
    $('.key-matrix input').on('keydown', function(e) {
        if(e.key.length === 1 && e.key.match(/[^0-9'"]/)){
            return false;
        }
    });


}

function getValueFromSquare(_matrix) {
    let rows = $("#matrix table").children('tr').length;
    let colls = $("#matrix table tr:first-child").children('td').length;
    resizeMatrix(rows, colls, _matrix);

    let input;

    for(let i = 0; i < rows; i++) {
        for (let j = 0; j < colls; j++) {
            input = $("#matrix table tr:nth-child("+ (i+1) + ") td:nth-child("+ (j+1) + ") input");
            _matrix[i][j] = input.val();
        }
    }

    console.log(_matrix);
}

function createMatrixParams() {
    let Ti = '<div style="display: inline-block; padding-right: 10px;"><span class="title">T0 = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 50px;" id="Ti" tabindex="1"></div>';
    let a = '<div style="display: inline-block; padding-right: 10px;"><span class="title">a = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 50px;" id="a" tabindex="2"></div>';
    let c = '<div style="display: inline-block; padding-right: 10px;"><span class="title">c = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 50px;" id="c" tabindex="3"></div>';
    let m = '<div style="display: inline-block"><span class="title">m = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 50px;" id="m" tabindex="4"></div>';


    $('#keys').append(Ti, a, c, m);

    inputOnlyNumbers("Ti");
    inputOnlyNumbers("a");
    inputOnlyNumbers("c");
    inputOnlyNumbers("m");
}

function inputOnlyNumbers(id) {

    $('#' + id).on('keydown', function(e) {
        if(e.key.length === 1 && e.key.match(/[^0-9'"]/)){
            return false;
        }
    });

}

// решётка кардано
function createCardanoMatrix() {
    let collNum = 10, rowNum = 6, value = "", indexId = 1, n = 0;

    let table = $('<table>');
    for(let i = 0; i < rowNum; i++) {
        let row = $('<tr>'), coll = "";
        for(let j = 0; j < collNum; j++) {

            if (cardanoKey.indexOf(n) === -1) coll += '<td><input type="text" value ="' + value + '" class="main-input input-square" maxlength="1" disabled></td>';

            else {
                coll += '<td><input type="text" value ="' + value + '" class="main-input input-square" maxlength="1" tabindex="' + indexId + '"></td>';
                indexId++;
            }

            n++;
        }
        row.append(coll);
        table.append(row);
    }

    $('#matrix').empty();
    $('#matrix').append(table);
    // $('#matrix-block').append('<div><button class="result__copy">Перевернуть</button></div>');
    $('.square__title').empty();


    // перевод курсора в следующий инпут
    $('input[tabindex]').keyup(function(e) {

        if(e.keyCode === 8) {
            let newIndex = $(this).prop("tabindex") - 1;
            if($("input").is('input[tabindex= ' + newIndex + ']')) {
                $('input[tabindex=' + newIndex + ']').focus().select();
            }
        }

        else if ($(this).val().length !== 0) {
            let newIndex = $(this).prop("tabindex") + 1;
            if($("input").is('input[tabindex= ' + newIndex + ']')) {
                $('input[tabindex=' + newIndex + ']').focus().select();
            }

            /*else {
                $('input[tabindex=1]').focus().select();
            }*/
        }
    });
}

function createVerticalMatrix() {
    let collNum = 5, rowNum = 5,
        value = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'],
        indexId = 1, n = 0;

    let table = $('<table>');
    for (let i = 0; i < rowNum; i++) {
        let row = $('<tr>'), coll = "";
        for (let j = 0; j < collNum; j++) {

            coll += '<td style="padding: 5px; background: white; border-radius: 5px; text-align: center;"><span class="title" style="display: inline-block; width: 25px; height: 25px; padding-top: 3px;">' + value[n] + '</span></td>';
            indexId++;

            n++;
        }
        row.append(coll);
        table.append(row);
    }

    $('#matrix').empty().append(table);
}

function getDataFromCardanoMatrix() {
    let _matrix = [[],[]];

    let rows = $("#matrix table").children('tr').length;
    let colls = $("#matrix table tr:first-child").children('td').length;
    resizeMatrix(rows, colls, _matrix);

    let input;

    for(i=0; i<rows; i++) {
        for (j = 0; j < colls; j++) {
            input = $("#matrix table tr:nth-child("+ (i+1) + ") td:nth-child("+ (j+1) + ") input");
            _matrix[i][j] = input.val();
        }
    }

    console.log(_matrix);
}

function createGammingParams() {
    let S = '<div style="display: inline-block;"><input type="text" class="main-input" id="S" placeholder="Синхропосылка" style="width: 180px"></div>';
    let key = '<div style="display: inline-block; padding-right: 20px;"><input type="text" class="main-input" id="gammingKey" placeholder="Ключ" style="width: 170px"></div>';

    $('#keys').append(key, S);
}

function createRSAParams() {
    let P = '<div style="display: inline-block; padding-right: 10px;"><span class="title">P = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="P" tabindex="1"></div>';
    let Q = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Q = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="Q" tabindex="2"></div>';
    let D = '<div style="display: inline-block; padding-right: 10px;"><span class="title">D = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="D" tabindex="2"></div>';


    $('#keys').append(P, Q, D);

    inputOnlyNumbers("P");
    inputOnlyNumbers("Q");
    inputOnlyNumbers("D");
}

function createElgamalParams() {
    let p = '<div style="display: inline-block; padding-right: 10px;"><span class="title">p = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="p" tabindex="1"></div>';
    let x = '<div style="display: inline-block; padding-right: 10px;"><span class="title">x = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="x" tabindex="2"></div>';
    let g = '<div style="display: inline-block; padding-right: 10px;"><span class="title">g = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="g" tabindex="3"></div>';


    $('#keys').append(p, x, g);

    inputOnlyNumbers("p");
    inputOnlyNumbers("x");
    inputOnlyNumbers("g");
}

function createECCParams() {
    let p = '<div style="display: inline-block; padding-right: 10px;"><span class="title">p = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 60px;" id="p" tabindex="1"></div>';

    let Ep = '<div style="display: inline-block; padding-left: 15px;"><span class="title">y&#178; = x&#179; + </span><input type="text" class="main-input" style="padding: 5px 10px; width: 40px; text-align: center;" id="a" tabindex="3" placeholder="a"><span class="title"> x + </span><input type="text" class="main-input" style="padding: 5px 10px; width: 40px; text-align: center;" id="b" tabindex="4" placeholder="b"></div>';

    let Cb = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Cb = </span><input type="text" class="main-input" style="padding: 5px 10px; width: 45px; text-align: center;" id="Cb" tabindex="2"></div>';


    $('#keys').append(p, Cb, Ep);

    inputOnlyNumbers("p");
    inputOnlyNumbers("Cb");
    inputOnlyNumbers("a");
    inputOnlyNumbers("b");
}

function GOST94ParamsButtons() {
    $("#encrypt").empty().append("Сгенерировать");
    $("#decrypt").empty().append("Проверить");

    let p = '<div style="display: inline-block; padding-right: 10px;"><span class="title">p = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="p" tabindex="1"></div>';
    let q = '<div style="display: inline-block; padding-right: 10px;"><span class="title">q = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="q" tabindex="2"></div>';
    let a = '<div style="display: inline-block; padding-right: 10px;"><span class="title">a = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="a" tabindex="3"></div>';
    let x = '<div style="display: inline-block; padding-right: 10px;"><span class="title">x = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="x" tabindex="3"></div>';
    let y = '<div style="display: inline-block; padding-right: 10px;"><span class="title">y = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="y" tabindex="4"></div>';

    let r = '<div style="display: inline-block; padding-right: 10px;"><span class="title">r = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="r" tabindex="5"></div>';
    let s = '<div style="display: inline-block; padding-right: 10px;"><span class="title">s = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="s" tabindex="6"></div>';


    $('#keys').append(p, q, a, x, y);
    $('#result').append(r, s);

    inputOnlyNumbers("p");
    inputOnlyNumbers("q");
    inputOnlyNumbers("a");
    inputOnlyNumbers("x");
    inputOnlyNumbers("y");

    inputOnlyNumbers("r");
    inputOnlyNumbers("s");
}

function GOST12ParamsButtons() {
    $("#encrypt").empty().append("Сгенерировать");
    $("#decrypt").empty().append("Проверить");

    let p = '<div style="display: inline-block; padding-right: 10px;"><span class="title">p = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="p" tabindex="1"></div>';
    let xa = '<div style="display: inline-block; padding-right: 10px;"><span class="title">xa = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="xa" tabindex="2"></div>';
    let Ya = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Ya = (</span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="Ya1" tabindex="3"><span class="title">, </span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="Ya2" tabindex="4"><span class="title">)</span></div>';

    let Ep = '<div style="display: inline-block; padding-left: 15px;"><span class="title">y&#178; = x&#179; + </span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="a" tabindex="5" placeholder="a"><span class="title"> x + </span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="b" tabindex="6" placeholder="b"></div>';

    let r = '<div style="display: inline-block; padding-right: 10px;"><span class="title">r = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="r" tabindex="7"></div>';
    let s = '<div style="display: inline-block; padding-right: 10px;"><span class="title">s = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="s" tabindex="8"></div>';

    let G = '<div style="display: inline-block; padding-right: 10px;"><span class="title">G = (</span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="G1" tabindex="9"><span class="title">, </span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="G2" tabindex="10"><span class="title">)</span></div>';

    $('#keys').append(p, xa, Ya, Ep);
    $('#result').append(r, s, G);

    inputOnlyNumbers("p");
    inputOnlyNumbers("a");
    inputOnlyNumbers("b");
    inputOnlyNumbers("xa");
    inputOnlyNumbers("Ya1");
    inputOnlyNumbers("Ya2");

    inputOnlyNumbers("r");
    inputOnlyNumbers("s");
    inputOnlyNumbers("G1");
    inputOnlyNumbers("G2");
}

function rsaDigitalParamsButtons() {
    $("#encrypt").empty().append("Сгенерировать");
    $("#decrypt").empty().append("Проверить");

    let P = '<div style="display: inline-block; padding-right: 10px;"><span class="title">P = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="P" tabindex="1"></div>';
    let Q = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Q = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Q" tabindex="2"></div>';
    let E = '<div style="display: inline-block; padding-right: 10px;"><span class="title">E = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="E" tabindex="3"></div>';

    let S = '<div style="display: inline-block; padding-right: 10px;"><span class="title">S = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="S" tabindex="5"></div>';

    $('#keys').append(P, Q, E);
    $('#result').append(S);

    inputOnlyNumbers("P");
    inputOnlyNumbers("Q");
    inputOnlyNumbers("E");
    inputOnlyNumbers("S");
}

function elgamalDigitalParamsButtons() {
    $("#encrypt").empty().append("Сгенерировать");
    $("#decrypt").empty().append("Проверить");

    let P = '<div style="display: inline-block; padding-right: 10px;"><span class="title">P = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="P" tabindex="1"></div>';
    let x = '<div style="display: inline-block; padding-right: 10px;"><span class="title">x = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="X" tabindex="2"></div>';
    let y = '<div style="display: inline-block; padding-right: 10px;"><span class="title">y = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Y" tabindex="3"></div>';
    let g = '<div style="display: inline-block; padding-right: 10px;"><span class="title">g = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="G" tabindex="5"></div>';

    let S = '<div style="display: inline-block; padding-right: 10px;"><span class="title">S = (</span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="a" tabindex="3"><span class="title">, </span><input type="text" class="main-input" style="padding: 5px 5px; width: 35px; text-align: center;" id="b" tabindex="4"><span class="title">)</span></div>';

    $('#keys').append(P, x, y, g);
    $('#result').append(S);

    inputOnlyNumbers("P");
    inputOnlyNumbers("G");
    inputOnlyNumbers("X");
    inputOnlyNumbers("Y");
    inputOnlyNumbers("a");
    inputOnlyNumbers("b");
}

function diffieHellmanParamsButtons() {
    $("#encrypt").empty().append("Сгенерировать");
    $("#decrypt").empty().append("Проверить");

    let n = '<div style="display: inline-block; padding-right: 10px;"><span class="title">n = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="n" tabindex="1"></div>';
    let a = '<div style="display: inline-block; padding-right: 10px;"><span class="title">a = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="a" tabindex="2"></div>';
    let Ka = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Ka = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Ka" tabindex="3"></div>';
    let Kb = '<div style="display: inline-block; padding-right: 10px;"><span class="title">Kb = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Kb" tabindex="4"></div>';

    let Ya = '<div style="display: inline-block; padding-right: 10px; padding-top: 15px;"><span class="title">Ya = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Ya" tabindex="5"></div><br>';
    let Yb = '<div style="display: inline-block; padding-right: 10px; padding-top: 15px;"><span class="title">Yb = </span><input type="text" class="main-input" style="padding: 5px 5px; width: 45px;" id="Yb" tabindex="6"></div><br>';
    let sharedKey = '<div style="display: inline-block; padding-right: 10px; padding-top: 30px;"><span class="title">Общий секретный ключ: </span><input type="text" class="main-input" style="padding: 5px 5px; width: 60px;" id="sharedKey" tabindex="7"></div>';

    $('#keys').append(n, a, Ka, Kb);
    $('#result').append(Ya, Yb, sharedKey);

    inputOnlyNumbers("n");
    inputOnlyNumbers("a");
    inputOnlyNumbers("Ka");
    inputOnlyNumbers("Kb");
    inputOnlyNumbers("Ya");
    inputOnlyNumbers("Yb");
    inputOnlyNumbers("sharedKey");
}

