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
	Center,
	Select,
	useMantineTheme,
	Image,
	Divider,
	Space,
	createStyles,
} from "@mantine/core";
import {DiscountCheck, Truck, X} from "tabler-icons-react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createBackendContext, updateTokens} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Carousel} from "@mantine/carousel";
import HeaderComponent from "./headerComponent";
import FooterComponent from "./footerComponent";

interface IProps {
	keyboardName: string;
	price: number;
	description: JSX.Element;
	img: {image: string}[];
	split?: boolean;
	keyAmount: number,
	encoderAmount: number;
	connector: string;
	wireless: boolean;
}

interface IUser {
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

const formatter = new Intl.NumberFormat(`ru-RU`, {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function KeyboardPage(props: IProps) {
	useDocumentTitle(props.keyboardName);

	const navigate = useNavigate();
	const theme = useMantineTheme();
	const {classes} = useStyles();

	const [user, setUser] = useState<null | IUser>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [keycapColor, setKeycapColor] = useState(``);
	const [keycapText, setKeycapText] = useState(``);

	const slides = props.img.map((image, index) => (
		<Carousel.Slide key={index}>
			<Image src={image.image} width={600} height={450} radius={9} fit={`cover`}/>
		</Carousel.Slide>
	));

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
				const u: IUser = r.data;
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
						<HeaderComponent user={user} userLoading={userLoading} setUserLoading={setUserLoading}/>
					</Header>
				}
				footer={
					<Footer height={60}>
						<FooterComponent />
					</Footer>
				}
			>
				<Center>
					<Stack align={`center`}>
						<Group position={`center`} spacing={`xl`} style={{marginRight: `15px`}}>
							<Card
								style={{
									width: `600px`,
									height: `450px`
								}}
							>
								<Carousel
									loop
								>
									{slides}
								</Carousel>
							</Card>
							<Stack style={{height: `550px`}} justify={`center`}>
								<Center>
									<Stack align={`center`} spacing={1}>
										<Text color={`dark`} weight={700} sx={{fontSize: 35}}>{props.keyboardName}</Text>
										<Text style={{marginTop: `-10px`}}>{formatter.format(props.price)}</Text>
									</Stack>
								</Center>
								<Stack>
									<Select
										label={`Выбери маркировку на клавишах`}
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
											{value: `off`, label: `Без маркировки`},
											{value: `lat`, label: `Только английские`, disabled: true},
											{value: `cyr`, label: `Английские и русские`, disabled: true},
										]}
									/>
									<Select
										label={`Выбери цвет клавиш`}
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
											{value: `white`, label: `Белые`},
											{value: `black`, label: `Черные`, disabled: true},
										]}
									/>
								</Stack>
								<Stack align={`center`}>
									<Group position={`left`}>
										<Group>
											<Truck strokeWidth={1} style={{marginTop: `-40px`, marginLeft: `-10px`}}/>
											<Stack spacing={3} style={{marginLeft: `-10px`}}>
												<Text>
													Доставка:
												</Text>
												<Stack spacing={1}>
													<Text size={12}>От 30 дней</Text>
													<Text size={12}>Бесплатно</Text>
												</Stack>
											</Stack>
										</Group>
										<Group position={`left`}>
											<DiscountCheck strokeWidth={1} style={{marginTop: `-40px`}}/>
											<Stack spacing={3} style={{marginLeft: `-10px`, marginTop: `-20px`}}>
												<Text>
													Гарантия:
												</Text>
												<Stack spacing={1}>
													<Text size={12}>1 год</Text>
												</Stack>
											</Stack>
										</Group>
									</Group>
									<Button
										fullWidth
										color={`red`}
										onClick={onButtonClick}
									>
										Оформить
									</Button>
									<Divider color={`dark`} style={{width: `90%`, height: `5px`, marginTop: `10px`}}/>
									<Group spacing={3} align={`center`}>
										<Text size={12}>Нужна помощь?</Text>
										<Text size={12} component={`a`} color={`red`} variant={`link`}>Свяжись с нами</Text>
									</Group>
								</Stack>
							</Stack>
						</Group>
						<Divider
							my={`sm`}
							color={`dark`}
							style={{
								width: `840px`,
								height: `10px`,
								maxWidth: `840px`
							}}
						/>
						<Space h={`md`}/>
						<Group>
							{props.description}
						</Group>
						<Space h={`xs`}/>
						<Space h={`xs`}/>
						<Divider
							color={`dark`}
							style={{
								width: `840px`,
								height: `10px`,
								maxWidth: `840px`
							}}
						/>
						<Group position={`center`} spacing={100} style={{maxWidth: `600px`}}>
							<Stack align={`center`} spacing={`xs`}>
								<Text size={18} weight={600}>Характеристики</Text>
								<Stack spacing={1}>
									<Text size={14} color={`dimmed`}>Количество клавиш: {props.keyAmount}</Text>
									<Text size={14} color={`dimmed`}>Количество энкодеров: {props.encoderAmount}</Text>
									<Text size={14} color={`dimmed`}>Разъем: {props.connector}</Text>
									<Text size={14} color={`dimmed`}>Беспроводной режим: {props.wireless ? `Да` : `Нет`}</Text>
								</Stack>
							</Stack>
							<Stack align={`center`} spacing={`xs`}>
								<Text size={18} weight={600}>В наборе</Text>
								<Stack spacing={1}>
									<Text size={14} color={`dimmed`}>Клавиатура</Text>
									<Text size={14} color={`dimmed`}>
										{props.split ? `Провода: ` : `Провод: `}
										Type-C - USB
										{props.split ? `, TRRS` : ``}
									</Text>
									<Text size={14} color={`dimmed`}>Подарок</Text>
									<Text size={14} color={`dimmed`}>Скидка на следующую клавиатуру</Text>
								</Stack>
							</Stack>
						</Group>
					</Stack>
				</Center>
			</AppShell>
		</>
	);
}