import 'dotenv/config'

async function handleErrors(err, req, res, next) {
    const response = {
        error: err.message
    }

    if(process.env.ENVIRONMENT === 'development'){
        response.stack = err.stack
    }

    return res.status(err.status).json(response);
}

export default handleErrors;