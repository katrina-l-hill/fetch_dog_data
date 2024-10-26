// dogApi.js

// Add your code here
async function fetchBreeds() {
    try {
        const response = await fetch("https://dogapi.dog/api/v2/breeds");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error.message);
    }
}
export {fetchBreeds};