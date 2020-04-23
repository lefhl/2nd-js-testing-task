let spots_block = document.querySelector('.main');
let confirmBtn = document.querySelector('#session-confirm');
let cancelBtn = document.querySelector('#session-cancel');
let sessionSelect = document.querySelector('#session-time');
let currentTime = new Date().getHours();

for (let i = 0; i < 10; i++) {
  let line = document.createElement('div');
  line.className = 'row-seats';

  for(let j = 0; j < 30; j++) {
    let spot = document.createElement('div');
    spot.className = "spot";
    spot.dataset.x = j + 1;
    spot.dataset.y = i + 1;
    spot.dataset.toggle = 'modal';
    spot.dataset.target = '#exampleModal';

    line.append(spot);
  }

  spots_block.append(line);
}

let spots = document.querySelectorAll('.spot');
let selectedSpot;

spots.forEach( function(spot, i, spots) {
    spot.addEventListener('click', (e) => {
      selectedSpot = e.target;
      if(selectedSpot.hasAttribute('data-reservation-time')) {

        if(selectedSpot.getAttribute('data-reservation-time')) {
          sessionSelect.value = selectedSpot.dataset.reservationTime;
        } else {
          sessionSelect.value = `${getComingSessionTime()}:00`;
        }

      } else {
        sessionSelect.value = `${getComingSessionTime()}:00`;
      }
    })
})

confirmBtn.addEventListener('click', (e) => {
  selectedSpot.dataset.reservationTime = sessionSelect.value;
  selectedSpot.classList.add('reservation');
})

cancelBtn.addEventListener('click', (e) => {
  selectedSpot.dataset.reservationTime = '';
  selectedSpot.classList.remove('reservation');
  sessionSelect.value = '';
})

function getComingSessionTime() {
  let nextSessionTime = 9;
  while(nextSessionTime < currentTime) {
    nextSessionTime += 2;
  }
  return nextSessionTime;
}
