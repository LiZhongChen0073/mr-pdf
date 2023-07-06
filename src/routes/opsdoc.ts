import express from 'express';
import path from 'path';
import { generatePDF, generatePDFOptions } from '../core/utils';
import fs from 'fs';
const buffer = fs.readFileSync('../config/config.json')
const config = JSON.parse(buffer.toString());

var FILES_DIR = path.join(__dirname, '/usr/local/ops/pdf/')

var router = express.Router();
router.get('/download', async function (req, res, next) {

    // TODO
    // await download(req.params['URL'])

    // res.download(req.params.file, { root: FILES_DIR }, function (err) {
    //     if (!err) return; // file sent
    //     if (err.status !== 404) return next(err); // non-404 error
    //     // file for download not found
    //     res.statusCode = 404;
    //     res.send('Cant find that file, sorry!');
    // });

    // 获取到MD5或者hash来做缓存
    res.render('index', { title: 'Express' });
});

module.exports = router;

async function download(URL: string) {
    const username = config.ops.username;
    const password = config.ops.port;
    // generatePDF(URL)
}