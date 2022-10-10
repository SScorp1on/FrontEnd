import {
	AppShell,
	Aside,
	Burger,
	Footer,
	Header,
	MediaQuery,
	Navbar,
	useMantineTheme,
	Text,
	Loader, Stack, Button, Group
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import AdminMainApp from "../components/admin/adminMainApp";
import Link from "../components/link";
import {createBackendContext} from "../context/axios.context";
import {useNavigate} from "react-router-dom";
import User from "../components/user";
import {Login} from "tabler-icons-react";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function Admin() {
	const theme = useMantineTheme();
	const navigate = useNavigate();

	const [load, setLoad] = useState(true);
	const [opened, setOpened] = useState(false);

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [app, setApp] = useState(`keyboard`);

	const toLogin = () => {
		navigate(`/login`);
	};

	const updateUser = async () => {
		setUserLoading(true);
		const userCtx = createBackendContext();
		return await userCtx.get(`user`)
			.then(r => {
				const u: UserInterface = r.data;
				setUser(u);
				setUserLoading(false);
				return true;
			})
			.catch(e => {
				setUser(null);
				setUserLoading(false);
				return false;
			});
	};

	useEffect(() => {
		const adminContext = createBackendContext();
		adminContext.get(`admin`)
			.then(res => {
				setLoad(false);
				updateUser().then();
			})
			.catch(e => {
				navigate(`/login`);
			});
	}, []);

	if (load) return (
		<>
			<Stack>
				<Loader color="red" size={`lg`} />
				<Text>
					Проверка прав
				</Text>
			</Stack>
		</>
	);

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
					<Link IconProp={`keyboard`} label={`Клавиатуры`} setAppState={setApp} />
					<Link IconProp={`users`} label={`Пользователи`} setAppState={setApp} />
				</Navbar>
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

						<Group style={{width: `100%`}} position="right">
							{user ? (
								<>
									<User
										username={user.username}
										email={user.email}
										avatar={user.avatar}
										setUserLoading={setUserLoading}
									/>
								</>
							) : (
								<>
									<Button
										onClick={toLogin}
										leftIcon={<Login/>}
										variant="outline"
										radius="md"
										size="sm"
										uppercase
										loading={userLoading}
										sx={{marginTop: `15px`, marginRight: `15px`}}
									>
										Войти
									</Button>
								</>
							)}
						</Group>
					</div>
				</Header>
			}
		>
			<AdminMainApp appState={app} />
		</AppShell>
	);
}