import { useEffect, useState } from 'react'

export default function useHttp(url, initialData) {
	const [data, setData] = useState(initialData)
	const [isLoading, setIsLoading] = useState(true)

	async function getBoards() {
		try {
			const response = await fetch(url)
			if (!response.ok) throw new Error('Failed fetch data...')
			const data = await response.json()
			setData(data)
		} catch (error) {
			setIsLoading(false)
			return error.message
		}
		setIsLoading(false)
	}

	useEffect(() => {
		getBoards()
	}, [])

	return {
		data,

		isLoading,
	}
}