import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const customTheme = {
	...theme,
	colorOne: '#8e44ad',
	colorTwo: '#27ae60',
	colorBG: '#ecf0f1',
	fontColor: '#707070',
};

export default customTheme;
