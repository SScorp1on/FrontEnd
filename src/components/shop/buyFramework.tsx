import {KeyboardCard} from "../Cards/keyboardCard";
import React from "react";

export default function BuyFramework() {

	return (
		<>
			<KeyboardCard
				title={`Framework`}
				currentPrice={10990}
				oldPrice={14990}
				images={[
					{image: `https://github.com/stevennguyen/framework/blob/master/images/1.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/2.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/3.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/4.jpg?raw=true`},
				]}
				description={`Ортогональная клавиатура, которая напоминает обычную и имеет 59 клавиш с 1 энкодером`}
			/>
		</>
	);
}