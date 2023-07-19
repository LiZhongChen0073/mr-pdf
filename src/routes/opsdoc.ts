import express from 'express';
import { generatePDF, generatePDFOptions } from '../core/utils';
import fs from 'fs';
import path from 'path';

const opsdocRoute = express.Router();
const config = JSON.parse(fs.readFileSync('./config/config.json').toString());
var filePath = path.join(config.temp_pdf_dir, 'temp.pdf')
opsdocRoute.get('/download', async function (req, res) {
    let url: string;
    if (typeof req.query.URL === 'string') {
        url = req.query.URL;
    } else {
        url = String(req.query.URL);
    }
    if (!url.endsWith('/')) {
        url = url + '/'
    }
    await downloadOps(url, filePath)
    try {
        res.download(filePath, function (err) {
            if (!err) {
                fs.rmSync(filePath)
                return
            } else {
                console.log(err.message)
                res.statusCode = 404;
                res.send('Cant find that file, sorry!');
            }
        });
    } catch (e) {
        console.log(e)
    }
})

export default opsdocRoute;

async function downloadOps(URL: string, outputFilename: string) {
    var option: generatePDFOptions = {
        initialDocURLs: [URL],
        excludeURLs: [],
        outputPDFFilename: outputFilename,
        pdfMargin: { top: 32, right: 32, bottom: 32, left: 32 },
        contentSelector: 'article',
        paginationSelector: '.pagination-nav__item--next > a',
        pdfFormat: 'Letter',
        excludeSelectors: [],
        cssStyle: '',
        puppeteerArgs: [],
        coverImage: '',
        disableTOC: false,
        headerTemplate: '',
        footerTemplate: '',
        username: config.ops.username,
        password: config.ops.password
    }
    try {
        await generatePDF(option)
    } catch (e) {
        console.log('download error:', e)
    }
}