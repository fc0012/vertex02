const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const logger = require('./logger');

const RULE_DIR = path.join(__dirname, '../data/rule/delete');

/**
 * 获取默认删种规则定义列表
 * @returns {Array<Object>} 默认规则定义数组
 */
function getDefaultRuleDefinitions () {
  return [
    // Oracle 剩余空间系列规则
    {
      alias: 'Oracle-剩余空间50g上传小于1M',
      type: 'normal',
      priority: 0,
      fitTime: 10,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '50*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '1*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-剩余空间40g上传小于5M',
      type: 'normal',
      priority: 0,
      fitTime: 5,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '40*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '5*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-剩余空间30g上传小于8M',
      type: 'normal',
      priority: 0,
      fitTime: 5,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '30*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '8*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-剩余空间20g上传小于30M',
      type: 'normal',
      priority: 0,
      fitTime: 5,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '20*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '30*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-剩余空间10g上传小于130M',
      type: 'normal',
      priority: 0,
      fitTime: 5,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '10*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '130*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-剩余空间5g上传小于230M',
      type: 'normal',
      priority: 0,
      fitTime: 5,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '5*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '230*1024*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: 'Oracle-空间剩余100g上传速度低于50k持续1分钟',
      type: 'normal',
      priority: 0,
      fitTime: 60,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'freeSpace', compareType: 'smaller', value: '100*1024*1024*1024' },
        { key: 'progress', compareType: 'bigger', value: '0.01' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '50*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    // 不可说系列规则
    {
      alias: '不可说1-分享4完成60',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'ratio3', compareType: 'bigger', value: '4.1' },
        { key: 'completedTime', compareType: 'bigger', value: '3600' },
        { key: 'category', compareType: 'contain', value: 'SD' }
      ]
    },
    {
      alias: '不可说2-低速低比率',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'completedTime', compareType: 'bigger', value: '1200' },
        { key: 'ratio3', compareType: 'smaller', value: '4.1' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '1*1024*1024' },
        { key: 'category', compareType: 'contain', value: 'SD' }
      ]
    },
    {
      alias: '不可说3-Torrent',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'trackerStatus', compareType: 'contain', value: 'Torrent' },
        { key: 'category', compareType: 'contain', value: 'SD' }
      ]
    },
    // 其他普通规则
    {
      alias: '速度低于800k持续1分钟',
      type: 'normal',
      priority: 0,
      fitTime: 60,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'progress', compareType: 'bigger', value: '0.65' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '800*1024' },
        { key: 'category', compareType: 'notContain', value: 'keep' },
        { key: 'category', compareType: 'equal', value: 'sb' }
      ]
    },
    {
      alias: '馒头三倍删种',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'ratio3', compareType: 'bigger', value: '3.5' },
        { key: 'category', compareType: 'contain', value: 'MTV' },
        { key: 'category', compareType: 'notContain', value: 'keep' }
      ]
    },
    {
      alias: '种子进度0.2分享低于0.1（防黑车）',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 6,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'progress', compareType: 'bigger', value: '0.2' },
        { key: 'ratio', compareType: 'smaller', value: '0.1' },
        { key: 'category', compareType: 'notIncludeIn', value: 'KEEP,keep' }
      ]
    },
    {
      alias: '36小时不开车（防死种）',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'progress', compareType: 'equal', value: '0' },
        { key: 'category', compareType: 'notContain', value: 'KEEP,keep' },
        { key: 'addedTime', compareType: 'bigger', value: '24*3600' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '50*1024' }
      ]
    },
    {
      alias: '大包分享率3倍删种（馒头大包放keep分组）',
      type: 'normal',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'ratio', compareType: 'bigger', value: '3.5' },
        { key: 'category', compareType: 'notContain', value: 'keep,KEEP' }
      ]
    },
    {
      alias: '甲骨文-学校21小时删种',
      type: 'normal',
      priority: 0,
      fitTime: 120,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      conditions: [
        { key: 'completedTime', compareType: 'bigger', value: '75600' },
        { key: 'category', compareType: 'contain', value: 'BTS' },
        { key: 'uploadSpeed', compareType: 'smaller', value: '100*1024' }
      ]
    },
    // JavaScript 规则
    {
      alias: '6小时未下载完',
      type: 'javascript',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP","BTS"];
  const stateList = ["downloading", "stalledDL"];
  const { state, addedTime, category, uploadSpeed } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if (stateList.indexOf(state) !== -1 &&
      moment().unix() - addedTime >= 82800 &&
      uploadSpeed <= util.calSize(5, "MiB")) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '慢车（删种厉害谨慎选择）',
      type: 'javascript',
      priority: 0,
      fitTime: 40,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP"];
  const stateList = ["downloading", "stalledDL"];
  const { state, uploadSpeed, progress, category, leecher } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if ((moment().hour() >= 0 && moment().hour() <= 8) ||
      maindata.leechingCount <= 10 ||
      leecher >= 100) {
    return false;
  }
  if (stateList.indexOf(state) !== -1 &&
      uploadSpeed <= util.calSize(250, "KiB") &&
      progress >= 0.1) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '黑车（删种厉害谨慎选择）',
      type: 'javascript',
      priority: 0,
      fitTime: 20,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep"];
  const { state, category, uploadSpeed, downloadSpeed } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if (maindata.leechingCount <= 4) {
    return false;
  }
  if (state == "downloading" &&
      downloadSpeed >= util.calSize(4, "MiB") &&
      downloadSpeed / uploadSpeed >= 2) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '下载是上传5倍持续60秒删除（防黑车）',
      type: 'javascript',
      priority: 0,
      fitTime: 60,
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP"];
  const { state, category, uploadSpeed, downloadSpeed } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if (state == "downloading" &&
      downloadSpeed >= util.calSize(10, "MiB") &&
      downloadSpeed / uploadSpeed >= 5) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '低收益（删种厉害，谨慎选择）',
      type: 'javascript',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP"];
  const stateList = ["downloading", "stalledDL"];
  const { state, ratio, progress, category, uploadSpeed, downloadSpeed } = torrent;
  if (categoryList.indexOf(category) !== -1 || maindata.leechingCount <= 10) {
    return false;
  }
  if (stateList.indexOf(state) !== -1 &&
      progress >= 0.2 &&
      progress <= 0.3 &&
      ratio <= 0.4 &&
      uploadSpeed <= util.calSize(1, "MiB")) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '无效做种',
      type: 'javascript',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP"];
  const stateList = ["uploading", "stalledUP"];
  const { state, uploadSpeed, category, completedTime } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if (stateList.indexOf(state) !== -1 &&
      uploadSpeed <= util.calSize(512, "KiB") &&
      moment().unix() - completedTime >= 5400) {
    return true;
  }
  return false;
}`
    },
    {
      alias: '等待删除',
      type: 'javascript',
      priority: 0,
      fitTime: '',
      deleteNum: 1,
      pause: false,
      onlyDeleteTorrent: false,
      limitSpeed: '',
      code: `(maindata, torrent) => {
  const categoryList = ["keep","KEEP"];
  const stateList = ["queuedUP", "queuedDL", "stalledUP", "stalledDL"];
  const { state, category } = torrent;
  if (categoryList.indexOf(category) !== -1) {
    return false;
  }
  if (stateList.indexOf(state) !== -1) {
    return true;
  }
  return false;
}`
    }
  ];
}

/**
 * 检查规则目录是否存在规则文件
 * @returns {boolean} 是否存在规则文件
 */
function hasExistingRules () {
  try {
    if (!fs.existsSync(RULE_DIR)) {
      return false;
    }
    const files = fs.readdirSync(RULE_DIR);
    return files.some(file => path.extname(file) === '.json');
  } catch (e) {
    return false;
  }
}

/**
 * 确保规则目录存在
 */
function ensureRuleDirectory () {
  if (!fs.existsSync(RULE_DIR)) {
    fs.mkdirSync(RULE_DIR, { recursive: true });
  }
}

/**
 * 生成8位UUID
 * @returns {string} 8位UUID
 */
function generateRuleId () {
  return uuid.v4().split('-')[0];
}

/**
 * 初始化默认删种规则
 * 如果规则目录为空，则创建默认规则
 * @returns {boolean} 是否创建了默认规则
 */
function initDefaultRules () {
  try {
    // 检查是否已有规则
    if (hasExistingRules()) {
      logger.info('删种规则目录已有规则，跳过创建默认规则');
      return false;
    }

    // 确保目录存在
    ensureRuleDirectory();

    // 获取默认规则定义
    const ruleDefinitions = getDefaultRuleDefinitions();

    // 创建每个规则
    for (const ruleDef of ruleDefinitions) {
      const id = generateRuleId();
      const rule = {
        id,
        ...ruleDef
      };

      const filePath = path.join(RULE_DIR, `${id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(rule, null, 2));
      logger.info(`创建默认删种规则: ${rule.alias}`);
    }

    logger.info(`成功创建 ${ruleDefinitions.length} 条默认删种规则`);
    return true;
  } catch (error) {
    logger.error('创建默认删种规则失败:', error);
    return false;
  }
}

module.exports = {
  initDefaultRules,
  getDefaultRuleDefinitions,
  RULE_DIR
};
