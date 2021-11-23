import axios from "axios";

const url = 'https://localhost:3000/api/users';

    // await users.insertOne({
    //     name: req.body.data.name,
    //     sex: req.body.data.sex,
    //     id: req.body.data.id,
    //     password: req.body.data.password,
    //     mail: req.body.data.mail,
    //     login: req.body.data.login,
    //     challenge: req.body.data.challenge,
    //     weight: req.body.data.weight,
    //     preference: req.body.data.preference
    // });

class join {

    static updateUserInfo(data){
        return axios.post(url, {
            data
        })

    }
}

export default join;
