/* eslint no-console: 0*/
import * as React from "react";
import {useState} from "react";
import {AppShell, Divider, Navbar} from "@mantine/core";
import Link from "../components/link";
import User from "../components/user";
import {useNavigate} from "react-router-dom";
import MainApp from "../components/mainApp";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Control() {
	const navigate = useNavigate();
	const [appState, setAppState] = useState(`url`);

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