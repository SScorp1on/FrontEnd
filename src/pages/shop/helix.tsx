import React from "react";
import KeyboardPage from "../../components/shop/keyboardPage";
import {Space, Stack, Text} from "@mantine/core";

const keyboardName = `Helix`;

const description = () => (
	<Stack style={{maxWidth: `840px`}}>
		<Text>
			<Text weight={700} color={`red`} span>{keyboardName}</Text> - ортогональная сплит клавиатура.
			Она имеет 64 клавиши. Данное количество клавиш идеально подходит для работы, учебы и игры.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Особенностью этой клавиатуры является ортогональное расположение клавиш. Это значит, что все клавиши расположены
			на одной линии как по вертикали, так и по горизонтали.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Сплит клавиатура предназначена для удобного расположения на столе. Есть возможность поставить руки под удобным
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
	{image: `https://camo.githubusercontent.com/15552bce07c6ad8e2a9c25054bada9f6a12239d009771b372d2c2ea7a91ed8b2/68747470733a2f2f692e696d6775722e636f6d2f5842416d796e4e2e6a7067`},
];

export default function HelixPage() {
	return (
		<KeyboardPage
			keyboardName={keyboardName}
			price={9999}
			description={description()}
			img={img}
			split={true}
			keyAmount={64}
			encoderAmount={0}
			connector={`Type-C`}
			wireless={false}
		/>
	);
}
