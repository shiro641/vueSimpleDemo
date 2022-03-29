import Axios from 'axios'

export const t = () => {
    return Axios(
        {
            method:'get',
            url: 'http://localhost:8000/api/test',
        }
    )
}
export const getPic = () => {
    return Axios(
        {
            method:'get',
            url: 'http://localhost:8000/api/get_picture',
            responseType: 'arraybuffer',
        }
    )
}
export const getAssets = (filename) => {
    return Axios(
        {
            method:'post',
            url: 'http://localhost:8000/api/get_assets',
            data:{
                'filename':filename
            },
            responseType: 'arraybuffer',
        }
    )
}