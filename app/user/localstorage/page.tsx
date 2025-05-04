"use client";
import React, { useState } from 'react';

const LocalStoragePage: React.FC = () => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    const handleSetLocalStorage = () => {
        if (key && value) {
            localStorage.setItem("key", value);
            localStorage.setItem("u_id", value2);
            alert(`Saved "${key}: ${value}" to localStorage`);
            console.log('LocalStorage:', localStorage.getItem("key"));
        } else {
            alert('Please provide both key and value.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Set LocalStorage</h1>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Key:
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <label>
                    Key:
                    <input
                        type="text"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Value:
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <button onClick={handleSetLocalStorage}>Set LocalStorage</button>
        </div>
    );
};

export default LocalStoragePage;