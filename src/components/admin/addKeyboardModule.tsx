import {
	Button,
	Checkbox,
	Group,
	Modal,
	NumberInput,
	Space,
	Stack,
	Textarea,
	TextInput,
	Center,
	FileInput, useMantineTheme
} from "@mantine/core";
import React, {useRef, useState} from "react";
import {KeyboardCard} from "../Cards/keyboardCard";
import {FileUpload} from "tabler-icons-react";

export interface AddKeyboardModuleProp {
	addKeyboard: boolean;
	setAddKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultDescription = `Описание, не очень длинное и красивое, но самое важное - продающее. Удобно и точка.`;

export default function AddKeyboardModule({addKeyboard, setAddKeyboard}: AddKeyboardModuleProp) {
	const theme = useMantineTheme();

	const [name, setName] = useState(`Keyboard`);
	const [description, setDescription] = useState(defaultDescription);
	const [price, setPrice] = useState(12999);
	const [oldPrice, setOldPrice] = useState(0);
	const [isOrto, setIsOrto] = useState(false);
	const [isSplit, setIsSplit] = useState(false);

	return (
		<Modal
			opened={addKeyboard}
			onClose={() => setAddKeyboard(false)}
			title="Добавить клавиатуру"
		>
			<Stack>
				<TextInput
					label="Название"
					defaultValue="Keyboard"
					withAsterisk
					onChange={(e) => setName(e.target.value)}
				/>
				<Textarea
					label="Описание"
					defaultValue={defaultDescription}
					withAsterisk
					onChange={(e) => setDescription(e.target.value)}
				/>
				<NumberInput
					label="Стоимость"
					defaultValue={12999}
					hideControls
					withAsterisk
					onChange={(value) => setPrice(value || 12999)}
				/>
				<NumberInput
					label="Старая стоимость"
					hideControls
					onChange={(value) => setOldPrice(value || 0)}
				/>
				<FileInput
					placeholder="Выбрать файлы"
					label="Фотографии"
					withAsterisk
					multiple
					accept={`image/png, image/jpeg`}
					icon={<FileUpload color={theme.colors[`red`][6]} />}
				/>
				<Checkbox
					label="Ортогональная"
					color="red"
					onChange={(e) => setIsOrto(e.target.checked)}
				/>
				<Checkbox
					label="Сплит"
					color="red"
					onChange={(e) => setIsSplit(e.target.checked)}
				/>
			</Stack>
			<Group position="right">
				<Button color="red">
					Добавить
				</Button>
			</Group>
			<Space h="lg" />
			<hr />
			<Space h="lg" />
			<Center>
				<KeyboardCard
					title={name}
					currentPrice={price}
					oldPrice={oldPrice}
					images={[
						{image: `https://github.com/stevennguyen/framework/raw/master/images/1.jpg`}
					]}
					description={description}
					setModuleState={() => null}
				/>
			</Center>
		</Modal>
	);
}