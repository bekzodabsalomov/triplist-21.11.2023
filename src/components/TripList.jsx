import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

function getModeFromLocalStorage() {
    return localStorage.getItem('theme') || 'light';
}

const themes = {
    light: 'light',
    dark: 'dark'
};

function TripList() {
    const [url, setUrl] = useState('http://localhost:3000/trips');
    const { data: trips, isPending, error } = useFetch(url);

    const [theme, setTheme] = useState(getModeFromLocalStorage);

    const handleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className={`bg-white flex items-center justify-center w-full h-screen ${theme === 'dark' ? 'dark:bg-[#213]' : ''}`}>
            <div className='flex flex-col items-center justify-center max-w-2xl mx-auto h-full dark:text-white'>
            <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer mb-10">
    <input
        type="checkbox"
        id="darkModeToggle"
        className="sr-only peer"
        onChange={handleTheme}
        checked={theme === 'dark'}
    />
    <div className={`w-7 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${theme === 'dark' ? 'dark:peer-focus:ring-blue-800' : 'peer-focus:ring-blue-300'} dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[16.7px] after:transition-all ${theme === 'dark' ? 'dark:border-gray-600 peer-checked:bg-blue-600' : 'peer-checked:bg-blue-600'}`}
    ></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">mode</span>
</label>
                <h1 className='text-5xl font-bold mb-11'>TripList</h1>
                <ul className='flex flex-col gap-5'>
                    {isPending && <h1>Loading...</h1>}
                    {error && <h1>{error}</h1>}
                    {trips && trips.map((trip) => (
                        <li key={trip.title} className='flex flex-col items-center gap-5'>
                            <h1 className='font-bold'>{trip.title}</h1>
                            <p>{trip.price}</p>
                        </li>
                    ))}
                </ul>
                <div className='flex items-center justify-center gap-5 mt-10' id='media'>
                    <button onClick={() => setUrl('http://localhost:3000/trips?loc=Europe')} className='text-base px-12 py-1 border-black border-2 dark:border-sky-500'>Europe Trips</button>
                    <button onClick={() => setUrl('http://localhost:3000/trips')} className='text-base px-12 py-1 border-black border-2 dark:border-sky-500'>All Trips</button>
                </div>
            </div>
        </div>
    );
}

export default TripList;