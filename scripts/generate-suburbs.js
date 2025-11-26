/**
 * Sydney Suburb Generator
 * Generates JSON files for 600+ Sydney suburbs
 * Run with: node scripts/generate-suburbs.js
 */

const fs = require('fs');
const path = require('path');

// Comprehensive Sydney suburb data organized by region
const sydneySuburbs = {
  "inner-city": [
    { name: "Sydney", postcode: "2000", lat: -33.8688, lng: 151.2093, population: 17000 },
    { name: "Surry Hills", postcode: "2010", lat: -33.8830, lng: 151.2113, population: 15000 },
    { name: "Darlinghurst", postcode: "2010", lat: -33.8779, lng: 151.2178, population: 10500 },
    { name: "Potts Point", postcode: "2011", lat: -33.8690, lng: 151.2260, population: 6000 },
    { name: "Woolloomooloo", postcode: "2011", lat: -33.8700, lng: 151.2220, population: 4000 },
    { name: "Pyrmont", postcode: "2009", lat: -33.8700, lng: 151.1950, population: 14000 },
    { name: "Ultimo", postcode: "2007", lat: -33.8780, lng: 151.1980, population: 9000 },
    { name: "Haymarket", postcode: "2000", lat: -33.8810, lng: 151.2050, population: 8000 },
    { name: "Chippendale", postcode: "2008", lat: -33.8870, lng: 151.1990, population: 6500 },
    { name: "Redfern", postcode: "2016", lat: -33.8930, lng: 151.2050, population: 13000 },
    { name: "Waterloo", postcode: "2017", lat: -33.9000, lng: 151.2080, population: 15000 },
    { name: "Zetland", postcode: "2017", lat: -33.9060, lng: 151.2100, population: 12000 },
    { name: "Alexandria", postcode: "2015", lat: -33.9100, lng: 151.1950, population: 11000 },
    { name: "Erskineville", postcode: "2043", lat: -33.9020, lng: 151.1860, population: 9000 },
    { name: "Newtown", postcode: "2042", lat: -33.8970, lng: 151.1790, population: 15000 },
    { name: "Camperdown", postcode: "2050", lat: -33.8890, lng: 151.1770, population: 5500 },
    { name: "Glebe", postcode: "2037", lat: -33.8790, lng: 151.1870, population: 12500 },
    { name: "Forest Lodge", postcode: "2037", lat: -33.8820, lng: 151.1810, population: 3500 },
    { name: "Annandale", postcode: "2038", lat: -33.8810, lng: 151.1700, population: 9500 },
    { name: "Stanmore", postcode: "2048", lat: -33.8940, lng: 151.1640, population: 7500 },
    { name: "Enmore", postcode: "2042", lat: -33.9000, lng: 151.1730, population: 6000 },
    { name: "Marrickville", postcode: "2204", lat: -33.9110, lng: 151.1550, population: 27000 },
    { name: "St Peters", postcode: "2044", lat: -33.9170, lng: 151.1780, population: 4000 },
    { name: "Tempe", postcode: "2044", lat: -33.9250, lng: 151.1630, population: 4500 },
    { name: "Sydenham", postcode: "2044", lat: -33.9170, lng: 151.1680, population: 3000 },
    { name: "Rosebery", postcode: "2018", lat: -33.9180, lng: 151.2050, population: 12000 },
    { name: "Mascot", postcode: "2020", lat: -33.9260, lng: 151.1930, population: 16000 },
    { name: "Beaconsfield", postcode: "2015", lat: -33.9130, lng: 151.1990, population: 2500 },
    { name: "Eveleigh", postcode: "2015", lat: -33.8960, lng: 151.1930, population: 1500 },
    { name: "Darlington", postcode: "2008", lat: -33.8910, lng: 151.1950, population: 3500 },
  ],
  "eastern-suburbs": [
    { name: "Bondi", postcode: "2026", lat: -33.8910, lng: 151.2740, population: 11000 },
    { name: "Bondi Beach", postcode: "2026", lat: -33.8900, lng: 151.2780, population: 9000 },
    { name: "Bondi Junction", postcode: "2022", lat: -33.8920, lng: 151.2470, population: 10500 },
    { name: "Tamarama", postcode: "2026", lat: -33.8980, lng: 151.2720, population: 1800 },
    { name: "Bronte", postcode: "2024", lat: -33.9040, lng: 151.2660, population: 7000 },
    { name: "Clovelly", postcode: "2031", lat: -33.9130, lng: 151.2610, population: 5000 },
    { name: "Coogee", postcode: "2034", lat: -33.9210, lng: 151.2580, population: 15000 },
    { name: "Randwick", postcode: "2031", lat: -33.9140, lng: 151.2420, population: 29000 },
    { name: "Kensington", postcode: "2033", lat: -33.9210, lng: 151.2260, population: 10500 },
    { name: "Kingsford", postcode: "2032", lat: -33.9240, lng: 151.2280, population: 14000 },
    { name: "Maroubra", postcode: "2035", lat: -33.9450, lng: 151.2410, population: 30000 },
    { name: "Maroubra Junction", postcode: "2035", lat: -33.9400, lng: 151.2350, population: 5000 },
    { name: "South Coogee", postcode: "2034", lat: -33.9300, lng: 151.2550, population: 3500 },
    { name: "Malabar", postcode: "2036", lat: -33.9620, lng: 151.2480, population: 4000 },
    { name: "Chifley", postcode: "2036", lat: -33.9690, lng: 151.2420, population: 2500 },
    { name: "La Perouse", postcode: "2036", lat: -33.9870, lng: 151.2330, population: 1200 },
    { name: "Little Bay", postcode: "2036", lat: -33.9780, lng: 151.2420, population: 3500 },
    { name: "Paddington", postcode: "2021", lat: -33.8840, lng: 151.2260, population: 12000 },
    { name: "Woollahra", postcode: "2025", lat: -33.8870, lng: 151.2440, population: 8500 },
    { name: "Double Bay", postcode: "2028", lat: -33.8770, lng: 151.2430, population: 5500 },
    { name: "Point Piper", postcode: "2027", lat: -33.8650, lng: 151.2560, population: 1800 },
    { name: "Rose Bay", postcode: "2029", lat: -33.8720, lng: 151.2680, population: 10000 },
    { name: "Vaucluse", postcode: "2030", lat: -33.8570, lng: 151.2780, population: 9500 },
    { name: "Watsons Bay", postcode: "2030", lat: -33.8440, lng: 151.2830, population: 1100 },
    { name: "Dover Heights", postcode: "2030", lat: -33.8700, lng: 151.2800, population: 5500 },
    { name: "North Bondi", postcode: "2026", lat: -33.8830, lng: 151.2790, population: 5000 },
    { name: "Bellevue Hill", postcode: "2023", lat: -33.8850, lng: 151.2570, population: 10500 },
    { name: "Edgecliff", postcode: "2027", lat: -33.8790, lng: 151.2370, population: 3500 },
    { name: "Darling Point", postcode: "2027", lat: -33.8680, lng: 151.2400, population: 3000 },
    { name: "Centennial Park", postcode: "2021", lat: -33.8960, lng: 151.2320, population: 2500 },
    { name: "Queens Park", postcode: "2022", lat: -33.9000, lng: 151.2480, population: 3800 },
    { name: "Waverley", postcode: "2024", lat: -33.8980, lng: 151.2570, population: 7500 },
  ],
  "inner-west": [
    { name: "Leichhardt", postcode: "2040", lat: -33.8830, lng: 151.1570, population: 15000 },
    { name: "Lilyfield", postcode: "2040", lat: -33.8720, lng: 151.1650, population: 6000 },
    { name: "Rozelle", postcode: "2039", lat: -33.8660, lng: 151.1710, population: 8500 },
    { name: "Balmain", postcode: "2041", lat: -33.8570, lng: 151.1800, population: 10000 },
    { name: "Balmain East", postcode: "2041", lat: -33.8550, lng: 151.1900, population: 2500 },
    { name: "Birchgrove", postcode: "2041", lat: -33.8510, lng: 151.1820, population: 3500 },
    { name: "Drummoyne", postcode: "2047", lat: -33.8510, lng: 151.1540, population: 11500 },
    { name: "Russell Lea", postcode: "2046", lat: -33.8550, lng: 151.1430, population: 4500 },
    { name: "Rodd Point", postcode: "2046", lat: -33.8640, lng: 151.1400, population: 2000 },
    { name: "Five Dock", postcode: "2046", lat: -33.8670, lng: 151.1290, population: 10000 },
    { name: "Abbotsford", postcode: "2046", lat: -33.8550, lng: 151.1290, population: 3500 },
    { name: "Canada Bay", postcode: "2046", lat: -33.8620, lng: 151.1200, population: 4000 },
    { name: "Wareemba", postcode: "2046", lat: -33.8590, lng: 151.1340, population: 2000 },
    { name: "Haberfield", postcode: "2045", lat: -33.8790, lng: 151.1380, population: 6500 },
    { name: "Summer Hill", postcode: "2130", lat: -33.8920, lng: 151.1380, population: 7000 },
    { name: "Ashfield", postcode: "2131", lat: -33.8890, lng: 151.1260, population: 24000 },
    { name: "Croydon", postcode: "2132", lat: -33.8830, lng: 151.1150, population: 10000 },
    { name: "Croydon Park", postcode: "2133", lat: -33.8970, lng: 151.1100, population: 6500 },
    { name: "Burwood", postcode: "2134", lat: -33.8770, lng: 151.1040, population: 13000 },
    { name: "Burwood Heights", postcode: "2136", lat: -33.8870, lng: 151.0960, population: 3000 },
    { name: "Enfield", postcode: "2136", lat: -33.8930, lng: 151.0950, population: 6000 },
    { name: "Strathfield", postcode: "2135", lat: -33.8790, lng: 151.0880, population: 10000 },
    { name: "Strathfield South", postcode: "2136", lat: -33.8940, lng: 151.0830, population: 4500 },
    { name: "Homebush", postcode: "2140", lat: -33.8660, lng: 151.0870, population: 8000 },
    { name: "Homebush West", postcode: "2140", lat: -33.8630, lng: 151.0720, population: 9500 },
    { name: "Concord", postcode: "2137", lat: -33.8600, lng: 151.1040, population: 17500 },
    { name: "Concord West", postcode: "2138", lat: -33.8510, lng: 151.0870, population: 5000 },
    { name: "North Strathfield", postcode: "2137", lat: -33.8590, lng: 151.0940, population: 6000 },
    { name: "Rhodes", postcode: "2138", lat: -33.8300, lng: 151.0870, population: 12000 },
    { name: "Wentworth Point", postcode: "2127", lat: -33.8350, lng: 151.0760, population: 14000 },
    { name: "Dulwich Hill", postcode: "2203", lat: -33.9050, lng: 151.1400, population: 13000 },
    { name: "Lewisham", postcode: "2049", lat: -33.8960, lng: 151.1490, population: 6500 },
    { name: "Petersham", postcode: "2049", lat: -33.8940, lng: 151.1540, population: 8000 },
    { name: "Hurlstone Park", postcode: "2193", lat: -33.9110, lng: 151.1300, population: 7500 },
    { name: "Canterbury", postcode: "2193", lat: -33.9120, lng: 151.1180, population: 8500 },
    { name: "Earlwood", postcode: "2206", lat: -33.9230, lng: 151.1280, population: 19000 },
    { name: "Ashbury", postcode: "2193", lat: -33.9050, lng: 151.1220, population: 4500 },
  ],
  "north-shore": [
    { name: "North Sydney", postcode: "2060", lat: -33.8390, lng: 151.2070, population: 8000 },
    { name: "Lavender Bay", postcode: "2060", lat: -33.8430, lng: 151.2080, population: 1500 },
    { name: "McMahons Point", postcode: "2060", lat: -33.8460, lng: 151.2030, population: 3000 },
    { name: "Kirribilli", postcode: "2061", lat: -33.8470, lng: 151.2170, population: 4500 },
    { name: "Milsons Point", postcode: "2061", lat: -33.8450, lng: 151.2120, population: 3500 },
    { name: "Waverton", postcode: "2060", lat: -33.8380, lng: 151.1990, population: 4000 },
    { name: "Wollstonecraft", postcode: "2065", lat: -33.8350, lng: 151.1910, population: 5000 },
    { name: "Crows Nest", postcode: "2065", lat: -33.8270, lng: 151.2010, population: 7000 },
    { name: "St Leonards", postcode: "2065", lat: -33.8220, lng: 151.1940, population: 12000 },
    { name: "Artarmon", postcode: "2064", lat: -33.8180, lng: 151.1850, population: 10500 },
    { name: "Naremburn", postcode: "2065", lat: -33.8210, lng: 151.2000, population: 6500 },
    { name: "Cammeray", postcode: "2062", lat: -33.8230, lng: 151.2140, population: 8500 },
    { name: "Neutral Bay", postcode: "2089", lat: -33.8350, lng: 151.2210, population: 10000 },
    { name: "Cremorne", postcode: "2090", lat: -33.8300, lng: 151.2270, population: 7000 },
    { name: "Cremorne Point", postcode: "2090", lat: -33.8400, lng: 151.2270, population: 2000 },
    { name: "Mosman", postcode: "2088", lat: -33.8290, lng: 151.2440, population: 30000 },
    { name: "Balmoral", postcode: "2088", lat: -33.8230, lng: 151.2540, population: 3500 },
    { name: "Clifton Gardens", postcode: "2088", lat: -33.8370, lng: 151.2510, population: 1200 },
    { name: "Willoughby", postcode: "2068", lat: -33.8040, lng: 151.2000, population: 7000 },
    { name: "Willoughby East", postcode: "2068", lat: -33.8000, lng: 151.2100, population: 2500 },
    { name: "Castle Cove", postcode: "2069", lat: -33.7880, lng: 151.2050, population: 3500 },
    { name: "Middle Cove", postcode: "2068", lat: -33.7960, lng: 151.2040, population: 2500 },
    { name: "Northbridge", postcode: "2063", lat: -33.8150, lng: 151.2190, population: 5000 },
    { name: "Castlecrag", postcode: "2068", lat: -33.7990, lng: 151.2200, population: 3500 },
    { name: "Chatswood", postcode: "2067", lat: -33.7970, lng: 151.1830, population: 27000 },
    { name: "Chatswood West", postcode: "2067", lat: -33.7950, lng: 151.1690, population: 6000 },
    { name: "Lane Cove", postcode: "2066", lat: -33.8150, lng: 151.1680, population: 6500 },
    { name: "Lane Cove North", postcode: "2066", lat: -33.8050, lng: 151.1650, population: 7000 },
    { name: "Lane Cove West", postcode: "2066", lat: -33.8100, lng: 151.1560, population: 3500 },
    { name: "Longueville", postcode: "2066", lat: -33.8280, lng: 151.1650, population: 4000 },
    { name: "Greenwich", postcode: "2065", lat: -33.8330, lng: 151.1860, population: 3500 },
    { name: "Riverview", postcode: "2066", lat: -33.8260, lng: 151.1580, population: 2500 },
    { name: "Linley Point", postcode: "2066", lat: -33.8210, lng: 151.1460, population: 800 },
    { name: "Hunters Hill", postcode: "2110", lat: -33.8350, lng: 151.1460, population: 14500 },
    { name: "Woolwich", postcode: "2110", lat: -33.8390, lng: 151.1710, population: 2000 },
    { name: "Henley", postcode: "2111", lat: -33.8400, lng: 151.1340, population: 1800 },
    { name: "Huntleys Cove", postcode: "2111", lat: -33.8320, lng: 151.1400, population: 1200 },
    { name: "Huntleys Point", postcode: "2111", lat: -33.8350, lng: 151.1330, population: 1000 },
    { name: "Gladesville", postcode: "2111", lat: -33.8340, lng: 151.1290, population: 12500 },
    { name: "Tennyson Point", postcode: "2111", lat: -33.8300, lng: 151.1180, population: 2000 },
    { name: "Putney", postcode: "2112", lat: -33.8280, lng: 151.1080, population: 4500 },
    { name: "Ryde", postcode: "2112", lat: -33.8150, lng: 151.1070, population: 23000 },
    { name: "West Ryde", postcode: "2114", lat: -33.8070, lng: 151.0890, population: 10000 },
    { name: "Meadowbank", postcode: "2114", lat: -33.8170, lng: 151.0900, population: 9000 },
    { name: "Denistone", postcode: "2114", lat: -33.7980, lng: 151.0910, population: 3000 },
    { name: "Denistone East", postcode: "2112", lat: -33.8010, lng: 151.1010, population: 2500 },
    { name: "Denistone West", postcode: "2114", lat: -33.8010, lng: 151.0830, population: 1500 },
    { name: "Eastwood", postcode: "2122", lat: -33.7900, lng: 151.0810, population: 16500 },
    { name: "Marsfield", postcode: "2122", lat: -33.7770, lng: 151.1050, population: 13500 },
    { name: "North Ryde", postcode: "2113", lat: -33.7980, lng: 151.1280, population: 11000 },
    { name: "Macquarie Park", postcode: "2113", lat: -33.7780, lng: 151.1260, population: 9000 },
    { name: "East Ryde", postcode: "2113", lat: -33.8100, lng: 151.1380, population: 3500 },
  ],
  "upper-north-shore": [
    { name: "Lindfield", postcode: "2070", lat: -33.7760, lng: 151.1680, population: 13000 },
    { name: "East Lindfield", postcode: "2070", lat: -33.7720, lng: 151.1860, population: 5000 },
    { name: "Roseville", postcode: "2069", lat: -33.7850, lng: 151.1790, population: 9000 },
    { name: "Roseville Chase", postcode: "2069", lat: -33.7810, lng: 151.1970, population: 3500 },
    { name: "Killara", postcode: "2071", lat: -33.7660, lng: 151.1630, population: 10500 },
    { name: "Gordon", postcode: "2072", lat: -33.7560, lng: 151.1540, population: 7500 },
    { name: "East Killara", postcode: "2071", lat: -33.7560, lng: 151.1780, population: 4000 },
    { name: "Pymble", postcode: "2073", lat: -33.7440, lng: 151.1430, population: 11000 },
    { name: "West Pymble", postcode: "2073", lat: -33.7620, lng: 151.1300, population: 7500 },
    { name: "Turramurra", postcode: "2074", lat: -33.7320, lng: 151.1290, population: 13500 },
    { name: "South Turramurra", postcode: "2074", lat: -33.7450, lng: 151.1240, population: 5500 },
    { name: "North Turramurra", postcode: "2074", lat: -33.7150, lng: 151.1390, population: 6500 },
    { name: "Warrawee", postcode: "2074", lat: -33.7250, lng: 151.1200, population: 3500 },
    { name: "Wahroonga", postcode: "2076", lat: -33.7170, lng: 151.1180, population: 17500 },
    { name: "North Wahroonga", postcode: "2076", lat: -33.7030, lng: 151.1170, population: 3000 },
    { name: "Waitara", postcode: "2077", lat: -33.7100, lng: 151.1040, population: 6500 },
    { name: "Hornsby", postcode: "2077", lat: -33.7030, lng: 151.0990, population: 21000 },
    { name: "Hornsby Heights", postcode: "2077", lat: -33.6860, lng: 151.0920, population: 6000 },
    { name: "Asquith", postcode: "2078", lat: -33.6910, lng: 151.1100, population: 5000 },
    { name: "Mount Colah", postcode: "2079", lat: -33.6780, lng: 151.1150, population: 8000 },
    { name: "Mount Kuring-gai", postcode: "2080", lat: -33.6590, lng: 151.1280, population: 3500 },
    { name: "Berowra", postcode: "2081", lat: -33.6220, lng: 151.1480, population: 5500 },
    { name: "Berowra Heights", postcode: "2082", lat: -33.6150, lng: 151.1360, population: 7000 },
    { name: "Berowra Waters", postcode: "2082", lat: -33.5890, lng: 151.1280, population: 500 },
    { name: "Cowan", postcode: "2081", lat: -33.5950, lng: 151.1720, population: 1200 },
    { name: "Brooklyn", postcode: "2083", lat: -33.5460, lng: 151.2270, population: 700 },
    { name: "Thornleigh", postcode: "2120", lat: -33.7300, lng: 151.0800, population: 9500 },
    { name: "Normanhurst", postcode: "2076", lat: -33.7210, lng: 151.0980, population: 6500 },
    { name: "Pennant Hills", postcode: "2120", lat: -33.7380, lng: 151.0710, population: 7500 },
    { name: "Westleigh", postcode: "2120", lat: -33.7100, lng: 151.0680, population: 5000 },
    { name: "Cheltenham", postcode: "2119", lat: -33.7580, lng: 151.0770, population: 3500 },
    { name: "Beecroft", postcode: "2119", lat: -33.7500, lng: 151.0650, population: 9000 },
    { name: "Epping", postcode: "2121", lat: -33.7720, lng: 151.0820, population: 25000 },
    { name: "North Epping", postcode: "2121", lat: -33.7610, lng: 151.0910, population: 6000 },
    { name: "Carlingford", postcode: "2118", lat: -33.7830, lng: 151.0490, population: 25000 },
  ],
  "northern-beaches": [
    { name: "Manly", postcode: "2095", lat: -33.7970, lng: 151.2880, population: 18000 },
    { name: "Manly Vale", postcode: "2093", lat: -33.7830, lng: 151.2700, population: 7500 },
    { name: "Fairlight", postcode: "2094", lat: -33.7930, lng: 151.2730, population: 5500 },
    { name: "Balgowlah", postcode: "2093", lat: -33.7890, lng: 151.2610, population: 10000 },
    { name: "Balgowlah Heights", postcode: "2093", lat: -33.8030, lng: 151.2640, population: 4000 },
    { name: "Clontarf", postcode: "2093", lat: -33.8080, lng: 151.2530, population: 3000 },
    { name: "Seaforth", postcode: "2092", lat: -33.7950, lng: 151.2480, population: 7500 },
    { name: "Allambie Heights", postcode: "2100", lat: -33.7680, lng: 151.2550, population: 5000 },
    { name: "North Balgowlah", postcode: "2093", lat: -33.7800, lng: 151.2570, population: 3500 },
    { name: "Freshwater", postcode: "2096", lat: -33.7800, lng: 151.2880, population: 9000 },
    { name: "Queenscliff", postcode: "2096", lat: -33.7880, lng: 151.2890, population: 3000 },
    { name: "Curl Curl", postcode: "2096", lat: -33.7680, lng: 151.2900, population: 4500 },
    { name: "North Curl Curl", postcode: "2099", lat: -33.7600, lng: 151.2920, population: 3500 },
    { name: "Dee Why", postcode: "2099", lat: -33.7510, lng: 151.2880, population: 22000 },
    { name: "North Manly", postcode: "2100", lat: -33.7770, lng: 151.2720, population: 5000 },
    { name: "Brookvale", postcode: "2100", lat: -33.7680, lng: 151.2720, population: 9000 },
    { name: "Narraweena", postcode: "2099", lat: -33.7520, lng: 151.2740, population: 6500 },
    { name: "Cromer", postcode: "2099", lat: -33.7400, lng: 151.2720, population: 6500 },
    { name: "Beacon Hill", postcode: "2100", lat: -33.7530, lng: 151.2560, population: 6500 },
    { name: "Oxford Falls", postcode: "2100", lat: -33.7380, lng: 151.2470, population: 800 },
    { name: "Frenchs Forest", postcode: "2086", lat: -33.7470, lng: 151.2340, population: 14000 },
    { name: "Forestville", postcode: "2087", lat: -33.7640, lng: 151.2170, population: 9500 },
    { name: "Killarney Heights", postcode: "2087", lat: -33.7700, lng: 151.2220, population: 5000 },
    { name: "Davidson", postcode: "2085", lat: -33.7480, lng: 151.2030, population: 2500 },
    { name: "Belrose", postcode: "2085", lat: -33.7350, lng: 151.2140, population: 10500 },
    { name: "Wheeler Heights", postcode: "2097", lat: -33.7330, lng: 151.2840, population: 2500 },
    { name: "Collaroy", postcode: "2097", lat: -33.7330, lng: 151.2990, population: 8500 },
    { name: "Collaroy Plateau", postcode: "2097", lat: -33.7250, lng: 151.2860, population: 6000 },
    { name: "Narrabeen", postcode: "2101", lat: -33.7150, lng: 151.2970, population: 9500 },
    { name: "North Narrabeen", postcode: "2101", lat: -33.7070, lng: 151.3000, population: 4500 },
    { name: "Elanora Heights", postcode: "2101", lat: -33.7030, lng: 151.2780, population: 6000 },
    { name: "Ingleside", postcode: "2101", lat: -33.6840, lng: 151.2650, population: 3000 },
    { name: "Warriewood", postcode: "2102", lat: -33.6920, lng: 151.2980, population: 9000 },
    { name: "Mona Vale", postcode: "2103", lat: -33.6780, lng: 151.3030, population: 10500 },
    { name: "Bayview", postcode: "2104", lat: -33.6600, lng: 151.2930, population: 4000 },
    { name: "Church Point", postcode: "2105", lat: -33.6460, lng: 151.2810, population: 1000 },
    { name: "Newport", postcode: "2106", lat: -33.6590, lng: 151.3130, population: 10000 },
    { name: "Bilgola Beach", postcode: "2107", lat: -33.6450, lng: 151.3250, population: 2500 },
    { name: "Bilgola Plateau", postcode: "2107", lat: -33.6500, lng: 151.3150, population: 3500 },
    { name: "Avalon Beach", postcode: "2107", lat: -33.6350, lng: 151.3300, population: 11000 },
    { name: "Clareville", postcode: "2107", lat: -33.6370, lng: 151.3130, population: 1500 },
    { name: "Whale Beach", postcode: "2107", lat: -33.6130, lng: 151.3300, population: 1500 },
    { name: "Palm Beach", postcode: "2108", lat: -33.5980, lng: 151.3230, population: 2000 },
    { name: "Scotland Island", postcode: "2105", lat: -33.6370, lng: 151.2940, population: 1000 },
    { name: "Terrey Hills", postcode: "2084", lat: -33.6830, lng: 151.2260, population: 4000 },
    { name: "Duffys Forest", postcode: "2084", lat: -33.6770, lng: 151.1970, population: 1000 },
  ],
  "western-sydney": [
    { name: "Parramatta", postcode: "2150", lat: -33.8150, lng: 151.0010, population: 30000 },
    { name: "North Parramatta", postcode: "2151", lat: -33.8000, lng: 151.0050, population: 8000 },
    { name: "Westmead", postcode: "2145", lat: -33.8080, lng: 150.9870, population: 12000 },
    { name: "Harris Park", postcode: "2150", lat: -33.8240, lng: 151.0080, population: 7500 },
    { name: "Rosehill", postcode: "2142", lat: -33.8210, lng: 151.0250, population: 3000 },
    { name: "Camellia", postcode: "2142", lat: -33.8180, lng: 151.0350, population: 1000 },
    { name: "Granville", postcode: "2142", lat: -33.8330, lng: 151.0120, population: 15500 },
    { name: "South Granville", postcode: "2142", lat: -33.8480, lng: 151.0100, population: 7000 },
    { name: "Clyde", postcode: "2142", lat: -33.8370, lng: 151.0220, population: 3500 },
    { name: "Merrylands", postcode: "2160", lat: -33.8360, lng: 150.9920, population: 21000 },
    { name: "Merrylands West", postcode: "2160", lat: -33.8320, lng: 150.9740, population: 6500 },
    { name: "Holroyd", postcode: "2142", lat: -33.8310, lng: 150.9990, population: 3500 },
    { name: "Guildford", postcode: "2161", lat: -33.8540, lng: 150.9870, population: 12000 },
    { name: "Guildford West", postcode: "2161", lat: -33.8500, lng: 150.9680, population: 4500 },
    { name: "Yennora", postcode: "2161", lat: -33.8640, lng: 150.9700, population: 2000 },
    { name: "Fairfield", postcode: "2165", lat: -33.8720, lng: 150.9570, population: 19500 },
    { name: "Fairfield East", postcode: "2165", lat: -33.8660, lng: 150.9740, population: 5500 },
    { name: "Fairfield West", postcode: "2165", lat: -33.8680, lng: 150.9310, population: 12000 },
    { name: "Fairfield Heights", postcode: "2165", lat: -33.8550, lng: 150.9450, population: 8500 },
    { name: "Old Guildford", postcode: "2161", lat: -33.8630, lng: 150.9870, population: 5500 },
    { name: "Smithfield", postcode: "2164", lat: -33.8530, lng: 150.9410, population: 12000 },
    { name: "Wetherill Park", postcode: "2164", lat: -33.8430, lng: 150.9120, population: 15500 },
    { name: "Prairiewood", postcode: "2176", lat: -33.8620, lng: 150.9070, population: 7500 },
    { name: "Bossley Park", postcode: "2176", lat: -33.8660, lng: 150.8870, population: 12500 },
    { name: "Cabramatta", postcode: "2166", lat: -33.8950, lng: 150.9370, population: 21000 },
    { name: "Cabramatta West", postcode: "2166", lat: -33.8920, lng: 150.9150, population: 8000 },
    { name: "Canley Vale", postcode: "2166", lat: -33.8860, lng: 150.9450, population: 8500 },
    { name: "Canley Heights", postcode: "2166", lat: -33.8830, lng: 150.9250, population: 11000 },
    { name: "Lansvale", postcode: "2166", lat: -33.9020, lng: 150.9590, population: 4500 },
    { name: "Auburn", postcode: "2144", lat: -33.8490, lng: 151.0330, population: 38000 },
    { name: "Lidcombe", postcode: "2141", lat: -33.8640, lng: 151.0440, population: 19000 },
    { name: "Berala", postcode: "2141", lat: -33.8750, lng: 151.0330, population: 7000 },
    { name: "Regents Park", postcode: "2143", lat: -33.8830, lng: 151.0210, population: 7500 },
    { name: "Silverwater", postcode: "2128", lat: -33.8350, lng: 151.0480, population: 2500 },
    { name: "Newington", postcode: "2127", lat: -33.8370, lng: 151.0570, population: 8500 },
    { name: "Sydney Olympic Park", postcode: "2127", lat: -33.8470, lng: 151.0690, population: 3500 },
    { name: "Ermington", postcode: "2115", lat: -33.8150, lng: 151.0530, population: 10000 },
    { name: "Rydalmere", postcode: "2116", lat: -33.8180, lng: 151.0380, population: 8500 },
    { name: "Dundas", postcode: "2117", lat: -33.8050, lng: 151.0530, population: 5500 },
    { name: "Dundas Valley", postcode: "2117", lat: -33.7960, lng: 151.0430, population: 5000 },
    { name: "Telopea", postcode: "2117", lat: -33.7900, lng: 151.0370, population: 5500 },
    { name: "Oatlands", postcode: "2117", lat: -33.7970, lng: 151.0200, population: 7000 },
    { name: "Northmead", postcode: "2152", lat: -33.7910, lng: 150.9960, population: 8500 },
    { name: "Constitution Hill", postcode: "2145", lat: -33.7920, lng: 150.9710, population: 2500 },
    { name: "Girraween", postcode: "2145", lat: -33.7960, lng: 150.9520, population: 5000 },
    { name: "Pendle Hill", postcode: "2145", lat: -33.8030, lng: 150.9560, population: 7500 },
    { name: "Wentworthville", postcode: "2145", lat: -33.8100, lng: 150.9680, population: 8000 },
    { name: "Old Toongabbie", postcode: "2146", lat: -33.7890, lng: 150.9760, population: 6000 },
    { name: "Toongabbie", postcode: "2146", lat: -33.7960, lng: 150.9660, population: 14000 },
    { name: "Winston Hills", postcode: "2153", lat: -33.7770, lng: 150.9780, population: 13000 },
    { name: "Seven Hills", postcode: "2147", lat: -33.7740, lng: 150.9370, population: 19500 },
    { name: "Blacktown", postcode: "2148", lat: -33.7690, lng: 150.9060, population: 47000 },
    { name: "Prospect", postcode: "2148", lat: -33.8050, lng: 150.9130, population: 4500 },
    { name: "Huntingwood", postcode: "2148", lat: -33.7880, lng: 150.8900, population: 1500 },
    { name: "Arndell Park", postcode: "2148", lat: -33.7850, lng: 150.8750, population: 1000 },
    { name: "Marayong", postcode: "2148", lat: -33.7510, lng: 150.8970, population: 5500 },
    { name: "Lalor Park", postcode: "2147", lat: -33.7580, lng: 150.9250, population: 6500 },
    { name: "Kings Langley", postcode: "2147", lat: -33.7470, lng: 150.9390, population: 9000 },
    { name: "Kings Park", postcode: "2148", lat: -33.7390, lng: 150.9060, population: 10000 },
    { name: "Quakers Hill", postcode: "2763", lat: -33.7300, lng: 150.8790, population: 28000 },
    { name: "Acacia Gardens", postcode: "2763", lat: -33.7180, lng: 150.9020, population: 5000 },
    { name: "Stanhope Gardens", postcode: "2768", lat: -33.7120, lng: 150.9170, population: 13000 },
    { name: "Glenwood", postcode: "2768", lat: -33.7350, lng: 150.9330, population: 14500 },
    { name: "Parklea", postcode: "2768", lat: -33.7210, lng: 150.9380, population: 5500 },
    { name: "Kellyville Ridge", postcode: "2155", lat: -33.7020, lng: 150.9340, population: 11000 },
    { name: "The Ponds", postcode: "2769", lat: -33.7030, lng: 150.9130, population: 14000 },
    { name: "Schofields", postcode: "2762", lat: -33.7070, lng: 150.8680, population: 15000 },
    { name: "Riverstone", postcode: "2765", lat: -33.6820, lng: 150.8620, population: 9500 },
    { name: "Marsden Park", postcode: "2765", lat: -33.7000, lng: 150.8340, population: 18000 },
    { name: "Ropes Crossing", postcode: "2760", lat: -33.7330, lng: 150.8080, population: 8500 },
    { name: "St Marys", postcode: "2760", lat: -33.7620, lng: 150.7740, population: 13500 },
    { name: "North St Marys", postcode: "2760", lat: -33.7480, lng: 150.7700, population: 5500 },
    { name: "Oxley Park", postcode: "2760", lat: -33.7550, lng: 150.7880, population: 4000 },
    { name: "Colyton", postcode: "2760", lat: -33.7850, lng: 150.7970, population: 8000 },
    { name: "Mount Druitt", postcode: "2770", lat: -33.7690, lng: 150.8190, population: 16500 },
    { name: "Rooty Hill", postcode: "2766", lat: -33.7730, lng: 150.8440, population: 11000 },
    { name: "Minchinbury", postcode: "2770", lat: -33.7900, lng: 150.8310, population: 4000 },
    { name: "Eastern Creek", postcode: "2766", lat: -33.8070, lng: 150.8570, population: 2500 },
    { name: "Doonside", postcode: "2767", lat: -33.7640, lng: 150.8710, population: 13500 },
    { name: "Woodcroft", postcode: "2767", lat: -33.7460, lng: 150.8680, population: 9500 },
    { name: "Plumpton", postcode: "2761", lat: -33.7380, lng: 150.8400, population: 8500 },
    { name: "Oakhurst", postcode: "2761", lat: -33.7480, lng: 150.8450, population: 6500 },
    { name: "Hassall Grove", postcode: "2761", lat: -33.7310, lng: 150.8330, population: 5500 },
    { name: "Shalvey", postcode: "2770", lat: -33.7290, lng: 150.8100, population: 4500 },
    { name: "Emerton", postcode: "2770", lat: -33.7440, lng: 150.8080, population: 5500 },
    { name: "Lethbridge Park", postcode: "2770", lat: -33.7360, lng: 150.7950, population: 6500 },
    { name: "Tregear", postcode: "2770", lat: -33.7480, lng: 150.7890, population: 4500 },
    { name: "Whalan", postcode: "2770", lat: -33.7570, lng: 150.8080, population: 5500 },
    { name: "Dharruk", postcode: "2770", lat: -33.7520, lng: 150.8160, population: 4000 },
    { name: "Hebersham", postcode: "2770", lat: -33.7390, lng: 150.8210, population: 5000 },
    { name: "Bidwill", postcode: "2770", lat: -33.7310, lng: 150.8260, population: 4500 },
    { name: "Blackett", postcode: "2770", lat: -33.7360, lng: 150.8110, population: 3000 },
    { name: "Willmot", postcode: "2770", lat: -33.7260, lng: 150.7920, population: 3500 },
    { name: "Dean Park", postcode: "2761", lat: -33.7230, lng: 150.8590, population: 5000 },
    { name: "Colebee", postcode: "2761", lat: -33.7110, lng: 150.8440, population: 6500 },
  ],
  "south-sydney": [
    { name: "Arncliffe", postcode: "2205", lat: -33.9380, lng: 151.1470, population: 10500 },
    { name: "Wolli Creek", postcode: "2205", lat: -33.9320, lng: 151.1530, population: 8500 },
    { name: "Turrella", postcode: "2205", lat: -33.9280, lng: 151.1430, population: 2500 },
    { name: "Bardwell Park", postcode: "2207", lat: -33.9290, lng: 151.1280, population: 3500 },
    { name: "Bardwell Valley", postcode: "2207", lat: -33.9250, lng: 151.1200, population: 3000 },
    { name: "Bexley", postcode: "2207", lat: -33.9500, lng: 151.1200, population: 9000 },
    { name: "Bexley North", postcode: "2207", lat: -33.9360, lng: 151.1170, population: 4500 },
    { name: "Kingsgrove", postcode: "2208", lat: -33.9390, lng: 151.1020, population: 11000 },
    { name: "Beverley Hills", postcode: "2209", lat: -33.9500, lng: 151.0830, population: 9500 },
    { name: "Narwee", postcode: "2209", lat: -33.9560, lng: 151.0710, population: 5000 },
    { name: "Riverwood", postcode: "2210", lat: -33.9530, lng: 151.0510, population: 12500 },
    { name: "Padstow", postcode: "2211", lat: -33.9530, lng: 151.0320, population: 12000 },
    { name: "Padstow Heights", postcode: "2211", lat: -33.9640, lng: 151.0290, population: 5000 },
    { name: "Revesby", postcode: "2212", lat: -33.9500, lng: 151.0150, population: 14000 },
    { name: "Revesby Heights", postcode: "2212", lat: -33.9600, lng: 151.0070, population: 5500 },
    { name: "Panania", postcode: "2213", lat: -33.9530, lng: 150.9940, population: 10500 },
    { name: "Picnic Point", postcode: "2213", lat: -33.9700, lng: 150.9960, population: 5000 },
    { name: "East Hills", postcode: "2213", lat: -33.9620, lng: 150.9830, population: 6000 },
    { name: "Milperra", postcode: "2214", lat: -33.9380, lng: 150.9780, population: 7500 },
    { name: "Bankstown", postcode: "2200", lat: -33.9170, lng: 151.0350, population: 33000 },
    { name: "Bankstown North", postcode: "2200", lat: -33.9040, lng: 151.0380, population: 5500 },
    { name: "Yagoona", postcode: "2199", lat: -33.9050, lng: 151.0220, population: 12500 },
    { name: "Birrong", postcode: "2143", lat: -33.8950, lng: 151.0160, population: 5500 },
    { name: "Condell Park", postcode: "2200", lat: -33.9250, lng: 151.0030, population: 9500 },
    { name: "Lakemba", postcode: "2195", lat: -33.9190, lng: 151.0760, population: 17500 },
    { name: "Wiley Park", postcode: "2195", lat: -33.9280, lng: 151.0670, population: 6000 },
    { name: "Punchbowl", postcode: "2196", lat: -33.9280, lng: 151.0520, population: 18500 },
    { name: "Roselands", postcode: "2196", lat: -33.9330, lng: 151.0720, population: 8000 },
    { name: "Belmore", postcode: "2192", lat: -33.9170, lng: 151.0920, population: 12500 },
    { name: "Campsie", postcode: "2194", lat: -33.9130, lng: 151.1040, population: 24000 },
    { name: "Clemton Park", postcode: "2206", lat: -33.9150, lng: 151.1180, population: 3000 },
    { name: "Belfield", postcode: "2191", lat: -33.9050, lng: 151.0890, population: 4500 },
    { name: "Greenacre", postcode: "2190", lat: -33.9030, lng: 151.0560, population: 20000 },
    { name: "Mount Lewis", postcode: "2190", lat: -33.9150, lng: 151.0430, population: 4000 },
    { name: "Chullora", postcode: "2190", lat: -33.8910, lng: 151.0450, population: 2000 },
    { name: "Sefton", postcode: "2162", lat: -33.8870, lng: 151.0080, population: 4500 },
    { name: "Chester Hill", postcode: "2162", lat: -33.8800, lng: 150.9970, population: 9000 },
    { name: "Bass Hill", postcode: "2197", lat: -33.9000, lng: 150.9930, population: 8500 },
    { name: "Georges Hall", postcode: "2198", lat: -33.9100, lng: 150.9850, population: 8000 },
    { name: "Villawood", postcode: "2163", lat: -33.8830, lng: 150.9780, population: 6000 },
    { name: "Carramar", postcode: "2163", lat: -33.8880, lng: 150.9640, population: 4000 },
    { name: "Lansdowne", postcode: "2163", lat: -33.8770, lng: 150.9650, population: 2500 },
    { name: "Rockdale", postcode: "2216", lat: -33.9530, lng: 151.1370, population: 12500 },
    { name: "Banksia", postcode: "2216", lat: -33.9450, lng: 151.1410, population: 3500 },
    { name: "Brighton-Le-Sands", postcode: "2216", lat: -33.9610, lng: 151.1500, population: 9500 },
    { name: "Kyeemagh", postcode: "2216", lat: -33.9470, lng: 151.1630, population: 2000 },
    { name: "Monterey", postcode: "2217", lat: -33.9710, lng: 151.1480, population: 5500 },
    { name: "Ramsgate", postcode: "2217", lat: -33.9800, lng: 151.1430, population: 5500 },
    { name: "Ramsgate Beach", postcode: "2217", lat: -33.9840, lng: 151.1520, population: 3500 },
    { name: "Sans Souci", postcode: "2219", lat: -33.9900, lng: 151.1340, population: 9500 },
    { name: "Sandringham", postcode: "2219", lat: -34.0010, lng: 151.1360, population: 2500 },
    { name: "Dolls Point", postcode: "2219", lat: -33.9960, lng: 151.1440, population: 2000 },
    { name: "Kogarah", postcode: "2217", lat: -33.9680, lng: 151.1340, population: 14500 },
    { name: "Kogarah Bay", postcode: "2217", lat: -33.9780, lng: 151.1290, population: 2500 },
    { name: "Carlton", postcode: "2218", lat: -33.9680, lng: 151.1220, population: 9500 },
    { name: "Allawah", postcode: "2218", lat: -33.9680, lng: 151.1150, population: 4000 },
    { name: "Hurstville", postcode: "2220", lat: -33.9670, lng: 151.1020, population: 28000 },
    { name: "Hurstville Grove", postcode: "2220", lat: -33.9780, lng: 151.0960, population: 3500 },
    { name: "South Hurstville", postcode: "2221", lat: -33.9810, lng: 151.0980, population: 6500 },
    { name: "Penshurst", postcode: "2222", lat: -33.9630, lng: 151.0870, population: 10500 },
    { name: "Mortdale", postcode: "2223", lat: -33.9700, lng: 151.0720, population: 9500 },
    { name: "Oatley", postcode: "2223", lat: -33.9820, lng: 151.0790, population: 9000 },
    { name: "Peakhurst", postcode: "2210", lat: -33.9610, lng: 151.0560, population: 10000 },
    { name: "Peakhurst Heights", postcode: "2210", lat: -33.9710, lng: 151.0480, population: 4500 },
    { name: "Lugarno", postcode: "2210", lat: -33.9810, lng: 151.0430, population: 8000 },
    { name: "Connells Point", postcode: "2221", lat: -33.9910, lng: 151.0910, population: 3500 },
    { name: "Kyle Bay", postcode: "2221", lat: -33.9870, lng: 151.0840, population: 2000 },
    { name: "Blakehurst", postcode: "2221", lat: -33.9910, lng: 151.1070, population: 6500 },
    { name: "Carss Park", postcode: "2221", lat: -33.9870, lng: 151.1190, population: 4000 },
  ],
  "sutherland-shire": [
    { name: "Sutherland", postcode: "2232", lat: -34.0310, lng: 151.0570, population: 12000 },
    { name: "Kirrawee", postcode: "2232", lat: -34.0360, lng: 151.0710, population: 10500 },
    { name: "Gymea", postcode: "2227", lat: -34.0360, lng: 151.0850, population: 7000 },
    { name: "Gymea Bay", postcode: "2227", lat: -34.0470, lng: 151.0860, population: 4500 },
    { name: "Grays Point", postcode: "2232", lat: -34.0590, lng: 151.0840, population: 3500 },
    { name: "Sylvania", postcode: "2224", lat: -34.0110, lng: 151.1010, population: 10500 },
    { name: "Sylvania Waters", postcode: "2224", lat: -34.0170, lng: 151.1150, population: 4500 },
    { name: "Taren Point", postcode: "2229", lat: -34.0110, lng: 151.1300, population: 2000 },
    { name: "Caringbah", postcode: "2229", lat: -34.0380, lng: 151.1210, population: 16000 },
    { name: "Caringbah South", postcode: "2229", lat: -34.0540, lng: 151.1240, population: 7500 },
    { name: "Dolans Bay", postcode: "2229", lat: -34.0490, lng: 151.1280, population: 2000 },
    { name: "Lilli Pilli", postcode: "2229", lat: -34.0610, lng: 151.1160, population: 2000 },
    { name: "Port Hacking", postcode: "2229", lat: -34.0680, lng: 151.1150, population: 1500 },
    { name: "Miranda", postcode: "2228", lat: -34.0380, lng: 151.1000, population: 13000 },
    { name: "Yowie Bay", postcode: "2228", lat: -34.0460, lng: 151.1080, population: 4500 },
    { name: "Kangaroo Point", postcode: "2224", lat: -34.0170, lng: 151.0940, population: 1500 },
    { name: "Cronulla", postcode: "2230", lat: -34.0550, lng: 151.1520, population: 20000 },
    { name: "Woolooware", postcode: "2230", lat: -34.0460, lng: 151.1460, population: 5000 },
    { name: "Burraneer", postcode: "2230", lat: -34.0620, lng: 151.1270, population: 3000 },
    { name: "Kurnell", postcode: "2231", lat: -34.0160, lng: 151.2090, population: 2500 },
    { name: "Jannali", postcode: "2226", lat: -34.0160, lng: 151.0590, population: 8000 },
    { name: "Como", postcode: "2226", lat: -34.0040, lng: 151.0720, population: 5000 },
    { name: "Como West", postcode: "2226", lat: -33.9960, lng: 151.0590, population: 2500 },
    { name: "Oyster Bay", postcode: "2225", lat: -34.0030, lng: 151.0850, population: 5500 },
    { name: "Bonnet Bay", postcode: "2226", lat: -34.0100, lng: 151.0530, population: 3500 },
    { name: "Bangor", postcode: "2234", lat: -34.0280, lng: 151.0280, population: 6000 },
    { name: "Menai", postcode: "2234", lat: -34.0160, lng: 151.0180, population: 12500 },
    { name: "Illawong", postcode: "2234", lat: -33.9980, lng: 151.0360, population: 6500 },
    { name: "Alfords Point", postcode: "2234", lat: -33.9880, lng: 151.0250, population: 6000 },
    { name: "Barden Ridge", postcode: "2234", lat: -34.0410, lng: 151.0130, population: 4500 },
    { name: "Lucas Heights", postcode: "2234", lat: -34.0530, lng: 150.9810, population: 2000 },
    { name: "Engadine", postcode: "2233", lat: -34.0670, lng: 151.0130, population: 17000 },
    { name: "Yarrawarrah", postcode: "2233", lat: -34.0540, lng: 151.0310, population: 3500 },
    { name: "Loftus", postcode: "2232", lat: -34.0480, lng: 151.0490, population: 3500 },
    { name: "Woronora", postcode: "2232", lat: -34.0280, lng: 151.0420, population: 2500 },
    { name: "Woronora Heights", postcode: "2233", lat: -34.0370, lng: 151.0260, population: 5000 },
    { name: "Heathcote", postcode: "2233", lat: -34.0870, lng: 151.0130, population: 6500 },
    { name: "Waterfall", postcode: "2233", lat: -34.1350, lng: 150.9950, population: 800 },
    { name: "Helensburgh", postcode: "2508", lat: -34.1780, lng: 150.9950, population: 6000 },
    { name: "Stanwell Tops", postcode: "2508", lat: -34.2210, lng: 150.9870, population: 1500 },
    { name: "Stanwell Park", postcode: "2508", lat: -34.2310, lng: 150.9880, population: 2000 },
    { name: "Otford", postcode: "2508", lat: -34.2100, lng: 151.0030, population: 600 },
  ],
  "hills-district": [
    { name: "Castle Hill", postcode: "2154", lat: -33.7310, lng: 151.0040, population: 38000 },
    { name: "West Pennant Hills", postcode: "2125", lat: -33.7500, lng: 151.0430, population: 15000 },
    { name: "Baulkham Hills", postcode: "2153", lat: -33.7620, lng: 150.9930, population: 39000 },
    { name: "Bella Vista", postcode: "2153", lat: -33.7450, lng: 150.9580, population: 10000 },
    { name: "Norwest", postcode: "2153", lat: -33.7350, lng: 150.9680, population: 4500 },
    { name: "Kellyville", postcode: "2155", lat: -33.7000, lng: 150.9550, population: 28000 },
    { name: "Rouse Hill", postcode: "2155", lat: -33.6850, lng: 150.9150, population: 22000 },
    { name: "Beaumont Hills", postcode: "2155", lat: -33.6980, lng: 150.9380, population: 7500 },
    { name: "Box Hill", postcode: "2765", lat: -33.6450, lng: 150.8990, population: 12000 },
    { name: "Nelson", postcode: "2765", lat: -33.6550, lng: 150.8680, population: 3500 },
    { name: "Dural", postcode: "2158", lat: -33.6850, lng: 151.0250, population: 7500 },
    { name: "Kenthurst", postcode: "2156", lat: -33.6550, lng: 151.0000, population: 5000 },
    { name: "Round Corner", postcode: "2158", lat: -33.7050, lng: 151.0200, population: 2500 },
    { name: "Glenhaven", postcode: "2156", lat: -33.7050, lng: 151.0100, population: 6500 },
    { name: "Cherrybrook", postcode: "2126", lat: -33.7220, lng: 151.0450, population: 19000 },
    { name: "Annangrove", postcode: "2156", lat: -33.6600, lng: 150.9600, population: 3000 },
    { name: "Glenorie", postcode: "2157", lat: -33.6080, lng: 151.0050, population: 3500 },
    { name: "Arcadia", postcode: "2159", lat: -33.6180, lng: 151.0450, population: 2500 },
    { name: "Galston", postcode: "2159", lat: -33.6500, lng: 151.0500, population: 4000 },
    { name: "Fiddletown", postcode: "2159", lat: -33.6330, lng: 151.0750, population: 500 },
    { name: "Middle Dural", postcode: "2158", lat: -33.6700, lng: 151.0320, population: 2000 },
    { name: "Cattai", postcode: "2756", lat: -33.5580, lng: 150.9280, population: 1200 },
    { name: "Maraylya", postcode: "2765", lat: -33.5980, lng: 150.9250, population: 2000 },
    { name: "South Maroota", postcode: "2756", lat: -33.5330, lng: 150.9750, population: 1000 },
    { name: "Maroota", postcode: "2756", lat: -33.4950, lng: 151.0050, population: 1500 },
    { name: "Wisemans Ferry", postcode: "2775", lat: -33.3830, lng: 150.9900, population: 600 },
  ],
  "south-west-sydney": [
    { name: "Liverpool", postcode: "2170", lat: -33.9210, lng: 150.9260, population: 28000 },
    { name: "Warwick Farm", postcode: "2170", lat: -33.9110, lng: 150.9390, population: 5000 },
    { name: "Chipping Norton", postcode: "2170", lat: -33.9270, lng: 150.9590, population: 6000 },
    { name: "Moorebank", postcode: "2170", lat: -33.9380, lng: 150.9560, population: 13500 },
    { name: "Hammondville", postcode: "2170", lat: -33.9460, lng: 150.9490, population: 4000 },
    { name: "Holsworthy", postcode: "2173", lat: -33.9790, lng: 150.9550, population: 5500 },
    { name: "Wattle Grove", postcode: "2173", lat: -33.9640, lng: 150.9380, population: 7000 },
    { name: "Voyager Point", postcode: "2172", lat: -33.9590, lng: 150.9810, population: 3500 },
    { name: "Pleasure Point", postcode: "2172", lat: -33.9710, lng: 150.9700, population: 1500 },
    { name: "Sandy Point", postcode: "2172", lat: -33.9780, lng: 150.9770, population: 800 },
    { name: "Casula", postcode: "2170", lat: -33.9540, lng: 150.9110, population: 12500 },
    { name: "Prestons", postcode: "2170", lat: -33.9430, lng: 150.8660, population: 9000 },
    { name: "Lurnea", postcode: "2170", lat: -33.9330, lng: 150.8980, population: 8500 },
    { name: "Cartwright", postcode: "2168", lat: -33.9300, lng: 150.8680, population: 5000 },
    { name: "Sadleir", postcode: "2168", lat: -33.9170, lng: 150.8850, population: 4000 },
    { name: "Miller", postcode: "2168", lat: -33.9130, lng: 150.8740, population: 7000 },
    { name: "Green Valley", postcode: "2168", lat: -33.9050, lng: 150.8660, population: 14500 },
    { name: "Hinchinbrook", postcode: "2168", lat: -33.9200, lng: 150.8470, population: 6500 },
    { name: "Hoxton Park", postcode: "2171", lat: -33.9280, lng: 150.8360, population: 8000 },
    { name: "Heckenberg", postcode: "2168", lat: -33.9120, lng: 150.8860, population: 5000 },
    { name: "Busby", postcode: "2168", lat: -33.9070, lng: 150.8890, population: 4500 },
    { name: "Ashcroft", postcode: "2168", lat: -33.9220, lng: 150.8920, population: 4000 },
    { name: "Bonnyrigg", postcode: "2177", lat: -33.8900, lng: 150.8780, population: 10000 },
    { name: "Bonnyrigg Heights", postcode: "2177", lat: -33.8820, lng: 150.8630, population: 7500 },
    { name: "Edensor Park", postcode: "2176", lat: -33.8760, lng: 150.8740, population: 6500 },
    { name: "Abbotsbury", postcode: "2176", lat: -33.8700, lng: 150.8520, population: 5000 },
    { name: "Cecil Hills", postcode: "2171", lat: -33.8850, lng: 150.8350, population: 7000 },
    { name: "Cecil Park", postcode: "2178", lat: -33.8700, lng: 150.8230, population: 3000 },
    { name: "Horningsea Park", postcode: "2171", lat: -33.9350, lng: 150.8490, population: 6500 },
    { name: "West Hoxton", postcode: "2171", lat: -33.9330, lng: 150.8200, population: 11500 },
    { name: "Middleton Grange", postcode: "2171", lat: -33.9180, lng: 150.8180, population: 7500 },
    { name: "Len Waters Estate", postcode: "2171", lat: -33.9060, lng: 150.8280, population: 2000 },
    { name: "Elizabeth Hills", postcode: "2171", lat: -33.9080, lng: 150.8100, population: 4000 },
    { name: "Austral", postcode: "2179", lat: -33.9250, lng: 150.7980, population: 6500 },
    { name: "Leppington", postcode: "2179", lat: -33.9650, lng: 150.7970, population: 8500 },
    { name: "Campbelltown", postcode: "2560", lat: -34.0650, lng: 150.8140, population: 32000 },
    { name: "Leumeah", postcode: "2560", lat: -34.0530, lng: 150.8350, population: 9500 },
    { name: "Woodbine", postcode: "2560", lat: -34.0450, lng: 150.8220, population: 4500 },
    { name: "Bradbury", postcode: "2560", lat: -34.0730, lng: 150.8350, population: 8000 },
    { name: "Airds", postcode: "2560", lat: -34.0870, lng: 150.8430, population: 5500 },
    { name: "Rosemeadow", postcode: "2560", lat: -34.1030, lng: 150.8030, population: 10500 },
    { name: "Glen Alpine", postcode: "2560", lat: -34.0900, lng: 150.7930, population: 5500 },
    { name: "Ambarvale", postcode: "2560", lat: -34.1020, lng: 150.8170, population: 8000 },
    { name: "St Helens Park", postcode: "2560", lat: -34.1100, lng: 150.8300, population: 7000 },
    { name: "Campbelltown North", postcode: "2560", lat: -34.0520, lng: 150.8100, population: 3500 },
    { name: "Minto", postcode: "2566", lat: -34.0310, lng: 150.8430, population: 11000 },
    { name: "Minto Heights", postcode: "2566", lat: -34.0400, lng: 150.8600, population: 3000 },
    { name: "Bow Bowing", postcode: "2566", lat: -34.0460, lng: 150.8470, population: 2000 },
    { name: "Kentlyn", postcode: "2560", lat: -34.0580, lng: 150.8650, population: 1500 },
    { name: "Ruse", postcode: "2560", lat: -34.0700, lng: 150.8490, population: 3500 },
    { name: "Ingleburn", postcode: "2565", lat: -33.9970, lng: 150.8660, population: 14500 },
    { name: "Macquarie Fields", postcode: "2564", lat: -33.9890, lng: 150.8880, population: 15000 },
    { name: "Macquarie Links", postcode: "2565", lat: -33.9710, lng: 150.8650, population: 3500 },
    { name: "Glenfield", postcode: "2167", lat: -33.9680, lng: 150.8890, population: 8500 },
    { name: "Edmondson Park", postcode: "2174", lat: -33.9620, lng: 150.8580, population: 12000 },
    { name: "Denham Court", postcode: "2565", lat: -33.9870, lng: 150.8480, population: 6500 },
    { name: "Bardia", postcode: "2565", lat: -33.9800, lng: 150.8570, population: 4500 },
    { name: "Varroville", postcode: "2566", lat: -34.0040, lng: 150.8340, population: 1500 },
    { name: "Long Point", postcode: "2564", lat: -33.9810, lng: 150.9020, population: 2000 },
    { name: "Narellan", postcode: "2567", lat: -34.0480, lng: 150.7360, population: 9000 },
    { name: "Narellan Vale", postcode: "2567", lat: -34.0620, lng: 150.7430, population: 6000 },
    { name: "Harrington Park", postcode: "2567", lat: -34.0300, lng: 150.7370, population: 8500 },
    { name: "Mount Annan", postcode: "2567", lat: -34.0670, lng: 150.7680, population: 15500 },
    { name: "Currans Hill", postcode: "2567", lat: -34.0440, lng: 150.7560, population: 4500 },
    { name: "Smeaton Grange", postcode: "2567", lat: -34.0350, lng: 150.7650, population: 4000 },
    { name: "Gregory Hills", postcode: "2557", lat: -34.0220, lng: 150.7770, population: 14000 },
    { name: "Gledswood Hills", postcode: "2557", lat: -34.0100, lng: 150.7850, population: 5500 },
    { name: "Oran Park", postcode: "2570", lat: -34.0070, lng: 150.7450, population: 16000 },
    { name: "Camden", postcode: "2570", lat: -34.0540, lng: 150.6970, population: 7500 },
    { name: "Camden South", postcode: "2570", lat: -34.0710, lng: 150.6880, population: 3500 },
    { name: "Elderslie", postcode: "2570", lat: -34.0520, lng: 150.7150, population: 5000 },
    { name: "Spring Farm", postcode: "2570", lat: -34.0780, lng: 150.7170, population: 8500 },
    { name: "Kirkham", postcode: "2570", lat: -34.0640, lng: 150.7030, population: 1500 },
    { name: "Cobbitty", postcode: "2570", lat: -34.0130, lng: 150.6810, population: 2000 },
    { name: "Bringelly", postcode: "2556", lat: -33.9460, lng: 150.7310, population: 3500 },
    { name: "Rossmore", postcode: "2557", lat: -33.9350, lng: 150.7700, population: 3000 },
    { name: "Catherine Field", postcode: "2557", lat: -33.9750, lng: 150.7620, population: 6000 },
  ],
  "penrith-region": [
    { name: "Penrith", postcode: "2750", lat: -33.7510, lng: 150.6940, population: 14000 },
    { name: "Kingswood", postcode: "2747", lat: -33.7610, lng: 150.7260, population: 11000 },
    { name: "Werrington", postcode: "2747", lat: -33.7590, lng: 150.7570, population: 6000 },
    { name: "Werrington Downs", postcode: "2747", lat: -33.7460, lng: 150.7540, population: 6500 },
    { name: "Werrington County", postcode: "2747", lat: -33.7360, lng: 150.7550, population: 4000 },
    { name: "Cambridge Park", postcode: "2747", lat: -33.7500, lng: 150.7250, population: 6000 },
    { name: "Cambridge Gardens", postcode: "2747", lat: -33.7380, lng: 150.7300, population: 5000 },
    { name: "Claremont Meadows", postcode: "2747", lat: -33.7640, lng: 150.7450, population: 7500 },
    { name: "Jamisontown", postcode: "2750", lat: -33.7690, lng: 150.6820, population: 6500 },
    { name: "South Penrith", postcode: "2750", lat: -33.7660, lng: 150.6990, population: 8000 },
    { name: "Penrith South", postcode: "2750", lat: -33.7720, lng: 150.6870, population: 3500 },
    { name: "Regentville", postcode: "2745", lat: -33.7760, lng: 150.6640, population: 2500 },
    { name: "Leonay", postcode: "2750", lat: -33.7660, lng: 150.6530, population: 3500 },
    { name: "Emu Plains", postcode: "2750", lat: -33.7490, lng: 150.6590, population: 11000 },
    { name: "Emu Heights", postcode: "2750", lat: -33.7360, lng: 150.6530, population: 5000 },
    { name: "Glenmore Park", postcode: "2745", lat: -33.7840, lng: 150.6710, population: 22000 },
    { name: "Mulgoa", postcode: "2745", lat: -33.8290, lng: 150.6430, population: 3000 },
    { name: "Wallacia", postcode: "2745", lat: -33.8660, lng: 150.6400, population: 2000 },
    { name: "Luddenham", postcode: "2745", lat: -33.8800, lng: 150.6940, population: 2500 },
    { name: "Orchard Hills", postcode: "2748", lat: -33.7830, lng: 150.7310, population: 5500 },
    { name: "Castlereagh", postcode: "2749", lat: -33.7030, lng: 150.6730, population: 3000 },
    { name: "Cranebrook", postcode: "2749", lat: -33.7170, lng: 150.7020, population: 18000 },
    { name: "Llandilo", postcode: "2747", lat: -33.7160, lng: 150.7410, population: 3500 },
    { name: "Londonderry", postcode: "2753", lat: -33.6530, lng: 150.7320, population: 6500 },
    { name: "Berkshire Park", postcode: "2765", lat: -33.6690, lng: 150.7850, population: 4000 },
    { name: "Agnes Banks", postcode: "2753", lat: -33.6120, lng: 150.7080, population: 2000 },
    { name: "Richmond", postcode: "2753", lat: -33.5990, lng: 150.7520, population: 6500 },
    { name: "Clarendon", postcode: "2756", lat: -33.6090, lng: 150.7810, population: 1500 },
    { name: "Windsor", postcode: "2756", lat: -33.6140, lng: 150.8130, population: 6000 },
    { name: "Windsor Downs", postcode: "2756", lat: -33.6520, lng: 150.8050, population: 2000 },
    { name: "South Windsor", postcode: "2756", lat: -33.6310, lng: 150.8050, population: 8000 },
    { name: "Bligh Park", postcode: "2756", lat: -33.6380, lng: 150.8170, population: 9000 },
    { name: "McGraths Hill", postcode: "2756", lat: -33.6180, lng: 150.8370, population: 5500 },
    { name: "Vineyard", postcode: "2765", lat: -33.6490, lng: 150.8460, population: 4000 },
    { name: "Oakville", postcode: "2765", lat: -33.6180, lng: 150.8700, population: 3500 },
    { name: "Pitt Town", postcode: "2756", lat: -33.5870, lng: 150.8590, population: 4500 },
    { name: "Pitt Town Bottoms", postcode: "2756", lat: -33.5700, lng: 150.8580, population: 300 },
    { name: "Glossodia", postcode: "2756", lat: -33.5330, lng: 150.7820, population: 3500 },
    { name: "Freemans Reach", postcode: "2756", lat: -33.5580, lng: 150.7600, population: 2000 },
    { name: "Wilberforce", postcode: "2756", lat: -33.5530, lng: 150.8330, population: 3000 },
    { name: "Kurrajong", postcode: "2758", lat: -33.5440, lng: 150.6780, population: 2500 },
    { name: "Kurrajong Heights", postcode: "2758", lat: -33.5230, lng: 150.6360, population: 1500 },
    { name: "Kurmond", postcode: "2757", lat: -33.5430, lng: 150.7080, population: 1200 },
    { name: "Bowen Mountain", postcode: "2753", lat: -33.5800, lng: 150.6450, population: 1000 },
    { name: "Grose Vale", postcode: "2753", lat: -33.5720, lng: 150.6930, population: 1500 },
    { name: "Grose Wold", postcode: "2753", lat: -33.5850, lng: 150.7080, population: 1000 },
    { name: "North Richmond", postcode: "2754", lat: -33.5680, lng: 150.7350, population: 5500 },
    { name: "Hobartville", postcode: "2753", lat: -33.6100, lng: 150.7390, population: 4500 },
    { name: "Yarramundi", postcode: "2753", lat: -33.6260, lng: 150.6680, population: 500 },
    { name: "Springwood", postcode: "2777", lat: -33.6990, lng: 150.5640, population: 9000 },
    { name: "Valley Heights", postcode: "2777", lat: -33.7070, lng: 150.5850, population: 3500 },
    { name: "Warrimoo", postcode: "2774", lat: -33.7220, lng: 150.6050, population: 4500 },
    { name: "Blaxland", postcode: "2774", lat: -33.7440, lng: 150.6220, population: 8000 },
    { name: "Mount Riverview", postcode: "2774", lat: -33.7280, lng: 150.6320, population: 3000 },
    { name: "Glenbrook", postcode: "2773", lat: -33.7680, lng: 150.6240, population: 5500 },
    { name: "Lapstone", postcode: "2773", lat: -33.7750, lng: 150.6350, population: 1500 },
    { name: "Faulconbridge", postcode: "2776", lat: -33.6920, lng: 150.5400, population: 4000 },
    { name: "Linden", postcode: "2778", lat: -33.7120, lng: 150.5060, population: 700 },
    { name: "Woodford", postcode: "2778", lat: -33.7290, lng: 150.4830, population: 2500 },
    { name: "Hazelbrook", postcode: "2779", lat: -33.7230, lng: 150.4590, population: 4000 },
    { name: "Lawson", postcode: "2783", lat: -33.7210, lng: 150.4290, population: 3000 },
    { name: "Bullaburra", postcode: "2784", lat: -33.7300, lng: 150.4130, population: 1500 },
    { name: "Wentworth Falls", postcode: "2782", lat: -33.7100, lng: 150.3750, population: 6500 },
    { name: "Leura", postcode: "2780", lat: -33.7130, lng: 150.3380, population: 5000 },
    { name: "Katoomba", postcode: "2780", lat: -33.7140, lng: 150.3110, population: 8000 },
    { name: "Medlow Bath", postcode: "2780", lat: -33.6710, lng: 150.2840, population: 800 },
    { name: "Blackheath", postcode: "2785", lat: -33.6330, lng: 150.2840, population: 5000 },
    { name: "Mount Victoria", postcode: "2786", lat: -33.5860, lng: 150.2540, population: 1200 },
  ]
};

// Common pest info by suburb characteristics
const pestRiskByType = {
  coastal: ["termites", "cockroaches", "mosquitoes", "silverfish", "ants", "spiders"],
  bushland: ["termites", "spiders", "snakes", "possums", "rodents", "ticks"],
  urban: ["cockroaches", "rodents", "ants", "bed bugs", "fleas", "spiders"],
  riverNear: ["termites", "mosquitoes", "cockroaches", "rodents", "spiders"],
  newDevelopment: ["termites", "ants", "spiders", "rodents"],
  oldHousing: ["termites", "cockroaches", "rodents", "silverfish", "spiders", "borers"]
};

// Generate risk factors based on region
function generateRiskFactors(suburb, region) {
  const factors = [];

  if (region.includes("eastern") || region.includes("northern-beaches")) {
    factors.push("Coastal humidity increases termite and cockroach activity");
    factors.push("Sandy soils provide ideal termite nesting conditions");
  }

  if (region.includes("hills") || region.includes("upper-north") || region.includes("sutherland")) {
    factors.push("Bushland proximity increases spider and possum encounters");
    factors.push("Native vegetation attracts termites and other wood-boring pests");
  }

  if (region.includes("western") || region.includes("south-west")) {
    factors.push("Hot summers drive pests indoors seeking water and shelter");
    factors.push("New developments disturb existing pest colonies");
  }

  if (region.includes("inner")) {
    factors.push("High density living increases cockroach and rodent spread");
    factors.push("Older building stock prone to termite damage and rodent entry");
  }

  // Add suburb-specific factors
  factors.push(`${suburb.name} properties require regular termite inspections due to Sydney's high-risk termite zone classification`);

  return factors.slice(0, 4);
}

// Generate common pests based on region
function getCommonPests(region) {
  if (region.includes("coastal") || region.includes("eastern") || region.includes("northern-beaches")) {
    return ["termites", "cockroaches", "ants", "spiders", "mosquitoes", "silverfish"];
  }
  if (region.includes("hills") || region.includes("bushland")) {
    return ["termites", "spiders", "rodents", "possums", "ants", "wasps"];
  }
  if (region.includes("inner") || region.includes("urban")) {
    return ["cockroaches", "rodents", "ants", "bed bugs", "fleas", "spiders"];
  }
  return ["termites", "cockroaches", "rodents", "ants", "spiders", "fleas"];
}

// Generate property types based on suburb characteristics
function getPropertyTypes(suburb, region) {
  if (region.includes("inner-city") || suburb.name.includes("Point") || suburb.name.includes("Bay")) {
    return ["apartments", "terraces", "commercial"];
  }
  if (region.includes("western") && suburb.population > 15000) {
    return ["houses", "townhouses", "apartments"];
  }
  if (region.includes("hills") || region.includes("upper-north")) {
    return ["houses", "acreage", "townhouses"];
  }
  return ["houses", "townhouses", "apartments", "commercial"];
}

// Get nearby suburbs
function getNearbySuburbs(currentSuburb, region, allSuburbsInRegion) {
  const nearby = allSuburbsInRegion
    .filter(s => s.name !== currentSuburb.name)
    .slice(0, 4)
    .map(s => s.name.toLowerCase().replace(/\s+/g, '-'));
  return nearby;
}

// Generate average prices (vary slightly by region)
function getAveragePrices(region) {
  const baseMultiplier = region.includes("eastern") || region.includes("inner-city") || region.includes("north-shore") ? 1.2 : 1;
  return {
    generalPest: `$${Math.round(180 * baseMultiplier)} - $${Math.round(320 * baseMultiplier)}`,
    termiteInspection: `$${Math.round(250 * baseMultiplier)} - $${Math.round(450 * baseMultiplier)}`,
    termiteTreatment: `$${Math.round(2500 * baseMultiplier)} - $${Math.round(5000 * baseMultiplier)}`,
    rodentControl: `$${Math.round(200 * baseMultiplier)} - $${Math.round(380 * baseMultiplier)}`
  };
}

// Generate local info paragraph
function generateLocalInfo(suburb, region) {
  const regionDescriptions = {
    "inner-city": `${suburb.name} is located in Sydney's inner city, featuring a mix of heritage buildings, modern apartments, and commercial properties.`,
    "eastern-suburbs": `${suburb.name} is a sought-after Eastern Suburbs location known for its coastal lifestyle and mix of residential properties.`,
    "inner-west": `${suburb.name} is part of Sydney's vibrant Inner West, featuring a mix of Federation homes, terraces, and newer developments.`,
    "north-shore": `${suburb.name} is situated on Sydney's prestigious North Shore, known for its leafy streets and quality housing.`,
    "upper-north-shore": `${suburb.name} is located in the Upper North Shore, featuring established homes surrounded by bushland.`,
    "northern-beaches": `${suburb.name} is part of Sydney's Northern Beaches, offering a coastal lifestyle with proximity to bushland reserves.`,
    "western-sydney": `${suburb.name} is a growing Western Sydney suburb with a mix of established homes and new developments.`,
    "south-sydney": `${suburb.name} is located in South Sydney, featuring established residential areas with good transport links.`,
    "sutherland-shire": `${suburb.name} is part of the Sutherland Shire, known as 'The Shire', with a mix of bushland and beaches.`,
    "hills-district": `${suburb.name} is located in Sydney's Hills District, featuring family homes and semi-rural properties.`,
    "south-west-sydney": `${suburb.name} is part of South West Sydney, one of the fastest-growing regions with many new estates.`,
    "penrith-region": `${suburb.name} is located in the Penrith region at the foot of the Blue Mountains.`
  };

  const base = regionDescriptions[region] || `${suburb.name} is a Sydney suburb.`;
  return `${base} The area experiences common Sydney pest issues including termites, cockroaches, and rodents. Regular pest inspections are recommended for all property types in this area.`;
}

// Main generation function
function generateSuburbData() {
  const outputDir = path.join(__dirname, '..', 'public', 'suburbs');

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const allSuburbs = [];
  const regionLookup = {};

  // Process each region
  for (const [region, suburbs] of Object.entries(sydneySuburbs)) {
    console.log(`Processing ${region}: ${suburbs.length} suburbs`);

    for (const suburb of suburbs) {
      const slug = suburb.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      const suburbData = {
        id: slug,
        name: suburb.name,
        slug: slug,
        postcode: suburb.postcode,
        region: region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        regionSlug: region,
        council: getCouncil(region),
        coordinates: {
          lat: suburb.lat,
          lng: suburb.lng
        },
        population: suburb.population,
        propertyTypes: getPropertyTypes(suburb, region),
        commonPests: getCommonPests(region),
        pestRiskFactors: generateRiskFactors(suburb, region),
        localInfo: generateLocalInfo(suburb, region),
        nearbySuburbs: getNearbySuburbs(suburb, region, suburbs),
        seoTitle: `Pest Control ${suburb.name} - Licensed Local Exterminators | Compare & Save`,
        seoDescription: `Find licensed pest control in ${suburb.name} ${suburb.postcode}. Compare local operators, read reviews, get free quotes. Termite inspections from $250.`,
        averagePrices: getAveragePrices(region)
      };

      // Save individual suburb file
      const filePath = path.join(outputDir, `${slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(suburbData, null, 2));

      // Add to index
      allSuburbs.push({
        id: slug,
        name: suburb.name,
        postcode: suburb.postcode,
        region: suburbData.region,
        regionSlug: region
      });

      // Build region lookup
      if (!regionLookup[region]) {
        regionLookup[region] = [];
      }
      regionLookup[region].push(slug);
    }
  }

  // Generate index file
  const indexData = {
    total: allSuburbs.length,
    lastUpdated: new Date().toISOString(),
    regions: regionLookup,
    suburbs: allSuburbs.sort((a, b) => a.name.localeCompare(b.name))
  };

  const indexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

  console.log(`\n✅ Generated ${allSuburbs.length} suburb files`);
  console.log(`📁 Index file created at: ${indexPath}`);
}

// Helper to get council name
function getCouncil(region) {
  const councils = {
    "inner-city": "City of Sydney",
    "eastern-suburbs": "Waverley / Randwick Council",
    "inner-west": "Inner West Council",
    "north-shore": "North Sydney / Lane Cove Council",
    "upper-north-shore": "Ku-ring-gai / Hornsby Council",
    "northern-beaches": "Northern Beaches Council",
    "western-sydney": "Cumberland / Blacktown Council",
    "south-sydney": "Bayside / Canterbury-Bankstown Council",
    "sutherland-shire": "Sutherland Shire Council",
    "hills-district": "The Hills Shire Council",
    "south-west-sydney": "Liverpool / Camden / Campbelltown Council",
    "penrith-region": "Penrith City / Blue Mountains Council"
  };
  return councils[region] || "Various Councils";
}

// Run the generator
generateSuburbData();
