import React, {useEffect, useState} from "react";
import {
	AppShell,
	Button,
	Group,
	Header,
	Footer,
	Text,
	Modal,
	Textarea,
	Stack,
	Input,
	createStyles,
	Card, useMantineTheme
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {At, Login, X} from "tabler-icons-react";
import {createBackendContext, updateTokens} from "../context/axios.context";
import BuyFramework from "../components/shop/buyFramework";
import {useDocumentTitle} from "@mantine/hooks";
import BuySofle from "../components/shop/buySofle";
import BuyLily from "../components/shop/buyLily";
import BuyHelix from "../components/shop/buyHelix";
import BuyErgodash from "../components/shop/buyErgodash";
import HeaderComponent from "../components/shop/headerComponent";
import FooterComponent from "../components/shop/footerComponent";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

const useStyles = createStyles((theme, _params, getRef) => ({
	home: {
		marginTop: `10px`,
		color: `black`,
		fontWeight: 300,
		fontSize: 15,
		":hover": {
			color: `red`
		},
	}
}));

export default function ShopPage() {
	useDocumentTitle(`Магазин`);

	const navigate = useNavigate();
	const theme = useMantineTheme();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [modalState, setModalState] = useState(false);

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
					<Text color={`dark`} weight={700} sx={{fontSize: 20}}>
						Нет подходящей клавиатуры?
					</Text>
					<Textarea
						placeholder={`Распиши свою идею. Можешь 
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
						<HeaderComponent user={user} userLoading={userLoading} setUserLoading={setUserLoading}/>
					</Header>
				}
				footer={
					<Footer height={60}>
						<FooterComponent />
					</Footer>
				}
			>
				<Stack align={`center`}>
					
					<Group
						position="center"
						align={`top`}
						spacing={40}
						style={{
							maxWidth: `840px`,
							marginTop: `20px`
						}}
					>
						<BuyFramework/>
						<BuySofle/>
						<BuyLily/>
						<BuyHelix/>
						<BuyErgodash/>
					</Group>
					<Button
						variant={`outline`}
						onClick={() => setModalState(true)}
						style={{marginTop: `35px`, maxWidth: `300px`}}
					>
							Нет подходящей клавиатуры?
					</Button>
				</Stack>
			</AppShell>
		</>
	);
}