const upload_preset = "EatZip";
const cloud_name = "<your cloud name>";
const resource_type = "image";
const api_url =  `https://api.cloudinary.com/v1_1/${cloud_name}/${resource_type}/upload`;
const api_key = "<your api key>";

export const uploadImage = async(file) => {

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("api_key", api_key);
    
    const res = await fetch(api_url, {
        method : "post",
        body : data
    });

    const fileData = await res.json();
    return fileData.url;
}