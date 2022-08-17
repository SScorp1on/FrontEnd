import {
	Avatar,
	Button,
	createStyles,
	FileButton,
	Group,
	Input,
	Modal,
	Text,
	UnstyledButton,
	Space,
	TextInput,
	Grid,
	Stack,
} from "@mantine/core";
import { useState } from "react";
import { Check, Upload } from "tabler-icons-react";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
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

export default function User({username, email, avatar}: UserInterface) {
	const {classes} = useStyles();
	const [opened, setOpened] = useState(true);
	const [file, setFile] = useState<File | null>(null);

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
							<Avatar src={avatar} size="lg" style={{marginLeft: `20px`}} />
							<FileButton onChange={setFile} accept="image/png,image/jpeg">
								{(props) => <Button compact fullWidth style={{marginLeft: `20px`}} {...props}><Upload /></Button>}
							</FileButton>
						</Stack>
					</Grid.Col>
					<Grid.Col span={9}>
						<Stack align="center" spacing="xs">
							<TextInput size="md" style={{width: `100%`, marginTop: `8px`}} placeholder={`Изменить никнейм`} />
							<Button fullWidth compact style={{marginTop: `12px`}} ><Check /></Button>
						</Stack>
					</Grid.Col>
				</Grid>

			</Modal>

			<UnstyledButton onClick={() => { setOpened(true); }} className={classes.user}>
				<Group>
					<Avatar src={avatar} radius="sm" />
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
