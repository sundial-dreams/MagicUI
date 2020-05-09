import fs from 'fs';

export function saveBase64ToImage(filename: string, data: string) {
  return new Promise((resolve, reject) => {
    const b = data.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = new Buffer(b, 'base64');
    fs.writeFile(filename, dataBuffer, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve(filename);
    });
  });
}

export function saveCodeFile(filename: string, code: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, code, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve(filename);
    })
  })
}