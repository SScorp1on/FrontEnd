import React from "react";
import KeyboardPage from "../../components/shop/keyboardPage";
import {Space, Stack, Text} from "@mantine/core";

const keyboardName = `Lily58`;

const description = () => (
	<Stack style={{maxWidth: `840px`}}>
		<Text>
			<Text weight={700} color={`red`} span>{keyboardName}</Text> - сплит клавиатура.
			Она имеет 56 клавиш. Это не сильно меньше обычной клавиатуры, а значит данное количество клавиш отлично
			подойдет как для работы или учебы, так и для игры.
		</Text>
		<Space h={`sm`}/>
		<Text>
			Особенностью этой клавиатуры является более компактный дизайн, по сравнению с большинством других. Это
			значит, что такая клавиатура будет занимать меньше места на столе и при желании ее легко можно взять с
			собой, если нужно куда-то уйти.
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
			отображается символ. Клавиатура {keyboardName} работает по такому же принципу,
			только данную функцию можно назначить на <Text color={`red`} span>любую </Text>
			клавишу, как и значение, которое будет отображаться по нажатию.
		</Text>
	</Stack>
);

const img = [
	{image: `https://user-images.githubusercontent.com/6285554/84393842-13960900-ac37-11ea-811e-65db2948ca73.jpg?raw=true`},
	{image: `https://user-images.githubusercontent.com/6285554/53640050-6203dc00-3c6e-11e9-9434-5591ed3e414f.jpg?raw=true`},
];

export default function LilyPage() {
	return (
		<KeyboardPage
			keyboardName={keyboardName}
			price={10990}
			description={description()}
			img={img}
			split={true}
			keyAmount={56}
			encoderAmount={0}
			connector={`Type-C`}
			wireless={false}
		/>
	);
}