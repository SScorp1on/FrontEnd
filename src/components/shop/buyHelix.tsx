import {KeyboardCard} from "../Cards/keyboardCard";
import React from "react";

export default function BuyHelix() {

	return (
		<>
			<KeyboardCard
				title={`Helix`}
				currentPrice={9999}
				oldPrice={17990}
				images={[
					{image: `https://camo.githubusercontent.com/15552bce07c6ad8e2a9c25054bada9f6a12239d009771b372d2c2ea7a91ed8b2/68747470733a2f2f692e696d6775722e636f6d2f5842416d796e4e2e6a7067`},
				]}
				description={`Невероятная ортогональная сплит клавиатура с плоскими 64 клавишами`}
			/>
		</>
	);
}