import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
	Group,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {createBackendContext, updateTokens} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";
import * as React from "react";
import Cookie from "js-cookie";

export default function Login() {
	useDocumentTitle(`Вход`);
	const navigate = useNavigate();

	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);

	const [loading, setLoading] = useState(false);

	const toRegister = () => {
		navigate(`/register`);
	};

	const toForgotPassword = () => {
		navigate(`/password-forgot`);
	};

	const onSubmit = async () => {
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
		const response = await regContext.post(`auth/login`, {email: email, password: password})
			.catch(e => {
				if (!e.response.data.state) {
					showNotification({
						title: `Сервер не доступен`,
						message: `Попробуй попозже`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
				} else if (e.response.data.state === `USER_NOT_FOUND`) {
					showNotification({
						title: `Ошибка`,
						message: `Такой пользователь не найден`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
				} else if (e.response.data.state === `PASSWORD_INCORRECT`) {
					showNotification({
						title: `Ошибка`,
						message: `Пароль введен не верно`,
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
				С возвращением!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Еще нет аккаунта?{` `}
				<Anchor<`a`> href="#" size="sm" onClick={toRegister}>
					Регистрация
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Почта"
					placeholder="твоя@почта.рф"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					label="Пароль"
					placeholder="Твой пароль"
					required
					mt="md"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Group position="right" mt="md">
					<Anchor<`a`> onClick={toForgotPassword} href="#" size="sm">
						Забыл пароль?
					</Anchor>
				</Group>
				<Button onClick={onSubmit} fullWidth mt="xl">
					Войти
				</Button>
			</Paper>
		</Container>
	);
}
