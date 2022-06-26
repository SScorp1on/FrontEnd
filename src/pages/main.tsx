import * as React from 'react';
import {Box, Center, Space, Text} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Main() {
	useDocumentTitle(`Jourloy`);
	return (
		<>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`
			}}>
				<Center>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>J</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>O</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>U</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`, transform: `rotate(180deg)`}}>R</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>L</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>O</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>Y</Text>
				</Center>
			</Box>
		</>
	);
}
