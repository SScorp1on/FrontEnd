import {
	ActionIcon,
	Box,
	Button,
	Card,
	Center,
	ColorSwatch,
	Divider,
	Group,
	HoverCard, MantineTheme,
	Menu,
	Paper,
	Stack,
	Text,
	UnstyledButton, useMantineTheme,
} from "@mantine/core";
import React, {useState} from "react";
import ComponentAddModal from "./componentAddModal";
import {AdjustmentsHorizontal, Check, X} from "tabler-icons-react";
import {createBackendContext} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";

interface Keyboard {
	_id: string;
	name: string;
	description: string;
	githubURL: string;
	previewURL: string;
	price: number;
	priceOld: number;
	visible: boolean;
}

interface Component {
	_id: string;
	name: string;
	price: number;
	link: string;
	delivery: number;
	status: `unchecked` | `checked` | `error` | `reserve`;
	amount: number;
}

interface IProps {
	keyboard: Keyboard | undefined;
	components: Component[];
	updateFunc: (name: string) => void;
}

const getColorOfStatus = (status: `unchecked` | `checked` | `error` | `reserve`) => {
	if (status === `unchecked`) return `yellow`;
	if (status === `checked`) return `green`;
	if (status === `error`) return `red`;
	return `purple`;
};

const getBackgroundColor = (status: `unchecked` | `checked` | `error` | `reserve`, theme: MantineTheme) => {
	if (status === `unchecked`) return theme.colors.yellow[2];
	if (status === `checked`) return theme.colors.green[2];
	if (status === `error`) return theme.colors.red[2];
	return theme.colors.grape[2];
};

export default function KeyboardApp({keyboard, components, updateFunc}: IProps) {

	const theme = useMantineTheme();

	const [addComponent, setAddComponent] = useState(false);

	if (!keyboard) {
		return (
			<>
				<Card
					style={{
						marginLeft: `250px`
					}}
				>
					<Center>
						<Text
							weight={700}
							size={20}
						>
							Клавиатура не выбрана
						</Text>
					</Center>
				</Card>
			</>
		);
	}

	const changeStatus = (c: Component, newStatus: `unchecked` | `checked` | `error` | `reserve`) => {
		const bContext = createBackendContext();
		c.status = newStatus;
		bContext.post(`/components/edit`, c)
			.then(() => {
				showNotification({
					message: `Статус успешно обновлен`,
					color: `green`,
					icon: <Check />
				});
				updateFunc(keyboard.name);
			})
			.catch(() => {
				showNotification({
					message: `Не получилось обновить статус D:`,
					color: `red`,
					icon: <X />
				});
			});
	};

	const formatComponents = (array: Component[]) => array.map((v) => (
		<Paper
			key={v._id}
			h={50}
			shadow={`sm`}
			bg={getBackgroundColor(v.status, theme)}
		>
			<Group position={`apart`} style={{marginTop: `12px`, marginLeft: `10px`, marginRight: `10px`}}>
				<Group spacing={15}>
					<Menu shadow="md" width={150} position={`bottom`}>
						<Menu.Target>
							<UnstyledButton>
								<ColorSwatch size={15} color={getColorOfStatus(v.status)} />
							</UnstyledButton>
						</Menu.Target>

						<Menu.Dropdown>
							<Stack>
								<Button color={`green`} compact variant={`outline`} onClick={() => changeStatus(v, `checked`)}>
									Проверено
								</Button>
								<Button color={`yellow`} compact variant={`outline`} onClick={() => changeStatus(v, `unchecked`)}>
									Не проверено
								</Button>
								<Button color={`red`} compact variant={`outline`} onClick={() => changeStatus(v, `error`)}>
									Ошибка
								</Button>
								<Button color={`grape`} compact variant={`outline`} onClick={() => changeStatus(v, `reserve`)}>
									Запас
								</Button>
							</Stack>

						</Menu.Dropdown>
					</Menu>
					<Text>
						{v.name}
					</Text>
				</Group>

				<Group>
					<Text align={`center`} w={100} variant={`link`} component={`a`} href={v.link}>
						Ссылка
					</Text>
					<Divider orientation={`vertical`} color={`dark`} />
					<Text w={100} align={`center`}>
						{v.price} руб
					</Text>
					<Divider orientation={`vertical`} color={`dark`} />
					<Text w={80} align={`center`}>
						{v.delivery} дней
					</Text>
					<Divider orientation={`vertical`} color={`dark`} />
					<Text w={50} align={`center`}>
						{v.amount} шт
					</Text>
					<Divider orientation={`vertical`} color={`dark`} />
					<ActionIcon variant={`subtle`}>
						<AdjustmentsHorizontal color={`black`} strokeWidth={1}/>
					</ActionIcon>
				</Group>
			</Group>
		</Paper>
	));

	const errorComponents = components.filter((v) => v.status === `error`);
	const checkedComponents = components.filter((v) => v.status === `checked`);
	const uncheckedComponents = components.filter((v) => v.status === `unchecked`);
	const reserveComponents = components.filter((v) => v.status === `reserve`);

	return (
		<>

			<ComponentAddModal
				opened={addComponent}
				setOpened={setAddComponent}
				updateFunc={updateFunc}
				keyboardName={keyboard.name}
			/>
			<Box
				style={{
					marginLeft: `250px`,
				}}
			>
				<Stack>
					<Group position={`apart`}>
						<Group>
							<Button
								w={200}
								variant={`outline`}
								onClick={() => setAddComponent(true)}
							>
								Добавить компонент
							</Button>
						</Group>
						<Group>
							<Button
								w={150}
								variant={`outline`}
							>
								Github
							</Button>
							<Button
								w={150}
								variant={`outline`}
							>
								Настройки
							</Button>
						</Group>
					</Group>
					<Divider color={`dark`} style={{marginTop: `15px`, marginBottom: `15px`}}/>
					<Stack spacing={10}>
						{
							errorComponents.length > 0 ?
								<Box
									style={{
										borderRadius: `5px`
									}}
								>
									<Stack spacing={10} style={{margin: `10px`}}>
										{formatComponents(errorComponents)}
									</Stack>
								</Box>
								: <></>
						}
						{
							checkedComponents.length > 0 ?
								<Box
									style={{
										borderRadius: `5px`
									}}
								>
									<Stack spacing={10} style={{margin: `10px`}}>
										{formatComponents(checkedComponents)}
									</Stack>
								</Box>
								: <></>
						}
						{
							uncheckedComponents.length > 0 ?
								<Box
									style={{
										borderRadius: `5px`
									}}
								>
									<Stack spacing={10} style={{margin: `10px`}}>
										{formatComponents(uncheckedComponents)}
									</Stack>
								</Box>
								: <></>
						}
						{
							reserveComponents.length > 0 ?
								<Box
									style={{
										borderRadius: `5px`
									}}
								>
									<Stack spacing={10} style={{margin: `10px`}}>
										{formatComponents(reserveComponents)}
									</Stack>
								</Box>
								: <></>
						}
					</Stack>
				</Stack>
			</Box>
		</>
	);
}