const axios    = require('axios').default;
let bodyParser = require('body-parser');
let cors       = require('cors')
let express    = require('express');
let app        = express();

const PORT = process.env.PORT === undefined ? 3033 : process.env.PORT;
const API_HOST = process.env.API_HOST === undefined ? `https://fio-testnet.eosblocksmith.io` : process.env.API_HOST;

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`FIO Marketplace Middleware API listening on http://localhost:${PORT}`)
})

app.use(express.static('public'))

app.post('/get_escrow_listings', async (req: any, res: any) => {
	try {
		let reqBody = req.body;
		let result = await axios.post(`${API_HOST}/v1/chain/get_escrow_listings`, {
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
