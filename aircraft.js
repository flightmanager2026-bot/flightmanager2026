var AIRCRAFT_CATALOG = {
  'Airbus': [
    {model:'A220-100', seats:135, range:6390, price:89000000, img:'', level:1, desc:'Krótki zasięg, 135 miejsc, zasięg 6,390 km', img:''},
    {model:'A220-300', seats:160, range:6297, price:104000000, img:'', level:2, desc:'Krótki zasięg, 160 miejsc, zasięg 6,297 km', img:''},
    {model:'A220-500', seats:180, range:6100, price:125000000, img:'', level:3, desc:'Krótki zasięg, 180 miejsc, zasięg 6,100 km', img:''},
    {model:'A318', seats:136, range:5750, price:77000000, img:'', level:1, desc:'Krótki zasięg, 136 miejsc, zasięg 5,750 km', img:''},
    {model:'A319', seats:156, range:6950, price:92000000, img:'', level:2, desc:'Krótki zasięg, 156 miejsc, zasięg 6,950 km', img:''},
    {model:'A319 Neo', seats:160, range:6850, price:101000000, img:'', level:2, desc:'Krótki zasięg, 160 miejsc, zasięg 6,850 km', img:''},
    {model:'A320', seats:186, range:6100, price:101000000, img:'', level:2, desc:'Krótki zasięg, 186 miejsc, zasięg 6,100 km', img:''},
    {model:'A320 Neo', seats:194, range:6300, price:110000000, img:'', level:3, desc:'Krótki zasięg, 194 miejsc, zasięg 6,300 km', img:''},
    {model:'A321', seats:220, range:5930, price:118000000, img:'', level:3, desc:'Krótki zasięg, 220 miejsc, zasięg 5,930 km', img:''},
    {model:'A321 Neo', seats:244, range:7400, price:130000000, img:'', level:4, desc:'Średni zasięg, 244 miejsc, zasięg 7,400 km', img:''},
    {model:'A300', seats:345, range:7500, price:145000000, img:'', level:5, desc:'Średni zasięg, 345 miejsc, zasięg 7,500 km', img:''},
    {model:'A310', seats:280, range:9540, price:135000000, img:'', level:5, desc:'Średni zasięg, 280 miejsc, zasięg 9,540 km', img:''},
    {model:'A330-200', seats:406, range:13450, price:238000000, img:'', level:6, desc:'Daleki zasięg, 406 miejsc, zasięg 13,450 km', img:''},
    {model:'A330-300', seats:440, range:11750, price:264000000, img:'', level:6, desc:'Średni zasięg, 440 miejsc, zasięg 11,750 km', img:''},
    {model:'A340-200', seats:420, range:12400, price:250000000, img:'', level:7, desc:'Daleki zasięg, 420 miejsc, zasięg 12,400 km', img:''},
    {model:'A340-300', seats:440, range:13500, price:270000000, img:'', level:7, desc:'Daleki zasięg, 440 miejsc, zasięg 13,500 km', img:''},
    {model:'A340-500', seats:440, range:16670, price:290000000, img:'', level:8, desc:'Daleki zasięg, 440 miejsc, zasięg 16,670 km', img:''},
    {model:'A340-600', seats:475, range:14450, price:310000000, img:'', level:8, desc:'Daleki zasięg, 475 miejsc, zasięg 14,450 km', img:''},
    {model:'A350-800', seats:375, range:15400, price:305000000, img:'', level:8, desc:'Daleki zasięg, 375 miejsc, zasięg 15,400 km', img:''},
    {model:'A350-900', seats:440, range:15000, price:318000000, img:'', level:9, desc:'Daleki zasięg, 440 miejsc, zasięg 15,000 km', img:''},
    {model:'A350-1000', seats:480, range:16100, price:366000000, img:'', level:9, desc:'Daleki zasięg, 480 miejsc, zasięg 16,100 km', img:''},
    {model:'A380-800', seats:835, range:15200, price:445000000, img:'', level:10, desc:'Daleki zasięg, 835 miejsc, zasięg 15,200 km', img:''},
  ],
  'Boeing': [
    {model:'717-200', seats:134, range:3820, price:72000000, img:'', level:1, desc:'Krótki zasięg, 134 miejsc, zasięg 3,820 km', img:''},
    {model:'727-100', seats:131, range:4300, price:65000000, img:'', level:1, desc:'Krótki zasięg, 131 miejsc, zasięg 4,300 km', img:''},
    {model:'727-200', seats:189, range:4450, price:78000000, img:'', level:2, desc:'Krótki zasięg, 189 miejsc, zasięg 4,450 km', img:''},
    {model:'737-100', seats:115, range:2850, price:55000000, img:'', level:1, desc:'Krótki zasięg, 115 miejsc, zasięg 2,850 km', img:''},
    {model:'737-200', seats:130, range:4260, price:62000000, img:'', level:1, desc:'Krótki zasięg, 130 miejsc, zasięg 4,260 km', img:''},
    {model:'737-300', seats:149, range:4175, price:68000000, img:'', level:1, desc:'Krótki zasięg, 149 miejsc, zasięg 4,175 km', img:''},
    {model:'737-400', seats:188, range:3850, price:75000000, img:'', level:2, desc:'Krótki zasięg, 188 miejsc, zasięg 3,850 km', img:''},
    {model:'737-500', seats:132, range:4440, price:65000000, img:'', level:1, desc:'Krótki zasięg, 132 miejsc, zasięg 4,440 km', img:''},
    {model:'737-600', seats:149, range:5640, price:72000000, img:'', level:2, desc:'Krótki zasięg, 149 miejsc, zasięg 5,640 km', img:''},
    {model:'737-700', seats:149, range:6010, price:80000000, img:'', level:2, desc:'Krótki zasięg, 149 miejsc, zasięg 6,010 km', img:''},
    {model:'737-800', seats:189, range:5435, price:96000000, img:'', level:2, desc:'Krótki zasięg, 189 miejsc, zasięg 5,435 km', img:''},
    {model:'737-900', seats:189, range:5080, price:99000000, img:'', level:2, desc:'Krótki zasięg, 189 miejsc, zasięg 5,080 km', img:''},
    {model:'737-900ER', seats:220, range:5460, price:105000000, img:'', level:3, desc:'Krótki zasięg, 220 miejsc, zasięg 5,460 km', img:''},
    {model:'737 MAX 7', seats:172, range:7040, price:99000000, img:'', level:3, desc:'Średni zasięg, 172 miejsc, zasięg 7,040 km', img:''},
    {model:'737 MAX 8', seats:189, range:6480, price:121000000, img:'', level:3, desc:'Krótki zasięg, 189 miejsc, zasięg 6,480 km', img:''},
    {model:'737 MAX 8-200', seats:200, range:6480, price:128000000, img:'', level:3, desc:'Krótki zasięg, 200 miejsc, zasięg 6,480 km', img:''},
    {model:'737 MAX 9', seats:220, range:6020, price:134000000, img:'', level:4, desc:'Krótki zasięg, 220 miejsc, zasięg 6,020 km', img:''},
    {model:'737 MAX 10', seats:230, range:5740, price:140000000, img:'', level:4, desc:'Krótki zasięg, 230 miejsc, zasięg 5,740 km', img:''},
    {model:'707-120', seats:174, range:6820, price:60000000, img:'', level:2, desc:'Krótki zasięg, 174 miejsc, zasięg 6,820 km', img:''},
    {model:'707-320', seats:189, range:9300, price:72000000, img:'', level:3, desc:'Średni zasięg, 189 miejsc, zasięg 9,300 km', img:''},
    {model:'720', seats:149, range:7040, price:58000000, img:'', level:2, desc:'Średni zasięg, 149 miejsc, zasięg 7,040 km', img:''},
    {model:'747SP', seats:400, range:12325, price:220000000, img:'', level:6, desc:'Daleki zasięg, 400 miejsc, zasięg 12,325 km', img:''},
    {model:'747-100', seats:452, range:8560, price:230000000, img:'', level:6, desc:'Średni zasięg, 452 miejsc, zasięg 8,560 km', img:''},
    {model:'747-200', seats:490, range:12150, price:255000000, img:'', level:7, desc:'Daleki zasięg, 490 miejsc, zasięg 12,150 km', img:''},
    {model:'747-300', seats:565, range:12400, price:280000000, img:'', level:7, desc:'Daleki zasięg, 565 miejsc, zasięg 12,400 km', img:''},
    {model:'747-400', seats:660, range:13450, price:320000000, img:'', level:8, desc:'Daleki zasięg, 660 miejsc, zasięg 13,450 km', img:''},
    {model:'747-8', seats:605, range:14320, price:368000000, img:'', level:9, desc:'Daleki zasięg, 605 miejsc, zasięg 14,320 km', img:''},
    {model:'757-200', seats:239, range:7222, price:150000000, img:'', level:4, desc:'Średni zasięg, 239 miejsc, zasięg 7,222 km', img:''},
    {model:'757-300', seats:295, range:6287, price:170000000, img:'', level:5, desc:'Krótki zasięg, 295 miejsc, zasięg 6,287 km', img:''},
    {model:'767-200', seats:290, range:7300, price:165000000, img:'', level:5, desc:'Średni zasięg, 290 miejsc, zasięg 7,300 km', img:''},
    {model:'767-200ER', seats:290, range:12200, price:180000000, img:'', level:5, desc:'Daleki zasięg, 290 miejsc, zasięg 12,200 km', img:''},
    {model:'767-300', seats:350, range:7300, price:195000000, img:'', level:5, desc:'Średni zasięg, 350 miejsc, zasięg 7,300 km', img:''},
    {model:'767-300ER', seats:351, range:11070, price:210000000, img:'', level:6, desc:'Średni zasięg, 351 miejsc, zasięg 11,070 km', img:''},
    {model:'767-400ER', seats:375, range:10415, price:225000000, img:'', level:6, desc:'Średni zasięg, 375 miejsc, zasięg 10,415 km', img:''},
    {model:'777-200', seats:440, range:9700, price:260000000, img:'', level:7, desc:'Średni zasięg, 440 miejsc, zasięg 9,700 km', img:''},
    {model:'777-200ER', seats:440, range:13080, price:285000000, img:'', level:7, desc:'Daleki zasięg, 440 miejsc, zasięg 13,080 km', img:''},
    {model:'777-200LR', seats:440, range:15843, price:320000000, img:'', level:8, desc:'Daleki zasięg, 440 miejsc, zasięg 15,843 km', img:''},
    {model:'777-300', seats:550, range:11165, price:320000000, img:'', level:8, desc:'Średni zasięg, 550 miejsc, zasięg 11,165 km', img:''},
    {model:'777-300ER', seats:550, range:13650, price:345000000, img:'', level:8, desc:'Daleki zasięg, 550 miejsc, zasięg 13,650 km', img:''},
    {model:'777-8', seats:395, range:16170, price:375000000, img:'', level:9, desc:'Daleki zasięg, 395 miejsc, zasięg 16,170 km', img:''},
    {model:'777-9', seats:426, range:13500, price:408000000, img:'', level:9, desc:'Daleki zasięg, 426 miejsc, zasięg 13,500 km', img:''},
    {model:'787-8', seats:359, range:13530, price:248000000, img:'', level:6, desc:'Daleki zasięg, 359 miejsc, zasięg 13,530 km', img:''},
    {model:'787-9', seats:420, range:14010, price:292000000, img:'', level:7, desc:'Daleki zasięg, 420 miejsc, zasięg 14,010 km', img:''},
    {model:'787-10', seats:440, range:11730, price:338000000, img:'', level:8, desc:'Średni zasięg, 440 miejsc, zasięg 11,730 km', img:''},
  ]
};

var AC_SPEEDS = {
  'A220-100':871,'A220-300':871,'A220-500':871,
  'A318':840,'A319':840,'A319 Neo':840,'A320':840,'A320 Neo':840,'A321':840,'A321 Neo':840,
  'A300':875,'A310':875,
  'A330-200':871,'A330-300':871,
  'A340-200':880,'A340-300':880,'A340-500':880,'A340-600':880,
  'A350-800':903,'A350-900':903,'A350-1000':903,
  'A380-800':903,
  '717-200':817,'727-100':873,'727-200':873,
  '737-100':850,'737-200':850,'737-300':850,'737-400':850,'737-500':850,
  '737-600':850,'737-700':850,'737-800':842,'737-900':842,'737-900ER':842,
  '737 MAX 7':839,'737 MAX 8':839,'737 MAX 8-200':839,'737 MAX 9':839,'737 MAX 10':839,
  '707-120':945,'707-320':945,'720':945,
  '747SP':939,'747-100':939,'747-200':939,'747-300':939,'747-400':939,'747-8':988,
  '757-200':870,'757-300':870,
  '767-200':851,'767-200ER':851,'767-300':851,'767-300ER':851,'767-400ER':851,
  '777-200':905,'777-200ER':905,'777-200LR':905,'777-300':905,'777-300ER':905,
  '777-8':905,'777-9':905,
  '787-8':903,'787-9':903,'787-10':903
};

// Dodatkowi producenci
AIRCRAFT_CATALOG['Embraer'] = [
  {model:'ERJ-135', seats:37, range:3241, price:18000000, desc:'Krótki zasięg, 37 miejsc, zasięg 3,241 km', img:'', level:1},
  {model:'ERJ-140', seats:44, range:2985, price:20000000, desc:'Krótki zasięg, 44 miejsca, zasięg 2,985 km', img:'', level:1},
  {model:'ERJ-145', seats:50, range:2800, price:22000000, desc:'Krótki zasięg, 50 miejsc, zasięg 2,800 km', img:'', level:1},
  {model:'E170', seats:72, range:3735, price:35000000, desc:'Krótki zasięg, 72 miejsca, zasięg 3,735 km', img:'', level:1},
  {model:'E175', seats:80, range:3735, price:42000000, desc:'Krótki zasięg, 80 miejsc, zasięg 3,735 km', img:'', level:1},
  {model:'E190', seats:100, range:4537, price:52000000, desc:'Krótki zasięg, 100 miejsc, zasięg 4,537 km', img:'', level:2},
  {model:'E195', seats:124, range:4260, price:58000000, desc:'Krótki zasięg, 124 miejsca, zasięg 4,260 km', img:'', level:2},
  {model:'E175-E2', seats:80, range:3735, price:55000000, desc:'Krótki zasięg, 80 miejsc, zasięg 3,735 km', img:'', level:2},
  {model:'E190-E2', seats:106, range:4537, price:68000000, desc:'Krótki zasięg, 106 miejsc, zasięg 4,537 km', img:'', level:2},
  {model:'E195-E2', seats:146, range:4320, price:75000000, desc:'Krótki zasięg, 146 miejsc, zasięg 4,320 km', img:'', level:3},
];

AIRCRAFT_CATALOG['Bombardier'] = [
  {model:'CRJ-100', seats:50, range:2982, price:20000000, desc:'Krótki zasięg, 50 miejsc, zasięg 2,982 km', img:'', level:1},
  {model:'CRJ-200', seats:50, range:3148, price:22000000, desc:'Krótki zasięg, 50 miejsc, zasięg 3,148 km', img:'', level:1},
  {model:'CRJ-700', seats:70, range:3693, price:38000000, desc:'Krótki zasięg, 70 miejsc, zasięg 3,693 km', img:'', level:1},
  {model:'CRJ-900', seats:90, range:2956, price:45000000, desc:'Krótki zasięg, 90 miejsc, zasięg 2,956 km', img:'', level:2},
  {model:'CRJ-1000', seats:100, range:3004, price:50000000, desc:'Krótki zasięg, 100 miejsc, zasięg 3,004 km', img:'', level:2},
  {model:'Dash 8 Q400', seats:90, range:2522, price:32000000, desc:'Turbośmigłowy, 90 miejsc, zasięg 2,522 km', img:'', level:1},
  {model:'CS100', seats:110, range:5741, price:79000000, desc:'Krótki zasięg, 110 miejsc, zasięg 5,741 km', img:'', level:2},
  {model:'CS300', seats:130, range:6300, price:91000000, desc:'Krótki zasięg, 130 miejsc, zasięg 6,300 km', img:'', level:2},
];

AIRCRAFT_CATALOG['ATR'] = [
  {model:'ATR 42-300', seats:50, range:1326, price:12000000, desc:'Krótki zasięg, 50 miejsc, zasięg 1,326 km', img:'', level:1},
  {model:'ATR 42-500', seats:50, range:1326, price:14000000, desc:'Krótki zasięg, 50 miejsc, zasięg 1,326 km', img:'', level:1},
  {model:'ATR 42-600', seats:50, range:1326, price:16000000, desc:'Krótki zasięg, 50 miejsc, zasięg 1,326 km', img:'', level:1},
  {model:'ATR 72-200', seats:74, range:1528, price:18000000, desc:'Krótki zasięg, 74 miejsca, zasięg 1,528 km', img:'', level:1},
  {model:'ATR 72-500', seats:74, range:1528, price:20000000, desc:'Krótki zasięg, 74 miejsca, zasięg 1,528 km', img:'', level:1},
  {model:'ATR 72-600', seats:78, range:1528, price:22000000, desc:'Krótki zasięg, 78 miejsc, zasięg 1,528 km', img:'', level:1},
];

AIRCRAFT_CATALOG['Suchoj'] = [
  {model:'Superjet 100', seats:98, range:4578, price:36000000, desc:'Krótki zasięg, 98 miejsc, zasięg 4,578 km', img:'', level:2},
  {model:'Superjet 100LR', seats:98, range:4578, price:38000000, desc:'Krótki zasięg, 98 miejsc, zasięg 4,578 km', img:'', level:2},
];

AIRCRAFT_CATALOG['Irkut'] = [
  {model:'MC-21-200', seats:132, range:6400, price:75000000, desc:'Krótki zasięg, 132 miejsca, zasięg 6,400 km', img:'', level:3},
  {model:'MC-21-300', seats:163, range:6000, price:85000000, desc:'Krótki zasięg, 163 miejsca, zasięg 6,000 km', img:'', level:3},
];

AIRCRAFT_CATALOG['Iliuszyn'] = [
  {model:'Ił-62', seats:186, range:10000, price:45000000, desc:'Długi zasięg, 186 miejsc, zasięg 10,000 km', img:'', level:3},
  {model:'Ił-76', seats:140, range:5000, price:55000000, desc:'Średni zasięg, 140 miejsc, zasięg 5,000 km', img:'', level:3},
  {model:'Ił-86', seats:350, range:3600, price:60000000, desc:'Krótki zasięg, 350 miejsc, zasięg 3,600 km', img:'', level:4},
  {model:'Ił-96', seats:300, range:11500, price:78000000, desc:'Długi zasięg, 300 miejsc, zasięg 11,500 km', img:'', level:5},
];

AIRCRAFT_CATALOG['Tupolew'] = [
  {model:'Tu-134', seats:84, range:3020, price:22000000, desc:'Krótki zasięg, 84 miejsca, zasięg 3,020 km', img:'', level:2},
  {model:'Tu-154', seats:180, range:6600, price:35000000, desc:'Krótki zasięg, 180 miejsc, zasięg 6,600 km', img:'', level:3},
  {model:'Tu-204', seats:210, range:6500, price:45000000, desc:'Krótki zasięg, 210 miejsc, zasięg 6,500 km', img:'', level:3},
  {model:'Tu-214', seats:210, range:6500, price:48000000, desc:'Krótki zasięg, 210 miejsc, zasięg 6,500 km', img:'', level:3},
];

AIRCRAFT_CATALOG['McDonnell Douglas'] = [
  {model:'DC-8', seats:179, range:9800, price:40000000, desc:'Długi zasięg, 179 miejsc, zasięg 9,800 km', img:'', level:3},
  {model:'DC-9', seats:90, range:2780, price:28000000, desc:'Krótki zasięg, 90 miejsc, zasięg 2,780 km', img:'', level:2},
  {model:'DC-10', seats:380, range:9600, price:85000000, desc:'Długi zasięg, 380 miejsc, zasięg 9,600 km', img:'', level:5},
  {model:'MD-11', seats:410, range:12600, price:110000000, desc:'Długi zasięg, 410 miejsc, zasięg 12,600 km', img:'', level:6},
  {model:'MD-80', seats:155, range:4635, price:42000000, desc:'Krótki zasięg, 155 miejsc, zasięg 4,635 km', img:'', level:2},
  {model:'MD-90', seats:172, range:3861, price:48000000, desc:'Krótki zasięg, 172 miejsca, zasięg 3,861 km', img:'', level:2},
];

AIRCRAFT_CATALOG['Fokker'] = [
  {model:'Fokker 50', seats:58, range:2200, price:15000000, desc:'Krótki zasięg, 58 miejsc, zasięg 2,200 km', img:'', level:1},
  {model:'Fokker 70', seats:80, range:3410, price:28000000, desc:'Krótki zasięg, 80 miejsc, zasięg 3,410 km', img:'', level:1},
  {model:'Fokker 100', seats:107, range:3170, price:35000000, desc:'Krótki zasięg, 107 miejsc, zasięg 3,170 km', img:'', level:2},
];

AIRCRAFT_CATALOG['British Aerospace'] = [
  {model:'BAe 146-100', seats:82, range:2910, price:22000000, desc:'Krótki zasięg, 82 miejsca, zasięg 2,910 km', img:'', level:1},
  {model:'BAe 146-200', seats:100, range:2650, price:26000000, desc:'Krótki zasięg, 100 miejsc, zasięg 2,650 km', img:'', level:1},
  {model:'BAe 146-300', seats:128, range:2630, price:30000000, desc:'Krótki zasięg, 128 miejsc, zasięg 2,630 km', img:'', level:2},
  {model:'Avro RJ85', seats:112, range:2965, price:28000000, desc:'Krótki zasięg, 112 miejsc, zasięg 2,965 km', img:'', level:1},
];

AIRCRAFT_CATALOG['Antonow'] = [
  {model:'An-24', seats:50, range:2400, price:8000000, desc:'Krótki zasięg, 50 miejsc, zasięg 2,400 km', img:'', level:1},
  {model:'An-148', seats:85, range:4400, price:25000000, desc:'Krótki zasięg, 85 miejsc, zasięg 4,400 km', img:'', level:2},
  {model:'An-158', seats:99, range:3600, price:28000000, desc:'Krótki zasięg, 99 miejsc, zasięg 3,600 km', img:'', level:2},
];

AIRCRAFT_CATALOG['Cessna'] = [
  {model:'Cessna 208', seats:14, range:1982, price:2500000, desc:'Krótki zasięg, 14 miejsc, zasięg 1,982 km', img:'', level:1},
  {model:'Cessna Citation X', seats:12, range:6281, price:23000000, desc:'Średni zasięg, 12 miejsc, zasięg 6,281 km', img:'', level:2},
];

AIRCRAFT_CATALOG['Dassault'] = [
  {model:'Falcon 7X', seats:16, range:11020, price:52000000, desc:'Długi zasięg, 16 miejsc, zasięg 11,020 km', img:'', level:4},
  {model:'Falcon 8X', seats:16, range:11945, price:58000000, desc:'Długi zasięg, 16 miejsc, zasięg 11,945 km', img:'', level:4},
];

AIRCRAFT_CATALOG['Havilland Canada'] = [
  {model:'DHC-6 Twin Otter', seats:19, range:1480, price:6000000, desc:'Krótki zasięg, 19 miejsc, zasięg 1,480 km', img:'', level:1},
  {model:'DHC-8-100', seats:39, range:1889, price:12000000, desc:'Krótki zasięg, 39 miejsc, zasięg 1,889 km', img:'', level:1},
  {model:'DHC-8-400', seats:78, range:2040, price:25000000, desc:'Krótki zasięg, 78 miejsc, zasięg 2,040 km', img:'', level:1},
];
