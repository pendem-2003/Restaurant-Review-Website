import mongodb from "mongodb"
import app from "./server.js"
import restaurantsAccess from "./restaurants-access.js"
import reviewAccess from "./reviews-access.js"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8000
const uri= process.env.URI
const client= new mongodb.MongoClient(uri)

client.connect()
.catch((e)=>{console.log(`Error connecting to database ${e}`)})
.then(async ()=>{
    await restaurantsAccess.resRef(client)
    await reviewAccess.resRef(client)
    app.listen(port,()=>{
        console.log(`Listening on port 8000`)
    })
    }
)

