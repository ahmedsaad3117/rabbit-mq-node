const amqp = require('amqplib')

var log = console.log

const mesg = { number: 159 }
const mesg2 = { number: 152 }

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('jobs')
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(mesg2)))

        log(`Job sends successfully ${mesg}`)
    } catch (err) {
        log(err)
    }
}


connect()