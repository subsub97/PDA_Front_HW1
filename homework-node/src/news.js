import axios from 'axios';
import * as cheerio from 'cheerio';
import { generateKey } from 'crypto';
import fs from 'fs'

/**
 4월 1일부터, 4월 19일까지 주별로 뉴스기사 수집하기 (주별로: (영업일 5일 / 1주) 1페이지: 총 3페이지) 
    - (20240401 00시 00분 00초~20240405 23시59분59초)
    - (20240408 00시 00분 00초~20240412 23시59분59초)
    - (20240415 00시 00분 00초~20240419 23시59분59초)
    - 저장 형태는 Object형태로 하시되 key는 끝나는 날짜, value는 array<object({title:기사제목, url: 기사링크})>로 저장하기
*/
let userAgentValue = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function getNewsInfo() {
    //아래 기간 변수처리하기 
    const url = `https://search.daum.net/search?w=news&nil_search=btn&DA=STC&enc=utf8&cluster=y&cluster_page=1&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=20240401000000&ed=20240405235959&period=u`

    try { 
        const articles = [];

        const response = await axios.get(url, {
            headers: {
            'User-Agent': userAgentValue
            }
        });

        const data = await response.data;
        const $ = cheerio.load(data);

        $('.c-list-basic li').each((i, e) => {
            const title = $(e).find('.item-title').text().trim();
            if(title === "") return;
            const articleUrl = $(e).find('.conts-desc > a').prop('href');
            
            
            articles.push({
                title : title,
                url : articleUrl
            });
        })

        await saveNewsToJson(articles)
        
    }
    catch (error) {
        console.error("기사 가져오기 실패.", error);
    }
}

async function saveNewsToJson(news) {
  try {
    const jsonData = JSON.stringify(news, null, 2);
    await fs.promises.writeFile(`news_page.json`, jsonData, 'utf8');
  } catch (err) {
    console.error("파일 저장 실패", err);
  }
}

getNewsInfo();



