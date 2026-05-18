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

// Runway requirements (meters)
var AC_RUNWAY = {
  // Short field
  'ATR 42-300':1100,'ATR 42-500':1100,'ATR 42-600':1100,
  'ATR 72-200':1290,'ATR 72-500':1290,'ATR 72-600':1290,
  'DHC-6 Twin Otter':400, 'DHC-8-100':950,'DHC-8-400':1220,
  'Cessna 208':720,
  'ERJ-135':1580,'ERJ-140':1610,'ERJ-145':1700,
  'CRJ-100':1740,'CRJ-200':1740,'CRJ-700':1756,
  // Narrowbody
  '717-200':1800,'Fokker 50':1350,'Fokker 70':1620,'Fokker 100':1840,
  '737-100':1800,'737-200':1830,'737-300':1940,'737-400':2090,
  '737-500':1830,'737-600':1750,'737-700':1750,'737-800':2090,'737-900':2900,
  '737-900ER':2900,'737 MAX 7':1756,'737 MAX 8':1900,'737 MAX 8-200':1950,
  '737 MAX 9':2000,'737 MAX 10':2200,
  'A318':1440,'A319':1850,'A319 Neo':1850,'A320':2100,'A320 Neo':2100,
  'A321':2500,'A321 Neo':2600,
  'BAe 146-100':950,'BAe 146-200':1000,'BAe 146-300':1050,'Avro RJ85':980,
  'E170':1644,'E175':1750,'E190':1960,'E195':2050,
  'E175-E2':1700,'E190-E2':1900,'E195-E2':2200,
  'CS100':1440,'CS300':1524,
  'CRJ-900':1780,'CRJ-1000':1850,
  'Superjet 100':1800,'Superjet 100LR':1800,
  'MC-21-200':1800,'MC-21-300':1800,
  'Tu-134':2400,'Tu-154':2500,'Tu-204':2300,'Tu-214':2300,
  'An-148':1800,'An-158':1800,'An-24':1900,
  'DC-9':2100,'MD-80':2100,'MD-90':2100,
  'Ił-62':3300,
  // Widebody
  'A300':2300,'A310':2300,'A330-200':2770,'A330-300':2770,
  'A340-200':3200,'A340-300':3200,'A340-500':3200,'A340-600':3400,
  'A350-800':2800,'A350-900':3000,'A350-1000':3050,
  'A380-800':3100,
  '707-120':2800,'707-320':3100,'720':2700,
  '747SP':2800,'747-100':3100,'747-200':3100,'747-300':3200,'747-400':3100,'747-8':2900,
  '757-200':2100,'757-300':2600,
  '767-200':1930,'767-200ER':2480,'767-300':2210,'767-300ER':2440,'767-400ER':2580,
  '777-200':3050,'777-200ER':3110,'777-200LR':2800,'777-300':3150,'777-300ER':3050,
  '777-8':3050,'777-9':3100,
  '787-8':2800,'787-9':2800,'787-10':2800,
  'DC-10':3200,'MD-11':3200,'Ił-86':3100,'Ił-96':3500,
  'default':2100
};

// Airport runway lengths (meters) - added to ADB format
var AIRPORT_RUNWAY = {
  // Long runways (3000m+)
  'EGLL':3902,'LFPG':4200,'EDDF':4000,'EHAM':3800,'LEMD':4100,'LIRF':3900,
  'OMDB':4000,'OTBD':4850,'VHHH':3800,'ZBAA':3800,'RJTT':3360,'RKSI':4000,
  'WSSS':4000,'VIDP':4430,'VABB':3660,'KJFK':4423,'KLAX':3685,'KORD':4112,
  'SBGR':3700,'FAOR':4418,'HECA':4000,'OERK':4000,'OEJN':3800,'UKBB':4000,
  // Medium (2500-3000m)
  'EPWA':3690,'EPKK':2550,'EPGD':2800,'EPWR':2504,'EPPO':2500,'EPSC':2500,
  'EPKT':3200,'EPLL':2800,'EPBY':2500,'EPRZ':3400,'EPLU':2520,
  'LHBP':3010,'LKPR':3715,'LYBE':3400,'LTFM':4100,'UUEE':3780,
  'EDDM':4000,'EDDB':3600,'EGKK':3316,'EGCC':3050,'LEBL':3743,
  'LFMN':3000,'LIMC':3920,'LPPT':3805,'EBBR':3638,'EHAM':3800,
  // Short (under 2000m) - regional airports
  'EPMO':1800,'EPRA':2500,'EPCP':3800,
  // Africa & Middle East
  'DTTA':3200,  'DTMB':2900,  'DTTJ':3000,  'DTNH':3600,  'DTTX':2600,  'DTTZ':3000,  'GMME':3400,  'GMMN':4000,  'GMAD':3300,  'GMFF':3200,  'GMTT':3500,  'GMMW':3600,  'GMFO':3200,  'GMMH':3200,  'GMML':3800,  'GMMZ':3200,  'GMTA':3000,  'GMMQ':2800,  'GQNO':3600,  'GQPP':3000,  'GQPA':2800,  'GQPZ':3000,  'GABS':3500,  'DRRN':3600,  'DRZA':3300,  'DRZR':2700,  'FTTJ':2800,  'FTTD':2400,  'FTTS':2400,  'FTTC':2600,  'HSSS':3500,  'HSPN':3000,  'HSNN':2700,  'HSFS':2700,  'HSOB':3000,  'HHAS':3100,  'HHMS':2800,  'HHSB':2800,  'OYSN':3600,  'OYAA':3050,  'OYSY':3000,  'OYMK':3000,  'OYSC':3400,  'OYTZ':3000,  'OOMS':4000,  'OOSA':4000,  'OODQ':4000,  'OOSH':4000,  'OOKB':2743,  'OEDF':4000,  'OEMH':3800,  'OEAB':3600,  'OEHL':3500,  'OEGS':4000,  'OEGN':3200,  'OETB':4000,  'OETF':3800,  'OEYN':3600,  'OMDW':4500,  'OMAA':4100,  'OMSJ':4060,  'OMRK':3005,  'OMFJ':3300,  'OMAL':4100,  'OKBK':3400,  'ORBI':4000,  'ORER':4000,  'ORSU':2900,  'ORNJ':4000,  'ORMM':4000,  'ORBM':3900,  'OSDI':3700,  'OSAP':3500,  'OSLK':2800,  'OSAQ':2500,  'OLBA':3400,  'OJAI':3660,  'OJAQ':3000,  'OJAM':2500,  'LLBG':3900,  'LLIB':3500,  'LLHA':1826,  'HDAM':3300,  'HAAB':3800,  'HADR':3300,  'HABD':3100,  'HAGN':2700,  'HAMK':3400,  'HALL':2200,  'HAAM':2460,  'HCMM':3300,  'HCMH':3400,  'HCMR':2200,  'HCMF':2700,  'HCMK':2800,  'HKJK':4117,  'HKMO':3000,  'HKKI':2580,  'HKEL':4575,  'HKNW':1792,  'HKML':1786,  'HKUK':1350,  'HUEN':3658,  'HJJJ':3600,  'HSSM':1994,  'HSWW':2300,  'FEFF':2600,  'FKKD':2700,  'FKYS':3200,  'FKKR':2800,  'FKKL':2400,  'FKKN':3600,  'DNMM':3900,  'DNAA':3600,  'DNKN':3600,  'DNPO':3100,  'DNEN':3200,  'DNKA':3600,  'DNBE':2438,  'DNAS':3500,  'DBBB':2400,  'DXXX':2990,  'DGAA':3400,  'DGSI':2000,  'DGLE':2500,  'DGTK':2000,  'DIAP':3000,  'DIBK':2500,  'DIKO':2500,  'DISP':2400,  'DIMN':2400,  'GLRB':3050,  'GLMR':1707,  'GFLL':3048,  'GUCY':3300,  'GGOV':2400,  'GBYD':3600,  'GOBD':3900,  'GOSS':3326,  'GOGS':1550,  'GOOK':1700,  'FGSL':2800,  'FGBT':2400,  'FOOL':3100,  'FOGR':2400,  'FOOG':3100,  'FCBB':3200,  'FCPP':2700,  'FZAA':4648,  'FZQA':3660,  'FZNA':3000,  'FZIC':2960,  'HRYR':4200,  'HRYG':1800,  'HBBE':3600,  'HTDA':3600,  'HTKJ':3600,  'HTZA':3200,  'HTMW':2900,  'HTAR':1650,  'FWKI':3600,  'FWCL':2500,  'FQMA':3600,  'FQBR':2546,  'FQNP':2400,  'FQPB':2400,  'FQTT':2600,  'FQVL':2100,  'FLLS':3960,  'FLND':2800,  'FLNZ':3600,  'FLMF':2400,  'FVHA':4725,  'FVFA':2750,  'FVBU':4700,  'FBSK':3500,  'FBMN':2300,  'FBKE':2100,  'FBFT':2900,  'FYWH':4800,  'FYWE':2050,  'FYWB':3050,  'FYLZ':1500,  'FNLU':3702,  'FNHU':3950,  'FNLB':3850,  'FNUA':2400,  'FNSO':3300,  'FMMI':3100,  'FMNS':2100,  'FMNA':2800,  'FMST':2100,  'FMTU':2490,  'FMSD':2200,  'FDSK':3400,  'FXMM':3200,  'FACT':3201,  'FALE':3800,  'FAPE':3065,  'FABM':3400,  'FAKN':3500,  'FAEL':2590,  'FAGG':2660,  'FAPTM':4900,
  'default':2500
};

// Update existing manufacturers with new models
(function(){
  var updates = {
    'Embraer': [
      {model:'ERJ-135', seats:37, range:3241, price:18000000, desc:'Krótki zasięg, 37 miejsc', img:'', level:1},
      {model:'ERJ-140', seats:44, range:2985, price:20000000, desc:'Krótki zasięg, 44 miejsca', img:'', level:1},
      {model:'ERJ-145', seats:50, range:2800, price:22000000, desc:'Krótki zasięg, 50 miejsc', img:'', level:1},
      {model:'E170', seats:72, range:3735, price:35000000, desc:'Krótki zasięg, 72 miejsca', img:'', level:1},
      {model:'E175', seats:80, range:3735, price:42000000, desc:'Krótki zasięg, 80 miejsc', img:'', level:1},
      {model:'E190', seats:100, range:4537, price:52000000, desc:'Krótki zasięg, 100 miejsc', img:'', level:2},
      {model:'E195', seats:124, range:4260, price:58000000, desc:'Krótki zasięg, 124 miejsca', img:'', level:2},
      {model:'E175-E2', seats:80, range:3735, price:55000000, desc:'Krótki zasięg, 80 miejsc', img:'', level:2},
      {model:'E190-E2', seats:106, range:4537, price:68000000, desc:'Krótki zasięg, 106 miejsc', img:'', level:2},
      {model:'E195-E2', seats:146, range:4320, price:75000000, desc:'Krótki zasięg, 146 miejsc', img:'', level:3},
    ],
    'Bombardier': [
      {model:'CRJ-100', seats:50, range:2982, price:20000000, desc:'Krótki zasięg, 50 miejsc', img:'', level:1},
      {model:'CRJ-200', seats:50, range:3148, price:22000000, desc:'Krótki zasięg, 50 miejsc', img:'', level:1},
      {model:'CRJ-700', seats:70, range:3693, price:38000000, desc:'Krótki zasięg, 70 miejsc', img:'', level:1},
      {model:'CRJ-900', seats:90, range:2956, price:45000000, desc:'Krótki zasięg, 90 miejsc', img:'', level:2},
      {model:'CRJ-1000', seats:100, range:3004, price:50000000, desc:'Krótki zasięg, 100 miejsc', img:'', level:2},
      {model:'CS100', seats:110, range:5741, price:79000000, desc:'Średni zasięg, 110 miejsc', img:'', level:2},
      {model:'CS300', seats:130, range:6300, price:91000000, desc:'Średni zasięg, 130 miejsc', img:'', level:2},
      {model:'Dash 8 Q100', seats:37, range:1519, price:12000000, desc:'Turbośmigłowy, 37 miejsc', img:'', level:1},
      {model:'Dash 8 Q200', seats:37, range:1713, price:13000000, desc:'Turbośmigłowy, 37 miejsc', img:'', level:1},
      {model:'Dash 8 Q300', seats:50, range:1558, price:16000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'Dash 8 Q400', seats:90, range:2522, price:32000000, desc:'Turbośmigłowy, 90 miejsc', img:'', level:1},
    ],
    'ATR': [
      {model:'ATR 42-300', seats:50, range:1326, price:12000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'ATR 42-400', seats:50, range:1500, price:13000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'ATR 42-500', seats:50, range:1326, price:14000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'ATR 42-600', seats:50, range:1326, price:16000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'ATR 72-200', seats:74, range:1528, price:18000000, desc:'Turbośmigłowy, 74 miejsca', img:'', level:1},
      {model:'ATR 72-500', seats:74, range:1528, price:20000000, desc:'Turbośmigłowy, 74 miejsca', img:'', level:1},
      {model:'ATR 72-600', seats:78, range:1528, price:22000000, desc:'Turbośmigłowy, 78 miejsc', img:'', level:1},
    ],
    'Suchoj': [
      {model:'Superjet 100', seats:98, range:4578, price:36000000, desc:'Krótki zasięg, 98 miejsc', img:'', level:2},
      {model:'Superjet 100LR', seats:98, range:4578, price:38000000, desc:'Długi zasięg, 98 miejsc', img:'', level:2},
      {model:'Superjet New', seats:103, range:4600, price:42000000, desc:'Nowa generacja, 103 miejsca', img:'', level:3},
    ],
    'Irkut': [
      {model:'MC-21-200', seats:132, range:6400, price:75000000, desc:'Krótki zasięg, 132 miejsca', img:'', level:3},
      {model:'MC-21-300', seats:163, range:6000, price:85000000, desc:'Krótki zasięg, 163 miejsca', img:'', level:3},
      {model:'MC-21-310', seats:163, range:5500, price:87000000, desc:'Rosyjskie silniki, 163 miejsca', img:'', level:3},
      {model:'MC-21-400', seats:212, range:5000, price:110000000, desc:'Powiększony, 212 miejsc', img:'', level:4},
    ],
    'Iliuszyn': [
      {model:'Ił-14', seats:32, range:1250, price:5000000, desc:'Klasyk, 32 miejsca', img:'', level:1},
      {model:'Ił-18', seats:120, range:6500, price:15000000, desc:'Turbośmigłowy, 120 miejsc', img:'', level:2},
      {model:'Ił-62', seats:186, range:10000, price:45000000, desc:'Długi zasięg, 186 miejsc', img:'', level:3},
      {model:'Ił-86', seats:350, range:3600, price:60000000, desc:'Szerokie ciało, 350 miejsc', img:'', level:4},
      {model:'Ił-96-300', seats:300, range:11500, price:78000000, desc:'Długi zasięg, 300 miejsc', img:'', level:5},
      {model:'Ił-96-400M', seats:400, range:10000, price:95000000, desc:'Powiększony, 400 miejsc', img:'', level:6},
      {model:'Ił-114-300', seats:68, range:1500, price:22000000, desc:'Turbośmigłowy, 68 miejsc', img:'', level:2},
    ],
    'Tupolew': [
      {model:'Tu-104', seats:100, range:2750, price:8000000, desc:'Pionier odrzutowców, 100 miejsc', img:'', level:1},
      {model:'Tu-114', seats:220, range:8950, price:18000000, desc:'Turbośmigłowy dalekodystansowy', img:'', level:3},
      {model:'Tu-124', seats:56, range:2100, price:7000000, desc:'Krótki zasięg, 56 miejsc', img:'', level:1},
      {model:'Tu-134', seats:84, range:3020, price:22000000, desc:'Krótki zasięg, 84 miejsca', img:'', level:2},
      {model:'Tu-144', seats:140, range:6500, price:85000000, desc:'Naddźwiękowy, 140 miejsc', img:'', level:5},
      {model:'Tu-154', seats:180, range:6600, price:35000000, desc:'Średni zasięg, 180 miejsc', img:'', level:3},
      {model:'Tu-204', seats:210, range:6500, price:45000000, desc:'Nowoczesny, 210 miejsc', img:'', level:3},
      {model:'Tu-214', seats:210, range:6500, price:48000000, desc:'Zmodernizowany, 210 miejsc', img:'', level:3},
      {model:'Tu-334', seats:102, range:3500, price:32000000, desc:'Krótki zasięg, 102 miejsca', img:'', level:2},
    ],
    'McDonnell Douglas': [
      {model:'DC-8', seats:179, range:9800, price:40000000, desc:'Klasyk długodystansowy, 179 miejsc', img:'', level:3},
      {model:'DC-9', seats:90, range:2780, price:28000000, desc:'Krótki zasięg, 90 miejsc', img:'', level:2},
      {model:'DC-10', seats:380, range:9600, price:85000000, desc:'Szerokokadłubowy, 380 miejsc', img:'', level:5},
      {model:'MD-11', seats:410, range:12600, price:110000000, desc:'Dalekodystansowy, 410 miejsc', img:'', level:6},
      {model:'MD-80', seats:155, range:4635, price:42000000, desc:'Krótki zasięg, 155 miejsc', img:'', level:2},
      {model:'MD-81', seats:155, range:4635, price:42000000, desc:'Wersja MD-81, 155 miejsc', img:'', level:2},
      {model:'MD-82', seats:155, range:4800, price:44000000, desc:'Ulepszone silniki, 155 miejsc', img:'', level:2},
      {model:'MD-83', seats:155, range:5186, price:47000000, desc:'Długi zasięg, 155 miejsc', img:'', level:3},
      {model:'MD-87', seats:130, range:6500, price:45000000, desc:'Skrócony MD-80, 130 miejsc', img:'', level:3},
      {model:'MD-88', seats:155, range:4635, price:46000000, desc:'Zmodernizowany, 155 miejsc', img:'', level:2},
      {model:'MD-90', seats:172, range:3861, price:48000000, desc:'Nowoczesne silniki, 172 miejsca', img:'', level:2},
    ],
    'Fokker': [
      {model:'Fokker F27 Friendship', seats:52, range:1741, price:10000000, desc:'Turbośmigłowy, 52 miejsca', img:'', level:1},
      {model:'Fokker F28 Fellowship', seats:85, range:1900, price:18000000, desc:'Krótki zasięg, 85 miejsc', img:'', level:1},
      {model:'Fokker 50', seats:58, range:2200, price:15000000, desc:'Turbośmigłowy, 58 miejsc', img:'', level:1},
      {model:'Fokker 70', seats:80, range:3410, price:28000000, desc:'Krótki zasięg, 80 miejsc', img:'', level:1},
      {model:'Fokker 100', seats:107, range:3170, price:35000000, desc:'Krótki zasięg, 107 miejsc', img:'', level:2},
    ],
    'British Aerospace': [
      {model:'BAe 146-100', seats:82, range:2910, price:22000000, desc:'Krótki zasięg, 82 miejsca', img:'', level:1},
      {model:'BAe 146-200', seats:100, range:2650, price:26000000, desc:'Krótki zasięg, 100 miejsc', img:'', level:1},
      {model:'BAe 146-300', seats:128, range:2630, price:30000000, desc:'Powiększony, 128 miejsc', img:'', level:2},
      {model:'Avro RJ70', seats:70, range:2965, price:20000000, desc:'Krótki zasięg, 70 miejsc', img:'', level:1},
      {model:'Avro RJ85', seats:112, range:2965, price:28000000, desc:'Krótki zasięg, 112 miejsc', img:'', level:1},
      {model:'Avro RJ100', seats:128, range:2965, price:32000000, desc:'Powiększony, 128 miejsc', img:'', level:2},
      {model:'BAe ATP', seats:68, range:2000, price:16000000, desc:'Turbośmigłowy, 68 miejsc', img:'', level:1},
      {model:'BAe Jetstream 31', seats:19, range:1260, price:5000000, desc:'Turbośmigłowy, 19 miejsc', img:'', level:1},
      {model:'BAe Jetstream 41', seats:29, range:1433, price:7000000, desc:'Turbośmigłowy, 29 miejsc', img:'', level:1},
      {model:'BAe 748', seats:52, range:2700, price:9000000, desc:'Turbośmigłowy, 52 miejsca', img:'', level:1},
      {model:'Concorde', seats:100, range:7250, price:350000000, desc:'Naddźwiękowy, 100 miejsc, Mach 2', img:'', level:10},
    ],
    'Antonow': [
      {model:'An-24', seats:50, range:2400, price:8000000, desc:'Turbośmigłowy, 50 miejsc', img:'', level:1},
      {model:'An-26B-100', seats:40, range:2550, price:9000000, desc:'Turbośmigłowy, 40 miejsc', img:'', level:1},
      {model:'An-28', seats:17, range:1365, price:4000000, desc:'Turbośmigłowy, 17 miejsc', img:'', level:1},
      {model:'An-38', seats:27, range:1300, price:6000000, desc:'Turbośmigłowy, 27 miejsc', img:'', level:1},
      {model:'An-74TK', seats:52, range:3200, price:20000000, desc:'Polarny, 52 miejsca', img:'', level:2},
      {model:'An-140', seats:52, range:2685, price:18000000, desc:'Turbośmigłowy, 52 miejsca', img:'', level:2},
      {model:'An-148', seats:85, range:4400, price:25000000, desc:'Regionalny odrzutowiec, 85 miejsc', img:'', level:2},
      {model:'An-158', seats:99, range:3600, price:28000000, desc:'Powiększony, 99 miejsc', img:'', level:2},
    ],
    'Cessna': [
      {model:'Cessna 172 Skyhawk', seats:4, range:1289, price:350000, desc:'Lekki samolot, 4 miejsca', img:'', level:1},
      {model:'Cessna 182 Skylane', seats:4, range:1530, price:450000, desc:'Lekki, 4 miejsca', img:'', level:1},
      {model:'Cessna 206 Stationair', seats:6, range:1480, price:600000, desc:'Lekki, 6 miejsc', img:'', level:1},
      {model:'Cessna 208 Caravan', seats:14, range:1982, price:2500000, desc:'Turbośmigłowy, 14 miejsc', img:'', level:1},
      {model:'Cessna 208 Grand Caravan', seats:14, range:2073, price:2800000, desc:'Powiększony, 14 miejsc', img:'', level:1},
      {model:'Cessna 402', seats:10, range:2175, price:1200000, desc:'Lekki transport, 10 miejsc', img:'', level:1},
      {model:'Cessna 404 Titan', seats:10, range:2037, price:1400000, desc:'Transport, 10 miejsc', img:'', level:1},
      {model:'Cessna 414 Chancellor', seats:8, range:1963, price:1600000, desc:'Biznesowy, 8 miejsc', img:'', level:1},
      {model:'Cessna 421 Golden Eagle', seats:8, range:2093, price:1800000, desc:'Komfortowy, 8 miejsc', img:'', level:1},
      {model:'Cessna 441 Conquest II', seats:9, range:3410, price:2200000, desc:'Turbośmigłowy, 9 miejsc', img:'', level:1},
      {model:'Cessna Citation Mustang', seats:6, range:2130, price:4200000, desc:'Mały odrzutowiec, 6 miejsc', img:'', level:1},
      {model:'Cessna Citation CJ1', seats:6, range:2408, price:5500000, desc:'Odrzutowiec, 6 miejsc', img:'', level:1},
      {model:'Cessna Citation CJ2', seats:8, range:3222, price:7000000, desc:'Odrzutowiec, 8 miejsc', img:'', level:1},
      {model:'Cessna Citation CJ3', seats:8, range:3730, price:8500000, desc:'Odrzutowiec, 8 miejsc', img:'', level:2},
      {model:'Cessna Citation CJ4', seats:10, range:3379, price:10000000, desc:'Odrzutowiec, 10 miejsc', img:'', level:2},
      {model:'Cessna Citation XLS+', seats:12, range:3900, price:14000000, desc:'Średni odrzutowiec, 12 miejsc', img:'', level:2},
      {model:'Cessna Citation Sovereign+', seats:12, range:5740, price:18000000, desc:'Super średni, 12 miejsc', img:'', level:3},
      {model:'Cessna Citation Latitude', seats:9, range:4630, price:17000000, desc:'Nowoczesny, 9 miejsc', img:'', level:2},
      {model:'Cessna Citation Longitude', seats:12, range:6482, price:26000000, desc:'Duży odrzutowiec, 12 miejsc', img:'', level:3},
      {model:'Cessna Citation Ascend', seats:8, range:3400, price:15000000, desc:'Nowa generacja, 8 miejsc', img:'', level:2},
      {model:'Cessna Citation X', seats:12, range:6281, price:23000000, desc:'Najszybszy biznesowy, 12 miejsc', img:'', level:3},
    ],
    'Dassault': [
      {model:'Falcon 10', seats:8, range:3000, price:8000000, desc:'Mały odrzutowiec, 8 miejsc', img:'', level:1},
      {model:'Falcon 20', seats:12, range:3500, price:10000000, desc:'Biznesowy, 12 miejsc', img:'', level:1},
      {model:'Falcon 30', seats:30, range:2800, price:15000000, desc:'Regionalny, 30 miejsc', img:'', level:2},
      {model:'Falcon 50', seats:9, range:5695, price:18000000, desc:'Trzej silnikowy, 9 miejsc', img:'', level:2},
      {model:'Falcon 900', seats:19, range:7400, price:35000000, desc:'Duży zasięg, 19 miejsc', img:'', level:3},
      {model:'Falcon 900LX', seats:19, range:8800, price:48000000, desc:'Bardzo duży zasięg, 19 miejsc', img:'', level:4},
      {model:'Falcon 2000', seats:19, range:5560, price:36000000, desc:'Szeroki, 19 miejsc', img:'', level:3},
      {model:'Falcon 2000LXS', seats:19, range:8390, price:52000000, desc:'Duży zasięg, 19 miejsc', img:'', level:4},
      {model:'Falcon 7X', seats:16, range:11020, price:52000000, desc:'Dalekodystansowy, 16 miejsc', img:'', level:4},
      {model:'Falcon 8X', seats:16, range:11945, price:58000000, desc:'Najdalszy zasięg, 16 miejsc', img:'', level:4},
      {model:'Falcon 6X', seats:16, range:10186, price:54000000, desc:'Nowy szeroki, 16 miejsc', img:'', level:4},
      {model:'Falcon 10X', seats:19, range:13890, price:120000000, desc:'Flagowiec, 19 miejsc', img:'', level:5},
      {model:'Mercure', seats:150, range:1320, price:40000000, desc:'Krótki zasięg, 150 miejsc', img:'', level:3},
    ],
    'Havilland Canada': [
      {model:'DHC-2 Beaver', seats:7, range:1252, price:800000, desc:'Klasyk, 7 miejsc', img:'', level:1},
      {model:'DHC-3 Otter', seats:11, range:1519, price:1500000, desc:'Turbośmigłowy, 11 miejsc', img:'', level:1},
      {model:'DHC-6 Twin Otter', seats:19, range:1480, price:6000000, desc:'Turbośmigłowy, 19 miejsc', img:'', level:1},
      {model:'DHC-7 Dash 7', seats:50, range:1300, price:14000000, desc:'STOL, 50 miejsc', img:'', level:1},
      {model:'DHC-8-100', seats:39, range:1889, price:12000000, desc:'Turbośmigłowy, 39 miejsc', img:'', level:1},
      {model:'DHC-8-200', seats:39, range:1713, price:13000000, desc:'Ulepszone silniki, 39 miejsc', img:'', level:1},
      {model:'DHC-8-300', seats:50, range:1558, price:16000000, desc:'Powiększony, 50 miejsc', img:'', level:1},
      {model:'DHC-8-400', seats:78, range:2040, price:25000000, desc:'Największy, 78 miejsc', img:'', level:1},
    ],
  };

  Object.keys(updates).forEach(function(brand) {
    if(!AIRCRAFT_CATALOG[brand]) AIRCRAFT_CATALOG[brand] = [];
    updates[brand].forEach(function(newAc) {
      // Only add if not already exists
      if(!AIRCRAFT_CATALOG[brand].some(function(a){ return a.model === newAc.model; })) {
        AIRCRAFT_CATALOG[brand].push(newAc);
      }
    });
  });
})();

// Additional speeds for new models
Object.assign(AC_SPEEDS, {
  'ERJ-135':850,'ERJ-140':850,'ERJ-145':850,
  'E170':870,'E175':870,'E190':870,'E195':870,
  'E175-E2':870,'E190-E2':870,'E195-E2':870,
  'CRJ-100':820,'CRJ-200':820,'CRJ-700':830,'CRJ-900':830,'CRJ-1000':830,
  'CS100':871,'CS300':871,
  'Dash 8 Q100':452,'Dash 8 Q200':452,'Dash 8 Q300':452,'Dash 8 Q400':556,
  'ATR 42-300':510,'ATR 42-400':510,'ATR 42-500':510,'ATR 42-600':510,
  'ATR 72-200':526,'ATR 72-500':526,'ATR 72-600':510,
  'Superjet New':870,'MC-21-200':870,'MC-21-300':870,'MC-21-310':870,'MC-21-400':870,
  'Ił-14':320,'Ił-18':650,'Ił-62':900,'Ił-86':950,'Ił-96-300':870,'Ił-96-400M':870,'Ił-114-300':500,
  'Tu-104':950,'Tu-114':770,'Tu-124':970,'Tu-144':2120,'Tu-334':820,
  'DC-8':965,'DC-9':917,'DC-10':908,'MD-11':908,
  'MD-80':925,'MD-81':925,'MD-82':925,'MD-83':925,'MD-87':925,'MD-88':925,
  'Fokker F27 Friendship':480,'Fokker F28 Fellowship':843,
  'Avro RJ70':750,'Avro RJ100':750,
  'BAe ATP':450,'BAe Jetstream 31':482,'BAe Jetstream 41':532,'BAe 748':452,
  'Concorde':2179,
  'An-26B-100':450,'An-28':350,'An-38':430,'An-74TK':600,'An-140':540,
  'Cessna 172 Skyhawk':226,'Cessna 182 Skylane':234,'Cessna 206 Stationair':278,
  'Cessna 208 Caravan':343,'Cessna 208 Grand Caravan':343,
  'Cessna 402':354,'Cessna 404 Titan':360,'Cessna 414 Chancellor':370,'Cessna 421 Golden Eagle':396,
  'Cessna 441 Conquest II':480,'Cessna Citation Mustang':630,'Cessna Citation CJ1':743,
  'Cessna Citation CJ2':760,'Cessna Citation CJ3':778,'Cessna Citation CJ4':778,
  'Cessna Citation XLS+':822,'Cessna Citation Sovereign+':848,'Cessna Citation Latitude':834,
  'Cessna Citation Longitude':870,'Cessna Citation Ascend':830,
  'Falcon 10':912,'Falcon 20':870,'Falcon 30':750,'Falcon 50':880,
  'Falcon 900':900,'Falcon 900LX':900,'Falcon 2000':900,'Falcon 2000LXS':900,
  'Falcon 6X':956,'Falcon 10X':950,'Mercure':920,
  'DHC-2 Beaver':208,'DHC-3 Otter':243,'DHC-7 Dash 7':428,
  'DHC-8-100':450,'DHC-8-200':450,'DHC-8-300':452,'DHC-8-400':556,
});

// ============================================================
// PRICE UPDATE & NEW MODELS — self-executing function
// ============================================================
(function(){

  // ----------------------------------------------------------
  // 1. Price list (in-game currency)
  // ----------------------------------------------------------
  var PRICES = {
    // Airbus
    'A220-100':5322240,'A220-300':6773760,'A220-500':8225280,
    'A318':5177088,'A319':6483456,'A319 Neo':6773760,
    'A320':13685760,'A320 Neo':13685760,
    'A321':14141952,'A321 Neo':18247680,
    'A321LR':18247680,'A321XLR':18247680,
    'A310':57576960,
    'A330-200':57694464,'A330-300':70502400,
    'A340-200':61337088,'A340-300':69327360,'A340-500':73557504,'A340-600':83662848,
    'A350-900':74027520,'A350-1000':86012928,
    'A380-800':123379200,
    // Boeing
    '717-200':2867928,
    '727-100':10933632,'727-200':14309376,
    '737-100':8493120,'737-200':10137600,'737-300':11329920,'737-400':13478400,
    '737-500':10228992,'737-600':10228992,'737-700':11329920,'737-800':14378112,'737-900':16022592,
    '737 MAX 7':13112640,'737 MAX 8':16022592,'737 MAX 9':17483520,'737 MAX 10':18944448,
    '747-100':84341760,'747-200':106444800,'747-300':110592000,'747-400':95869440,'747-8':107550720,
    '757-200':18156288,'757-300':22173696,
    '767-200':51617280,'767-300':62208000,'767-400ER':70041600,
    '777-200':71884800,'777-300':84756480,'777-8':88442880,'777-9':100416000,
    '787-8':29184000,'787-9':67276800,'787-10':76032000,
    // Embraer
    'ERJ-135':383232,'ERJ-140':439797,'ERJ-145':567146,
    'E170':3475712,'E175':3875712,'E190':5160960,'E195':5684224,
    'E175-E2':4068000,'E190-E2':5160960,'E195-E2':6707200,
    // Bombardier
    'CRJ-100':332394,'CRJ-200':358610,
    'CRJ-700':1732998,'CRJ-900':2212672,'CRJ-1000':2578956,
    'Dash 8 Q100':287000,'Dash 8 Q200':304500,'Dash 8 Q300':430500,'Dash 8 Q400':1848000,
    'CS100':3725568,'CS300':4741632,
    // ATR
    'ATR 42-300':171500,'ATR 42-400':189000,'ATR 42-500':220500,'ATR 42-600':232675,
    'ATR 72-200':1058400,'ATR 72-500':1213098,'ATR 72-600':1293600,
    // Suchoj
    'Superjet New':1625000,
    // Irkut
    'MC-21-200':3650000,'MC-21-300':4500000,'MC-21-310':4250000,'MC-21-400':5400000,
    // Iliuszyn
    'Ił-14':720000,'Ił-18':1850000,'Ił-62':4210000,
    'Ił-86':18500000,'Ił-96-300':42600000,'Ił-96-400M':53100000,
    'Ił-114-300':1680000,
    // Tupolew
    'Tu-104':1450000,'Tu-114':6210000,'Tu-124':1120000,'Tu-134':1850000,
    'Tu-144':18500000,
    'Tu-204':13800000,'Tu-214':14500000,'Tu-334':2450000,
    // McDonnell Douglas
    'DC-9':1850000,'DC-10':42600000,'MD-11':58700000,
    'MD-81':11400000,'MD-82':12100000,'MD-83':12500000,'MD-87':9800000,'MD-88':13200000,
    'MD-90':14500000,
    // Fokker
    'Fokker F27 Friendship':560000,'Fokker F28 Fellowship':925000,
    'Fokker 50':625000,'Fokker 70':1225000,'Fokker 100':1740000,
    // British Aerospace
    'BAe Jetstream 31':190000,'BAe Jetstream 41':310000,'BAe ATP':780000,
    'BAe 146-100':1120000,'BAe 146-200':1350000,'BAe 146-300':1580000,
    'Avro RJ70':1150000,'Avro RJ85':1380000,'Avro RJ100':1620000,
    // Antonow
    'An-24':510000,'An-26B-100':580000,
    'An-28':180000,'An-38':240000,'An-74TK':720000,'An-140':640000,
    'An-148':1350000,'An-158':1580000,
    // Dassault
    'Falcon 10':160000,'Falcon 20':280000,'Falcon 30':350000,'Falcon 50':420000,
    'Falcon 900':1250000,'Falcon 2000':980000,
    'Falcon 6X':2100000,'Falcon 7X':2450000,'Falcon 8X':2680000,'Falcon 10X':3150000,
    'Mercure':4950000,
    // Havilland Canada
    'DHC-2 Beaver':245000,
    'DHC-3 Otter':345000,
    'DHC-6 Twin Otter':710000,
    'DHC-7 Dash 7':1730000,
    'DHC-8-100':2210000,'DHC-8-200':2350000,'DHC-8-300':2570000,'DHC-8-400':3640000,
  };

  // ----------------------------------------------------------
  // 2. Models that must be locked (not in price list)
  // ----------------------------------------------------------
  var LOCKED_MODELS = [
    // Airbus
    'A350-800','A300','A310',
    // Boeing
    '737-900ER','737 MAX 8-200','707-120','707-320','720','747SP',
    '767-200ER','767-300ER','777-200ER','777-200LR','777-300ER',
    // Suchoj
    'Superjet 100LR',
    // Iliuszyn
    'Ił-76',
    // Tupolew
    'Tu-154',
    // McDonnell Douglas
    'DC-8','MD-80',
    // British Aerospace
    'BAe 748','Concorde',
    // Dassault
    'Falcon 900LX','Falcon 2000LXS',
  ];

  // ----------------------------------------------------------
  // 3. Update prices and lock existing models
  // ----------------------------------------------------------
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand) {
    AIRCRAFT_CATALOG[brand].forEach(function(ac) {
      if(PRICES.hasOwnProperty(ac.model)) {
        ac.price = PRICES[ac.model];
        ac.locked = false;
      } else if(LOCKED_MODELS.indexOf(ac.model) >= 0) {
        ac.locked = true;
      }
    });
  });

  // ----------------------------------------------------------
  // 4. New models to add
  // ----------------------------------------------------------
  var NEW_MODELS = {
    'Airbus': [
      {model:'A320-100', seats:150, range:4800, price:11404800, img:'', level:2, desc:'Wczesna wersja A320, 150 miejsc, zasięg 4,800 km'},
      {model:'A321-200', seats:220, range:5600, price:16727040, img:'', level:3, desc:'Powiększona wersja A321, 220 miejsc, zasięg 5,600 km'},
      {model:'A321LR', seats:206, range:7400, price:18247680, img:'', level:4, desc:'Długi zasięg, 206 miejsc, zasięg 7,400 km'},
      {model:'A321XLR', seats:200, range:8700, price:18247680, img:'', level:4, desc:'Bardzo długi zasięg, 200 miejsc, zasięg 8,700 km'},
      {model:'A300B1', seats:250, range:4500, price:58752000, img:'', level:5, desc:'Wczesna wersja A300, 250 miejsc, zasięg 4,500 km'},
      {model:'A300B2', seats:281, range:5000, price:58752000, img:'', level:5, desc:'A300B2, 281 miejsc, zasięg 5,000 km'},
      {model:'A300B4', seats:295, range:6300, price:58752000, img:'', level:5, desc:'A300B4, 295 miejsc, zasięg 6,300 km'},
      {model:'A300-600', seats:300, range:7500, price:62512128, img:'', level:5, desc:'A300-600, 300 miejsc, zasięg 7,500 km'},
      {model:'A310-300', seats:280, range:10560, price:65802240, img:'', level:5, desc:'A310-300, 280 miejsc, zasięg 10,560 km'},
      {model:'A330-800', seats:406, range:15100, price:60397056, img:'', level:7, desc:'Daleki zasięg, 406 miejsc, zasięg 15,100 km'},
      {model:'A330-900', seats:460, range:12130, price:70502400, img:'', level:7, desc:'Długi kadłub, 460 miejsc, zasięg 12,130 km'},
    ],
    'Boeing': [
      // Boeing has no new models to add that aren't locked
    ],
    'Bombardier': [
      {model:'Challenger 800', seats:50, range:3020, price:241500, img:'', level:1, desc:'Mały odrzutowiec regionalny, 50 miejsc, zasięg 3,020 km'},
      {model:'CRJ-440', seats:44, range:2200, price:381500, img:'', level:1, desc:'CRJ-440, 44 miejsca, zasięg 2,200 km'},
      {model:'CRJ-705', seats:75, range:3050, price:1897000, img:'', level:1, desc:'CRJ-705, 75 miejsc, zasięg 3,050 km'},
    ],
    'ATR': [
      {model:'ATR 72-210', seats:70, range:1430, price:1106000, img:'', level:1, desc:'ATR 72-210, 70 miejsc, zasięg 1,430 km'},
    ],
    'Suchoj': [
      {model:'Superjet 100-75', seats:75, range:4578, price:1225000, img:'', level:2, desc:'Skrócona wersja, 75 miejsc, zasięg 4,578 km'},
      {model:'Superjet 100-95', seats:98, range:4578, price:1560000, img:'', level:2, desc:'Standardowa wersja, 98 miejsc, zasięg 4,578 km'},
    ],
    'Iliuszyn': [
      {model:'Ił-12', seats:27, range:2000, price:580000, img:'', level:1, desc:'Klasyczny turbośmigłowy, 27 miejsc, zasięg 2,000 km'},
      {model:'Ił-62M', seats:186, range:11050, price:4680000, img:'', level:4, desc:'Zmodernizowany Ił-62, 186 miejsc, zasięg 11,050 km'},
      {model:'Ił-114', seats:64, range:1200, price:1450000, img:'', level:2, desc:'Turbośmigłowy regionalny, 64 miejsca, zasięg 1,200 km'},
    ],
    'Tupolew': [
      {model:'Tu-154B', seats:180, range:5600, price:4520000, img:'', level:3, desc:'Tu-154B, 180 miejsc, zasięg 5,600 km'},
      {model:'Tu-154M', seats:180, range:6600, price:4980000, img:'', level:3, desc:'Zmodernizowany Tu-154, 180 miejsc, zasięg 6,600 km'},
    ],
    'McDonnell Douglas': [
      {model:'DC-9-30', seats:115, range:2670, price:2450000, img:'', level:2, desc:'DC-9-30, 115 miejsc, zasięg 2,670 km'},
      {model:'DC-9-50', seats:139, range:3030, price:3120000, img:'', level:2, desc:'DC-9-50, 139 miejsc, zasięg 3,030 km'},
      {model:'DC-10-30', seats:380, range:10950, price:45800000, img:'', level:5, desc:'DC-10-30 daleki zasięg, 380 miejsc, zasięg 10,950 km'},
    ],
    'Fokker': [
      {model:'Fokker F7', seats:8, range:1200, price:60000, img:'', level:1, desc:'Fokker F.VII, 8 miejsc, zasięg 1,200 km'},
      {model:'Fokker F22', seats:22, range:2600, price:175000, img:'', level:1, desc:'Fokker F.XXII, 22 miejsca, zasięg 2,600 km'},
      {model:'Fokker F36', seats:36, range:2900, price:240000, img:'', level:1, desc:'Fokker F.XXXVI, 36 miejsc, zasięg 2,900 km'},
      {model:'Fokker 60', seats:68, range:2650, price:710000, img:'', level:1, desc:'Fokker 60, 68 miejsc, zasięg 2,650 km'},
    ],
    'Antonow': [
      {model:'An-2', seats:12, range:845, price:65000, img:'', level:1, desc:'Klasyczny dwupłatowiec, 12 miejsc, zasięg 845 km'},
      {model:'An-10', seats:100, range:4075, price:1120000, img:'', level:2, desc:'An-10, 100 miejsc, zasięg 4,075 km'},
      {model:'An-174', seats:68, range:5400, price:1420000, img:'', level:2, desc:'An-174, 68 miejsc, zasięg 5,400 km'},
      {model:'An-180', seats:180, range:5000, price:3150000, img:'', level:3, desc:'An-180, 180 miejsc, zasięg 5,000 km'},
      {model:'An-218', seats:350, range:10000, price:38500000, img:'', level:6, desc:'An-218, 350 miejsc, zasięg 10,000 km'},
    ],
    'Dassault': [
      {model:'Falcon 5X', seats:16, range:9630, price:1850000, img:'', level:4, desc:'Falcon 5X, 16 miejsc, zasięg 9,630 km'},
    ],
    'Havilland Canada': [
      {model:'DHC-1 Chipmunk', seats:2, range:460, price:65000, img:'', level:1, desc:'Klasyczny samolot szkolny, 2 miejsca, zasięg 460 km'},
      {model:'DHC-2T Turbo Beaver', seats:7, range:1380, price:280000, img:'', level:1, desc:'Turbo Beaver, 7 miejsc, zasięg 1,380 km'},
      {model:'DHC-3T Turbo Otter', seats:11, range:1765, price:410000, img:'', level:1, desc:'Turbo Otter, 11 miejsc, zasięg 1,765 km'},
      {model:'DHC-6 Twin Otter 200', seats:19, range:1705, price:780000, img:'', level:1, desc:'Twin Otter 200, 19 miejsc, zasięg 1,705 km'},
      {model:'DHC-6 Twin Otter 300', seats:19, range:1297, price:890000, img:'', level:1, desc:'Twin Otter 300, 19 miejsc, zasięg 1,297 km'},
      {model:'DHC-6 Twin Otter 400', seats:19, range:1480, price:1120000, img:'', level:1, desc:'Twin Otter 400, 19 miejsc, zasięg 1,480 km'},
      {model:'DHC-6 Twin Otter 300-G', seats:19, range:1480, price:1250000, img:'', level:1, desc:'Twin Otter 300-G, 19 miejsc, zasięg 1,480 km'},
      {model:'DHC-7 Dash 7-150', seats:54, range:1300, price:1890000, img:'', level:1, desc:'Dash 7-150, 54 miejsca, zasięg 1,300 km'},
    ],
  };

  Object.keys(NEW_MODELS).forEach(function(brand) {
    if(!AIRCRAFT_CATALOG[brand]) AIRCRAFT_CATALOG[brand] = [];
    NEW_MODELS[brand].forEach(function(newAc) {
      if(!AIRCRAFT_CATALOG[brand].some(function(a){ return a.model === newAc.model; })) {
        AIRCRAFT_CATALOG[brand].push(newAc);
      }
    });
  });

  // ----------------------------------------------------------
  // 5. Fix: map 'Superjet 100' price to Superjet 100-95 price,
  //    and mark Superjet 100 with its price too
  // ----------------------------------------------------------
  (AIRCRAFT_CATALOG['Suchoj']||[]).forEach(function(ac){
    if(ac.model === 'Superjet 100') {
      ac.price = 1560000;
      ac.locked = false;
    }
  });

  // ----------------------------------------------------------
  // 6. COMAC — new manufacturer
  // ----------------------------------------------------------
  if(!AIRCRAFT_CATALOG['COMAC']) {
    AIRCRAFT_CATALOG['COMAC'] = [
      {model:'ARJ21-700', seats:90, range:2225, price:3150000, img:'', level:2, desc:'Regionalny odrzutowiec, 90 miejsc, zasięg 2,225 km'},
      {model:'ARJ21-900', seats:105, range:2225, price:3640000, img:'', level:2, desc:'Powiększony ARJ21, 105 miejsc, zasięg 2,225 km'},
      {model:'ARJ21-700CBJ', seats:50, range:4000, price:3800000, img:'', level:2, desc:'Business Jet, 50 miejsc, zasięg 4,000 km'},
      {model:'C919', seats:168, range:5555, price:16174080, img:'', level:3, desc:'Wąskokadłubowy, 168 miejsc, zasięg 5,555 km'},
      {model:'C929-500', seats:280, range:12000, price:49738752, img:'', level:7, desc:'Szerokokadłubowy, 280 miejsc, zasięg 12,000 km'},
      {model:'C929-600', seats:320, range:12000, price:58060800, img:'', level:7, desc:'Podstawowy C929, 320 miejsc, zasięg 12,000 km'},
      {model:'C929-700', seats:360, range:12000, price:70502400, img:'', level:8, desc:'Powiększony C929, 360 miejsc, zasięg 12,000 km'},
      {model:'C939', seats:500, range:13000, price:101606400, img:'', level:9, desc:'Bardzo duży, 500 miejsc, zasięg 13,000 km'},
    ];
  }

  // ----------------------------------------------------------
  // 7. Additional speeds for new models
  // ----------------------------------------------------------
  Object.assign(AC_SPEEDS, {
    // Airbus new
    'A320-100':840,'A321-200':840,'A321LR':840,'A321XLR':840,
    'A300B1':875,'A300B2':875,'A300B4':875,'A300-600':875,
    'A310-300':875,
    'A330-800':871,'A330-900':871,
    // Bombardier new
    'Challenger 800':820,'CRJ-440':820,'CRJ-705':830,
    // ATR new
    'ATR 72-210':526,
    // Suchoj new
    'Superjet 100-75':870,'Superjet 100-95':870,
    // Iliuszyn new
    'Ił-12':350,'Ił-62M':900,'Ił-114':500,
    // Tupolew new
    'Tu-154B':900,'Tu-154M':900,
    // McDonnell Douglas new
    'DC-9-30':917,'DC-9-50':917,'DC-10-30':908,
    // Fokker new
    'Fokker F7':185,'Fokker F22':245,'Fokker F36':265,'Fokker 60':843,
    // Antonow new
    'An-2':185,'An-10':550,'An-174':820,'An-180':870,'An-218':870,
    // Dassault new
    'Falcon 5X':956,
    // Havilland Canada new
    'DHC-1 Chipmunk':222,'DHC-2T Turbo Beaver':220,'DHC-3T Turbo Otter':295,
    'DHC-6 Twin Otter 200':337,'DHC-6 Twin Otter 300':337,
    'DHC-6 Twin Otter 400':337,'DHC-6 Twin Otter 300-G':337,
    'DHC-7 Dash 7-150':428,
    // COMAC
    'ARJ21-700':828,'ARJ21-900':828,'ARJ21-700CBJ':828,
    'C919':834,
    'C929-500':903,'C929-600':903,'C929-700':903,
    'C939':903,
  });

})();
