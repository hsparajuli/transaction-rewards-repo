import React, { useState, useEffect } from "react";
import getData from './api/dataService';
import ReactTable from 'react-table';
import { calculateTransData } from "./helpers/transactions";
import { columns, totalsByColumns, individualColumns } from "./helpers/tableColumns";
import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


function App() {
  const [transactionData, setTransactionData] = useState(null);

  const [activeTab, setActiveTab] = useState('monthly');


  useEffect(() => {
    getData().then((data) => {
      const results = calculateTransData(data);
      setTransactionData(results);
    });
  }, []);

  if (transactionData == null) {
    return <div>Loading...</div>;
  }

  return transactionData == null ?
    <div>Loading...</div>
    :
    <div>
      <nav class="navbar navbar-light bg-dark">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('all')} >All Transactions</button>
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('monthly')} >Monthly Rewards</button>
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('total')} >Total Rewards</button>
        </div>
      </nav>
      <div class="container">
        <div class="row no-gutters">
          <div class="col-12">
            {activeTab === "all" ? (
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h5>All Transactions</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ReactTable
                      data={transactionData.transcationPoints}
                      columns={individualColumns}
                      defaultPageSize={10}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {activeTab === "monthly" ? (
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h5>Monthly rewards</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ReactTable
                      data={transactionData.summaryByCustomer}
                      defaultPageSize={10}
                      columns={columns}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {activeTab === "total" ? (
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h5>Total Rewards</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ReactTable
                      data={transactionData.totalPointsByCustomer}
                      columns={totalsByColumns}
                      defaultPageSize={3}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    ;
}

export default App;
