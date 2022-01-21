const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

const budgetsController = require("./controllers/budgetsController.js")

app.get("/", (req, res) => {
    res.send("Welcome to Budget App!")
})

app.use("/transactions", budgetsController)

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"})
})

module.exports = app