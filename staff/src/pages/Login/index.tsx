import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Loader from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { asyncLogIn } from '../../API/auth';
import { useTypedSelector } from '../../hooks/useTypedSelector';

// import TextField from '@material-ui/core/TextField';

const SignIn: React.FC<RouteComponentProps> = ({ location }) => {
	const state: any = location.state;
	const { signInStart, signInSuccess, signInError } = useRepositoryAction(
		ResourceType.Auth
	);

	const { loading, user, error } = useTypedSelector((state) => state.auth);

	// State
	const [input, setInput] = useState({
		username: '',
		password: '',
	});

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
		try {
			signInStart();
			const staff = await asyncLogIn(input.username, input.password);
			signInSuccess(staff);
		} catch (err: any) {
			console.log(err);
			signInError(err.message);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			{user ? (
				<Redirect to={state ? state.from.pathname : '/'} />
			) : (
				<Box
					sx={{
						marginTop: 50,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Username"
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
								loading ? (
									<Loader size={20} color={'inherit'} />
								) : (
									<></>
								)
							}
						>
							Sign In
						</Button>
					</Box>
					{error && <Typography color={'error'}>{error}</Typography>}
				</Box>
			)}
		</Container>
	);
};

export default SignIn;
