export type RemoveContactHandler = ({
	username,
	phone,
}: {
	username: string;
	phone: string;
}) => Promise<void>;
