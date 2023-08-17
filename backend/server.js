import express from "express"
import cors from "cors"
import restaurants from "./restaurants-router.js"

const app= express()
app.use(cors())
app.use(express.json())

app.use('/restaurants',restaurants)
app.use('*',(req,res)=>{
    res.status(404).send("error: not found")
})

export default app