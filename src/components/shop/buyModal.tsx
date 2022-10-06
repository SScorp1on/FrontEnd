import {Button, Center, Modal, Radio, Select, Space, Stack, Text, Textarea} from "@mantine/core";
import React, {useState} from "react";

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
		{value: `${cableType}-typeC`, label:`${label} - TypeC`},
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
	const [switchColor, setSwitchColor] = useState(``);
	const [keycapColor, setKeycapColor] = useState(``);
	const [keycapText, setKeycapText] = useState(``);
	const [cableType, setCableType] = useState(``);

	const data = cableTypesGet(cableKeyboardType);

	return (
		<Modal
			opened={buyKeyboard}
			onClose={() => setBuyKeyboard(false)}
			withCloseButton={false}
		>
			<Center>
				<Text color={`red`} weight={700} sx={{fontSize: 35}}>{name}</Text>
			</Center>
			<Space h={`xl`}/>
			<Select
				label={`Выбери цвет свитчей`}
				defaultValue={`brown`}
				onChange={(e) => setSwitchColor(e || `brown`)}
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
			{keycapColor === `custom` ? (
				<>
					<Space h={`md`}/>
					<Textarea
						radius={`md`}
						autosize
						placeholder={`Распиши какой набор клавиш ты хочешь. Цена не меняется`}/>
				</>
			) :
				<>
					<Space h={`md`}/>
					<Select
						label={`Выбери маркировку на клавишах`}
						defaultValue={`off`}
						onChange={(e) => setKeycapText(e || `off`)}
						data={[
							{value: `off`, label: `Без букв`},
							{value: `lat`, label: `Только английские буквы`},
							{value: `cyr`, label: `Английские и русские буквы`},
						]}
					/>
				</>
			}
			{wireless === true ?
				<>
				</> :
				<>
					<Space h={`md`}/>
					<Select
						label={`Выбери тип кабеля`}
						onChange={(e) => setCableType(e || ``)}
						data={data}
					/>
				</>
			}
			<Stack align={`center`} sx={{marginTop: `40px`}}>
				<Text color={`red`} weight={700} sx={{fontSize: 25}}>Итоговая цена: {formatter.format(9999)}</Text>
				<Button fullWidth color={`red`}>
					Купить
				</Button>
			</Stack>
		</Modal>
	);
}