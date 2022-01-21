const express = require("express")
const budgetRoutes = express.Router()
const budgetsArray = require("../models/budget.js")

budgetRoutes.get("/", (req, res) => {
    res.json(budgetsArray)
})

budgetRoutes.get("/:index", (req,res) => {
    const {index} = req.params
    res.json(budgetsArray[index])
})

budgetRoutes.post("/", (req, res) => {
    let {date, name, amount, from} = req.body
    if(!date || !name || !amount || !from){
        res.status(422).json({message: "Missing a field"})
        return;
    }
    budgetsArray.push(req.body)
    res.json(budgetsArray[budgetsArray.length - 1])
})

budgetRoutes.put("/:index", (req, res) => {
    let {index} = req.params
    let {date, name, amount, from} = req.body
    if(date && name && amount && from) {
        budgetsArray[index] = {
            date, name, amount, from
        }
        res.json(budgetsArray[index])
        return;
    } else {
        res.status(422).json({message: "Please provide all fields"})
    }
})

budgetRoutes.delete("/:index", (req, res) => {
    const {index} = req.params
    if(budgetsArray[index]) {
        const deletedIndex = budgetsArray.splice(index, 1)
        res.status(200).json(deletedIndex)
    } else {
        res.status(404).json({error: "Transaction not found"})
    }
})

module.exports = budgetRoutes;