const handleImage = (request, response, db) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            response.json(entries[0].entries);
        })
        .catch(err => response.status(400).json('Unable to get entries'));  
};

const handleApiCall = (request, response) => {

    const {imageUrl} = request.body;

    const PAT = '74c1c733e3c84ff98bffd4cf7c21f666';
    const USER_ID = 'omer908';       
    const APP_ID = 'face-recognition-brain';
    const MODEL_ID = 'general-image-recognition';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            response.json(result);
            return result; // Return the parsed JSON data
        })
        .catch(error => {
            response.status(400).json('Unable to load image');
            console.log(error)
            // throw error; // Rethrow the error to handle it in the calling code
        });
    
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}