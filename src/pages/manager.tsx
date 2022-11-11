import {ActionIcon, AppShell, Button, Center, Group, Header, Navbar, Space, Stack, Text, UnstyledButton} from "@mantine/core";
import {useEffect, useState} from "react";
import AddKeyboardModal from "../components/manager/addKeyboardModal";
import {createBackendContext} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {TrashX, X} from "tabler-icons-react";
import RemoveModal from "../components/manager/removeModal";
import HeaderComponent from "../components/shop/headerComponent";

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

	const [activeKeyboards, setActiveKeyboards] = useState<Keyboard | null>();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const formatKeyboards = keyboards.map((v) => (
		<>
			<Group spacing={5}>
				<Button
					variant={`outline`}
					style={{
						width: `200px`
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
					<TrashX color={`black`} strokeWidth={1} />
				</ActionIcon>
			</Group>
		</>
	));

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
					icon: <X />
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
							<Space h={0} />
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

			</AppShell>
		</>
	);
}