// AddNote.js

import React, { useState } from 'react';
import styles from './Styles/AddNote.module.css';  // Import the CSS module

function AddNote() {
    const Color = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
    const [selectedDiv, setselectedDiv] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleColorClick = (index) => {
        setselectedDiv(index);
    }

    const handleCreateClick = () => {
        if (selectedDiv !== '' && groupName !== '') {
            const selectedColor = Color[selectedDiv];

            // Retrieve existing data from local storage
            const existingData = JSON.parse(localStorage.getItem('groups')) || [];

            // Determine the next available key
            const nextKey = existingData.length > 0
                ? Math.max(...existingData.map(group => group.key)) + 1
                : 0;

            // Add new group information to the existing data
            const newGroup = { key: nextKey, groupName, color: selectedColor };
            const updatedData = [...existingData, newGroup];

            // Update local storage with the modified data
            localStorage.setItem('groups', JSON.stringify(updatedData));

            // Clear the input and selected color after creating
            setGroupName('');
            setselectedDiv(null);

            // Optional: Log the updated data to the console
            console.log('Updated Data:', updatedData);
        }
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={styles.addNoteContainer}  // Use the CSS module class
        >
            <p className={styles.addNoteContent}>
                <span>Create New group</span><br />
                Group Name
                <input
                    type='text'
                    placeholder='Enter group name'
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                    className={styles.addNoteInput}  // Use the CSS module class
                />
                <br />
                Choose colour &nbsp;&nbsp;&nbsp;
                {Color.map((clr, index) => (
                    <div
                        key={index}
                        onClick={() => handleColorClick(index)}
                        className={`${styles.colorSelector} ${selectedDiv === index ? styles.selected : ''}`}
                        style={{ backgroundColor: `${clr}` }}
                    ></div>
                ))}
                <button
                    onClick={handleCreateClick}
                    className={styles.addNoteButton}  // Use the CSS module class
                >
                    Create
                </button>
            </p>
        </div>
    );
}

export default AddNote;
