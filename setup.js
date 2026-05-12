/* -- SETUP -- */
var _setupFiltered=[], _setupPicked=null, _setupCountry=null;

var REAL_AIRPORTS_ICAO = ['EPWA','EPMO','EPRA','EPKK','EPGD','EPWR','EPPO','EPKT','EPRZ','EPSC','EPLL','EPBY','EPLU','EPCP'];

var WORLD_CITIES = {
  'Albania': {flag:'🇦🇱',cities:[
    {name:'Tirana',lat:41.328,lng:19.818},
    {name:'Durres',lat:41.324,lng:19.455},
    {name:'Vlora',lat:40.467,lng:19.483}
  ]},
  'Algieria': {flag:'🇩🇿',cities:[
    {name:'Algier',lat:36.738,lng:3.087},
    {name:'Oran',lat:35.691,lng:-0.641},
    {name:'Konstantyna',lat:36.365,lng:6.615},
    {name:'Annaba',lat:36.897,lng:7.765},
    {name:'Batna',lat:35.556,lng:6.173},
    {name:'Djelfa',lat:34.67,lng:3.263}
  ]},
  'Angola': {flag:'🇦🇴',cities:[
    {name:'Luanda',lat:-8.839,lng:13.289},
    {name:'Huambo',lat:-12.776,lng:15.739},
    {name:'Lobito',lat:-12.348,lng:13.546}
  ]},
  'Arabia Saudyjska': {flag:'🇸🇦',cities:[
    {name:'Rijad',lat:24.688,lng:46.722},
    {name:'Dżudda',lat:21.543,lng:39.173},
    {name:'Mekka',lat:21.387,lng:39.857},
    {name:'Medyna',lat:24.524,lng:39.57},
    {name:'Dammam',lat:26.435,lng:50.104},
    {name:'Taif',lat:21.283,lng:40.415},
    {name:'Tabuk',lat:28.383,lng:36.568},
    {name:'Buraida',lat:26.357,lng:43.975}
  ]},
  'Argentyna': {flag:'🇦🇷',cities:[
    {name:'Buenos Aires',lat:-34.614,lng:-58.444},
    {name:'Kordoba',lat:-31.415,lng:-64.183},
    {name:'Rosario',lat:-32.944,lng:-60.651},
    {name:'Mendoza',lat:-32.89,lng:-68.829},
    {name:'La Plata',lat:-34.921,lng:-57.954},
    {name:'San Miguel de Tucuman',lat:-26.808,lng:-65.218},
    {name:'Mar del Plata',lat:-38.005,lng:-57.543},
    {name:'Salta',lat:-24.783,lng:-65.412},
    {name:'Santa Fe',lat:-31.633,lng:-60.7},
    {name:'San Juan',lat:-31.538,lng:-68.536},
    {name:'Resistencia',lat:-27.451,lng:-58.987},
    {name:'Corrientes',lat:-27.467,lng:-58.834},
    {name:'Posadas',lat:-27.367,lng:-55.9},
    {name:'Bahi Blanca',lat:-38.719,lng:-62.265}
  ]},
  'Armenya': {flag:'🇦🇲',cities:[
    {name:'Erewan',lat:40.182,lng:44.514},
    {name:'Giumri',lat:40.789,lng:43.847},
    {name:'Wandzor',lat:40.813,lng:44.488}
  ]},
  'Australia': {flag:'🇦🇺',cities:[
    {name:'Sydney',lat:-33.868,lng:151.209},
    {name:'Melbourne',lat:-37.814,lng:144.963},
    {name:'Brisbane',lat:-27.469,lng:153.025},
    {name:'Perth',lat:-31.95,lng:115.861},
    {name:'Adelaide',lat:-34.929,lng:138.601},
    {name:'Gold Coast',lat:-28.017,lng:153.4},
    {name:'Canberra',lat:-35.282,lng:149.129},
    {name:'Darwin',lat:-12.463,lng:130.844},
    {name:'Hobart',lat:-42.879,lng:147.324},
    {name:'Townsville',lat:-19.258,lng:146.817},
    {name:'Cairns',lat:-16.92,lng:145.777},
    {name:'Toowoomba',lat:-27.567,lng:151.95},
    {name:'Geelong',lat:-38.147,lng:144.36},
    {name:'Newcastle',lat:-32.927,lng:151.778},
    {name:'Wollongong',lat:-34.425,lng:150.893},
    {name:'Sunshine Coast',lat:-26.65,lng:153.067},
    {name:'Ballarat',lat:-37.561,lng:143.859},
    {name:'Bendigo',lat:-36.758,lng:144.282}
  ]},
  'Austria': {flag:'🇦🇹',cities:[
    {name:'Wiedeń',lat:48.21,lng:16.363},
    {name:'Graz',lat:47.07,lng:15.44},
    {name:'Linz',lat:48.306,lng:14.286},
    {name:'Salzburg',lat:47.8,lng:13.045},
    {name:'Innsbruck',lat:47.268,lng:11.394},
    {name:'Klagenfurt',lat:46.624,lng:14.308},
    {name:'Wels',lat:48.159,lng:14.033},
    {name:'Sankt Polten',lat:48.205,lng:15.625},
    {name:'Dornbirn',lat:47.412,lng:9.744}
  ]},
  'Azerbejdzan': {flag:'🇦🇿',cities:[
    {name:'Baku',lat:40.409,lng:49.867},
    {name:'Ganca',lat:40.683,lng:46.36},
    {name:'Sumgait',lat:40.59,lng:49.669},
    {name:'Mingacevir',lat:40.771,lng:47.055},
    {name:'Lankaran',lat:38.752,lng:48.848}
  ]},
  'Bahrajn': {flag:'🇧🇭',cities:[
    {name:'Manama',lat:26.215,lng:50.586},
    {name:'Al Muharraq',lat:26.257,lng:50.609}
  ]},
  'Bangladesz': {flag:'🇧🇩',cities:[
    {name:'Dhaka',lat:23.724,lng:90.409},
    {name:'Chittagong',lat:22.356,lng:91.783},
    {name:'Sylhet',lat:24.896,lng:91.872},
    {name:'Rajshahi',lat:24.374,lng:88.6},
    {name:'Khulna',lat:22.845,lng:89.54},
    {name:'Comilla',lat:23.461,lng:91.187}
  ]},
  'Belgia': {flag:'🇧🇪',cities:[
    {name:'Bruksela',lat:50.851,lng:4.352},
    {name:'Antwerpia',lat:51.221,lng:4.4},
    {name:'Gandawa',lat:51.054,lng:3.721},
    {name:'Liege',lat:50.633,lng:5.566},
    {name:'Charleroi',lat:50.411,lng:4.444},
    {name:'Brugge',lat:51.209,lng:3.225},
    {name:'Namur',lat:50.466,lng:4.867},
    {name:'Leuven',lat:50.878,lng:4.704},
    {name:'Mechelen',lat:51.028,lng:4.48},
    {name:'Aalst',lat:50.939,lng:4.04},
    {name:'La Louviere',lat:50.474,lng:4.189},
    {name:'Kortrijk',lat:50.828,lng:3.265}
  ]},
  'Bialorus': {flag:'🇧🇾',cities:[
    {name:'Minsk',lat:53.904,lng:27.562},
    {name:'Homel',lat:52.424,lng:30.994},
    {name:'Mohylew',lat:53.906,lng:30.329},
    {name:'Witebsk',lat:55.189,lng:30.209},
    {name:'Hrodna',lat:53.679,lng:23.829},
    {name:'Brest',lat:52.097,lng:23.734}
  ]},
  'Bosnia i Hercegowina': {flag:'🇧🇦',cities:[
    {name:'Sarajewo',lat:43.848,lng:18.356},
    {name:'Banja Luka',lat:44.773,lng:17.191},
    {name:'Zenica',lat:44.204,lng:17.907}
  ]},
  'Brazylia': {flag:'🇧🇷',cities:[
    {name:'Sao Paulo',lat:-23.55,lng:-46.634},
    {name:'Rio de Janeiro',lat:-22.906,lng:-43.173},
    {name:'Brasilia',lat:-15.78,lng:-47.93},
    {name:'Salvador',lat:-12.971,lng:-38.501},
    {name:'Fortaleza',lat:-3.717,lng:-38.543},
    {name:'Belo Horizonte',lat:-19.918,lng:-43.939},
    {name:'Manaus',lat:-3.119,lng:-60.022},
    {name:'Curitiba',lat:-25.429,lng:-49.271},
    {name:'Recife',lat:-8.054,lng:-34.881},
    {name:'Porto Alegre',lat:-30.033,lng:-51.23},
    {name:'Belem',lat:-1.455,lng:-48.503},
    {name:'Goiania',lat:-16.686,lng:-49.265},
    {name:'Guarulhos',lat:-23.462,lng:-46.534},
    {name:'Campinas',lat:-22.906,lng:-47.061},
    {name:'Sao Luis',lat:-2.529,lng:-44.303},
    {name:'Maceio',lat:-9.666,lng:-35.735},
    {name:'Natal',lat:-5.795,lng:-35.21},
    {name:'Joao Pessoa',lat:-7.121,lng:-34.884},
    {name:'Campo Grande',lat:-20.448,lng:-54.609},
    {name:'Teresina',lat:-5.092,lng:-42.803},
    {name:'Florianopolis',lat:-27.595,lng:-48.548}
  ]},
  'Bulgaria': {flag:'🇧🇬',cities:[
    {name:'Sofia',lat:42.698,lng:23.322},
    {name:'Plovdiw',lat:42.135,lng:24.745},
    {name:'Warna',lat:43.21,lng:27.914},
    {name:'Burgas',lat:42.511,lng:27.462},
    {name:'Ruse',lat:43.849,lng:25.954},
    {name:'Stara Zagora',lat:42.426,lng:25.64}
  ]},
  'Burkina Faso': {flag:'🇧🇫',cities:[
    {name:'Wagadugu',lat:12.365,lng:-1.534},
    {name:'Bobo-Dioulasso',lat:11.177,lng:-4.298}
  ]},
  'Chile': {flag:'🇨🇱',cities:[
    {name:'Santiago',lat:-33.457,lng:-70.648},
    {name:'Valparaiso',lat:-33.047,lng:-71.619},
    {name:'Concepcion',lat:-36.827,lng:-73.05},
    {name:'Antofagasta',lat:-23.652,lng:-70.396},
    {name:'Vina del Mar',lat:-33.024,lng:-71.552},
    {name:'Temuco',lat:-38.736,lng:-72.59},
    {name:'Rancagua',lat:-34.17,lng:-70.74},
    {name:'Talca',lat:-35.427,lng:-71.665},
    {name:'Arica',lat:-18.478,lng:-70.317}
  ]},
  'Chiny': {flag:'🇨🇳',cities:[
    {name:'Szanghaj',lat:31.224,lng:121.469},
    {name:'Pekin',lat:39.905,lng:116.391},
    {name:'Guangzhou',lat:23.13,lng:113.264},
    {name:'Shenzhen',lat:22.543,lng:114.058},
    {name:'Tianjin',lat:39.125,lng:117.191},
    {name:'Chengdu',lat:30.658,lng:104.066},
    {name:'Wuhan',lat:30.593,lng:114.305},
    {name:'Xian',lat:34.341,lng:108.94},
    {name:'Hangzhou',lat:30.259,lng:120.152},
    {name:'Nanjing',lat:32.061,lng:118.796},
    {name:'Chongqing',lat:29.563,lng:106.551},
    {name:'Shenyang',lat:41.802,lng:123.429},
    {name:'Harbin',lat:45.804,lng:126.535},
    {name:'Jinan',lat:36.668,lng:117.02},
    {name:'Zhengzhou',lat:34.758,lng:113.643},
    {name:'Changsha',lat:28.228,lng:112.939},
    {name:'Kunming',lat:25.046,lng:102.719},
    {name:'Qingdao',lat:36.067,lng:120.383},
    {name:'Dalian',lat:38.914,lng:121.614},
    {name:'Hefei',lat:31.861,lng:117.285},
    {name:'Nanchang',lat:28.683,lng:115.858},
    {name:'Fuzhou',lat:26.075,lng:119.297},
    {name:'Xiamen',lat:24.48,lng:118.089},
    {name:'Urumqi',lat:43.825,lng:87.617},
    {name:'Guiyang',lat:26.647,lng:106.63},
    {name:'Nanning',lat:22.817,lng:108.366},
    {name:'Lanzhou',lat:36.056,lng:103.834}
  ]},
  'Chorwacja': {flag:'🇭🇷',cities:[
    {name:'Zagrzeb',lat:45.814,lng:15.978},
    {name:'Split',lat:43.508,lng:16.44},
    {name:'Rijeka',lat:45.328,lng:14.442},
    {name:'Osijek',lat:45.555,lng:18.695},
    {name:'Zadar',lat:44.119,lng:15.232},
    {name:'Dubrownik',lat:42.651,lng:18.094}
  ]},
  'Cypr': {flag:'🇨🇾',cities:[
    {name:'Nikozja',lat:35.166,lng:33.367},
    {name:'Limassol',lat:34.685,lng:33.033},
    {name:'Larnaka',lat:34.917,lng:33.623}
  ]},
  'Czechy': {flag:'🇨🇿',cities:[
    {name:'Praga',lat:50.075,lng:14.438},
    {name:'Brno',lat:49.195,lng:16.608},
    {name:'Ostrawa',lat:49.821,lng:18.263},
    {name:'Pilzno',lat:49.738,lng:13.374},
    {name:'Liberec',lat:50.767,lng:15.057},
    {name:'Olomouc',lat:49.594,lng:17.252},
    {name:'Usti nad Labem',lat:50.659,lng:14.043},
    {name:'Hradec Kralove',lat:50.209,lng:15.832},
    {name:'Pardubice',lat:50.039,lng:15.779},
    {name:'Zlin',lat:49.225,lng:17.659},
    {name:'Havirov',lat:49.778,lng:18.436}
  ]},
  'Dania': {flag:'🇩🇰',cities:[
    {name:'Kopenhaga',lat:55.676,lng:12.568},
    {name:'Aarhus',lat:56.156,lng:10.211},
    {name:'Odense',lat:55.396,lng:10.389},
    {name:'Aalborg',lat:57.048,lng:9.919},
    {name:'Frederiksberg',lat:55.678,lng:12.523},
    {name:'Esbjerg',lat:55.467,lng:8.453},
    {name:'Randers',lat:56.461,lng:10.036},
    {name:'Kolding',lat:55.49,lng:9.472},
    {name:'Horsens',lat:55.86,lng:9.85}
  ]},
  'Egipt': {flag:'🇪🇬',cities:[
    {name:'Kair',lat:30.044,lng:31.236},
    {name:'Aleksandria',lat:31.2,lng:29.918},
    {name:'Giza',lat:30.013,lng:31.213},
    {name:'Shubra el-Kheima',lat:30.128,lng:31.242},
    {name:'Port Said',lat:31.256,lng:32.284},
    {name:'Suez',lat:29.974,lng:32.549},
    {name:'Luksor',lat:25.687,lng:32.639},
    {name:'Mansura',lat:31.04,lng:31.381},
    {name:'El-Mahalla el-Kubra',lat:30.975,lng:31.163},
    {name:'Tanta',lat:30.782,lng:31.002},
    {name:'Hurghada',lat:27.258,lng:33.812},
    {name:'Szarm el-Szejk',lat:27.916,lng:34.328}
  ]},
  'Estonia': {flag:'🇪🇪',cities:[
    {name:'Tallin',lat:59.437,lng:24.745},
    {name:'Tartu',lat:58.377,lng:26.729},
    {name:'Narwa',lat:59.378,lng:28.191},
    {name:'Parnu',lat:58.386,lng:24.5},
    {name:'Kohtla-Jarve',lat:59.399,lng:27.273}
  ]},
  'Etiopia': {flag:'🇪🇹',cities:[
    {name:'Addis Abeba',lat:9.025,lng:38.747},
    {name:'Dire Dawa',lat:9.593,lng:41.866},
    {name:'Mekele',lat:13.497,lng:39.476},
    {name:'Gondar',lat:12.604,lng:37.464},
    {name:'Bahir Dar',lat:11.593,lng:37.39},
    {name:'Hawasa',lat:7.063,lng:38.476}
  ]},
  'Filipiny': {flag:'🇵🇭',cities:[
    {name:'Manila',lat:14.599,lng:120.984},
    {name:'Quezon City',lat:14.676,lng:121.044},
    {name:'Cebu',lat:10.317,lng:123.891},
    {name:'Davao',lat:7.073,lng:125.613},
    {name:'Zamboanga',lat:6.91,lng:122.073}
  ]},
  'Finlandia': {flag:'🇫🇮',cities:[
    {name:'Helsinki',lat:60.169,lng:24.938},
    {name:'Tampere',lat:61.498,lng:23.76},
    {name:'Turku',lat:60.452,lng:22.267},
    {name:'Oulu',lat:65.013,lng:25.465},
    {name:'Jyvaskyla',lat:62.243,lng:25.748},
    {name:'Lahti',lat:60.984,lng:25.657}
  ]},
  'Francja': {flag:'🇫🇷',cities:[
    {name:'Paryz',lat:48.856,lng:2.352},
    {name:'Marsylia',lat:43.296,lng:5.381},
    {name:'Lyon',lat:45.748,lng:4.847},
    {name:'Tuluza',lat:43.605,lng:1.444},
    {name:'Nicea',lat:43.71,lng:7.262},
    {name:'Nantes',lat:47.218,lng:-1.553},
    {name:'Strasburg',lat:48.574,lng:7.752},
    {name:'Montpellier',lat:43.611,lng:3.877},
    {name:'Bordeaux',lat:44.837,lng:-0.58},
    {name:'Lille',lat:50.63,lng:3.057},
    {name:'Rennes',lat:48.117,lng:-1.678},
    {name:'Reims',lat:49.259,lng:4.032},
    {name:'Le Havre',lat:49.494,lng:0.108},
    {name:'Grenoble',lat:45.188,lng:5.724},
    {name:'Dijon',lat:47.322,lng:5.041},
    {name:'Angers',lat:47.478,lng:-0.563},
    {name:'Nimes',lat:43.837,lng:4.361},
    {name:'Tours',lat:47.394,lng:0.69},
    {name:'Aix-en-Provence',lat:43.53,lng:5.447},
    {name:'Amiens',lat:49.896,lng:2.302},
    {name:'Limoges',lat:45.834,lng:1.261},
    {name:'Clermont-Ferrand',lat:45.778,lng:3.083},
    {name:'Villeurbanne',lat:45.767,lng:4.879},
    {name:'Toulon',lat:43.125,lng:5.931},
    {name:'Brest',lat:48.39,lng:-4.487},
    {name:'Metz',lat:49.119,lng:6.175},
    {name:'Nancy',lat:48.692,lng:6.184},
    {name:'Perpignan',lat:42.699,lng:2.895},
    {name:'Pau',lat:43.3,lng:-0.371},
    {name:'Caen',lat:49.182,lng:-0.371},
    {name:'Besancon',lat:47.238,lng:6.024},
    {name:'Orleans',lat:47.903,lng:1.909},
    {name:'Annecy',lat:45.899,lng:6.13},
    {name:'Valenciennes',lat:50.358,lng:3.523},
    {name:'Troyes',lat:48.297,lng:4.074},
    {name:'Poitiers',lat:46.58,lng:0.34},
    {name:'Rouen',lat:49.443,lng:1.099},
    {name:'Avignon',lat:43.95,lng:4.806}
  ]},
  'Ghana': {flag:'🇬🇭',cities:[
    {name:'Akra',lat:5.556,lng:-0.197},
    {name:'Kumasi',lat:6.687,lng:-1.624},
    {name:'Tamale',lat:9.401,lng:-0.842},
    {name:'Sekondi-Takoradi',lat:4.934,lng:-1.716},
    {name:'Cape Coast',lat:5.105,lng:-1.247}
  ]},
  'Grecja': {flag:'🇬🇷',cities:[
    {name:'Ateny',lat:37.984,lng:23.728},
    {name:'Saloniki',lat:40.641,lng:22.944},
    {name:'Pireus',lat:37.942,lng:23.646},
    {name:'Patras',lat:38.246,lng:21.735},
    {name:'Heraklion',lat:35.34,lng:25.133},
    {name:'Larisa',lat:39.638,lng:22.419},
    {name:'Wołos',lat:39.365,lng:22.95},
    {name:'Ioannina',lat:39.665,lng:20.853},
    {name:'Kavala',lat:40.939,lng:24.402},
    {name:'Rodos',lat:36.434,lng:28.217},
    {name:'Kerkyra',lat:39.621,lng:19.923},
    {name:'Chania',lat:35.513,lng:24.019}
  ]},
  'Gruzja': {flag:'🇬🇪',cities:[
    {name:'Tbilisi',lat:41.694,lng:44.834},
    {name:'Kutaisi',lat:42.269,lng:42.698},
    {name:'Batumi',lat:41.641,lng:41.641},
    {name:'Rustawi',lat:41.549,lng:44.993},
    {name:'Zugdidi',lat:42.508,lng:41.871}
  ]},
  'Hiszpania': {flag:'🇪🇸',cities:[
    {name:'Madryt',lat:40.416,lng:-3.703},
    {name:'Barcelona',lat:41.385,lng:2.173},
    {name:'Walencja',lat:39.47,lng:-0.376},
    {name:'Sewilla',lat:37.389,lng:-5.984},
    {name:'Saragossa',lat:41.649,lng:-0.889},
    {name:'Malaga',lat:36.72,lng:-4.42},
    {name:'Murcia',lat:37.984,lng:-1.13},
    {name:'Palma',lat:39.569,lng:2.65},
    {name:'Bilbao',lat:43.263,lng:-2.935},
    {name:'Alicante',lat:38.346,lng:-0.49},
    {name:'Kordoba',lat:37.884,lng:-4.779},
    {name:'Valladolid',lat:41.652,lng:-4.724},
    {name:'Vigo',lat:42.232,lng:-8.712},
    {name:'Gijon',lat:43.545,lng:-5.662},
    {name:'Hospitalet',lat:41.36,lng:2.1},
    {name:'La Coruna',lat:43.371,lng:-8.396},
    {name:'Granada',lat:37.188,lng:-3.6},
    {name:'Vitoria',lat:42.846,lng:-2.673},
    {name:'Elche',lat:38.267,lng:-0.7},
    {name:'Oviedo',lat:43.362,lng:-5.849},
    {name:'Santa Cruz de Tenerife',lat:28.463,lng:-16.252},
    {name:'Las Palmas',lat:28.099,lng:-15.414},
    {name:'Pamplona',lat:42.812,lng:-1.645},
    {name:'Santander',lat:43.463,lng:-3.81},
    {name:'Almeria',lat:36.84,lng:-2.468},
    {name:'San Sebastian',lat:43.318,lng:-1.981},
    {name:'Burgos',lat:42.341,lng:-3.7},
    {name:'Salamanca',lat:40.966,lng:-5.664},
    {name:'Albacete',lat:38.994,lng:-1.856},
    {name:'Huelva',lat:37.261,lng:-6.949},
    {name:'Logorno',lat:42.466,lng:-2.449},
    {name:'Leon',lat:42.6,lng:-5.57},
    {name:'Cadiz',lat:36.527,lng:-6.295},
    {name:'Tarragona',lat:41.119,lng:1.245},
    {name:'Jerez de la Frontera',lat:36.685,lng:-6.136}
  ]},
  'Holandia': {flag:'🇳🇱',cities:[
    {name:'Amsterdam',lat:52.374,lng:4.898},
    {name:'Rotterdam',lat:51.924,lng:4.47},
    {name:'Haga',lat:52.078,lng:4.312},
    {name:'Utrecht',lat:52.09,lng:5.121},
    {name:'Eindhoven',lat:51.442,lng:5.479},
    {name:'Groningen',lat:53.219,lng:6.567},
    {name:'Tilburg',lat:51.561,lng:5.088},
    {name:'Almere',lat:52.374,lng:5.215},
    {name:'Breda',lat:51.571,lng:4.768},
    {name:'Nijmegen',lat:51.842,lng:5.854},
    {name:'Enschede',lat:52.223,lng:6.895},
    {name:'Haarlem',lat:52.381,lng:4.636},
    {name:'Arnhem',lat:51.985,lng:5.898},
    {name:'Zaanstad',lat:52.456,lng:4.83},
    {name:'Leiden',lat:52.16,lng:4.497},
    {name:'Dordrecht',lat:51.813,lng:4.669},
    {name:'Zoetermeer',lat:52.058,lng:4.494},
    {name:'Maastricht',lat:50.851,lng:5.693}
  ]},
  'Hongkong': {flag:'🇭🇰',cities:[
    {name:'Hongkong',lat:22.396,lng:114.109},
    {name:'Kowloon',lat:22.328,lng:114.174}
  ]},
  'Indie': {flag:'🇮🇳',cities:[
    {name:'Mumbai',lat:19.076,lng:72.878},
    {name:'Delhi',lat:28.614,lng:77.209},
    {name:'Bangalore',lat:12.972,lng:77.594},
    {name:'Hyderabad',lat:17.385,lng:78.487},
    {name:'Chennai',lat:13.083,lng:80.27},
    {name:'Kolkata',lat:22.573,lng:88.364},
    {name:'Pune',lat:18.52,lng:73.857},
    {name:'Ahmedabad',lat:23.023,lng:72.572},
    {name:'Surat',lat:21.17,lng:72.831},
    {name:'Jaipur',lat:26.912,lng:75.787},
    {name:'Lucknow',lat:26.85,lng:80.95},
    {name:'Kanpur',lat:26.449,lng:80.336},
    {name:'Nagpur',lat:21.146,lng:79.082},
    {name:'Indore',lat:22.719,lng:75.857},
    {name:'Thane',lat:19.183,lng:72.973},
    {name:'Bhopal',lat:23.259,lng:77.413},
    {name:'Visakhapatnam',lat:17.686,lng:83.218},
    {name:'Pimpri-Chinchwad',lat:18.627,lng:73.806},
    {name:'Patna',lat:25.594,lng:85.137},
    {name:'Vadodara',lat:22.307,lng:73.181},
    {name:'Ghaziabad',lat:28.668,lng:77.445},
    {name:'Ludhiana',lat:30.901,lng:75.857},
    {name:'Agra',lat:27.177,lng:78.008},
    {name:'Nashik',lat:20.0,lng:73.79},
    {name:'Faridabad',lat:28.408,lng:77.314},
    {name:'Meerut',lat:28.984,lng:77.706},
    {name:'Rajkot',lat:22.303,lng:70.802},
    {name:'Varanasi',lat:25.316,lng:82.974},
    {name:'Srinagar',lat:34.081,lng:74.797},
    {name:'Aurangabad',lat:19.877,lng:75.343}
  ]},
  'Indonezja': {flag:'🇮🇩',cities:[
    {name:'Dzakarta',lat:-6.211,lng:106.845},
    {name:'Surabaja',lat:-7.257,lng:112.752},
    {name:'Bandung',lat:-6.917,lng:107.619},
    {name:'Bekasi',lat:-6.235,lng:106.993},
    {name:'Medan',lat:-3.595,lng:98.672},
    {name:'Semarang',lat:-6.99,lng:110.42},
    {name:'Tangerang',lat:-6.178,lng:106.63},
    {name:'Depok',lat:-6.402,lng:106.794},
    {name:'Palembang',lat:-2.992,lng:104.756},
    {name:'Makasar',lat:-5.135,lng:119.413},
    {name:'Batam',lat:1.128,lng:104.053},
    {name:'Pekanbaru',lat:0.507,lng:101.448},
    {name:'Bandar Lampung',lat:-5.429,lng:105.261},
    {name:'Manado',lat:1.487,lng:124.842},
    {name:'Bali Denpasar',lat:-8.671,lng:115.212}
  ]},
  'Irak': {flag:'🇮🇶',cities:[
    {name:'Bagdad',lat:33.341,lng:44.401},
    {name:'Basra',lat:30.508,lng:47.783},
    {name:'Mosul',lat:36.34,lng:43.128},
    {name:'Arbil',lat:36.19,lng:44.009},
    {name:'Kirkuk',lat:35.471,lng:44.393},
    {name:'Nadżaf',lat:32.003,lng:44.335}
  ]},
  'Iran': {flag:'🇮🇷',cities:[
    {name:'Teheran',lat:35.694,lng:51.421},
    {name:'Maszhad',lat:36.316,lng:59.6},
    {name:'Isfahan',lat:32.661,lng:51.68},
    {name:'Karadż',lat:35.748,lng:50.942},
    {name:'Tebriz',lat:38.08,lng:46.291},
    {name:'Sziras',lat:29.591,lng:52.584},
    {name:'Kum',lat:34.64,lng:50.876},
    {name:'Ahwaz',lat:31.318,lng:48.672},
    {name:'Kom',lat:34.64,lng:50.876}
  ]},
  'Irlandia': {flag:'🇮🇪',cities:[
    {name:'Dublin',lat:53.333,lng:-6.249},
    {name:'Cork',lat:51.898,lng:-8.475},
    {name:'Limerick',lat:52.668,lng:-8.63},
    {name:'Galway',lat:53.274,lng:-9.05},
    {name:'Waterford',lat:52.259,lng:-7.11},
    {name:'Drogheda',lat:53.717,lng:-6.356},
    {name:'Dundalk',lat:54.001,lng:-6.41},
    {name:'Swords',lat:53.459,lng:-6.219},
    {name:'Bray',lat:53.2,lng:-6.1}
  ]},
  'Islandia': {flag:'🇮🇸',cities:[
    {name:'Reykjavik',lat:64.135,lng:-21.895},
    {name:'Kopavogur',lat:64.107,lng:-21.926},
    {name:'Hafnarfjordur',lat:64.067,lng:-21.94},
    {name:'Akureyri',lat:65.683,lng:-18.091}
  ]},
  'Izrael': {flag:'🇮🇱',cities:[
    {name:'Tel Awiw',lat:32.087,lng:34.798},
    {name:'Jerozolima',lat:31.769,lng:35.216},
    {name:'Hajfa',lat:32.82,lng:34.998},
    {name:'Riszon le-Syjon',lat:31.964,lng:34.804},
    {name:'Petach Tikwa',lat:32.091,lng:34.888},
    {name:'Beer Szewa',lat:31.252,lng:34.791}
  ]},
  'Japonia': {flag:'🇯🇵',cities:[
    {name:'Tokio',lat:35.689,lng:139.692},
    {name:'Osaka',lat:34.694,lng:135.502},
    {name:'Nagoja',lat:35.183,lng:136.907},
    {name:'Sapporo',lat:43.062,lng:141.355},
    {name:'Fukuoka',lat:33.59,lng:130.402},
    {name:'Kobe',lat:34.691,lng:135.196},
    {name:'Kioto',lat:35.012,lng:135.768},
    {name:'Hiroszima',lat:34.385,lng:132.455},
    {name:'Sendai',lat:38.269,lng:140.869},
    {name:'Kitakyushu',lat:33.882,lng:130.815},
    {name:'Chiba',lat:35.606,lng:140.106},
    {name:'Sakai',lat:34.573,lng:135.483},
    {name:'Kumamoto',lat:32.803,lng:130.708},
    {name:'Okayama',lat:34.655,lng:133.919},
    {name:'Sagamihara',lat:35.571,lng:139.372},
    {name:'Hamamatsu',lat:34.71,lng:137.727},
    {name:'Funabashi',lat:35.694,lng:139.983},
    {name:'Higashiosaka',lat:34.679,lng:135.601},
    {name:'Niigata',lat:37.902,lng:139.022},
    {name:'Shizuoka',lat:34.977,lng:138.383},
    {name:'Kagoshima',lat:31.596,lng:130.558}
  ]},
  'Jordania': {flag:'🇯🇴',cities:[
    {name:'Amman',lat:31.955,lng:35.945},
    {name:'Zarqa',lat:32.073,lng:36.088},
    {name:'Irbid',lat:32.556,lng:35.85},
    {name:'Aqaba',lat:29.527,lng:35.006}
  ]},
  'Kambodza': {flag:'🇰🇭',cities:[
    {name:'Phnom Penh',lat:11.569,lng:104.921},
    {name:'Siem Reap',lat:13.362,lng:103.86},
    {name:'Sihanoukville',lat:10.61,lng:103.523}
  ]},
  'Kamerun': {flag:'🇨🇲',cities:[
    {name:'Jaunde',lat:3.861,lng:11.52},
    {name:'Duala',lat:4.05,lng:9.7},
    {name:'Garoua',lat:9.298,lng:13.399}
  ]},
  'Kanada': {flag:'🇨🇦',cities:[
    {name:'Toronto',lat:43.653,lng:-79.383},
    {name:'Montreal',lat:45.501,lng:-73.567},
    {name:'Vancouver',lat:49.283,lng:-123.121},
    {name:'Calgary',lat:51.045,lng:-114.058},
    {name:'Edmonton',lat:53.546,lng:-113.49},
    {name:'Ottawa',lat:45.421,lng:-75.697},
    {name:'Winnipeg',lat:49.899,lng:-97.138},
    {name:'Quebec',lat:46.813,lng:-71.208},
    {name:'Hamilton',lat:43.256,lng:-79.869},
    {name:'Kitchener',lat:43.451,lng:-80.493},
    {name:'London Ontario',lat:42.983,lng:-81.244},
    {name:'Victoria',lat:48.428,lng:-123.365},
    {name:'Halifax',lat:44.647,lng:-63.591},
    {name:'Saskatoon',lat:52.133,lng:-106.67},
    {name:'Regina',lat:50.448,lng:-104.619},
    {name:'St. Johns',lat:47.56,lng:-52.713},
    {name:'Kelowna',lat:49.888,lng:-119.496},
    {name:'Windsor',lat:42.317,lng:-83.03}
  ]},
  'Katar': {flag:'🇶🇦',cities:[
    {name:'Doha',lat:25.286,lng:51.533},
    {name:'Al Wakrah',lat:25.166,lng:51.6},
    {name:'Al Khor',lat:25.683,lng:51.5}
  ]},
  'Kazachstan': {flag:'🇰🇿',cities:[
    {name:'Almaty',lat:43.222,lng:76.851},
    {name:'Astana',lat:51.128,lng:71.43},
    {name:'Szymkent',lat:42.317,lng:69.596},
    {name:'Aktobe',lat:50.279,lng:57.208},
    {name:'Karaganda',lat:49.803,lng:73.089},
    {name:'Taraz',lat:42.9,lng:71.368},
    {name:'Ust-Kamenogorsk',lat:49.978,lng:82.616},
    {name:'Semej',lat:50.412,lng:80.258}
  ]},
  'Kenia': {flag:'🇰🇪',cities:[
    {name:'Nairobi',lat:-1.286,lng:36.818},
    {name:'Mombasa',lat:-4.043,lng:39.668},
    {name:'Nakuru',lat:-0.284,lng:36.066},
    {name:'Eldoret',lat:0.52,lng:35.27},
    {name:'Kisumu',lat:-0.102,lng:34.762}
  ]},
  'Kolumbia': {flag:'🇨🇴',cities:[
    {name:'Bogota',lat:4.711,lng:-74.073},
    {name:'Medellin',lat:6.244,lng:-75.574},
    {name:'Cali',lat:3.451,lng:-76.532},
    {name:'Barranquilla',lat:10.964,lng:-74.796},
    {name:'Cartagena',lat:10.4,lng:-75.514},
    {name:'Cucuta',lat:7.894,lng:-72.505},
    {name:'Bucaramanga',lat:7.13,lng:-73.126},
    {name:'Pereira',lat:4.813,lng:-75.696},
    {name:'Santa Marta',lat:11.242,lng:-74.2}
  ]},
  'Korea Poludniowa': {flag:'🇰🇷',cities:[
    {name:'Seul',lat:37.566,lng:126.978},
    {name:'Busan',lat:35.179,lng:129.076},
    {name:'Incheon',lat:37.456,lng:126.706},
    {name:'Daegu',lat:35.871,lng:128.602},
    {name:'Daejeon',lat:36.352,lng:127.385},
    {name:'Gwangju',lat:35.16,lng:126.852},
    {name:'Suwon',lat:37.263,lng:126.999},
    {name:'Ulsan',lat:35.538,lng:129.311},
    {name:'Goyang',lat:37.659,lng:126.832},
    {name:'Changwon',lat:35.228,lng:128.681},
    {name:'Seongnam',lat:37.42,lng:127.127},
    {name:'Cheongju',lat:36.637,lng:127.491}
  ]},
  'Kuwejt': {flag:'🇰🇼',cities:[
    {name:'Kuwejt',lat:29.367,lng:47.978},
    {name:'Hawali',lat:29.334,lng:48.034},
    {name:'As Salimiyah',lat:29.338,lng:48.079}
  ]},
  'Laos': {flag:'🇱🇦',cities:[
    {name:'Wientian',lat:17.967,lng:102.6},
    {name:'Luang Prabang',lat:19.889,lng:102.135}
  ]},
  'Liban': {flag:'🇱🇧',cities:[
    {name:'Bejrut',lat:33.889,lng:35.502},
    {name:'Trypolis',lat:34.437,lng:35.85},
    {name:'Sydon',lat:33.557,lng:35.371}
  ]},
  'Libia': {flag:'🇱🇾',cities:[
    {name:'Trypolis',lat:32.892,lng:13.192},
    {name:'Bengazi',lat:32.12,lng:20.068},
    {name:'Misrata',lat:32.375,lng:15.093}
  ]},
  'Litwa': {flag:'🇱🇹',cities:[
    {name:'Wilno',lat:54.687,lng:25.279},
    {name:'Kowno',lat:54.897,lng:23.886},
    {name:'Kłajpeda',lat:55.703,lng:21.145},
    {name:'Szawle',lat:55.933,lng:23.316},
    {name:'Poniewież',lat:55.735,lng:24.351}
  ]},
  'Lotwa': {flag:'🇱🇻',cities:[
    {name:'Ryga',lat:56.946,lng:24.106},
    {name:'Daugavpils',lat:55.874,lng:26.535},
    {name:'Lipawa',lat:56.504,lng:21.011},
    {name:'Jelgawa',lat:56.652,lng:23.721},
    {name:'Jurmała',lat:56.968,lng:23.77}
  ]},
  'Luksemburg': {flag:'🇱🇺',cities:[
    {name:'Luksemburg',lat:49.611,lng:6.132},
    {name:'Esch-sur-Alzette',lat:49.496,lng:5.985}
  ]},
  'Macedonia Polnocna': {flag:'🇲🇰',cities:[
    {name:'Skopje',lat:41.996,lng:21.431},
    {name:'Bitola',lat:41.032,lng:21.335},
    {name:'Kumanowo',lat:42.132,lng:21.714}
  ]},
  'Madagaskar': {flag:'🇲🇬',cities:[
    {name:'Antananarywa',lat:-18.914,lng:47.536},
    {name:'Toamasina',lat:-18.145,lng:49.401},
    {name:'Antsirabe',lat:-19.866,lng:47.032}
  ]},
  'Malezja': {flag:'🇲🇾',cities:[
    {name:'Kuala Lumpur',lat:3.14,lng:101.686},
    {name:'Klang',lat:3.045,lng:101.451},
    {name:'Johor Bahru',lat:1.492,lng:103.74},
    {name:'Penang',lat:5.416,lng:100.333},
    {name:'Kota Kinabalu',lat:5.98,lng:116.073},
    {name:'Kuching',lat:1.55,lng:110.336},
    {name:'Shah Alam',lat:3.08,lng:101.533},
    {name:'Petaling Jaya',lat:3.107,lng:101.606},
    {name:'Ipoh',lat:4.597,lng:101.09}
  ]},
  'Mali': {flag:'🇲🇱',cities:[
    {name:'Bamako',lat:12.65,lng:-8.0},
    {name:'Sikasso',lat:11.317,lng:-5.667},
    {name:'Segou',lat:13.45,lng:-6.267}
  ]},
  'Malta': {flag:'🇲🇹',cities:[
    {name:'Valletta',lat:35.9,lng:14.514},
    {name:'Birkirkara',lat:35.896,lng:14.462},
    {name:'Mosta',lat:35.91,lng:14.426}
  ]},
  'Maroko': {flag:'🇲🇦',cities:[
    {name:'Casablanca',lat:33.588,lng:-7.614},
    {name:'Fez',lat:34.037,lng:-5.0},
    {name:'Marrakesz',lat:31.628,lng:-8.009},
    {name:'Rabat',lat:34.02,lng:-6.841},
    {name:'Agadir',lat:30.428,lng:-9.598},
    {name:'Tanger',lat:35.76,lng:-5.834},
    {name:'Meknes',lat:33.895,lng:-5.554},
    {name:'Oujda',lat:34.681,lng:-1.908}
  ]},
  'Meksyk': {flag:'🇲🇽',cities:[
    {name:'Meksyk',lat:19.433,lng:-99.133},
    {name:'Guadalajara',lat:20.677,lng:-103.347},
    {name:'Monterrey',lat:25.687,lng:-100.314}
  ]},
  'Mozambik': {flag:'🇲🇿',cities:[
    {name:'Maputo',lat:-25.966,lng:32.573},
    {name:'Matola',lat:-25.962,lng:32.459},
    {name:'Nampula',lat:-15.116,lng:39.267},
    {name:'Beira',lat:-19.844,lng:34.839}
  ]},
  'Mołdawia': {flag:'🇲🇩',cities:[
    {name:'Kiszyniów',lat:47.005,lng:28.857},
    {name:'Balti',lat:47.762,lng:27.929},
    {name:'Tyraspol',lat:46.843,lng:29.641}
  ]},
  'Myanmar': {flag:'🇲🇲',cities:[
    {name:'Rangun',lat:16.805,lng:96.155},
    {name:'Mandalaj',lat:21.975,lng:96.08},
    {name:'Naypyidaw',lat:19.745,lng:96.115},
    {name:'Mawlamyine',lat:16.49,lng:97.628}
  ]},
  'Nepal': {flag:'🇳🇵',cities:[
    {name:'Katmandu',lat:27.717,lng:85.319},
    {name:'Pokhara',lat:28.21,lng:83.987},
    {name:'Lalitpur',lat:27.666,lng:85.32},
    {name:'Biratnagar',lat:26.454,lng:87.276},
    {name:'Birgunj',lat:27.012,lng:84.877}
  ]},
  'Niemcy': {flag:'🇩🇪',cities:[
    {name:'Berlin',lat:52.52,lng:13.405},
    {name:'Hamburg',lat:53.551,lng:9.993},
    {name:'Monachium',lat:48.137,lng:11.575},
    {name:'Kolonia',lat:50.938,lng:6.96},
    {name:'Frankfurt',lat:50.11,lng:8.682},
    {name:'Stuttgart',lat:48.775,lng:9.182},
    {name:'Dusseldorf',lat:51.227,lng:6.773},
    {name:'Dortmund',lat:51.514,lng:7.465},
    {name:'Essen',lat:51.455,lng:7.011},
    {name:'Lipsk',lat:51.34,lng:12.374},
    {name:'Drezno',lat:51.05,lng:13.737},
    {name:'Hanower',lat:52.374,lng:9.738},
    {name:'Norymberga',lat:49.453,lng:11.077},
    {name:'Brema',lat:53.079,lng:8.801},
    {name:'Karlsruhe',lat:49.006,lng:8.404},
    {name:'Rostock',lat:54.092,lng:12.099},
    {name:'Erfurt',lat:50.984,lng:11.03},
    {name:'Saarbrucken',lat:49.24,lng:6.997},
    {name:'Augsburg',lat:48.37,lng:10.898},
    {name:'Wiesbaden',lat:50.082,lng:8.24},
    {name:'Munster',lat:51.962,lng:7.626},
    {name:'Magdeburg',lat:52.131,lng:11.64},
    {name:'Kassel',lat:51.312,lng:9.479},
    {name:'Freiburg',lat:47.999,lng:7.842},
    {name:'Lubeka',lat:53.865,lng:10.687},
    {name:'Mainz',lat:49.992,lng:8.247},
    {name:'Darmstadt',lat:49.877,lng:8.657},
    {name:'Heidelberg',lat:49.399,lng:8.672},
    {name:'Trier',lat:49.75,lng:6.637},
    {name:'Ulm',lat:48.4,lng:9.987},
    {name:'Wurzburg',lat:49.791,lng:9.953},
    {name:'Aachen',lat:50.776,lng:6.084},
    {name:'Kiel',lat:54.323,lng:10.135},
    {name:'Mannheim',lat:49.488,lng:8.466},
    {name:'Chemnitz',lat:50.833,lng:12.917},
    {name:'Braunschweig',lat:52.268,lng:10.526},
    {name:'Halle',lat:51.483,lng:11.97},
    {name:'Wuppertal',lat:51.257,lng:7.151},
    {name:'Bielefeld',lat:52.021,lng:8.532},
    {name:'Bochum',lat:51.482,lng:7.216},
    {name:'Bonn',lat:50.733,lng:7.099},
    {name:'Oberhausen',lat:51.47,lng:6.851},
    {name:'Gelsenkirchen',lat:51.517,lng:7.085},
    {name:'Krefeld',lat:51.337,lng:6.585},
    {name:'Hamm',lat:51.68,lng:7.815}
  ]},
  'Nigeria': {flag:'🇳🇬',cities:[
    {name:'Lagos',lat:6.455,lng:3.396},
    {name:'Kano',lat:12.002,lng:8.592},
    {name:'Ibadan',lat:7.388,lng:3.9},
    {name:'Abuja',lat:9.076,lng:7.399},
    {name:'Port Harcourt',lat:4.778,lng:6.999},
    {name:'Benin City',lat:6.335,lng:5.627},
    {name:'Maiduguri',lat:11.846,lng:13.16},
    {name:'Kaduna',lat:10.526,lng:7.438},
    {name:'Zaria',lat:11.078,lng:7.708}
  ]},
  'Norwegia': {flag:'🇳🇴',cities:[
    {name:'Oslo',lat:59.913,lng:10.752},
    {name:'Bergen',lat:60.391,lng:5.322},
    {name:'Stavanger',lat:58.97,lng:5.733},
    {name:'Trondheim',lat:63.43,lng:10.395},
    {name:'Baerum',lat:59.896,lng:10.527},
    {name:'Kristiansand',lat:58.147,lng:7.996},
    {name:'Fredrikstad',lat:59.211,lng:10.944},
    {name:'Drammen',lat:59.743,lng:10.205},
    {name:'Tromsø',lat:69.649,lng:18.956},
    {name:'Sandnes',lat:58.851,lng:5.736},
    {name:'Skien',lat:59.208,lng:9.609},
    {name:'Alesund',lat:62.472,lng:6.15}
  ]},
  'Nowa Zelandia': {flag:'🇳🇿',cities:[
    {name:'Auckland',lat:-36.861,lng:174.762},
    {name:'Wellington',lat:-41.286,lng:174.776},
    {name:'Christchurch',lat:-43.532,lng:172.637},
    {name:'Hamilton',lat:-37.787,lng:175.279},
    {name:'Tauranga',lat:-37.687,lng:176.166},
    {name:'Dunedin',lat:-45.879,lng:170.504},
    {name:'Palmerston North',lat:-40.356,lng:175.611},
    {name:'Napier',lat:-39.492,lng:176.912}
  ]},
  'Oman': {flag:'🇴🇲',cities:[
    {name:'Maskat',lat:23.614,lng:58.593},
    {name:'Salalah',lat:17.015,lng:54.091},
    {name:'Sohar',lat:24.347,lng:56.746},
    {name:'Sur',lat:22.567,lng:59.528}
  ]},
  'Pakistan': {flag:'🇵🇰',cities:[
    {name:'Karaczi',lat:24.861,lng:67.01},
    {name:'Lahore',lat:31.558,lng:74.352},
    {name:'Faisalabad',lat:31.418,lng:73.079},
    {name:'Rawalpindi',lat:33.597,lng:73.042},
    {name:'Islamabad',lat:33.729,lng:73.094},
    {name:'Multan',lat:30.197,lng:71.481},
    {name:'Hyderabad',lat:25.368,lng:68.366},
    {name:'Peshawar',lat:34.008,lng:71.579},
    {name:'Kweta',lat:30.192,lng:67.006}
  ]},
  'Peru': {flag:'🇵🇪',cities:[
    {name:'Lima',lat:-12.046,lng:-77.043},
    {name:'Arequipa',lat:-16.409,lng:-71.537},
    {name:'Trujillo',lat:-8.112,lng:-79.029},
    {name:'Chiclayo',lat:-6.776,lng:-79.844},
    {name:'Piura',lat:-5.194,lng:-80.633},
    {name:'Iquitos',lat:-3.748,lng:-73.247},
    {name:'Cusco',lat:-13.532,lng:-71.968}
  ]},
  'Polska': {flag:'🇵🇱',cities:[
    {name:'Warszawa',lat:52.229,lng:21.012},
    {name:'Krakow',lat:50.061,lng:19.937},
    {name:'Lodz',lat:51.759,lng:19.457},
    {name:'Wroclaw',lat:51.107,lng:17.038},
    {name:'Poznan',lat:52.406,lng:16.925},
    {name:'Gdansk',lat:54.352,lng:18.646},
    {name:'Szczecin',lat:53.428,lng:14.553},
    {name:'Bydgoszcz',lat:53.123,lng:18.008},
    {name:'Lublin',lat:51.246,lng:22.568},
    {name:'Katowice',lat:50.259,lng:19.022},
    {name:'Bialystok',lat:53.13,lng:23.168},
    {name:'Gdynia',lat:54.518,lng:18.531},
    {name:'Czestochowa',lat:50.811,lng:19.12},
    {name:'Radom',lat:51.403,lng:21.146},
    {name:'Sosnowiec',lat:50.286,lng:19.104},
    {name:'Torun',lat:53.013,lng:18.598},
    {name:'Kielce',lat:50.866,lng:20.628},
    {name:'Rzeszow',lat:50.041,lng:22.004},
    {name:'Gliwice',lat:50.294,lng:18.665},
    {name:'Zabrze',lat:50.325,lng:18.786},
    {name:'Olsztyn',lat:53.778,lng:20.48},
    {name:'Bytom',lat:50.348,lng:18.918},
    {name:'Bielsko-Biala',lat:49.822,lng:19.044},
    {name:'Zielona Gora',lat:51.935,lng:15.506},
    {name:'Rybnik',lat:50.097,lng:18.541},
    {name:'Opole',lat:50.675,lng:17.921},
    {name:'Tychy',lat:50.132,lng:18.979},
    {name:'Plock',lat:52.546,lng:19.706},
    {name:'Walbrzych',lat:50.785,lng:16.284},
    {name:'Wloclawek',lat:52.648,lng:19.065},
    {name:'Tarnow',lat:50.013,lng:20.986},
    {name:'Chorzow',lat:50.297,lng:18.954},
    {name:'Koszalin',lat:54.194,lng:16.172},
    {name:'Kalisz',lat:51.757,lng:18.091},
    {name:'Legnica',lat:51.207,lng:16.156},
    {name:'Grudziadz',lat:53.484,lng:18.753},
    {name:'Slupsk',lat:54.464,lng:17.029},
    {name:'Jastrzebie-Zdroj',lat:49.957,lng:18.598},
    {name:'Nowy Sacz',lat:49.626,lng:20.692},
    {name:'Jelenia Gora',lat:50.904,lng:15.742},
    {name:'Siedlce',lat:52.167,lng:22.29},
    {name:'Konin',lat:52.228,lng:18.251},
    {name:'Inowroclaw',lat:52.797,lng:18.253},
    {name:'Lubin',lat:51.399,lng:16.199},
    {name:'Suwalki',lat:54.112,lng:22.93},
    {name:'Ustka',lat:54.583,lng:16.861},
    {name:'Wyszkow',lat:52.594,lng:21.459},
    {name:'Mielec',lat:50.288,lng:21.421},
    {name:'Stalowa Wola',lat:50.582,lng:22.053},
    {name:'Sanok',lat:49.559,lng:22.204},
    {name:'Przemysl',lat:49.783,lng:22.768},
    {name:'Zamoc',lat:50.723,lng:23.252},
    {name:'Chelm',lat:51.143,lng:23.472},
    {name:'Zamosc',lat:50.723,lng:23.252},
    {name:'Biala Podlaska',lat:52.033,lng:23.15},
    {name:'Ostroleka',lat:53.081,lng:21.572},
    {name:'Pila',lat:53.151,lng:16.738},
    {name:'Gniezno',lat:52.534,lng:17.582},
    {name:'Leszno',lat:51.842,lng:16.575},
    {name:'Swidnica',lat:50.85,lng:16.487},
    {name:'Tczew',lat:53.779,lng:18.776},
    {name:'Pruszcz Gdanski',lat:54.257,lng:18.635},
    {name:'Wejherowo',lat:54.607,lng:18.234},
    {name:'Rumia',lat:54.571,lng:18.396},
    {name:'Sopot',lat:54.441,lng:18.56},
    {name:'Nowa Sol',lat:51.803,lng:15.716},
    {name:'Gorzow Wielkopolski',lat:52.733,lng:15.239},
    {name:'Zgorzelec',lat:51.155,lng:15.013}
  ]},
  'Portugalia': {flag:'🇵🇹',cities:[
    {name:'Lizbona',lat:38.717,lng:-9.139},
    {name:'Porto',lat:41.157,lng:-8.629},
    {name:'Braga',lat:41.55,lng:-8.426},
    {name:'Coimbra',lat:40.211,lng:-8.43},
    {name:'Faro',lat:37.016,lng:-7.935},
    {name:'Funchal',lat:32.66,lng:-16.914},
    {name:'Setubal',lat:38.524,lng:-8.896},
    {name:'Almada',lat:38.68,lng:-9.155},
    {name:'Agualva-Cacem',lat:38.767,lng:-9.286},
    {name:'Aveiro',lat:40.641,lng:-8.654},
    {name:'Guimaraes',lat:41.443,lng:-8.292},
    {name:'Evora',lat:38.571,lng:-7.907},
    {name:'Leiria',lat:39.744,lng:-8.807},
    {name:'Viseu',lat:40.662,lng:-7.909},
    {name:'Ponta Delgada',lat:37.741,lng:-25.698}
  ]},
  'RPA': {flag:'🇿🇦',cities:[
    {name:'Johannesburg',lat:-26.204,lng:28.046},
    {name:'Kapsztad',lat:-33.925,lng:18.424},
    {name:'Durban',lat:-29.858,lng:31.03},
    {name:'Pretoria',lat:-25.746,lng:28.187},
    {name:'Port Elizabeth',lat:-33.961,lng:25.599},
    {name:'Bloemfontein',lat:-29.121,lng:26.214},
    {name:'East London',lat:-33.016,lng:27.912},
    {name:'Pietermaritzburg',lat:-29.617,lng:30.393},
    {name:'Benoni',lat:-26.187,lng:28.321}
  ]},
  'Rosja': {flag:'🇷🇺',cities:[
    {name:'Moskwa',lat:55.751,lng:37.618},
    {name:'Petersburg',lat:59.939,lng:30.316},
    {name:'Nowosybirsk',lat:54.989,lng:82.904},
    {name:'Jekaterynburg',lat:56.838,lng:60.597},
    {name:'Kazań',lat:55.796,lng:49.106},
    {name:'Niżny Nowgorod',lat:56.296,lng:43.936},
    {name:'Czelabińsk',lat:55.16,lng:61.4},
    {name:'Omsk',lat:54.99,lng:73.368},
    {name:'Samara',lat:53.202,lng:50.15},
    {name:'Ufa',lat:54.735,lng:55.958},
    {name:'Krasnodar',lat:45.035,lng:38.975},
    {name:'Krasnojarsk',lat:56.01,lng:92.852},
    {name:'Perm',lat:58.01,lng:56.23},
    {name:'Wołgograd',lat:48.708,lng:44.514},
    {name:'Woroneż',lat:51.661,lng:39.2},
    {name:'Saratow',lat:51.533,lng:46.034},
    {name:'Irkuck',lat:52.286,lng:104.281},
    {name:'Tiumeń',lat:57.161,lng:68.404},
    {name:'Chabarowsk',lat:48.48,lng:135.082},
    {name:'Władywostok',lat:43.134,lng:131.928},
    {name:'Rostów nad Donem',lat:47.223,lng:39.718}
  ]},
  'Rumunia': {flag:'🇷🇴',cities:[
    {name:'Bukareszt',lat:44.432,lng:26.104},
    {name:'Cluj-Napoca',lat:46.77,lng:23.59},
    {name:'Timisoara',lat:45.757,lng:21.229},
    {name:'Iasi',lat:47.158,lng:27.602},
    {name:'Konstanca',lat:44.18,lng:28.654},
    {name:'Krakow',lat:50.061,lng:19.937},
    {name:'Craiova',lat:44.319,lng:23.8},
    {name:'Galati',lat:45.436,lng:28.049},
    {name:'Brasov',lat:45.65,lng:25.607},
    {name:'Ploiesti',lat:44.944,lng:25.985},
    {name:'Oradea',lat:47.046,lng:21.918},
    {name:'Bacau',lat:46.567,lng:26.914}
  ]},
  'Senegal': {flag:'🇸🇳',cities:[
    {name:'Dakar',lat:14.693,lng:-17.447},
    {name:'Pikine',lat:14.751,lng:-17.394},
    {name:'Touba',lat:14.85,lng:-15.883},
    {name:'Thies',lat:14.788,lng:-16.926}
  ]},
  'Serbia': {flag:'🇷🇸',cities:[
    {name:'Belgrad',lat:44.802,lng:20.465},
    {name:'Nowy Sad',lat:45.267,lng:19.833},
    {name:'Nisz',lat:43.32,lng:21.896},
    {name:'Kragujewac',lat:44.013,lng:20.928},
    {name:'Subotica',lat:46.1,lng:19.667}
  ]},
  'Singapur': {flag:'🇸🇬',cities:[
    {name:'Singapur',lat:1.352,lng:103.82}
  ]},
  'Slowenia': {flag:'🇸🇮',cities:[
    {name:'Lublana',lat:46.051,lng:14.505},
    {name:'Maribor',lat:46.558,lng:15.646},
    {name:'Celje',lat:46.23,lng:15.267}
  ]},
  'Sri Lanka': {flag:'🇱🇰',cities:[
    {name:'Kolombo',lat:6.932,lng:79.848},
    {name:'Dehiwala',lat:6.851,lng:79.865},
    {name:'Sri Jayawardenepura Kotte',lat:6.887,lng:79.92},
    {name:'Negombo',lat:7.21,lng:79.835},
    {name:'Jaffna',lat:9.668,lng:80.007},
    {name:'Galle',lat:6.053,lng:80.22}
  ]},
  'Sudan': {flag:'🇸🇩',cities:[
    {name:'Chartum',lat:15.5,lng:32.56},
    {name:'Omdurman',lat:15.644,lng:32.481},
    {name:'Port Sudan',lat:19.614,lng:37.217}
  ]},
  'Syria': {flag:'🇸🇾',cities:[
    {name:'Damaszek',lat:33.51,lng:36.291},
    {name:'Aleppo',lat:36.202,lng:37.161},
    {name:'Hims',lat:34.73,lng:36.709},
    {name:'Hama',lat:35.132,lng:36.755},
    {name:'Latakia',lat:35.524,lng:35.792}
  ]},
  'Szwajcaria': {flag:'🇨🇭',cities:[
    {name:'Zurich',lat:47.377,lng:8.541},
    {name:'Genewa',lat:46.204,lng:6.144},
    {name:'Bazylea',lat:47.56,lng:7.589},
    {name:'Berno',lat:46.948,lng:7.447},
    {name:'Lozanna',lat:46.52,lng:6.634},
    {name:'Winterthur',lat:47.499,lng:8.726},
    {name:'Lucerna',lat:47.05,lng:8.309},
    {name:'St. Gallen',lat:47.422,lng:9.376},
    {name:'Lugano',lat:46.005,lng:8.954},
    {name:'Biel',lat:47.137,lng:7.247},
    {name:'Thun',lat:46.758,lng:7.629},
    {name:'Bellinzona',lat:46.194,lng:9.022}
  ]},
  'Szwecja': {flag:'🇸🇪',cities:[
    {name:'Sztokholm',lat:59.333,lng:18.065},
    {name:'Goteborg',lat:57.707,lng:11.967},
    {name:'Malmo',lat:55.605,lng:13.0},
    {name:'Uppsala',lat:59.858,lng:17.645},
    {name:'Vasteras',lat:59.609,lng:16.545},
    {name:'Orebro',lat:59.275,lng:15.213},
    {name:'Linkoping',lat:58.41,lng:15.621},
    {name:'Helsingborg',lat:56.046,lng:12.694},
    {name:'Jonkoping',lat:57.781,lng:14.162},
    {name:'Norrkoping',lat:58.587,lng:16.19},
    {name:'Lulea',lat:65.584,lng:22.154},
    {name:'Umea',lat:63.825,lng:20.264},
    {name:'Gavle',lat:60.675,lng:17.141},
    {name:'Boras',lat:57.721,lng:12.94},
    {name:'Sundsvall',lat:62.39,lng:17.309}
  ]},
  'Słowacja': {flag:'🇸🇰',cities:[
    {name:'Bratysława',lat:48.148,lng:17.107},
    {name:'Koszyce',lat:48.716,lng:21.261},
    {name:'Presov',lat:49.0,lng:21.239},
    {name:'Zilina',lat:49.223,lng:18.74},
    {name:'Banska Bystrica',lat:48.736,lng:19.146},
    {name:'Nitra',lat:48.306,lng:18.086}
  ]},
  'Tajlandia': {flag:'🇹🇭',cities:[
    {name:'Bangkok',lat:13.756,lng:100.502},
    {name:'Chiang Mai',lat:18.787,lng:98.993},
    {name:'Phuket',lat:7.89,lng:98.398},
    {name:'Pattaya',lat:12.928,lng:100.877},
    {name:'Hat Yai',lat:7.008,lng:100.473},
    {name:'Nakhon Ratchasima',lat:14.97,lng:102.102},
    {name:'Khon Kaen',lat:16.437,lng:102.836},
    {name:'Udon Thani',lat:17.414,lng:102.787},
    {name:'Chiang Rai',lat:19.909,lng:99.833}
  ]},
  'Tajwan': {flag:'🇹🇼',cities:[
    {name:'Tajpej',lat:25.048,lng:121.514},
    {name:'Kaohsiung',lat:22.627,lng:120.302},
    {name:'Tajchung',lat:24.148,lng:120.674},
    {name:'Tajnan',lat:22.997,lng:120.185},
    {name:'Hsinchu',lat:24.807,lng:120.968}
  ]},
  'Tanzania': {flag:'🇹🇿',cities:[
    {name:'Dar es Salaam',lat:-6.792,lng:39.208},
    {name:'Mwanza',lat:-2.516,lng:32.899},
    {name:'Arusha',lat:-3.367,lng:36.683},
    {name:'Zanzibar',lat:-6.165,lng:39.199},
    {name:'Dodoma',lat:-6.173,lng:35.74}
  ]},
  'Tunezja': {flag:'🇹🇳',cities:[
    {name:'Tunis',lat:36.818,lng:10.164},
    {name:'Sfax',lat:34.739,lng:10.76},
    {name:'Sousse',lat:35.828,lng:10.639},
    {name:'Ettadhamen',lat:36.834,lng:10.157},
    {name:'Kairouan',lat:35.678,lng:10.097}
  ]},
  'Turcja': {flag:'🇹🇷',cities:[
    {name:'Stambuł',lat:41.015,lng:28.979},
    {name:'Ankara',lat:39.92,lng:32.854},
    {name:'Izmir',lat:38.424,lng:27.143},
    {name:'Bursa',lat:40.182,lng:29.061},
    {name:'Antalya',lat:36.898,lng:30.713},
    {name:'Adana',lat:36.989,lng:35.329},
    {name:'Gaziantep',lat:37.066,lng:37.384},
    {name:'Konya',lat:37.867,lng:32.485},
    {name:'Kayseri',lat:38.732,lng:35.483},
    {name:'Mersin',lat:36.801,lng:34.621},
    {name:'Eskisehir',lat:39.783,lng:30.521},
    {name:'Diyarbakir',lat:37.91,lng:40.218},
    {name:'Samsun',lat:41.286,lng:36.33},
    {name:'Denizli',lat:37.774,lng:29.096},
    {name:'Trabzon',lat:41.005,lng:39.716},
    {name:'Erzurum',lat:39.905,lng:41.27},
    {name:'Van',lat:38.495,lng:43.38},
    {name:'Malatya',lat:38.355,lng:38.31},
    {name:'Kahramanmaras',lat:37.585,lng:36.937},
    {name:'Izmit',lat:40.762,lng:29.94},
    {name:'Tekirdag',lat:40.978,lng:27.515}
  ]},
  'USA': {flag:'🇺🇸',cities:[
    {name:'Nowy Jork',lat:40.713,lng:-74.006},
    {name:'Los Angeles',lat:34.052,lng:-118.244},
    {name:'Chicago',lat:41.878,lng:-87.63},
    {name:'Houston',lat:29.76,lng:-95.37},
    {name:'Phoenix',lat:33.449,lng:-112.074},
    {name:'Filadelfia',lat:39.953,lng:-75.165},
    {name:'San Antonio',lat:29.424,lng:-98.494},
    {name:'San Diego',lat:32.715,lng:-117.157},
    {name:'Dallas',lat:32.783,lng:-96.807},
    {name:'San Francisco',lat:37.774,lng:-122.419},
    {name:'Jacksonville',lat:30.332,lng:-81.656},
    {name:'Austin',lat:30.267,lng:-97.743},
    {name:'Miami',lat:25.774,lng:-80.194},
    {name:'Denver',lat:39.74,lng:-104.984},
    {name:'Seattle',lat:47.606,lng:-122.332},
    {name:'Las Vegas',lat:36.175,lng:-115.137},
    {name:'Nashville',lat:36.165,lng:-86.784},
    {name:'Boston',lat:42.36,lng:-71.059},
    {name:'Portland',lat:45.523,lng:-122.676},
    {name:'Memphis',lat:35.149,lng:-90.048},
    {name:'Oklahoma City',lat:35.468,lng:-97.517},
    {name:'Louisville',lat:38.254,lng:-85.759},
    {name:'Baltimore',lat:39.29,lng:-76.611},
    {name:'Milwaukee',lat:43.038,lng:-87.906},
    {name:'Albuquerque',lat:35.085,lng:-106.65},
    {name:'Tucson',lat:32.221,lng:-110.969},
    {name:'Fresno',lat:36.737,lng:-119.787},
    {name:'Sacramento',lat:38.581,lng:-121.494},
    {name:'Long Beach',lat:33.769,lng:-118.193},
    {name:'Kansas City',lat:39.099,lng:-94.578},
    {name:'Mesa',lat:33.415,lng:-111.831},
    {name:'Atlanta',lat:33.749,lng:-84.388},
    {name:'Omaha',lat:41.257,lng:-95.995},
    {name:'Colorado Springs',lat:38.833,lng:-104.822},
    {name:'Raleigh',lat:35.78,lng:-78.639},
    {name:'Virginia Beach',lat:36.853,lng:-75.977},
    {name:'Minneapolis',lat:44.979,lng:-93.265},
    {name:'Tampa',lat:27.948,lng:-82.459},
    {name:'New Orleans',lat:29.951,lng:-90.071},
    {name:'Cleveland',lat:41.499,lng:-81.695},
    {name:'Pittsburgh',lat:40.44,lng:-79.996},
    {name:'Cincinnati',lat:39.103,lng:-84.512},
    {name:'Indianapolis',lat:39.768,lng:-86.158},
    {name:'Detroit',lat:42.331,lng:-83.046},
    {name:'Charlotte',lat:35.227,lng:-80.843},
    {name:'Washington',lat:38.907,lng:-77.037},
    {name:'Las Cruces',lat:32.312,lng:-106.778},
    {name:'Honolulu',lat:21.307,lng:-157.858}
  ]},
  'Ukraina': {flag:'🇺🇦',cities:[
    {name:'Kijów',lat:50.45,lng:30.524},
    {name:'Charków',lat:49.993,lng:36.23},
    {name:'Odessa',lat:46.482,lng:30.723},
    {name:'Dniepr',lat:48.465,lng:35.046},
    {name:'Lwów',lat:49.842,lng:24.031},
    {name:'Zaporoże',lat:47.838,lng:35.138},
    {name:'Krzywy Rog',lat:47.91,lng:33.354},
    {name:'Mykolaiw',lat:46.975,lng:31.994},
    {name:'Mariupol',lat:47.097,lng:37.544},
    {name:'Łuck',lat:50.747,lng:25.325},
    {name:'Winnica',lat:49.233,lng:28.468},
    {name:'Chersoń',lat:46.636,lng:32.617}
  ]},
  'Uzbekistan': {flag:'🇺🇿',cities:[
    {name:'Taszkent',lat:41.299,lng:69.241},
    {name:'Samarkanda',lat:39.654,lng:66.975},
    {name:'Namangan',lat:40.998,lng:71.643},
    {name:'Andijan',lat:40.783,lng:72.344},
    {name:'Buchara',lat:39.768,lng:64.422},
    {name:'Nukus',lat:42.462,lng:59.614}
  ]},
  'Wegry': {flag:'🇭🇺',cities:[
    {name:'Budapeszt',lat:47.498,lng:19.04},
    {name:'Debrecen',lat:47.531,lng:21.626},
    {name:'Miskolc',lat:48.104,lng:20.779},
    {name:'Szeged',lat:46.253,lng:20.149},
    {name:'Pecs',lat:46.077,lng:18.232},
    {name:'Gyor',lat:47.685,lng:17.628},
    {name:'Nyiregyhaza',lat:47.955,lng:21.717},
    {name:'Kecskemet',lat:46.906,lng:19.69}
  ]},
  'Wenezuela': {flag:'🇻🇪',cities:[
    {name:'Caracas',lat:10.48,lng:-66.903},
    {name:'Maracaibo',lat:10.638,lng:-71.644},
    {name:'Valencia',lat:10.162,lng:-67.993},
    {name:'Barquisimeto',lat:10.061,lng:-69.317},
    {name:'Ciudad Guayana',lat:8.353,lng:-62.651}
  ]},
  'Wielka Brytania': {flag:'🇬🇧',cities:[
    {name:'Londyn',lat:51.507,lng:-0.128},
    {name:'Birmingham',lat:52.486,lng:-1.89},
    {name:'Manchester',lat:53.483,lng:-2.244},
    {name:'Glasgow',lat:55.86,lng:-4.251},
    {name:'Liverpool',lat:53.408,lng:-2.991},
    {name:'Leeds',lat:53.8,lng:-1.549},
    {name:'Sheffield',lat:53.381,lng:-1.47},
    {name:'Edinburgh',lat:55.953,lng:-3.189},
    {name:'Bristol',lat:51.455,lng:-2.595},
    {name:'Cardiff',lat:51.481,lng:-3.179},
    {name:'Belfast',lat:54.597,lng:-5.93},
    {name:'Newcastle',lat:54.978,lng:-1.613},
    {name:'Leicester',lat:52.636,lng:-1.133},
    {name:'Nottingham',lat:52.955,lng:-1.15},
    {name:'Coventry',lat:52.408,lng:-1.51},
    {name:'Bradford',lat:53.795,lng:-1.759},
    {name:'Hull',lat:53.745,lng:-0.336},
    {name:'Wolverhampton',lat:52.586,lng:-2.129},
    {name:'Plymouth',lat:50.376,lng:-4.142},
    {name:'Derby',lat:52.922,lng:-1.474},
    {name:'Stoke-on-Trent',lat:53.002,lng:-2.18},
    {name:'Southampton',lat:50.909,lng:-1.404},
    {name:'Salford',lat:53.485,lng:-2.287},
    {name:'Aberdeen',lat:57.149,lng:-2.099},
    {name:'Inverness',lat:57.477,lng:-4.225},
    {name:'Brighton',lat:50.827,lng:-0.138},
    {name:'Oxford',lat:51.752,lng:-1.258},
    {name:'Cambridge',lat:52.205,lng:0.119},
    {name:'Exeter',lat:50.718,lng:-3.533},
    {name:'York',lat:53.958,lng:-1.081},
    {name:'Reading',lat:51.456,lng:-0.971},
    {name:'Swansea',lat:51.621,lng:-3.944},
    {name:'Portsmouth',lat:50.798,lng:-1.091}
  ]},
  'Wietnam': {flag:'🇻🇳',cities:[
    {name:'Hanoi',lat:21.028,lng:105.804},
    {name:'Ho Chi Minh',lat:10.762,lng:106.66},
    {name:'Hai Phong',lat:20.865,lng:106.683},
    {name:'Da Nang',lat:16.068,lng:108.212},
    {name:'Bien Hoa',lat:10.957,lng:106.826},
    {name:'Hue',lat:16.463,lng:107.591},
    {name:'Can Tho',lat:10.034,lng:105.789},
    {name:'Nha Trang',lat:12.239,lng:109.197},
    {name:'Da Lat',lat:11.946,lng:108.441}
  ]},
  'Wlochy': {flag:'🇮🇹',cities:[
    {name:'Rzym',lat:41.902,lng:12.496},
    {name:'Mediolan',lat:45.464,lng:9.19},
    {name:'Neapol',lat:40.851,lng:14.268},
    {name:'Turyn',lat:45.07,lng:7.687},
    {name:'Palermo',lat:38.116,lng:13.362},
    {name:'Genua',lat:44.407,lng:8.934},
    {name:'Bolonia',lat:44.494,lng:11.343},
    {name:'Florencja',lat:43.769,lng:11.256},
    {name:'Bari',lat:41.118,lng:16.872},
    {name:'Wenecja',lat:45.441,lng:12.316},
    {name:'Catania',lat:37.502,lng:15.087},
    {name:'Werona',lat:45.438,lng:10.992},
    {name:'Messina',lat:38.192,lng:15.556},
    {name:'Triest',lat:45.648,lng:13.777},
    {name:'Padwa',lat:45.407,lng:11.877},
    {name:'Brescia',lat:45.541,lng:10.222},
    {name:'Taranto',lat:40.464,lng:17.247},
    {name:'Reggio Calabria',lat:38.11,lng:15.661},
    {name:'Modena',lat:44.648,lng:10.925},
    {name:'Prato',lat:43.879,lng:11.096},
    {name:'Parma',lat:44.801,lng:10.328},
    {name:'Livorno',lat:43.548,lng:10.311},
    {name:'Cagliari',lat:39.216,lng:9.109},
    {name:'Foggia',lat:41.462,lng:15.545},
    {name:'Salerno',lat:40.681,lng:14.768},
    {name:'Ferrara',lat:44.838,lng:11.619},
    {name:'Rimini',lat:44.059,lng:12.566},
    {name:'Bergamo',lat:45.698,lng:9.677},
    {name:'Perugia',lat:43.11,lng:12.388},
    {name:'Ancona',lat:43.615,lng:13.518}
  ]},
  'Wybrzeze Kosci Sloniowej': {flag:'🇨🇮',cities:[
    {name:'Abidzan',lat:5.355,lng:-4.008},
    {name:'Bouake',lat:7.693,lng:-5.03},
    {name:'Daloa',lat:6.877,lng:-6.451}
  ]},
  'ZEA': {flag:'🇦🇪',cities:[
    {name:'Dubaj',lat:25.204,lng:55.27},
    {name:'Abu Zabi',lat:24.453,lng:54.377},
    {name:'Szardza',lat:25.357,lng:55.403},
    {name:'Adżman',lat:25.412,lng:55.435},
    {name:'Ras al-Chajma',lat:25.788,lng:55.943},
    {name:'Fujaira',lat:25.122,lng:56.336}
  ]}
};

function showSetupScreen() {
  var el=document.createElement('div');
  el.id='setupScreen';
  el.style.cssText='position:fixed;inset:0;z-index:400;background:rgba(5,10,20,0.98);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:Arial,sans-serif;overflow-y:auto;';
  el.innerHTML=
    '<div style="font-size:28px;font-weight:900;color:#00d4ff;letter-spacing:4px;">FLIGHT</div>'
    +'<div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:4px;margin-bottom:20px;">MANAGER 2026</div>'
    +'<div id="setup-box" style="width:100%;max-width:440px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:20px;">'
    +'</div>';
  document.body.appendChild(el);
  renderCountryStep();
}

function renderCountryStep() {
  var box = document.getElementById('setup-box');
  if(!box) return;
  var countries = Object.keys(WORLD_CITIES);
  var html = '<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:12px;">WYBIERZ KRAJ BAZY</div>'
    +'<input id="sq-country" type="text" placeholder="Szukaj kraju..." oninput="filterCountries()" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div id="country-list" style="max-height:380px;overflow-y:auto;"></div>';
  box.innerHTML = html;
  renderCountryList2(countries);
}

function renderCountryList2(list) {
  var el = document.getElementById('country-list');
  if(!el) return;
  var html = '';
  list.forEach(function(name) {
    var c = WORLD_CITIES[name];
    html += '<div data-c="'+name+'" onclick="selectCountry(this.dataset.c)" '
      +'style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:6px;cursor:pointer;">'
      +'<span style="font-size:24px;">'+c.flag+'</span>'
      +'<div style="flex:1;">'
      +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;">'+name+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+c.cities.length+' miast</div>'
      +'</div>'
      +'<span style="color:#5580a0;font-size:18px;">&#8250;</span>'
      +'</div>';
  });
  el.innerHTML = html || '<div style="padding:14px;color:#5580a0;">Brak wynikow</div>';
}

function filterCountries() {
  var q = (document.getElementById('sq-country').value||'').toLowerCase();
  var all = Object.keys(WORLD_CITIES);
  var filtered = q ? all.filter(function(n){ return n.toLowerCase().indexOf(q)>=0; }) : all;
  renderCountryList2(filtered);
}

function selectCountry(country) {
  _setupCountry = country;
  var c = WORLD_CITIES[country];
  if(!c) return;
  _setupFiltered = c.cities.map(function(city){ return {name:city.name,lat:city.lat,lng:city.lng,icao:'',voiv:country,airport:''}; });
  _setupPicked = null;

  var box = document.getElementById('setup-box');
  box.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="renderCountryStep()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<span style="font-size:22px;">'+c.flag+'</span>'
    +'<div style="font-size:13px;font-weight:700;color:#00d4ff;">'+country+'</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;">WYBIERZ MIASTO</div>'
    +'<input id="sq" type="text" placeholder="Szukaj miasta..." oninput="setupFilter()" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:8px;outline:none;box-sizing:border-box;">'
    +'<div id="slist" style="max-height:260px;overflow-y:auto;border-radius:8px;border:1px solid rgba(255,255,255,0.07);margin-bottom:10px;"></div>'
    +'<div id="spicked" style="display:none;margin-bottom:10px;padding:10px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:8px;font-size:13px;color:#00d4ff;font-weight:700;"></div>'
    +'<button id="sbtn" onclick="setupGo()" disabled style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;opacity:0.4;">Rozpocznij</button>';

  renderSetupList();
  setTimeout(function(){ var sq=document.getElementById('sq'); if(sq) sq.focus(); },100);
}

function setupFilter() {
  var q=(document.getElementById('sq').value||'').toLowerCase();
  var base = _setupCountry && WORLD_CITIES[_setupCountry]
    ? WORLD_CITIES[_setupCountry].cities.map(function(c){ return {name:c.name,lat:c.lat,lng:c.lng,icao:'',voiv:_setupCountry,airport:''}; })
    : [];
  _setupFiltered = q ? base.filter(function(c){ return c.name.toLowerCase().indexOf(q)>=0; }) : base;
  renderSetupList();
}

function renderSetupList() {
  var shown=_setupFiltered.slice(0,60), out='';
  for(var j=0;j<shown.length;j++){
    var c=shown[j];
    var active=_setupPicked&&_setupPicked.name===c.name;
    out+='<div onclick="setupPick('+j+')" style="padding:11px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);background:'+(active?'rgba(0,212,255,0.12)':'transparent')+';border-radius:'+(active?'8px':'0')+';color:'+(active?'#00d4ff':'#cce4ff')+';font-size:14px;font-family:Arial,sans-serif;">'
      +c.name+'<span style="font-size:10px;color:#5580a0;margin-left:8px;">'+c.voiv+'</span></div>';
  }
  if(!out) out='<div style="padding:14px;color:#5580a0;font-family:Arial,sans-serif;">Brak wynikow</div>';
  var sl=document.getElementById('slist'); if(sl) sl.innerHTML=out;
}

function setupPick(j) {
  _setupPicked=_setupFiltered[j]; if(!_setupPicked) return;
  var sp=document.getElementById('spicked');
  if(sp){ sp.textContent='📍 '+_setupPicked.name+', '+_setupPicked.voiv; sp.style.display='block'; }
  var btn=document.getElementById('sbtn'); if(btn){ btn.disabled=false; btn.style.opacity='1'; }
  renderSetupList();
}

function setupGo() {
  var c=_setupPicked; if(!c) return;
  var cleanName = c.name.replace(/[^a-zA-Z]/g,'').toUpperCase().substring(0,2);
  var prefix = _setupCountry==='Polska'?'EP':_setupCountry==='Niemcy'?'ED':_setupCountry==='Francja'?'LF':_setupCountry==='UK'?'EG':'ZZ';
  var icao = prefix+cleanName;
  var ap={id:'AP_HOME',name:'Port Lotniczy '+c.name,icao:icao,city:c.name,country:_setupCountry||'Polska',lat:c.lat,lng:c.lng,isHome:true,level:1,maxSlots:10,usedSlots:0,upgrades:{runways:1,terminal:1,hangar:1,shops:0,parking:0},income:0};
  G.airports.push(ap); G.homeAirport=ap;
  G.airline.name='VIS Airlines'; G.airline.iata='VS';
  save();
  var _ss=document.getElementById('setupScreen');
  if(_ss) document.body.removeChild(_ss);
  initMap();
  setTimeout(function(){
    LMAP.invalidateSize({animate:false});
    LMAP.setView([c.lat,c.lng],7);
    renderMarkers(); renderRoutes();
    restoreFlights(); startTick(); updateHUD();
    showMsg('Baza w '+c.name+' gotowa!');
  }, 50);
}
