const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000


// middle weare
app.use(express.json());
const courses = [{
    id: 1,
    name: 'course1'
  },
  {
    id: 2,
    name: 'courses2'
  },
  {
    id: 3,
    name: 'courses3'
  }
]


app.get('/', (req, res) => {
  res.send('this is a test')
})

app.get('/api/courses', (req, res) => {
  res.send([1, 3, 4, 5])
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The Course with given ide not found')
  res.send(course);
});

app.post('/api/courses', (req, res) => {

  const schema = {
    name: Joi.string().min(2).required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
})
// listen on
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})