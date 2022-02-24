const axios    = require('axios').default;
var bodyParser = require('body-parser')
let express    = require('express');
let app        = express();

let port = 3033;
app.use(bodyParser.json())
app.listen(port, () => {
	console.log(`FIO Marketplace Middleware API listening on http://localhost:${port}`)
})
// https://api.orbitalcommand.io/supply.html
app.use(express.static('public'))

app.post('/get_escrow_listings', async (req: any, res: any) => {
	try {
		let reqBody = req.body;
		console.log(reqBody)

		let result = await axios.post(`https://fio-devnet.eosblocksmith.io/v1/chain/get_escrow_listings`, {
			"status": reqBody.status,
			"offset": reqBody.offset,
			"limit" : reqBody.limit,
			"actor" : reqBody.actor
		});
		res.send(result.data);
	} catch (ex) {
		console.error(ex)
	}
})
