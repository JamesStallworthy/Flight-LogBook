# Flight-LogBook
A log book application to be used as a backup to physical pilot log books.

The aim is to provide a free application that stores all files locally in CSV so can be easily exported somewhere else.

Application is build using electron and nodejs. When application is ready for a "release" I will add that to github. 

# To do
- [x] Add new flight to log book
- [x] Display all flights in table
- [x] Save flight to disk
- [x] Load flight from disk and populate table
- [x] Load data columns from config
- [ ] Edit flight
- [x] Delete flight
- [ ] Show totals
- [x] Make the UI nice (Ongoing!)
- [ ] Modify the columns from UI
- [ ] Refactor any ugly code
- [ ] Create are you sure you want to save window
- [ ] Timestamp and backup log books
- [ ] Save aircraft that can be selected from drop down
- [ ] Create a release and maybe build a pipline

# Outstanding issues
Application sometimes crashes on close due to the way the csv is written on close. Need to investigate.

# Future maybes
- [ ] Mobile?
- [ ] Heat map of flight?
- [ ] Syncing?


