const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  try {
    const root = process.cwd();
    const base64 = [1, 2, 3]
      .map((n) => fs.readFileSync(path.join(root, 'pdf', `protocol.b64.${n}`), 'utf8').trim())
      .join('');
    const pdf = Buffer.from(base64, 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="protocol.pdf"');
    res.setHeader('Content-Length', String(pdf.length));
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(pdf);
  } catch (error) {
    res.status(500).send('Unable to load protocol.pdf');
  }
};
