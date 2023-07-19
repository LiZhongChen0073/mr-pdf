import express from 'express';
import path from 'path';
import opsdocRoute from './routes/opsdoc';
import indexRouter from './routes/index';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/opsdoc/', opsdocRoute);

export default app;
