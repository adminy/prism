const fs = require('fs')
const server = require("pinipig")
//ctx.req.getUrl(), ctx.parameters.name, ctx.data.files.map(f => ([f.tmpFilename, f.filename]), ctx.res.json({})
//

const socketMessage = ctx => {
    console.log(ctx.req.message)
}
const sendWSFile = ctx => {
    const  data = fs.readFileSync('./video.h264').toString("binary")
    const twoKB = (data, index) => {
        if(!data.length) return
        ctx.ws.send( data.slice(index, index + 2048), ctx.isBinary)
        setTimeout(() => twoKB(data.slice(index + 2048), index + 2048), 3000)
    }
    twoKB(data, 0)
}

server.createServer({
    port: 80,
    routes: [
        {
            url: '/',
            post: ctx => {
                console.log('gets here')
                ctx.res.end(fs.readFileSync('./video.h264'))
            },
            ws: {
                options: {
                    compression: 0,
                    maxPayloadLength: 16 * 1024 * 1024,
                    idleTimeout: 10
                },
                open: sendWSFile,
                message: socketMessage,
                drain: () => {},
                close: () => {}
            }
        },
        {url: '/*', get: server.staticFileServer('.')}
    ]
})
