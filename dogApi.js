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
        return null; // Return null for missing ID
    }
    console.log("Fetching breed details for ID:", breedId);

    try {
        const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);
        if (!response.ok) {
            console.error(`Error fetching breed details for ID ${breedId}: HTTP error! Status: ${response.status}`);
            return null; // Return null for non-existent IDs
        }
        const data = await response.json();
        console.log("Breed Details:", data);

        return data; // Return the breed details
    } catch (error) {
        console.error("Error fetching breed details:", error);
        return null; // Return null in case of error
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
        if (!data.data) {
            console.error("No 'data' property found in response.");
            return []; // Return an empty array if no 'data' property exists
        }

        // Correctly access the facts
        const facts = data.data.map(fact => fact.attributes.body);
        console.log("Dog Facts:", facts);

        return facts; // Return the array of dog facts
    } catch (error) {
        console.error("Error fetching dog facts:", error);
        return []; // Return empty array in case of error
    }
}

fetchDogFacts();