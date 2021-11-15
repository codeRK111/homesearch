import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { Box } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import RentApartment from '../../components/v2/propertyCard/rent/flat.component';
import RentHostel from '../../components/v2/propertyCard/rent/hostel.component';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './details.style';
import { useTheme } from '@material-ui/core/styles';

function App({ properties }) {
	const { wrapperClassName } = useStyles();

	const renderTypeRent = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return (
					<RentApartment
						data={property}
						showStatus={false}
						variant="small"
					/>
				);
			case 'hostel':
			case 'pg':
				return (
					<RentHostel
						data={property}
						showStatus={false}
						variant="small"
					/>
				);

			default:
				break;
		}
	};

	return (
		<ScrollMenu
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			wrapperClassName={wrapperClassName}
		>
			{properties.map((c) => (
				<Box key={c.id} p="1.3rem">
					{renderTypeRent(c)}
				</Box>
			))}
		</ScrollMenu>
	);
}

function LeftArrow() {
	const { scrollWrapper } = useStyles();
	const { isFirstItemVisible, scrollPrev } =
		React.useContext(VisibilityContext);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return isFirstItemVisible || matches ? (
		<></>
	) : (
		<div className={scrollWrapper} onClick={() => scrollPrev()}>
			<ChevronLeftIcon style={{ fontSize: 40 }} />
		</div>
	);
}

function RightArrow() {
	const { scrollWrapper } = useStyles();
	const { isLastItemVisible, scrollNext } =
		React.useContext(VisibilityContext);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return isLastItemVisible || matches ? (
		<></>
	) : (
		<div className={scrollWrapper} onClick={() => scrollNext()}>
			<ChevronRightIcon style={{ fontSize: 40 }} />
		</div>
	);
}

export default App;
