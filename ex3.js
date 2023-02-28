'use strict';
class Product {
    constructor(name, price, quantity, description){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }

}
let products = []
products.push(new Product('kjlkjyhdgdgfd', 1, 200, 'jguyabc'))
products.push(new Product('llkjlkjjjh', 2, 4000, 'jhkhrynpo'))
products.push(new Product('iuiouiofdshs', 3, 30000, 'hjfabc'))
products.push(new Product('kljkljkjdjf', 4, 35000, 'filjabc'))
products.push(new Product('fdjlkklb', 5, 200, 'jhkhoibfhabc'))
products.push(new Product('jhlrlbl', 6, 2400, 'hfhkjrrtrrhk'))
products.push(new Product('kljkljdffddkjkj', 7, 1000, 'uabc'))
products.push(new Product('jhjkljbiofde', 8, 750, 'fdsvrtby'))
products.push(new Product('kljlkfdk', 9, 6000, 'sdfsbhffabc'))
products.push(new Product('jjkkytttttn', 10, 400, 'hhfbdabc'))
products.push(new Product('pipfdadgfgr', 11, 200, 'sfdsdabc'))
products.push(new Product('gfdfghfghfg', 12, 80, 'fsbsdfdst'))
products.push(new Product('ljjk', 13, 50, 'imyuyuytuytjgabc'))


function _filter(prod, arg, fltr, value) {
    if (fltr == '=') {
        return prod.filter(element => element[arg] == value);
    }
    else if (fltr == '>') {
        return prod.filter(element => element[arg] > value);
    }
    else if (fltr == '<') {
        return prod.filter(element => element[arg] < value);
    }
    else if (fltr == '>=') {
        return prod.filter(element => element[arg] >= value);
    }
    else if (fltr == '<=') {
        return prod.filter(element => element[arg] <= value);
    }
    else if (fltr == 'contains') {
        return prod.filter(element => element[arg].includes(value));
    }
    else if (fltr == 'starts') {
        return prod.filter(element => element[arg].slice(0, value.length) == value);
    }
    else if (fltr == 'ends') {
        return prod.filter(element => element[arg].slice(-value.length) == value);
    }
    return result;
}

function query(q) {
    let args = [];
    let results = products;
    q.split('&').forEach(element => args.push(element.split('-')));
    args.forEach(function(element) {
        if (element.length == 2) {
            if (element[0] == 'price' || element[0] == 'quantity') {
                let i = 0;
                while (i < element[1].length && !/^\d$/.test(element[1][i])) {
                    i++;
                }
                let sign = element[1].slice(0, i)
                let value = parseInt(element[1].slice(i))
                results = _filter(results, element[0], sign, value)
            }
            else {
                console.log('type error');
            }
        }
        else {
            if (element[0] == 'name' || element[0] == 'description') {
                results = _filter(results, element[0], element[1], element[2])
            }
            else {
                console.log('type error');
            }
        }
    })
    console.log(results)
}


exports.query = query;