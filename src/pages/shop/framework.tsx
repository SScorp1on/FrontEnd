import {useDocumentTitle} from "@mantine/hooks";
import {
	AppShell,
	Button,
	Footer,
	Group,
	Header,
	Stack,
	Text,
	Card,
	Box, Center, Space, Select, Textarea, useMantineTheme, Image, createStyles,
} from "@mantine/core";
import {At, Ce, Login, X} from "tabler-icons-react";
import User from "../../components/user";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createBackendContext, updateTokens} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Carousel} from "@mantine/carousel";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

const formatter = new Intl.NumberFormat(`ru-RU`, {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

const img = [
	{image: `https://github.com/stevennguyen/framework/blob/master/images/1.jpg?raw=true`},
	{image: `https://github.com/stevennguyen/framework/blob/master/images/2.jpg?raw=true`},
	{image: `https://github.com/stevennguyen/framework/blob/master/images/3.jpg?raw=true`},
	{image: `https://github.com/stevennguyen/framework/blob/master/images/4.jpg?raw=true`},
];

const slides = img.map((image, index) => (
	<Carousel.Slide key={index}>
		<Image src={image.image} width={500} height={400} radius={9} fit={`cover`}/>
	</Carousel.Slide>
));

const cableTypesGet = (cableType: `typeC` | `microUSB`, wireless?: boolean) => {
	const label = cableType === `typeC` ? `Type-C` : `MicroUSB`;
	const arr = [
		{value: `${cableType}-typeC`, label: `${label} - TypeC`},
		{value: `${cableType}-usb`, label: `${label} - USB`},
	];
	if (wireless) arr.push({value: `wireless`, label: `Беспроводная`});
	return arr;
};

const keycapTextCard = (keycapText: string) => {
	let r = [`J`, `О`];
	if (keycapText === `lat`) r = [`J`];
	if (keycapText === `off`) r = [``];
	return r;
};

export default function FrameworkPage() {
	useDocumentTitle(`Framework`);

	const navigate = useNavigate();
	const theme = useMantineTheme();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [switchColor, setSwitchColor] = useState(``);
	const [keycapColor, setKeycapColor] = useState(``);
	const [keycapText, setKeycapText] = useState(``);
	const [cableType, setCableType] = useState(``);
	const [keyboardMaster, setKeyboardMaster] = useState(false);

	const data = cableTypesGet(`typeC`, false);
	const totalPrice = 9990 + (cableType === `wireless` ? 3000 : 0);

	const onButtonClick = () => {
		showNotification({
			title: `Извини`,
			message: `Сейчас мы не готовы принять заказ`,
			color: `red`,
			icon: <X/>,
			disallowClose: true,
		});
	};

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
				<Center>
					<Stack align={`center`}>
						<Space h={`xl`}/>
						<Group position={`center`} spacing={`xl`}>
							<Card
								style={{
									width: `550px`,
									height: `400px`
								}}
							>
								<Carousel
									loop
								>
									{slides}
								</Carousel>
							</Card>
							<Box style={{height: `550px`}}>
								<Center>
									<Text color={`dark`} weight={700} sx={{fontSize: 35}}>Framework</Text>
								</Center>
								<Space h={`xl`}/>
								<Stack style={{height: `320px`}} justify={`center`}>
									<Select
										label={`Выберите маркировку на клавишах`}
										defaultValue={`off`}
										onChange={(e) => setKeycapText(e || `off`)}
										styles={(theme) => ({
											input: {
												borderColor: theme.colors.dark[7],
												'&:hover': {borderColor: theme.colors.red},
												'&:focus': {borderColor: theme.colors.red},
											},
											item: {
												'&[data-selected]': {
													'&, &:hover': {
														backgroundColor: theme.colors.red,
														color: `white`,
													},
												},
											},
										})}
										data={[
											{value: `off`, label: `Без букв`},
											{value: `lat`, label: `Только английские буквы`},
											{value: `cyr`, label: `Английские и русские буквы`},
										]}
									/>
									{!keyboardMaster ?
										<>
											<Group position={`center`}>
												<Button
													size={`xs`}
													variant={`outline`}
													onClick={() => setKeyboardMaster(true)}
												>Я разбираюсь в клавиатурах</Button>
											</Group>
										</> :
										<>
											<Select
												label={`Выберите цвет свитчей`}
												defaultValue={`brown`}
												onChange={(e) => setSwitchColor(e || `brown`)}
												styles={(theme) => ({
													input: {
														borderColor: theme.colors.dark[7],
														'&:hover': {borderColor: theme.colors.red},
														'&:focus': {borderColor: theme.colors.red},
													},
													item: {
														'&[data-selected]': {
															'&, &:hover': {
																backgroundColor: theme.colors.red,
																color: `white`,
															},
														},
													},
												})}
												data={[
													{value: `brown`, label: `Коричневые`},
													{value: `red`, label: `Красные`},
													{value: `yellow`, label: `Желтые`},
													{value: `blue`, label: `Голубые`},
													{value: `white`, label: `Белые`},
												]}
											/>
											<Select
												label={`Выберите цвет клавиш`}
												defaultValue={`white`}
												onChange={(e) => setKeycapColor(e || `white`)}
												styles={(theme) => ({
													input: {
														borderColor: theme.colors.dark[7],
														'&:hover': {borderColor: theme.colors.red},
														'&:focus': {borderColor: theme.colors.red},
													},
													item: {
														'&[data-selected]': {
															'&, &:hover': {
																backgroundColor: theme.colors.red,
																color: `white`,
															},
														},
													},
												})}
												data={[
													{value: `red`, label: `Красные`},
													{value: `yellow`, label: `Желтые`},
													{value: `green`, label: `Зеленые`},
													{value: `blue`, label: `Синие`},
													{value: `purple`, label: `Фиолетовые`},
													{value: `white`, label: `Белые`},
													{value: `black`, label: `Черные`},
												]}
											/>
											<Select
												label={`Выберите тип кабеля`}
												onChange={(e) => setCableType(e || ``)}
												styles={(theme) => ({
													input: {
														borderColor: theme.colors.dark[7],
														'&:hover': {borderColor: theme.colors.red},
														'&:focus': {borderColor: theme.colors.red},
													},
													item: {
														'&[data-selected]': {
															'&, &:hover': {
																backgroundColor: theme.colors.red,
																color: `white`,
															},
														},
													},
												})}
												data={data}
											/>
											<Center>
												<Button
													size={`xs`}
													variant={`outline`}
													onClick={() => setKeyboardMaster(false)}
												>Я не разбираюсь в клавиатурах</Button>
											</Center>
										</>
									}
								</Stack>
								<Space h={`xs`}/>
								<Stack align={`center`} sx={{marginTop: `40px`}}>
									<Text color={`dark`} weight={700} sx={{fontSize: 18, marginTop: `-15px`}}>
										Время ожидания: 30 дней
									</Text>
									<Text variant={`link`} color={`red`} component={`a`} href={`/shop/waiting`}
									      sx={{fontSize: 12, marginTop: `-20px`}}>
										Почему нужно ждать?
									</Text>
									<Button
										fullWidth
										color={`dark`}
										onClick={onButtonClick}
									>
										Купить за {formatter.format(10990)}
									</Button>
								</Stack>
							</Box>
						</Group>
					</Stack>
				</Center>
			</AppShell>
		</>
	);
}