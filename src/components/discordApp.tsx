import UrlApp from "./urlApp";
import {Box} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import {X} from "tabler-icons-react";

interface UserInterface {
	discord?: {
		guildIDs: string[];
		id: string;
	}
}

export default function DiscordApp() {
	useDocumentTitle(`Discord`);
	const [loaded, setLoading] = useState(false);
	const [user, setUser] = useState<UserInterface>({});

	useEffect(() => {
		if (loaded) return;

		const token = localStorage.getItem(`accessToken`);
		axios.get(`http://localhost:3000/user`, {headers: {"authorization": `Bearer ${token}`}})
			.then((r) => {
				setUser(r.data);
				setLoading(true);
			})
			.catch(() => null);
	});

	return (
		<>
			t
		</>
	);
}