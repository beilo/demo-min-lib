/**
 * 引入通用配置
 * 具体详情请见：https://phab.srv.codemao.cn/source/codemaster-mlz-config/
 */
let fs = require('fs');
let path = require('path');
let projectPath = path.resolve(".");
let projectConfigPath = projectPath + "/config";
let merge = require('lodash').merge;

let env = process.env.front_env; // 'development'|'staging'|'production'|'test'| ''
let cdnEnv = 'CDNPATH'; //value:qiniu|aliyun, 用于区分上传的cdn路径

function fileExists(path) {
    try {
        fs.lstatSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
function getPackageConfig(fileName) {
    let filePath = path.join(__dirname, "../config/" + fileName);
    if (fileExists(filePath)) {
        let fileContent = require(filePath);
        let fileContentString = JSON.stringify(fileContent);
        // 根据项目名称进行转译
        fileContentString = fileContentString.replace(/\{project_name\}/g, projectPath.split(path.sep).pop());
        fileContent = JSON.parse(fileContentString);
        return fileContent;
    }
    return {};
}
const _config = function (data) {
    let currentConfig = {};
    let localConfig = {};
    let localConfigPath = path.join(projectConfigPath, 'local.json');
    let defaultConfig = {};
    let defaultConfigPath = path.join(projectConfigPath, 'default.json');
    defaultConfig = getPackageConfig('default.json');
    if (fileExists(defaultConfigPath)) {
        defaultConfig = merge({}, defaultConfig, require(defaultConfigPath));
    }
    localConfig = getPackageConfig('local.json');
    if (fileExists(localConfigPath)) {
        localConfig = merge({}, localConfig, require(localConfigPath));
    }
    if (env) {
        let envCfgPath = path.join(projectConfigPath, env + ".json");
        currentConfig = getPackageConfig(env + ".json");
        if (fileExists(envCfgPath)) {
            console.log('fileExists', envCfgPath);
            currentConfig = merge({}, currentConfig, require(envCfgPath));
        }
        else {
            console.warn("\nConfiguration file specified by env var " + env + " = " + envCfgPath + " does not exist.\n");
        }
    }
    if (process.env[cdnEnv] === 'aliyun') {
        let backupConfigPath = path.join(projectConfigPath, 'backup.json');
        let backupConfig = getPackageConfig('backup.json');
        if (fileExists(backupConfigPath)) {
            backupConfig = merge({}, backupConfig, require(backupConfigPath));
        }
        currentConfig = merge({}, defaultConfig, backupConfig, localConfig, currentConfig);
    }
    else {
        currentConfig = merge({}, defaultConfig, localConfig, currentConfig);
    }
    if (data) {
        currentConfig = merge({}, currentConfig, data);
    }
    console.log(currentConfig);
    return currentConfig;
};
exports.config = _config;
module.exports = _config();