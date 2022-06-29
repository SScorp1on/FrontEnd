import * as React from 'react';
import {Affix, Box, Button, Center, Footer, Space, Text, Transition} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Main() {
	useDocumentTitle(`Jourloy`);
	// @ts-ignore
	return (
		<>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`
			}}>
				<Center>
					<div style={{
						display: `flex`,
						justifyContent: `space-evenly`,
						width: 1200,
					}}>
						<Text style={{fontSize: `80pt`}}>J</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`}}>U</Text>
						<Text style={{fontSize: `80pt`, transform: `rotate(180deg)`}}>R</Text>
						<Text style={{fontSize: `80pt`}}>L</Text>
						<Text style={{fontSize: `80pt`}}>O</Text>
						<Text style={{fontSize: `80pt`}}>Y</Text>
					</div>
				</Center>
			</Box>
		</>
	);
}
