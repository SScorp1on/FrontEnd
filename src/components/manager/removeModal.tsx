import {Button, Group, Modal, Stack, Text} from "@mantine/core";
import React, {useState} from "react";
import {createBackendContext} from "../../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";

interface IProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	updateFunc: () => void;
	id: string;
}

export default function RemoveModal(props: IProps) {

	const [loading, setLoading] = useState(false);

	const removeKeyboard = () => {
		setLoading(true);
		const bContext = createBackendContext();
		bContext.post(`/keyboards/remove`, {id: props.id})
			.then(() => {
				showNotification({
					message: `Клавиатура успешно удалена`,
					color: `green`,
					icon: <Check />
				});
				setLoading(false);
				props.updateFunc();
				props.setOpened(false);
			})
			.catch(() => {
				showNotification({
					message: `Не получилось удалить клавиатуру D:`,
					color: `red`,
					icon: <X />
				});
				setLoading(false);
				props.setOpened(false);
			});
	};

	return (
		<Modal
			opened={props.opened}
			onClose={() => props.setOpened(false)}
			withCloseButton={false}
			centered
		>
			<Stack align={`center`}>
				<Text
					weight={700}
					size={25}
					tt={`uppercase`}
				>
					Точно?
				</Text>
				<Group>
					<Button
						color={`red`}
						w={130}
						loading={loading}
						onClick={removeKeyboard}
						variant={`outline`}
					>
						Да
					</Button>
					<Button
						color={`green`}
						w={130}
						onClick={() => props.setOpened(false)}
						loading={loading}
						variant={`outline`}
					>
						Нет
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
}