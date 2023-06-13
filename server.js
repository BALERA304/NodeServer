const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')

const generateID = require('./generateID')
const myID = generateID()
app.set('view engine', 'ejs');


require('dotenv').config()
const PORT = process.env.PORT


const createPath = (page) => path.resolve(__dirname, 'ejs-HTML', `${page}.ejs`); //с помощью этого создаем удобную ссылку на html-ejs )

app.listen(PORT, (error) => {
    error ? console.log('ОШИБКА ВСЕ НЕ ПО ПЛАНУ') : console.log(`Он реально слушает порт ${PORT}`); //наичнаем слушать локал хост на requests
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')) //выдает в терминал время отправки данных клиенту
app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles')); //разрешает отправку статических данных клиенту
// ________________________________________________________________________________
app.get('/', (req, res) => {
    const title = 'Главная страница'
    res.render(createPath('index'), { title });
})
// ________________________________________________________________________________
app.get('/second', (req, res) => {
    const title = 'Вторая страница'
    const myFriends = [
        {
            name: 'Cactus',
            link: 'https://i.pinimg.com/originals/ca/66/88/ca66888d8fd1a68688e6c440ada3f571.jpg'
        },
        {
            name: 'Luca',
            link: 'https://image.krasview.ru/video/23fef22cfbc0af2/_.jpg'
        }
    ]

    res.render(createPath('second'), { myFriends, title });
})
// ________________________________________________________________________________

app.get('/posts', (req, res) => {
    const title = 'Посты'
    const posts = [
        {
            id: myID,
            text: 'Eaque laboriosam non est hic non. Excepturi illum et. Mollitia delectus expedita sit incidunt. Alias corporis dolores rerum ut sit. Incidunt dignissimos earum qui eum.',
            title: 'this is post',
            date: '02.02.2000',
            author: 'myCat',
        },
        {
            id: myID,
            text: 'ullam-autem-eaque',
            title: 'this is second Post',
            date: '02.02.2023',
            author: 'YOU',
        },

    ]

    res.render(createPath('posts'), { title, posts });
})
// ________________________________________________________________________________

app.post('/addPost', (req, res) => {
    const { title, author, text } = req.body
    const post = {
        id: myID,
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    }
    res.render(createPath('post'), { post, title })
})
// ________________________________________________________________________________
app.get('/addPost', (req, res) => {
    const title = 'Добавить пост'
    res.render(createPath('addPost'), { title });
})
// ________________________________________________________________________________
app.get('/posts/:id', (req, res) => {

    const title = `пост: ${myID}`
    const post = {
        id: myID,
        text: 'Eaque laboriosam non est hic non. Excepturi illum et. Mollitia delectus expedita sit incidunt. Alias corporis dolores rerum ut sit. Incidunt dignissimos earum qui eum.',
        title: 'this is post',
        date: '02.02.2000',
        author: 'myCat',
    }

    res.render(createPath('post'), { title, post });
})
// ________________________________________________________________________________

app.get('/end', (req, res) => {
    const title = 'Конец'
    res.render(createPath('end'), { title });
})
// ________________________________________________________________________________

app.use((req, res) => {
    const title = 'ERRRRRROOOR404'
    res
        .status(404)
        .render(createPath('error'), { title });
})