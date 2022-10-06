import {KeyboardCard} from "../Cards/keyboardCard";
import React, {useState} from "react";
import BuyModal from "./buyModal";

export default function BuySofle() {

	const [buyKeyboard, setBuyKeyboard] = useState(false);

	return (
		<>
			<BuyModal
				buyKeyboard={buyKeyboard}
				setBuyKeyboard={setBuyKeyboard}
				wireless={true}
				name={`Sofle`}
				cableKeyboardType={`microUSB`}
			/>
			<KeyboardCard
				title={`Sofle`}
				currentPrice={9990}
				oldPrice={15999}
				images={[
					{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/docs/images/sofle_keyboard.jpg`},
					{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/Images/IMG_20191110_131443.jpg`},
					{image: `https://github.com/josefadamcik/SofleKeyboard/blob/master/Images/IMG_20200126_114622.jpg?raw=true`},
				]}
				description={`Популярная 6х4 + 5 клавиш сплит клавиатура с двумя энкодерами и удобным дизайном`}
				setModuleState={setBuyKeyboard}
			/>
		</>
	);
}