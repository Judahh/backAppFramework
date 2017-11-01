import { app, BrowserWindow, Tray, nativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';

export class Electron {
    private mainWindow: any;

    private touch;
    private touchSimulate;
    private frame;
    private kiosk;
    private node;
    private development;
    private width: number;
    private height: number;
    private fullscreen;
    private useContentSize
    private autoHideMenuBar
    private title: string;
    private console;
    private url: string;
    private zoom: number;
    private overlayScrollbars;
    private icon: string;

    constructor(touch?, touchSimulate?, frame?, kiosk?, node?, width?, height?, fullscreen?, useContentSize?,
        autoHideMenuBar?, title?, consoleVar?, url?, zoom?, overlayScrollbars?, development?, icon?) {
        if (app != undefined) {
            this.touch = touch === '1' ? 1 : 0;
            this.touchSimulate = touchSimulate === '1' ? 1 : 0;
            this.frame = frame === '1' ? 1 : 0;
            this.kiosk = kiosk === '1' ? 1 : 0;
            this.node = node === '1' ? 1 : 0;
            this.width = parseInt(width || 1920, 10);
            this.height = parseInt(height || 1080, 10);
            this.fullscreen = fullscreen === '1' ? 1 : 0;
            this.useContentSize = useContentSize === '1' ? 1 : 0;
            this.autoHideMenuBar = autoHideMenuBar === '1' ? 1 : 0;
            this.title = title;
            this.console = consoleVar === '1' ? 1 : 0;
            this.url = url;
            this.zoom = parseFloat(zoom || 1.0);
            this.overlayScrollbars = overlayScrollbars === '1' ? 1 : 0;
            this.development = development;
            this.icon = icon;

            // enable touch events if your device supports them
            if (this.touch) {
                app.commandLine.appendSwitch('--touch-devices');
            }
            // simulate touch events - might be useful for touchscreen with partial driver support
            if (this.touchSimulate) {
                app.commandLine.appendSwitch('--simulate-touch-screen-with-mouse');
            }

            if (this.development === 'development') {
                console.log('Running in development mode');
                this.height = 600;
                this.width = 800;
                this.kiosk = 0;
                this.console = 1;
                this.frame = 1;
            }

            this.init();
        }
    }

    private createWindow() {
        // Create the browser window.
        //let appIcon = new Tray('../favicon.png');
        let appIcon = nativeImage.createFromPath(path.resolve(this.icon));
        // console.log(path.resolve(this.icon));

        //   mainWindow = new BrowserWindow({width: 800, height: 600})

        this.mainWindow = new BrowserWindow({
            fullscreen: this.fullscreen,
            frame: !!(this.frame),
            useContentSize: this.useContentSize,
            autoHideMenuBar: this.autoHideMenuBar,
            icon: appIcon,
            width: this.width,
            height: this.height,
            title: this.title,
            kiosk: !!(this.kiosk),
            webPreferences: {
                nodeIntegration: !!(this.node),
                zoomFactor: this.zoom//,
                //   overlayScrollbars: !!(this.overlayScrollbars)
            }
        });

        this.mainWindow.loadURL(this.url);//TODO: remover 3000

        // Open the DevTools.
        if (this.console) {
            this.mainWindow.webContents.openDevTools()
        }

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
        let _self = this;
        app.on('ready', () => { _self.createWindow() });
        // Quit when all windows are closed.
        app.on('window-all-closed', () => { _self.quit() });

        app.on('activate', () => { _self.activate() });
    }
}