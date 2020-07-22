// ws.onmessage = function(msg) {
//     prism.decodeNal(msg);
//     console.log(prism.SL) // decoded frame luma in xy format
//     console.log(prism.SCb, prism.SCr) //decoded frame chroma cb/cr in xy format
//   }
const $ = id => document.getElementById(id)
const ws = new WebSocket('ws://localhost/')
const decoder = de264()
ws.onmessage = msg => {
    const videoData = new TextEncoder().encode(msg.data)
    const nal = decoder.decodeNal(videoData.buffer)
    // decoder.pushData(videoData)
    // decoder.activateParamSets(pps_id)
    // decoder.writeCurrPic()
    // console.log(decoder.currPic)
}

// const canvas = document.createElement('canvas')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
// canvas.style.width = window.innerWidth + 'px'
// canvas.style.height = window.innerHeight + 'px'
// _util.yuv2rgb(this.SL, this.SCb, this.SCr, this.width, this.height, this.canvas);
// setTimeout(() => document.body.appendChild(canvas), 300)    return new Decoder(canvas)
