import express from 'express';
import { buckleParser } from './buckle.js';

const app = express();
app.engine('bkl', buckleParser);

app.set('views', './templates');
app.set('view engine', 'bkl');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Austin',
        age: 22,
        hobbies: ['cooking', 'music'],
    });
});

app.listen(3000, () => console.log(`Listening on port 3000`));
