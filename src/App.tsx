import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import DefaultContainer from "./containers";
import Register from "./pages/register";
import Control from "./pages/control";
import TwitchOauth from "./pages/twitchOauth";

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
					path='/login'
					element={
						<DefaultContainer>
							<Register />
						</DefaultContainer>
					}
				/>
				<Route
					path='/control'
					element={
						<DefaultContainer>
							<Control />
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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
