import {Center, Group, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import * as React from "react";
import {
	BrandDiscord,
	BrandTwitch, CurrencyBitcoin,
	CurrencyEthereum, Keyboard,
	Link as LinkI,
	ShoppingCart, Users, Video
} from "tabler-icons-react";

export interface LinkProps {
	IconProp: string;
	label: string;
	setAppState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Link({ IconProp, label, setAppState }: LinkProps) {
	let Icon;
	let disabled = true;

	if (IconProp === `ds`) {
		Icon = <BrandDiscord size={20} />;
		disabled = false;
	}
	if (IconProp === `twitch`) Icon = <BrandTwitch size={20} />;
	if (IconProp === `url`) {
		Icon = <LinkI size={20} />;
		disabled = false;
	}
	if (IconProp === `cart`) Icon = <ShoppingCart size={20} />;
	if (IconProp === `trade`) Icon = <CurrencyBitcoin size={20} />;
	if (IconProp === `tv`) {
		Icon = <Video size={20} />;
		disabled = false;
	}

	if (IconProp === `keyboard`) {
		Icon = <Keyboard size={20} color="red" />;
		disabled = false;
	}
	if (IconProp === `users`) {
		Icon = <Users size={20} color="red" />;
		disabled = false;
	}

	const onButton = (s: string) => {
		setAppState(s);
	};

	return (
		<UnstyledButton
			onClick={() => onButton(IconProp)}
			sx={(theme) => ({
				display: `block`,
				width: `100%`,
				padding: theme.spacing.md,
				borderRadius: theme.radius.sm,
				'&:hover': {
					backgroundColor: theme.colors.dark[6],
				},
			})}
			disabled={disabled}
		>
			<Group>
				<ThemeIcon color={`red`} variant="outline" size={`lg`}>
					{Icon}
				</ThemeIcon>
				<Text size="md">{label}</Text>
			</Group>
		</UnstyledButton>
	);
}