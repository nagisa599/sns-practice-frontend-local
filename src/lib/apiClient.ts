import axios from "axios"

const backendapi = axios.create({ //これをbackendapi.get()などとすることで以下の設定を継承可能
    baseURL:"http://localhost:5050/api",//api型択先は、共通　awsでデプロイする時は注意（変更）]
    //baseURL:process.env.NEXT_PUBLIC_API_BASEURL,
    headers:{
        "Content-Type":"application/json",//json形式で送るため
        //"Authorization":`Beare {token}`
    },
})

export default backendapi