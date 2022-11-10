import {
	Text,
	Box,
	Center,
	Stack,
	Button,
	useMantineTheme,
	Group,
	useMantineColorScheme
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {showNotification} from "@mantine/notifications";

export default function Main() {
	useDocumentTitle(`Jourloy`);

	const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const navigate = useNavigate();

	const [rColor, setRColor] = useState(theme.colors.red[7]);

	const onHoverKeyboardShop = () => {
		setRColor(theme.colors.red[7]);
		toggleColorScheme(`light`);
	};

	const onHoverCyberShop = () => {
		setRColor(theme.colors.grape[7]);
		toggleColorScheme(`dark`);
	};

	const toShop = () => {
		navigate(`/shop`);
	};

	const toCyberShop = () => {
		showNotification({
			title: `Скоро`,
			message: `На данный момент этот раздел находится в разработке`,
			radius: `md`,
			disallowClose: true,
			color: `grape`
		});
	};

	return (
		<div style={{
			position: `absolute`,
			left: `50%`,
			top: `50%`,
			transform: `translate(-50%, -50%)`,
			display: `flex`,
			justifyContent: `space-between`,
			alignItems: `center`,
			width: `100%`
		}}>
			<Stack style={{width: `100%`}} align={`center`}>
				<Group style={{maxWidth: `870px`, width: `100%`}} position={`apart`}>
					<Text style={{fontSize: `80pt`}}>J</Text>
					<Text style={{fontSize: `80pt`}}>O</Text>
					<Text style={{fontSize: `80pt`}}>U</Text>
					<Text style={{
						fontSize: `85pt`,
						transform: `rotate(180deg)`,
						marginTop: `10px`,
						color: rColor
					}}>R</Text>
					<Text style={{fontSize: `80pt`}}>L</Text>
					<Text style={{fontSize: `80pt`}}>O</Text>
					<Text style={{fontSize: `80pt`}}>Y</Text>
				</Group>
				<Group>
					<Button
						variant={`outline`}
						color={`red`}
						w={`200px`}
						onMouseOver={onHoverKeyboardShop}
						onClick={toShop}
					>
						Keyboard shop
					</Button>
					<Button
						variant={`outline`}
						color={`grape`}
						w={`200px`}
						onMouseOver={onHoverCyberShop}
						onClick={toCyberShop}
					>
						Cyber shop
					</Button>
				</Group>
			</Stack>
		</div>
	);
}
