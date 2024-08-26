# Country Holidays Application

This application allows users to view holidays for various countries. Users can select a country and see holidays for the current year or switch between years to see holidays from 2020 to 2030.

## Dependencies

The application is built using Angular 18 and Material Design. RxJS was used for handling asynchronous data streams and HTTP requests. The app fetches data from the Nager.Date API.

## Important note ⚡⚡⚡

I've created .env file for storing base api url and put it into .gitignore as it usually happens. I don't know if I had to do it in case of test task, but I'd done so. Sorry if it caused any inconvenience. You can find the steps to project start and .env file content below.

### Features

- **Country Search**: Allows users to search for countries.
- **Detail Country Page**: Provides information about country holidays.
- **Random Countries Holiday**: Displays holiday for randomly chosen countries.
- **Loading Indicators**: Shows loading spinners during data fetching.
- **Snackbar Notifications**: Provides feedback to users about the success or failure of operations.
- **Interceptor**: API URL interceptor for handling API requests.

### Architecture

The application is organized into two main parts:

- **Feature Modules**: Contains specific functionalities or features.
  - **Countries**: Manages country-related operations, including searching and displaying country and holidays.
- **Shared Modules**: Contains reusable components, services, and utilities.
  - **Components**: Include UI components like spinner and snackbar.
  - **Pipes**: Custom pipe for filtering and transforming data.
  - **Services**: Provides services used across different features, such as snackbar notifications.

## Installation

1. **Clone the repository**

   ```
   git clone https://github.com/ElizabethVasilenko13/test-assessment-countries.git
   ```

2. **Navigate to the project directory (if needed)**

   ```
   cd test-assessment-countries
   ```

3. **Install dependencies**
   ```
   npm install
   ```
4. **Add .env file**

   Create a .env file in the root directory of the project to store environment variables

   ```
   NG_APP_API_BASE_URL='https://date.nager.at/api/v3'
   ```

5. **Run the application:**

   ```
   ng serve
   ```

6. **Build the application**
   ```
   ng build
   ```

### Screenshots

![image](https://github.com/user-attachments/assets/66848aa7-0b5b-40a5-85f1-c9dfb520650b)

![image](https://github.com/user-attachments/assets/818225da-592c-4ce4-9991-6f35f893906e)
