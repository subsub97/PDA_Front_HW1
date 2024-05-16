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

async function main(){}

main();