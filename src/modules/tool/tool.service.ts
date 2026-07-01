import { Injectable } from "@nestjs/common";
import * as os from "os";
import * as nodeDiskInfo from "node-disk-info";

@Injectable()
export class ToolService {
  bytesToGB(bytes) {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2);
  }
  /**
   * 获取CPU信息
   * @returns CPU信息
   */
  getCpuInfo() {
    const cpus = os.cpus();
    const cpuInfo = cpus.reduce((prev, cur) => {
      prev.user += cur.times.user;
      prev.sys += cur.times.sys;
      prev.idle += cur.times.idle;
      prev.total += cur.times.user + cur.times.sys + cur.times.idle;
      return prev;
    }, { user: 0, sys: 0, idle: 0, total: 0, cpuNum: cpus.length });
    const cpu = {
      cpuNum: cpuInfo.cpuNum,
      used: (cpuInfo.user / cpuInfo.total * 100).toFixed(2),
      sys: (cpuInfo.sys / cpuInfo.total * 100).toFixed(2),
      free: (cpuInfo.idle / cpuInfo.total * 100).toFixed(2)
    };
    return cpu;
  }

  /**
   * 获取内存信息
   * @returns 内存信息
   */
  getMemInfo() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memoryUsagePercentage = (usedMem / totalMem * 100).toFixed(2);
    return {
      total: this.bytesToGB(totalMem),
      free: this.bytesToGB(freeMem),
      used: this.bytesToGB(usedMem),
      usage: memoryUsagePercentage
    };
  }
  /**
   * 获取磁盘信息
   * @returns 磁盘信息
   */
  async getDiskInfo() {
    const diskInfo = await nodeDiskInfo.getDiskInfoSync();
    const sysFiles = diskInfo.map((disk: any) => {
      return {
        dirName: disk._mounted,
        typeName: disk._filesystem,
        total: this.bytesToGB(disk._blocks),
        used: this.bytesToGB(disk._used),
        free: this.bytesToGB(disk._available),
        usage: ((disk._used / disk._blocks || 0) * 100).toFixed(2)
      };
    });
    return sysFiles;
  }
  /**
   * 获取系统信息
   * @returns 系统信息
   */
  getSysInfo() {
    return {
      computerName: os.hostname(),
      computerIp: this.getServerIP(),
      osName: os.platform(),
      osArch: os.arch()
    };
  }
  /**
   * 获取服务器IP
   * @returns 服务器IP
   */
  getServerIP() {
    const interfaces = os.networkInterfaces();
    for (const dev of Object.keys(interfaces)) {
      const iface = interfaces[dev];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === "IPv4" && alias.internal === false) {
          return alias.address;
        }
      }
    }
  }
}
