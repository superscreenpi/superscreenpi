const {app, BrowserWindow, BrowserView, ipcMain} = require('electron')

const baseUrl = process.env.BASE_URL || 'https://superscreenpi.github.io/launcher';
const flags = {};
process.argv.filter(a => a.startsWith('--'))
    .forEach(a => flags[a] = true);

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 400,
        fullscreen: !!flags['--fullscreen'],
        title: 'SuperScreenPi'
    })
    win.setMenu(null);

    const navbar = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.addBrowserView(navbar);
    ipcMain.on('navbar', (event, arg) => {
        switch (arg) {
            case 'home':
                view.webContents.loadURL(`${baseUrl}/#/`);
                break;
        }
    });

    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            worldSafeExecuteJavaScript: true,
            enableRemoteModule: false,
        },
    })
    view.webContents.addListener('page-title-updated', () => {
        win.setTitle(view.webContents.getTitle());
    })
    win.addBrowserView(view);

    function resize() {
        const {width, height} = win.getBounds();
        const navbarHeight = 36;
        setImmediate(() => {
            navbar.setBounds({width, height: navbarHeight, x: 0, y: 0});
            view.setBounds({width, height: height - navbarHeight, x: 0, y: navbarHeight});
        });
    }

    win.addListener('resize', resize);
    win.addListener('will-resize', () => {
        resize();
    });
    navbar.webContents.loadURL(`${baseUrl}/#/navbar`);
    view.webContents.loadURL(`${baseUrl}/#/`);
}

app.whenReady().then(createWindow)
