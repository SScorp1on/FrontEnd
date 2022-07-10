import {
	Avatar,
	Box,
	Button, Center, Container,
	createStyles, Grid,
	Group, Loader, Paper,
	Select, Space,
	Text,
	Title
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import React, {forwardRef, useEffect, useState} from "react";
import axios from "axios";
import {BrandTwitch, Microphone, Tag} from "tabler-icons-react";

interface UserInterface {
	discord?: {
		guildIDs: string[];
		id: string;
	};
}

interface GuildInterface {
	ownerID: string;
	guildID: string;
	name: string;
	imageURL: string;
	streamChannel?: string;
	streamers?: string[];
	salesChannel?: string;
	musicChannel?: string;
	modChannel?: string;
}

interface GuildPropInterface {
	value: string;
	label: string;
	url: string;
}

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	inner: {
		position: `relative`,
	},

	image: {
		position: `absolute`,
		top: 0,
		right: 0,
		left: 0,
		zIndex: 0,
		opacity: 0.75,
	},

	content: {
		paddingTop: 220,
		position: `relative`,
		zIndex: 1,

		[theme.fn.smallerThan(`sm`)]: {
			paddingTop: 120,
		},
	},

	title: {
		textAlign: `center`,
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan(`sm`)]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
		margin: `auto`,
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
	},
}));


export default function DiscordApp() {
	useDocumentTitle(`Discord`);
	const {classes} = useStyles();
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<UserInterface>({});
	const [guilds, setGuilds] = useState<GuildInterface[]>([]);
	const [guild, setGuild] = useState<string | null>(null);

	const addServer = () => {
		const url = `https://discord.com/api/oauth2/authorize?client_id=816872036051058698&permissions=412605598801&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fdiscord%2Fbot&response_type=code&scope=bot%20identify`;
		window.location.replace(url);
	};

	const getServers = () => {
		const arr = [];
		for (const g of guilds) {
			arr.push({value: g.guildID, label: g.name, url: g.imageURL});
		}
		return arr;
	};

	useEffect(() => {
		if (!loaded) {
			const token = localStorage.getItem(`accessToken`);
			axios.get(`http://localhost:3000/user`, {headers: {"authorization": `Bearer ${token}`}})
				.then((r) => {
					setUser(r.data);
					setLoaded(true);
				})
				.catch(() => null);
		}

		if (!loading) {
			const token = localStorage.getItem(`accessToken`);
			axios.get(`http://localhost:3000/discord`, {headers: {"authorization": `Bearer ${token}`}})
				.then((r) => {
					setGuilds(r.data.array);
					setLoading(true);
				})
				.catch(() => null);
		}
	});

	const SelectItem = forwardRef<HTMLDivElement, GuildPropInterface>(
		({ url, label, ...others }: GuildPropInterface, ref) => (
			<div ref={ref} {...others}>
				<Group noWrap>
					<Avatar src={url} />

					<div>
						<Text size="md">{label}</Text>
					</div>
				</Group>
			</div>
		)
	);

	if (!loading) {
		return (
			<>
				<Center>
					<div style={{
						display: `flex`,
						justifyContent: `space-evenly`,
						width: 900,
					}}>
						<Text style={{fontSize: `80pt`}}>D</Text>
						<Text style={{fontSize: `80pt`}}>I</Text>
						<Text style={{fontSize: `80pt`}}>S</Text>
						<Text style={{fontSize: `80pt`}}>C</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`}}>R</Text>
						<Text style={{fontSize: `80pt`}}>D</Text>
					</div>
				</Center>
				<Space w="xl"/>
				<Space w="xl"/>
				<Center>
					<Loader color="violet" size="lg"/>
				</Center>
			</>
		);
	}

	if (guilds.length === 0) {
		return (
			<>
				<Container className={classes.root}>
					<div className={classes.inner}>
						<div className={classes.content}>
							<Title className={classes.title}>Кажется ты не добавил ни один
								сервер</Title>
							<Text color="dimmed" size="lg" align="center"
							      className={classes.description}>
								Чтобы управлять ботом на сервере, необходимо добавить его
								через систему.
								Если бот уже присутствует на сервере - кикни его и добавь
								снова по кнопке ниже
							</Text>
							<Group position="center">
								<Button onClick={addServer} variant={`outline`} size="md">Добавить
									сервер</Button>
							</Group>
						</div>
					</div>
				</Container>
			</>
		);
	}

	return (
		<>
			<Box style={{width: `1000px`}}>
				<Grid grow>
					<Grid.Col span={4}>
						<Paper style={{width: `250px`, height: `250px`}} shadow="sm" p="sm">
							<Text weight={700} size="lg">Twitch уведомления</Text>
							<Space h={`md`}/>
							<Text>Получай уведомления о трансляциях любимых стримеров</Text>
							<Button
								leftIcon={<BrandTwitch size={20}/>}
								style={{bottom: `-70px`}}
								fullWidth
								variant={`outline`}
							>
								{guilds[0].streamChannel ? `Настроить` : `Создать`}
							</Button>
						</Paper>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper style={{width: `250px`, height: `250px`}} shadow="sm" p="sm">
							<Text weight={700} size="lg">Скидки и раздачи</Text>
							<Space h={`md`}/>
							<Text>Бот может присылать текущие скидки в магазинах</Text>
							<Button
								leftIcon={<Tag size={20}/>}
								style={{bottom: `-95px`}}
								fullWidth
								variant={`outline`}
							>
								{guilds[0].salesChannel ? `Настроить` : `Создать`}
							</Button>
						</Paper>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper style={{width: `250px`, height: `250px`}} shadow="sm" p="sm">
							<Text weight={700} size="lg">Голосовые каналы</Text>
							<Space h={`md`}/>
							<Text>Управляй голосовыми каналами на сервере</Text>
							<Button
								leftIcon={<Microphone size={20}/>}
								style={{bottom: `-95px`}}
								fullWidth
								variant={`outline`}
							>
								{guilds[0].musicChannel ? `Настроить` : `Создать`}
							</Button>
						</Paper>
					</Grid.Col>
				</Grid>

			</Box>
		</>
	);
}