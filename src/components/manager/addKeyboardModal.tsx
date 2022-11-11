import {Button, Group, Modal, NumberInput, Space, Stack, Text, Textarea, TextInput} from "@mantine/core";
import React, {useState} from "react";
import {createBackendContext} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, Cross, X} from "tabler-icons-react";

interface IProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	updateFunc: () => void;
}

export default function AddKeyboardModal(props: IProps) {

	const [name, setName] = useState(``);
	const [nameError, setNameError] = useState(``);

	const [description, setDescription] = useState(``);
	const [descriptionError, setDescriptionError] = useState(``);

	const [githubURL, setGithubUrl] = useState(``);
	const [githubError, setGithubError] = useState(``);

	const [previewURL, setPreviewUrl] = useState(``);
	const [previewError, setPreviewError] = useState(``);

	const [price, setPrice] = useState(9999);

	const submit = async () => {
		if (!Boolean(name)) setNameError(`Обязательно`);
		else setNameError(``);

		if (!Boolean(description)) setDescriptionError(`Обязательно`);
		else setDescriptionError(``);

		if (!Boolean(githubURL)) setGithubError(`Обязательно`);
		else setGithubError(``);

		if (!Boolean(previewURL)) setPreviewError(`Обязательно`);
		else setPreviewError(``);

		if (!Boolean(name) ||
			!Boolean(description) ||
			!Boolean(githubURL) ||
			!Boolean(previewURL)
		) return;

		const bContext = createBackendContext();

		const data = {
			name: name,
			description: description,
			githubURL: githubURL,
			previewURL: previewURL,
			price: price,
		};

		bContext.post(`/keyboards/add`, data)
			.then(() => {
				showNotification({
					message: `Клавиатура успешно добавлена`,
					color: `green`,
					icon: <Check />
				});
				setName(``);
				setDescription(``);
				setGithubUrl(``);
				setPreviewUrl(``);
				setPrice(9999);
				props.setOpened(false);
				props.updateFunc();
			})
			.catch((e) => {
				showNotification({
					message: `Не получилось добавить клавиатуру D:`,
					color: `red`,
					icon: <X />
				});
			});
	};

	return (
		<Modal
			opened={props.opened}
			onClose={() => props.setOpened(false)}
			withCloseButton={false}
			centered
		>
			<Stack align={`center`} style={{width: `100%`}}>
				<Text tt={`uppercase`} weight={700} size={20}>Добавить новую клавиатуру</Text>
				<Space h={`xs`} />
				<Group position={`center`}>
					<TextInput
						placeholder={`Наименование`}
						onChange={(e) => setName(e.target.value)}
						error={nameError}
						style={{
							width: `395px`
						}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<Textarea
						placeholder={`Описание`}
						error={descriptionError}
						minRows={3}
						maxRows={3}
						onChange={(e) => setDescription(e.target.value)}
						style={{
							width: `395px`,
						}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<TextInput
						placeholder={`Ссылка на Github`}
						error={githubError}
						onChange={(e) => setGithubUrl(e.target.value)}
						style={{
							width: `190px`
						}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<TextInput
						placeholder={`Ссылка на фотографию`}
						error={previewError}
						onChange={(e) => setPreviewUrl(e.target.value)}
						style={{
							width: `190px`
						}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
					<NumberInput
						placeholder={`Стоимость`}
						onChange={(e) => setPrice(e || 9999)}
						min={1}
						style={{
							width: `395px`
						}}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': {borderColor: theme.colors.dark[7]},
								'&:focus': {borderColor: theme.colors.dark[7]},
							},
						})}
					/>
				</Group>
				<Space h={`md`} />
				<Button
					fullWidth
					onClick={submit}
				>
					Добавить
				</Button>
			</Stack>
		</Modal>
	);
}