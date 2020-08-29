const electron = require('electron');
const path = require('path');
const url = require('url');
const { protocol } = require('electron');

const {app ,BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addFlightWindow;

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
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// Add flight window creation

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

    //addFlightWindow.menuBarVisible = false;
}

// Add new flight
ipcMain.on('flight:add', function(e,flight){
    console.log("Adding the following flight: ",flight);
    mainWindow.webContents.send('flight:add',flight);
    addFlightWindow.close();
});

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
                    app.quit();
                }
            }
        ]
    }
]

//Dev tools
if (process.env.NODE_ENV !== "production"){
    menuTemplate.push({
        label: 'Developer',
        submenu: [{
            label: 'Dev tools',
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role: 'reload'
        }]
    });
}