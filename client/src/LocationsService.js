const axios = require('axios')

const url = '/api/locations/'

class LocationsService {
    static getLocaions() {
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then(response => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
        })
    }

    static insertLocation(name) {
        return axios.post(url, {
            name: name
        })
    }

    static deleteLocation(id) {
        return axios.delete(`${url}/${id}`)
    }
}

export default LocationsService