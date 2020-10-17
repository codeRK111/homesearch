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
};

export default customTheme;
