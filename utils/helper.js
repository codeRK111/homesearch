const prefix = {
	property: 'HSP',
	project: 'HSPR',
	default: 'HSI',
};

exports.idPrefix = prefix;

exports.arrayUniq = function (a) {
	return a.sort().filter(function (item, pos, ary) {
		return !pos || item != ary[pos - 1];
	});
};

exports.pad = function (n, length) {
	var len = length - ('' + n).length;
	return (len > 0 ? new Array(++len).join('0') : '') + n;
};
exports.numFromId = function (id, pr) {
	if (!id) return null;
	const array = id.split(pr);
	if (array.length !== 2) return null;
	if (Number(array[1]) !== NaN) {
		return Number(array[1]);
	}
};
