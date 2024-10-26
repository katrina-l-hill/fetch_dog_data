import fetch from 'node-fetch';

// Add your code here
export async function fetchBreeds() {
    console.log("Fetching breeds...");
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Breeds fetched:", data);

        return data;
    } catch (error) {
        console.error("Failed to fetch dog breeds:", error);
    }
}

fetchBreeds();


export async function fetchBreedDetails(breedId) {
    if (!breedId) {
        console.error("No breed ID provided for fetchBreedDetails");
        return;
    }
    console.log("Fetching breed details for ID:", breedId);

    try {
        const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Breed Details:", data);

        return data;
    } catch (error) {
        console.error("Error fetching breed details:", error);
    }
}

fetchBreedDetails();

export async function fetchDogFacts() {
    console.log("Fetching dog facts...");
    try {
        const response = await fetch('https://dogapi.dog/api/v2/facts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Log the entire data object
        console.log("Full Data Response:", JSON.stringify(data, null, 2));

        // Check if 'data' property exists
        if (data.data) {
            console.log("Dog Facts Array:", data.data);
        } else {
            console.error("No 'data' property found in response.");
        }

        // Correctly access the facts
        const facts = data.data ? data.data.map(fact => fact.attributes.body) : [];
        console.log("Dog Facts:", facts);

        return data;
    } catch (error) {
        console.error("Error fetching dog facts:", error);
    }
}

fetchDogFacts();