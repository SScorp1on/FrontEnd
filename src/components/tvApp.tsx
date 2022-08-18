import {
	Accordion,
	ActionIcon,
	Avatar,
	Badge,
	Button,
	Chip,
	Group,
	Space,
	Text,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {Apps, Edit, X} from "tabler-icons-react";

const charactersList = [
	{
		id: `futurama`,
		image: `https://img.icons8.com/clouds/256/000000/futurama-bender.png`,
		label: `Futurama`,
		star: 1,
		content: `Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.`,
	},

	{
		id: `carol`,
		image: `https://img.icons8.com/clouds/256/000000/futurama-mom.png`,
		label: `Carol Miller`,
		star: 2,
		content: `Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.`,
	},

	{
		id: `homer`,
		image: `https://img.icons8.com/clouds/256/000000/homer-simpson.png`,
		label: `Homer Simpson`,
		star: 3,
		content: `Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.`,
	},

	{
		id: `homer`,
		image: `https://img.icons8.com/clouds/256/000000/homer-simpson.png`,
		label: `Homer Simpson`,
		star: 0,
		content: `Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.`,
	},

	{
		id: `homer`,
		image: `https://img.icons8.com/clouds/256/000000/homer-simpson.png`,
		label: `Homer Simpson`,
		star: 4,
		content: `Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.`,
	},

	{
		id: `homer`,
		image: `https://img.icons8.com/clouds/256/000000/homer-simpson.png`,
		label: `Homer Simpson`,
		star: 33,
		content: `Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.`,
	},
];

interface AccordionLabelProps {
	label: string;
	image: string;
	star: number;
}

function AccordionLabel({label, image, star}: AccordionLabelProps) {
	return (
		<Group noWrap>
			<Avatar src={image} radius="xl" size="lg" />
			<div>
				<Text>{label}</Text>
				<Text size="sm" color="dimmed" weight={400}>
					{star === 0 ? (
						<Badge color="gray" size="sm" radius="sm" variant="outline">
							Не просмотрен
						</Badge>
					) : star === 1 ? (
						<Badge color="red" size="sm" radius="sm" variant="outline">
							Плохо
						</Badge>
					) : star === 2 ? (
						<Badge color="yellow" size="sm" radius="sm" variant="outline">
							Нормально
						</Badge>
					) : star === 3 ? (
						<Badge color="green" size="sm" radius="sm" variant="outline">
							Хорошо
						</Badge>
					) : star === 4 ? (
						<Badge color="cyan" size="sm" radius="sm" variant="outline">
							Великолепно
						</Badge>
					) : (
						<Badge color="dark" radius="sm" size="sm" variant="outline">
							Ошибка
						</Badge>
					)}
				</Text>
			</div>
		</Group>
	);
}

export default function TvApp() {
	useDocumentTitle(`Фильмы`);

	const items = charactersList.map(item => (
		<Accordion.Item value={item.id} key={item.label}>
			<Accordion.Control>
				<AccordionLabel {...item} />
			</Accordion.Control>
			<Accordion.Panel>
				<Text size="sm">{item.content}</Text>
				<Space h="sm" />
				<Group>
					<ActionIcon color="red" size="sm" radius="md" variant="outline">
						<X size={14} />
					</ActionIcon>
					<ActionIcon color="yellow" size="sm" radius="md" variant="outline">
						<Edit size={14} />
					</ActionIcon>
				</Group>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<>
			<Group>
				<Button radius="md" variant="outline" leftIcon={<Apps />}>
					Добавить
				</Button>
				<Chip.Group position="left" multiple>
					<Chip radius="md" value="0" color="gray" >Не просмотрено</Chip>
					<Chip radius="md" value="1" color="red" >Плохо</Chip>
					<Chip radius="md" value="2" color="yellow" >Нормально</Chip>
					<Chip radius="md" value="3" color="green" >Хорошо</Chip>
					<Chip radius="md" value="4" color="cyan" >Великолепно</Chip>
				</Chip.Group>
			</Group>
			<Space h="md" />
			<Accordion chevronPosition="right" variant="contained">
				{items}
			</Accordion>
		</>
	);
}
