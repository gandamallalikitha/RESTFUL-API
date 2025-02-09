
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import VerseFetcher from './VerseFetcher';

function App() {
    const [verse, setVerse] = useState({ text: '', reference: '' });

    const fetchRandomVerse = async () => {
        try {
            const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
            const verseData = response.data[0];
            setVerse({
                text: verseData.text,
                reference: `${verseData.bookname} ${verseData.chapter}:${verseData.verse}`
            });
        } catch (error) {
            console.error('Error fetching verse:', error);
        }
    };

    return (
        <div className="container">
            <h1>Bible Verse Generator</h1>
            <button onClick={fetchRandomVerse}>Get Random Verse</button>
            {verse.text && (
                <div>
                    <h3>{verse.reference}</h3>
                    <p>{verse.text}</p>
                </div>
            )}
            <VerseFetcher />
        </div>
    );
}

export default App;
