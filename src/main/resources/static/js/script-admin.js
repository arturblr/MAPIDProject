document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('admin-panel');
    const loginSection = document.getElementById('admin-login');
    const propertiesListSection = document.getElementById('properties-list');

function formDataToJson(formData) {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}

    if (!loginForm) {
        console.error("Login form not found");
        return;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const username = formData.get("username");
        const password = formData.get("password");

        fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                loginSection.style.display = 'none';
                adminPanel.style.display = 'block';
                propertiesListSection.style.display = 'block';
                loadMessages();
                displayProperties();
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    const addApartmentForm = document.getElementById('addApartmentForm');
    if (addApartmentForm) {
        addApartmentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const newApartment = formDataToJson(formData);

            fetch('/api/apartments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newApartment)
            })
            .then(response => {
                console.log("Apartment add response", response);
                return response.json();
            })
            .then(data => alert("Квартира успешно добавлена"))
            .catch(error => console.error('Error adding apartment:', error));
        });
    }

    const addCottageForm = document.getElementById("addCottageForm"); // Corrected
    if (addCottageForm) {
        addCottageForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const newCottage = formDataToJson(formData);

            fetch("/api/cottages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCottage),
            })
            .then(response => {
                console.log("Cottage add response", response);
                if (response.status === 401) {
                    alert("Session expired. Please log in again.");
                    location.reload(); // Reload to login
                } else {
                    return response.json();
                }
            })
            .then(data => {
                    alert("Коттедж успешно добавлен");
            })
            .catch(error => console.error("Error adding cottage:", error));
        });
    }
});

// Function Definitions:

function loadMessages() {
    fetch('/api/messages')
    .then(response => response.json())
    .then(messages => {
        const userMessages = document.getElementById('user-messages');
        userMessages.innerHTML = ""; // Clear previous messages

        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            const createdAt = new Date(message.createdAt);
            const formattedDate = createdAt instanceof Date && !isNaN(createdAt.getTime()) ? createdAt.toLocaleString() : "Date not available";

            messageDiv.innerHTML = `
                <p>
                    <strong>${message.name}</strong>: ${message.message} <br/>
                    <em>${message.email}</em> <br/>
                    <span>${formattedDate}</span>
                </p>
                <a href="mailto:${message.email}?subject=Response to your message">${message.name}</a>
                <button onclick="deleteMessage(${message.id})">Отвечено(del)</button>
            `;
            userMessages.appendChild(messageDiv);
        });

    })
    .catch(error => console.error("Error loading messages:", error));
}

function deleteMessage(id) {
    fetch(`/api/messages/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadMessages())
    .catch(error => console.error("Error deleting message:", error));
}

     function displayProperties() {
         loadCottages();
         loadApartments();
     }

     function loadCottages() {
         fetch('/api/cottages')
             .then(response => response.json())
             .then(cottages => {
                 const cottagesList = document.getElementById('cottages-list');
                 cottagesList.innerHTML = ""; // Clear previous content
                 cottages.forEach(cottage => {
                     const cottageDiv = document.createElement('div');
                     cottageDiv.innerHTML = `
                         <p>Тип: ${cottage.type}, Площадь: ${cottage.size}m², Цена: ${cottage.price} BYN</p>
                         <img src="${cottage.image}" alt="Cottage image">
                         <button onclick="editCottage(${cottage.id})">Редактировать</button>
                         <button onclick="deleteCottage(${cottage.id})">Удалить</button>
                     `;
                     cottagesList.appendChild(cottageDiv);
                 });
             })
             .catch(error => console.error("Error loading cottages:", error));
     }

     function loadApartments() {
         fetch('/api/apartments')
             .then(response => response.json())
             .then(apartments => {
                 const apartmentsList = document.getElementById('apartments-list');
                 apartmentsList.innerHTML = ""; // Clear previous content
                 apartments.forEach(apartment => {
                     const apartmentDiv = document.createElement('div');
                     apartmentDiv.innerHTML = `
                         <p>Дом: ${apartment.house}, Кол-во комнат: ${apartment.rooms}, Площадь: ${apartment.area}m², Цена: ${apartment.price} BYN</p>
                         <img src="${apartment.image}" alt="Apartment image">
                         <button onclick="editApartment(${apartment.id})">Редактировать</button>
                         <button onclick="deleteApartment(${apartment.id})">Удалить</button>
                     `;
                     apartmentsList.appendChild(apartmentDiv);
                 });
             })
             .catch(error => console.error("Error loading apartments:", error));
     }

     function editCottage(id) {
        const newType = prompt("Новый тип");
         const newSize = prompt("Новая площадь (m²):");
         const newPrice = prompt("Новая цена:");
         const newImg = prompt("Новая URL картинки")

         if (newType && newSize && newPrice && newImg) {
             fetch(`/api/cottages/${id}`, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ type: newType, size: newSize, price: newPrice, image: newImg })
             })
             .then(() => loadCottages())
             .catch(error => console.error("Error editing cottage:", error));
         }
     }

     function deleteCottage(id) {
         if (confirm("Точно удалить?")) {
             fetch(`/api/cottages/${id}`, {
                 method: 'DELETE'
             })
             .then(() => loadCottages())
             .catch(error => console.error("Error deleting cottage:", error));
         }
     }

     function editApartment(id) {
         const newHouse = prompt("Новый дом:");
         const newRooms = prompt("Новое количество комнат:");
         const newArea = prompt("Новая площадь (m²):");
         const newPrice = prompt("Новая цена:");
         const newImg = prompt("Новая URL картинки");

         if (newHouse && newRooms && newArea && newPrice && newImg) {
             fetch(`/api/apartments/${id}`, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({house: newHouse, rooms: newRooms, area: newArea, price: newPrice, image: newImg })
             })
             .then(() => loadApartments())
             .catch(error => console.error("Error editing apartment:", error));
         }
     }

     function deleteApartment(id) {
         if (confirm("Точно удалить?")) {
             fetch(`/api/apartments/${id}`, {
                 method: 'DELETE'
             })
             .then(() => loadApartments())
             .catch(error => console.error("Error deleting apartment:", error));
         }
     }




