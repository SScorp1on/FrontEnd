import React from "react";
import KeyboardPage from "../../components/shop/keyboardPage";
import {Space, Stack, Text} from "@mantine/core";

const keyboardName = `Helix`;

const description = () => (
	<Stack
		style={{
			maxWidth: `840px`,
			width: `100%`,
		}}
	>
		<Text>
			<Text weight={700} color={`red`} span>{keyboardName}</Text> - сплит клавиатура.
			Она имеет 68 клавиши. Данное количество клавиш идеально подходит для работы, учебы и игры.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Особенностью этой клавиатуры является то, что она имеет крайне большое количетсво клавиш. Здесь можно
			разместить всю русскую раскладку, цифры и даже останется место для спецсимволов.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Сплит клавиатура предназачена для удобного расположения на столе. Есть возможность поставить руки под удобным
			углом и на любом расстоянии друг от друга за счет того, что две половинки соединяются TRRS кабелем
			(похож на кабель от наушников).
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
			отображается символ. Клавиатура {keyboardName} работает по такому же принципу,
			только данную функцию можно назначить на <Text color={`red`} span>любую </Text>
			клавишу, как и значение, которое будет отображаться по нажатию.
		</Text>
	</Stack>
);

const img = [
	{image: `https://github.com/omkbd/picture/blob/master/Ergodash.jpg?raw=true`},
	{image: `https://github.com/omkbd/picture/blob/master/finish.jpg?raw=true`},
];

export default function ErgodashPage() {
	return (
		<KeyboardPage
			keyboardName={keyboardName}
			price={9999}
			description={description()}
			img={img}
			split={true}
			keyAmount={68}
			encoderAmount={0}
			connector={`Type-C`}
			wireless={false}
		/>
	);
}