import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Authentication = () => {
	const classes = useStyles();
	const [validationError, setValidationError] = React.useState(null);
	const [number, setNumber] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [errMsg, setError] = React.useState(null);
	const [loadingMessage, setLoadingMessage] = React.useState(
		'Getting info...'
	);

	React.useEffect(() => {
		setLoading(true);
		axios
			.get('/api/v1/admin/features/auth-number')
			.then((res) => {
				setLoading(false);
				setError(null);
				const respdata = res.data;
				setNumber(respdata.data.authNumber);
			})
			.catch((err) => {
				setLoading(false);
				const errorResponse = err.response.data;
				setError(errorResponse.message);
			});
	}, []);

	const setAuthNumber = () => {
		setLoadingMessage('Saving changes...');
		setLoading(true);
		axios
			.get(`/api/v1/admin/features/set-auth-number/${number}`)
			.then((data) => {
				setLoading(false);
				setError(null);
			})
			.catch((err) => {
				setLoading(false);
				const errorResponse = err.response.data;
				setError(errorResponse.message);
			});
	};

	const saveNumber = () => {
		if (`${number}`.length !== 10) {
			return setValidationError('10 digits required');
		} else {
			setValidationError(null);
		}
		setAuthNumber();
	};

	return (
		<Box p={'1rem'}>
			<Backdrop
				className={classes.backdrop}
				open={loading}
				// onClick={handleClose}
			>
				{loadingMessage}
			</Backdrop>
			<Paper>
				<Box p="1rem">
					<h3>Authentication</h3>
					<p className="color-red">{errMsg}</p>
					<Grid container>
						<Grid item xs={12} lg={8}>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<div>OTP authentication number</div>
								<TextField
									error={!!validationError}
									id="standard-basic"
									label="number"
									variant="outlined"
									onChange={(e) => setNumber(e.target.value)}
									value={number}
									size="small"
									autoComplete
									type={'number'}
									helperText={validationError}
								/>
							</Box>
						</Grid>
					</Grid>
					<Box mt="1rem">
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={saveNumber}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default Authentication;
