import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs'

/**
 4월 1일부터, 4월 19일까지 주별로 뉴스기사 수집하기 (주별로: (영업일 5일 / 1주) 1페이지: 총 3페이지) 
    - (20240401 00시 00분 00초~20240405 23시59분59초)
    - (20240408 00시 00분 00초~20240412 23시59분59초)
    - (20240415 00시 00분 00초~20240419 23시59분59초)
    - 저장 형태는 Object형태로 하시되 key는 끝나는 날짜, value는 array<object({title:기사제목, url: 기사링크})>로 저장하기
*/

//아래 기간 변수처리하기 
const url = `https://search.daum.net/search?w=news&cluster=y&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=20240401000000&ed=20240405235959&period=u&DA=STC`

try {
    const response = await axios.get(url);
    const data = response.data;
    const $ = cheerio.load(data);

    console.log($.html());
}
catch (error) {
    console.error("기사 가져오기 실패.", error);
}


