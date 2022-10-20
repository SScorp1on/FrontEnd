import React, {useEffect, useState} from "react";
import {
	AppShell,
	Button,
	Group,
	Header,
	Footer,
	Center,
	Text,
	Modal,
	Textarea,
	Stack,
	Input
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import User from "../components/user";
import {At, Login, X} from "tabler-icons-react";
import {createBackendContext, updateTokens} from "../context/axios.context";
import BuyFramework from "../components/shop/buyFramework";
import {useDocumentTitle} from "@mantine/hooks";
import BuySofle from "../components/shop/buySofle";
import BuyLily from "../components/shop/buyLily";
import BuyHelix from "../components/shop/buyHelix";
import BuyErgodash from "../components/shop/buyErgodash";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function ShopPage() {
	useDocumentTitle(`Магазин`);

	const navigate = useNavigate();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [modalState, setModalState] = useState(false);

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
						updateUser().then();
					}
				});
			}
		});
	}, []);

	return (
		<>
			<Modal
				opened={modalState}
				onClose={() => setModalState(false)}
				withCloseButton={false}
				centered
			>
				<Stack align={`center`}>
					<Text color={`red`} weight={700} sx={{fontSize: 20}}>
						Не нашел подходящей клавиатуры?
					</Text>
					<Textarea
						placeholder={`Распиши свою идею или возможно ты уже видел где-то такую клавиатуру. Можешь 
						вставить ссылку на любой источник (Github, Reddit и так далее)`}
						autosize
						radius={`md`}
						style={({width: `90%`})}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<Input
						icon={<At color={`black`} size={20}/>}
						placeholder={`Твоя почта`}
						radius={`md`}
						style={{width: `90%`}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<Button
						fullWidth
						color={`red`}
						style={{width: `90%`}}
					>
						Отправить
					</Button>
				</Stack>
			</Modal>

			<AppShell
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				header={
					<Header height={70}>
						<Group position={`apart`}>
							<Stack
								style={{marginLeft: `15px`}}
							>
								<Text color={`red`} weight={700} size={28}>
									JOURLOY
								</Text>
								<Text color={`dimmed`} style={{marginLeft: `4px`, marginTop: `-25px`}}>
									Удобно и точка
								</Text>
							</Stack>
							<Group style={{marginRight: `5px`, marginBottom: `5px`}} position={`right`}>
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
						</Group>
					</Header>
				}
				footer={
					<Footer height={60}>
						<Group sx={{marginTop: 13, marginLeft: 13}} position={`center`} align={`center`}>
							<Button variant={`outline`}>Доставка</Button>
							<Button variant={`outline`}>Контакты</Button>
							<Button variant={`outline`}>Вакансии</Button>
							<Button variant={`outline`}>Возврат</Button>
						</Group>
					</Footer>
				}
			>
				<Group position="center" align={`top`} spacing={`xl`}>
					<BuyFramework/>
					<BuySofle/>
					<BuyLily/>
					<BuyHelix/>
					<BuyErgodash/>
				</Group>
				<Center>
					<Button
						onClick={() => setModalState(true)}
						style={{marginTop: `35px`}}
					>
						Не нашли что искали?
					</Button>
				</Center>
			</AppShell>
		</>
	);
}