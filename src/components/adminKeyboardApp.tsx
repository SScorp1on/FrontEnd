import React, {useState} from 'react';
import {
	Center,
	Button,
	Card,
	Text,
	Group,
	Space,
	Modal,
	Stack,
	TextInput,
	Textarea,
	NumberInput,
	Checkbox
} from '@mantine/core';

export default function AdminKeyboardApp() {
	const [addKeyboard, setAddKeyboard] = useState(true);

	return (
		<>
			<Modal
				opened={addKeyboard}
				onClose={() => setAddKeyboard(false)}
				title="Добавить клавиатуру"
			>
				<Stack>
					<TextInput
						label="Название"
						withAsterisk
					/>
					<Textarea
						label="Описание"
						withAsterisk
					/>
					<NumberInput
						label="Стоимость"
						defaultValue={12999}
						hideControls
						withAsterisk
					/>
					<Checkbox
						label="Ортогональная"
						color="red"
					/>
					<Checkbox
						label="Сплит"
						color="red"
					/>
				</Stack>
				<Group position="right">
					<Button color="red">
						Добавить
					</Button>
				</Group>
			</Modal>

			<Card withBorder radius="md">
				<Center>
					<Text>Клавиатуры</Text>
				</Center>
				<Space h="md"/>
				<Group>
					<Button color="red">
						Добавить
					</Button>
					<Button color="red">
						Обновить
					</Button>
					<Button color="red">
						Удалить
					</Button>
				</Group>
			</Card>
		</>
	);
}