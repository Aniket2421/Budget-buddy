import React from 'react'
import { Row,Card, Button} from 'antd'

const Cards = ({ showExpenseModal,showIncomeModal,income,expense,totalBalance}) => {
  return (
    <div>
        <Row className='my-row'>
         <Card className='my-card'>
            <h2>Current Balance</h2>
            <p>{totalBalance}</p>
            {/* <Button  text="Reset Balance" blue = {true} > RESET Balance</Button> */}
            <div className="btn btn-blue" style={{margin : 0}}>
                Reset Balance
            </div>
         </Card>

         <Card className='my-card'>
            <h2>Total Inconme</h2>
            <p>{income}</p>
            {/* <Button  text="Reset Balance" blue = {true} > RESET Balance</Button> */}
            <div  onClick={showIncomeModal} className="btn btn-blue" style={{margin : 0}}>
                Add Income
            </div>
         </Card>


         <Card className='my-card'>
            <h2>Total Expenses</h2>
            <p>{expense}</p>
            {/* <Button  text="Reset Balance" blue = {true} > RESET Balance</Button> */}
            <div onClick={showExpenseModal} className="btn btn-blue" style={{margin : 0}}>
                Add Expenses
            </div>
         </Card>

        </Row>

        
    </div>
  )
}

export default Cards