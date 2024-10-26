Add the following to this `README.md` file:  
  * A short report explaining your design decisions and any challenges faced.
  * Documentation: Clear and concise documentation on how to run your application.
  
  # Report
  The Dog API Fetcher is a Node.js application designed to interact with the Dog API to retrieve information about dog breeds and dog facts. The code is organized into separate functions for fetching breeds, breed details, and dog facts. This modularity enhances readability and maintainability, allowing each function to serve a distinct purpose. Functions such as fetchBreeds(), fetchBreedDetails(breedId), and fetchDogFacts() are designed to handle specific API requests, which helps in isolating functionality and simplifies debugging. Each function incorporates robust error handling to manage potential issues, such as network errors or API response failures. By checking the response.ok status and logging appropriate error messages, the application can provide meaningful feedback to users or developers when something goes wrong.

  ## Challenges
  One challenge was ensuring that the application could gracefully handle unexpected API responses, such as missing properties or malformed data. Implementing checks for the existence of properties helped address this, but it required careful consideration of the API's documentation and expected data structures. 

  ## How to run
  - Open DevMatch
  - Open the online IDE or open desktop IDE
  - Clone repo: https://git.devmatch.xyz/d9b7ae08-7703-4011-a6eb-da8dca0303ae.git
  - If using desktop IDE, run main application using `node dogApi.js`