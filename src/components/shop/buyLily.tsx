import {KeyboardCard} from "../Cards/keyboardCard";
import React from "react";

export default function BuyLily() {

	return (
		<>
			<KeyboardCard
				title={`Lily58`}
				currentPrice={9999}
				oldPrice={15990}
				images={[
					{image: `https://user-images.githubusercontent.com/6285554/84393842-13960900-ac37-11ea-811e-65db2948ca73.jpg?raw=true`},
					{image: `https://user-images.githubusercontent.com/6285554/53640050-6203dc00-3c6e-11e9-9434-5591ed3e414f.jpg`},
				]}
				description={`Компактная сплит клавиатура с 58 клавишами и дизайном, помещаяющимся на двух коленках`}
			/>
		</>
	);
}