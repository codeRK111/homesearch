import { MyTableCell } from '../UI/Table';
import React from 'react';
import { toHumanReadable } from '../../utils/render';

interface IPriceRangeCell {
	minPrice?: number;
	maxPrice?: number;
}

const PriceRangeCell: React.FC<IPriceRangeCell> = ({ minPrice, maxPrice }) => {
	return (
		<MyTableCell>
			{minPrice ? <span>{toHumanReadable(minPrice)} to </span> : '-'}
			{maxPrice ? <span>{toHumanReadable(maxPrice)} </span> : '-'}
		</MyTableCell>
	);
};

export default PriceRangeCell;
