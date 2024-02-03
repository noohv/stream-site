import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

function Register() {
	const [data, setData] = useState<User>({
		username: '',
		email: '',
		password: ''
	})

	const handleClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		axios.post('http://localhost:3000/api/v1/auth/register', data)
			.then(response => console.log(response))
			.catch(error => console.log(error))
  }

	console.log(data)

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value })
	}

	return (
		<div className='w-52'>
			<form
				className='flex flex-col gap-5'
				onSubmit={handleClick}>
				<input
					className='bg-gray-600'
					type="text" 
					name="username" 
					id="username"
					value={data.username}
					onChange={handleChange} />
				<input
					className='bg-gray-600'
					type="email" 
					name="email" 
					id="email" 
					value={data.email}
					onChange={handleChange} />
				<input
					className='bg-gray-600'
					type="password" 
					name="password" 
					id="password" 
					value={data.password}
					onChange={handleChange} />
				<button>Register</button>
			</form>
		</div>
	)
}

export default Register