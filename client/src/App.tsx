import React from 'react'
import Chat from './Chat'
import Register from './Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/:username' element={<Chat />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App