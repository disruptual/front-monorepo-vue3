export const AsyncReader {
  _readAsync(method) {
    const reader = new FileReader();

    return file =>
      new Promise((resolve, reject) => {
        reader[method](file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
      });
  }

  readAsArrayBuffer(file) {
    return _readAsync('readAsArrayBuffer')(file);
  }

  readAsBinaryString(file) {
    return _readAsync('readAsBinaryString')(file);
  }

  readAsDataURL(file) {
    return _readAsync('readAsDataURL')(file);
  }

  readAsText(file) {
    return _readAsync('readAsText')(file);
  }
}

export default () => new AsyncReader();
