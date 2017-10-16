import { app, BrowserWindow, Tray, nativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';

export class Electron {
    private mainWindow: any;

    constructor() {
        if(app!=undefined){
            this.init();
        }
    }

    private createWindow() {
        // Create the browser window.
        //let appIcon = new Tray('../favicon.png');
        let appIcon = nativeImage.createFromPath(__dirname + '/favicon.png');

        //   mainWindow = new BrowserWindow({width: 800, height: 600})

        this.mainWindow = new BrowserWindow({
            fullscreen: false,
            frame: true,
            useContentSize: true,
            autoHideMenuBar: true,
            //icon: __dirname + '/favicon.png'
            icon: appIcon
        });

        this.mainWindow.loadURL('http://localhost:3000/');//TODO: remover 3000

        // Open the DevTools.
        //win.webContents.openDevTools()

        // Emitted when the window is closed.
        this.mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null
        })
    }

    private quit() {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private activate() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (this.mainWindow === null) {
            this.createWindow();
        }
    }

    private init() {
        app.on('ready', this.createWindow);
        // Quit when all windows are closed.
        app.on('window-all-closed', this.quit);

        app.on('activate', this.activate);
    }
}