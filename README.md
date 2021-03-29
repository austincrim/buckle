# Buckle
This is a naive implementation of an Express templating engine.


## Example

```javascript
const express = require('express')

const app = express()

app.set('view engine', 'bkl')

app.get('/', (req, res) => {
  res.render('index', { name: 'Dave', hobbies: ['cooking', 'cleaning'] })
})
```

```html
<h1>
  Hello, [[name]]!
</h1>

<ul>
  [#each hobbies as hobby]
    <li>[[hobby]]</li>
  [/each]
</ul>
```