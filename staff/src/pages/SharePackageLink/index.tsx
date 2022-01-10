import {
	Box,
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import Loader from '../../components/Loader';
import { PackageDetails } from '../../model/package.interface';
import { asyncGetActivePackages } from '../../API/package';
import { makeStyles } from '@material-ui/core/styles';
import { toHumanReadable } from '../../utils/render';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const useStyles = makeStyles((theme) => ({
	linkWrapper: {
		width: 600,
		padding: '1rem',
		background: '#cccccc',
	},
	copyButton: {
		border: 'none',
		background: theme.palette.primary.main,
		color: '#ffffff',
		cursor: 'pointer',
	},
}));

const SharePackageLinkPage = () => {
	const { linkWrapper, copyButton } = useStyles();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [isCopied, setIsCopied] = useState(false);
	const { user } = useTypedSelector((state) => state.auth);
	const [link, setLink] = useState('');
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [activePackages, setActivePackages] = useState<Array<PackageDetails>>(
		[]
	);

	const fetchPackages = useCallback(async () => {
		try {
			setLoading(true);
			const res = await asyncGetActivePackages();
			setActivePackages(res);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const onGenerate = () => {
		let url = `https://homesearch18.com/confirm-package/${value}?hs=${user?.id}`;
		setLink(url);
	};

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);
	useEffect(() => {
		setLink('');
		setIsCopied(false);
	}, [value]);
	return (
		<Container>
			<Loader open={loading} />
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom>
					Share Package Link
				</Typography>
				<Box mt="1rem">
					<FormControl component="fieldset">
						<FormLabel component="legend">
							Choose the package you want to share
						</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={value}
							onChange={handleChange}
						>
							{activePackages.map((c) => (
								<FormControlLabel
									key={c.id}
									value={c.id}
									control={<Radio />}
									label={`${c.name} (${toHumanReadable(
										c.price
									)})`}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Box>
				<Box mt="1rem">
					<Button
						variant="contained"
						color="primary"
						size="large"
						disabled={!value}
						onClick={onGenerate}
					>
						Generate Link
					</Button>
				</Box>
				{link && (
					<Box display="flex" mt="1rem">
						<Box className={linkWrapper}>{link}</Box>
						<button
							className={copyButton}
							onClick={() => {
								navigator.clipboard.writeText(link);
								setIsCopied(true);
							}}
						>
							{isCopied ? 'Copied!' : 'Copy'}
						</button>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default SharePackageLinkPage;
