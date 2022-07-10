import {useNavigate, useSearchParams} from "react-router-dom";
import * as React from "react";
import {useEffect} from "react";
import {Box, Center, Loader, Space, Text} from "@mantine/core";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";
import {useDocumentTitle} from "@mantine/hooks";

export default function DiscordBot() {
	useDocumentTitle(`Discord авторизация`);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const guildID = searchParams.get(`guild_id`);
		const code = searchParams.get(`code`);
		const token = localStorage.getItem(`accessToken`);
		axios.post(`http://localhost:3000/discord`, {guildID: guildID, code: code}, {headers: {"authorization": `Bearer ${token}`}})
			.then((r) => {
				showNotification({
					title: `Discord`,
					message: `Сервер успешно добавлен`,
					color: `green`,
					icon: <Check/>,
					disallowClose: true,
				});
				navigate(`/control`);
			})
			.catch((e) => {
				let message;
				if (e.response.data === `EXIST`) message = `Сервер уже добавлен в систему`;
				else if (e.response.data === `GUILD_NOT_FOUND`) message = `Бот не смог подключиться к серверу`;
				else message = `Ошибка сервера`;
				showNotification({
					message: message,
					color: `red`,
					icon: <X/>,
					disallowClose: true,
				});
				navigate(`/control`);
			});
	});

	return (
		<>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`,
			}}>
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
			</Box>
		</>
	);
}