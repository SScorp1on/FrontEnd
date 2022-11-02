// Thanks SScorp1on

import {
	createStyles,
	Image,
	Card,
	Text,
	Group,
	Center,
	Badge,
	Indicator,
	ActionIcon,
	Stack,
	useMantineTheme,
	Button
} from '@mantine/core';
import {Carousel} from '@mantine/carousel';
import {IconHeart, IconShoppingCart, IconStar} from "@tabler/icons";
import React from "react";
import {useTheme} from "@emotion/react";
import {useNavigate} from "react-router-dom";

const formatter = new Intl.NumberFormat(`ru-RU`, {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

const useStyles = createStyles((theme, _params, getRef) => ({
	price: {
		color: theme.colors.red[6],
	},
	sale: {
		position: `absolute`,
		top: `5px`,
		right: `5px`,
		pointerEvents: `none`,
	},
	types: {
		position: `absolute`,
		marginTop: `-25px`,
		pointerEvents: `none`,
		left: `5px`
	},
	carousel: {
		width: `100%`,
		'&:hover': {
			[`& .${getRef(`carouselControls`)}`]: {
				opacity: 1,
			},
		},
	},
	carouselControls: {
		ref: getRef(`carouselControls`),
		transition: `opacity 150ms ease`,
		opacity: 0,
	},
	section: {
		borderBottom: `1px solid ${
			theme.colorScheme === `dark` ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},
	shop: {
		color: theme.colors.white,
	},
	carouselIndicator: {
		width: 4,
		height: 4,
		transition: `width 250ms ease`,

		'&[data-active]': {
			width: 16,
		},
	},
	name: {
		position: `absolute`,
		top: `210px`,
		left: `20px`,
		color: `red`
	}
}));

interface IImage {
	image: string;
}

interface IProps {
	title: string;
	currentPrice: number;
	oldPrice: number;
	images: IImage[];
	description: string;
}

export const KeyboardCard = ({title, currentPrice, oldPrice, description, images}: IProps) => {
	const {classes} = useStyles();

	const navigate = useNavigate();

	const sale = Math.round((oldPrice - currentPrice) / oldPrice * 100);
	const slides = images.map((image, index) => (
		<Carousel.Slide key={index}>
			<Image src={image.image} width={400} height={250} radius={9} fit={`cover`}/>
		</Carousel.Slide>
	));

	const toKeyboardPage = () => {
		navigate(`/shop/${title}`);
	};

	return (
		<Card
			radius="md"
			style={{
				width: 400,
			}}
			p="xl"
			shadow={`md`}
			withBorder

		>
			<Card.Section>
				<Carousel
					loop
					classNames={{
						root: classes.carousel,
						controls: classes.carouselControls,
						indicator: classes.carouselIndicator,
					}}
				>
					{slides}
				</Carousel>
				{oldPrice !== 0 ? <Badge className={classes.sale} variant="filled" color="red" radius={`sm`}>
					Скидка {sale}%
				</Badge> : <></>}
			</Card.Section>
			<Text sx={{marginLeft: `-8px`}} size="sm" color="dimmed" mt="sm">
				{description}
			</Text>
			<Card.Section className={classes.section}>
				<Group position="apart" mt="md">
					<div>
						<Text size="xl" span weight={500} className={classes.price}>
							{formatter.format(currentPrice)}
						</Text>
						{oldPrice !== 0 ? <Text strikethrough span size="sm" ml={10} color="dimmed">
							{formatter.format(oldPrice)}
						</Text> : <></>}
					</div>
					<Group>
						<Button
							variant={`outline`}
							leftIcon={<IconShoppingCart size={18} className={classes.shop} stroke={1.5} />}
							onClick={toKeyboardPage}
						>
							 Открыть
						</Button>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	);
};