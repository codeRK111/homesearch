import React from 'react';

interface Props {
	title: string;
	onClick: (val: any) => void;
}

const ProposalButton: React.FC<Props> = ({ title, onClick }) => {
	return <div>{title}</div>;
};

export default ProposalButton;
