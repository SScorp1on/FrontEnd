interface Keyboard {
	_id: string;
	name: string;
	description: string;
	githubURL: string;
	previewURL: string;
	price: number;
	priceOld: number;
	visible: boolean;
};

interface IProps {
	keyboard: Keyboard;
}

export default function KeyboardApp({keyboard}: IProps) {
	return (
		<>
		</>
	);
}