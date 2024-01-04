import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true)
            try {
                const req = await fetch(url)

                if (!req.ok) {
                    throw new Error("Something went wrong !")
                }

                const data = await req.json()
                setData(data)
                setIsPending(false)
            }
            catch (error) {
                setIsPending(false)
                setError(error.message)
            }
        }

        fetchData()

    }, [url])

    return { data, isPending, error }
}