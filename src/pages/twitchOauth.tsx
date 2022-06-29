import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useEffect} from "react";
import {Box, Center, Loader, Space, Text} from "@mantine/core";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";
import {useDocumentTitle} from "@mantine/hooks";

export default function TwitchOauth() {
	useDocumentTitle(`Twitch авторизация`);
	const navigate = useNavigate();

	useEffect(() => {
		const url = window.location.href;
		const hash = url.split(`#`)[1].split(`?`)[0].split(`&`);
		if (!hash.indexOf(`access_token`)) {
			showNotification({
				title: `Ошибка Twitch`,
				message: `Авторизация не прошла`,
				color: `red`,
				icon: <X/>,
				disallowClose: true,
			});
			navigate(`/control`);
		}
		const token = hash[hash.indexOf(`access_token`) + 1];
		const userToken = localStorage.getItem(`accessToken`);
		axios.get(`http://localhost:3000/sso/twitch/oauth?access_token=${token}`, {headers: {"authorization": `Bearer ${userToken}`}})
			.then(() => {
				showNotification({
					title: `Twitch`,
					message: `Авторизация прошла успешно`,
					color: `green`,
					icon: <Check/>,
					disallowClose: true,
				});
				navigate(`/control`);
			})
			.catch(async (e) => {
				const status = e.response.status;
				if (status === 401) {
					const rToken = localStorage.getItem(`refreshToken`);
					const r = await axios.post(`http://localhost:3000/auth/re-login`, {refresh: rToken}, {headers: {"authorization": `Bearer ${userToken}`}})
						.catch(() => {
							localStorage.removeItem(`accessToken`);
							localStorage.removeItem(`refreshToken`);
							navigate(`/login`);
						});
					localStorage.setItem(`accessToken`, r?.data.t.a);
					localStorage.setItem(`refreshToken`, r?.data.t.r);
					showNotification({
						message: `Сервер не смог обработать запрос, попробуйте снова`,
						color: `red`,
						icon: <X/>,
						disallowClose: true,
					});
					navigate(`/control`);
					return;
				}
				showNotification({
					title: `Twitch`,
					message: `Авторизация не прошла`,
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
						<Text style={{fontSize: `80pt`}}>T</Text>
						<Text style={{fontSize: `80pt`}}>W</Text>
						<Text style={{fontSize: `80pt`}}>I</Text>
						<Text style={{fontSize: `80pt`}}>T</Text>
						<Text style={{fontSize: `80pt`}}>C</Text>
						<Text style={{fontSize: `80pt`}}>H</Text>
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