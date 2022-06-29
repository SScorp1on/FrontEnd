/* eslint no-console: 0*/
import * as React from 'react';
import {useState} from 'react';
import {useDocumentTitle} from "@mantine/hooks";
import {Box, Button, Group, PasswordInput, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const ym = function () {
	return (
		`<!-- /Yandex.Metrika counter -->`
	);
};

export default function Register() {
	const navigate = useNavigate();
	useDocumentTitle(`Login`);
	const [disabled, setDisable] = useState(true);
	const [loaded, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			username: ``,
			password: ``,
		},

		validate: {
			username: (value) => ((/^[a-zA-Z\d_-]{3,16}$/.test(value)) ? null : `Invalid username`),
			password: (value) => (( /^[a-zA-Z\d_-]{5,18}$/.test(value)) ? null : `Invalid password`)
		},
	});

	const onChange = () => {
		form.validate();
		const errors = form.errors;
		const values = form.values;
		if (values.password !== `` &&
			values.username !== `` &&
			!errors[`username`] &&
			!errors[`password`]
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

	const onSubmit = async (values: {password: string, username: string}) => {
		setLoading(true);
		const res = await axios.post(`http://localhost:3000/auth`, values)
			.catch((r) => ({status: r.status, data: r.data}));
		setLoading(false);
		if (res.status !== 201) {
			if (res.status === 409) {
				form.setErrors({ password: `Пароль не верный`});
			} else {
				setLoading(false);
				showNotification({
					message: `Похоже сервер не доступен 😔\nОшибка: ${res.status}`,
					color: `red`,
					autoClose: 3000
				});
			}
		} else {
			setLoading(false);
			showNotification({
				message: `Рад видеть тебя снова 👋`,
				color: `green`,
				autoClose: 3000
			});
			const accessToken = res.data.access;
			const refreshToken = res.data.refresh;
			localStorage.setItem(`accessToken`, accessToken);
			localStorage.setItem(`refreshToken`, refreshToken);
			navigate(`/control`);
		}
	};

	return (
		<>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>
			<Box style={{
				position: `absolute`, left: `50%`, top: `50%`,
				transform: `translate(-50%, -50%)`
			}}>
				<Box sx={{width: 500, border: `1px solid white`, borderRadius: `30px`}}
					mx="auto">
					<form style={{margin: `50px`}} onChange={onChange}
						onSubmit={form.onSubmit((values) => onSubmit(values))}>
						<TextInput
							required
							label="Username"
							placeholder="AnyUsername"
							{...form.getInputProps(`username`)}
						/>
						<Space h="xl"/>
						<PasswordInput
							required
							label="Password"
							placeholder="Password"
							{...form.getInputProps(`password`)}
						/>

						<Group position="right" mt="md">
							<Button
								type="submit"
								variant="outline"
								disabled={disabled}
								loading={loaded}
							>Register /
								Login</Button>
						</Group>
					</form>
				</Box>
			</Box>
		</>
	);
}
