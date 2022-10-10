import React, {useState} from 'react';
import {
	Center,
	Button,
	Card,
	Text,
	Group,
	Space,
} from '@mantine/core';

export default function AdminKeyboardApp() {
	return (
		<>
			<Group>
				<Card withBorder radius="md" sx={{width: `380px`}}>
					<Center>
						<Text>Пользователи</Text>
					</Center>
					<Space h="md"/>
					<Group position="center">
						<Button sx={{width: `160px`}} color="red">
							Список
						</Button>
						<Button sx={{width: `160px`}} color="red">
							Отслеживание
						</Button>
					</Group>
				</Card>
			</Group>
		</>
	);
}