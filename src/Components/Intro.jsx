import React from 'react'
import homeImg from '../Assets/Images/home.png'
import encryptImg from '../Assets/Images/encrypted.svg'

function Intro() {
  return (
    <>
    <div style={{
        height: "100%",
        width: "74%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DAE5F5",
        position: "relative",
}}>
    <div>
        <img src={homeImg} alt='Main Images' style={{
            height: "100%",
            width: "100%"
        }}></img>
        <h1 style={{
            margin: 0,
            padding: 0,
            paddingLeft: "30%",
        }}> Pocket Notes</h1>
        <p style={{
            paddingLeft: "10%",
        }}>Send and receive messages without keeping your phone online. <br/>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
    </div>

    <div style={{
      position: "absolute",
      bottom: "4%",
      left: "40%",
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "600",
    }}> 
    <img src={encryptImg} alt='encrypt' style={{
      width:"5%",
      height:"5%",
    }}></img> end-to-end encrypted
    </div>
    </div>
    </>
  )
}

export default Intro