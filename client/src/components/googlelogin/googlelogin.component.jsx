import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from '@material-ui/core';

const GoogleLoginComponent = () => {
	const responseGoogle = () => {};
	return (
		<GoogleLogin
			clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
			render={(renderProps) => (
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={renderProps.onClick}
				>
					login via google
				</Button>
			)}
			buttonText="Login"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		/>
	);
};

export default GoogleLoginComponent;
