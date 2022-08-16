import {
	createStyles,
	Paper,
	Title,
	Text,
	TextInput,
	Button,
	Container,
	Group,
	Anchor,
	Center,
	Box,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {IconArrowLeft} from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles(theme => ({
	title: {
		fontSize: 26,
		fontWeight: 900,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	controls: {
		[theme.fn.smallerThan(`xs`)]: {
			flexDirection: `column-reverse`,
		},
	},

	control: {
		[theme.fn.smallerThan(`xs`)]: {
			width: `100%`,
			textAlign: `center`,
		},
	},
}));

export function ForgotPassword() {
	const {classes} = useStyles();
	useDocumentTitle(`Forgot password`);
	const navigate = useNavigate();

	const toLogin = () => {
		navigate(`/login`);
	};

	return (
		<Container size={460} my={30}>
			<Title className={classes.title} align="center">
				Забыл пароль?
			</Title>
			<Text color="dimmed" size="sm" align="center">
				Введи почту чтобы получить ссылку для восстановления
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<TextInput label="Почта" placeholder="твоя@почта.рф" required />
				<Group position="apart" mt="lg" className={classes.controls}>
					<Anchor color="dimmed" size="sm" className={classes.control}>
						<Center inline>
							<IconArrowLeft size={12} stroke={1.5} />
							<Box onClick={toLogin} ml={5}>Вернуться на страницу входа</Box>
						</Center>
					</Anchor>
					<Button className={classes.control}>Сбросить</Button>
				</Group>
			</Paper>
		</Container>
	);
}
