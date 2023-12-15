import React, { useState } from 'react';

function AddNote() {
    const Color=['#B38BFA','#FF79F2','#43E6FC','#F19576','#0047FF','#6691FF'];
    const [selectedDiv, setselectedDiv] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleColorClick = (index) => {
        setselectedDiv(index);
    }

    const handleCreateClick = () => {
        if(selectedDiv !== '' && groupName !== ''){
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

        window.location.reload()
        }
    }
  return (

        <div 
        onClick={(e)=> e.stopPropagation()}
        style={{
            height: "30%",
            width: "40%",
            backgroundColor: "white",
            borderRadius: "1vh",
            display: "flex",
            position: "absolute",
        }}>

            <p style={{
                 color: '#000',
                 fontFamily: 'Roboto',
                 fontSize: '1.5rem',
                 fontStyle: 'normal',
                 fontWeight: 500,
                 lineHeight: '160.188%', 
                 letterSpacing: '0.956px',
                 paddingLeft: '5%',
                 width: "90%",
            }}><span style={{
                fontSize: '1.5rem',
                padding: "0",
                margin : "0",
            }}>Create New group</span><br/> 
            Group Name <input type='text' placeholder='Enter group name' 
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
                style={{
                fontSize: "1.1rem",
                borderRadius: "2vh",
                height: "22%",
                width: "58%",
                paddingLeft: "5%",
                border: "0.2vh solid #CCCCCC",
            }}></input>                                                                                             <br/>
            Choose colour &nbsp;&nbsp;&nbsp;
            { Color.map((clr,index)=>{
            return <div key={index}  
            onClick={() => handleColorClick(index)}
            style={{
                height:"15%",
                width:"5%",
                borderRadius: "50%",
                backgroundColor: `${clr}`,
                marginLeft: "2%",
                display: "inline-block",
                border: selectedDiv === index ? "1px solid black" : "none",
                transition: "border 0.3s",
                cursor: "pointer", 
            }}></div>
})}

            <button 
            onClick={handleCreateClick}
            style={{
                height:"15%",
                width: "15%",
                borderRadius: "1vh",
                backgroundColor: "#001F8B",
                display: "block",
                marginLeft: "80%",
                marginTop: "1%",
                color: "white",     
                border: "none",
                outline: "none",
                cursor: "pointer", 
            }}>Create</button>
            </p>

        </div>


  )
}

export default AddNote