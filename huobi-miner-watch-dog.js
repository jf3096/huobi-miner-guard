module.exports = {
	/**
	 * 只支持 EXE 或者执行类文件
	 */
	watchProgram: './test/http-server.exe',
	/**
	 * 重启延迟, 单位: 秒
	 */
	restartDelay: 5,
	/**
	 * 当进程挂掉后重启
	 */
	restartIfProcessDead: true,
	/**
	 * 农民
	 */
	farmer: {
		/**
		 * 名称
		 */
		name: 'laptop',
		/**
		 * 钱包名称
		 */
		walletAddress: 'xch1jq9sq794p6thfdfwv7kj9tslrqfek73m5wa03sv68zf3jj6skzaq5daq9j',
		/**
		 * 检查是否离线间隔时间
		 * 不建议时间过短, 因为如果离线时会自动触发重启, 单位: 分钟
		 */
		checkIsOfflineInterval: 20,
	},
};