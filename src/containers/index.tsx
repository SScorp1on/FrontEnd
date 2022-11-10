import * as React from 'react';
import {Box, ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import {useState} from "react";

export default function DefaultContainer({children}: { children?: React.ReactElement }) {
	const theme = useMantineTheme();

	const [colorScheme, setColorScheme] = useState<ColorScheme>(`light`);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === `dark` ? `light` : `dark`));

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: colorScheme,
						components: {
							Button: {
								defaultProps: {
									color: `dark`,
									radius: theme.radius.sm,
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
			</ColorSchemeProvider>
		</>
	);
}