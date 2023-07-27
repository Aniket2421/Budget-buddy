import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal, } from 'antd';
import AddExpenseModal from '../components/AddExpens';
import AddIncomeModal from '../components/AddIncome';
import { collection, getDocs, loadBundle, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import TransactionTable from '../components/TransactionTable';
import Chart from '../components/Chart';
import NoTransaction from '../components/NoTransaction';


const Dashboard = () => {
//   const Transaction = [
//     {
//       type : "income",
//       amount : "400",
//       tag : "salary",
//       name : 'income',
//       date : "2023-05-23"
// },

// {
//   type : "expense",
//   amount : 800,
//   tag : "food",
//   name : 'expense 1',
//   date : "2023-05-17"

// }
//   ]
 const  [transaction,setTransaction] = useState([])
 const [Loading,setLoading] = useState(false);
  const [user] = useAuthState(auth)
  const [isExpensesVisible,SetIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible,setIncomeModalVisible] = useState(false)
  const [income,setIncome] = useState(0);
  const [expense,setExpenses] = useState(0);
  const [totalBalance,setTotalBalance] = useState(0);
   
  
  const ShowexpenseModalVisible = () =>{
    SetIsExpenseModalVisible(true)
  }
  const ShowIncomeModallVisible = () =>{
    setIncomeModalVisible(true)
  }
  const handelExpenseModalCancel = () =>{
    SetIsExpenseModalVisible(false)
  }
  const handelIncomeModalCancel = () =>{
    setIncomeModalVisible(false)
  }

  const onFinish = (values,type) => {
    const newTranstion ={
    type:type,
    date : values.date.format("YYYY-MM-DD"),
    amount : parseFloat(values.amount),
    tag : values.tag,
    name : values.name,
    };
    addTransaction(newTranstion);

  }
//     setTransaction([...Transactions,newTransaction]);
//     SetIsExpenseModalVisible(false);
//     setIncomeModalVisible(false);
//     calculateBalance();
//  }
 
async function addTransaction (Transaction,many){
  try{
    const docRef = await addDoc (
      collection(db,`users/${user.uid}/transaction`),
      Transaction
    )
    console.log("Document written with ID" , docRef.id);
    if(!many) toast.success("Transaction Added")
    console.log('transaction',transaction)
    let newArr  = transaction;
    newArr.push(Transaction);
    setTransaction(newArr)
    calculateBalance()

  }
  catch (e){
    console.log("Error Adding document", e);
    if(!many)toast.error("Couldn't add transaction")
  }

  }
useEffect(() => {
 fetchTransaction()
}, [user]);

useEffect(() =>{
  calculateBalance()
},[transaction])

const calculateBalance = () =>{
  let incomeTotal = 0;
  let expensesTotal = 0;
 
  transaction.forEach((Transaction) => {
  if(Transaction.type === "income"){
    incomeTotal += Transaction.amount;
  }
  else{
    expensesTotal +=  Transaction.amount;
  }
  })

  setIncome(incomeTotal);
  setExpenses(expensesTotal)
  setTotalBalance(incomeTotal-expensesTotal)
}

async function fetchTransaction (){
  setLoading(true);
  if(user){
    const q = query(collection(db,`users/${user.uid}/transaction`))
    const querySnapShot = await getDocs(q);
    let transactionArray = [];
    querySnapShot.forEach((doc) => {
      transactionArray.push(doc.data())
    })
    setTransaction(transactionArray);
    toast.success("Transaction Fetched!");
 }
 setLoading(false);
}
let sortedTransaction = transaction.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })


  return (
    <div>
      <Header/>
      {Loading ?<p>Loading...</p> : <>
      
    <Cards
    income={income}
    expense={expense}
    totalBalance={totalBalance}
    showExpenseModal = {ShowexpenseModalVisible} 
    showIncomeModal = {ShowIncomeModallVisible}
    />

{/* transactions && transactions.length !== 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )} */}


   {transaction && transaction.length != 0 ? ( <Chart sortedTransaction = {sortedTransaction }/> 
   ):( <NoTransaction/>)}

    <AddExpenseModal
    isExpensesVisible = {isExpensesVisible}
    handelExpenseModalCancel = {handelExpenseModalCancel}
    onFinish = {onFinish}
    />
    <AddIncomeModal
    isIncomeModalVisible = {isIncomeModalVisible}
    handelIncomeModalCancel = {handelIncomeModalCancel}
    onFinish={onFinish}
    />
    <TransactionTable transaction={transaction} 
    addTransaction = {addTransaction}
    fetchTransactions = {fetchTransaction}/>
    </>}
   
    </div>
  )
}

export default Dashboard