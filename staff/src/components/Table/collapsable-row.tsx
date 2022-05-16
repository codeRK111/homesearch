import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
			// width: '100%',
		},
	},
});

interface ICollapsableRow {
	element: React.ReactNode;
	selectedId: string;
	setSelectedId: (id: string) => void;
	id: string;
}

export const CollapsableRow: React.FC<ICollapsableRow> = (props) => {
	const { element, children, selectedId, setSelectedId, id } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => {
							if (id === selectedId) {
								setSelectedId('');
							} else {
								setSelectedId(id);
							}
						}}
					>
						{id === selectedId ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<>{element}</>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse
						in={id === selectedId}
						timeout="auto"
						unmountOnExit
					>
						<Box margin={1}>{children}</Box>
						<Box margin={1}>
							<IconButton onClick={() => setSelectedId('')}>
								<KeyboardArrowUpIcon />
							</IconButton>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};
