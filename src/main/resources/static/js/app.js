document.addEventListener('DOMContentLoaded', function() {
   // Fetch cottages and display them
   if (document.getElementById('cottages-list')) {
      fetch('/cottages')
         .then(response => response.json())
         .then(cottages => {
            const list = document.getElementById('cottages-list');
            cottages.forEach(cottage => {
               const item = document.createElement('div');
               item.innerHTML = `
                  <h3>${cottage.type}</h3>
                  <p>Area: ${cottage.area} sqm</p>
                  <p>Price per sqm: ${cottage.price_per_sqm}</p>
                  <p>Description: ${cottage.description}</p>
               `;
               list.appendChild(item);
            });
         });
   }

   // Fetch apartments and display them
   if (document.getElementById('apartments-list')) {
      fetch('/apartments')
         .then(response => response.json())
         .then(apartments => {
            const list = document.getElementById('apartments-list');
            apartments.forEach(apartment => {
               const item = document.createElement('div');
               item.innerHTML = `
                  <h3>Apartment in ${apartment.house}</h3>
                  <p>Floor: ${apartment.floor}</p>
                  <p>Rooms: ${apartment.rooms}</p>
                  <p>Area: ${apartment.area} sqm</p>
                  <p>Price: ${apartment.price}</p>
                  <p>Features: ${apartment.additional_features}</p>
               `;
               list.appendChild(item);
            });
         });
   }

   // Cottage cost calculator
   if (document.getElementById('calculate-cottage-cost')) {
      document.getElementById('calculate-cottage-cost').addEventListener('click', function() {
         const type = document.getElementById('cottage-type').value;
         fetch(`/cottages/${type}`)
            .then(response => response.json())
            .then(cottage => {
               const cost = cottage.area * cottage.price_per_sqm;
               document.getElementById('results').innerHTML = `Cottage Cost: ${cost}`;
            });
      });
   }

   // Apartment cost calculator
   if (document.getElementById('calculate-apartment-cost')) {
      document.getElementById('calculate-apartment-cost').addEventListener('click', function() {
         const id = document.getElementById('apartment-id').value;
         fetch(`/apartments/${id}`)
            .then(response => response.json())
            .then(apartment => {
               document.getElementById('results').innerHTML = `Apartment Cost: ${apartment.price}`;
            });
      });
   }

   // Contact form submission
   if (document.getElementById('send-inquiry')) {
      document.getElementById('send-inquiry').addEventListener('click', function() {
         const name = document.getElementById('name').value;
         const email = document.getElementById('email').value;
         const message = document.getElementById('message').value;
         fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
         });
      });
   }
});
