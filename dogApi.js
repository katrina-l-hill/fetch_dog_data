// dogApi.js

// Add your code here
export async function fetchBreeds() {
    const url = await fetch("https://dogapi.dog/api/v2/breeds");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error.message);
    }
}