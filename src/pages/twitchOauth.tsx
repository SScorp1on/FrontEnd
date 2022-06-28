import {useSearchParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Center, Space, Text} from "@mantine/core";
import TwitchLoading from "../components/twitch/twitchLoading";
import TwitchLoaded from "../components/twitch/twitchLoaded";

export default function TwitchOauth() {
	const [loaded, setLoad] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const token = searchParams.get(`access_token`);

	let auth = false;

	useEffect(() => {

	});

	let AppComponent;
	if (loaded) AppComponent = <TwitchLoading/>;
	else AppComponent = <TwitchLoaded error={auth}/>;

	return (
		<>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`,
			}}>
				<Center>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>T</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>W</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>I</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>T</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>C</Text>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Space w="xl"/>
					<Text transform="uppercase" style={{fontSize: `80pt`}}>H</Text>
				</Center>
				<Space h={`lg`}/>
				<Space h={`lg`}/>
				{AppComponent}
			</Box>
		</>
	);
}