import * as React from 'react';
import {Box, Button, ButtonStylesParams, MantineProvider, useMantineTheme} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";

export default function DefaultContainer({children}: { children?: React.ReactElement }) {
	const theme = useMantineTheme();

	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: `light`,
					components: {
						Button: {
							defaultProps: {
								color: `dark`,
							},
						},
					}
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