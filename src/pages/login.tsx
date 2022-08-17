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
	Checkbox,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
	useDocumentTitle(`Login`);
	const navigate = useNavigate();

	const toRegister = () => {
		navigate(`/register`);
	};

	const toForgotPassword = () => {
		navigate(`/password-forgot`);
	};

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
				<TextInput label="Почта" placeholder="твоя@почта.рф" required />
				<PasswordInput
					label="Пароль"
					placeholder="Твой пароль"
					required
					mt="md"
				/>
				<Group position="right" mt="md">
					<Anchor<`a`> onClick={toForgotPassword} href="#" size="sm">
						Забыл пароль?
					</Anchor>
				</Group>
				<Button fullWidth mt="xl">
					Войти
				</Button>
			</Paper>
		</Container>
	);
}
