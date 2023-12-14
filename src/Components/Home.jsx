import React, { useEffect, useState } from 'react';
import styles from './Styles/Home.module.css';
import Intro from './Intro';
import AddNote from './AddNote';
//import NameCard from './NameCard';

function Home() {
    const [Detail, showDetail] = useState(false);
    const [AddGrp, showAddGrp] = useState(false);
    const [GroupData, setGroupData]=useState([]);

    useEffect(()=>{
        const storedGroupData= JSON.parse(localStorage.getItem('groups'));
        setGroupData(storedGroupData);
},[]); 

    const getLogo =(n) =>{
        return n.split(" ").map(word=>word.charAt(0)).join("");
    };
    const handleAddClick=()=>{
       showAddGrp(true); 
    }
    return (
        <>
            <div className={styles.homePage}>
                <div className={styles.savedNotes}>
                    <h2 className={styles.title}>Pocket Notes</h2>
                    
                    {
                        GroupData.map((grp)=>{
                    return <div className={styles.nameCard}>
                        <div className={styles.profileDP} key={grp.key} style={{backgroundColor:`${grp.color}`,}}>{getLogo(`${grp.groupName}`)}</div>
                        <span className={styles.spanName}>{grp.groupName}</span>
                    </div>
                        })}
                    <div className={styles.add} onClick={handleAddClick}>+</div>
                </div>
                {
                    Detail ? <div className={styles.details}></div> : <Intro />
                }
                
                

            </div>
            {AddGrp && <AddNote/>}
        </>
    );
}

export default Home;
