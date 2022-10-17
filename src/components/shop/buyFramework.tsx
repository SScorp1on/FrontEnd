import {KeyboardCard} from "../Cards/keyboardCard";
import React, {useState} from "react";
import BuyModal from "./buyModal";

export default function BuyFramework() {

	const [buyKeyboard, setBuyKeyboard] = useState(false);

	return (
		<>
			<BuyModal
				buyKeyboard={buyKeyboard}
				setBuyKeyboard={setBuyKeyboard}
				wireless={false}
				name={`Framework`}
				cableKeyboardType={`typeC`}
			/>
			<KeyboardCard
				title={`Framework`}
				currentPrice={10990}
				oldPrice={14990}
				images={[
					{image: `https://github.com/stevennguyen/framework/blob/master/images/1.jpg?raw=true}`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/2.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/3.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/4.jpg?raw=true`},
				]}
				description={`Удобная ортогональная клавиатура, напоминаяющая обычную клавиатуру и имеющая 59 клавиш и 1 энкодер`}
				setModuleState={setBuyKeyboard}
			/>
		</>
	);
}