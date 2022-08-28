import {
	Center,
	Paper,
	Space,
	Title,
	Table,
	ActionIcon,
	Pagination,
	Group,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {Menu} from "tabler-icons-react";

const elements = [
	{owner: ``, name: ``},
	{owner: ``, name: ``},
	{owner: ``, name: ``},
	{owner: ``, name: ``},
];

const rows = elements.map(element => (
	<tr key={element.name}>
		<td>{element.name}</td>
		<td>{element.owner}</td>
		<td>
			<ActionIcon color="blue" variant="outline" radius="md" size="sm">
				<Menu size={12} />
			</ActionIcon>
		</td>
	</tr>
));

export default function DiscordApp() {
	useDocumentTitle(`Discord`);

	return (
		<>
			<Group grow>
				<Paper shadow="sm" radius="md" p="md" withBorder style={{maxWidth: `550px`}}>
					<Center>
						<Title order={3}>Голосовые каналы</Title>
					</Center>
					<Table striped>
						<thead>
							<tr>
								<th>Название</th>
								<th>Владелец</th>
								<th></th>
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
					<Space h="sm" />
					<Center>
						<Pagination size="sm" total={3} radius="md" withControls={false} />
					</Center>
				</Paper>
				<Paper shadow="sm" radius="md" p="md" withBorder style={{maxWidth: `300px`, height: `285px`}}>
					<Center>
						<Title order={3}>Скидки</Title>
					</Center>
				</Paper>
			</Group>
			<Space h="md" />
			<Group grow>
				<Paper shadow="sm" radius="md" p="md" withBorder style={{maxWidth: `278px`, height: `285px`}}>
					<Center>
						<Title order={3}>Стримеры</Title>
					</Center>
				</Paper>
				<Paper shadow="sm" radius="md" p="md" withBorder style={{maxWidth: `278px`, height: `285px`}}>
					<Center>
						<Title order={3}>NSFW</Title>
					</Center>
				</Paper>
				<Paper shadow="sm" radius="md" p="md" withBorder style={{maxWidth: `278px`, height: `285px`}}>
					<Center>
						<Title order={3}>Криптовалюта</Title>
					</Center>
				</Paper>
			</Group>
		</>	
	);
}
