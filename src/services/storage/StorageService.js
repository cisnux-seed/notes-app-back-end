const fs = require('fs');

class StorageService {
  #folder;

  constructor(folder) {
    this.#folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  // file is readstream
  writeFile(file, meta) {
    // Di JavaScript kita bisa
    // mendapatkan nilai timestamp
    // dengan menggunakan expression
    const filename = +new Date() + meta.filename;
    const path = `${this.#folder}/${filename}`;

    // filestream is writestream
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      // pipe the write stream to the read stream
      /**
* We then use the pipe command to
* transfer the data from the readstream to
* the write stream. The pipe command will
* take all the data which comes into the readstream,
* and push it to the writestream.
*/
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
