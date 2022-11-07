import {Box, Button, Center, Group} from "@mantine/core";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function FooterComponent() {

	const maxWidth = `150px`;
	const navigate = useNavigate();

	const toDelivery= () => {
		navigate(`/shop/delivery`);
	};

	return (
		<Center>
			<Box style={{marginTop: `15px`}}>
				<Group
					position={`center`}
					align={`center`}
					spacing={15}
					style={{width: `870px`}}
				>
					<Button w={maxWidth}>Контакты</Button>
					<Button w={maxWidth} onClick={toDelivery}>Доставка</Button>
					<Button w={maxWidth}>Вакансии</Button>
				</Group>
			</Box>
		</Center>
	);
}