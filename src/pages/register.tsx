import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../constants/other";
import {createBackendContext, updateTokens} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";
import * as React from "react";
import Cookie from "js-cookie";

export default function Register() {
	useDocumentTitle(`Register`);
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>(``);
	const [password, setPassword] = useState<string>(``);

	const [emailError, setEmailError] = useState<string>(``);
	const [passwordError, setPasswordError] = useState<string>(``);

	const [loading, setLoading] = useState(false);

	const toLogin = () => {
		navigate(`/login`);
	};

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!EMAIL_REGEX.test(e.target.value)) {
			setEmailError(`Нужна настоящая почта`);
		} else {
			setEmailError(``);
			setEmail(e.target.value);
		}
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!PASSWORD_REGEX.test(e.target.value)) {
			setPasswordError(`Минимум 8 символов, из них 1 буква и 1 цифра`);
		} else {
			setPasswordError(``);
			setPassword(e.target.value);
		}
	};

	const onSubmit = async () => {
		if (Boolean(emailError) || Boolean(passwordError)) return;
		if (!Boolean(email) || !Boolean(password)) {
			showNotification({
				message: `Нужно ввести данные`,
				color: `red`,
				icon: <X/>,
				disallowClose: true,
			});
			return;
		}

		setLoading(true);

		const regContext = createBackendContext();
		const response = await regContext.post(`auth/register`, {email: email, password: password})
			.catch(e => {
				if (!e.response.data.state) {
					showNotification({
						title: `Сервер не доступен`,
						message: `Попробуй попозже`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
				} else if (e.response.data.state === `EMAIL_ALREADY_USED`) {
					showNotification({
						title: `Ошибка пользователя`,
						message: `Эта почта уже используется`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
				} else {
					console.log(e.response);
					showNotification({
						title: `Ошибка сервера`,
						message: `Попробуй попозже`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
				}
			});

		if (!response) {
			setLoading(false);
			return;
		}

		showNotification({
			title: `Успешно`,
			message: `Добро пожаловать`,
			color: `green`,
			icon: <Check/>,
			disallowClose: true,
		});

		Cookie.set(`access`, response.data.access);
		localStorage.setItem(`refresh`, response.data.refresh);

		navigate(`/shop`);

		setLoading(false);
	};

	useEffect(() => {
		updateTokens()
			.then(state => {
				if (state) navigate(`/shop`);
			})
			.catch(() => null);
	}, []);

	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={theme => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Привет!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Уже есть аккаунт?{` `}
				<Anchor<`a`> href="#" size="sm" onClick={toLogin}>
					Войти
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Почта"
					placeholder="твоя@почта.рф"
					onChange={onEmailChange}
					error={emailError}
					required
				/>
				<PasswordInput
					label="Пароль"
					placeholder="Твой пароль"
					required
					mt="md"
					onChange={onPasswordChange}
					error={passwordError}
				/>
				<Button onClick={onSubmit} loading={loading} fullWidth mt="xl">
					Регистрация
				</Button>
			</Paper>
		</Container>
	);
}
