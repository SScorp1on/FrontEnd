import React, {useEffect, useState} from "react";
import {AppShell, Burger, Button, Group, Header, MediaQuery, Navbar} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import User from "../components/user";
import {Login} from "tabler-icons-react";
import {createBackendContext, updateTokens} from "../context/axios.context";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function ShopPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const toLogin = () => {
		navigate(`/login`);
	};

	useEffect(() => {
		setUserLoading(true);
		const userCtx = createBackendContext();
		userCtx.get(`user`)
			.then(r => {
				const u: UserInterface = r.data;
				setUser(u);
				setUserLoading(false);
			})
			.catch(e => {
				console.log(e);
				setUser(null);
				setUserLoading(false);
			});
	}, [userLoading]);

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			header={
				<Header height={70} >
					<Group style={{width: `100%`}} position="right">
						{user ? (
							<>
								<User
									username={user.username}
									email={user.email}
									avatar={user.avatar}
									setUserLoading={setUserLoading}
								/>
							</>
						) : (
							<>
								<Button
									onClick={toLogin}
									leftIcon={<Login/>}
									variant="outline"
									radius="md"
									size="sm"
									uppercase
									loading={userLoading}
								>
									Войти
								</Button>
							</>
						)}
					</Group>
				</Header>
			}
		>
			a
		</AppShell>
	);
}