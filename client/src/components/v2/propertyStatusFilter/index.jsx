import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useGlobalClasses from '../../../common.style';

export default function ToggleButtonSizes({ value, setValue }) {
	const gClasses = useGlobalClasses();
	const handleChange = (event, newAlignment) => {
		setValue(newAlignment);
	};

	return (
		<ToggleButtonGroup
			size="small"
			value={value}
			exclusive
			onChange={handleChange}
		>
			<ToggleButton value="all">
				<ViewComfyIcon
					fontSize="Active"
					className={gClasses.colorUtil}
				/>
			</ToggleButton>
			<ToggleButton value="active">
				<CheckCircleIcon className={gClasses.colorUtil} />
			</ToggleButton>

			<ToggleButton value="underScreening">
				<VisibilityIcon className={gClasses.colorUtil} />
			</ToggleButton>
			<ToggleButton value="expired">
				<EventBusyIcon className={gClasses.colorUtil} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
