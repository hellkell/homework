function lowerCase(str) {
	if (typeof str === 'string'){
		str = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
		return str;
	}
}

function fixString(str) {
	res = str.replace(/ +/g, ' ').trim().replace(/ +(\.|,|;|\?|!)/g, "$1");
	return res;
}

function wordCount(str) {
	let counter = 0;
	res = ' ' + str;
    res.replace(/(\s[A-Za-zА-Яа-я])/g, function() {
       counter++;
    });
    return counter;
}

function uniqueWordCount(str) {
	let startPos = 0;
	let endPos = 0;
	let res = [];
	let i = 0;
	let newUnique = true;
	str = ' ' + str.toLowerCase() + ' ';
	do {
		startPos = str.search(/(\s[A-Za-zА-Яа-я])/g);
		endPos = str.search(/([A-Za-zА-Яа-я]\s)/g);
		let current = str.slice(startPos + 1, endPos + 1);
		let counter = 0;
		let k = 0;
		while (str.indexOf(current, k) > 0) {
			let a = str.indexOf(current, k);
			if (!/^[A-Za-zА-яа-я]+$/.test(str[a - 1]) && !/^[A-Za-zА-яа-я]+$/.test(str[a + endPos - startPos])) {
				str = str.replace(str[a - 1] + current + str[a + endPos - startPos], ' ')
				counter++;
			}
			else {
				k = str.indexOf(current, k) + endPos - startPos;
			}
		}
		if (startPos == -1) {
			newUnique = false;
		}
		else {
			res[current] = counter;
		}
	} while (newUnique);
	return res;
}

exports.lowerCase = lowerCase;
exports.fixString = fixString;
exports.wordCount = wordCount;
exports.uniqueWordCount = uniqueWordCount;