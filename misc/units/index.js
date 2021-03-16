const csv = require('csv');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const commonUnits = fs.readFileSync('./commonUnits.csv', 'UTF-8');
const detailedInfo = fs.readFileSync('./rec20_Rev15e-2020.csv', 'UTF-8');
const unitsParsed = parse(commonUnits, {
  columns: true,
  skip_empty_lines: true,
});
const detailedInfoParsed = parse(detailedInfo, {
  columns: true,
  skip_empty_lines: true,
});

let generatedJSON = [];
for (let unit of unitsParsed) {
  const unitName = unit.unit.trim();
  const detailedUnitInfo = detailedInfoParsed.find(
    (e) => e['Symbol'] === unitName
  );
  generatedJSON.push(detailedUnitInfo);
}
generatedJSON = generatedJSON.filter((e) => e);
fs.writeFileSync('./commonUnits.json', JSON.stringify(generatedJSON));
