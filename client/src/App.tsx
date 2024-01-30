import React from 'react'
import Chat from './Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/:username' element={<Chat />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App