/* eslint no-console: 0*/
import {Button, Grid, Group, ScrollArea, Space, Table, TextInput} from "@mantine/core";
import * as React from "react";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "@mantine/hooks";
import {X} from "tabler-icons-react";

export default function UrlApp() {
	const navigate = useNavigate();
	useDocumentTitle(`Ссылки`);
	const [loaded, setLoading] = useState(false);

	const elements = [{
		id: 1,
		url: `https://test.com/thisisVeryInterestingTest`,
		short: `jourloy.com/dbwud2`,
		count: 15
	}];
	const rows = elements.map((element) => (
		<tr key={element.id}>
			<td><ScrollArea style={{width: 150}}>{element.url}</ScrollArea></td>
			<td>{element.short}</td>
			<td>{element.count}</td>
			<td><Button compact variant={`outline`} size={`xs`} color={`red`}><X
				size={16}/></Button></td>
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
						>
							Сократить
						</Button>
					</Grid.Col>
				</Grid>
			</form>
			<Space h={`lg`}/>
			<Table>
				<thead>
					<tr>
						<th>Ссылка</th>
						<th>Сокращенная</th>
						<th>Переходов</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
}