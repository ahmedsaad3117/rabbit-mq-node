const amqp = require('amqplib')

var log = console.log

async function connect() {
    try {

        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('jobs')
        var d1 = 1

        channel.consume("jobs", (message) => {
            const input = JSON.parse(message.content.toString())
            log(input, d1++)
            if (input.number == 152) {
                channel.ack(message)
                log(input, "aaa")

            }
        })
    } catch (error) {
        log(error)
    }
}

connect()