/* eslint no-console: 0*/
import {
	Button,
	Center,
	Divider,
	Grid,
	Menu,
	ScrollArea,
	Space,
	Table,
	TextInput,
	Text, Tooltip,
} from "@mantine/core";
import * as React from "react";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {useClipboard, useDocumentTitle} from "@mantine/hooks";
import {Check, Copy, Repeat, Trash} from "tabler-icons-react";
import {showNotification} from "@mantine/notifications";

export default function UrlApp() {
	const navigate = useNavigate();
	const clipboard = useClipboard();
	useDocumentTitle(`Ссылки`);
	const [loaded, setLoading] = useState(false);

	const elements = [{
		id: 1,
		url: `https://test.com/вцfuhewFPUIHWFU9HEWPUAHFPUHUhfuwepqhfepiuhwapiu`,
		short: `jourloy.com/dbwud2`,
		count: 15
	}];

	const getShortText = (text: string) => {
		const arr = text.split(``);
		let str = ``;
		for (const c of arr) if (str.length < 40) str += c;
		str += `...`;
		return str;
	};

	const rows = elements.map((element) => (
		<tr key={element.id}>
			<td><Center><Tooltip
				label={element.url}
				transition="skew-up"
			>
				{getShortText(element.url)}
			</Tooltip></Center></td>
			<td><Center>{element.short}</Center></td>
			<td><Center>{element.count}</Center></td>
			<td>
				<Center>
					<Menu>
						<Menu.Item
							icon={<Copy size={14}/>}
							onClick={() => {
								clipboard.copy(`slave`);
								showNotification({
									message: `Ссылка скопирована`,
									color: `green`,
									icon: <Check/>,
									disallowClose: true,
									autoClose: 2000
								});
							}}
						>
							Скопировать
						</Menu.Item>
						<Menu.Item icon={<Repeat size={14}/>}>Получить новую</Menu.Item>

						<Divider size={`sm`}/>

						<Menu.Item color="red"
						           icon={<Trash size={14}/>}>Удалить</Menu.Item>
					</Menu>
				</Center>
			</td>
		</tr>
	));

	const form = useForm({
		initialValues: {
			link: ``,
		},

		validate: {
			link: (value) => ((/^(https?:\/\/)?([\w\.]+)\.([a-z]{1,6}\.?)(\/[\w\.]*)*\/?$/.test(value)) ? null : `Неверная ссылка`),
		},
	});

	const onChange = () => {
		form.validate();
	};

	return (
		<>
			<form onChange={onChange}>
				<Grid columns={10}>
					<Grid.Col span={7}>
						<TextInput
							required
							placeholder="Твоя ссылка"
							{...form.getInputProps(`link`)}
							error={form.errors.link != null}
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<Button
							type="submit"
							variant="outline"
							disabled={form.errors.link != null}
							loading={loaded}
							fullWidth
						>
							Сократить
						</Button>
					</Grid.Col>
				</Grid>
			</form>
			<Space h={`lg`}/>
			<Table style={{width: `800px`}}>
				<thead>
					<tr>
						<th><Center>Ссылка</Center></th>
						<th><Center>Сокращенная</Center></th>
						<th><Center>Переходов</Center></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
}