export enum Area {
  Northern = 'northern',
  Central = 'central',
  Southern = 'southern',
  Eastern = 'eastern'
}

export enum City {
  Taipei = 'TAIPEI',
  NewTaipei = 'NEW_TAIPEI',
  Taoyuan = 'TAOYUAN',
  Hsinchu = 'HSINCHU',
  Taichung = 'TAICHUNG',
  Changhua = 'CHANGHUA',
  Yunlin = 'YUNLIN',
  Jiayi = 'JIAYI',
  Tainan = 'TAINAN',
  Kaohsiung = 'KAOHSIUNG',
  Pingtung = 'PINGTUNG',
  Hualian = 'HUALIAN'
}

export const CITY_LABEL = {
  [City.Taipei]: '台北',
  [City.NewTaipei]: '新北',
  [City.Taoyuan]: '桃園市',
  [City.Hsinchu]: '新竹',
  [City.Taichung]: '台中',
  [City.Changhua]: '彰化',
  [City.Yunlin]: '雲林',
  [City.Jiayi]: '嘉義',
  [City.Tainan]: '台南',
  [City.Kaohsiung]: '高雄',
  [City.Pingtung]: '屏東',
  [City.Hualian]: '花蓮'
};

export const HOSPITALS = {
  [City.Taipei]: [
    {
      NAME: '展望動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2388 0122',
      ADDRESS: '台北市萬華區中華路二段二號'
    },
    {
      NAME: '大安動物醫院 ',
      OPEN_DURING_COVID: true,
      TEL: '02 2363 2020',
      ADDRESS: '台北市中正區羅斯福路四段162號1樓'
    },
    {
      NAME: '伊甸動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 8509 2579',
      ADDRESS: '台北市中山區北安路554巷33號'
    },
    {
      NAME: '阿牛犬貓急診醫院 ',
      OPEN_DURING_COVID: true,
      TEL: '02 28827381',
      ADDRESS: '台北市士林區基河路238號'
    },
    {
      NAME: '慈愛24小時動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2556 3320',
      ADDRESS: '台北市大同區寧夏路1號'
    },
    {
      NAME: '太僕動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2517 0902',
      ADDRESS: '台北市中山區龍江路260號'
    },
    {
      NAME: '南京太僕動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2756 2005',
      ADDRESS: '台北市松山區南京東路五段286號'
    },
    {
      NAME: '布達羊急診動物醫院 ',
      OPEN_DURING_COVID: true,
      TEL: '0228341119',
      ADDRESS: '台北市士林區忠誠路102號'
    },
    {
      NAME: '全民動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2893 9752',
      ADDRESS: '台北市北投區懷德街6-3號'
    },
    {
      NAME: '全國24小時動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 8791 8706',
      ADDRESS: '台北市內湖區舊宗路一段30巷13號'
    },
    {
      NAME: '大群動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2930 5557',
      ADDRESS: '台北市文山區羅斯福路六段206號'
    },
    {
      NAME: '仁慈動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2533 6983',
      EMERGENCY_TEL: '0935 578 571',
      ADDRESS: '台北市中山區北安路518巷6號1樓'
    },
    {
      NAME: '漢民動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2307 4801',
      ADDRESS: '台北市和平西路一段156號'
    },
    {
      NAME: '全民動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2553 0371',
      ADDRESS: '台北市大同區民生西路247號、249號'
    },
    {
      NAME: '隆記動物醫院',
      OPEN_DURING_COVID: false,
      TEL: ['02 2760 7639', '02 2746 6888'],
      ADDRESS: '台北市民生東路五段63號'
    },
    {
      NAME: '嘉慶動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 8787 9121',
      ADDRESS: '台北市松山區八德路四緞218號1樓'
    },
    {
      NAME: '幸福動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2700 5277',
      EMERGENCY_TEL: '02 2700 5233',
      ADDRESS: '台北市大安區延吉街251號1樓'
    },
    {
      NAME: '藍天家畜醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2838 0088',
      ADDRESS: '台北市士林區文林路759號'
    },
    {
      NAME: '丹堤動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 5586 5668',
      ADDRESS: '台北市北投區知行路208-2號1樓'
    },
    {
      NAME: '全安動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2633 6495',
      ADDRESS: '台北市內湖區東湖路113巷54號'
    },
    {
      NAME: '永春動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 8789 8849',
      ADDRESS: '台北市信義區忠孝東路五段424號'
    }
  ],
  [City.NewTaipei]: [
    {
      NAME: '中日動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '02 2226 3639',
      ADDRESS: '新北市中和區中山路三段2號'
    },
    {
      NAME: '牧村動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 8951 1172~3',
      ADDRESS: '板橋區民生路2段50號'
    },
    {
      NAME: '哲生動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2809 2293',
      EMERGENCY_TEL: '0938 802 831',
      ADDRESS: '新北市淡水區民族路29巷40號'
    },
    {
      NAME: '提姆沃克醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 8982 9291',
      ADDRESS: '新北市三重區中正北路23號'
    },
    {
      NAME: '來來動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 8953 9739',
      EMERGENCY_TEL: '0910 035 175',
      ADDRESS: '新北市中和區德光路29號'
    },
    {
      NAME: '祐全動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2997 5827',
      ADDRESS: '新北市新莊區幸福路795號'
    },
    {
      NAME: '亞東動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '02 2221 8515',
      EMERGENCY_TEL: '0952 605 051',
      ADDRESS: '新北市中和區中正路639號'
    }
  ],
  [City.Taoyuan]: [
    {
      NAME: '品湛動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '03 336 3252',
      ADDRESS: '桃園市桃園區民生路495-9號'
    },
    {
      NAME: '磨鼻子動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '03 453 5740',
      ADDRESS: '桃園市中壢區延平路20號'
    },
    {
      NAME: '元氣動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '03 355 3911',
      ADDRESS: '桃園市莊敬路一段159號'
    },
    {
      NAME: '南崁動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 352 0136',
      ADDRESS: '桃園市蘆竹區中正路379號'
    },
    {
      NAME: '達特馬動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 228 8884',
      ADDRESS: '桃園市國際路一段1172號'
    }
  ],
  [City.Hsinchu]: [
    {
      NAME: '大福小幸動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 530 0175',
      ADDRESS: '新竹市香山區經國路三段92巷6號'
    },
    {
      NAME: '築心動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 533 8055',
      ADDRESS: '新竹市東區經國路一段654號'
    },
    {
      NAME: '中日動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 523 1015',
      ADDRESS: '新竹市西大路656號'
    },
    {
      NAME: '毛毛村動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 562 0606',
      ADDRESS: '新竹市東區南大路79-2號',
      NOTE: '急診服務到凌晨兩點'
    }
  ],
  [City.Taichung]: [
    {
      NAME: '全國24小時動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '04 2371 0496',
      ADDRESS: '台中市西區五權八街100號'
    },
    {
      NAME: '慈愛24小時動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '04 2406 6688',
      ADDRESS: '台中市大里區國光路二段539號'
    },
    {
      NAME: '康德動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '04 2241 2700',
      ADDRESS: '台中市北屯區崇德路二段270號'
    },
    {
      NAME: '成大動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '04 2639 8365',
      EMERGENCY_TEL: '0908 198 108',
      ADDRESS: '台中市清水區臨港路五段658巷27號'
    },
    {
      NAME: '祥億動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 2260 6450',
      ADDRESS: '台中市南區復興路一段259號'
    },
    {
      NAME: '羅大宇動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 2372 8378',
      ADDRESS: '台中市西區存中街153號'
    },
    {
      NAME: '沐恩動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 2207 7271',
      ADDRESS: '台中市北區健行路865號'
    },
    {
      NAME: '非凡動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 2277 1269',
      ADDRESS: '台中市太平區鵬儀路1-4號'
    },
    {
      NAME: '宏仁動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 2622 1278',
      ADDRESS: '台中市清水區中華路442巷7號'
    },
    {
      NAME: '格林威治動物醫院',
      OPEN_DURING_COVID: true,
      TEL: ['04 2320 2279', '04 2320 2379'],
      ADDRESS: '台中市南屯區文心路一段486號'
    }
  ],
  [City.Changhua]: [
    {
      NAME: '忠愛動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 833 5520',
      ADDRESS: '彰化縣員林市中山路二段490號'
    },
    {
      NAME: '快樂動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 738 4978',
      ADDRESS: '彰化市彰南路二段180號'
    },
    {
      NAME: '吉美動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '04 872 2982',
      ADDRESS: '彰化縣社頭鄉民生路750號'
    }
  ],
  [City.Yunlin]: [
    {
      NAME: '弘安動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '05 533 3536',
      ADDRESS: '雲林縣斗六市西平路276號'
    },
    {
      NAME: '和牧動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '05 633 0811',
      ADDRESS: '雲林縣虎尾鎮光復路454號'
    }
  ],
  [City.Jiayi]: [
    {
      NAME: '民族24小時動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '05 228 9595',
      ADDRESS: '嘉義市民族路776號'
    },
    {
      NAME: '高品動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '05 281 1893',
      ADDRESS: '嘉義市中興路489號'
    }
  ],
  [City.Tainan]: [
    {
      NAME: '慈愛動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '06 220 3166',
      ADDRESS: '台南市西門路一段473號'
    },
    {
      NAME: '全國24小時動物醫院',
      OPEN_DURING_COVID: true,
      TEL: '06 313 3116',
      ADDRESS: '台南市永康區中華路103號2F'
    },
    {
      NAME: '中美獸醫院',
      OPEN_DURING_COVID: false,
      TEL: '06 281 2233',
      ADDRESS: '台南市北區和緯路二段231號'
    }
  ],
  [City.Kaohsiung]: [
    {
      NAME: '冠安動物醫院 ',
      OPEN_DURING_COVID: true,
      TEL: '07 223 6451',
      ADDRESS: '高雄市苓雅區中正二路131-1號'
    },
    {
      NAME: '宏力動物醫院 ',
      OPEN_DURING_COVID: true,
      TEL: '07 310 2819',
      ADDRESS: '高雄市三民區明誠一路326號'
    },
    {
      NAME: '梅西動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '07 345 2541',
      ADDRESS: '高雄市左營區文府路498號',
      NOTE: '營業到凌晨兩點'
    },
    {
      NAME: '杜莉德動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '07 223 1295',
      EMERGENCY_TEL: '0989 682 888',
      ADDRESS: '高雄市新興區和平一路295號',
      NOTE: '不是24小時但如果打給醫生有接就會開'
    },
    {
      NAME: '中興動物大豐總院',
      OPEN_DURING_COVID: false,
      TEL: '07 384 4631',
      ADDRESS: '高雄市三民區大豐二路118-1號'
    },
    {
      NAME: '希望動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '07 753 7300',
      EMERGENCY_TEL: '0988 629 973',
      ADDRESS: '高雄市鳳山區凱旋路凱旋路100號'
    },
    {
      NAME: '烏鐸動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '07 722 0804',
      ADDRESS: '高雄市苓雅區中正一路139號'
    },
    {
      NAME: '聯盟動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '07 3740964',
      ADDRESS: '高雄市仁武區鳳仁路231號'
    }
  ],
  [City.Pingtung]: [
    {
      NAME: '大同動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '08 733 9215',
      ADDRESS: '屏東市民族路222號'
    },
    {
      NAME: '毛小孩24小時動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '08 751 2022',
      ADDRESS: '屏東市仁愛路7號'
    }
  ],
  [City.Hualian]: [
    {
      NAME: '中原動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 834 1857',
      ADDRESS: '花蓮縣花蓮市中山路438號',
      NOTE: '不是24小時但如果打給醫生有接就會開'
    },
    {
      NAME: '上海動物醫院',
      OPEN_DURING_COVID: false,
      TEL: '03 834 1853',
      ADDRESS: '花蓮縣花蓮市上海街63號'
    }
  ]
};

export const REMINDER = '*資訊僅供參考，建議先電話聯絡再前往。';
