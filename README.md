# huobi-miner-guard

> 火币 chia 挖矿守护进程

## 适用平台

- window

## 机制

1. 打开 `huobi-miner-guard-1.0.0.exe` 后, cli-watch-dog 会使用子进程的方式启动 hpool 官方程序 `hpool-miner-chia-console.exe`
2. 根据配置定时检查当前 `farmer` 农民是否已经离线, 如果检查离线则直接杀掉子进程重新服务

## 使用方式

1. 将仓库中的 `huobi-miner-guard-1.0.0.exe` 和 `huobi-miner-watch-dog.js` 复制到 火币 chia 挖矿程序目录中,
   后续启动直接使用 `huobi-miner-guard-1.0.0.exe` 即可

## 个人日常使用

为了方便矿机开关, 个人在 window 中将当前程序加入到开启启动中, 详细步骤如下:

1. 复制好 `cli-watch-dog-x.x.exe` 到指定目录后, 右键 `cli-watch-dog-x.x.exe` 发送到 `桌面快捷方式`
2. 使用快捷键 `win+r` 打开 `window 运行`, 并输入 `shell:startup`, 打开系统启动项目录
3. 将桌面 `快捷方式 cli-watch-dog-x.x.exe` 剪切到 `系统启动项目录` 即可做到开机启动

## API

目前大部分 API 已经在配置文件 `cli-watch-dog.js` 中有详细说明了, 故请根据配置文件中的注释编写即可. 以下为配置文件的拷贝方便使用者快速阅读

```js
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
```

## 360 安全卫士安全警告

由于源码不足 30 行, 欢迎简单阅读. 不存在任何安全风险

## 1.0.0 (2021-06-09)

* init commit

## 作者

She Ailun