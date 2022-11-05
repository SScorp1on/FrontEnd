import {KeyboardCard} from "../Cards/keyboardCard";
import React from "react";

export default function BuyErgodash() {
	return (
		<>
			<KeyboardCard
				title={`ErgoDash`}
				currentPrice={10990}
				oldPrice={15990}
				images={[
					{image: `https://github.com/omkbd/picture/blob/master/Ergodash.jpg?raw=true`},
					{image: `https://github.com/omkbd/picture/blob/master/finish.jpg?raw=true`},
				]}
				description={`Крайне удобная сплит клавиатура имеющая 68 клавиш, которых хватит для всех нужд`}
			/>
		</>
	);
}