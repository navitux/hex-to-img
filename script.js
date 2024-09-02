mediumZoom("[data-zoomable]")
function convert() {
    const link_ready = document.getElementById("link_ready");
    if (link_ready || link_ready != null) {
        link_ready.remove();
    }
    let input = document.frmConvert.hex.value.replace(/[^A-Fa-f0-9]/g, "");
    if (input.length % 2) {
        console.log("cleaned hex string length is odd.");
        return;
    }

    let binary = new Array();
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2);
        binary[i] = parseInt(h, 16);
    }

    let byteArray = new Uint8Array(binary);
    let img = document.querySelector(".heximage");
    let img_url = window.URL.createObjectURL(new Blob([byteArray], { type: "application/octet-stream" }))
    img.src = img_url;
    
    let btnDown = document.frmConvert.imgName;
    if(btnDown.value == "" || btnDown.value == null || btnDown.value == undefined){
        btnDown.value = "image"
    }
    console.log(btnDown.value)

    // Crear un botón
    const btnLink = document.createElement("button");
    btnLink.textContent = "Download";

    // Crear un anchor
    const anchor = document.createElement("a");
    anchor.id = "link_ready"
    anchor.href = img_url;
    anchor.download = btnDown.value+".png";
    anchor.appendChild(btnLink);

    // Agregar la imagen y el anchor al documento
    img.after(anchor);
    anchor.appendChild(btnLink)
}
