require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Base de datos conectada")
})
.catch((err) => {
    console.log('Hubo un error para conectar BBDD', {err})
})

const taskSchema = new Schema({
    name: String,
    done: Boolean
})

const Task = mongoose.model('Task', taskSchema, "Tasks")

app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
    console.log("No especificamos inicio de ruta")
    console.log("middleware1")
    next()
})

app.get('/api/tasks', (req, res) => {
    Task.find().then((tasks) => {
        res
        .status(200)
        .json({
            ok: true,
            data:tasks
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: true,
            message: 'Error al obtener tareas'
        })
    })
})

app.post("/api/tasks", (req, res) => {
    const body = req.body
    console.log({ body })
    Task.create({
        name: body.text,
        done: false
    })
    .then((createdTask) => {
        res
        .status(201)
        .json({
            ok: true,
            message: "tarea creada con exito",
            data: createdTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al crear tarea'
        })
    })
})
app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findOneAndDelete(id)
    .then((deletedTask) => {
        res
        .status(200)
        .json({
            ok: true,
            data: deletedTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al borrar tarea'
        })
    })
})
app.put("/api/tasks/:id", (req, res) => {
    const body = req.body
    const id = req.params.id
    Task.findByIdAndUpdate(id,{
        name: body.text
    })
    .then((updatedTask) => {
        res
        .status(200)
        .json({
            ok: true,
            message: "tarea editada con exito",
            data: updatedTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al editar tarea'
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})