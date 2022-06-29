/* eslint no-console: 0*/
import {
	Avatar,
	Box,
	Group, Skeleton,
	Text,
	UnstyledButton,
	useMantineTheme
} from "@mantine/core";
import * as React from "react";
import {ChevronLeft, ChevronRight} from "tabler-icons-react";
import jwt from 'jwt-decode';
import {useState} from "react";
import UserSettings from "./userSettings";
import {useNavigate} from "react-router-dom";

export default function User() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const navigate = useNavigate();

	const token = localStorage.getItem(`accessToken`);
	if (!token) {
		localStorage.removeItem(`accessToken`);
		localStorage.removeItem(`refreshToken`);
		navigate(`/login`);
		return (<></>);
	}
	const username = jwt<{username: string}>(token).username;
	const url = `https://avatars.dicebear.com/api/avataaars/${username}.svg`;

	return (
		<>
			<UserSettings opened={opened} setOpened={setOpened} />
			<Box
				sx={{
					paddingTop: theme.spacing.sm,
					borderTop: `1px solid ${
						theme.colors.dark[4]
					}`,
				}}
			>
				<UnstyledButton
					sx={{
						display: `block`,
						width: `100%`,
						padding: theme.spacing.xs,
						borderRadius: theme.radius.sm,
						color: theme.colorScheme === `dark` ? theme.colors.dark[0] : theme.black,

						'&:hover': {
							backgroundColor:
								theme.colorScheme === `dark` ? theme.colors.dark[6] : theme.colors.gray[0],
						},
					}}
					onClick={() => setOpened(true)}
				>
					<Group>
						<Avatar
							src={url}
							radius="xl"
						/>
						<Box sx={{ flex: 1 }}>
							<Text size="sm" weight={500}>
								{username}
							</Text>
						</Box>

						{theme.dir === `ltr` ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
					</Group>
				</UnstyledButton>
			</Box>
		</>
	);
}