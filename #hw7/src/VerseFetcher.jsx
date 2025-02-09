
import React, { useState } from 'react';
import axios from 'axios';

function VerseFetcher() {
    const [verseRef, setVerseRef] = useState('');
    const [verseData, setVerseData] = useState({ text: '', reference: '' });

    const fetchSpecificVerse = async () => {
        try {
            const response = await axios.get(
                `https://labs.bible.org/api/?passage=${verseRef}&type=json`
            );
            if (response.data.length > 0) {
                const verse = response.data[0];
                setVerseData({
                    text: verse.text,
                    reference: `${verse.bookname} ${verse.chapter}:${verse.verse}`
                });
            } else {
                setVerseData({ text: 'Verse not found.', reference: '' });
            }
        } catch (error) {
            console.error('Error fetching verse:', error);
            setVerseData({ text: 'Error retrieving verse.', reference: '' });
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <input
                type="text"
                placeholder="Enter verse (e.g., John 3:16)"
                value={verseRef}
                onChange={(e) => setVerseRef(e.target.value)}
            />
            <button onClick={fetchSpecificVerse}>Get Verse</button>
            {verseData.text && (
                <div>
                    {verseData.reference && <h3>{verseData.reference}</h3>}
                    <p>{verseData.text}</p>
                </div>
            )}
        </div>
    );
}

export default VerseFetcher;
