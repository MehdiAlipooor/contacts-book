export type GenerateContractHandler = ({
	username,
	phone,
}: {
	username: string;
	phone: string;
}) => Promise<void>;
