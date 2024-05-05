document.addEventListener('DOMContentLoaded', () => {
    const fetchCottages = async () => {
        try {
            const response = await fetch('/api/cottages');
            const cottages = await response.json();

            displayCottages(cottages);
            populateCottageTypes(cottages);
        } catch (error) {
            console.error("Error fetching cottages:", error);
        }
    };

    const populateCottageTypes = (cottages) => {
        const typeSelect = document.getElementById("cottageType");
        const uniqueTypes = [...new Set(cottages.map(cottage => cottage.type))];

    const anyOption = document.createElement("option");
        anyOption.value = "Любой";
        anyOption.textContent = "Любой";
        typeSelect.appendChild(anyOption); // Add "Any" as the first option

        uniqueTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    };

    const displayCottages = (cottages) => {
        const cottageGrid = document.querySelector('.property-grid');
        cottageGrid.innerHTML = ""; // Clear existing cottages

        cottages.forEach(cottage => {
            const cottageCard = document.createElement('div');
            cottageCard.classList.add('property-card');

            const img = document.createElement('img');
            img.src = cottage.image;

            const description = document.createElement('h3');
            description.textContent = `Тип: ${cottage.type}, Площадь: ${cottage.size}m²`;

            const price = document.createElement('p');
            price.textContent = `Цена: BYN${cottage.price}`;

            cottageCard.appendChild(img);
            cottageCard.appendChild(description);
            cottageCard.appendChild(price);

            cottageGrid.appendChild(cottageCard);
        });
    };

    document.getElementById('filter-cottages').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const cottageType = formData.get("cottageType");
        const size = parseFloat(formData.get("size"));
        const minPrice = parseFloat(formData.get("price-min"));
        const maxPrice = parseFloat(formData.get("price-max"));

        fetch('/api/cottages')
            .then(response => response.json())
            .then(cottages => {
                const filteredCottages = cottages.filter(cottage => {
                    let match = true;

                    if (cottageType !== "Любой" && cottageType && cottage.type !== cottageType) match = false;
                    if (!isNaN(size) && Math.abs(cottage.size - size) > 20) match = false;
                    if (!isNaN(minPrice) && cottage.price < minPrice) match = false;
                    if (!isNaN(maxPrice) && cottage.price > maxPrice) match = false;

                    return match;
                });

                displayCottages(filteredCottages);
            })
            .catch(error => console.error("Error fetching cottages:", error));
    });

    fetchCottages(); // Initial fetch
});

