import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {default: '#0c0d0f'},
	},
	components: {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						pointerEvents: 'unset',
						cursor: 'not-allowed',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						pointerEvents: 'unset',
						cursor: 'not-allowed',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					background: '#202939'
				}
			}
		}
	},
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ThemeProvider theme={theme}>
						<CssBaseline />
							<Main />
						</ThemeProvider>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
