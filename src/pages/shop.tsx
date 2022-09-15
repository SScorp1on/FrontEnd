import React, {useEffect, useState} from "react";
import {AppShell, Button, Group, Header, Text, Box, Loader, Center, Space, Stack} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import User from "../components/user";
import {Login, X} from "tabler-icons-react";
import {createBackendContext, updateTokens} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

interface KeyboardsInterface {
	name: string;
	description: string;
	inStock: number;
	waitingTime: number;
	price: number;
	oldPrice?: number;
	isSale: boolean;
	isSplit: boolean;
	isOrt: boolean;
}

export default function ShopPage() {
	const navigate = useNavigate();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [keyboards, setKeyboards] = useState<KeyboardsInterface[]>([]);
	const [keyboardsLoading, setKeyboardsLoading] = useState(true);

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
		updateUser().then(s => {
			if (!s) {
				updateTokens().then(_s => {
					if (_s) {
						updateUser();
					}
				});
			}
		});
	}, [userLoading]);

	useEffect(() => {
		setKeyboardsLoading(true);
		const keyboardCtx = createBackendContext();
		keyboardCtx.get(`keyboards/all`)
			.then(res => {
				const _keyboards = res.data;
				setKeyboards(_keyboards);
				setKeyboardsLoading(false);
			})
			.catch(e => {
				showNotification({
					title: `Сервер не доступен`,
					message: `Попробуй попозже`,
					color: `red`,
					icon: <X/>,
					disallowClose: true,
				});
			});
	}, []);

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			header={
				<Header height={70}>
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
				</Header>
			}
		>
			{keyboards.length === 0 ? (
				<Box style={{
					position: `absolute`, left: `50%`, top: `50%`,
					transform: `translate(-50%, -50%)`,
					width: `90%`
				}}>
					{keyboardsLoading ? (
						<Stack>
							<Center>
								<Text sx={{fontSize: `15pt`}}>
									Скребем по сусекам
								</Text>
							</Center>
							<Center>
								<Loader color="red" size="lg"/>
							</Center>
						</Stack>
					) : (
						<Text align="center" sx={{fontSize: `15pt`}}>
							Кажется тут ничего нет. Но скоро обязательно появится!
						</Text>
					)}
				</Box>
			) : (
				<>
					b
				</>
			)}
		</AppShell>
	);
}