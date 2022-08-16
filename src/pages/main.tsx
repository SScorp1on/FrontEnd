import {AppShell, Header, Text, Group, Button, Box, Center} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function Main() {
	useDocumentTitle(`Jourloy`);
	const navigate = useNavigate();

	/**
	 * Navigate user to workstation page
	 */
	const toWorkstation = () => {
		navigate(`/workstation`);
	};

	/**
	 * Navigate user to tools page
	 */
	const toTools = () => {
		navigate(`/tools`);
	};

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			header={
				<Header height={70} p="md">
					<Group grow>
						<Button variant="subtle" color="gray" uppercase>Мастерская</Button>
						<Button variant="subtle" color="gray" uppercase></Button>
						<Button variant="subtle" color="gray" uppercase>Инструменты</Button>
					</Group>
				</Header>
			}
		>
			<Box>
				<Center>
					<div style={{ position: `absolute`, left: `50%`, top: `50%`,
						transform: `translate(-50%, -50%)`, display: `flex`, justifyContent: `space-between`, alignItems: `center`, width: `100%` }}>
						<Text style={{fontSize: `80pt`, marginLeft: `50px`}}>J</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`}}>U</Text>
						<Text style={{fontSize: `85pt`, transform: `rotate(180deg)`, marginTop: `10px`}}>R</Text>
						<Text style={{fontSize: `80pt`}}>L</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`, marginRight: `50px`}}>Y</Text>
					</div>
				</Center>
			</Box>
		</AppShell>
	);
}
