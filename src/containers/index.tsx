import * as React from 'react';
import {Box, MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";

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
				<ModalsProvider>
					<Box>
						<NotificationsProvider>
							{children}
						</NotificationsProvider>
					</Box>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
}