const axios    = require('axios').default;
let bodyParser = require('body-parser');
let cors       = require('cors')
let express    = require('express');
let app        = express();

let port = 3033;

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`FIO Marketplace Middleware API listening on http://localhost:${port}`)
})

app.use(express.static('public'))

// https://api.fiomarket.place/get_escrow_listing
app.post('/get_escrow_listings', async (req: any, res: any) => {
	try {
		let reqBody = req.body;
		console.log(reqBody)

		let result = await axios.post(`https://fio-testnet.eosblocksmith.io/v1/chain/get_escrow_listings`, {
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
