export function useFileReader() {
  const reader = new FileReader();

  const readAsync = method => file =>
    new Promise((resolve, reject) => {
      reader[method](file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
    });

  const readAsArrayBuffer = readAsync('readAsArrayBuffer');
  const readAsBinaryString = readAsync('readAsBinaryString');
  const readAsDataURL = readAsync('readAsDataURL');
  const readAsText = readAsync('readAsText');

  return [
    reader,
    { readAsArrayBuffer, readAsBinaryString, readAsDataURL, readAsText }
  ];
}
