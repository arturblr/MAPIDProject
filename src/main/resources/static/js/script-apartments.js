document.addEventListener('DOMContentLoaded', () => {
    const fetchApartments = async () => {
        try {
            const response = await fetch('/api/apartments');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apartments = await response.json();

            if (!Array.isArray(apartments)) {
                throw new Error("Invalid data format received");
            }

            displayApartments(apartments);
            populateHouseOptions(apartments);
        } catch (error) {
            console.error("Error fetching apartments:", error);
            displayErrorMessage();
        }
    };

    const populateHouseOptions = (apartments) => {
        const houseSelect = document.getElementById("house");
        houseSelect.innerHTML = ""; // Clear previous options

        const anyOption = document.createElement("option");
        anyOption.value = "Любой";
        anyOption.textContent = "Любой";
        houseSelect.appendChild(anyOption); // Add "Any" as the first option

        const uniqueHouses = [...new Set(apartments.map(apartment => apartment.house))];

        uniqueHouses.forEach(house => {
            const option = document.createElement("option");
            option.value = house;
            option.textContent = house;
            houseSelect.appendChild(option);
        });
    };

    const displayApartments = (apartments) => {
        const apartmentGrid = document.querySelector('.property-grid');
        apartmentGrid.innerHTML = ""; // Clear existing apartments

        apartments.forEach(apartment => {
            const apartmentCard = document.createElement('div');
            apartmentCard.classList.add('property-card');

            const img = document.createElement('img');
            img.src = apartment.image;

            const description = document.createElement('h3');
            description.textContent = `Дом: ${apartment.house}, Количество комнат: ${apartment.rooms}, Площадь: ${apartment.area}m²`;

            const price = document.createElement('p');
            price.textContent = `Цена: BYN${apartment.price}`;

            apartmentCard.appendChild(img);
            apartmentCard.appendChild(description);
            apartmentCard.appendChild(price);

            apartmentGrid.appendChild(apartmentCard);
        });
    };

    const displayErrorMessage = () => {
        const apartmentGrid = document.querySelector('.property-grid');
        apartmentGrid.innerHTML = "<p>Error</p>";
    };

    document.getElementById('filter-apartments').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const house = formData.get("house");
        const floor = parseFloat(formData.get("floor"));
        const rooms = parseFloat(formData.get("rooms"));
        const area = parseFloat(formData.get("area"));
        const minPrice = parseFloat(formData.get("price-min"));
        const maxPrice = parseFloat(formData.get("price-max"));

        fetch('/api/apartments')
            .then(response => response.json())
            .then(apartments => {
                if (!Array.isArray(apartments)) {
                    throw new Error("Invalid data format received");
                }

                const filteredApartments = apartments.filter(apartment => {
                    let match = true;

                    if (house !== "Любой" && house && apartment.house !== house) match = false;
                    if (!isNaN(floor) && apartment.floor !== floor) match = false;
                    if (!isNaN(rooms) && apartment.rooms !== rooms) match = false;
                    if (!isNaN(area) && Math.abs(apartment.area - area) > 20) match = false;
                    if (!isNaN(minPrice) && apartment.price < minPrice) match = false;
                    if (!isNaN(maxPrice) && apartment.price > maxPrice) match = false;

                    return match;
                });

                displayApartments(filteredApartments);
            })
            .catch(error => {
                console.error("Error fetching apartments:", error);
                displayErrorMessage();
            });
    });

    fetchApartments(); // Initial fetch
});
