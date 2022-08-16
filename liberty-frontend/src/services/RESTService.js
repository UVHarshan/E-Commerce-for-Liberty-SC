import axios from 'axios';

export const HOST = "http://localhost:5000/";


export const API = {
    GET: async (endpoint, param) => {
        return await axios.default.get(`${HOST}${endpoint}`,
            {
                params: param
            }
          
        ).then(response => {
            return response.data
        }).catch( e=> {
            throw e
        })
    },
    POST: async (endpoint,data) => {
        return await axios.post(`${HOST}${endpoint}`,
        data,
        {
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            throw e
        })
    },

    POST_WITH_PARAMS:async (endpoint, param) => {
        return await axios.post(`${HOST}${endpoint}`,  null  ,
        {params :param
        },

        {headers: {
            'Content-Type' : 'application/json'
        }
        },
        ).then( response => {

        }).catch(e => {
            throw e

        })
    },

    PUT: async (endpoint, param,data) => {
        return await axios.put(`${HOST}${endpoint}`,
        data,
        {params :param
        },

        {headers: {
            'Content-Type' : 'application/json'
            }
        },
        ).then( response => {

        }).catch(e => {
            throw e

        })
    },
    DELETE: async (endpoint, param) => {
        return await axios.delete(`${HOST}${endpoint}`,
        {params :param
        }
        ).then( response => {

        }).catch( e=> {
            console.log(e)
            throw e
        })
    }

}