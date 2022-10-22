import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './pages/main';
import DefaultContainer from "./containers";
import Register from "./pages/register";
import {Page404} from "./pages/404";
import Login from './pages/login';
import {ForgotPassword} from './pages/passwordForgot';
import ShopPage from "./pages/shop";
import Admin from "./pages/admin";
import WaitingPage from "./pages/shop/waiting";
import FrameworkPage from "./pages/shop/framework";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<DefaultContainer>
							<Main/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/register'
					element={
						<DefaultContainer>
							<Register/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/login'
					element={
						<DefaultContainer>
							<Login/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/password-forgot'
					element={
						<DefaultContainer>
							<ForgotPassword/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/shop'
					element={
						<DefaultContainer>
							<ShopPage/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/shop/waiting'
					element={
						<DefaultContainer>
							<WaitingPage/>
						</DefaultContainer>
					}
				/>
				<Route
					path='/shop/framework'
					element={
						<DefaultContainer>
							<FrameworkPage/>
						</DefaultContainer>
					}
				/>
				<Route
					path={`/admin`}
					element={
						<DefaultContainer>
							<Admin/>
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
