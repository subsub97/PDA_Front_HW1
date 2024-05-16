import axios from 'axios';
import fs from 'fs'
/**
4월 1일부터, 4월 19일까지 삼성전자  주봉(3개)가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]
*/

const userAgentValue = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const payload = {
  limit: 200,
  adjusted: true
}

async function main(){
  const url = `https://finance.daum.net/api/charts/A005930/weeks?limit=200&adjusted=true`;

  try{
    const response = await axios.get(url,{
                headers: {
                'User-Agent': userAgentValue
                }}
    );
    console.log(response.data);
  }
  catch (error) {
    console.error("차트 정보 받아오기 실패...", error);
  }
}


main();