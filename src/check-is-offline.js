const axios = require('axios');

const checkIsOffline = async ({ farmerName, walletAddress }) => {
	const response = await axios.get(
		'https://api.poolhb.cn/api/v1/workers/index',

		{
			timeout: 1000 * 30,
			params: {
				name: 'XCH',
				address: walletAddress,
				page: 1,
				per_page: 10,
				online: false,
				time: +new Date(),
			},
		},
	);
	const data = response.data;
	if (data.code === 200) {
		return !!data.data.list.find(({ name }) => name === farmerName);
	}
	throw data;
};

module.exports = checkIsOffline;