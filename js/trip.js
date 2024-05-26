let trips = JSON.parse(localStorage.getItem('trips'));
let url = new URL(window.location);
let tripId = url.searchParams.get('trip');

let trip = trips.find(trip => trip.id = tripId);

// get total expenses
let totalExpense = 0;
let balancesTotal = [];

trip.participants.forEach(participant => {
    balancesTotal[participant.id] = 0;
});

trip.expenses.forEach(expense => {
    totalExpense += expense.amount;
    balancesTotal[expense.participant_id] += expense.amount;
})

console.log(balancesTotal);

// getting the participant names in an array
let participantNames = [];
let expensePerParticipant = totalExpense / trip.participants.length;
let ownsPerParticipant = [];

trip.participants.forEach(participant => {
    participantNames.push(' ' + participant.name);
    ownsPerParticipant[participant.id] = Math.round((balancesTotal[participant.id] - expensePerParticipant) * 100) / 100;
})

// Added eventlisteners to the page buttons
const pageButtons = document.querySelectorAll('[data-toggle="page-button"]');
pageButtons.forEach(btn => btn.addEventListener('click', switchPage))

// Adding values to html
document.getElementById('page-title').innerText = trip.title;
document.getElementById('participants-list').innerText = participantNames;
document.getElementById('total-expenses').innerText = '€' + totalExpense;

function switchPage(e) {
    let button = e.target;

    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        document.querySelector(btn.dataset.target).classList.remove('show');
    });

    button.classList.add('active');
    document.querySelector(button.dataset.target).classList.add('show');
}

// Loading and calculating balances
const negative = document.getElementById('negative');
const positive = document.getElementById('positive');
const graphRow = document.getElementById('graphRow');

let positiveOwns = ownsPerParticipant.entries(owns => Math.abs(owns));
let maxOwns = Math.max(positiveOwns);

ownsPerParticipant.forEach((owns, index) => {
    let graphRowDiv = document.createElement('div');

    graphRowDiv.classList.add('mb-2');
    graphRowDiv.innerHTML = graphRow.cloneNode(true).innerHTML;

    graphRowDiv.querySelector('#name').innerHTML = getName(index);
    let backgroundBar = graphRowDiv.querySelector('#background-bar');

    if(owns > 0){
        backgroundBar.classList.add('bg-success-subtle');
        backgroundBar.style.width = Math.abs(100 / maxOwns * owns) + '%';
        backgroundBar.style.height = '1.6rem;';
    }else{
        graphRowDiv.querySelector('#background-bar').classList.add('bg-danger-subtle');
    }
})

function getName(id) {
    return trips.participants.find(participant => participant.id = id);
}   