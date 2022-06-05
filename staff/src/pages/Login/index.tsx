import { Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Loader from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { LoginTab } from './tab';
import { RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { asyncCPLogIn } from '../../API/chanel-partner';
import { asyncLogIn } from '../../API/auth';
import { useTypedSelector } from '../../hooks/useTypedSelector';

// import TextField from '@material-ui/core/TextField';

const SignIn: React.FC<RouteComponentProps> = ({ location }) => {
	const { signInStart, signInSuccess, signInError } = useRepositoryAction(
		ResourceType.Auth
	);
	const { CpsignInStart, CpSignInSuccess, CpSignInError } =
		useRepositoryAction(ResourceType.CP);

	const { loading, user, error } = useTypedSelector((state) => state.auth);
	const { cpLoading, cpError, cp } = useTypedSelector((state) => state.cp);

	// State
	const [input, setInput] = useState({
		username: '',
		password: '',
	});
	const [tab, setTab] = useState(0);

	// Callbacks

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('test');
		if (!input.username || !input.password) return;
		if (tab === 0) {
			try {
				CpSignInError('');
				signInStart();
				const staff = await asyncLogIn(input.username, input.password);
				signInSuccess(staff);
			} catch (err: any) {
				console.log(err);
				signInError(err.message);
			}
		} else {
			try {
				signInError('');
				CpsignInStart();
				const staff = await asyncCPLogIn(
					input.username,
					input.password
				);
				CpSignInSuccess(staff);
			} catch (err: any) {
				console.log(err);
				CpSignInError(err.message);
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			{user || cp ? (
				<></>
			) : (
				// <Redirect to={cp ? '/cp' : '/'} />
				<Box
					sx={{
						marginTop: 50,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Paper
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '1rem',
							borderRadius: 10,
						}}
						elevation={5}
					>
						<Avatar>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<LoginTab value={tab} setValue={setTab} />
						<Box component="form" onSubmit={handleSubmit}>
							<TextField
								margin="normal"
								required
								fullWidth
								label={tab === 0 ? 'Username' : 'Email'}
								name="username"
								autoComplete="username"
								value={input.username}
								onChange={handleChange}
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={input.password}
								onChange={handleChange}
							/>
							<Button
								type={'submit'}
								fullWidth
								variant="contained"
								disabled={loading}
								endIcon={
									loading || cpLoading ? (
										<Loader size={20} color={'inherit'} />
									) : (
										<></>
									)
								}
							>
								Sign In
							</Button>
						</Box>
					</Paper>
					{error && <Typography color={'error'}>{error}</Typography>}
					{cpError && (
						<Typography color={'error'}>{cpError}</Typography>
					)}
				</Box>
			)}
		</Container>
	);
};

export default SignIn;
