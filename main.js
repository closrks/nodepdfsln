var PDFDocument = require('pdfkit');
var phantom = require('node-phantom');
var fs = require('fs');

/* pdfkit can create pdfs from an API object input */
var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('temp/pdfkit.pdf'));
doc.fontSize(100)
  .text('PDF?\n', {align: 'center'})
doc.fontSize(25)
  .text('Let\'s relax and have a beer instead :)', {align: 'center'})
doc.image('corona.jpg', 150, 250);
doc.end();

/* phantomjs API can create pdfs with css/html like a webpage */
// require phantomjs to be installed on server side
// see http://www.feedhenry.com/server-side-pdf-generation-node-js/
phantom.create(function(err, ph) {
  return ph.createPage(function(err, page) {
    page.set('content', '<h1>Hello Beer!</h1>')
    return page.render('temp/phantom.pdf', function() {
      // file is now written to disk
      ph.exit();
    });
  });
});