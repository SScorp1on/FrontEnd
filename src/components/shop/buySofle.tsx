import {KeyboardCard} from "../Cards/keyboardCard";
import React from "react";

export default function BuySofle() {

	return (
		<>
			<KeyboardCard
				title={`Sofle`}
				currentPrice={10990}
				oldPrice={15990}
				images={[
					{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/docs/images/sofle_keyboard.jpg`},
					{image: `https://github.com/josefadamcik/SofleKeyboard/raw/master/Images/IMG_20191110_131443.jpg`},
					{image: `https://github.com/josefadamcik/SofleKeyboard/blob/master/Images/IMG_20200126_114622.jpg?raw=true`},
				]}
				description={`Одна из самых популяпрных сплит клавиатур с 58 клавишами и двумя энкодерами`}
			/>
		</>
	);
}