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

module.exports = router