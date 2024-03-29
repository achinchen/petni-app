import type { AnimalInfo } from 'server/adapters/animal/index.presenter';
import type { Animal } from 'server/entities/animal';

export const ANIMALS = [
  {
    id: 35398,
    code: 'AAADG2017122506',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/c3ce5f7f-05e5-4b33-aba5-b2bf1c27a92e_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '不親狗',
    name: '',
    openAt: '2018-09-14T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.544Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35402,
    code: 'AAADG2017090525',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/8ca30d13-2c7f-42ab-8eda-680294e72eb5_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2017-09-05T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.456Z',
    updatedAt: '2022-07-17T10:10:26.660Z',
    userId: null
  },
  {
    id: 35413,
    code: 'AAADG2017122511',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/5686bc20-e9af-4ecc-a5f2-154722d261a5_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2019-08-23T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.543Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35415,
    code: 'AAADG2018012203',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/e9d381e0-942b-472d-858b-39ce51f524e1_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2018-02-15T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.516Z',
    updatedAt: '2022-07-17T10:10:26.668Z',
    userId: null
  },
  {
    id: 35422,
    code: 'AAADG2017122502',
    size: 'Medium',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/e22f1e70-0545-452b-8ee6-1bee9d31762e_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2017-12-25T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.523Z',
    updatedAt: '2022-07-17T10:10:26.670Z',
    userId: null
  },
  {
    id: 35424,
    code: 'AAADG2017122515',
    size: 'Medium',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/b8b14ef0-a4e6-4b35-a561-aecdec5e9c5b_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2017-12-25T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.544Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35428,
    code: 'AAADG2017070102',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/1bcd48f3-00d8-4b32-b907-388a61fb68ca_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2017-07-01T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.523Z',
    updatedAt: '2022-07-17T10:10:26.670Z',
    userId: null
  },
  {
    id: 35451,
    code: 'AAADG2017110703',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/2b1a7ef3-c6cd-4d73-91d2-458406a31848_org.JPG',
    location: '新北市板橋區',
    address: '新北市板橋區板城路28-1號',
    tel: '02-89662158',
    note: '',
    name: '',
    openAt: '2018-08-09T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.463Z',
    updatedAt: '2022-07-17T10:10:26.661Z',
    userId: null
  },
  {
    id: 35630,
    code: 'AAAEG104112403',
    size: 'Medium',
    color: '黑黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/20561032-c846-4943-9554-e6e17cacdaa3_org.jpg',
    location: '新北市中和區',
    address: '新北市中和區興南路三段100號',
    tel: '02-86685547',
    note: '',
    name: '',
    openAt: '2015-11-24T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.543Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35862,
    code: 'AAAFG104060424',
    size: 'Medium',
    color: '咖啡色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/cc70a589-87c8-4a73-bd4f-3fd6fc90fb59_org.JPG',
    location: '新北市淡水區',
    address: '新北市淡水區下圭柔山91之3號',
    tel: '02-26267558',
    note: '',
    name: '',
    openAt: '2018-02-27T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.527Z',
    updatedAt: '2022-07-17T10:10:26.671Z',
    userId: null
  },
  {
    id: 35877,
    code: 'AAAFG1041215001',
    size: 'Medium',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/9542c2bd-0c7c-4394-8129-3a7055496f5d_org.JPG',
    location: '新北市淡水區',
    address: '新北市淡水區下圭柔山91之3號',
    tel: '02-26267558',
    note: '',
    name: '',
    openAt: '2018-02-27T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.528Z',
    updatedAt: '2022-07-17T10:10:26.671Z',
    userId: null
  },
  {
    id: 35961,
    code: 'AAAGG105020102',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/65fb5052-7a43-444f-a97a-96f6bd2a6139_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '02/01 8inl',
    name: '',
    openAt: '2016-02-01T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.547Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35967,
    code: 'AAAGG105041402',
    size: 'Small',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/bcfc1fab-f80e-4e65-a4d2-b7285ed9292d_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '02/13結紮  5inl+R',
    name: '',
    openAt: '2016-04-26T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.547Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35979,
    code: 'AAAGG106041705',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/837044e6-3625-4894-b68c-e4fa739e2934_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '105/11/3八合一 狂犬病 晶片900138000767333 106.04.21 5inl+R 106.07/26 結紮',
    name: '',
    openAt: '2016-11-03T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.546Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35986,
    code: 'AAAGG105120702',
    size: 'Small',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/42891fc5-9302-4b0d-ab7b-00371e62a8a3_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '106.09/07結紮+R',
    name: '',
    openAt: '2016-12-19T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.542Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 35987,
    code: 'AAAGG106041701',
    size: 'Medium',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/5081ef41-dca2-4ba7-9154-73c2237568b0_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '106.04.21 5inl+R',
    name: '',
    openAt: '2016-12-21T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.551Z',
    updatedAt: '2022-07-17T10:10:26.674Z',
    userId: null
  },
  {
    id: 36001,
    code: 'AAAGG106042201',
    size: 'Small',
    color: '黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/63ecc41d-8fa5-4510-9a1b-270fe716ef9a_org.jpg',
    location: '新北市瑞芳區',
    address: '新北市瑞芳區靜安路四段(106縣道74.5K清潔隊場區內)',
    tel: '02-24063481',
    note: '106.07/26 結紮+R',
    name: '',
    openAt: '2017-05-04T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.546Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 36019,
    code: 'AAAHG104070101',
    size: 'Medium',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/95c9dc87-4203-466a-895c-73c42fa7042b_org.jpg',
    location: '新北市五股區',
    address: '新北市五股區外寮路9-9號',
    tel: '02-82925265',
    note: '',
    name: '',
    openAt: '2020-11-05T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.544Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  },
  {
    id: 36021,
    code: 'AAAHG104081706',
    size: 'Medium',
    color: '白色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/4569e9de-98dc-4347-aa99-ecb4d58a9471_org.jpg',
    location: '新北市五股區',
    address: '新北市五股區外寮路9-9號',
    tel: '02-82925265',
    note: '',
    name: '',
    openAt: '2021-10-05T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.551Z',
    updatedAt: '2022-07-17T10:10:26.674Z',
    userId: null
  },
  {
    id: 36033,
    code: 'AAAHG105042006',
    size: 'Medium',
    color: '黃色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/4d792117-9044-4402-9f6d-98ec5e20994f_org.jpg',
    location: '新北市五股區',
    address: '新北市五股區外寮路9-9號',
    tel: '02-82925265',
    note: '',
    name: '',
    openAt: '2021-10-05T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.543Z',
    updatedAt: '2022-07-17T10:10:26.673Z',
    userId: null
  }
] as unknown as Animal[];

export const ANIMAL_INFO = {
  ...ANIMALS[0],
  editable: false,
  follows: 1
} as unknown as AnimalInfo;
export const ANIMAL = ANIMALS[0];

export const EXISTED_ANIMALS = [
  {
    id: 205129,
    code: 'W100503-15',
    size: 'Medium',
    color: '棕灰色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/e35179fe-962f-4adf-b5d0-e40c7d9b83c8_org.JPG',
    location: '臺南市南區省',
    address: '臺南市南區省躬里14鄰萬年路580巷92號',
    tel: '06-2964439',
    note: '本站動物皆採現場互動面談後評估能否認養，不接受系統上的預約',
    name: '',
    openAt: '2021-05-03T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.583Z',
    updatedAt: '2022-07-17T10:10:26.679Z',
    userId: null
  },
  {
    id: 211146,
    code: 'FAABG10611220008',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/e2bfe5e7-bd27-4569-95b3-b7a8023d74b7_org.png',
    location: '臺中市后里區',
    address: '臺中市后里區堤防路370號',
    tel: '04-25588024',
    note: '',
    name: '',
    openAt: '2021-06-29T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.580Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 211180,
    code: 'QAAAG1100623002',
    size: 'Medium',
    color: '棕黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/cf28ca61-5048-41bf-a3ea-f251e315ddea_org.jpg',
    location: '基隆市七堵區',
    address: '基隆市七堵區大華三路45-12號(欣欣安樂園旁)',
    tel: '02-24560148',
    note: '親人親狗',
    name: '',
    openAt: '2021-06-23T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.579Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 212074,
    code: '110062915',
    size: 'Medium',
    color: '棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/0b56f550-5177-4304-92ce-bbdbfc0d4ec7_org.jpg',
    location: '臺北市內湖區',
    address: '臺北市內湖區潭美街852號',
    tel: '02-87913254',
    note: '發情中',
    name: '',
    openAt: '2021-08-02T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.514Z',
    updatedAt: '2022-07-17T10:10:26.668Z',
    userId: null
  },
  {
    id: 213157,
    code: 'AAAFG1100708001',
    size: 'Medium',
    color: '棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/72dc15c8-49d3-4dda-9550-96265a882596_org.JPG',
    location: '新北市淡水區',
    address: '新北市淡水區下圭柔山91之3號',
    tel: '02-26267558',
    note: '管制號：082261，1100629絕育，狂犬病疫苗，五合一疫苗，驅蟲，晶片：992007300108072, 1110419狂犬病疫苗，五合一疫苗',
    name: '',
    openAt: '2021-07-08T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.527Z',
    updatedAt: '2022-07-17T10:10:26.671Z',
    userId: null
  },
  {
    id: 213273,
    code: '110070801',
    size: 'Medium',
    color: '咖啡色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/9bbd8511-7721-45f2-b23c-e29d3d46097c_org.jpeg',
    location: '臺北市內湖區',
    address: '臺北市內湖區安美街191號',
    tel: '02-87913254',
    note: '消瘦，脖傷',
    name: '',
    openAt: '2021-07-26T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.482Z',
    updatedAt: '2022-07-17T10:10:26.664Z',
    userId: null
  },
  {
    id: 214028,
    code: 'FAABG10904290070',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/f7755934-a20a-41fc-99e2-db612fcce875_org.jpg',
    location: '臺中市后里區',
    address: '臺中市后里區堤防路370號',
    tel: '04-25588024',
    note: '曾有股骨頭切除手術病史，目前行動正常，但過胖需減重。',
    name: '',
    openAt: '2021-07-15T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.578Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 216012,
    code: '110073003',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/a7541fc7-df97-431b-a288-ecaf46f77c41_org.jpg',
    location: '臺北市內湖區',
    address: '臺北市內湖區潭美街852號',
    tel: '02-87913254',
    note: '右剪耳，110/8/7 開放認養',
    name: '',
    openAt: '2021-08-07T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.513Z',
    updatedAt: '2022-07-17T10:10:26.668Z',
    userId: null
  },
  {
    id: 216272,
    code: 'FAABG11008010005',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/9438f787-cda1-4c9b-9b2c-05e79176f428_org.jpg',
    location: '臺中市后里區',
    address: '臺中市后里區堤防路370號',
    tel: '04-25588024',
    note: '',
    name: '',
    openAt: '2021-08-03T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.577Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 216445,
    code: '1100802',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/c8a51edc-7af3-4c89-8559-b323d3c29cbe_org.jpg',
    location: '宜蘭縣五結鄉',
    address: '宜蘭縣五結鄉成興村利寶路60號',
    tel: '039602350分機620',
    note: '',
    name: '',
    openAt: '2021-08-04T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.577Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 219652,
    code: 'RAAAG1100826001',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/8798f0a3-2c5d-4f08-9259-079d849e1d46_org.jpg',
    location: '新竹市南寮里',
    address: '新竹市南寮里海濱路250號',
    tel: '03-5368329',
    note: '',
    name: '',
    openAt: '2021-09-03T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.575Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 219999,
    code: '110082805',
    size: 'Medium',
    color: '棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/72ebe9e7-4ae8-4c32-98b4-d7168d487516_org.jpg',
    location: '臺北市內湖區',
    address: '臺北市內湖區潭美街852號',
    tel: '02-87913254',
    note: '沒得蚤,右剪耳腹部縫線痕,急傷回,大面積表皮損傷,左後肢手術(車禍)，110/9/5 開放認養。',
    name: '',
    openAt: '2021-09-05T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.521Z',
    updatedAt: '2022-07-17T10:10:26.670Z',
    userId: null
  },
  {
    id: 222215,
    code: 'W100913-06',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/e18de9c6-b5f3-49b0-a72b-cd894aeaece8_org.JPG',
    location: '臺南市南區省',
    address: '臺南市南區省躬里14鄰萬年路580巷92號',
    tel: '06-2964439',
    note: '本站動物皆採現場互動面談後評估能否認養，不接受系統上的預約',
    name: '',
    openAt: '2021-09-13T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.574Z',
    updatedAt: '2022-07-17T10:10:26.678Z',
    userId: null
  },
  {
    id: 225379,
    code: '110100201',
    size: 'Medium',
    color: '棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/0e15739c-eae4-4888-8681-13a77048132a_org.jpeg',
    location: '臺北市內湖區',
    address: '臺北市內湖區潭美街852號',
    tel: '02-87913254',
    note: '綠項圈，藍胸背',
    name: '',
    openAt: '2021-10-18T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.509Z',
    updatedAt: '2022-07-17T10:10:26.668Z',
    userId: null
  },
  {
    id: 226272,
    code: 'AAAHG1101009001',
    size: 'Medium',
    color: '棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/ea08ca2d-0f03-46d1-bc51-e0ac6bd7ee0b_org.jpg',
    location: '新北市五股區',
    address: '新北市五股區外寮路9-9號',
    tel: '02-82925265',
    note: '',
    name: '',
    openAt: '2021-10-09T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.572Z',
    updatedAt: '2022-07-17T10:10:26.677Z',
    userId: null
  },
  {
    id: 229949,
    code: 'MAAAG1101105003',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/d445f6ca-976c-4183-8c98-35c67c5f0e68_org.jpg',
    location: '屏東縣內埔鄉',
    address: '屏東縣內埔鄉學府路1號(屏東科技大學內)',
    tel: '09-0049-3311',
    note: '',
    name: '',
    openAt: null,
    createdAt: '2022-07-17T10:10:26.569Z',
    updatedAt: '2022-07-17T10:10:26.676Z',
    userId: null
  },
  {
    id: 236040,
    code: '110121801',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/25bb6875-bc98-4e6d-8c37-053a1186ee08_org.jpg',
    location: '臺北市內湖區',
    address: '臺北市內湖區潭美街852號',
    tel: '02-87913254',
    note: '黑項圈+鐵鍊，腹部縫線痕',
    name: '',
    openAt: '2022-04-07T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.506Z',
    updatedAt: '2022-07-17T10:10:26.667Z',
    userId: null
  },
  {
    id: 236355,
    code: 'FAABG11012190014',
    size: 'Medium',
    color: '棕黑色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/49e15402-909c-4539-8c84-366840779373_org.jpg',
    location: '臺中市后里區',
    address: '臺中市后里區堤防路370號',
    tel: '04-25588024',
    note: '雙眼白內障,結膜炎及皮膚問題治療中，目前吃腎處方飼料。',
    name: '',
    openAt: '2021-12-24T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.566Z',
    updatedAt: '2022-07-17T10:10:26.676Z',
    userId: null
  },
  {
    id: 238114,
    code: 'OAAAG1110105001',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/87939c45-9da4-40e0-a524-45cee7ab6a88_org.jpg',
    location: '花蓮縣鳳林鎮',
    address: '花蓮縣鳳林鎮林榮里永豐路255號',
    tel: '038-421452',
    note: '',
    name: '',
    openAt: '2022-01-22T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.519Z',
    updatedAt: '2022-07-17T10:10:26.669Z',
    userId: null
  },
  {
    id: 239305,
    code: 'TAAAG1110113001',
    size: 'Medium',
    color: '黑棕色',
    family: 'Dog',
    gender: 'Female',
    imageUrl:
      'https://asms.coa.gov.tw/amlapp/upload/pic/52a4290d-6127-437b-9bbc-3eee23c547fc_org.jpg',
    location: '嘉義市彌陀路',
    address: '嘉義市彌陀路31號旁',
    tel: '05-2168661',
    note: '',
    name: '',
    openAt: '2022-01-13T00:00:00.000Z',
    createdAt: '2022-07-17T10:10:26.563Z',
    updatedAt: '2022-07-17T10:10:26.676Z',
    userId: null
  }
] as unknown as Animal[];

export const getAnimal = () => ({
  ...ANIMAL,
  id: Math.floor(Math.random() * 3000)
});
