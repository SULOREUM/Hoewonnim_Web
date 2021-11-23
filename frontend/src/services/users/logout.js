// import axios from "axios";

const url = 'https://localhost:3000/api/users';

class join {

    updateLogin = async () => {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            if (res.status >= 200 && res.status <= 204) {
                return res;
            }
        });
        await this.changeLoginState();
    };
}


print(url)
export default join;
