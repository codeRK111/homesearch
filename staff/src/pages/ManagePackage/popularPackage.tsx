import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { asyncSetPopularPackage } from '../../API/package';

interface Props {
	mostPopular: boolean;
	id: string;
	onSuccess: () => void;
}

export default function MostPopularSwitch({
	mostPopular,
	id,
	onSuccess,
}: Props) {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [state, setState] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setLoading(true);
			await asyncSetPopularPackage(id, event.target.checked);
			setLoading(false);
			setState(event.target.checked);
			onSuccess();
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	React.useEffect(() => {
		setState(mostPopular);
	}, [mostPopular]);

	return (
		<>
			{loading ? (
				<CircularProgress size={15} color="inherit" />
			) : (
				<FormGroup row>
					<FormControlLabel
						control={
							<Switch
								checked={state}
								onChange={handleChange}
								name="checkedB"
								color="primary"
							/>
						}
						label="Most Popular"
					/>
				</FormGroup>
			)}
		</>
	);
}
