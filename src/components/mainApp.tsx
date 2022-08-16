import UrlApp from "./urlApp";
import {Box} from "@mantine/core";
import DiscordApp from "./discordApp";
import TvApp from "./tvApp";

export interface MainAppProp {
	appState: string
}

export default function MainApp({appState}: MainAppProp) {
	let AppComponent;

	if (appState === `url`) AppComponent = <UrlApp />;
	if (appState === `discord`) AppComponent = <DiscordApp />;
	if (appState === `tv`) AppComponent = <TvApp />;

	return (
		<>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`,
				maxWidth: `1000px`, maxHeight: `700px`,
				marginLeft: `150px`,
			}}>
				{AppComponent}
			</Box>
		</>
	);
}