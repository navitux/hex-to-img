let hexastr = document.frmConvert.hex
let img = document.querySelector("#heximage")
let hexalen = document.querySelector("#txt_len")
let hexasize = document.querySelector("#txt_size")
let imgsize = document.querySelector("#img_size")
// zoom config on output image
mediumZoom("[data-zoomable]", {
    background: "#58585888"
})

function genStrlen(objective, origin){
    objective.setAttribute("style", "display: inline;")
    objective.textContent = "Length: "+origin.value.length
}
function format_size(bytes){
    let kb = bytes / 1024
    if(kb < 1){
        formated = `Size: ${bytes} bytes`
        if(bytes == 1){ formated = `Size: ${bytes} byte` }
    }else if(kb < 1024){
        formated = `Size: ${kb.toFixed(2)} KB`
    }else{
        formated = `Size: ${(kb / 1024).toFixed(2)} MB`
    }
    return formated
}
function genObjsize(objective, origin){
    objective.setAttribute("style", "display: inline;")
    //let size_formated = ""
    let size = ""
    if(origin.tagName === "IMG"){
        fetch(origin.attributes.src.value)
            .then(r => r.blob())
            .then(blob => {
                objective.setAttribute("style", "display: block;")
                objective.textContent = format_size(blob.size)})
    }else{
        size = new TextEncoder('utf-8').encode(origin.value).length
        objective.setAttribute("style", "display: inline;")
        objective.textContent = format_size(size)
    }
    
}
function convert() {
    let link_ready = document.querySelector("#link_ready")
    if (link_ready || link_ready != null) {
        link_ready.remove()
    }
    let input = hexastr.value.replace(/[^A-Fa-f0-9]/g, "")
    if (input.length % 2) {
        console.log("cleaned hex string length is odd.")
        return
    }
    let binary = new Array()
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2)
        binary[i] = parseInt(h, 16)
    }
    let byteArray = new Uint8Array(binary)
    let img_url = window.URL.createObjectURL(new Blob([byteArray], { type: "application/octet-stream" }))
    img.src = img_url
    img.setAttribute("style", "display: block;")
    // setting default image name if none was provided by user
    let btnDown = document.frmConvert.imgName
    if(btnDown.value == "" || btnDown.value == null || btnDown.value == undefined){
        btnDown.value = "image"
    }
    let btnLink = document.createElement("button")
    btnLink.textContent = "Download";
    btnLink.setAttribute("class", "nes-btn")
    let anchor = document.createElement("a")
    anchor.id = "link_ready"
    anchor.href = img_url
    anchor.download = btnDown.value+".png"
    anchor.appendChild(btnLink)
    img.after(anchor)
    anchor.appendChild(btnLink)
    // generating and appending final image size
    genObjsize(imgsize, img)
}
window.onload = genStrlen(hexalen, hexastr)
window.onload = genObjsize(hexasize, hexastr)
