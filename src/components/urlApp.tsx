/* eslint no-console: 0*/
import {
	Button,
	Center,
	Divider,
	Grid,
	Menu,
	Space,
	Table,
	TextInput,
	Tooltip,
	Text, Pagination
} from "@mantine/core";
import * as React from "react";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {useClipboard, useDocumentTitle} from "@mantine/hooks";
import {Check, Clock, Copy, Refresh, Trash, X} from "tabler-icons-react";
import {showNotification} from "@mantine/notifications";
import axios from "axios";
import { useModals } from '@mantine/modals';

interface Link {
	_id: string;
	source: string;
	short: string;
	count: number;
	owner: string;
}

export default function UrlApp() {
	useDocumentTitle(`Ссылки`);
	const token = localStorage.getItem(`accessToken`);
	const navigate = useNavigate();
	const clipboard = useClipboard();
	const [loaded, setLoading] = useState(false);
	const [elements, setElements] = useState<Link[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(2);
	const [bLoaded, setBLoaded] = useState(false);
	const modals = useModals();

	const getShortText = (text: string) => {
		const arr = text.split(``);
		let str = ``;
		for (const c of arr) if (str.length < 40) str += c;
		if (str.length === 40) str += `...`;
		return str;
	};

	useEffect(() => {
		if (loaded) return;
		axios.get(`http://localhost:3000/links`, {headers: {"authorization": `Bearer ${token}`}})
			.then(r => {
				const arr = r.data.array.reverse();
				let newArr = [];
				const pages = Math.ceil(arr.length/10);
				setPages((pages === 0) ? 1 : pages);
				if (page > pages) setPage(pages);
				if (arr.length > 10) {
					let c = page * 10;
					let offset = (page - 1) * 10;

					for (let i = 0; i < c; i++) {
						if (offset > 0) {
							offset--;
							continue;
						}
						if (((page - 1) * 10) + newArr.length === arr.length) continue;
						newArr.push(arr[i]);
					}
				} else newArr = arr;
				if (newArr.length < 10) {
					for (let i = newArr.length; i < 10; i++) {
						newArr.push({
							_id: i + 1,
							source: ``,
							short: ``,
							count: ``
						});
					}
				}
				setElements(newArr);
				setLoading(true);
			});
	});

	const onDelete = (url: string) => {
		axios.delete(`http://localhost:3000/links/${url}`, {headers: {"authorization": `Bearer ${token}`}})
			.then(() => {
				showNotification({
					message: `Ссылка успешно удалена`,
					color: `green`,
					icon: <Check/>,
					disallowClose: true,
				});
				setLoading(false);
			})
			.catch((e) => {
				showNotification({
					message: `Ошибка удаления ссылки`,
					color: `red`,
					icon: <X/>,
					disallowClose: true,
				});
			});
	};

	const openDeleteModal = (url: string) =>
		modals.openConfirmModal({
			title: `Удаление ссылки`,
			centered: true,
			children: (
				<Text size="sm">
					Вы точно хотите удалить ссылку? Это действие невозможно будет отменить
				</Text>
			),
			labels: { confirm: `Удалить`, cancel: `Оставить` },
			confirmProps: { color: `red` },
			onCancel: () => null,
			onConfirm: () => onDelete(url),
		});

	const getRows = () => elements.map((element) => (
		<tr key={element._id}>
			<td><Center><Tooltip
				label={element.source}
				transition="skew-up"
			>
				{getShortText(element.source)}
			</Tooltip></Center></td>
			<td><Center>{(element.short !== ``) ? `https://jourloy.com/` : ``}{element.short}</Center></td>
			<td><Center>{element.count}</Center></td>
			<td>
				<Center>
					<Menu>
						<Menu.Item
							icon={<Copy size={14}/>}
							disabled={(element.short === ``)}
							onClick={() => {
								clipboard.copy(`https://jourloy.com/${element.short}`);
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
						<Menu.Item disabled icon={<Refresh size={14}/>}>Получить
							новую</Menu.Item>
						<Menu.Item disabled icon={<Clock size={14}/>}>Продлить</Menu.Item>

						<Divider size={`sm`}/>

						<Menu.Item color="red"
						           disabled={(element.short === ``)}
						           icon={<Trash size={14}/>}
						           onClick={() => openDeleteModal(element.short)}
						>
							Удалить
						</Menu.Item>
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

	const onSubmit = async (values: { link: string }) => {
		setBLoaded(true);
		const token = localStorage.getItem(`accessToken`);
		const res = await axios.post(`http://localhost:3000/links`, {source: values.link}, {headers: {"authorization": `Bearer ${token}`}})
			.then(() => true)
			.catch(() => false);
		setBLoaded(false);
		form.values.link = ``;
		if (res) {
			showNotification({
				message: `Ссылка успешно добавлена`,
				color: `green`,
				icon: <Check/>,
				disallowClose: true,
			});
			setLoading(false);
		} else {
			showNotification({
				message: `Ошибка во время создания ссылки`,
				color: `red`,
				icon: <X/>,
				disallowClose: true,
			});
		}
	};

	return (
		<>
			<form onChange={onChange} onSubmit={form.onSubmit(v => onSubmit(v))}>
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
							loading={bLoaded}
							fullWidth
						>
							Сократить
						</Button>
					</Grid.Col>
				</Grid>
			</form>
			<Space h={`lg`}/>
			<Table striped style={{width: `800px`}}>
				<thead>
					<tr>
						<th><Center>Ссылка</Center></th>
						<th><Center>Сокращенная</Center></th>
						<th><Center>Переходов</Center></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{getRows()}</tbody>
			</Table>
			<Center>
				<Pagination onChange={(p) => { setPage(p); setLoading(false); }} total={pages} />
			</Center>
		</>
	);
}