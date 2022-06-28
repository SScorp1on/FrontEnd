/* eslint no-console: 0*/
import * as React from "react";
import {
	AppShell,
	Footer,
	Header,
	Navbar,
	Text,
	ThemeIcon,
	UnstyledButton
} from "@mantine/core";
import Link from "../components/link";
import User from "../components/user";
import axios from "axios";
import jwt from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import MainApp from "../components/mainApp";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Control() {
	const navigate = useNavigate();
	const [appState, setAppState] = useState(`url`);

	const checkUser = async () => {
		const token = localStorage.getItem(`accessToken`);
		if (!token) {
			navigate(`/login`);
			return;
		}
		const username = jwt<{username: string}>(token).username;
		const res = await axios.get(`http://localhost:3000/auth/check?access=${token}`)
			.catch((e) => ({status: e.response.status, data: e.response.data}));
		if (res.status !== 200) {
			localStorage.removeItem(`accessToken`);
			localStorage.removeItem(`refreshToken`);
			navigate(`/login`);
		}
	};

	checkUser();

	return (
		<>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>

			<AppShell
				padding="md"
				navbar={<Navbar width={{ base: 300 }} p="xs">
					<Navbar.Section>{/* Header with logo */}</Navbar.Section>
					<Navbar.Section grow mt="md">
						<Link label={`URLs`} IconProp={`url`} color={`white`}/>
						<Link label={`Discord`} IconProp={`discord`} color={`white`}/>
						<Link label={`Twitch`} IconProp={`twitch`} color={`white`}/>
					</Navbar.Section>
					<Navbar.Section><User /></Navbar.Section>
				</Navbar>}
			>
				<MainApp appState={appState}/>
			</AppShell>
		</>
	);
}