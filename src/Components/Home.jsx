import React, { useEffect, useState } from 'react';
import styles from './Styles/Home.module.css';
import Intro from './Intro';
import AddNote from './AddNote';
import DetailComponent from './DetailComponent';

const Home = () => {
  const [Detail, showDetail] = useState(null);
  const [AddGrp, showAddGrp] = useState(false);
  const [GroupData, setGroupData] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const storedGroupData = JSON.parse(localStorage.getItem('groups'));
    setGroupData(storedGroupData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDetailClick = (grp) => {
    showDetail(
      <DetailComponent gkey={grp.key} color={grp.color} name={grp.groupName} />
    );

    setSelectedNote(grp.key);
    console.log('key is', grp.key, grp.color, grp.groupName);
  };

    const getLogo = (n) => {
        return n.split(" ").map(word => word.charAt(0)).join("");
    };

    const handleAddClick = () => {
        showAddGrp(true); 
    };

    return (
        <>
          <div className={styles.homePage}>
            <div className={styles.savedNotes}>
              <h2 className={styles.title}>Pocket Notes</h2>
                    {
                     GroupData && GroupData.map((grp) => (
                         <div className={styles.nameCard} key={grp.key} 
                              style={{backgroundColor: selectedNote===grp.key?"#2F2F2F2B":''}}
                              onClick={() => handleDetailClick(grp)}>
                             <div className={styles.profileDP} style={{ backgroundColor: `${grp.color}` }}>
                                 {getLogo(`${grp.groupName}`)}
                             </div>
                             <span className={styles.spanName}>{grp.groupName}</span>
                         </div>
                     ))
                    }

                   
</div>
        <div className={styles.add} onClick={handleAddClick}>
          +
        </div>
        {!isMobile && (Detail || <Intro />)}
      </div>
      {AddGrp && (
        <div
          onClick={() => {
            showAddGrp(false);
            const storedGroupData = JSON.parse(localStorage.getItem('groups'));
            setGroupData(storedGroupData);
          }}
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            left: "0",
            top: "0",
            backgroundColor: "rgba(47, 47, 47, 0.75)",
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
        }}
        >
          <AddNote />
        </div>
      )}
    </>
  );
};

export default React.memo(Home);