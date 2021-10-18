import { Ptype } from '../../../../model/property.interface';
import React from 'react';
import RentApartmentDetails from './apartment';
import RentHostelDetails from './hostel';

interface IRentDetailsWrapper {
	type?: Ptype | string;
	onSubmit: (values: any) => void;
	onBack: () => void;
}

const RentDetailsWrapper: React.FC<IRentDetailsWrapper> = ({
	type,
	onSubmit,
	onBack,
}) => {
	return type ? (
		<div>
			{(() => {
				switch (type) {
					case Ptype.Apartment:
					case Ptype.Villa:
						return (
							<RentApartmentDetails
								onSubmit={onSubmit}
								onBack={onBack}
								pType={type}
							/>
						);
					case Ptype.Hostel:
					case Ptype.PG:
						return (
							<RentHostelDetails
								onSubmit={onSubmit}
								onBack={onBack}
								pType={type}
							/>
						);

					default:
						break;
				}
			})()}
		</div>
	) : (
		<></>
	);
};

export default RentDetailsWrapper;
