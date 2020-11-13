import { Box, Button, Divider, Paper } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/footer/footer.component';
import PostPropertyInfo from '../../components/postPropertyInfo/postPropertyInfo.component';
import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import useStyles from './postProperty.styles';

const PostProperty = () => {
	const classes = useStyles();
	const history = useHistory();
	const [propertyFor, setPropertyFor] = React.useState('');
	const [propertyType, setPropertyType] = React.useState('');
	const onPropertyForChange = (name) => setPropertyFor(name);
	const onPropertyTypeChange = (name) => setPropertyType(name);
	const redirectToInfoPage = (_) =>
		history.push(`/post-property-details/${propertyFor}/${propertyType}`);

	const renderTypes = () => {
		let arr = [
			{
				label: 'Apartment',
				name: 'flat',
				icon: <FontAwesomeIcon icon={faBuilding} />,
			},
			{
				label: 'Independent House',
				name: 'independenthouse',
				icon: <FontAwesomeIcon icon={faBuilding} />,
			},
		];
		if (propertyFor === 'rent') {
			arr = [
				...arr,
				{
					label: 'Hostel',
					name: 'hostel',
					icon: <FontAwesomeIcon icon={faBuilding} />,
				},
				{
					label: 'PG',
					name: 'pg',
					icon: <FontAwesomeIcon icon={faBuilding} />,
				},
			];
		} else {
			arr = [
				...arr,
				{
					label: 'Land',
					name: 'land',
					icon: <FontAwesomeIcon icon={faBuilding} />,
				},
			];
		}

		return arr;
	};

	React.useEffect(() => {
		setPropertyType('');
	}, [propertyFor]);
	return (
		<div>
			<AppBar />
			<Box
				mt="5rem"
				mb="5rem"
				width="100%"
				display="flex"
				justifyContent="center"
			>
				<Paper className={classes.wrapper} elevation={1}>
					<PostPropertyInfo
						text="Post property For ?"
						disable={false}
						onChange={onPropertyForChange}
						value={propertyFor}
						buttons={[
							{
								label: 'Rent',
								name: 'rent',
								icon: <FontAwesomeIcon icon={faBuilding} />,
							},
							{
								label: 'Resale',
								name: 'sale',
								icon: <FontAwesomeIcon icon={faBuilding} />,
							},
						]}
					/>
					<Box mt="2rem" mb="2rem">
						<Divider />
					</Box>
					<Box>
						<PostPropertyInfo
							text="Please Select Property type"
							disable={!propertyFor ? true : false}
							onChange={onPropertyTypeChange}
							value={propertyType}
							buttons={renderTypes()}
						/>
					</Box>
					<Box mt="5rem" width="100%">
						<Button
							fullWidth
							color="primary"
							variant="contained"
							size="large"
							disabled={!propertyFor || !propertyType}
							onClick={redirectToInfoPage}
						>
							Next
						</Button>
					</Box>
				</Paper>
			</Box>
			<Footer />
		</div>
	);
};

export default PostProperty;
