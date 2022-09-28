import {KeyboardCard} from "../Cards/keyboardCard";
import React, {useState} from "react";
import {Modal, Center, Text, Radio, Space, Button, Textarea, Stack} from "@mantine/core";

const formatter = new Intl.NumberFormat(`ru-RU`, {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function BuyFramework() {

	const [buyKeyboard, setBuyKeyboard] = useState(false);

	const [switchColor, setSwitchColor] = useState(``);
	const [keycapColor, setKeycapColor] = useState(``);
	const [cableType, setCableType] = useState(``);

	return (
		<>
			<Modal
				opened={buyKeyboard}
				onClose={() => setBuyKeyboard(false)}
				withCloseButton={false}
			>
				<Center>
					<Text color={`red`} weight={700} sx={{fontSize: 35}}>Framework</Text>
				</Center>
				<Space h={`md`}/>
				<Radio.Group
					label={`Выбери цвет свитчей`}
					value={switchColor}
					onChange={setSwitchColor}
				>
					<Radio value="red" label="Красный" color={`red`}/>
					<Radio value="brown" label="Коричневый" color={`orange`}/>
					<Radio value="white" label="Белый" color={`gray`}/>
					<Radio value="yellow" label="Желтый" color={`yellow`}/>
				</Radio.Group>
				<Space h={`lg`}/>
				<Radio.Group
					label={`Выбери цвет клавиш`}
					value={keycapColor}
					onChange={setKeycapColor}
				>
					<Radio value="white" label="Белый" color={`gray`}/>
					<Radio value="black" label="Черный" color={`dark`}/>
					<Radio value="custom" label="Свой" color={`red`}/>
				</Radio.Group>
				{keycapColor === `custom` ? (
					<>
						<Space h={`md`}/>
						<Textarea
							radius={`md`}
							autosize
							placeholder={`Распиши какой набор клавиш ты хочешь. Помни, что максимум всего 59 клавиш и 1 регулятор. Цена не меняется`}/>
					</>
				) : <></>}
				<Space h={`lg`}/>
				<Radio.Group
					label={`Выбери тип кабеля`}
					value={cableType}
					onChange={setCableType}
				>
					<Radio value="usb" label="Type C - USB" color={`red`}/>
					<Radio value="type_c" label="Type-C - Type-C" color={`red`}/>
				</Radio.Group>
				<Stack align={`center`} sx={{marginTop: `40px`}}>
					<Text color={`red`} weight={700} sx={{fontSize: 25}}>Итоговая цена: {formatter.format(9999)}</Text>
					<Button fullWidth color={`red`}>
						Купить
					</Button>
				</Stack>
			</Modal>
			<KeyboardCard
				title={`Framework`}
				currentPrice={9999}
				oldPrice={14999}
				images={[
					{image: `https://github.com/stevennguyen/framework/blob/master/images/1.jpg?raw=true}`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/2.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/3.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/4.jpg?raw=true`},
				]}
				description={`Удобная ортогональная 5х12 клавиатура с одним регулятором громкости`}
				setModuleState={setBuyKeyboard}
			/>
		</>
	);
}