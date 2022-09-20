import {AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, useMantineTheme, Text} from "@mantine/core";
import {useState} from "react";
import AdminMainApp from "../components/adminMainApp";


export default function Admin() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [app, setApp] = useState(`keyboard`);

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === `dark` ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={
				<Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
					<Text>Application navbar</Text>
				</Navbar>
			}
			footer={
				<Footer height={60} p="md">
					Application footer
				</Footer>
			}
			header={
				<Header height={70} p="md">
					<div style={{ display: `flex`, alignItems: `center`, height: `100%` }}>
						<MediaQuery largerThan="sm" styles={{ display: `none` }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Text>Application header</Text>
					</div>
				</Header>
			}
		>
			<AdminMainApp appState={app} />
		</AppShell>
	);
}