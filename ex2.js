'use strict';
class bigNumber {
    constructor(initialNumber){
        this.number = [];
        this.sign = 1;
        this.rest = [];
        initialNumber = initialNumber.toString();
        if (initialNumber.charAt(0) === '-' || initialNumber.charAt(0) === '+') {
            this.sign = initialNumber.charAt(0) === '+' ? 1 : -1;
            initialNumber = initialNumber.substring(1);
        }
        for (let index = initialNumber.length - 1; index >= 0; index--) {
            if (/^\d$/.test(initialNumber[index])) {
                this.number.push(parseInt(initialNumber.charAt(index), 10));
            }
            else {
                console.log('#error')
                break
            }
        }
    }

    isZero() {
        for (let i = 0; i < this.number.length; i++) {
            if (this.number[i] !== 0) {
                return false;
            }
        }
        return true;
    }
    compare(b) {
        if (this.sign !== b.sign) {
            return this.sign;
        }
        this.deletezeros()
        if (this.number.length > b.number.length) {
            return this.sign;
        } else if (this.number.length < b.number.length) {
            return this.sign * (-1);
        }

        for (let i = this.number.length - 1; i >= 0; i--) {
            if (this.number[i] > b.number[i]) {
                return this.sign;
            } else if (this.number[i] < b.number[i]) {
                return this.sign * (-1);
            }
        }

        return 0;
    }

    deletezeros() {
        let i = this.number.length - 1;
        while (i >= 0 && this.number[i] == 0){
            this.number.pop();
            i--;
        }
        return this;
    }

    add(number) {
        let res = new bigNumber(0);
        if (this.sign !== number.sign) { //difference signs
            if (this.sign > 0) { //number1 > 0 and number2 < 0
                number.sign = 1;
                res = this.sub(number);
            }
            else { //number2 > 0 and number1 < 0
                this.sign = 1;
                res = number.sub(this);
            }
        }
        else{
            res.number = this.plus(number);
            res.sign = this.sign;
        }
        return res;
    }

    sub(number) {
        let res = new bigNumber(0);
        if (this.sign !== number.sign) {
            res.number = this.plus(number);
            res.sign = this.sign;
            return res;
        }
        res.number = this.compare(number) == this.sign ? this.minus(number) : number.minus(this)
        res.sign = this.sign * this.compare(number)
        if (this.sign < 0) {
            res.sign *= -1
        }
        return res;
    }

    plus(b) {
        let res = new bigNumber(0)
        let remainder = 0;
        let len = Math.max(this.number.length, b.number.length);
        res.number = this.number.slice();
        for (let i = 0; i < len || remainder > 0; i++) {
            res.number[i] = (remainder += (res.number[i] || 0) + (b.number[i] || 0)) % 10;
            remainder = Math.floor(remainder / 10);
        }
        return res.number;
    }

    minus(b) {
        let res = new bigNumber(0)
        let remainder = 0;
        let len = this.number.length;
        res.number = this.number.slice();
        for (let i = 0; i < len; i++) {
            res.number[i] -= (b.number[i] || 0) + remainder;
            res.number[i] += (remainder = (res.number[i] < 0) ? 1 : 0) * 10;
        }
        res.deletezeros()
        return res.number;
    }

    multiply(b) {
        let res = new bigNumber(0)
        let result = [];
        if (this.isZero() || b.isZero()) {
            return new bigNumber(0);
        }
        res.sign = this.sign * b.sign;
        for (let i = 0; i < this.number.length; i++) {
            for (let remainder = 0, j = 0; j < b.number.length || remainder > 0; j++) {
                result[i + j] = (remainder += (result[i + j] || 0) + this.number[i] * (b.number[j] || 0)) % 10;
                remainder = Math.floor(remainder / 10);
            }
        }
        res.number = result;
        return res;
    }

    divide(b) {
        console.log('error')
        let res = new bigNumber(0)
        let result = [];
        let rest = new bigNumber(0);

        // test if one of the numbers is zero
        if (b.isZero()) {
            res.number = undefined;
            return res;
        } else if (this.isZero()) {
            res.rest = [];
            return res;
        }

        res.sign = this.sign * b.sign;
        b.sign = 1;
        for (let i = this.number.length - 1; i >= 0; i--) {
            rest = rest.multiply(new bigNumber('10'));
            rest.number[0] = this.number[i];
            result[i] = 0;
            while (rest.compare(b) >= 0) {
                result[i]++;
                rest.number = rest.minus(b);
            }
        }
        res.rest = rest.number;
        res.number = result;
        res.deletezeros()
        return res;
    };


}

function operation(num1, num2, operand) {
    let result;
    let first = new bigNumber(num1);
    let second = new bigNumber(num2);
    // console.log(first, second)
    if (operand === '-') {
        console.log('1')
        result = first.sub(second)
    }
    if (operand === '+') {
        console.log('1')
        result = first.add(second)
    }
    if (operand === '*') {
        console.log('1')
        result = first.multiply(second)
    }
    if (operand === '/') {
        console.log('1')
        result = first.divide(second)
    }
    let outputArr = result.number.slice().reverse();
    let outputStr = '';
    outputArr.forEach(element => outputStr += element);
    if (result.sign == -1) {
        outputStr = '-'+outputStr;
    }
    console.log(outputStr)
    if (result.rest.length > 0) {
        let restArr = result.rest.slice().reverse();
        let restStr = '';
        restArr.forEach(element => restStr += element);
        console.log('rest: ', restStr)
    }
}
exports.operation = operation;