import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const customTheme = {
	...theme,
	colorOne: '#8e44ad',
	colorTwo: '#27ae60',
	colorBG: '#ecf0f1',
	fontColor: '#707070',
	fontColorTwo: '#bdc3c7',
	fontColorThree: '#ecf0f1',
	bgColor: '#dfe6e9',
	appBarColor: '#f5f5f5',
	shadowColor: '#e0e0e0',
	primaryHeadingColor: '#224C7C',
	secondaryHeadingColor: '#398496',
	utilColor: '#2AAAAC',
	leftPadding: '10vw',
	leftPaddingMedium: '3vw',
};

export default customTheme;
