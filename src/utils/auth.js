export const BASE_URL = 'https://mesto-express.ybon.nomoredomains.work';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка: ${res.status} :(`);
        })
        .then((res) => {
            return res;
        });
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка: ${res.status} ${res.statusText} :(`);
        })
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
            }
            return data;
        });
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка: ${res.status} :(`);
        })
        .then(data => data)
}
