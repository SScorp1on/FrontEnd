import {
	Text,
	Box,
	Center
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

export default function Main() {
	useDocumentTitle(`Jourloy`);

	return (
		<Box>
			<Center>
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
						color: `red`
					}}>R</Text>
					<Text style={{fontSize: `80pt`}}>L</Text>
					<Text style={{fontSize: `80pt`}}>O</Text>
					<Text style={{fontSize: `80pt`, marginRight: `50px`}}>Y</Text>
				</div>
			</Center>
		</Box>
	);
}
