/* eslint no-console: 0*/
import React, {useEffect, useState} from "react";
import {Button, Code, Dialog, Grid, Group, Mark, Modal, Space, Text} from "@mantine/core";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export interface UserSettingsProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSettings({opened, setOpened}: UserSettingsProps) {
	const [dsReady, setDsReady] = useState(false);
	const [twReady, setTwReady] = useState(false);
	const [dsDialog, setDsDialog] = useState(false);
	const [twDialog, setTwDialog] = useState(false);
	const [discordConnect, setDiscordConnect] = useState(null);
	const [twitchConnect, setTwitchConnect] = useState(null);
	const [userHash, setUserHash] = useState(null);

	const navigate = useNavigate();

	const getUserData = async () => {
		const token = localStorage.getItem(`accessToken`);
		const res = await axios.get(`http://localhost:3000/auth/?access=${token}`)
			.catch((e) => ({status: e.response.status, data: e.response.data}));
		if (res.status !== 200) {
			localStorage.removeItem(`accessToken`);
			localStorage.removeItem(`refreshToken`);
			navigate(`/login`);
		}

		setDiscordConnect(res.data.discord);
		setTwitchConnect(res.data.twitch);
		setUserHash(res.data.hash);

		setDsReady(true);
		setTwReady(true);
	};

	const onTwitchButton = async () => {
		const t = await axios.get(`http://localhost:3000/sso/twitch`);
		const url = `https://id.twitch.tv/oauth2/authorize?force_verify=true&response_type=token&client_id=${t.data.id}&redirect_uri=http://localhost:3001/twitch/oauth&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`;
		window.location.replace(url);
	};

	getUserData();

	return (
		<>
			<Modal
				opened={dsDialog}
				centered
				withCloseButton={false}
				onClose={() => {
					setDsDialog(false);
					setOpened(true);
				}}
			>
				<Text size="sm" style={{ marginBottom: 10 }} weight={500}>
					Отправь в любой канал на сервере <Mark>JOURLOY's server</Mark> команду:
					<Space h={`xs`}/>
					<Code>!auth {userHash}</Code>
				</Text>
			</Modal>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Настройки"
				centered
			>
				<Grid grow columns={24}>
					<Grid.Col span={5}>
						<Text>Discord:</Text>
					</Grid.Col>
					<Grid.Col span={19}>
						<Button
							loading={!dsReady}
							onClick={() => {
								if (discordConnect != null) return;
								setDsDialog(true);
								setOpened(false);
							}}
							color={(discordConnect != null) ? `violet` : `green`}
							variant="outline"
							fullWidth
						>
							{discordConnect ? `Подключено` : `Подключить`}
						</Button>
					</Grid.Col>
					<Grid.Col span={5}>
						<Text>Twitch:</Text>
					</Grid.Col>
					<Grid.Col span={19}>
						<Button
							loading={!twReady}
							onClick={() => {
								if (twitchConnect != null) return;
								onTwitchButton();
							}}
							variant="outline"
							color={(twitchConnect != null) ? `grape` : `green`}
							fullWidth
						>
							{twitchConnect ? `Подключено` : `Подключить`}
						</Button>
					</Grid.Col>
					<Grid.Col span={24}>
						<Button fullWidth color={`red`} variant="outline">
							Удаление аккаунта
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}