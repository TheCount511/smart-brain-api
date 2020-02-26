const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res)=>{
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{
	 	res.json(data);
	 })
	 .catch(err=>res.status(400).json('invalid search'))
}


const handleImage=(req, res, dbcall) => {
    const { id } = req.body;
    dbcall('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('face not detected'))
}
module.exports={
	handleImage,
	handleApiCall
}