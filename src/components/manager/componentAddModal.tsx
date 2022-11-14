import React, {useState} from "react";
import {
	Button,
	Group, MantineTheme,
	Modal,
	NumberInput,
	Select,
	Space,
	Stack,
	Text,
	TextInput
} from "@mantine/core";
import {createBackendContext} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";

interface IProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	updateFunc: (name: string) => void;
	keyboardName: string
}

const style = (theme: MantineTheme) => ({
	input: {
		borderColor: theme.colors.dark[7],
		'&:hover': {borderColor: theme.colors.dark[7]},
		'&:focus': {borderColor: theme.colors.dark[7]},
	},
});

export default function ComponentAddModal(props: IProps) {

	const [name, setName] = useState(``);
	const [nameError, setNameError] = useState(``);

	const [link, setLink] = useState(``);
	const [linkError, setLinkError] = useState(``);

	const [delivery, setDelivery] = useState(31);
	const [amount, setAmount] = useState(1);
	const [price, setPrice] = useState(1);
	const [status, setStatus] = useState(`unchecked`);

	const submit = () => {
		if (!Boolean(name)) setNameError(`Обязательно`);
		else setNameError(``);

		if (!Boolean(link)) setLinkError(`Обязательно`);
		else setLinkError(``);

		if (!Boolean(name) || !Boolean(link)) return;

		const data = {
			name: name,
			link: link,
			delivery: delivery,
			amount: amount,
			status: status,
			price: price,
			keyboardName: props.keyboardName,
		};

		const bContext = createBackendContext();
		bContext.post(`/components/add`, data)
			.then(() => {
				showNotification({
					message: `Компонент успешно добавлен`,
					color: `green`,
					icon: <Check />
				});
				setName(``);
				setLink(``);
				setDelivery(31);
				setAmount(1);
				setStatus(`unchecked`);
				props.updateFunc(props.keyboardName);
				props.setOpened(false);
			})
			.catch(() => {
				showNotification({
					message: `Не получилось добавить компонент D:`,
					color: `red`,
					icon: <X />
				});
			});
	};

	return (
		<Modal
			opened={props.opened}
			onClose={() => props.setOpened(false)}
			centered
			withCloseButton={false}
		>
			<Stack align={`center`}>
				<Text
					tt={`uppercase`}
					weight={700}
					size={18}
				>
					Добавить новый компонент
				</Text>
				<Space h={0}/>
				<Group>
					<Stack>
						<TextInput
							w={250}
							label={`Наименование`}
							onChange={e => setName(e.target.value || ``)}
							error={Boolean(nameError)}
							styles={(theme) => style(theme)}
						/>
						<TextInput
							w={250}
							label={`Ссылка`}
							onChange={e => setLink(e.target.value || ``)}
							error={Boolean(linkError)}
							styles={(theme) => style(theme)}
						/>
					</Stack>
					<Stack>
						<NumberInput
							w={120}
							min={1}
							defaultValue={31}
							label={`Доставка`}
							onChange={e => setDelivery(e || 31)}
							styles={(theme) => style(theme)}
						/>
						<NumberInput
							w={120}
							min={1}
							defaultValue={1}
							label={`Количество`}
							onChange={e => setAmount(e || 1)}
							styles={(theme) => style(theme)}
						/>
					</Stack>
				</Group>
				<NumberInput
					w={385}
					min={1}
					defaultValue={1}
					label={`Стоимость в рублях за весь заказ`}
					onChange={e => setPrice(e || 0)}
					styles={(theme) => style(theme)}
				/>
				<Select
					label={`Статус`}
					w={385}
					defaultValue={`unchecked`}
					onChange={(e) => setStatus(e || `unchecked`)}
					styles={(theme) => style(theme)}
					data={[
						{label: `Проверено`, value: `checked`},
						{label: `Не проверено`, value: `unchecked`},
						{label: `Ошибочный`, value: `error`},
						{label: `Запас`, value: `reserve`},
					]}
				/>
				<Space h={5}/>
				<Button
					onClick={submit}
					w={385}
				>
					Добавить
				</Button>
			</Stack>
		</Modal>
	);
}