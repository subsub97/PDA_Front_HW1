import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function StockApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // get요청으로 정보를 가져옴
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3000/data/stock.json");
        setData(response.data); //렌더링시 값을 받아온다.
      } catch (error) {
        console.error('데이터를 불러오는 데 실패', error);
      }
    }
    getData();
  },[]);

  return (
    <div>
      <h1>Stocks</h1>
      {StockTable(data)}
    </div>
  )
}

function StockTable(data) {
  console.log(data);
  return (

    //props가 잘 적용되었는지 확인
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>날짜</th>
          <th>종가</th>
          <th>시가</th>
          <th>고가</th>
          <th>저가</th>
          <th>거래대금</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.tradePrice}</td>
            <td>{row.openingPrice}</td>
            <td>{row.highPrice}</td>
            <td>{row.lowPrice}</td>
            <td>{row.candleAccTradePrice}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
