
import osUtils from 'os-utils';
import { execSync } from 'child_process';
import os from 'os';


// Polling interval in milliseconds
const POLLING_INTERVAL = 500;

export function polling_resources(){
    setInterval( async () => {
        const cpuUsage = await get_cpu_usage();
        const ramUsage = get_ram_usage();
        const { usedStorage } = get_storage_data();
        console.log('CPU Usage: ', cpuUsage);
        console.log('RAM Usage: ', ramUsage);
        console.log('Storage Usage: ', usedStorage);
    }, POLLING_INTERVAL);
}

function get_cpu_usage(){
    return new Promise((resolve) => {
        osUtils.cpuUsage((resolve));
    })
}

function get_ram_usage(){
    return 1 - osUtils.freememPercentage();
}

function get_storage_data() {
    let total, free;

    if (process.platform === 'win32') {
        const output = execSync('wmic logicaldisk get size,freespace,caption').toString();
        const lines = output.trim().split('\n');
        const diskInfo = lines[1].trim().split(/\s+/);
        free = parseInt(diskInfo[1], 10);
        total = parseInt(diskInfo[2], 10);
    } else {
        const output = execSync('df -k /').toString();
        const lines = output.trim().split('\n');
        const diskInfo = lines[1].trim().split(/\s+/);
        total = parseInt(diskInfo[1], 10) * 1024;
        free = parseInt(diskInfo[3], 10) * 1024;
    }

    const used = total - free;
    const usedStorage = (used / total) * 100;
    return { total, usedStorage };
}

export function get_static_data(){
    const { total } = get_storage_data();
    const totalStorage = total;
    const cpuModel = os.cpus()[0].model;
    const totalMemory = Math.floor(osUtils.totalmem() / 1024);
    return { totalStorage, cpuModel, totalMemory };
}