import {useState} from "react";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	Grid,
	UnstyledButton,
	Group,
	Avatar,
	createStyles,
	Button,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import { Login } from "tabler-icons-react";
import User from "../components/user";
import { useNavigate } from "react-router-dom";
import Link from "../components/link";
import TvApp from "../components/tvApp";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function Control() {
	useDocumentTitle(`Инструменты`);
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const [opened, setOpened] = useState(false);
	const [user, setUser] = useState<null | UserInterface>(null);
	const [page, setPage] = useState(``);

	const toLogin = () => {
		navigate(`/login`);
	};

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{sm: 200, lg: 300}}
				>
					<Link label="Films" IconProp="tv" setAppState={setPage} />
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					<div style={{display: `flex`, alignItems: `center`, height: `100%`}}>
						<MediaQuery largerThan="sm" styles={{display: `none`}}>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Group style={{width: `100%`}} position="right">
							{user ? (
								<>
									<User username={user.username} email={user.email} avatar={user.avatar} />
								</>
							) : (
								<>
									<Button onClick={toLogin} leftIcon={<Login />} variant="outline" radius="md" size="md" uppercase>
										Войти
									</Button>
								</>
							)}
						</Group>
					</div>
				</Header>
			}
		>
			{
				page === `tv` ? <TvApp /> : <></>
			}
		</AppShell>
	);
}
