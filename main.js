const electron = require('electron');
const path = require('path');
const url = require('url');
const { protocol } = require('electron');
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const {app ,BrowserWindow, Menu, ipcMain} = electron;

//Windows
let mainWindow;
let addFlightWindow;

//Flight data
let logBookCSV = path.join(__dirname,"LogBook.csv");
let allFlights = [];

let logBookHeaders = [
    {id: 'FlightDate', title: 'Date'},
    {id: 'AType', title: 'Aircraft Type'},
    {id: 'AReg', title: 'Aircraft Reg'},
    {id: 'Captain', title: 'Captain'},
    {id: 'HOC', title: 'Holder Operating Capacity'},
    {id: 'From', title: 'From'},
    {id: 'To', title: 'To'},
    {id: 'Departure', title: 'Departure Time'},
    {id: 'Arrival', title: 'Arrival Time'},
    {id: 'P1', title: 'In Command (P1)'},
    {id: 'P2', title: 'Dual (P2)'},
    {id: 'Remarks', title: 'Remarks'},
  ]

const csvWriter = createCsvWriter({
    path: logBookCSV,
    header:logBookHeaders
  });

// Listen for app to start
app.on('ready',function(){
    mainWindow = new BrowserWindow(
        {
            width: 1500,
            height: 500,
            webPreferences: {
                nodeIntegration: true
            }
        });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: 'file:',
            slashes: true
        }));

    mainWindow.on('close', function(){
        writeLogBookToDiskAndQuit();

    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.webContents.on('did-finish-load',() => {loadLogbookFromDisk();});

});

function createAddFlightWindow(){
    addFlightWindow = new BrowserWindow({
        width: 300,
        height: 500,
        title: 'Add flight',
        webPreferences: {
            nodeIntegration: true
        }
    });
    addFlightWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "newFlight.html"),
            protocol: 'file:',
            slashes: true
        }));

    addFlightWindow.on('close',function(){
        addFlightWindow = null;
    });

    addFlightWindow.menuBarVisible = false;
}

// Add new flight
ipcMain.on('flight:add', function(e,flight){
    console.log("Adding the following flight: ",flight);
    allFlights.push(flight);

    console.log("All flight data is now: ",allFlights);

    mainWindow.webContents.send('flight:add',flight);
    addFlightWindow.close();
});

function loadLogbookFromDisk(){
    if (fs.existsSync(logBookCSV)){
        fs.createReadStream(logBookCSV).pipe(csvParser())
            .on('data', (row) => {
                let loadedFlight = {};
                //Convert CSV headers back into ids
                Object.keys(row).forEach(function(key){
                    loadedFlight[normaliseHeaderName(key)] = row[key];
                });

                allFlights.push(loadedFlight);

                console.log("Loading the following flight from csv: ",loadedFlight);
                mainWindow.webContents.send('flight:add',loadedFlight);
            })
            .on('end',() => {
                console.log('Flight data has been loaded.')
            });
    }
}

function writeLogBookToDiskAndQuit(){
    try{
        console.log("All flight data:", allFlights);
        csvWriter.writeRecords(allFlights).then(() => {app.quit();})
        console.log("Log book has been saved")
    }
    catch(err){
        console.log(err);
    }
}

function normaliseHeaderName(title){
    let id = null;
    logBookHeaders.forEach(function(item){
        if (title === item.title)
            id = item.id;
    });
    return id;
}

const menuTemplate = [
    {
        label: 'File',
        submenu: 
        [
            {
                label: 'Add flight',
                click(){
                    createAddFlightWindow();
                }
            },
            {
                label: 'Quit',
                click(){
                    writeLogBookToDiskAndQuit();
                }
            }
        ]
    }
]

//Dev tools
if (process.env.NODE_ENV !== "production"){
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Dev tools',
                click(item,focusedWindow){
                        focusedWindow.toggleDevTools();
                    },
            },
            {
                role: 'reload'
            },
            {
                label: 'Reload from Disk',
                click(){
                        loadLogbookFromDisk();
                    },
            }
        ]
    });
}