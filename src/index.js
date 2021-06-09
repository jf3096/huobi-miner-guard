const childProcess = require('child_process');
const config = require('./config');
const checkIsOffline = require('./check-is-offline');

let intervalHook;
let runningCp;
/**
 * 杀死子进程
 */
const killCp = (cp) => {
	try {
		if (!cp.manualKilled) {
			cp.manualKilled = true;
			cp.stdin.pause();
			cp.kill();
		}
	} catch (e) {
		console.error(e);
	}
};

/**
 * 重生
 */
const respawn = () => {
	runningCp = childProcess.spawn(config.watchProgram);
	runningCp.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});
	runningCp.stdout.on('close', () => {
		if (config.restartIfProcessDead) {
			console.log('\x1b[31m程序已结束\x1b[0m');
			restart();
		}
	});
};

const check = async (cp) => {
	checkIsOffline({ farmerName: config.farmer.name, walletAddress: config.farmer.walletAddress }).then((isOffline) => {
		if (isOffline) {
			console.log(`\x1b[31m当前 farmer = ${config.farmer.name} 已离线!\x1b[0m`);
			killCp(cp);
		}
	});
};

const rescheduleOfflineChecker = () => {
	clearInterval(intervalHook);
	intervalHook = setInterval(() => {
		// noinspection JSIgnoredPromiseFromCall
		check(runningCp);
	}, config.farmer.checkIsOfflineInterval * 1000 * 60);
};

const restart = () => {
	rescheduleOfflineChecker();
	console.log(`\x1b[31m程序将在 ${config.restartDelay} 秒重启\x1b[0m`);
	setTimeout(respawn, config.restartDelay * 1000);
};

const main = () => {
	respawn();
	rescheduleOfflineChecker();
};

main();