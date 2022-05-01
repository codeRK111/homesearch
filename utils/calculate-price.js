const calculatePrice = (gst, price) => {
	if (!gst) return price;
	let igst = 0;
	let cgst = 0;
	let sgst = 0;
	if (gst.igst) {
		igst = price * (gst.igst / 100);
	}
	if (gst.cgst) {
		cgst = price * (gst.cgst / 100);
	}
	if (gst.sgst) {
		sgst = price * (gst.sgst / 100);
	}

	return Math.round(price + igst + cgst + sgst);
};

module.exports = calculatePrice;
