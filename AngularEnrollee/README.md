# AngularEnrollee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Development server
After cloning the file user is requested to run the server first by opening the command prompt and cd into the server folder by `cd server` and after that executing this cmd `deno run --allow-net server.ts`. After succesfull execution, It will run the server on port `http://localhost:8080/enrollees` with a message in blue in command prompt. 

Once server is started than cd into the AngularEnrollee folder (by `cd ..` -- if in a server folder and then `cd AngularEnrollee`) and execute `ng serve`. it will serve the application on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  
## Direction
-> User will end on the landing page.  
-> Navigation bar is provided to guide the user to enrollee/home page.  
  ## Enrollee page
  -> Search box is provided on top left hand side to search an enrollee by their name and ID.  
  -> Filter is present on top right hand side to filter the enrollees by thier active/inactive status.  
  -> On enrollee page user can edit and save the enrollee by clicking on edit button.  
  -> Once edit button is pressed close and save button will be displayed to close or save the enrollee.  
  -> Enrollee will be saved only if save button is pressed.  
  -> Site is responsive, hence when it breaksdown to medium screen or further "Date of Birth" will be changed to "DOB", action tab will be removed and then enrollees will be updated by clicking on their ID, form will display on the top below search box and filter. navigation bar item will be in the pressable button.  
  -> If user search an enrollee then it is advised to clear the content of the search box, and procceed further if needed.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
