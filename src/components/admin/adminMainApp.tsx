import {Box} from "@mantine/core";
import AdminKeyboardApp from "./adminKeyboardApp";

export interface MainAppProp {
	appState: string
}

export default function AdminMainApp({appState}: MainAppProp) {
	let AppComponent;

	if (appState === `keyboard`) AppComponent = <AdminKeyboardApp />;

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