export const openNewTabPdf = (orderId, pdfUrl) => {
  // we can't open a new tab with a pdf dataurl anymore
  // see https://stackoverflow.com/questions/2805330/opening-pdf-string-in-new-window-with-javascript
  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(
    `<html>
          <head>
              <title>Commande n°${orderId} - Bordereau de livraison Colissimo</title>
          </head>
          <body>
              <iframe width='100%' height='100%' src='${pdfUrl}'></iframe>
          </body>
      </html>`
  );
};
