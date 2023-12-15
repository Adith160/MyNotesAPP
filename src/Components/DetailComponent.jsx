import React, { useEffect, useState } from 'react';
import styles from './Styles/Detail.module.css';
import sendImg from '../Assets/Images/send.svg';

function DetailComponent(props) {
    const noteKey = props.gkey;
    const color = props.color;
    const noteTitle = props.name;
    const [AllNotes, setAllNotes] = useState([]);
    const [NewText, setNewText] = useState('');
    const [OldNote, setOldNote] = useState([]);

    useEffect(() => {
        const oldNotes = JSON.parse(localStorage.getItem('AllNotes')) || [];
        console.log("oldNotes", oldNotes);
        setOldNote(oldNotes);
        const filteredNotes = oldNotes.filter(note => note.gKey === noteKey);

        setAllNotes(filteredNotes);
    }, [noteKey]);

    console.log("props", props.gkey, props.color, props.name);
    const getLogo = (n) => {
        return n.split(" ").map(word => word.charAt(0)).join("");
    };

    function formatDateTime(dateTimeString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);
        return formattedDate;
      }

    const handleSaveOnClick = () => {
        if (NewText !== '') {
            let nextKey = 0;
            if (OldNote !== null && OldNote.length > 0) {
                nextKey = Math.max(...OldNote.map(note => note.key)) + 1;
            }

            const NewNote = { key: nextKey, gKey: noteKey, desc: NewText, time: new Date() };
            const updatedNote = [...OldNote, NewNote];
            const thisGroupNote= [...AllNotes, NewNote];
            localStorage.setItem('AllNotes', JSON.stringify(updatedNote));
            setAllNotes(thisGroupNote);
            setNewText(''); 
        }
    };

    return (
        <div className={styles.detailContent}>
            <div className={styles.header}>
                <div className={styles.profileDP} style={{ backgroundColor: `${color}` }}>{getLogo(`${noteTitle}`)}</div>
                <span className={styles.spanName}>{noteTitle}</span>
            </div>

            <div className={styles.detailsDiv}>
            {AllNotes.length > 0 ? (
    AllNotes.map((note, index) => (
        <div className={styles.oldNotes} key={index}>
            {note.desc}
            {note.time && (
                <span className={styles.dateTime}>{formatDateTime(note.time.toLocaleString())}</span>
            )}
            </div>
              ))
                ) : null}
            </div>

            <div className={styles.inputDiv}>
                <textarea className={styles.inputArea} onChange={(e) => setNewText(e.target.value)} value={NewText}></textarea>
                <img className={styles.sendImg} src={sendImg} alt="sendImg" onClick={handleSaveOnClick} />
            </div>
        </div>
    );
}

export default DetailComponent;
