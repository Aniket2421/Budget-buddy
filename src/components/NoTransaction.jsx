import React from 'react'
import transaction from "../assests/transaction.jpg"

const NoTransaction = () => {
  return (
    <div style={{
        display : "flex",
        justifyContent : 'center',
        alignItems : "center",
        width : "100%",
        flexDirection : "column",
        marginBottom : '2rem'
        }}>
        <img src={transaction} style={{width : "400px",margin: "4rem"}} alt="" />
        <p style={{textAlign:'center',fontSize : "1.2rem"}}>
            You Have No Transaction Currently
        </p>

    </div>
  )
}

export default NoTransaction