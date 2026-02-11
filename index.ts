import app from "./app";
import { prisma } from "./src/utility/db";
const port = process.env.PORT
async function main() {
    try {
        await prisma.$connect()
        console.log("connect to database successfully")
        app.get("/",)
        app.listen(port, () => {
            console.log(`server is running post on ${port}`)
        })
    } catch (error) {
        console.log("an error occurred:", error)
        await prisma.$disconnect()
        process.exit(1)

    }
}
main()