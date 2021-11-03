
let Trips = [];
let Dates = [];
let Years = [];
let Objects = [];
let yearsData = [];
let numbersData = [];



document.addEventListener("DOMContentLoaded", function (event) {
    let user = JSON.parse(localStorage.getItem('storedUsers'));

    fetch('https://my-json-server.typicode.com/evgkazantseva/jsontest/quotes')
        .then(response => response.json())
        .then(quotes => {
            let randomQuote = Math.floor(Math.random() * quotes.length);
            document.querySelector('.user-card__quote-text').innerHTML = quotes[randomQuote].quote;
            document.querySelector('.user-card__quote-author').innerHTML = quotes[randomQuote].author;
        })
        .catch(err => {
            console.log(err);
            document.querySelector('.user-card__quote-text').innerHTML = `Nice to see you!</div>`;
            document.querySelector('.user-card__quote-author').innerHTML = `;-)`;
        });

    if (user != null) {
        document.querySelector('.welcome-card__header').innerHTML = `Hello, ${user[0].firstName} ${user[0].lastName}<br>`;
        document.querySelector('.user-account__login').innerHTML += `${user[0].email} <a class="menuLink" href="start.html">Exit</a>`;
        document.querySelector('.user-account__avatar').innerHTML = `<img class="user-account__img" src="${user[0].avatar}"
        onclick="toggleMenu();"></img>`;
    } else {
        document.querySelector('.welcome-card__header').innerHTML = `Hello, My Darling!<br>`;
        document.querySelector('.user-account__login').innerHTML = `newuser <a class="menuLink" href="start.html">Exit</a>`;
        document.querySelector('.user-account__avatar').innerHTML = `<img class="user-account__img" src = "assets/images/avatar.png"
        onclick = "toggleMenu();" ></img>`
    }

    let restoredTrips = JSON.parse(localStorage.getItem("Trips"));
    let restoredDates = localStorage.getItem("Dates");
    let restoredObjects = JSON.parse(localStorage.getItem("Objects"));

    if ((restoredTrips != null) && (restoredTrips.length != 0)) {
        for (i = 0; i < restoredTrips.length; i++) {
            Trips.push(restoredTrips[i]);
        }

        for (let trip of restoredTrips) {
            document.getElementById("trips").innerHTML +=
                `<div class="trip">
                <div class="tripSection">${trip.date}</div>
                <div class="tripSection">${trip.country}</div>
                <div class="tripSection">${trip.city}</div>
                <a href="travelCard.html"><div class="tripSection" onclick="openDetails()">>>details</div></a>
                <button class="deleteTrip" onclick="deleteTrip('${trip.id}');">delete</button>
                </div>`
        }

        if (restoredDates != null) {
            Dates = restoredDates.split(",");
        }

        for (i = 0; i < restoredObjects.length; i++) {
            Objects.push(restoredObjects[i]);
        }

        let dataX = ((localStorage.getItem('yearsData').split(',')));
        let dataY = ((localStorage.getItem('numbersData').split(',')));

        const statistics = {
            labels: dataX,
            datasets: [{
                label: 'My travels',
                backgroundColor: 'rgba(203, 248, 245, 1)',
                data: dataY,
            }]
        };
        const statisticConfig = {
            type: 'bar',
            data: statistics
        };

        let myStatistics = new Chart(
            document.getElementById('myStatistics'),
            statisticConfig
        );

        let lastTraveDate = lastTravelDate(restoredTrips);
        document.querySelector('.user-statistic').innerHTML += `<div class="user-statistic__country">Travels count: ${restoredTrips.length}</div><div class="user-statistic__last-date">Last travel date: ${lastTraveDate}</div>`;

    } else {
        document.querySelector('.user-statistic').innerHTML += `<div class="user-statistic__country">Travels count: 0</div><div class="user-statistic__last-date">Last travel date: No travels</div>`;
        document.getElementById("trips").innerHTML +=
            `<div class="trip">No travel</div>`;
    }
});

function setStorageTrips(Trips) {
    localStorage.setItem("Trips", JSON.stringify(Trips));
}

function setStorageDates(Dates) {
    localStorage.setItem("Dates", Dates);
}

function setStorageCities(Cities) {
    localStorage.setItem("Cities", JSON.stringify(Cities));
}

function setStorageYears(Years) {
    localStorage.setItem("Years", Years);
}

function setStorageObjects(Objects) {
    localStorage.setItem("Objects", JSON.stringify(Objects));
}

function lastTravelDate(Trips) {
    let lastTravelDate = new Date('1900-01-01T00:00:00');
    for (i = 0; i < Trips.length; i++) {
        tripDate = new Date(Trips[i].date);
        if (tripDate > lastTravelDate) {
            lastTravelDate = tripDate;
        };
    }
    return lastTravelDate.toLocaleDateString();
};

function openAddJourneyForm() {
    const form = document.querySelector('#blabla');
    const popup = document.querySelector('.popup');
    form.classList.add('open');
    popup.classList.add('popup_open');
}

function closeForm() {
    window.location.reload();
}

function sendJourney() {
    let trip = {
        id: (Math.random() * (1000 - 0) + 0).toFixed(3),
        date: document.getElementById("dateTravel").value,
        country: document.getElementById("countryTravel").value,
        city: document.getElementById("cityTravel").value,
    }
    if (trip.date == "" || trip.country == "" || trip.city == "") {
        document.getElementById("trips").innerHTML += `<div class="error">You have not completed your travel information!</div>`;
    }
    else {
        Trips.push(trip);
        document.getElementById("trips").innerHTML +=
            `<div class="trip">
            <div class="tripSection">${trip.date}</div>
            <div class="tripSection">${trip.country}</div>
            <div class="tripSection">${trip.city}</div>
            <a href="travelCard.html">
            <div class="tripSection" onclick="openDetails()">>>details</div>
            </a>
            <button class="deleteTrip" onclick="deleteTrip('${trip.id}');">delete</button>
            </div>`
        setStorageTrips(Trips);
        sendDate();
    }
    window.location.reload();
    sendStatistics()
}

function openDetails() {
    window.addEventListener('click', event => {
        let id = event.target.dataset.id;
        console.log(id);
    })
}

function deleteTrip(id) {

    let tripIndex = Trips.findIndex(t => t.id === id);
    if (tripIndex > -1) {
        Trips.splice(tripIndex, 1);
    }
    setStorageTrips(Trips);

    let restoredDates = localStorage.getItem("Dates");

    if (restoredDates != null) {
        Dates = restoredDates.split(",");
    }

    let dateIndex = Dates.findIndex(d => d.id === id);
    if (dateIndex > -2) {
        Dates.splice(dateIndex, 1);
    }

    setStorageDates();

    Dates.forEach(element => Years.unshift(element.slice(0, 4)));
    setStorageYears(Years);

    Objects = Years.map(year => ({ 'year': year }))
    setStorageObjects(Objects);

    sendStatistics();
    window.location.reload();
};

function sendDate() {
    let dateData = document.getElementById("dateTravel").value;

    if (dateData == "") {
        return;
    }

    else {
        Dates.push(dateData);
        setStorageDates(Dates);

        Dates.forEach(element => Years.unshift(element.slice(0, 4)));
        setStorageYears(Years);

        Objects = Years.map(year => ({ 'year': year }))
        setStorageObjects(Objects);
    }
}

// function openDetails() {

//     document.getElementById('visitedCities').innerHTML += ;

//         window.addEventListener('click', event => {
//             let id = event.target.dataset.id;
//         })

// }

function sendStatistics() {

    let years = JSON.parse(localStorage.getItem('Objects'));
    let result = new Object();

    years.forEach(item => {
        if (result[item.year]) {
            result[item.year] = result[item.year] + 1;
        }
        else {
            result[item.year] = 1
        }
    });

    yearsData.push(Object.keys(result));
    numbersData.push(Object.values(result));

    localStorage.setItem('yearsData', yearsData);
    localStorage.setItem('numbersData', numbersData);
}


