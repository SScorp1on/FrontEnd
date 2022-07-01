/* eslint no-console: 0*/
import * as React from "react";
import {useEffect, useState} from "react";
import {AppShell, Divider, Navbar} from "@mantine/core";
import Link from "../components/link";
import User from "../components/user";
import {useNavigate} from "react-router-dom";
import MainApp from "../components/mainApp";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import {X} from "tabler-icons-react";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Control() {
	const navigate = useNavigate();
	const [appState, setAppState] = useState(`url`);

	useEffect(() => {
		const token = localStorage.getItem(`accessToken`);
		axios.get(`http://localhost:3000/user`, {headers: {"authorization": `Bearer ${token}`}})
			.catch(async (e) => {
				const status = e.response.status;
				if (status === 401) {
					const rToken = localStorage.getItem(`refreshToken`);
					const r = await axios.post(`http://localhost:3000/auth/re-login`, {refresh: rToken}, {headers: {"authorization": `Bearer ${token}`}})
						.catch(() => {
							localStorage.removeItem(`accessToken`);
							localStorage.removeItem(`refreshToken`);
							showNotification({
								message: `Сессия истекла`,
								color: `red`,
								icon: <X/>,
								disallowClose: true,
							});
							navigate(`/login`);
						});
					localStorage.setItem(`accessToken`, r?.data.t.a);
					localStorage.setItem(`refreshToken`, r?.data.t.r);
				}
				localStorage.removeItem(`accessToken`);
				localStorage.removeItem(`refreshToken`);
				navigate(`/login`);
				return null;
			});
	});

	return (
		<>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>

			<AppShell
				padding="md"
				navbar={<Navbar width={{base: 300}} p="xs">
					<Navbar.Section>{/* Header with logo */}</Navbar.Section>
					<Navbar.Section grow mt="md">
						<Link label={`Ссылки`} IconProp={`url`} color={`white`}/>
						<Link label={`Продукты`} IconProp={`cart`} color={`white`}/>
						<Link label={`Торговля`} IconProp={`trade`} color={`white`}/>
						<Link label={`Discord`} IconProp={`discord`} color={`white`}/>
						<Link label={`Twitch`} IconProp={`twitch`} color={`white`}/>
					</Navbar.Section>
					<Navbar.Section>
						<User/>
					</Navbar.Section>
				</Navbar>}
			>
				<MainApp appState={appState}/>
			</AppShell>
		</>
	);
}