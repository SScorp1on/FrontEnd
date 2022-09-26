import React, {useState} from 'react';
import {
	Center,
	Button,
	Card,
	Text,
	Group,
	Space,
	UnstyledButton,
	createStyles, Stack,
} from '@mantine/core';
import AddKeyboardModule from "./addKeyboardModule";
import {Box, Edit, ListNumbers, Notebook, PencilPlus, Trash} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
	item: {
		display: `flex`,
		flexDirection: `column`,
		alignItems: `center`,
		justifyContent: `center`,
		textAlign: `center`,
		borderRadius: theme.radius.md,
		height: 100,
		width: 100,
		backgroundColor: theme.colorScheme === `dark` ? theme.colors.dark[7] : theme.white,
		transition: `box-shadow 150ms ease, transform 100ms ease`,
		'&:hover': {
			boxShadow: `${theme.shadows.md} !important`,
			transform: `scale(1.05)`,
		},
	},
}));

export default function AdminKeyboardApp() {
	const {classes} = useStyles();
	const [addKeyboard, setAddKeyboard] = useState(false);

	return (
		<>
			<AddKeyboardModule addKeyboard={addKeyboard} setAddKeyboard={setAddKeyboard}/>

			<Group>
				<Stack>
					<Card withBorder radius="md">
						<Group>
							<UnstyledButton className={classes.item}>
								<PencilPlus color="red"/>
								<Text size="xs" mt={7}>
									Добавить
								</Text>
							</UnstyledButton>

							<UnstyledButton className={classes.item}>
								<Edit color="red"/>
								<Text size="xs" mt={7}>
									Обновить
								</Text>
							</UnstyledButton>

							<UnstyledButton className={classes.item}>
								<Trash color="red"/>
								<Text size="xs" mt={7}>
									Удалить
								</Text>
							</UnstyledButton>
						</Group>
					</Card>
					<Card withBorder radius="md">
						<Group>
							<UnstyledButton className={classes.item}>
								<ListNumbers color="red"/>
								<Text size="xs" mt={7}>
									Кол-во
								</Text>
							</UnstyledButton>

							<UnstyledButton className={classes.item}>
								<Notebook color="red"/>
								<Text size="xs" mt={7}>
									Мануал
								</Text>
							</UnstyledButton>

							<UnstyledButton className={classes.item}>
								<Box color="red"/>
								<Text size="xs" mt={7}>
									Склад
								</Text>
							</UnstyledButton>
						</Group>
					</Card>
				</Stack>
			</Group>
		</>
	);
}