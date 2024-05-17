import axios from 'axios';
import fs from 'fs'
/**
4월 1일부터, 4월 19일까지 삼성전자  주봉(3개)가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]
*/

const userAgentValue = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function main(){
  const url = `https://finance.daum.net/api/charts/A005930/weeks?limit=10&adjusted=true`;

  try{


    const response = await axios.get(url,{
            headers :{
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
              "Referer": "https://finance.daum.net/quotes/A005930",
              "Accept": "application/json, text/plain, */*"
                }}
            );

    const chartList = response.data.data;
    
    await saveStockToJson(chartList);

  }
  catch (error) {
    console.error("차트 정보 받아오기 실패...", error);
  }
}

const exportDates = [
  "2024-04-05",
  "2024-04-12",
  "2024-04-19"
]

async function saveStockToJson(stocks) {
  try {
    const filteredStocks = stocks.filter(stock => exportDates.includes(stock.date)).map(stock => ({
      date: stock.date,
      tradePrice: stock.tradePrice,
      openingPrice: stock.openingPrice,
      highPrice: stock.highPrice,
      lowPrice: stock.lowPrice,
      candleAccTradePrice: stock.candleAccTradePrice
    }));

    const jsonData = JSON.stringify(filteredStocks, null, 2);

    await fs.promises.writeFile(`../stock.json`, jsonData, 'utf8');
    console.log("저장 성공");

  } catch (err) {
    console.error("파일 저장 실패", err);
  }
}


main();