const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const movies = [
    { id: 1, genre: 'action', name: ['Batman', 'Superman', 'Ironman', 'Spiderman'] },
    { id: 2, genre: 'romance', name: ['Titanic', 'Love Story', 'Some bullshit', '50 Shades of Grey or smthng'] },
    { id: 3, genre: 'horror', name: ['Annabelle', 'Exorcism', 'Scary Movie', 'Mummy'] }
];
app.get('/', function (req, res) {
    res.send('Root');
});

app.get('/api/genres', function (req, res) {
    res.send(movies);
});

app.get('/api/genres/:genre', function (req, res) {
    const movie = movies.find(g => g.genre === req.params.genre);
    if (!movie) {
        return res.status(404).send('The given genre not found.');
    }
    res.send(movie);
});

app.post('/api/genres', (req, res) => {
    // const result = validateGenre(req.body); 
    // if (result.error) {
    const { error } = validateGenre(req.body);
    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const movie = {
        id: movies.length + 1,
        genre: req.body.genre,
        name: req.body.name,
    };
    movies.push(movie);
    res.send(movie);
});


app.put('/api/genres/:genre', (req, res) => {
    const movie = movies.find(g => g.genre === req.params.genre);
    if (!movie) return res.status(404).send('The given genre not found.');

    // validate
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    movie.genre = req.body.genre;
    movie.name = req.body.name;
    res.send(movie);
});

app.delete('/api/genres/:genre', (req, res) => {
    const movie = movies.find(g => g.genre === req.params.genre);
    if (!movie) return res.status(404).send('The given genre not found.');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});


function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(4).required(),
        name: Joi.array().min(2).items(Joi.string())
    });
    return schema.validate(genre);

}

app.listen(3000, () => console.log('Listening on port 3000...'));