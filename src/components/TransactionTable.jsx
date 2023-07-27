import React, { useState } from "react";
import { Table, Select, Radio } from "antd";
import { unparse } from "papaparse";
import { parse } from "papaparse";
import { toast } from "react-toastify";

function TransactionTable({ transaction,addTransaction, fetchTransactions}) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filterTransaction = transaction.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
    );
  });

  let SortedTransactions = filterTransaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV() {
    var csv = unparse({
      fields: ["name","tag","date","type","amount"],
      data : transaction,
    });
    const blob = new Blob([csv],{type : "text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "transaction.csv"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function importFromCSv(event){
  event.preventDefault();
  try{
    parse(event.target.files[0],{
      header : true,
      complete : async function (results) {
        // console.log("RESULT>>>",results)
        for(const transaction of results.data){
        const newTransaction = {
          ...transaction,
          amount:parseFloat(transaction.amount),
         }
         await addTransaction(newTransaction,true)
        }

      }
    })
    toast.success("All Transcation  Added");
    fetchTransactions();
    event.target.files = null;
  } catch (e) {

  }

}


  return (
    <div style={{width: "97%",
    padding :"0rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={search} alt="" width="16" />
          <input className="input-data"
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          classname="Select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option values="">All</Option>
          <Option values="income">Income</Option>
          <Option values="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div style={{display:"flex",
      justifyContent : "center",
      alignItems : 'center',
      width : "100%",
      marginBottom : "1rem"}}
      >
      <h2 className="titel">My Transaction</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button>No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "400px",
          }}
        >
          <button className="btn" onClick={exportCSV}>
            Export To CSV  
          </button>
          <label htmlFor="file-csv" className="btn btn-blue">
            Import From CSV
          </label>
          <input
            type="file"
            id="file-csv"
            accept=".csv"
            required
            onChange={importFromCSv}
            style={{ display: "none" }}
          />
        </div>
</div>
        <Table dataSource={SortedTransactions} columns={columns} />;
      </div>
    </div>
  );
}

export default TransactionTable;
