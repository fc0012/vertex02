const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const logger = require('../libs/logger');

class LogMod {
  get (options) {
    if (!options.type || !/^[a-zA-Z0-9_-]+$/.test(options.type)) {
      throw new Error('无效的日志类型');
    }
    const logFile = path.join(__dirname, `../../logs/app-${options.type}.log`);
    if (!fs.existsSync(logFile)) {
      return '暂无日志内容';
    }
    try {
      return execSync(`tail -n 2000 ${logFile}`).toString();
    } catch (e) {
      return '读取日志失败: ' + e.message;
    }
  };

  clear () {
    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) return '日志目录不存在';

    const files = fs.readdirSync(logDir);
    for (const file of files) {
      const ext = path.extname(file);
      const filePath = path.join(logDir, file);

      if (ext === '.gz') {
        logger.info('删除日志文件', file);
        fs.unlinkSync(filePath);
      } else if (ext === '.log') {
        logger.info('清空日志文件', file);
        fs.writeFileSync(filePath, '');
      }
    }
    return '删除日志文件成功, 详细情况查看日志';
  };
}

module.exports = LogMod;
