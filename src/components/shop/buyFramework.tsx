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
				currentPrice={9999}
				oldPrice={14999}
				images={[
					{image: `https://github.com/stevennguyen/framework/blob/master/images/1.jpg?raw=true}`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/2.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/3.jpg?raw=true`},
					{image: `https://github.com/stevennguyen/framework/blob/master/images/4.jpg?raw=true`},
				]}
				description={`Удобная ортогональная 5х12 клавиатура с одним регулятором громкости`}
				setModuleState={setBuyKeyboard}
			/>
		</>
	);
}