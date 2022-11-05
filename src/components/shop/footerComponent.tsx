import {Box, Button, Center, Group} from "@mantine/core";
import React from "react";

export default function FooterComponent() {

	const width = `200px`;

	return (
		<Center>
			<Box style={{width: `840px`, marginTop: `15px`}}>
				<Group
					position={`apart`}
					align={`center`}
					spacing={`xs`}
				>
					<Button style={{width: width}}>Доставка</Button>
					<Button style={{width: width}}>Контакты</Button>
					<Button style={{width: width}}>Вакансии</Button>
					<Button style={{width: width}}>Возврат</Button>
				</Group>
			</Box>
		</Center>
	);
}