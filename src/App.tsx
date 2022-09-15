import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import DefaultContainer from "./containers";
import Register from "./pages/register";
import TwitchOauth from "./pages/twitchOauth";
import {Page404} from "./pages/404";
import DiscordBot from "./pages/discord";
import Login from './pages/login';
import { ForgotPassword } from './pages/passwordForgot';
import ShopPage from "./pages/shop";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<DefaultContainer>
							<Main />
						</DefaultContainer>
					}
				/>
				<Route
					path='/register'
					element={
						<DefaultContainer>
							<Register />
						</DefaultContainer>
					}
				/>
				<Route
					path='/login'
					element={
						<DefaultContainer>
							<Login />
						</DefaultContainer>
					}
				/>
				<Route
					path='/password-forgot'
					element={
						<DefaultContainer>
							<ForgotPassword />
						</DefaultContainer>
					}
				/>
				<Route
					path='/shop'
					element={
						<DefaultContainer>
							<ShopPage />
						</DefaultContainer>
					}
				/>
				<Route
					path={`/twitch/oauth`}
					element={
						<DefaultContainer>
							<TwitchOauth />
						</DefaultContainer>
					}
				/>
				<Route
					path={`/discord/bot`}
					element={
						<DefaultContainer>
							<DiscordBot />
						</DefaultContainer>
					}
				/>
				<Route
					path={`*`}
					element={
						<DefaultContainer>
							<Page404/>
						</DefaultContainer>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
