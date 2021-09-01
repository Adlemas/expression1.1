const NF = require('./lib/nf.json');
const LF = require('./lib/lf.json');
const BF = require('./lib/bf.json');
const FF = require('./lib/ff.json');

const p1p5m4 = require('./lib/+1=+5-4.json')
const p2p5m3 = require('./lib/+2=+5-3.json')
const p3p5m2 = require('./lib/+3=+5-2.json')
const p4p5m1 = require('./lib/+4=+5-1.json')
const m1p4m5 = require('./lib/-1=+4-5.json')
const m2p3m5 = require('./lib/-2=+3-5.json')
const m3p2m5 = require('./lib/-3=+2-5.json')
const m4p1m5 = require('./lib/-4=+1-5.json')

rand_item = (arr) => {
    const array_length = arr.length
    return arr[Math.floor(Math.random() * arr.length)];
}

const nf_expression = (terms_length, min, max) => {
    const terms = []
    const max_num_len = String(max).length
    var curNum = 0
    var isFirst = true
    for (var i = 0; i < terms_length; i++) {
        var isHard = false
        var isAdditive = true
        var number = Math.floor(Math.random() * 3)
        if (number === 2) isAdditive = false
        if (curNum - min < min) {
            isAdditive = true
            isHard = true
        }
        else if (curNum + min > max) {
            isAdditive = false
            isHard = true
        }
        var term = nf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        if (!isAdditive && !isHard && curNum + term === 0) {
            isAdditive = true
            term = nf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        }
        isFirst = false
        curNum += term
        terms.push(term)
    }
    //console.log(terms)
    return terms
}

const nf_term = (num, isAdditive, max_num_len) => {
    var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
    var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var extraNum = rand_item(extraArr)
    var term = extraAdd ? String(extraNum) : ""

    const num_str = String(num)
    for (var digit_str of num_str) {
        var digit = Number(digit_str)
        const add_item = rand_item(NF['+'][digit])
        const minus_item = rand_item(NF['-'][digit])
        term += String(isAdditive ? add_item : minus_item)
    }

    return isAdditive ? Number(term) : -(Number(term));
}

const lf_expression = (terms_length, min, max) => {
    const terms = []
    const max_num_len = String(max).length
    var curNum = 0
    var isFirst = true
    for (var i = 0; i < terms_length; i++) {
        var isHard = false
        var isAdditive = true
        var number = Math.floor(Math.random() * 3)
        if (number === 2) isAdditive = false
        if (curNum - min < min) {
            isAdditive = true
            isHard = true
        }
        else if (curNum + min > max) {
            isAdditive = false
            isHard = true
        }
        var term = lf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        if (!isAdditive && !isHard && curNum + term === 0) {
            isAdditive = true
            term = lf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        }
        isFirst = false
        curNum += term
        terms.push(term)
    }
    //console.log(terms)
    return terms
}

const lf_term = (num, isAdditive, max_num_len) => {
    var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
    var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var extraNum = rand_item(extraArr)
    var term = extraAdd ? String(extraNum) : ""

    const num_str = String(num)
    for (var digit_str of num_str) {
        var digit = Number(digit_str)
        const add_item = rand_item(LF['+'][digit])
        const minus_item = rand_item(LF['-'][digit])
        term += String(isAdditive ? add_item : minus_item)
    }

    return isAdditive ? Number(term) : -(Number(term));
}

const bf_expression = (terms_length, min, max, isBiggerMax) => {
    const terms = []
    const max_num_len = String(max).length
    var curNum = 0
    var isFirst = true
    for (var i = 0; i < terms_length; i++) {
        var isHard = false
        var isAdditive = true
        var number = Math.floor(Math.random() * 3)
        if (number === 2) isAdditive = false
        if (curNum - min < min) {
            isAdditive = true
            isHard = true
        }
        else if (curNum + min > max && !isBiggerMax) {
            isAdditive = false
            isHard = true
        }
        var term = bf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        if (!isAdditive && !isHard && curNum + term === 0) {
            isAdditive = true
            term = bf_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        }
        isFirst = false
        curNum += term
        terms.push(term)
    }
    return terms
}

const bf_term = (num, isAdditive, max_num_len) => {
    var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
    var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var extraNum = rand_item(extraArr)
    var term = extraAdd ? String(extraNum) : ""

    var num_str = String(num)
    if (num_str.length > max_num_len) num_str = num_str.slice(num_str.length - max_num_len)
    if (Number(num_str) <= 0 && !isAdditive) isAdditive = true
    for (var digit_str of num_str) {
        var digit = Number(digit_str)
        const add_item = rand_item(BF['+'][digit])
        const minus_item = rand_item(BF['-'][digit])
        term += String(isAdditive ? add_item : minus_item)
    }

    return isAdditive ? Number(term) : -(Number(term));
}

const ff_expression = (terms_length, min, max, isBiggerMax) => {
    const terms = []
    const max_num_len = String(max).length
    var curNum = 0
    var isFirst = true
    for (var i = 0; i < terms_length; i++) {
        var isHard = false
        var isAdditive = true
        var number = Math.floor(Math.random() * 3)
        if (number === 2) isAdditive = false
        if (curNum - min < min) {
            isAdditive = true
            isHard = true
        }
        else if (curNum + min > max && !isBiggerMax) {
            isAdditive = false
            isHard = true
        }
        var term = ff_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        if (!isAdditive && !isHard && curNum + term === 0) {
            isAdditive = true
            term = ff_term(isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        }
        isFirst = false
        curNum += term
        terms.push(term)
    }
    //console.log(terms)
    return terms
}

const ff_term = (num, isAdditive, max_num_len) => {
    var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
    var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var extraNum = rand_item(extraArr)
    var term = extraAdd ? String(extraNum) : ""

    var num_str = String(num)
    if (num_str.length > max_num_len) num_str = num_str.slice(num_str.length - max_num_len)
    if (Number(num_str) <= 0 && !isAdditive) isAdditive = true
    for (var digit_str of num_str) {
        var digit = Number(digit_str)
        const add_item = rand_item(FF['+'][digit])
        const minus_item = rand_item(FF['-'][digit])
        term += String(isAdditive ? add_item : minus_item)
    }

    return isAdditive ? Number(term) : -(Number(term));
}

const sub_expression = (terms_length, min, max, sub_name) => {
    const terms = []
    const max_num_len = String(max).length
    var curNum = 0
    var isFirst = true
    for (var i = 0; i < terms_length; i++) {
        var isHard = false
        var isAdditive = true
        var number = Math.floor(Math.random() * 3)
        if (number === 2) isAdditive = false
        if (curNum - min < min) {
            isAdditive = true
            isHard = true
        }
        else if (curNum + min > max) {
            isAdditive = false
            isHard = true
        }
        var term = SUB_TERMS[sub_name](isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        if (!isAdditive && !isHard && curNum + term === 0) {
            isAdditive = true
            term = SUB_TERMS[sub_name](isFirst ? '0'.repeat(max_num_len) : curNum, isAdditive, max_num_len)
        }
        isFirst = false
        curNum += term
        terms.push(term)
    }
    return terms
}

const SUB_TERMS = {
    '+1=+5-4': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(p1p5m4['+'][digit])
            const minus_item = rand_item(p1p5m4['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '+2=+5-3': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(p2p5m3['+'][digit])
            const minus_item = rand_item(p2p5m3['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '+3=+5-2': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(p3p5m2['+'][digit])
            const minus_item = rand_item(p3p5m2['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '+4=+5-1': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(p4p5m1['+'][digit])
            const minus_item = rand_item(p4p5m1['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '-1=+4-5': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(m1p4m5['+'][digit])
            const minus_item = rand_item(m1p4m5['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '-2=+3-5': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(m2p3m5['+'][digit])
            const minus_item = rand_item(m2p3m5['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '-3=+2-5': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(m3p2m5['+'][digit])
            const minus_item = rand_item(m3p2m5['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
    '-4=+1-5': (num, isAdditive, max_num_len) => {
        var extraAdd = (String(num).length < max_num_len) && (Number(String(num)[String(num).length - 1]) === 9) && isAdditive
        var extraArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var extraNum = rand_item(extraArr)
        var term = extraAdd ? String(extraNum) : ""

        const num_str = String(num)
        for (var digit_str of num_str) {
            var digit = Number(digit_str)
            const add_item = rand_item(m4p1m5['+'][digit])
            const minus_item = rand_item(m4p1m5['-'][digit])
            term += String(isAdditive ? add_item : minus_item)
        }

        return isAdditive ? Number(term) : -(Number(term));
    },
}

const expression = (formula, terms_length, min, max, isBiggerMax) => {
    switch (formula) {
        case "NC":
        case "NF":
            return nf_expression(terms_length, min, max)
            break;
        case "LF":
            return lf_expression(terms_length, min, max)
            break;
        case "BF":
            return bf_expression(terms_length, min, max, isBiggerMax)
            break;
        case "FF":
            return ff_expression(terms_length, min, max, isBiggerMax)
            break;
        case "MIX":
            const formulas = ['NF', 'LF', 'BF', 'FF']
            const form = rand_item(formulas)
            //console.log(form);
            return expression(form, terms_length, min, max, isBiggerMax)
            break;
        case "+1=+5-4":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "-1=+4-5":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "+2=+5-3":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "-2=+3-5":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "+3=+5-2":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "-3=+2-5":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "+4=+5-1":
            return sub_expression(terms_length, min, max, formula)
            break;
        case "-4=+1-5":
            return sub_expression(terms_length, min, max, formula)
            break;
    }
}

module.exports = expression