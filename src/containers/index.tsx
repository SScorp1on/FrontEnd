import * as React from 'react';
import {Box, MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";

export default function DefaultContainer({
	children
}: { children?: React.ReactElement }) {

	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: `dark`,
				}}
			>
				<Box>
					<NotificationsProvider>
						{children}
					</NotificationsProvider>
				</Box>
			</MantineProvider>
		</>
	);
}