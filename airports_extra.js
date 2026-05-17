// Additional airports - Africa/Middle East
if(typeof ADB !== 'undefined') {
var _newAirports = [
  {
    "icao": "DTTA",
    "iata": "TUN",
    "name": "Tunis-Carthage",
    "city": "Tunis",
    "country": "Tunezja",
    "lat": 36.851,
    "lng": 10.227,
    "runway": 3200
  },
  {
    "icao": "DTMB",
    "iata": "MIR",
    "name": "Monastir",
    "city": "Monastir",
    "country": "Tunezja",
    "lat": 35.758,
    "lng": 10.755,
    "runway": 2900
  },
  {
    "icao": "DTTJ",
    "iata": "DJE",
    "name": "Djerba-Zarzis",
    "city": "Djerba",
    "country": "Tunezja",
    "lat": 33.875,
    "lng": 10.775,
    "runway": 3000
  },
  {
    "icao": "DTNH",
    "iata": "NBE",
    "name": "Enfidha-Hammamet",
    "city": "Enfidha",
    "country": "Tunezja",
    "lat": 36.076,
    "lng": 10.438,
    "runway": 3600
  },
  {
    "icao": "DTTX",
    "iata": "SFA",
    "name": "Sfax-Thyna",
    "city": "Sfax",
    "country": "Tunezja",
    "lat": 34.718,
    "lng": 10.691,
    "runway": 2600
  },
  {
    "icao": "DTTZ",
    "iata": "TOE",
    "name": "Tozeur-Nefta",
    "city": "Tozeur",
    "country": "Tunezja",
    "lat": 33.94,
    "lng": 8.11,
    "runway": 3000
  },
  {
    "icao": "DTTB",
    "iata": "TBJ",
    "name": "Tabarka-Aïn Draham",
    "city": "Tabarka",
    "country": "Tunezja",
    "lat": 36.98,
    "lng": 8.877,
    "runway": 2400
  },
  {
    "icao": "DTTF",
    "iata": "GAF",
    "name": "Gafsa-Ksar",
    "city": "Gafsa",
    "country": "Tunezja",
    "lat": 34.422,
    "lng": 8.825,
    "runway": 2600
  },
  {
    "icao": "GMME",
    "iata": "RBA",
    "name": "Rabat-Salé",
    "city": "Rabat",
    "country": "Maroko",
    "lat": 34.051,
    "lng": -6.752,
    "runway": 3400
  },
  {
    "icao": "GMMN",
    "iata": "CMN",
    "name": "Mohammed V",
    "city": "Casablanca",
    "country": "Maroko",
    "lat": 33.367,
    "lng": -7.59,
    "runway": 4000
  },
  {
    "icao": "OYMM",
    "iata": "RAK",
    "name": "Marrakesh Menara",
    "city": "Marrakesh",
    "country": "Maroko",
    "lat": 31.607,
    "lng": -8.036,
    "runway": 3100
  },
  {
    "icao": "GMAD",
    "iata": "AGA",
    "name": "Agadir-Al Massira",
    "city": "Agadir",
    "country": "Maroko",
    "lat": 30.325,
    "lng": -9.413,
    "runway": 3300
  },
  {
    "icao": "GMFF",
    "iata": "FEZ",
    "name": "Fès–Saïs",
    "city": "Fès",
    "country": "Maroko",
    "lat": 33.927,
    "lng": -4.978,
    "runway": 3200
  },
  {
    "icao": "GMTT",
    "iata": "TNG",
    "name": "Tangier Ibn Battout",
    "city": "Tangier",
    "country": "Maroko",
    "lat": 35.727,
    "lng": -5.916,
    "runway": 3500
  },
  {
    "icao": "GMMW",
    "iata": "NDR",
    "name": "Nador",
    "city": "Nador",
    "country": "Maroko",
    "lat": 34.988,
    "lng": -3.028,
    "runway": 3600
  },
  {
    "icao": "GMFO",
    "iata": "OUD",
    "name": "Oujda Angads",
    "city": "Oujda",
    "country": "Maroko",
    "lat": 34.787,
    "lng": -1.924,
    "runway": 3200
  },
  {
    "icao": "GMMH",
    "iata": "VIL",
    "name": "Dakhla",
    "city": "Dakhla",
    "country": "Maroko",
    "lat": 23.718,
    "lng": -15.932,
    "runway": 3200
  },
  {
    "icao": "GMML",
    "iata": "EUN",
    "name": "Laâyoune-Hassan I",
    "city": "Laâyoune",
    "country": "Maroko",
    "lat": 27.152,
    "lng": -13.219,
    "runway": 3800
  },
  {
    "icao": "GMMI",
    "iata": "ESU",
    "name": "Essaouira-Mogador",
    "city": "Essaouira",
    "country": "Maroko",
    "lat": 31.397,
    "lng": -9.682,
    "runway": 2800
  },
  {
    "icao": "GMMZ",
    "iata": "OZZ",
    "name": "Ouarzazate",
    "city": "Ouarzazate",
    "country": "Maroko",
    "lat": 30.939,
    "lng": -6.91,
    "runway": 3200
  },
  {
    "icao": "GMTA",
    "iata": "AHU",
    "name": "Al Hoceima",
    "city": "Al Hoceima",
    "country": "Maroko",
    "lat": 35.177,
    "lng": -3.84,
    "runway": 3000
  },
  {
    "icao": "GMML",
    "iata": "EUN",
    "name": "Hassan I",
    "city": "Laâyoune",
    "country": "Sahara Zachodnia",
    "lat": 27.152,
    "lng": -13.219,
    "runway": 3800
  },
  {
    "icao": "GMMH",
    "iata": "VIL",
    "name": "Dakhla",
    "city": "Dakhla",
    "country": "Sahara Zachodnia",
    "lat": 23.718,
    "lng": -15.932,
    "runway": 3200
  },
  {
    "icao": "GMMQ",
    "iata": "SMW",
    "name": "Smara",
    "city": "Smara",
    "country": "Sahara Zachodnia",
    "lat": 26.732,
    "lng": -11.684,
    "runway": 2800
  },
  {
    "icao": "GQNO",
    "iata": "NKC",
    "name": "Nouakchott–Oumtounsy",
    "city": "Nouakchott",
    "country": "Mauretania",
    "lat": 18.34,
    "lng": -15.97,
    "runway": 3600
  },
  {
    "icao": "GQPP",
    "iata": "NDB",
    "name": "Nouadhibou",
    "city": "Nouadhibou",
    "country": "Mauretania",
    "lat": 20.933,
    "lng": -17.03,
    "runway": 3000
  },
  {
    "icao": "GQPA",
    "iata": "ATR",
    "name": "Atar",
    "city": "Atar",
    "country": "Mauretania",
    "lat": 20.506,
    "lng": -13.043,
    "runway": 2800
  },
  {
    "icao": "GQPZ",
    "iata": "OUZ",
    "name": "Zouérat",
    "city": "Zouérat",
    "country": "Mauretania",
    "lat": 22.756,
    "lng": -12.483,
    "runway": 3000
  },
  {
    "icao": "GABS",
    "iata": "BKO",
    "name": "Modibo Keita",
    "city": "Bamako",
    "country": "Mali",
    "lat": 12.534,
    "lng": -7.95,
    "runway": 3500
  },
  {
    "icao": "GAKD",
    "iata": "KYS",
    "name": "Kayes Dag Dag",
    "city": "Kayes",
    "country": "Mali",
    "lat": 14.482,
    "lng": -11.404,
    "runway": 1800
  },
  {
    "icao": "GAMB",
    "iata": "MZI",
    "name": "Mopti Ambodédjo",
    "city": "Mopti",
    "country": "Mali",
    "lat": 14.513,
    "lng": -4.079,
    "runway": 2400
  },
  {
    "icao": "GATB",
    "iata": "TOM",
    "name": "Tombouctou",
    "city": "Timbuktu",
    "country": "Mali",
    "lat": 16.73,
    "lng": -3.007,
    "runway": 2200
  },
  {
    "icao": "GAGO",
    "iata": "GAQ",
    "name": "Gao",
    "city": "Gao",
    "country": "Mali",
    "lat": 16.248,
    "lng": -0.006,
    "runway": 2800
  },
  {
    "icao": "DRRN",
    "iata": "NIM",
    "name": "Diori Hamani",
    "city": "Niamey",
    "country": "Niger",
    "lat": 13.482,
    "lng": 2.184,
    "runway": 3600
  },
  {
    "icao": "DRZA",
    "iata": "AJY",
    "name": "Mano Dayak",
    "city": "Agadez",
    "country": "Niger",
    "lat": 16.965,
    "lng": 8.0,
    "runway": 3300
  },
  {
    "icao": "DRZR",
    "iata": "ZND",
    "name": "Zinder",
    "city": "Zinder",
    "country": "Niger",
    "lat": 13.779,
    "lng": 8.984,
    "runway": 2700
  },
  {
    "icao": "FTTJ",
    "iata": "NDJ",
    "name": "N'Djamena",
    "city": "N'Djamena",
    "country": "Czad",
    "lat": 12.134,
    "lng": 15.034,
    "runway": 2800
  },
  {
    "icao": "FTTD",
    "iata": "MQQ",
    "name": "Moundou",
    "city": "Moundou",
    "country": "Czad",
    "lat": 8.624,
    "lng": 16.072,
    "runway": 2400
  },
  {
    "icao": "FTTS",
    "iata": "SRH",
    "name": "Sarh",
    "city": "Sarh",
    "country": "Czad",
    "lat": 9.144,
    "lng": 18.374,
    "runway": 2400
  },
  {
    "icao": "FTTC",
    "iata": "AEH",
    "name": "Abéché",
    "city": "Abéché",
    "country": "Czad",
    "lat": 13.848,
    "lng": 20.844,
    "runway": 2600
  },
  {
    "icao": "HSSS",
    "iata": "KRT",
    "name": "Khartoum",
    "city": "Khartoum",
    "country": "Sudan",
    "lat": 15.59,
    "lng": 32.553,
    "runway": 3500
  },
  {
    "icao": "HSPN",
    "iata": "PZU",
    "name": "Port Sudan",
    "city": "Port Sudan",
    "country": "Sudan",
    "lat": 19.434,
    "lng": 37.234,
    "runway": 3000
  },
  {
    "icao": "HSNN",
    "iata": "UYL",
    "name": "Nyala",
    "city": "Nyala",
    "country": "Sudan",
    "lat": 12.054,
    "lng": 24.956,
    "runway": 2700
  },
  {
    "icao": "HSFS",
    "iata": "ELF",
    "name": "El Fasher",
    "city": "El Fasher",
    "country": "Sudan",
    "lat": 13.615,
    "lng": 25.324,
    "runway": 2700
  },
  {
    "icao": "HSOB",
    "iata": "EBD",
    "name": "El Obeid",
    "city": "El Obeid",
    "country": "Sudan",
    "lat": 13.153,
    "lng": 30.233,
    "runway": 3000
  },
  {
    "icao": "HHAS",
    "iata": "ASM",
    "name": "Asmara",
    "city": "Asmara",
    "country": "Erytrea",
    "lat": 15.292,
    "lng": 38.91,
    "runway": 3100
  },
  {
    "icao": "HHMS",
    "iata": "MSW",
    "name": "Massawa",
    "city": "Massawa",
    "country": "Erytrea",
    "lat": 15.67,
    "lng": 39.371,
    "runway": 2800
  },
  {
    "icao": "HHSB",
    "iata": "ASA",
    "name": "Assab",
    "city": "Assab",
    "country": "Erytrea",
    "lat": 13.072,
    "lng": 42.645,
    "runway": 2800
  },
  {
    "icao": "OYSN",
    "iata": "SAH",
    "name": "Sana'a",
    "city": "Sana'a",
    "country": "Jemen",
    "lat": 15.477,
    "lng": 44.22,
    "runway": 3600
  },
  {
    "icao": "OYAA",
    "iata": "ADE",
    "name": "Aden",
    "city": "Aden",
    "country": "Jemen",
    "lat": 12.83,
    "lng": 45.029,
    "runway": 3050
  },
  {
    "icao": "OYSY",
    "iata": "GXF",
    "name": "Seiyun",
    "city": "Seiyun",
    "country": "Jemen",
    "lat": 15.966,
    "lng": 48.788,
    "runway": 3000
  },
  {
    "icao": "OYMK",
    "iata": "MKX",
    "name": "Mukalla",
    "city": "Mukalla",
    "country": "Jemen",
    "lat": 14.758,
    "lng": 49.376,
    "runway": 3000
  },
  {
    "icao": "OYSC",
    "iata": "SCT",
    "name": "Socotra",
    "city": "Socotra",
    "country": "Jemen",
    "lat": 12.631,
    "lng": 53.906,
    "runway": 3400
  },
  {
    "icao": "OYTZ",
    "iata": "TAI",
    "name": "Taiz",
    "city": "Taiz",
    "country": "Jemen",
    "lat": 13.686,
    "lng": 44.139,
    "runway": 3000
  },
  {
    "icao": "OOMS",
    "iata": "MCT",
    "name": "Muscat",
    "city": "Muscat",
    "country": "Oman",
    "lat": 23.594,
    "lng": 58.285,
    "runway": 4000
  },
  {
    "icao": "OOSA",
    "iata": "SLL",
    "name": "Salalah",
    "city": "Salalah",
    "country": "Oman",
    "lat": 17.039,
    "lng": 54.091,
    "runway": 4000
  },
  {
    "icao": "OODQ",
    "iata": "DQM",
    "name": "Duqm",
    "city": "Duqm",
    "country": "Oman",
    "lat": 19.501,
    "lng": 57.634,
    "runway": 4000
  },
  {
    "icao": "OOSH",
    "iata": "OHS",
    "name": "Sohar",
    "city": "Sohar",
    "country": "Oman",
    "lat": 24.386,
    "lng": 56.625,
    "runway": 4000
  },
  {
    "icao": "OOKB",
    "iata": "KHS",
    "name": "Khasab",
    "city": "Khasab",
    "country": "Oman",
    "lat": 26.171,
    "lng": 56.241,
    "runway": 2743
  },
  {
    "icao": "OEJN",
    "iata": "JED",
    "name": "King Abdulaziz",
    "city": "Jeddah",
    "country": "Arabia Saudyjska",
    "lat": 21.68,
    "lng": 39.157,
    "runway": 4000
  },
  {
    "icao": "OERK",
    "iata": "RUH",
    "name": "King Khalid",
    "city": "Riyadh",
    "country": "Arabia Saudyjska",
    "lat": 24.958,
    "lng": 46.699,
    "runway": 4206
  },
  {
    "icao": "OEDF",
    "iata": "DMM",
    "name": "King Fahd",
    "city": "Dammam",
    "country": "Arabia Saudyjska",
    "lat": 26.471,
    "lng": 49.798,
    "runway": 4000
  },
  {
    "icao": "OEMH",
    "iata": "MED",
    "name": "Prince Mohammad bin Abdulaziz",
    "city": "Medina",
    "country": "Arabia Saudyjska",
    "lat": 24.554,
    "lng": 39.705,
    "runway": 3800
  },
  {
    "icao": "OEAB",
    "iata": "ABT",
    "name": "King Abdullah bin Abdulaziz",
    "city": "Al Baha",
    "country": "Arabia Saudyjska",
    "lat": 20.296,
    "lng": 41.634,
    "runway": 2800
  },
  {
    "icao": "OEAB",
    "iata": "AHB",
    "name": "Abha",
    "city": "Abha",
    "country": "Arabia Saudyjska",
    "lat": 18.24,
    "lng": 42.657,
    "runway": 3600
  },
  {
    "icao": "OEHL",
    "iata": "HOF",
    "name": "Al-Ahsa",
    "city": "Al-Ahsa",
    "country": "Arabia Saudyjska",
    "lat": 25.285,
    "lng": 49.485,
    "runway": 3500
  },
  {
    "icao": "OEGS",
    "iata": "ELQ",
    "name": "Al-Qassim",
    "city": "Buraydah",
    "country": "Arabia Saudyjska",
    "lat": 26.303,
    "lng": 43.774,
    "runway": 4000
  },
  {
    "icao": "OEHL",
    "iata": "HAS",
    "name": "Hail",
    "city": "Hail",
    "country": "Arabia Saudyjska",
    "lat": 27.438,
    "lng": 41.686,
    "runway": 4000
  },
  {
    "icao": "OEGN",
    "iata": "GIZ",
    "name": "Jazan",
    "city": "Jizan",
    "country": "Arabia Saudyjska",
    "lat": 16.901,
    "lng": 42.586,
    "runway": 3200
  },
  {
    "icao": "OETB",
    "iata": "TUU",
    "name": "Tabuk",
    "city": "Tabuk",
    "country": "Arabia Saudyjska",
    "lat": 28.365,
    "lng": 36.619,
    "runway": 4000
  },
  {
    "icao": "OETF",
    "iata": "TIF",
    "name": "Taif",
    "city": "Taif",
    "country": "Arabia Saudyjska",
    "lat": 21.484,
    "lng": 40.544,
    "runway": 3800
  },
  {
    "icao": "OEYN",
    "iata": "YNB",
    "name": "Yanbu",
    "city": "Yanbu",
    "country": "Arabia Saudyjska",
    "lat": 24.144,
    "lng": 38.064,
    "runway": 3600
  },
  {
    "icao": "OMDB",
    "iata": "DXB",
    "name": "Dubai International",
    "city": "Dubai",
    "country": "ZEA",
    "lat": 25.252,
    "lng": 55.364,
    "runway": 4000
  },
  {
    "icao": "OMDW",
    "iata": "DWC",
    "name": "Al Maktoum",
    "city": "Dubai",
    "country": "ZEA",
    "lat": 24.897,
    "lng": 55.161,
    "runway": 4500
  },
  {
    "icao": "OMAA",
    "iata": "AUH",
    "name": "Abu Dhabi",
    "city": "Abu Dhabi",
    "country": "ZEA",
    "lat": 24.433,
    "lng": 54.651,
    "runway": 4100
  },
  {
    "icao": "OMSJ",
    "iata": "SHJ",
    "name": "Sharjah",
    "city": "Sharjah",
    "country": "ZEA",
    "lat": 25.329,
    "lng": 55.517,
    "runway": 4060
  },
  {
    "icao": "OMRK",
    "iata": "RKT",
    "name": "Ras Al Khaimah",
    "city": "Ras Al Khaimah",
    "country": "ZEA",
    "lat": 25.614,
    "lng": 55.939,
    "runway": 3005
  },
  {
    "icao": "OMFJ",
    "iata": "FJR",
    "name": "Fujairah",
    "city": "Fujairah",
    "country": "ZEA",
    "lat": 25.112,
    "lng": 56.324,
    "runway": 3300
  },
  {
    "icao": "OMAL",
    "iata": "AAN",
    "name": "Al Ain",
    "city": "Al Ain",
    "country": "ZEA",
    "lat": 24.262,
    "lng": 55.609,
    "runway": 4100
  },
  {
    "icao": "OKBK",
    "iata": "KWI",
    "name": "Kuwait International",
    "city": "Kuwait City",
    "country": "Kuwejt",
    "lat": 29.227,
    "lng": 47.969,
    "runway": 3400
  },
  {
    "icao": "ORBI",
    "iata": "BGW",
    "name": "Baghdad",
    "city": "Baghdad",
    "country": "Irak",
    "lat": 33.263,
    "lng": 44.235,
    "runway": 4000
  },
  {
    "icao": "ORER",
    "iata": "EBL",
    "name": "Erbil",
    "city": "Erbil",
    "country": "Irak",
    "lat": 36.238,
    "lng": 43.964,
    "runway": 4000
  },
  {
    "icao": "ORSU",
    "iata": "ISU",
    "name": "Sulaimaniyah",
    "city": "Sulaimaniyah",
    "country": "Irak",
    "lat": 35.561,
    "lng": 45.317,
    "runway": 2900
  },
  {
    "icao": "ORNJ",
    "iata": "NJF",
    "name": "Najaf",
    "city": "Najaf",
    "country": "Irak",
    "lat": 31.99,
    "lng": 44.404,
    "runway": 4000
  },
  {
    "icao": "ORMM",
    "iata": "BSR",
    "name": "Basra",
    "city": "Basra",
    "country": "Irak",
    "lat": 30.549,
    "lng": 47.662,
    "runway": 4000
  },
  {
    "icao": "ORBM",
    "iata": "OSM",
    "name": "Mosul",
    "city": "Mosul",
    "country": "Irak",
    "lat": 36.306,
    "lng": 43.145,
    "runway": 3900
  },
  {
    "icao": "OSDI",
    "iata": "DAM",
    "name": "Damascus",
    "city": "Damascus",
    "country": "Syria",
    "lat": 33.411,
    "lng": 36.516,
    "runway": 3700
  },
  {
    "icao": "OSAP",
    "iata": "ALP",
    "name": "Aleppo",
    "city": "Aleppo",
    "country": "Syria",
    "lat": 36.181,
    "lng": 37.225,
    "runway": 3500
  },
  {
    "icao": "OSLK",
    "iata": "LTK",
    "name": "Latakia",
    "city": "Latakia",
    "country": "Syria",
    "lat": 35.401,
    "lng": 35.949,
    "runway": 2800
  },
  {
    "icao": "OSAQ",
    "iata": "KAC",
    "name": "Al-Qamishli",
    "city": "Al-Qamishli",
    "country": "Syria",
    "lat": 37.02,
    "lng": 41.192,
    "runway": 2500
  },
  {
    "icao": "OLBA",
    "iata": "BEY",
    "name": "Beirut–Rafic Hariri",
    "city": "Beirut",
    "country": "Liban",
    "lat": 33.821,
    "lng": 35.489,
    "runway": 3400
  },
  {
    "icao": "OJAI",
    "iata": "AMM",
    "name": "Queen Alia",
    "city": "Amman",
    "country": "Jordania",
    "lat": 31.723,
    "lng": 35.994,
    "runway": 3660
  },
  {
    "icao": "OJAQ",
    "iata": "AQJ",
    "name": "King Hussein",
    "city": "Aqaba",
    "country": "Jordania",
    "lat": 29.611,
    "lng": 35.018,
    "runway": 3000
  },
  {
    "icao": "OJAM",
    "iata": "ADJ",
    "name": "Amman Civil",
    "city": "Amman",
    "country": "Jordania",
    "lat": 31.973,
    "lng": 35.988,
    "runway": 2500
  },
  {
    "icao": "LLBG",
    "iata": "TLV",
    "name": "Ben Gurion",
    "city": "Tel Aviv",
    "country": "Izrael",
    "lat": 32.011,
    "lng": 34.887,
    "runway": 3900
  },
  {
    "icao": "LLIB",
    "iata": "ETH",
    "name": "Ramon",
    "city": "Eilat",
    "country": "Izrael",
    "lat": 29.723,
    "lng": 35.013,
    "runway": 3500
  },
  {
    "icao": "LLHA",
    "iata": "HFA",
    "name": "Haifa",
    "city": "Haifa",
    "country": "Izrael",
    "lat": 32.809,
    "lng": 35.043,
    "runway": 1826
  },
  {
    "icao": "HDAM",
    "iata": "JIB",
    "name": "Djibouti–Ambouli",
    "city": "Djibouti",
    "country": "Dżibuti",
    "lat": 11.547,
    "lng": 43.16,
    "runway": 3300
  },
  {
    "icao": "HAAB",
    "iata": "ADD",
    "name": "Addis Ababa Bole",
    "city": "Addis Ababa",
    "country": "Etiopia",
    "lat": 8.978,
    "lng": 38.799,
    "runway": 3800
  },
  {
    "icao": "HADR",
    "iata": "DIR",
    "name": "Dire Dawa",
    "city": "Dire Dawa",
    "country": "Etiopia",
    "lat": 9.625,
    "lng": 41.854,
    "runway": 3300
  },
  {
    "icao": "HABD",
    "iata": "BJR",
    "name": "Bahir Dar",
    "city": "Bahir Dar",
    "country": "Etiopia",
    "lat": 11.608,
    "lng": 37.322,
    "runway": 3100
  },
  {
    "icao": "HAGN",
    "iata": "GDQ",
    "name": "Gondar",
    "city": "Gondar",
    "country": "Etiopia",
    "lat": 12.52,
    "lng": 37.434,
    "runway": 2700
  },
  {
    "icao": "HAMK",
    "iata": "MQX",
    "name": "Mekele",
    "city": "Mekele",
    "country": "Etiopia",
    "lat": 13.474,
    "lng": 39.534,
    "runway": 3400
  },
  {
    "icao": "HALL",
    "iata": "LLI",
    "name": "Lalibela",
    "city": "Lalibela",
    "country": "Etiopia",
    "lat": 11.975,
    "lng": 38.98,
    "runway": 2200
  },
  {
    "icao": "HAAM",
    "iata": "AMH",
    "name": "Arba Minch",
    "city": "Arba Minch",
    "country": "Etiopia",
    "lat": 6.039,
    "lng": 37.59,
    "runway": 2460
  },
  {
    "icao": "HCMM",
    "iata": "MGQ",
    "name": "Aden Adde",
    "city": "Mogadishu",
    "country": "Somalia",
    "lat": 2.015,
    "lng": 45.305,
    "runway": 3300
  },
  {
    "icao": "HCMH",
    "iata": "HGA",
    "name": "Hargeisa",
    "city": "Hargeisa",
    "country": "Somalia",
    "lat": 9.518,
    "lng": 44.089,
    "runway": 3400
  },
  {
    "icao": "HCMR",
    "iata": "GGR",
    "name": "Garowe",
    "city": "Garowe",
    "country": "Somalia",
    "lat": 8.405,
    "lng": 48.572,
    "runway": 2200
  },
  {
    "icao": "HCMF",
    "iata": "BSY",
    "name": "Bosaso",
    "city": "Bosaso",
    "country": "Somalia",
    "lat": 11.275,
    "lng": 49.15,
    "runway": 2700
  },
  {
    "icao": "HCMK",
    "iata": "KMU",
    "name": "Kismayo",
    "city": "Kismayo",
    "country": "Somalia",
    "lat": -0.378,
    "lng": 42.46,
    "runway": 2800
  },
  {
    "icao": "HKJK",
    "iata": "NBO",
    "name": "Jomo Kenyatta",
    "city": "Nairobi",
    "country": "Kenia",
    "lat": -1.319,
    "lng": 36.927,
    "runway": 4117
  },
  {
    "icao": "HKMO",
    "iata": "MBA",
    "name": "Moi",
    "city": "Mombasa",
    "country": "Kenia",
    "lat": -4.035,
    "lng": 39.594,
    "runway": 3000
  },
  {
    "icao": "HKKI",
    "iata": "KIS",
    "name": "Kisumu",
    "city": "Kisumu",
    "country": "Kenia",
    "lat": -0.086,
    "lng": 34.729,
    "runway": 2580
  },
  {
    "icao": "HKEL",
    "iata": "EDL",
    "name": "Eldoret",
    "city": "Eldoret",
    "country": "Kenia",
    "lat": 0.405,
    "lng": 35.239,
    "runway": 4575
  },
  {
    "icao": "HKNW",
    "iata": "WIL",
    "name": "Wilson",
    "city": "Nairobi",
    "country": "Kenia",
    "lat": -1.322,
    "lng": 36.815,
    "runway": 1792
  },
  {
    "icao": "HKML",
    "iata": "MYD",
    "name": "Malindi",
    "city": "Malindi",
    "country": "Kenia",
    "lat": -3.229,
    "lng": 40.101,
    "runway": 1786
  },
  {
    "icao": "HKUK",
    "iata": "UKA",
    "name": "Ukunda",
    "city": "Ukunda",
    "country": "Kenia",
    "lat": -4.294,
    "lng": 39.571,
    "runway": 1350
  },
  {
    "icao": "HUEN",
    "iata": "EBB",
    "name": "Entebbe",
    "city": "Entebbe",
    "country": "Uganda",
    "lat": 0.042,
    "lng": 32.443,
    "runway": 3658
  },
  {
    "icao": "HJJJ",
    "iata": "JUB",
    "name": "Juba",
    "city": "Juba",
    "country": "Sudan Południowy",
    "lat": 4.872,
    "lng": 31.601,
    "runway": 3600
  },
  {
    "icao": "HSSM",
    "iata": "MAK",
    "name": "Malakal",
    "city": "Malakal",
    "country": "Sudan Południowy",
    "lat": 9.559,
    "lng": 31.653,
    "runway": 1994
  },
  {
    "icao": "HSWW",
    "iata": "WUU",
    "name": "Wau",
    "city": "Wau",
    "country": "Sudan Południowy",
    "lat": 7.726,
    "lng": 28.001,
    "runway": 2300
  },
  {
    "icao": "FEFF",
    "iata": "BGF",
    "name": "Bangui M'Poko",
    "city": "Bangui",
    "country": "Rep. Środkowoafrykańska",
    "lat": 4.398,
    "lng": 18.519,
    "runway": 2600
  },
  {
    "icao": "FKKD",
    "iata": "DLA",
    "name": "Douala",
    "city": "Douala",
    "country": "Kamerun",
    "lat": 4.007,
    "lng": 9.72,
    "runway": 2700
  },
  {
    "icao": "FKYS",
    "iata": "NSI",
    "name": "Yaoundé Nsimalen",
    "city": "Yaoundé",
    "country": "Kamerun",
    "lat": 3.722,
    "lng": 11.553,
    "runway": 3200
  },
  {
    "icao": "FKKR",
    "iata": "GOU",
    "name": "Garoua",
    "city": "Garoua",
    "country": "Kamerun",
    "lat": 9.336,
    "lng": 13.37,
    "runway": 2800
  },
  {
    "icao": "FKKL",
    "iata": "MVR",
    "name": "Maroua Salak",
    "city": "Maroua",
    "country": "Kamerun",
    "lat": 10.452,
    "lng": 14.258,
    "runway": 2400
  },
  {
    "icao": "FKKN",
    "iata": "NGE",
    "name": "Ngaoundéré",
    "city": "Ngaoundéré",
    "country": "Kamerun",
    "lat": 7.357,
    "lng": 13.56,
    "runway": 3600
  },
  {
    "icao": "DNMM",
    "iata": "LOS",
    "name": "Murtala Muhammed",
    "city": "Lagos",
    "country": "Nigeria",
    "lat": 6.577,
    "lng": 3.321,
    "runway": 3900
  },
  {
    "icao": "DNAA",
    "iata": "ABV",
    "name": "Nnamdi Azikiwe",
    "city": "Abuja",
    "country": "Nigeria",
    "lat": 9.007,
    "lng": 7.263,
    "runway": 3600
  },
  {
    "icao": "DNKN",
    "iata": "KAN",
    "name": "Mallam Aminu Kano",
    "city": "Kano",
    "country": "Nigeria",
    "lat": 12.047,
    "lng": 8.525,
    "runway": 3600
  },
  {
    "icao": "DNPO",
    "iata": "PHC",
    "name": "Port Harcourt",
    "city": "Port Harcourt",
    "country": "Nigeria",
    "lat": 5.016,
    "lng": 6.95,
    "runway": 3100
  },
  {
    "icao": "DNEN",
    "iata": "ENU",
    "name": "Akanu Ibiam",
    "city": "Enugu",
    "country": "Nigeria",
    "lat": 6.474,
    "lng": 7.562,
    "runway": 3200
  },
  {
    "icao": "DNKA",
    "iata": "KAD",
    "name": "Kaduna",
    "city": "Kaduna",
    "country": "Nigeria",
    "lat": 10.696,
    "lng": 7.321,
    "runway": 3600
  },
  {
    "icao": "DNBE",
    "iata": "BNI",
    "name": "Benin City",
    "city": "Benin City",
    "country": "Nigeria",
    "lat": 6.317,
    "lng": 5.6,
    "runway": 2438
  },
  {
    "icao": "DNAS",
    "iata": "ABB",
    "name": "Asaba",
    "city": "Asaba",
    "country": "Nigeria",
    "lat": 6.204,
    "lng": 6.665,
    "runway": 3500
  },
  {
    "icao": "DBBB",
    "iata": "COO",
    "name": "Cotonou Cadjehoun",
    "city": "Cotonou",
    "country": "Benin",
    "lat": 6.357,
    "lng": 2.385,
    "runway": 2400
  },
  {
    "icao": "DXXX",
    "iata": "LFW",
    "name": "Lomé–Tokoin",
    "city": "Lomé",
    "country": "Togo",
    "lat": 6.166,
    "lng": 1.255,
    "runway": 2990
  },
  {
    "icao": "DGAA",
    "iata": "ACC",
    "name": "Kotoka",
    "city": "Accra",
    "country": "Ghana",
    "lat": 5.605,
    "lng": -0.167,
    "runway": 3400
  },
  {
    "icao": "DGSI",
    "iata": "KMS",
    "name": "Kumasi",
    "city": "Kumasi",
    "country": "Ghana",
    "lat": 6.715,
    "lng": -1.591,
    "runway": 2000
  },
  {
    "icao": "DGLE",
    "iata": "TML",
    "name": "Tamale",
    "city": "Tamale",
    "country": "Ghana",
    "lat": 9.557,
    "lng": -0.864,
    "runway": 2500
  },
  {
    "icao": "DGTK",
    "iata": "TKD",
    "name": "Takoradi",
    "city": "Takoradi",
    "country": "Ghana",
    "lat": 4.896,
    "lng": -1.774,
    "runway": 2000
  },
  {
    "icao": "DIAP",
    "iata": "ABJ",
    "name": "Félix-Houphouët-Boigny",
    "city": "Abidjan",
    "country": "Wybrzeże Kości Słoniowej",
    "lat": 5.262,
    "lng": -3.926,
    "runway": 3000
  },
  {
    "icao": "DIBK",
    "iata": "BYK",
    "name": "Bouaké",
    "city": "Bouaké",
    "country": "Wybrzeże Kości Słoniowej",
    "lat": 7.739,
    "lng": -5.074,
    "runway": 2500
  },
  {
    "icao": "DIKO",
    "iata": "HGO",
    "name": "Korhogo",
    "city": "Korhogo",
    "country": "Wybrzeże Kości Słoniowej",
    "lat": 9.387,
    "lng": -5.557,
    "runway": 2500
  },
  {
    "icao": "DISP",
    "iata": "SPY",
    "name": "San Pédro",
    "city": "San Pédro",
    "country": "Wybrzeże Kości Słoniowej",
    "lat": 4.746,
    "lng": -6.661,
    "runway": 2400
  },
  {
    "icao": "DIMN",
    "iata": "MJC",
    "name": "Man",
    "city": "Man",
    "country": "Wybrzeże Kości Słoniowej",
    "lat": 7.273,
    "lng": -7.588,
    "runway": 2400
  },
  {
    "icao": "GLRB",
    "iata": "ROB",
    "name": "Roberts",
    "city": "Monrovia",
    "country": "Liberia",
    "lat": 6.234,
    "lng": -10.363,
    "runway": 3050
  },
  {
    "icao": "GLMR",
    "iata": "MLW",
    "name": "James Spriggs Payne",
    "city": "Monrovia",
    "country": "Liberia",
    "lat": 6.289,
    "lng": -10.759,
    "runway": 1707
  },
  {
    "icao": "GFLL",
    "iata": "FNA",
    "name": "Freetown International",
    "city": "Freetown",
    "country": "Sierra Leone",
    "lat": 8.617,
    "lng": -13.195,
    "runway": 3048
  },
  {
    "icao": "GUCY",
    "iata": "CKY",
    "name": "Ahmed Sékou Touré",
    "city": "Conakry",
    "country": "Gwinea",
    "lat": 9.577,
    "lng": -13.612,
    "runway": 3300
  },
  {
    "icao": "GGOV",
    "iata": "OXB",
    "name": "Osvaldo Vieira",
    "city": "Bissau",
    "country": "Gwinea Bissau",
    "lat": 11.895,
    "lng": -15.654,
    "runway": 2400
  },
  {
    "icao": "GBYD",
    "iata": "BJL",
    "name": "Banjul International",
    "city": "Banjul",
    "country": "Gambia",
    "lat": 13.338,
    "lng": -16.652,
    "runway": 3600
  },
  {
    "icao": "GOBD",
    "iata": "DSS",
    "name": "Blaise Diagne",
    "city": "Dakar",
    "country": "Senegal",
    "lat": 14.67,
    "lng": -17.073,
    "runway": 3900
  },
  {
    "icao": "GOSS",
    "iata": "DKR",
    "name": "Léopold Sédar Senghor",
    "city": "Dakar",
    "country": "Senegal",
    "lat": 14.74,
    "lng": -17.492,
    "runway": 3326
  },
  {
    "icao": "GOGS",
    "iata": "ZIG",
    "name": "Ziguinchor",
    "city": "Ziguinchor",
    "country": "Senegal",
    "lat": 12.556,
    "lng": -16.282,
    "runway": 1550
  },
  {
    "icao": "GOOK",
    "iata": "CSK",
    "name": "Cap Skirring",
    "city": "Cap Skirring",
    "country": "Senegal",
    "lat": 12.4,
    "lng": -16.748,
    "runway": 1700
  },
  {
    "icao": "FGSL",
    "iata": "SSG",
    "name": "Malabo",
    "city": "Malabo",
    "country": "Gwinea Równikowa",
    "lat": 3.756,
    "lng": 8.709,
    "runway": 2800
  },
  {
    "icao": "FGBT",
    "iata": "BSG",
    "name": "Bata",
    "city": "Bata",
    "country": "Gwinea Równikowa",
    "lat": 1.905,
    "lng": 9.806,
    "runway": 2400
  },
  {
    "icao": "FOOL",
    "iata": "LBV",
    "name": "Libreville Leon M'ba",
    "city": "Libreville",
    "country": "Gabon",
    "lat": 0.459,
    "lng": 9.413,
    "runway": 3100
  },
  {
    "icao": "FOGR",
    "iata": "POG",
    "name": "Port-Gentil",
    "city": "Port-Gentil",
    "country": "Gabon",
    "lat": -0.712,
    "lng": 8.754,
    "runway": 2400
  },
  {
    "icao": "FOOG",
    "iata": "MVB",
    "name": "Franceville",
    "city": "Franceville",
    "country": "Gabon",
    "lat": -1.656,
    "lng": 13.438,
    "runway": 3100
  },
  {
    "icao": "FCBB",
    "iata": "BZV",
    "name": "Maya-Maya",
    "city": "Brazzaville",
    "country": "Kongo",
    "lat": -4.252,
    "lng": 15.253,
    "runway": 3200
  },
  {
    "icao": "FCPP",
    "iata": "PNR",
    "name": "Pointe-Noire",
    "city": "Pointe-Noire",
    "country": "Kongo",
    "lat": -4.816,
    "lng": 11.887,
    "runway": 2700
  },
  {
    "icao": "FZAA",
    "iata": "FIH",
    "name": "N'djili",
    "city": "Kinshasa",
    "country": "DR Konga",
    "lat": -4.386,
    "lng": 15.445,
    "runway": 4648
  },
  {
    "icao": "FZQA",
    "iata": "FBM",
    "name": "Lubumbashi",
    "city": "Lubumbashi",
    "country": "DR Konga",
    "lat": -11.591,
    "lng": 27.531,
    "runway": 3660
  },
  {
    "icao": "FZNA",
    "iata": "GOM",
    "name": "Goma",
    "city": "Goma",
    "country": "DR Konga",
    "lat": -1.671,
    "lng": 29.238,
    "runway": 3000
  },
  {
    "icao": "FZIC",
    "iata": "FKI",
    "name": "Kisangani Bangoka",
    "city": "Kisangani",
    "country": "DR Konga",
    "lat": 0.482,
    "lng": 25.338,
    "runway": 2960
  },
  {
    "icao": "HRYR",
    "iata": "KGL",
    "name": "Kigali",
    "city": "Kigali",
    "country": "Rwanda",
    "lat": -1.969,
    "lng": 30.139,
    "runway": 4200
  },
  {
    "icao": "HRYG",
    "iata": "KME",
    "name": "Kamembe",
    "city": "Kamembe",
    "country": "Rwanda",
    "lat": -2.462,
    "lng": 28.908,
    "runway": 1800
  },
  {
    "icao": "HBBE",
    "iata": "BJM",
    "name": "Melchior Ndadaye",
    "city": "Bujumbura",
    "country": "Burundi",
    "lat": -3.324,
    "lng": 29.319,
    "runway": 3600
  },
  {
    "icao": "HTDA",
    "iata": "DAR",
    "name": "Julius Nyerere",
    "city": "Dar es Salaam",
    "country": "Tanzania",
    "lat": -6.878,
    "lng": 39.203,
    "runway": 3600
  },
  {
    "icao": "HTKJ",
    "iata": "JRO",
    "name": "Kilimanjaro",
    "city": "Arusha",
    "country": "Tanzania",
    "lat": -3.43,
    "lng": 37.074,
    "runway": 3600
  },
  {
    "icao": "HTZA",
    "iata": "ZNZ",
    "name": "Abeid Amani Karume",
    "city": "Zanzibar",
    "country": "Tanzania",
    "lat": -6.22,
    "lng": 39.225,
    "runway": 3200
  },
  {
    "icao": "HTMW",
    "iata": "MWZ",
    "name": "Mwanza",
    "city": "Mwanza",
    "country": "Tanzania",
    "lat": -2.445,
    "lng": 32.933,
    "runway": 2900
  },
  {
    "icao": "HTAR",
    "iata": "ARK",
    "name": "Arusha",
    "city": "Arusha",
    "country": "Tanzania",
    "lat": -3.368,
    "lng": 36.633,
    "runway": 1650
  },
  {
    "icao": "FWKI",
    "iata": "LLW",
    "name": "Lilongwe",
    "city": "Lilongwe",
    "country": "Malawi",
    "lat": -13.789,
    "lng": 33.78,
    "runway": 3600
  },
  {
    "icao": "FWCL",
    "iata": "BLZ",
    "name": "Chileka",
    "city": "Blantyre",
    "country": "Malawi",
    "lat": -15.679,
    "lng": 34.974,
    "runway": 2500
  },
  {
    "icao": "FQMA",
    "iata": "MPM",
    "name": "Maputo",
    "city": "Maputo",
    "country": "Mozambik",
    "lat": -25.921,
    "lng": 32.573,
    "runway": 3600
  },
  {
    "icao": "FQBR",
    "iata": "BEW",
    "name": "Beira",
    "city": "Beira",
    "country": "Mozambik",
    "lat": -19.797,
    "lng": 34.908,
    "runway": 2546
  },
  {
    "icao": "FQNP",
    "iata": "APL",
    "name": "Nampula",
    "city": "Nampula",
    "country": "Mozambik",
    "lat": -15.106,
    "lng": 39.282,
    "runway": 2400
  },
  {
    "icao": "FQPB",
    "iata": "POL",
    "name": "Pemba",
    "city": "Pemba",
    "country": "Mozambik",
    "lat": -12.992,
    "lng": 40.522,
    "runway": 2400
  },
  {
    "icao": "FQTT",
    "iata": "TET",
    "name": "Tete",
    "city": "Tete",
    "country": "Mozambik",
    "lat": -16.105,
    "lng": 33.641,
    "runway": 2600
  },
  {
    "icao": "FQVL",
    "iata": "VNX",
    "name": "Vilankulo",
    "city": "Vilankulo",
    "country": "Mozambik",
    "lat": -22.018,
    "lng": 35.313,
    "runway": 2100
  },
  {
    "icao": "FLLS",
    "iata": "LUN",
    "name": "Kenneth Kaunda",
    "city": "Lusaka",
    "country": "Zambia",
    "lat": -15.331,
    "lng": 28.452,
    "runway": 3960
  },
  {
    "icao": "FLND",
    "iata": "NLA",
    "name": "Harry Mwanga Nkumbula",
    "city": "Livingstone",
    "country": "Zambia",
    "lat": -17.822,
    "lng": 25.823,
    "runway": 2800
  },
  {
    "icao": "FLNZ",
    "iata": "ZKB",
    "name": "Simon Mwansa Kapwepwe",
    "city": "Ndola",
    "country": "Zambia",
    "lat": -12.999,
    "lng": 28.665,
    "runway": 3600
  },
  {
    "icao": "FLMF",
    "iata": "MFU",
    "name": "Mfuwe",
    "city": "Mfuwe",
    "country": "Zambia",
    "lat": -13.259,
    "lng": 31.937,
    "runway": 2400
  },
  {
    "icao": "FVHA",
    "iata": "HRE",
    "name": "Robert Gabriel Mugabe",
    "city": "Harare",
    "country": "Zimbabwe",
    "lat": -17.932,
    "lng": 31.093,
    "runway": 4725
  },
  {
    "icao": "FVFA",
    "iata": "VFA",
    "name": "Victoria Falls",
    "city": "Victoria Falls",
    "country": "Zimbabwe",
    "lat": -18.096,
    "lng": 25.839,
    "runway": 2750
  },
  {
    "icao": "FVBU",
    "iata": "BUQ",
    "name": "Joshua Mqabuko Nkomo",
    "city": "Bulawayo",
    "country": "Zimbabwe",
    "lat": -20.017,
    "lng": 28.618,
    "runway": 4700
  },
  {
    "icao": "FBSK",
    "iata": "GBE",
    "name": "Sir Seretse Khama",
    "city": "Gaborone",
    "country": "Botswana",
    "lat": -24.555,
    "lng": 25.918,
    "runway": 3500
  },
  {
    "icao": "FBMN",
    "iata": "MUB",
    "name": "Maun",
    "city": "Maun",
    "country": "Botswana",
    "lat": -19.973,
    "lng": 23.431,
    "runway": 2300
  },
  {
    "icao": "FBKE",
    "iata": "BBK",
    "name": "Kasane",
    "city": "Kasane",
    "country": "Botswana",
    "lat": -17.833,
    "lng": 25.162,
    "runway": 2100
  },
  {
    "icao": "FBFT",
    "iata": "FRW",
    "name": "Francistown",
    "city": "Francistown",
    "country": "Botswana",
    "lat": -21.16,
    "lng": 27.475,
    "runway": 2900
  },
  {
    "icao": "FYWH",
    "iata": "WDH",
    "name": "Hosea Kutako",
    "city": "Windhoek",
    "country": "Namibia",
    "lat": -22.48,
    "lng": 17.471,
    "runway": 4800
  },
  {
    "icao": "FYWE",
    "iata": "ERS",
    "name": "Eros",
    "city": "Windhoek",
    "country": "Namibia",
    "lat": -22.612,
    "lng": 17.081,
    "runway": 2050
  },
  {
    "icao": "FYWB",
    "iata": "WVB",
    "name": "Walvis Bay",
    "city": "Walvis Bay",
    "country": "Namibia",
    "lat": -22.999,
    "lng": 14.645,
    "runway": 3050
  },
  {
    "icao": "FYLZ",
    "iata": "LUD",
    "name": "Luderitz",
    "city": "Luderitz",
    "country": "Namibia",
    "lat": -26.688,
    "lng": 15.244,
    "runway": 1500
  },
  {
    "icao": "FNLU",
    "iata": "LAD",
    "name": "Quatro de Fevereiro",
    "city": "Luanda",
    "country": "Angola",
    "lat": -8.858,
    "lng": 13.231,
    "runway": 3702
  },
  {
    "icao": "FNHU",
    "iata": "NOV",
    "name": "Mukanka",
    "city": "Huambo",
    "country": "Angola",
    "lat": -12.809,
    "lng": 15.761,
    "runway": 3950
  },
  {
    "icao": "FNLB",
    "iata": "LAD",
    "name": "Catumbela",
    "city": "Benguela",
    "country": "Angola",
    "lat": -12.479,
    "lng": 13.487,
    "runway": 3850
  },
  {
    "icao": "FNUA",
    "iata": "UAL",
    "name": "Luau",
    "city": "Luau",
    "country": "Angola",
    "lat": -10.717,
    "lng": 22.232,
    "runway": 2400
  },
  {
    "icao": "FNSO",
    "iata": "SZA",
    "name": "Soyo",
    "city": "Soyo",
    "country": "Angola",
    "lat": -6.141,
    "lng": 12.372,
    "runway": 3300
  },
  {
    "icao": "FMMI",
    "iata": "TNR",
    "name": "Ivato",
    "city": "Antananarivo",
    "country": "Madagaskar",
    "lat": -18.797,
    "lng": 47.479,
    "runway": 3100
  },
  {
    "icao": "FMNS",
    "iata": "NOS",
    "name": "Fascene",
    "city": "Nosy Be",
    "country": "Madagaskar",
    "lat": -13.312,
    "lng": 48.315,
    "runway": 2100
  },
  {
    "icao": "FMNA",
    "iata": "MJN",
    "name": "Amborovy",
    "city": "Mahajanga",
    "country": "Madagaskar",
    "lat": -15.667,
    "lng": 46.352,
    "runway": 2800
  },
  {
    "icao": "FMST",
    "iata": "TMM",
    "name": "Toamasina",
    "city": "Toamasina",
    "country": "Madagaskar",
    "lat": -18.11,
    "lng": 49.395,
    "runway": 2100
  },
  {
    "icao": "FMTU",
    "iata": "TLE",
    "name": "Tuléar",
    "city": "Toliara",
    "country": "Madagaskar",
    "lat": -23.383,
    "lng": 43.728,
    "runway": 2490
  },
  {
    "icao": "FMSD",
    "iata": "FTU",
    "name": "Fort Dauphin",
    "city": "Tôlanaro",
    "country": "Madagaskar",
    "lat": -25.038,
    "lng": 46.956,
    "runway": 2200
  },
  {
    "icao": "FDSK",
    "iata": "SHO",
    "name": "King Mswati III",
    "city": "Manzini",
    "country": "Eswatini",
    "lat": -26.359,
    "lng": 31.717,
    "runway": 3400
  },
  {
    "icao": "FXMM",
    "iata": "MSU",
    "name": "Moshoeshoe I",
    "city": "Maseru",
    "country": "Lesotho",
    "lat": -29.463,
    "lng": 27.553,
    "runway": 3200
  },
  {
    "icao": "FAOR",
    "iata": "JNB",
    "name": "O.R. Tambo",
    "city": "Johannesburg",
    "country": "RPA",
    "lat": -26.133,
    "lng": 28.242,
    "runway": 4418
  },
  {
    "icao": "FACT",
    "iata": "CPT",
    "name": "Cape Town",
    "city": "Cape Town",
    "country": "RPA",
    "lat": -33.965,
    "lng": 18.602,
    "runway": 3201
  },
  {
    "icao": "FALE",
    "iata": "DUR",
    "name": "King Shaka",
    "city": "Durban",
    "country": "RPA",
    "lat": -29.614,
    "lng": 31.12,
    "runway": 3800
  },
  {
    "icao": "FAPE",
    "iata": "PLZ",
    "name": "Chief Dawid Stuurman",
    "city": "Port Elizabeth",
    "country": "RPA",
    "lat": -33.985,
    "lng": 25.617,
    "runway": 3065
  },
  {
    "icao": "FABM",
    "iata": "BFN",
    "name": "Bram Fischer",
    "city": "Bloemfontein",
    "country": "RPA",
    "lat": -29.093,
    "lng": 26.302,
    "runway": 3400
  },
  {
    "icao": "FAKN",
    "iata": "MQP",
    "name": "Kruger Mpumalanga",
    "city": "Nelspruit",
    "country": "RPA",
    "lat": -25.384,
    "lng": 31.106,
    "runway": 3500
  },
  {
    "icao": "FAEL",
    "iata": "ELS",
    "name": "East London",
    "city": "East London",
    "country": "RPA",
    "lat": -33.036,
    "lng": 27.826,
    "runway": 2590
  },
  {
    "icao": "FAGG",
    "iata": "GRJ",
    "name": "George",
    "city": "George",
    "country": "RPA",
    "lat": -34.006,
    "lng": 22.379,
    "runway": 2660
  },
  {
    "icao": "FAPTM",
    "iata": "PTG",
    "name": "Polokwane",
    "city": "Polokwane",
    "country": "RPA",
    "lat": -23.845,
    "lng": 29.459,
    "runway": 4900
  }
];
_newAirports.forEach(function(a){ if(!ADB.some(function(x){return x.icao===a.icao;})) ADB.push(a); });
}
