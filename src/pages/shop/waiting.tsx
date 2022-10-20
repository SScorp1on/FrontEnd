import {
	Space,
	Stack,
	Text,
	Box,
	Center,
	Timeline,
	Button,
} from "@mantine/core";
import {Car, Package, Ship, ShoppingCart, Tool} from "tabler-icons-react";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";

export default function WaitingPage() {
	useDocumentTitle(`Ожидание`);

	const navigate = useNavigate();

	const onButton = () => {
		navigate(`/shop`);
	};

	return (
		<>
			<Center>
				<Box style={{width: `80%`}}>
					<Stack align={`center`}>
						<Space h={`xl`} />
						<Text weight={700} size={30}>
							Почему нужно ждать около 30 дней?
						</Text>
						<Text style={{width: `600px`}}>
							Каждая клавиатура по сути уникальна, она собирается с нуля под каждый заказ.
							Так как невозможно предугадать, какая будет популярна, а какая нет, детали
							к ним заказываются в равных пропорциях, а потому каждый продукт проходит определенный
							алгоритм
						</Text>
						<Space h={`md`} />
						<Timeline color={`red`} active={4} bulletSize={24} lineWidth={2}>
							<Timeline.Item bullet={<ShoppingCart size={12} />} title={`Закупка`} lineVariant={`dashed`}>
								<Text size="sm" style={{width: `400px`}}>
									Необходимо пройтись по всему списку компонентов, проверить
									какие уже есть, а какие предстоит заказать. Подготовить файлы для печати плат и
									корпусов. Далее необходимо все это заказать
								</Text>
							</Timeline.Item>

							<Timeline.Item bullet={<Ship size={12} />} title={`Доставка`} lineVariant={`dashed`}>
								<Text size="sm" style={{width: `400px`}}>
									Ожидаем доставки всех тех компонентов, которые были заказаны. В частности, самое
									важное - платы. Их делют на заказ отдельно под каждую клавиатуру, а потом на корабле
									доставляют в мастерскую, где с ними будет работать лучший мастер
								</Text>
							</Timeline.Item>

							<Timeline.Item bullet={<Tool size={12} />} title={`Сборка`}>
								<Text size="sm" style={{width: `400px`}}>
									Каждый копмонент помещается в свое место, а затем припаивается. После пайки всей
									клавиатуры ее необходимо поместить в корпус и прикрутить винтики. Когда клавиатура
									на первый взгляд готова, ее необходимо запрограммировать, она подключается к
									компьютеру, обновляется и настраивается
								</Text>
							</Timeline.Item>

							<Timeline.Item bullet={<Package size={12} />} title={`Упаковка`} lineVariant={`dashed`}>
								<Text size="sm" style={{width: `400px`}}>
									Как только клавиатура прошла все тесты и она точно работает, ее необходимо упаковать
									в коробку. Туда еще нужно положить предметы, входящие в набор каждой клавиатуры. Такая
									собранная коробка относится в службу доставки и начинается ожидание ее обработки и отправки
								</Text>
							</Timeline.Item>

							<Timeline.Item bullet={<Car size={12} />} title={`Отправка`}>
								<Text size="sm" style={{width: `400px`}}>
									На данном этапе коробка с клавиатурой преодолевает бывает крайне большие расстояния,
									чтобы попасть к Вам в руки
								</Text>
							</Timeline.Item>
						</Timeline>
						<Space h={`md`} />
						<Text style={{width: `600px`}}>
							Но не смотря на то, что многое в этой цепочке зависит от посторонних факторов, это
							позволяет делать клавиатуры такими, какие они есть - удобные и красивые.
							Каждая клавиатура делается не просто на продажу, а для долгого использования, во время
							которого Вы будете получать исключительно
							<Text color={`red`} inherit component="span"> приятные эмоции</Text>
						</Text>
						<Space h={`md`} />
						<Button
							onClick={onButton}
						>
							Вернуться в магазин
						</Button>
					</Stack>
				</Box>
			</Center>
		</>
	);
}