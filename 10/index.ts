import express from 'express'
import authRoute from './login.ts'

const app = express()

app.use(express.json())

app.use("/auth", authRoute)

export default app

app.listen(3000, () => {
    console.log("se esta escuchando en el puerto 3000")
})