import {
	ActionIcon,
	AppShell,
	Button,
	Center,
	Group,
	Header,
	Navbar,
	Space,
	Stack,
	Text,
	UnstyledButton
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import AddKeyboardModal from "../components/manager/addKeyboardModal";
import {createBackendContext} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {TrashX, X} from "tabler-icons-react";
import RemoveModal from "../components/manager/removeModal";
import HeaderComponent from "../components/shop/headerComponent";
import KeyboardApp from "../components/manager/keyboardApp";

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

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function ManagerPage() {

	const [addKeyboard, setAddKeyboard] = useState(false);
	const [removeKeyboard, setRemoveKeyboard] = useState(false);

	const [removeKeyboardID, setRemoveKeyboardID] = useState(``);

	const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

	const [activeKeyboard, setActiveKeyboard] = useState<Keyboard>();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const [components, setComponents] = useState<Component[]>([]);

	const buttonColor = (name: string) => {
		if (!activeKeyboard || activeKeyboard.name !== name) return `dark`;
		return `red`;
	};

	const formatKeyboards = keyboards.map((v) => (
		<Group spacing={5} key={v._id}>
			<Button
				variant={`outline`}
				style={{
					width: `200px`
				}}
				color={buttonColor(v.name)}
				onClick={() => {
					forceUpdateComponents(v.name);
					setActiveKeyboard(v);
				}}
			>
				{v.name}
			</Button>
			<ActionIcon
				onClick={() => {
					setRemoveKeyboardID(v._id);
					setRemoveKeyboard(true);
				}}
			>
				<TrashX color={`black`} strokeWidth={1}/>
			</ActionIcon>
		</Group>
	));

	const forceUpdateComponents = (name: string) => {
		const bContext = createBackendContext();
		bContext.get(`/components/all?keyboardName=${name}`)
			.then((data) => {
				setComponents(data.data);
			})
			.catch(() => {
				showNotification({
					message: `Не получилось обновить компоненты D:`,
					color: `red`,
					icon: <X />
				});
			});
	};

	const forceUpdate = () => {
		const bContext = createBackendContext();
		bContext.get(`/keyboards/all`)
			.then((data) => {
				setKeyboards(data.data);
			})
			.catch((e) => {
				showNotification({
					message: `Не удалось загрузить клавиатуры D:`,
					color: `red`,
					icon: <X/>
				});
			});
	};

	useEffect(() => {
		forceUpdate();
	}, []);

	return (
		<>
			<RemoveModal
				opened={removeKeyboard}
				setOpened={setRemoveKeyboard}
				updateFunc={forceUpdate}
				id={removeKeyboardID}
			/>
			<AddKeyboardModal
				opened={addKeyboard}
				setOpened={setAddKeyboard}
				updateFunc={forceUpdate}
			/>
			<AppShell
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				header={
					<Header height={70}>
						<HeaderComponent
							user={user}
							userLoading={userLoading}
							setUserLoading={setUserLoading}
							width
						/>
					</Header>
				}
				navbar={
					<Navbar w={250}>
						<Stack align={`center`}>
							<Space h={0}/>
							{formatKeyboards}
							<Button
								w={235}
								onClick={() => setAddKeyboard(true)}
								style={{}}
							>
								<Text size={14}>
									Добавить клавиатуру
								</Text>
							</Button>
						</Stack>
					</Navbar>
				}
			>
				<KeyboardApp
					keyboard={activeKeyboard}
					components={components}
					updateFunc={forceUpdateComponents}
				/>
			</AppShell>
		</>
	);
}