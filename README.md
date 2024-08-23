# Country Holidays Application

This application allows users to view holidays for various countries. Users can select a country and see holidays for the current year or switch between years to see holidays from 2020 to 2030.

## Dependencies

The application is built using Angular 18 and Material Design. RxJS was used for handling asynchronous data streams and HTTP requests. The app fetches data from the Nager.Date API.

## Important note ⚡⚡⚡
I've created .env file for storing base api url and put it into .gitignore as it usually happens. I don't know if I had to do it in case of test task, but I'd done so. Sorry if it caused any inconvenience. You can find the steps to project start and .env file content below.

### Key App Parts imolemented
- **MainPageComponent**
- **CountryPageComponent**
- **CountryCardComponent**
- **FilterPipe**: A custom pipe to filter data based on search terms and filter fileld(key).
- **Api Url Interceptor**

## Installation

1. **Clone the Repository**
   
   ```
   git clone https://github.com/ElizabethVasilenko13/test-assessment-countries.git
   ```
3. **Navigate to the folder(if needed)**
   
   ```
   cd test-assessment-countries
   ```
5. **Install Dependencies**
    
   ```
   npm install
   ```
7. **Add .env file**

   Create a .env file in the root directory of the project to store environment variables
    
   ```
   API_BASE_URL=https://api.nager.at/v2/
   ```
9. **Run the Application:**
     
   ```
   ng serve
   ```
