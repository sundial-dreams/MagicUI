import { app } from 'electron';
import { InstallIpcEventHandler } from './service/ipc';
import { getUser } from './service/session';
import { Login, Main } from './widget';

InstallIpcEventHandler();

app.on('ready', () => {
  Login.create();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  const user = await getUser();
  if (user.email) {
    Main.create();
    return;
  }
  Login.create();
});


