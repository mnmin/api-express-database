const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {

    let sqlQuery = 'select * from pets'

    const params = []

    if(req.query.type) {
        console.log(req.query.type)
        sqlQuery =+ ' WHERE type = $1'
        params.push(req.query.type)
    }

    console.log(req.query)
    const qResult = await db.query(sqlQuery, params)

    res.status(200).json({
        pets: qResult.rows
    })
})

router.post('/', async (req, res) => {

    let sqlQuery = 'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;'

    const queryParams = [

        req.body.name,
        Number(req.body.age),
        req.body.type,
        req.body.breed,
        Boolean(req.body.microchip)

    ]

    const qResult = await db.query(sqlQuery, queryParams)

    res.status(201).json({
        pets: qResult.rows[0]
    })
})

router.get('/:id', async (req, res) => {

    let sqlQuery = ' SELECT * FROM pets WHERE id= $1'

    const queryParams = [Number(req.params.id)]
    const qResult = await db.query(sqlQuery, queryParams)

    res.status(200).json({
        pets: qResult.rows[0]
    })
})

router.put('/:id', async (req, res) => {

    let sqlQuery = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *;`

    const queryParams = [

        req.body.name,
        Number(req.body.age),
        req.body.type,
        req.body.breed,
        Boolean(req.body.microchip),
        Number(req.params.id)

    ];

    const qResult = await db.query(sqlQuery, queryParams);

    res.status(201).json({
        pet: qResult.rows[0]
    });
})

router.delete('/:id', async (req, res) => {

    let sqlQuery = `
        DELETE FROM pets 
        WHERE id = $1
        RETURNING *
    `;

    const queryParams = [Number(req.params.id)];
    const qResult = await db.query(sqlQuery, queryParams);

    res.status(201).json({
        pet: qResult.rows[0]
    });
})


module.exports = router