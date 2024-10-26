import fetch from 'node-fetch';
import { fetchBreeds, fetchBreedDetails, fetchDogFacts } from './dogApi'; 

jest.mock('node-fetch'); // Mock node-fetch at the top level

describe('Dog API Functions', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Reset all mocks before each test
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Normal Test Cases
    test('Normal: fetchBreeds should fetch breeds successfully', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ breeds: ['Labrador', 'Beagle'] }),
            ok: true,
        };

        fetch.mockResolvedValue(mockResponse);

        const result = await fetchBreeds();
        
        expect(fetch).toHaveBeenCalledWith('https://dogapi.dog/api/v2/breeds');
        expect(mockResponse.json).toHaveBeenCalled();
        expect(result).toEqual({ breeds: ['Labrador', 'Beagle'] });
    });

    test('Normal: fetchBreedDetails should fetch breed details successfully', async () => {
        const breedId = '1';
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ id: breedId, name: 'Labrador' }),
            ok: true,
        };

        fetch.mockResolvedValue(mockResponse);

        const result = await fetchBreedDetails(breedId);

        expect(fetch).toHaveBeenCalledWith(`https://dogapi.dog/api/v2/breeds/${breedId}`);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(result).toEqual({ id: breedId, name: 'Labrador' });
    });

    test('Normal: fetchDogFacts should fetch dog facts successfully', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                data: [
                    { attributes: { body: "Dog fact 1" } },
                    { attributes: { body: "Dog fact 2" } }
                ]
            })
        };

        fetch.mockResolvedValue(mockResponse); // Mock fetch response

        const result = await fetchDogFacts();
    
        expect(result).toEqual(["Dog fact 1", "Dog fact 2"]); // Expect the facts array
        expect(console.log).toHaveBeenCalledWith("Dog Facts:", ["Dog fact 1", "Dog fact 2"]);
    });

    // Edge Test Cases
    test('Edge: fetchBreeds should handle empty list of breeds', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ breeds: [] }),
            ok: true,
        };

        fetch.mockResolvedValue(mockResponse);

        const result = await fetchBreeds();

        expect(result).toEqual({ breeds: [] }); 
    });

    test('Edge: fetchBreedDetails should handle non-existent breed ID', async () => {
        const breedId = '999'; // Assume this ID does not exist
        const mockResponse = {
            ok: false,
            status: 404,
        };
    
        fetch.mockResolvedValue(mockResponse); // Mock fetch response

        const result = await fetchBreedDetails(breedId);
    
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining("HTTP error! Status: 404"));
        expect(result).toBeNull(); // Ensure this matches the actual implementation
    });

    test('Edge: fetchDogFacts should handle malformed data response', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({}), // Simulate a response without 'data'
        };
    
        fetch.mockResolvedValue(mockResponse); // Mock fetch response
    
        const result = await fetchDogFacts();
    
        expect(result).toEqual([]); // Expecting an empty array when 'data' is not present
        expect(console.error).toHaveBeenCalledWith("No 'data' property found in response."); // Ensure this matches the actual implementation
    });
});
