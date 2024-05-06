require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
    console.log("No especificamos inicio de ruta")
    console.log("middleware1")
    next()
})

app.get('/api/tasks', (req, res) => {
    res.send('Hello World!')
})

app.post("/api/tasks", (req, res) => {
    const body = req.body
    console.log({ body })
    res.status(201).json({ ok: true, message: "tarea creada con exito" })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})