import {
	Avatar,
	Button,
	createStyles,
	FileButton,
	Group,
	Modal,
	Text,
	UnstyledButton,
	TextInput,
	Grid,
	Stack,
} from "@mantine/core";
import {useState} from "react";
import {Check, Upload, X} from "tabler-icons-react";
import {createBackendContext} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import * as React from "react";

interface UserProp {
	username: string;
	email: string;
	avatar: string;
	setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = createStyles(theme => ({
	user: {
		display: `block`,
		padding: theme.spacing.sm,
		color: theme.colors.dark[0],
		borderRadius: theme.radius.md,
		"&:hover": {
			backgroundColor: theme.colors.dark[8],
		},
	},
}));

export default function User({username, email, avatar, setUserLoading}: UserProp) {
	const {classes} = useStyles();
	const [opened, setOpened] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const [_username, setUsername] = useState(``);

	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		if (!Boolean(_username)) return;

		setLoading(true);

		const ctx = createBackendContext();
		const res = await ctx.post(`user/username`, {username: _username})
			.catch(e => {
				if (!e.response.data.state) {
					showNotification({
						title: `Сервер не доступен`,
						message: `Попробуй попозже`,
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

		setLoading(false);
		setUserLoading(true);
		if (!res) return;

		showNotification({
			title: `Успешно`,
			message: `Имя пользователя изменено`,
			color: `green`,
			icon: <Check/>,
			disallowClose: true,
		});
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				withCloseButton={false}
			>
				<Grid>
					<Grid.Col span={3}>
						<Stack align="center" style={{width: `60px`}}>
							<Avatar src={avatar} size="lg" style={{marginLeft: `20px`}}/>
							<FileButton onChange={setFile} accept="image/png,image/jpeg">
								{(props) => <Button compact fullWidth style={{marginLeft: `20px`}} {...props}><Upload/></Button>}
							</FileButton>
						</Stack>
					</Grid.Col>
					<Grid.Col span={9}>
						<Stack align="center" spacing="xs">
							<TextInput
								size="md"
								style={{width: `100%`, marginTop: `8px`}}
								placeholder={`Изменить никнейм`}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Button onClick={onSubmit} loading={loading} fullWidth compact
							        style={{marginTop: `12px`}}><Check/></Button>
						</Stack>
					</Grid.Col>
				</Grid>

			</Modal>

			<UnstyledButton onClick={() => {
				setOpened(true);
			}} className={classes.user}>
				<Group>
					<Avatar src={avatar} radius="sm"/>
					<div style={{flex: 1}}>
						<Text size="sm" weight={500}>
							{username}
						</Text>
						<Text color="dimmed" size="xs">
							{email}
						</Text>
					</div>
				</Group>
			</UnstyledButton>
		</>
	);
}
