const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const csv = fs.readFileSync('csv/data.csv', 'utf-8');
const records = parse(csv.toString());
records.forEach((r, i) => {
	console.log(i, r[0], r[1]);
});


const xlsx = require('xlsx');
const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.MovieList;
console.log(ws);
const records2 = xlsx.utils.sheet_to_json(ws);

records2.forEach((r, i) => {
	console.log(r.Title, r.Link);
});

for(const [i, r] of records2.entries()){
	console.log(i, r);
}

const axios = require('axios'); // ajax library
const cheerios = require('cheerio'); // html parsing

const crawler = async() => {
	await Promise.all(records2.map(async(r) => {
		const response = await axios.get(r.Link);
		if(response.status === 200){
			const html = response.data;
			console.log(html);
		}
	}));
}

crawler();





















