# Flight-LogBook
A log book application to be used as a backup to physical pilot log books.

The aim is to provide a free application that stores all files locally in CSV so can be easily exported somewhere else.

Application is built using electron and nodejs. When application is ready for a "release" I will add that to github. 

![Image](/ExampleImage.PNG?raw=true "Example image")

# To do
- [x] Add new flight to log book
- [x] Display all flights in table
- [x] Save flight to disk
- [x] Load flight from disk and populate table
- [x] Load data columns from config
- [x] Edit flight
- [x] Delete flight
- [x] Show totals
- [x] Inline add flight
- [x] Make the UI nice (Ongoing!)
- [ ] Setup/Settings screens
- [ ] Modify the columns from UI
- [ ] Searches / filters
- [ ] Pagination
- [ ] Refactor any ugly code (Lots of it!)
- [ ] Create are you sure you want to save/delete window
- [ ] Timestamp and backup log books
- [ ] Save aircraft that can be selected from drop down
- [ ] Create a release and maybe build a pipline
- [ ] Select where log book is saved

# Outstanding issues
- [ ] Application sometimes crashes on close due to the way the csv is written on close. Need to investigate.
- [x] When editing, pull the step correctly into the input field
- [x] If any P1 or P2 fields are empty then a NaN is given as the total

# Future maybes
- [ ] Mobile?
- [ ] Heat map of flight?
- [ ] Syncing?


