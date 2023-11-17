import * as React from 'react'
import { useForm } from 'react-hook-form'

export const FormsPractice = () => {
	const { register, handleSubmit } = useForm()

	return (
		<>
			<form onSubmit={handleSubmit((data) => console.log(data))}>
				<input {...register('firstName')} placeholder='First Name' />
				<input {...register('lastName')} placeholder='Last Name' />
				<select {...register('category')}>
					<option value=''>Select...</option>
					<option value='A'>Category A</option>
					<option value='B'>Category B</option>
				</select>
				<input type='submit' />
			</form>
		</>
	)
}
