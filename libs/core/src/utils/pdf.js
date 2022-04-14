export const openPdfInNewTab = ({ title, url }) => {
  // we can't open a new tab with a pdf dataurl anymore
  // see https://stackoverflow.com/questions/2805330/opening-pdf-string-in-new-window-with-javascript
  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(
    `<html>
          <head>
              <title>${title}</title>
          </head>
          <body>
              <iframe width='100%' height='100%' src='${url}'></iframe>
          </body>
      </html>`
  );
};
