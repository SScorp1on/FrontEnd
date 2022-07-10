import React from 'react';
import {Box, Button, Container, createStyles, Group, Text, Title} from '@mantine/core';
import {Illustration} from "../components/illustration";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "@mantine/hooks";

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

export function Page404() {
	useDocumentTitle(`404`);
	const {classes} = useStyles();
	const navigate = useNavigate();

	const onButton = () => {
		navigate(`/control`);
	};

	return (
		<Box style={{
			position: `absolute`, left: `50%`, top: `50%`,
			transform: `translate(-50%, -50%)`,
			width: `90%`
		}}>
			<Container className={classes.root}>
				<div className={classes.inner}>
					<Illustration style={{
						position: `absolute`, left: `50%`, top: `50%`,
						transform: `translate(-50%, -50%)`,
						width: `80%`
					}} className={classes.image}/>
					<div className={classes.content}>
						<Title className={classes.title}>Здесь ничего нет</Title>
						<Text color="dimmed" size="lg" align="center"
						      className={classes.description}>
							Страница, которую ты пытаешься открыть, не существует. Возможно
							ты ошибся в адресе или страница переехала на новый URL
						</Text>
						<Group position="center">
							<Button variant={`outline`} onClick={onButton} size="md">Вернуться на главную</Button>
						</Group>
					</div>
				</div>
			</Container>
		</Box>
	);
}