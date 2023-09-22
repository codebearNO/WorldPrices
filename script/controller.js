"use strict";

function setSort(sortField, sortDirection) {
	model.sort.direction = sortDirection;
	model.sort.field = sortField;
	updateView();
}

function init() {
	for (let country of model.costStats) {
		let continent = getContinent(country);
		if (!continent) continue;
		country.continent = continent;
		const continents = model.filter.continents;
		if (!continents.includes(continent)) {
			continents.push(continent);
		}
	}
	updateView();
}

function getContinent(country) {
	for (let country2 of model.countriesWithContinents) {
		if (country.Country == country2.country) {
			return country2.continent;
		}
	}
	return null;
}

function filterByContinent(continent) {
	model.filter.continent = continent == "" ? null : continent;
	updateView();
}
