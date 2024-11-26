let cloudName = "dmpwebopc"
let unsignedUploadPreset = "ugiqcl22"
let getFile = document.getElementById('dropzone-file');
let getArea = document.getElementById('area');
let gallery = document.getElementById('gallery')

// Prevent the default behavior for dragover (to allow drop)
getArea.addEventListener('dragover', (event) => {
    event.preventDefault();  // Allow the drop
    console.log("drag")
});

// Handle the drop event
getArea.addEventListener('drop', (event) => {
    event.preventDefault();  // Prevent default action
console.log("droped")
console.log(event.dataTransfer)
    const file = event.dataTransfer.files;  // Get the dropped files
        console.log('File dropped:', file[0]);
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let fd = new FormData() //empty data
        fd.append("file",file[0])
        fd.append("upload_preset",unsignedUploadPreset)
        fetch((url),{
            method:"POST",
            body:fd,
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            let resourceUrl = data.secure_url
            console.log(resourceUrl)
            if(data.format == "pdf"){
                let iframe = document.createElement("iframe");
            iframe.src = resourceUrl;
            iframe.width = "500px";
            iframe.height = "500px";
            gallery.appendChild(iframe);
            console.log(iframe);
            }
            else{
                let image = new Image()
                image.src = resourceUrl
                gallery.appendChild(image)
            }
        })
        



});

