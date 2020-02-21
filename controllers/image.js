const Clarifai = require('Clarifai');
const app = new Clarifai.App({
    apiKey: 'd5346ad8de3c48378369ecd363c69cc7'
});

const handleApiCall = (req, res)=>{
	 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{
	 	res.json(data);
	 })
	 .catch(err=>res.status(400).json('unable to work with API'))
}
const handleImage=(req, res, dbcall) => {
    const { id } = req.body;
    dbcall('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('unable to get entries'))
}
module.exports={
	handleImage,
	handleApiCall
}