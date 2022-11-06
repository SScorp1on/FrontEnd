import {
	Text,
	Box,
	Center,
	Stack,
	Button,
	useMantineTheme
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";

export default function Main() {
	useDocumentTitle(`Jourloy`);

	const theme = useMantineTheme();
	const navigate = useNavigate();

	const toShop = () => {
		navigate(`/shop`);
	};

	return (
		<Box>
			<Center>
				<Stack align={`center`} style={{width: `870px`}}>
					<div style={{
						position: `absolute`,
						left: `50%`,
						top: `50%`,
						transform: `translate(-50%, -50%)`,
						display: `flex`,
						justifyContent: `space-between`,
						alignItems: `center`,
						width: `870px`
					}}>
						<Text style={{fontSize: `80pt`, marginLeft: `50px`}}>J</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`}}>U</Text>
						<Text style={{
							fontSize: `85pt`,
							transform: `rotate(180deg)`,
							marginTop: `10px`,
							color: theme.colors.red[7]
						}}>R</Text>
						<Text style={{fontSize: `80pt`}}>L</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`, marginRight: `50px`}}>Y</Text>
					</div>
					<Button
						variant={`outline`}
						color={`red`}
						onClick={toShop}
						style={{
							marginTop: `90%`,
							width: `200px`,
						}}
					>
						Магазин
					</Button>
				</Stack>
			</Center>
		</Box>
	);
}
