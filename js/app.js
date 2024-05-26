let trips = localStorage.getItem('trips');

if (!trips) {
    trips = [
        {
            id: 1,
            title: 'Spain 2024',
            participants: [
                {
                    id: 1,
                    name: 'James',
                },
                {
                    id: 2,
                    name: 'John',
                },
                {
                    id: 3,
                    name: 'Jack',
                }
            ],
            expenses: [
                {
                    participant_id: 1,
                    name: 'Food',
                    amount: 100,
                    created_at: Date.now()
                },
                {
                    participant_id: 2,
                    name: 'plane',
                    amount: 700,
                    created_at: Date.now()
                }
            ]
        },
        {
            id: 2,
            title: 'Lyon 2024',
            participants: [
                {
                    id: 1,
                    name: 'Hollie',
                },
                {
                    id: 2,
                    name: 'Emily',
                },
                {
                    id: 3,
                    name: 'Jack',
                }
            ],
            expenses: [
                {
                    participant_id: 1,
                    name: 'Plane',
                    amount: Date.now()
                }
            ]
        }
    ]
    localStorage.setItem('trips', JSON.stringify(trips));

    trips = localStorage.getItem('trips');
}
trips = JSON.parse(trips);

const tripsContainer = document.getElementById('trips-container');
const tripTemplate = document.getElementById('trip-card');

trips.forEach(trip => {
    let tripCardTemplateCopy = tripTemplate.cloneNode(true);
    let tripCard = document.createElement('div');

    tripCard.innerHTML = tripCardTemplateCopy.innerHTML;

    tripCard.querySelector('#title').innerText = trip.title;

    let participantNames = [];

    trip.participants.forEach(participant => {
        participantNames.push(' ' + participant.name);
    })

    tripCard.querySelector('#participants-list').innerHTML = participantNames
    tripCard.querySelector('a').href = tripCard.querySelector('a').href + `?trip=${trip.id}`;

    tripsContainer.appendChild(tripCard);
})

