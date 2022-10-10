import {
	Button,
	Center, createStyles,
	Group,
	Modal,
	Radio,
	Select,
	Space,
	Stack,
	Text,
	Textarea,
	useMantineTheme
} from "@mantine/core";
import React, {useState} from "react";
import {showNotification} from "@mantine/notifications";
import {X} from "tabler-icons-react";

export interface BuyModalProps {
	buyKeyboard: boolean;
	setBuyKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
	wireless?: boolean;
	name: string;
	cableKeyboardType: `typeC` | `microUSB`;
}

const cableTypesGet = (cableType: `typeC` | `microUSB`, wireless?: boolean) => {
	const label = cableType === `typeC` ? `Type-C` : `MicroUSB`;
	const arr = [
		{value: `${cableType}-typeC`, label: `${label} - TypeC`},
		{value: `${cableType}-usb`, label: `${label} - USB`},
	];
	if (wireless) arr.push({value: `wireless`, label: `Беспроводная`});
	return arr;
};

const formatter = new Intl.NumberFormat(`ru-RU`, {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function BuyModal({buyKeyboard, setBuyKeyboard, wireless, name, cableKeyboardType}: BuyModalProps) {
	const theme = useMantineTheme();

	const [switchColor, setSwitchColor] = useState(``);
	const [keycapColor, setKeycapColor] = useState(``);
	const [keycapText, setKeycapText] = useState(``);
	const [cableType, setCableType] = useState(``);
	const [keyboardMaster, setKeyboardMaster] = useState(false);

	const data = cableTypesGet(cableKeyboardType, wireless);
	const totalPrice = 9990 + (cableType === `wireless` ? 3000 : 0);

	const onButtonClick = () => {
		showNotification({
			title: `Извини`,
			message: `Сейчас мы не готовы принять заказ`,
			color: `red`,
			icon: <X/>,
			disallowClose: true,
		});
	};

	return (
		<Modal
			opened={buyKeyboard}
			onClose={() => setBuyKeyboard(false)}
			withCloseButton={false}
			style={{}}
		>
			<Center>
				<Text color={`dark`} weight={700} sx={{fontSize: 35}}>{name}</Text>
			</Center>
			<Space h={`xl`}/>
			<Select
				label={`Выбери маркировку на клавишах`}
				defaultValue={`off`}
				onChange={(e) => setKeycapText(e || `off`)}
				styles={(theme) => ({
					input: {
						borderColor: theme.colors.dark[7],
						'&:hover': { borderColor: theme.colors.dark[7] },
						'&:focus': { borderColor: theme.colors.dark[7] },
					},
					item: {
						// applies styles to selected item
						'&[data-selected]': {
							'&, &:hover': {
								backgroundColor: theme.colors.dark[7],
								color: `white`,
							},
						},
					},
				})}
				data={[
					{value: `off`, label: `Без букв`},
					{value: `lat`, label: `Только английские буквы`},
					{value: `cyr`, label: `Английские и русские буквы`},
				]}
			/>
			<Space h={`md`}/>
			{!keyboardMaster ?
				<>
					<Group position={`center`}>
						<Button
							size={`xs`}
							variant={`outline`}
							onClick={() => setKeyboardMaster(true)}
						>Я разбираюсь в клавиатурах</Button>
					</Group>
				</> :
				<>
					<Select
						label={`Выбери цвет свитчей`}
						defaultValue={`brown`}
						onChange={(e) => setSwitchColor(e || `brown`)}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': { borderColor: theme.colors.dark[7] },
								'&:focus': { borderColor: theme.colors.dark[7] },
							},
							item: {
								// applies styles to selected item
								'&[data-selected]': {
									'&, &:hover': {
										backgroundColor: theme.colors.dark[7],
										color: `white`,
									},
								},
							},
						})}
						data={[
							{value: `brown`, label: `Коричневые`},
							{value: `red`, label: `Красные`},
							{value: `yellow`, label: `Желтые`},
							{value: `blue`, label: `Голубые`},
							{value: `white`, label: `Белые`},
						]}
					/>
					<Space h={`lg`}/>
					<Select
						label={`Выбери цвет клавиш`}
						defaultValue={`white`}
						onChange={(e) => setKeycapColor(e || `white`)}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': { borderColor: theme.colors.dark[7] },
								'&:focus': { borderColor: theme.colors.dark[7] },
							},
							item: {
								// applies styles to selected item
								'&[data-selected]': {
									'&, &:hover': {
										backgroundColor: theme.colors.dark[7],
										color: `white`,
									},
								},
							},
						})}
						data={[
							{value: `red`, label: `Красные`},
							{value: `yellow`, label: `Желтые`},
							{value: `green`, label: `Зеленые`},
							{value: `blue`, label: `Синие`},
							{value: `purple`, label: `Фиолетовые`},
							{value: `white`, label: `Белые`},
							{value: `black`, label: `Черные`},
							{value: `custom`, label: `Свой набор`},
						]}
					/>
					{keycapColor === `custom` ?
						<>
							<Space h={`md`}/>
							<Textarea
								radius={`md`}
								autosize
								placeholder={`Распиши какой набор клавиш ты хочешь. Цена не меняется`}/>
						</> :
						<>
						</>
					}
					<Space h={`md`}/>
					<Select
						label={`Выбери тип кабеля`}
						onChange={(e) => setCableType(e || ``)}
						styles={(theme) => ({
							input: {
								borderColor: theme.colors.dark[7],
								'&:hover': { borderColor: theme.colors.dark[7] },
								'&:focus': { borderColor: theme.colors.dark[7] },
							},
							item: {
								// applies styles to selected item
								'&[data-selected]': {
									'&, &:hover': {
										backgroundColor: theme.colors.dark[7],
										color: `white`,
									},
								},
							},
						})}
						data={data}
					/>
					<Space h={`md`}/>
					<Center>
						<Button
							size={`xs`}
							variant={`outline`}
							onClick={() => setKeyboardMaster(false)}
						>Я не разбираюсь в клавиатурах</Button>
					</Center>
				</>
			}
			<Stack align={`center`} sx={{marginTop: `40px`}}>
				<Text color={`dark`} weight={700} sx={{fontSize: 25}}>Итоговая
					цена: {formatter.format(totalPrice)}</Text>
				<Button
					fullWidth
					color={`dark`}
					onClick={onButtonClick}
				>
					Купить
				</Button>
			</Stack>
		</Modal>
	);
}