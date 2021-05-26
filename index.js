const mainEl = document.querySelector("main")
    
const asideEl = document.createElement("aside")
asideEl.setAttribute("class", "filters-section")

mainEl.append(asideEl)

function unique(array) {
    return [...new Set(array)];
  }

//First 20 breweries: https://api.openbrewerydb.org/breweries

const state = {
    breweries: [],
    filters: {
        type : "",
        cities : []
    }

}


//Breweries in the state of ohio: https://api.openbrewerydb.org/breweries?by_state=ohio
function getBreweriesByState(state) {
    return fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=50`)
    .then(function(response){
            return response.json()
        })
}

function listenToSelectStateForm(){
    const formEl = document.querySelector("#select-state-form")
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        
        const USState = formEl["select-state"].value
        
        getBreweriesByState(USState).then(function(breweriesFromServer) {
            const filteredBreweries = breweriesFromServer.filter(function(brewery){
                    return (
                        brewery.brewery_type === "brewpub" ||
                        brewery.brewery_type === "micro" ||
                        brewery.brewery_type === "regional" 
                    )
                })
                // slicedBreweries = filteredBreweries.slice(0, 10)
            state.breweries = filteredBreweries
            
            render()
        })                   
    })    
}

function renderSingleBreweryListItem(brewery) {
    const liEl = document.createElement("li");
  
    liEl.innerHTML = `
      <h2>${brewery.name}</h2>
      <div class="type">${brewery.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewery.street}</p>
        <p>
          <strong>${brewery.city}, ${brewery.postal_code}</strong>
        </p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewery.phone}</p>
      </section>
      <section class="link">
        <a href="${brewery.website_url}" target="_blank">
          Visit Website
        </a>
      </section>
    `;
  
    return liEl;
  }


function renderFilterSection() {
    //   //   <h2>Filter By:</h2> ✔
    // const h2El = document.createElement("h2")
    // h2l.innerText = "Filter By:"
    
    // asideEl.append(h2El)

    // //   <form id="filter-by-type-form" autocompete="off"> ✔
    // const typeFormEl = document.createElement("form")
    // typeFormEl.setAttribute("id", "filter-by-type-form")
    // typeFormEl.setAttribute("autocompete", "off")

    // asideEl.append(typeFormEl)
    
    // //     <label for="filter-by-type"><h3>Type of Brewery</h3></label> ✔
    // const labelTypeEl = document.createElement("label")
    // labelTypeEl.setAttribute("for", "filter-by-type")

    // const breweryH3El = document.createElement("h3")
    // breweryH3El.innerText = "Type of Brewery"
    
    // labelTypeEl.append(breweryH3El)

    // typeFormEl.append(labelTypeEl)
    
    // //     <select name="filter-by-type" id="filter-by-type"> ✔
    // const selectEl = document.createElement("select")
    // selectEl.setAttribute("name","filter-by-type")
    // selectEl.setAttribute("id","filter-by-type")

    // typeFormEl.append(selectEl)
    
    // //       <option value="">Select a type...</option> ✔
    // const optionOneEl = document.createElement("option")
    // optionOneEl.setAttribute("value", "")
    // optionOneEl.innerText = "Select a type..."
    
    // selectEl.append(optionOneEl)
    
    // //       <option value="micro">Micro</option> ✔
    // const optionTwoEl = document.createElement("option")
    // optionTwoEl.setAttribute("value", "micro")
    // optionTwoEl.innerText = "Micro"

    // selectEl.append(optionTwoEl)
    
    // //       <option value="regional">Regional</option> ✔
    // const optionThreeEl = document.createElement("option")
    // optionThreeEl.setAttribute("value", "regional")
    // optionThreeEl.innerText = "Regional"
    
    // selectEl.append(optionThreeEl)
    
    // //       <option value="brewpub">Brewpub</option> ✔
    // const optionFourEl = document.createElement("option")
    // optionFourEl.setAttribute("value", "brewpub")
    // optionFourEl.innerText = "Brewpub"

    // selectEl.append(optionFourEl)
    
    // //   <div class="filter-by-city-heading">
    // const cityDivEl = document.createElement("div")
    // cityDivEl.setAttribute("class", "filter-by-city-heading")
    
    // asideEl.append(cityDivEl)  
    
    // //     <h3>Cities</h3>
    // const citiesH3El = document.createElement("h3")
    // citiesH3El.innerText = "Cities"
    
    // cityDivEl.append(citiesH3El)

    // //     <button class="clear-all-btn">clear all</button>
    // const cityBtnEl = document.createElement("button")
    // cityBtnEl.setAttribute("class", "clear-all-btn")
    // cityBtnEl.innerText = "clear all"

    // cityDivEl.append(cityBtnEl)

        const asideEl = document.createElement("aside");
    asideEl.setAttribute("class", "filters-section");
    asideEl.innerHTML = `
        <h2>Filter By:</h2>
        <form id="filter-by-type-form" autocompete="off">
        <label for="filter-by-type">
            <h3>Type of Brewery</h3>
        </label>
        <select name="filter-by-type" id="filter-by-type">
            <option ${
            state.filters.type === "" ? "selected" : ""
            } value="">Select a type...</option>
            <option ${
            state.filters.type === "micro" ? "selected" : ""
            } value="micro">Micro</option>
            <option ${
            state.filters.type === "regional" ? "selected" : ""
            } value="regional">Regional</option>
            <option ${
            state.filters.type === "brewpub" ? "selected" : ""
            } value="brewpub">Brewpub</option>
        </select>
        </form>
        <div class="filter-by-city-heading">
        <h3>Cities</h3>
        <button class="clear-all-btn">clear all</button>
        </div>
        <form id="filter-by-city-form">
        
        </form>
    `;    

    // <form id="filter-by-city-form">
    //  <input type="checkbox" name="chardon" value="chardon" />
    //  <label for="chardon">Chardon</label
    //  ><input type="checkbox" name="cincinnati" value="cincinnati" />
    //  <label for="cincinnati">Cincinnati</label>
    //  More checkboxes    
    const selectEl = asideEl.querySelector("#filter-by-type");
    selectEl.addEventListener("change", function () {
    state.filters.type = selectEl.value;
    render();
     });

    const formEl = asideEl.querySelector("#filter-by-city-form");

    // WE WANT TO HAVE AN ARRAY WITH UNIQUE CITIES ORDERED ALPHABETICALLY
    // WE CAN DERIVE THIS INFO FROM THE BREWERIES
    // NO NEED TO STORE IT IN STATE
    const repeatedCities = state.breweries.map(function (brewery) {
        return brewery.city;
    });

    const uniqueCities = unique(repeatedCities);
    const sortedCities = uniqueCities.slice().sort();
}

function cityLoopInFilterSection(parentEl){
    for (const brewery of state.breweries){
        const inputEl = document.createElement("input")
        inputEl.setAttribute("type", "checkbox")
        inputEl.setAttribute("name", brewery.city)
        inputEl.setAttribute("value", brewery.city)
    
        parentEl.append(inputEl)

        const labelCityEl = document.createElement("label")
        labelCityEl.setAttribute("for", brewery.city)
        labelCityEl.innerText = brewery.city
    }    
}

function renderBreweryList() {
    const divEl = document.createElement("div");
  divEl.innerHTML = `
  <h1>List of Breweries</h1>
  <header class="search-bar">
    <form id="search-breweries-form" autocomplete="off">
      <label for="search-breweries"><h2>Search breweries:</h2></label>
      <input id="search-breweries" name="search-breweries" type="text" />
    </form>
  </header>
  <article>
    <ul class="breweries-list">
    </ul>
  </article>
  `;

  const breweryListEl = divEl.querySelector(".breweries-list");

  // All the breweries: state.breweries
  // The selected filter type: state.filterByType
  let breweriesToRender = state.breweries;

  if (state.filters.type !== "") {
    // code here depends on filter type
    breweriesToRender = breweriesToRender.filter(function (brewery) {
      return brewery.brewery_type === state.filters.type;
    });
  }

  if (state.filters.cities.length > 0) {
    // code here depends on filter cities
    breweriesToRender = breweriesToRender.filter(function (brewery) {
      return state.filters.cities.includes(brewery.city);
    });
  }

  breweriesToRender = breweriesToRender.slice(0, 10);

  for (const brewery of breweriesToRender) {
    const liEl = renderSingleBreweryListItem(brewery);
    breweryListEl.append(liEl);
  }

  mainEl.append(divEl);
}

function renderListSection() { 
// <h1>List of Breweries</h1> ✔
    const breweryListH1El = document.createElement("h1")
    breweryListH1El.innerText = "List of Breweries"

    mainEl.append(breweryListH1El)

// <header class="search-bar">
    const listHeaderEl = document.createElement("header")
    listHeaderEl.setAttribute("class", "search-bar")

    mainEl.append(listHeaderEl)

//   <form id="search-breweries-form" autocomplete="off">
    const searchFormEl = document.createElement("form")
    searchFormEl.setAttribute("id", "search-breweries-form")
    searchFormEl.setAttribute("autocomplete", "off")

    listHeaderEl.append(searchFormEl)

//     <label for="search-breweries"><h2>Search breweries:</h2></label>
    const searchLabelEl = document.createElement("label")
    searchLabelEl.setAttribute("for", "search-breweries")

    const searchH2El = document.createElement("h2")
    searchH2El.innerText = "Search breweries:"

    searchLabelEl.append(searchH2El)

    searchFormEl.append(searchLabelEl)

// <article>
    const searchArticleEl = document.createElement("article")

    mainEl.append(searchArticleEl)

//   <ul class="breweries-list">
    const searchUlEl = document.createElement("ul")
    searchUlEl.setAttribute("class", "breweries-list")

    searchArticleEl.append(searchUlEl)

//     <li>
    const searchLiEl = document.createElement("li")

    searchUlEl.append(searchLiEl)

//       <h2>Snow Belt Brew</h2>
    const searchLiH2El = document.createElement("h2")
    searchLiH2El.innerText = "Snow Belt Brew"

    searchLiEl.append(searchLiH2El)

//       <div class="type">micro</div>
    const searchLiDivEl = document.createElement("div")
    searchLiDivEl.setAttribute("class", "type")
    searchLiDivEl.innerText = "micro"

    searchLiEl.append(searchLiDivEl)  
            
//       <section class="address">
    const searchAddressSectionEl = document.createElement("section")
    searchAddressSectionEl.setAttribute("class", "address")

    searchLiEl.append(searchAddressSectionEl)

//         <h3>Address:</h3>
    const searchAddressH3El = document.createElement("h3")
    searchAddressH3El.innerText = "Address:"

    searchAddressSectionEl.append(searchAddressH3El)

//         <p>9511 Kile Rd</p>
    const searchAddressPRoadEl = document.createElement("p")
    searchAddressPRoadEl.innerText = "9511 Kile Rd"

    searchAddressSectionEl.append(searchAddressPRoadEl)

//         <p><strong>Chardon, 44024</strong></p>
    const searchAddressPPostCodeEl = document.createElement("p")
    
    const searchAddressPPostCodeStrongEl = document.createElement("strong")
    searchAddressPPostCodeStrongEl.innerText = "Chardon, 44024"

    searchAddressPPostCodeEl.append(searchAddressPPostCodeStrongEl)

    searchAddressSectionEl.append(searchAddressPPostCodeEl)

//       <section class="phone">
    const searchPhoneSectionEl = document.createElement("section")
    searchPhoneSectionEl.setAttribute("class", "phone")

    searchLiEl.append(searchPhoneSectionEl)

//         <h3>Phone:</h3>
    const searchPhoneH3El = document.createElement("h3")
    searchPhoneH3El.innerText = "Phone:"

    searchPhoneSectionEl.append(searchPhoneH3El)

//         <p>N/A</p>
    const searchPhonePEl = document.createElement("p")
    searchPhonePEl.innerText = "N/A"

    searchPhoneSectionEl.append(searchPhonePEl)

//       <section class="link">
    const searchLinkSectionEl = document.createElement("section")
    searchLinkSectionEl.setAttribute("class", "link")

    searchLiEl.append(searchLinkSectionEl)

//         <a href="null" target="_blank">Visit Website</a>
    const searchLinkAnchorEl = document.createElement("a")
    searchLinkAnchorEl.setAttribute("href", "null")
    searchLinkAnchorEl.setAttribute("target", "_blank")
    searchLinkAnchorEl.innerText = "Visit Website"

    searchLinkSectionEl.append(searchLinkAnchorEl)    
}
  
function render() {
    mainEl.innerHTML = "";
  
    renderFilterSection();
    renderBreweryList();
  }
  
listenToSelectStateForm()
