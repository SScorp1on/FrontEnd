import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../constants/other";
import {createBackendContext, updateTokens} from "../context/axios.context";
import {showNotification} from "@mantine/notifications";
import {Check, X} from "tabler-icons-react";
import * as React from "react";
import Cookie from "js-cookie";
import {useForm} from "@mantine/form";

export default function Register() {
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (PASSWORD_REGEX.test(value) ? null : 'Нужна настоящая почта'),
            password: (value) => (EMAIL_REGEX.test(value) ? null : 'Минимум 8 символов, из них 1 большая буква и 1 цифра'),
        },
    });
    useDocumentTitle(`Register`);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const toLogin = () => {
        navigate(`/login`);
    };

    const onSubmit = async () => {
        setLoading(true);

        const regContext = createBackendContext();
        const response = await regContext.post(`auth/register`, {email: form.getInputProps('email'), password: form.getInputProps('password')})
            .catch(e => {
                if (!e.response.data.state) {
                    showNotification({
                        title: `Сервер не доступен`,
                        message: `Попробуй попозже`,
                        color: `red`,
                        icon: <X/>,
                        disallowClose: true,
                    });
                } else if (e.response.data.state === `EMAIL_ALREADY_USED`) {
                    showNotification({
                        title: `Ошибка пользователя`,
                        message: `Эта почта уже используется`,
                        color: `red`,
                        icon: <X/>,
                        disallowClose: true,
                    });
                } else {
                    console.log(e.response);
                    showNotification({
                        title: `Ошибка сервера`,
                        message: `Попробуй попозже`,
                        color: `red`,
                        icon: <X/>,
                        disallowClose: true,
                    });
                }
            });

        if (!response) {
            setLoading(false);
            return;
        }

        showNotification({
            title: `Успешно`,
            message: `Добро пожаловать`,
            color: `green`,
            icon: <Check/>,
            disallowClose: true,
        });

        Cookie.set(`access`, response.data.access);
        localStorage.setItem(`refresh`, response.data.refresh);

        navigate(`/shop`);

        setLoading(false);
    };

    useEffect(() => {
        updateTokens()
            .then(state => {
                if (state) navigate(`/shop`);
            })
            .catch(() => null);
    }, []);

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={theme => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Привет!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Уже есть аккаунт?{` `}
                <Anchor<`a`> href="#" size="sm" onClick={toLogin}>
                    Войти
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(values => {
                    onSubmit();
                })}>
                <TextInput
                    label="Почта"
                    placeholder="твоя@почта.рф"
                    required
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Пароль"
                    placeholder="Твой пароль"
                    required
                    mt="md"
                    {...form.getInputProps('password')}
                />
                <Button type="submit" loading={loading} fullWidth mt="xl">
                    Регистрация
                </Button>
                </form>
            </Paper>
        </Container>
    );
}
