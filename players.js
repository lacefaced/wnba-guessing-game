const allPlayers = [
  {
    "id": "3149391",
    "name": "A'ja Wilson",
    "team": "Las Vegas Aces",
    "position": "C",
    "jersey": "22",
    "ppg": 26.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3149391.png"
  },
  {
    "id": "3142191",
    "name": "Kelsey Mitchell",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "0",
    "ppg": 24.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142191.png"
  },
  {
    "id": "4433403",
    "name": "Caitlin Clark",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "22",
    "ppg": 22.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433403.png"
  },
  {
    "id": "2998938",
    "name": "Kahleah Copper",
    "team": "Phoenix Mercury",
    "position": "G",
    "jersey": "2",
    "ppg": 20.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2998938.png"
  },
  {
    "id": "2998928",
    "name": "Breanna Stewart",
    "team": "New York Liberty",
    "position": "F",
    "jersey": "30",
    "ppg": 20.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2998928.png"
  },
  {
    "id": "3904576",
    "name": "Marina Mabrey",
    "team": "Toronto Tempo",
    "position": "G",
    "jersey": "3",
    "ppg": 20.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3904576.png"
  },
  {
    "id": "4433730",
    "name": "Paige Bueckers",
    "team": "Dallas Wings",
    "position": "G",
    "jersey": "5",
    "ppg": 20.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433730.png"
  },
  {
    "id": "4433791",
    "name": "Olivia Miles",
    "team": "Minnesota Lynx",
    "position": "G",
    "jersey": "5",
    "ppg": 19.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433791.png"
  },
  {
    "id": "3058901",
    "name": "Allisha Gray",
    "team": "Atlanta Dream",
    "position": "G",
    "jersey": "15",
    "ppg": 19.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3058901.png"
  },
  {
    "id": "4065870",
    "name": "Jackie Young",
    "team": "Las Vegas Aces",
    "position": "G",
    "jersey": "0",
    "ppg": 18.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4065870.png"
  },
  {
    "id": "4398674",
    "name": "Rhyne Howard",
    "team": "Atlanta Dream",
    "position": "G",
    "jersey": "10",
    "ppg": 18.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398674.png"
  },
  {
    "id": "2529205",
    "name": "Kayla McBride",
    "team": "Minnesota Lynx",
    "position": "G",
    "jersey": "21",
    "ppg": 18.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529205.png"
  },
  {
    "id": "4432831",
    "name": "Aliyah Boston",
    "team": "Indiana Fever",
    "position": "C",
    "jersey": "7",
    "ppg": 17.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4432831.png"
  },
  {
    "id": "5220150",
    "name": "Dominique Malonga",
    "team": "Seattle Storm",
    "position": "C",
    "jersey": "14",
    "ppg": 17.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5220150.png"
  },
  {
    "id": "4398911",
    "name": "Shakira Austin",
    "team": "Washington Mystics",
    "position": "C",
    "jersey": "0",
    "ppg": 16.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398911.png"
  },
  {
    "id": "4433524",
    "name": "Sonia Citron",
    "team": "Washington Mystics",
    "position": "G",
    "jersey": "22",
    "ppg": 16.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433524.png"
  },
  {
    "id": "1068",
    "name": "Nneka Ogwumike",
    "team": "Los Angeles Sparks",
    "position": "F",
    "jersey": "30",
    "ppg": 16.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/1068.png"
  },
  {
    "id": "4433402",
    "name": "Angel Reese",
    "team": "Atlanta Dream",
    "position": "F",
    "jersey": "5",
    "ppg": 16.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433402.png"
  },
  {
    "id": "5208982",
    "name": "Carla Leite",
    "team": "Portland Fire",
    "position": "G",
    "jersey": "0",
    "ppg": 15.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5208982.png"
  },
  {
    "id": "3906753",
    "name": "Natisha Hiedeman",
    "team": "Seattle Storm",
    "position": "G",
    "jersey": "2",
    "ppg": 15.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3906753.png"
  },
  {
    "id": "4898384",
    "name": "Kiki Iriafen",
    "team": "Washington Mystics",
    "position": "F",
    "jersey": "44",
    "ppg": 15.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4898384.png"
  },
  {
    "id": "3904577",
    "name": "Arike Ogunbowale",
    "team": "Dallas Wings",
    "position": "G",
    "jersey": "24",
    "ppg": 15.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3904577.png"
  },
  {
    "id": "2529130",
    "name": "Natasha Howard",
    "team": "Minnesota Lynx",
    "position": "F",
    "jersey": "1",
    "ppg": 15.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529130.png"
  },
  {
    "id": "4433405",
    "name": "Kamilla Cardoso",
    "team": "Chicago Sky",
    "position": "C",
    "jersey": "10",
    "ppg": 14.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433405.png"
  },
  {
    "id": "2566106",
    "name": "Dearica Hamby",
    "team": "Los Angeles Sparks",
    "position": "F",
    "jersey": "5",
    "ppg": 14.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2566106.png"
  },
  {
    "id": "2529140",
    "name": "Alyssa Thomas",
    "team": "Phoenix Mercury",
    "position": "F",
    "jersey": "25",
    "ppg": 14.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529140.png"
  },
  {
    "id": "2999101",
    "name": "Jonquel Jones",
    "team": "New York Liberty",
    "position": "C",
    "jersey": "35",
    "ppg": 14.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2999101.png"
  },
  {
    "id": "3906972",
    "name": "Bridget Carleton",
    "team": "Portland Fire",
    "position": "F",
    "jersey": "6",
    "ppg": 14.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3906972.png"
  },
  {
    "id": "3906949",
    "name": "Jessica Shepard",
    "team": "Dallas Wings",
    "position": "F",
    "jersey": "32",
    "ppg": 14.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3906949.png"
  },
  {
    "id": "4398764",
    "name": "Rae Burrell",
    "team": "Los Angeles Sparks",
    "position": "G",
    "jersey": "12",
    "ppg": 14.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398764.png"
  },
  {
    "id": "2987891",
    "name": "Courtney Williams",
    "team": "Minnesota Lynx",
    "position": "G",
    "jersey": "10",
    "ppg": 14.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2987891.png"
  },
  {
    "id": "3142328",
    "name": "Gabby Williams",
    "team": "Golden State Valkyries",
    "position": "F",
    "jersey": "1",
    "ppg": 14.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142328.png"
  },
  {
    "id": "4698736",
    "name": "Flau'jae Johnson",
    "team": "Seattle Storm",
    "position": "G",
    "jersey": "4",
    "ppg": 13.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4698736.png"
  },
  {
    "id": "4594786",
    "name": "Sydney Taylor",
    "team": "Chicago Sky",
    "position": "G",
    "jersey": "12",
    "ppg": 13.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4594786.png"
  },
  {
    "id": "3934218",
    "name": "Megan DiLeo",
    "team": "Portland Fire",
    "position": "C",
    "jersey": "17",
    "ppg": 13.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3934218.png"
  },
  {
    "id": "4433790",
    "name": "Azzi Fudd",
    "team": "Dallas Wings",
    "position": "G",
    "jersey": "35",
    "ppg": 13.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433790.png"
  },
  {
    "id": "4790264",
    "name": "Janelle Salaun",
    "team": "Golden State Valkyries",
    "position": "F",
    "jersey": "13",
    "ppg": 13.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4790264.png"
  },
  {
    "id": "4398935",
    "name": "Veronica Burton",
    "team": "Golden State Valkyries",
    "position": "G",
    "jersey": "22",
    "ppg": 12.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398935.png"
  },
  {
    "id": "2529122",
    "name": "Chelsea Gray",
    "team": "Las Vegas Aces",
    "position": "G",
    "jersey": "12",
    "ppg": 12.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529122.png"
  },
  {
    "id": "4398776",
    "name": "NaLyssa Smith",
    "team": "Las Vegas Aces",
    "position": "F",
    "jersey": "3",
    "ppg": 11.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398776.png"
  },
  {
    "id": "5208981",
    "name": "Leila Lacan",
    "team": "Connecticut Sun",
    "position": "G",
    "jersey": "47",
    "ppg": 11.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5208981.png"
  },
  {
    "id": "3142250",
    "name": "Jordin Canada",
    "team": "Atlanta Dream",
    "position": "G",
    "jersey": "3",
    "ppg": 11.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142250.png"
  },
  {
    "id": "2529137",
    "name": "Natasha Cloud",
    "team": "Chicago Sky",
    "position": "G",
    "jersey": "9",
    "ppg": 11.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529137.png"
  },
  {
    "id": "4684384",
    "name": "Aneesah Morrow",
    "team": "Toronto Tempo",
    "position": "F",
    "jersey": "24",
    "ppg": 11.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4684384.png"
  },
  {
    "id": "3142010",
    "name": "Azura Stevens",
    "team": "Chicago Sky",
    "position": "F",
    "jersey": "30",
    "ppg": 10.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142010.png"
  },
  {
    "id": "869",
    "name": "DeWanna Bonner",
    "team": "Atlanta Dream",
    "position": "F",
    "jersey": "24",
    "ppg": 10.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/869.png"
  },
  {
    "id": "5345325",
    "name": "Awa Fam",
    "team": "Seattle Storm",
    "position": "C",
    "jersey": "11",
    "ppg": 10.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345325.png"
  },
  {
    "id": "5345444",
    "name": "Laura Juskaite",
    "team": "Toronto Tempo",
    "position": "F",
    "jersey": "2",
    "ppg": 10.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345444.png"
  },
  {
    "id": "4398966",
    "name": "Olivia Nelson-Ododa",
    "team": "Connecticut Sun",
    "position": "C",
    "jersey": "10",
    "ppg": 10.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398966.png"
  },
  {
    "id": "5017726",
    "name": "Jade Melbourne",
    "team": "Seattle Storm",
    "position": "G",
    "jersey": "5",
    "ppg": 9.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5017726.png"
  },
  {
    "id": "4398729",
    "name": "Emily Engstler",
    "team": "Portland Fire",
    "position": "F",
    "jersey": "21",
    "ppg": 9.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398729.png"
  },
  {
    "id": "4433635",
    "name": "Diamond Miller",
    "team": "Connecticut Sun",
    "position": "F",
    "jersey": "1",
    "ppg": 9.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433635.png"
  },
  {
    "id": "4433404",
    "name": "Cameron Brink",
    "team": "Los Angeles Sparks",
    "position": "F",
    "jersey": "22",
    "ppg": 9.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433404.png"
  },
  {
    "id": "5345320",
    "name": "Pauline Astier",
    "team": "New York Liberty",
    "position": "G",
    "jersey": "18",
    "ppg": 9.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345320.png"
  },
  {
    "id": "4398915",
    "name": "Naz Hillmon",
    "team": "Atlanta Dream",
    "position": "F",
    "jersey": "00",
    "ppg": 9.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398915.png"
  },
  {
    "id": "4282173",
    "name": "Michaela Onyenwere",
    "team": "Washington Mystics",
    "position": "F",
    "jersey": "12",
    "ppg": 9.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4282173.png"
  },
  {
    "id": "2491214",
    "name": "Erica Wheeler",
    "team": "Los Angeles Sparks",
    "position": "G",
    "jersey": "17",
    "ppg": 9.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2491214.png"
  },
  {
    "id": "4038379",
    "name": "Marine Johannes",
    "team": "New York Liberty",
    "position": "G",
    "jersey": "23",
    "ppg": 9.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4038379.png"
  },
  {
    "id": "3910470",
    "name": "Maria Conde",
    "team": "Toronto Tempo",
    "position": "F",
    "jersey": "10",
    "ppg": 8.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3910470.png"
  },
  {
    "id": "3922628",
    "name": "Kennedy Burke",
    "team": "Connecticut Sun",
    "position": "G",
    "jersey": "25",
    "ppg": 8.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3922628.png"
  },
  {
    "id": "3146151",
    "name": "Ariel Atkins",
    "team": "Los Angeles Sparks",
    "position": "G",
    "jersey": "7",
    "ppg": 8.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3146151.png"
  },
  {
    "id": "1054",
    "name": "Tiffany Hayes",
    "team": "Golden State Valkyries",
    "position": "G",
    "jersey": "15",
    "ppg": 8.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/1054.png"
  },
  {
    "id": "4257500",
    "name": "Cecilia Zandalasini",
    "team": "Golden State Valkyries",
    "position": "F",
    "jersey": "24",
    "ppg": 8.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4257500.png"
  },
  {
    "id": "3907781",
    "name": "Sophie Cunningham",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "8",
    "ppg": 8.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3907781.png"
  },
  {
    "id": "4068042",
    "name": "Natasha Mack",
    "team": "Phoenix Mercury",
    "position": "F",
    "jersey": "4",
    "ppg": 8.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4068042.png"
  },
  {
    "id": "2529622",
    "name": "Kayla Thornton",
    "team": "Golden State Valkyries",
    "position": "F",
    "jersey": "5",
    "ppg": 7.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529622.png"
  },
  {
    "id": "2987869",
    "name": "Jewell Loyd",
    "team": "Las Vegas Aces",
    "position": "G",
    "jersey": "24",
    "ppg": 7.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2987869.png"
  },
  {
    "id": "4432832",
    "name": "Zia Cooke",
    "team": "Seattle Storm",
    "position": "G",
    "jersey": "7",
    "ppg": 7.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4432832.png"
  },
  {
    "id": "4433514",
    "name": "Saniya Rivers",
    "team": "Connecticut Sun",
    "position": "G",
    "jersey": "22",
    "ppg": 7.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433514.png"
  },
  {
    "id": "3142255",
    "name": "Monique Billings",
    "team": "Indiana Fever",
    "position": "F",
    "jersey": "25",
    "ppg": 7.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142255.png"
  },
  {
    "id": "4703609",
    "name": "Charlisse Leger-Walker",
    "team": "Connecticut Sun",
    "position": "G",
    "jersey": "4",
    "ppg": 6.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4703609.png"
  },
  {
    "id": "4899328",
    "name": "Kaitlyn Chen",
    "team": "Golden State Valkyries",
    "position": "G",
    "jersey": "2",
    "ppg": 6.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4899328.png"
  },
  {
    "id": "4583144",
    "name": "Cotie McMahon",
    "team": "Washington Mystics",
    "position": "G",
    "jersey": "23",
    "ppg": 6.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4583144.png"
  },
  {
    "id": "4858656",
    "name": "Gabriela Jaquez",
    "team": "Chicago Sky",
    "position": "G",
    "jersey": "11",
    "ppg": 6.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4858656.png"
  },
  {
    "id": "3054590",
    "name": "Nia Coffey",
    "team": "Minnesota Lynx",
    "position": "F",
    "jersey": "12",
    "ppg": 6.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3054590.png"
  },
  {
    "id": "3919496",
    "name": "Valeriane Ayayi",
    "team": "Phoenix Mercury",
    "position": "F",
    "jersey": "11",
    "ppg": 6.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3919496.png"
  },
  {
    "id": "4432865",
    "name": "Jacy Sheldon",
    "team": "Chicago Sky",
    "position": "G",
    "jersey": "0",
    "ppg": 6.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4432865.png"
  },
  {
    "id": "5105737",
    "name": "Lauren Betts",
    "team": "Washington Mystics",
    "position": "C",
    "jersey": "51",
    "ppg": 6.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105737.png"
  },
  {
    "id": "4337216",
    "name": "Han Xu",
    "team": "New York Liberty",
    "position": "C",
    "jersey": "21",
    "ppg": 6.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4337216.png"
  },
  {
    "id": "5105406",
    "name": "Frieda Buhner",
    "team": "Portland Fire",
    "position": "F",
    "jersey": "20",
    "ppg": 6.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105406.png"
  },
  {
    "id": "4001679",
    "name": "Julie Allemand",
    "team": "Toronto Tempo",
    "position": "G",
    "jersey": "22",
    "ppg": 6.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4001679.png"
  },
  {
    "id": "4399415",
    "name": "Maddy Siegrist",
    "team": "Dallas Wings",
    "position": "F",
    "jersey": "20",
    "ppg": 6.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4399415.png"
  },
  {
    "id": "4433807",
    "name": "Aziaha James",
    "team": "Dallas Wings",
    "position": "G",
    "jersey": "10",
    "ppg": 6.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433807.png"
  },
  {
    "id": "4790266",
    "name": "Awak Kuier",
    "team": "Dallas Wings",
    "position": "F",
    "jersey": "34",
    "ppg": 6.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4790266.png"
  },
  {
    "id": "3913881",
    "name": "Alanna Smith",
    "team": "Dallas Wings",
    "position": "F",
    "jersey": "8",
    "ppg": 6.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3913881.png"
  },
  {
    "id": "4065780",
    "name": "Kaila Charles",
    "team": "Golden State Valkyries",
    "position": "G",
    "jersey": "6",
    "ppg": 6.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4065780.png"
  },
  {
    "id": "5345524",
    "name": "Noemie Brochant",
    "team": "Phoenix Mercury",
    "position": "F",
    "jersey": "1",
    "ppg": 6.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345524.png"
  },
  {
    "id": "4704180",
    "name": "Georgia Amoore",
    "team": "Washington Mystics",
    "position": "G",
    "jersey": "8",
    "ppg": 6.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4704180.png"
  },
  {
    "id": "5108587",
    "name": "Madina Okot",
    "team": "Atlanta Dream",
    "position": "C",
    "jersey": "11",
    "ppg": 5.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5108587.png"
  },
  {
    "id": "5346554",
    "name": "Teja Oblak",
    "team": "Portland Fire",
    "position": "G",
    "jersey": "7",
    "ppg": 5.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5346554.png"
  },
  {
    "id": "4433546",
    "name": "Makayla Timpson",
    "team": "Indiana Fever",
    "position": "F",
    "jersey": "21",
    "ppg": 5.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433546.png"
  },
  {
    "id": "3142327",
    "name": "Kia Nurse",
    "team": "Toronto Tempo",
    "position": "G",
    "jersey": "11",
    "ppg": 5.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142327.png"
  },
  {
    "id": "4398829",
    "name": "Lexie Hull",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "10",
    "ppg": 5.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398829.png"
  },
  {
    "id": "2566081",
    "name": "Elizabeth Williams",
    "team": "Chicago Sky",
    "position": "C",
    "jersey": "1",
    "ppg": 5.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2566081.png"
  },
  {
    "id": "2327695",
    "name": "Rebekah Gardner",
    "team": "New York Liberty",
    "position": "G",
    "jersey": "7",
    "ppg": 5.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2327695.png"
  },
  {
    "id": "2529047",
    "name": "Odyssey Sims",
    "team": "Dallas Wings",
    "position": "G",
    "jersey": "1",
    "ppg": 4.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529047.png"
  },
  {
    "id": "4432830",
    "name": "Jordan Horston",
    "team": "Seattle Storm",
    "position": "F",
    "jersey": "23",
    "ppg": 4.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4432830.png"
  },
  {
    "id": "5208983",
    "name": "Isobel Borlase",
    "team": "Atlanta Dream",
    "position": "G",
    "jersey": "20",
    "ppg": 4.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5208983.png"
  },
  {
    "id": "2566186",
    "name": "Rachel Banham",
    "team": "Chicago Sky",
    "position": "G",
    "jersey": "24",
    "ppg": 4.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2566186.png"
  },
  {
    "id": "4399342",
    "name": "Lexi Held",
    "team": "Phoenix Mercury",
    "position": "G",
    "jersey": "10",
    "ppg": 4.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4399342.png"
  },
  {
    "id": "3917453",
    "name": "Katie Lou Samuelson",
    "team": "Seattle Storm",
    "position": "F",
    "jersey": "33",
    "ppg": 4.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3917453.png"
  },
  {
    "id": "5108550",
    "name": "Serah Williams",
    "team": "Portland Fire",
    "position": "C",
    "jersey": "25",
    "ppg": 4.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5108550.png"
  },
  {
    "id": "4065760",
    "name": "Tyasha Harris",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "52",
    "ppg": 4.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4065760.png"
  },
  {
    "id": "4280850",
    "name": "Maya Caldwell",
    "team": "Minnesota Lynx",
    "position": "G",
    "jersey": "3",
    "ppg": 4.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4280850.png"
  },
  {
    "id": "5345319",
    "name": "Nell Angloma",
    "team": "Connecticut Sun",
    "position": "F",
    "jersey": "33",
    "ppg": 3.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345319.png"
  },
  {
    "id": "3142055",
    "name": "Myisha Hines-Allen",
    "team": "Indiana Fever",
    "position": "F",
    "jersey": "2",
    "ppg": 3.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142055.png"
  },
  {
    "id": "5209202",
    "name": "Nyadiew Puoch",
    "team": "Portland Fire",
    "position": "F",
    "jersey": "13",
    "ppg": 3.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5209202.png"
  },
  {
    "id": "4433431",
    "name": "Te-Hina Paopao",
    "team": "Atlanta Dream",
    "position": "G",
    "jersey": "2",
    "ppg": 3.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433431.png"
  },
  {
    "id": "2590093",
    "name": "Kiah Stokes",
    "team": "Golden State Valkyries",
    "position": "C",
    "jersey": "41",
    "ppg": 3.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2590093.png"
  },
  {
    "id": "5278237",
    "name": "Anastasiia Olairi Kosu",
    "team": "Minnesota Lynx",
    "position": "F",
    "jersey": "7",
    "ppg": 3.7,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5278237.png"
  },
  {
    "id": "5105732",
    "name": "Raegan Beers",
    "team": "Connecticut Sun",
    "position": "F",
    "jersey": "15",
    "ppg": 3.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105732.png"
  },
  {
    "id": "3099736",
    "name": "Stephanie Talbot",
    "team": "Las Vegas Aces",
    "position": "F",
    "jersey": "7",
    "ppg": 3.5,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3099736.png"
  },
  {
    "id": "4336633",
    "name": "Li Yueru",
    "team": "Dallas Wings",
    "position": "C",
    "jersey": "28",
    "ppg": 3.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4336633.png"
  },
  {
    "id": "4432834",
    "name": "Laeticia Amihere",
    "team": "Golden State Valkyries",
    "position": "F",
    "jersey": "3",
    "ppg": 3.4,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4432834.png"
  },
  {
    "id": "2529183",
    "name": "Stefanie Dolson",
    "team": "Seattle Storm",
    "position": "C",
    "jersey": "31",
    "ppg": 3.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529183.png"
  },
  {
    "id": "5349415",
    "name": "Alicia Florez",
    "team": "Washington Mystics",
    "position": "G",
    "jersey": "2",
    "ppg": 3.3,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5349415.png"
  },
  {
    "id": "4433797",
    "name": "Raven Johnson",
    "team": "Indiana Fever",
    "position": "G",
    "jersey": "3",
    "ppg": 3.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433797.png"
  },
  {
    "id": "4898898",
    "name": "Gianna Kneepkens",
    "team": "Connecticut Sun",
    "position": "G",
    "jersey": "5",
    "ppg": 2.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4898898.png"
  },
  {
    "id": "5105729",
    "name": "Chance Gray",
    "team": "Los Angeles Sparks",
    "position": "G",
    "jersey": "2",
    "ppg": 2.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105729.png"
  },
  {
    "id": "4873358",
    "name": "Antonia Delaere",
    "team": "Minnesota Lynx",
    "position": "F",
    "jersey": "8",
    "ppg": 2.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4873358.png"
  },
  {
    "id": "4433411",
    "name": "Angela Dugalic",
    "team": "Washington Mystics",
    "position": "F",
    "jersey": "32",
    "ppg": 2.9,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433411.png"
  },
  {
    "id": "4874375",
    "name": "Jihyun Park",
    "team": "Los Angeles Sparks",
    "position": "F",
    "jersey": "6",
    "ppg": 2.2,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4874375.png"
  },
  {
    "id": "5122345",
    "name": "Cassandre Prosper",
    "team": "Washington Mystics",
    "position": "G",
    "jersey": "18",
    "ppg": 2.1,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5122345.png"
  },
  {
    "id": "5017721",
    "name": "Sika Kone",
    "team": "Atlanta Dream",
    "position": "F",
    "jersey": "23",
    "ppg": 1.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5017721.png"
  },
  {
    "id": "4434020",
    "name": "Teonni Key",
    "team": "Toronto Tempo",
    "position": "F",
    "jersey": "7",
    "ppg": 1.8,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4434020.png"
  },
  {
    "id": "3142086",
    "name": "Brianna Turner",
    "team": "Las Vegas Aces",
    "position": "F",
    "jersey": "21",
    "ppg": 1.6,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142086.png"
  },
  {
    "id": "3058895",
    "name": "Brionna Jones",
    "team": "Atlanta Dream",
    "position": "Player",
    "jersey": "42",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3058895.png"
  },
  {
    "id": "5105740",
    "name": "Indya Nivar",
    "team": "Atlanta Dream",
    "position": "Player",
    "jersey": "21",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105740.png"
  },
  {
    "id": "3058893",
    "name": "Shatori Walker-Kimbrough",
    "team": "Atlanta Dream",
    "position": "Player",
    "jersey": "33",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3058893.png"
  },
  {
    "id": "4066548",
    "name": "DiJonai Carrington",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "7",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4066548.png"
  },
  {
    "id": "4433433",
    "name": "Aicha Coulibaly",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "35",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433433.png"
  },
  {
    "id": "2491205",
    "name": "Skylar Diggins",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "4",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2491205.png"
  },
  {
    "id": "4433630",
    "name": "Rickea Jackson",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433630.png"
  },
  {
    "id": "4599199",
    "name": "Morgan Maly",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4599199.png"
  },
  {
    "id": "981",
    "name": "Courtney Vandersloot",
    "team": "Chicago Sky",
    "position": "Player",
    "jersey": "22",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/981.png"
  },
  {
    "id": "4433408",
    "name": "Aaliyah Edwards",
    "team": "Connecticut Sun",
    "position": "Player",
    "jersey": "8",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433408.png"
  },
  {
    "id": "2490553",
    "name": "Brittney Griner",
    "team": "Connecticut Sun",
    "position": "Player",
    "jersey": "42",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2490553.png"
  },
  {
    "id": "5106232",
    "name": "Ashlon Jackson",
    "team": "Connecticut Sun",
    "position": "Player",
    "jersey": "3",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5106232.png"
  },
  {
    "id": "4433792",
    "name": "Rayah Marshall",
    "team": "Connecticut Sun",
    "position": "Player",
    "jersey": "13",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433792.png"
  },
  {
    "id": "4433412",
    "name": "Hailey Van Lith",
    "team": "Connecticut Sun",
    "position": "Player",
    "jersey": "2",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433412.png"
  },
  {
    "id": "924",
    "name": "Alysha Clark",
    "team": "Dallas Wings",
    "position": "Player",
    "jersey": "7",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/924.png"
  },
  {
    "id": "4595910",
    "name": "Haley Jones",
    "team": "Dallas Wings",
    "position": "Player",
    "jersey": "30",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4595910.png"
  },
  {
    "id": "4068159",
    "name": "Sug Sutton",
    "team": "Dallas Wings",
    "position": "Player",
    "jersey": "0",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4068159.png"
  },
  {
    "id": "5345473",
    "name": "Costanza Verona",
    "team": "Dallas Wings",
    "position": "Player",
    "jersey": "6",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345473.png"
  },
  {
    "id": "4398965",
    "name": "Christyn Williams",
    "team": "Dallas Wings",
    "position": "Player",
    "jersey": "31",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398965.png"
  },
  {
    "id": "4066546",
    "name": "Nadia Fingall",
    "team": "Golden State Valkyries",
    "position": "Player",
    "jersey": "45",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4066546.png"
  },
  {
    "id": "5277552",
    "name": "Juste Jocyte",
    "team": "Golden State Valkyries",
    "position": "Player",
    "jersey": "4",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5277552.png"
  },
  {
    "id": "4433634",
    "name": "Ashten Prechtel",
    "team": "Golden State Valkyries",
    "position": "Player",
    "jersey": "11",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433634.png"
  },
  {
    "id": "4790263",
    "name": "Iliana Rupert",
    "team": "Golden State Valkyries",
    "position": "Player",
    "jersey": "12",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4790263.png"
  },
  {
    "id": "4398577",
    "name": "Miela Sowah",
    "team": "Golden State Valkyries",
    "position": "Player",
    "jersey": "7",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398577.png"
  },
  {
    "id": "4898383",
    "name": "Bree Hall",
    "team": "Indiana Fever",
    "position": "Player",
    "jersey": "23",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4898383.png"
  },
  {
    "id": "4433744",
    "name": "Michelle Onyiah",
    "team": "Indiana Fever",
    "position": "Player",
    "jersey": "1",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433744.png"
  },
  {
    "id": "3056672",
    "name": "Mercedes Russell",
    "team": "Indiana Fever",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3056672.png"
  },
  {
    "id": "5105731",
    "name": "Grace VanSlooten",
    "team": "Indiana Fever",
    "position": "Player",
    "jersey": "14",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105731.png"
  },
  {
    "id": "4433633",
    "name": "Kierstan Bell",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "1",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433633.png"
  },
  {
    "id": "4281190",
    "name": "Dana Evans",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "11",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4281190.png"
  },
  {
    "id": "4609797",
    "name": "Ta'Niya Latson",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4609797.png"
  },
  {
    "id": "2529458",
    "name": "Cheyenne Parker-Tyus",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "32",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2529458.png"
  },
  {
    "id": "4682855",
    "name": "Justine Pissott",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "13",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4682855.png"
  },
  {
    "id": "5220104",
    "name": "Mai Yamamoto",
    "team": "Las Vegas Aces",
    "position": "Player",
    "jersey": "18",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5220104.png"
  },
  {
    "id": "5274110",
    "name": "Monique Akoa Makani",
    "team": "Los Angeles Sparks",
    "position": "Player",
    "jersey": "1",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5274110.png"
  },
  {
    "id": "2284331",
    "name": "Emma Cannon",
    "team": "Los Angeles Sparks",
    "position": "Player",
    "jersey": "32",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2284331.png"
  },
  {
    "id": "4398907",
    "name": "Kate Martin",
    "team": "Los Angeles Sparks",
    "position": "Player",
    "jersey": "21",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398907.png"
  },
  {
    "id": "4565515",
    "name": "Tonie Morgan",
    "team": "Los Angeles Sparks",
    "position": "Player",
    "jersey": "4",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4565515.png"
  },
  {
    "id": "5105752",
    "name": "Alissa Pili",
    "team": "Los Angeles Sparks",
    "position": "Player",
    "jersey": "35",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5105752.png"
  },
  {
    "id": "4280877",
    "name": "Chloe Bibby",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "55",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4280877.png"
  },
  {
    "id": "5208984",
    "name": "Elena Buenavida",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5208984.png"
  },
  {
    "id": "3917450",
    "name": "Napheesa Collier",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "24",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3917450.png"
  },
  {
    "id": "5345478",
    "name": "Eliska Joklova",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "11",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5345478.png"
  },
  {
    "id": "4398938",
    "name": "Dorka Juhasz",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "14",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398938.png"
  },
  {
    "id": "4596309",
    "name": "Liatu King",
    "team": "Minnesota Lynx",
    "position": "Player",
    "jersey": "2",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4596309.png"
  },
  {
    "id": "3102133",
    "name": "Rebecca Allen",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "9",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3102133.png"
  },
  {
    "id": "4398589",
    "name": "Elizabeth Balogun",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398589.png"
  },
  {
    "id": "4790258",
    "name": "Raquel Carrera",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "14",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4790258.png"
  },
  {
    "id": "4790260",
    "name": "Marine Fauthoux",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "4",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4790260.png"
  },
  {
    "id": "4683006",
    "name": "Leonie Fiebich",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "13",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4683006.png"
  },
  {
    "id": "4066533",
    "name": "Sabrina Ionescu",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "20",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4066533.png"
  },
  {
    "id": "4281930",
    "name": "Anneli Maley",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "24",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4281930.png"
  },
  {
    "id": "4281929",
    "name": "Satou Sabally",
    "team": "New York Liberty",
    "position": "Player",
    "jersey": "0",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4281929.png"
  },
  {
    "id": "4688629",
    "name": "Shay Ciezki",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4688629.png"
  },
  {
    "id": "4698730",
    "name": "Kara Dunn",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "12",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4698730.png"
  },
  {
    "id": "4873359",
    "name": "Kyara Linskens",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "31",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4873359.png"
  },
  {
    "id": "3906769",
    "name": "Jovana Nogic",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "29",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3906769.png"
  },
  {
    "id": "3065570",
    "name": "Kelsey Plum",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "0",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3065570.png"
  },
  {
    "id": "4433542",
    "name": "Saylor Poffenbarger",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "6",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433542.png"
  },
  {
    "id": "4704594",
    "name": "Marta Suarez",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "77",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4704594.png"
  },
  {
    "id": "4433424",
    "name": "Maddy Westbeld",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "21",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433424.png"
  },
  {
    "id": "887",
    "name": "Sami Whitcomb",
    "team": "Phoenix Mercury",
    "position": "Player",
    "jersey": "33",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/887.png"
  },
  {
    "id": "4703794",
    "name": "Sarah Ashlee Barker",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "3",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4703794.png"
  },
  {
    "id": "4433795",
    "name": "Sania Feagin",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "1",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433795.png"
  },
  {
    "id": "4682797",
    "name": "Luisa Geiselsoder",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "15",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4682797.png"
  },
  {
    "id": "5108051",
    "name": "Jordan Harrison",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "2",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5108051.png"
  },
  {
    "id": "3142242",
    "name": "Amy Okonkwo",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "8",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3142242.png"
  },
  {
    "id": "3056730",
    "name": "Karlie Samuelson",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "44",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/3056730.png"
  },
  {
    "id": "4433690",
    "name": "Holly Winterburn",
    "team": "Portland Fire",
    "position": "Player",
    "jersey": "77",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433690.png"
  },
  {
    "id": "4433643",
    "name": "Mackenzie Holmes",
    "team": "Seattle Storm",
    "position": "Player",
    "jersey": "54",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433643.png"
  },
  {
    "id": "4420318",
    "name": "Ezi Magbegor",
    "team": "Seattle Storm",
    "position": "Player",
    "jersey": "13",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4420318.png"
  },
  {
    "id": "5106222",
    "name": "Taina Mair",
    "team": "Seattle Storm",
    "position": "Player",
    "jersey": "22",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5106222.png"
  },
  {
    "id": "4898400",
    "name": "Taylor Thierry",
    "team": "Seattle Storm",
    "position": "Player",
    "jersey": "3",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4898400.png"
  },
  {
    "id": "5364343",
    "name": "Ornella Bankole",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "33",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5364343.png"
  },
  {
    "id": "2569044",
    "name": "Temi Fagbenle",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "14",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2569044.png"
  },
  {
    "id": "4398766",
    "name": "Zaay Green",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "00",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398766.png"
  },
  {
    "id": "2566453",
    "name": "Isabelle Harrison",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "21",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2566453.png"
  },
  {
    "id": "4565505",
    "name": "Kiki Rice",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "1",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4565505.png"
  },
  {
    "id": "4398768",
    "name": "Nyara Sabally",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "8",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4398768.png"
  },
  {
    "id": "2988756",
    "name": "Brittney Sykes",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "20",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2988756.png"
  },
  {
    "id": "4282168",
    "name": "Kiana Williams",
    "team": "Toronto Tempo",
    "position": "Player",
    "jersey": "",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4282168.png"
  },
  {
    "id": "4433523",
    "name": "Rori Harmon",
    "team": "Washington Mystics",
    "position": "Player",
    "jersey": "3",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433523.png"
  },
  {
    "id": "2593770",
    "name": "Betnijah Laney-Hamilton",
    "team": "Washington Mystics",
    "position": "Player",
    "jersey": "4",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/2593770.png"
  },
  {
    "id": "5106145",
    "name": "Darianna Littlepage-Buggs",
    "team": "Washington Mystics",
    "position": "Player",
    "jersey": "5",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/5106145.png"
  },
  {
    "id": "4433815",
    "name": "Lucy Olsen",
    "team": "Washington Mystics",
    "position": "Player",
    "jersey": "33",
    "ppg": 0.0,
    "headshot": "https://a.espncdn.com/i/headshots/wnba/players/full/4433815.png"
  }
];
