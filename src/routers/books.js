const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {

    let sqlQuery = 'select * from books'

    const params = []

    if(req.query.type) {
        // console.log(req.query.type)
        sqlQuery += ' WHERE type = $1'
        params.push(req.query.type)
    }

    //console.log(req.query)
    const qResult = await db.query(sqlQuery, params)

    res.status(200).json({
        books: qResult.rows
    })
})

router.post('/', async (req, res) => {

    let sqlQuery = 'INSERT INTO books (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'

    const queryParams = [

        req.body.title,
        req.body.type,
        req.body.author,
        req.body.topic,
        req.body.publicationDate,
        req.body.pages

    ]
     
    const qResult = await db.query(sqlQuery, queryParams)

    res.status(201).json({
        book: qResult.rows[0]
    })
})

router.get('/:id', async (req, res) => {

    let sqlQuery = ' SELECT * FROM books WHERE id= $1'

    const queryParams = [Number(req.params.id)]
    const qResult = await db.query(sqlQuery, queryParams)

    res.status(200).json({
        book: qResult.rows[0]
    })
})

router.put('/:id', async (req, res) => {

    let sqlQuery = `UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publicationDate = $5, pages = $6 WHERE id = $7 RETURNING *`;

    const queryParams = [

        req.body.title,
        req.body.type,
        req.body.author,
        req.body.topic,
        req.body.publicationDate,
        Number(req.body.pages),
        Number(req.params.id)

    ];

    
    const qResult = await db.query(sqlQuery, queryParams);

    res.status(201).json({
        book: qResult.rows[0]
    });
})

router.delete('/:id', async (req, res) => {

    let sqlQuery = `
        DELETE FROM books 
        WHERE id = $1
        RETURNING *
    `;

    const queryParams = [Number(req.params.id)];
    const qResult = await db.query(sqlQuery, queryParams);

    res.status(201).json({
        book: qResult.rows[0]
    });
})


module.exports = router
