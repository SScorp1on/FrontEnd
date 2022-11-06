import {
	Space,
	Stack,
	Text,
	Box,
	Center,
	Timeline,
	Button,
	Header,
	Footer,
	AppShell, Divider, Group,
} from "@mantine/core";
import {Car, Package, Ship, ShoppingCart, Tool} from "tabler-icons-react";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import HeaderComponent from "../../components/shop/headerComponent";
import FooterComponent from "../../components/shop/footerComponent";
import React, {useState} from "react";

interface UserInterface {
	username: string;
	email: string;
	avatar: string;
}

export default function DeliveryPage() {
	useDocumentTitle(`Ожидание`);

	const navigate = useNavigate();

	const [user, setUser] = useState<null | UserInterface>(null);
	const [userLoading, setUserLoading] = useState(false);

	const onButton = () => {
		navigate(`/shop`);
	};

	return (
		<>
			<AppShell
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				header={
					<Header height={70}>
						<HeaderComponent user={user} userLoading={userLoading} setUserLoading={setUserLoading}/>
					</Header>
				}
				footer={
					<Footer height={60}>
						<FooterComponent/>
					</Footer>
				}
			>
				<Center>
					<Box style={{width: `100%`}}>
						<Center>
							<Stack align={`center`} style={{width: `840px`}}>
								<Text weight={700} size={30}>
									Почему нужно ждать минимум 30 дней?
								</Text>
								<Text>
									Каждая клавиатура по сути уникальна, она собирается с нуля под каждый заказ.
									Так как невозможно предугадать, какая будет заказана, детали
									к ним заказываются в равных пропорциях, а потому каждый продукт проходит
									определенный алгоритм:
								</Text>
								<Space h={`md`}/>
								<Timeline color={`red`} active={4} bulletSize={24} lineWidth={2}>
									<Timeline.Item bullet={<ShoppingCart size={12}/>} title={`Закупка`}
									               lineVariant={`dashed`}>
										<Text size="sm" style={{width: `500px`}}>
											Необходимо пройтись по всему списку компонентов, проверить
											какие уже есть, а какие предстоит заказать. Подготовить файлы для печати
											плат и корпусов. Далее необходимо все это заказать.
										</Text>
									</Timeline.Item>

									<Timeline.Item bullet={<Ship size={12}/>} title={`Доставка`} lineVariant={`dashed`}>
										<Text size="sm" style={{width: `500px`}}>
											Ожидаем доставки всех тех компонентов, которые были заказаны. В частности,
											самое важное - платы. Их делают на заказ отдельно под каждую клавиатуру,
											а потом на корабле доставляют в мастерскую, где с ними будет работать лучший мастер.
										</Text>
									</Timeline.Item>

									<Timeline.Item bullet={<Tool size={12}/>} title={`Сборка`}>
										<Text size="sm" style={{width: `500px`}}>
											Каждый копмонент помещается в свое место, а затем припаивается. После пайки
											всей клавиатуры ее необходимо поместить в корпус. Когда клавиатура
											на первый взгляд готова, ее необходимо запрограммировать и настроить.
										</Text>
									</Timeline.Item>

									<Timeline.Item bullet={<Package size={12}/>} title={`Упаковка`}
									               lineVariant={`dashed`}>
										<Text size="sm" style={{width: `500px`}}>
											Как только клавиатура прошла все тесты и она точно работает, ее необходимо
											упаковать в коробку. Такая собранная коробка относится в службу доставки
											и начинается ожидание ее обработки и отправки.
										</Text>
									</Timeline.Item>

									<Timeline.Item bullet={<Car size={12}/>} title={`Отправка`}>
										<Text size="sm" style={{width: `500px`}}>
											На данном этапе коробка с клавиатурой преодолевает бывает крайне большие
											расстояния, чтобы попасть к тебе в руки.
										</Text>
									</Timeline.Item>
								</Timeline>
								<Space h={`md`}/>
								<Text>
									Но не смотря на то, что многое в этой цепочке зависит от посторонних факторов, это
									позволяет делать клавиатуры такими, какие они есть - удобные и красивые.
									Каждая клавиатура делается не просто на продажу, а для долгого использования, во
									время которого ты будешь получать исключительно
									<Text color={`red`} inherit component="span"> приятные эмоции</Text>.
								</Text>
								<Space h={`xl`} />
								<Divider
									color={`dark`}
									style={{
										width: `840px`,
										height: `10px`,
										maxWidth: `840px`
									}}
								/>
								<Space h={`lg`} />
								<Group style={{width: `840px`}} position={`apart`}>
									<Stack align={`center`}>
										<Text weight={700} size={20}>
											Стоимость
										</Text>
										<Text w={`250px`}>
											Доставка куда угодно за наш счет, по этому поводу можешь не переживать. Даже
											если по гарантии отправляешь на ремонт или возвращаешь
										</Text>
									</Stack>
									<Stack align={`center`}>
										<Text weight={700} size={20}>
											Возврат
										</Text>
										<Text w={`250px`}>
											Если тебе в течении 7 дней после покупки не понравилась клавиатура, то можешь вернуть ее, стоимость клавиатуры вернем.
										</Text>
									</Stack>
									<Stack align={`center`}>
										<Text weight={700} size={20}>
											Ремонт
										</Text>
										<Text w={`254px`}>
											Если твоя клавиатура сломается или начнет глючить, то можешь отправлять нам, время ремонта клавиатуры займет
											до 5 рабочих дней.
										</Text>
									</Stack>
								</Group>
							</Stack>
						</Center>
					</Box>
				</Center>
			</AppShell>
		</>
	);
}