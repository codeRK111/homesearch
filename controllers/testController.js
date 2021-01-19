const catchAsync = require('./../utils/catchAsync');
const sendOtp = require('./../utils/sendOtp');

exports.otpTest = catchAsync(async (req, res, next) => {
	const result = await sendOtp('918458059528', '1234');
	console.log(result.data);
	res.send(result);
});
