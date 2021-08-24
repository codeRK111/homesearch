exports.arrayUniq = function (a) {
	return a.sort().filter(function (item, pos, ary) {
		return !pos || item != ary[pos - 1];
	});
};
