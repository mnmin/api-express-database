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

module.exports = router