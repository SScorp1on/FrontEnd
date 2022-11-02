import React from "react";
import KeyboardPage from "../../components/shop/keyboardPage";
import {Space, Stack, Text} from "@mantine/core";

const description = () => (
	<Stack style={{maxWidth: `840px`}}>
		<Text>
			<Text weight={700} color={`red`} span>Sofle</Text> - Сплит клавиатура.
			Она имеет 58 клавиш. Это на 2 клавиши меньше, чем у обычной клавиатуры, а значит данное количество клавиш
			отлично подходит для работы, учебы и игры.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Два энкодера отлично справляются с задачами, связанными с громкостью. Есть возможность сделать тише
			или громче, поставить трек на паузу или снять с нее, а также вовсе заглушить звук.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Сплит клавиатура предназачена для удобного расположения на столе. Есть возможность поставить руки под удобным
			углом и на любом расстоянии друг от друга за счет того, что две половинки соединяются TRRS кабелем
			(похож на кабель от наушников). Подробнее прочитать про сплит клавиатуры можно
			<Text component={`a`} variant={`link`} color={`red`}> здесь</Text>.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Если количества клавиш не хватит для поставленных задач, то имеется возможность
			использовать слои. Слои – это изменение значения всех кнопок с помощью специально
			назначенной клавиши. Настраивается данная функция в специальной программе, поэтому
			справится каждый.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Эту возможность можно сравнить с цифровым рядом на обычной клавиатуре. При нажатии
			на цифру без шифта – отображается цифра. При нажатии на цифру с зажатым шифтом –
			отображается символ. Клавиатура Sofle работает по такому же принципу,
			только данную функцию можно назначить на <Text color={`red`} span>любую </Text>
			клавишу, как и значение, которое будет отображаться по нажатию.
		</Text>
	</Stack>
);

const img = [
	{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/docs/images/sofle_keyboard.jpg?raw=true`},
	{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/Images/IMG_20191110_131443.jpg?raw=true`},
	{image: `https://github.com/josefadamcik/SofleKeyboard/blob/master/Images/IMG_20200126_114622.jpg?raw=true`},
];

export default function SoflePage() {
	return (
		<KeyboardPage
			keyboardName={`Sofle`}
			price={10990}
			description={description()}
			img={img}
			split={true}
			keyAmount={58}
			encoderAmount={2}
			connector={`Type-C`}
			wireless={false}
		/>
	);
}