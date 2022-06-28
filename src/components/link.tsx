import {Center, Group, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import * as React from "react";
import {BrandDiscord, BrandTwitch, Link as LinkI} from "tabler-icons-react";

export interface LinkProps {
	IconProp: string;
	color: string;
	label: string;
}

export default function Link({ IconProp, color, label }: LinkProps) {
	let Icon;

	if (IconProp === `discord`) Icon = <BrandDiscord size={20} />;
	if (IconProp === `twitch`) Icon = <BrandTwitch size={20} />;
	if (IconProp === `url`) Icon = <LinkI size={20} />;

	return (
		<UnstyledButton
			sx={(theme) => ({
				display: `block`,
				width: `100%`,
				padding: theme.spacing.md,
				borderRadius: theme.radius.sm,
				'&:hover': {
					backgroundColor: theme.colors.dark[6],
				},
			})}
		>
			<Group>
				<ThemeIcon color={color} variant="outline" size={`md`}>
					{Icon}
				</ThemeIcon>
				<Text size="md">{label}</Text>
			</Group>
		</UnstyledButton>
	);
}