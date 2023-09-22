"use strict";

let app = document.getElementById("app");
updateView();
function updateView() {
	let countries = sort(model.costStats);
	countries = filter(countries);

	let html = ``;
	html += /*HTML*/ `
    <table>
      ${createTableHeaders()}
      ${createTableRows(countries)}
    </table>
  `;
	app.innerHTML = html;
}

function sort(countries) {
	countries = [...countries];
	const sortBy = model.sort.field;
	if (sortBy != null) {
		const direction = model.sort.direction;
		countries.sort((countryA, countryB) =>
			countryA[sortBy] == countryB[sortBy]
				? 0
				: countryA[sortBy] > countryB[sortBy]
				? direction
				: -direction
		);
	}
	return countries;
}

function filter(allCountries) {
	const selectedContinent = model.filter.continent;
	if (selectedContinent == null) return allCountries;
	let countries = [];
	for (let country of allCountries) {
		if (country.continent == selectedContinent) {
			countries.push(country);
		}
	}
	return countries;
}

function getSortButtons(sortField) {
	return /*HTML*/ `
  <button onclick="setSort('${sortField}', 1)">↓</button>
  <button onclick="setSort('${sortField}', -1)">↑</button>
  `;
}

function createTableHeaders() {
	let tableHTML = ``;
	tableHTML += /*HTML*/ `
	<tr>
		<th>Country ${getSortButtons("Country")}</th>
		<th>
			Continent ${getSortButtons("continent")}
			${getDropdownMenu()}	
		</th>
		<th>Beer (0,5l draught) ${getSortButtons(
			"Domestic Beer  (0.5 liter draught)"
		)}</th>
		<th>Internet pr month ${getSortButtons(
			"Internet  (60 Mbps or More, Unlimited Data, Cable/ADSL)"
		)}</th>
		<th>Gasoline (1L) ${getSortButtons("Gasoline  (1 liter)")}</th>
		<th>Rent 1mo outside city centre ${getSortButtons(
			"Apartment  (1 bedroom)  Outside of Centre"
		)}</th>
		<th>Rent 1mo in city centre ${getSortButtons(
			"Apartment  (1 bedroom)  in City Centre"
		)}</th>
	</tr>
		`;
	return tableHTML;
}

function getDropdownMenu() {
	let options = "";
	for (let continent of model.filter.continents) {
		let selected = continent === model.filter.continent ? "selected" : "";
		options += /*HTML*/ `
			<option ${selected}>${continent}</option>
			`;
	}
	return /*HTML*/ `
	<select onchange="filterByContinent(this.value)">
		<option value="">Show all</option>
		${options}
	</select>
	`;
}

function createTableRows(countries) {
	let tableHTML = "";
	for (let country of countries) {
		tableHTML += /*HTML*/ `
      <tr> 
        <td>${country.Country}</td>
        <td>${country.continent}</td>
        <td>${country["Domestic Beer  (0.5 liter draught)"]} NOK</td>
        <td>${country["Internet  (60 Mbps or More, Unlimited Data, Cable/ADSL)"]} NOK</td>
        <td>${country["Gasoline  (1 liter)"]} NOK</td>
        <td>${country["Apartment  (1 bedroom)  Outside of Centre"]} NOK</td>
        <td>${country["Apartment  (1 bedroom)  in City Centre"]} NOK</td>
      </tr>
    `;
	}
	return tableHTML;
}
