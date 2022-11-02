import {Button, Center, createStyles, Divider, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import User from "../user";
import {Login} from "tabler-icons-react";
import React from "react";
import {useNavigate} from "react-router-dom";

interface IUser {
	username: string;
	email: string;
	avatar: string;
}

interface IProps {
	user: null | IUser,
	userLoading: boolean | undefined,
	setUserLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const useStyles = createStyles((theme, _params, getRef) => ({
	home: {
		marginTop: `10px`,
		color: `black`,
		fontWeight: 300,
		fontSize: 15,
		":hover": {
			color: `red`
		},
	}
}));

export default function HeaderComponent({user, userLoading, setUserLoading}: IProps) {

	const navigate = useNavigate();
	const {classes} = useStyles();

	const toLogin = () => {
		navigate(`/login`);
	};

	const toShop = () => {
		navigate(`/shop`);
	};

	return (
		<Center>
			<Group position={`apart`} style={{width: `870px`}}>
				<Group>
					<Stack
						style={{marginLeft: `15px`}}
					>
						<Text color={`red`} weight={700} size={28}>
							JOURLOY
						</Text>
						<Text color={`dimmed`} style={{marginLeft: `4px`, marginTop: `-25px`}}>
							Удобно и точка
						</Text>
					</Stack>
					<Divider orientation={`vertical`} style={{marginTop: 10, height: `50px`}}/>
					<UnstyledButton
						className={classes.home}
						onClick={toShop}
					>
						Клавиатуры
					</UnstyledButton>
				</Group>

				<Group style={{marginRight: `5px`, marginBottom: `5px`}} position={`right`}>
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
								leftIcon={<Login strokeWidth={1}/>}
								radius={`md`}
								size={`sm`}
								uppercase
								loading={userLoading}
								sx={{marginTop: `15px`, marginRight: `15px`}}
							>
								Войти
							</Button>
						</>
					)}
				</Group>
			</Group>
		</Center>
	);
}