"use strict";
/**
 * 一个方法：生成错误提示信息
 *
 * @param {string} message 提示信息，比如`you have a error`
 * @param {number | string} code 错误码，数字和字符都行
 * @param {string} type 类型，请写`demo1`或者`demo2`
 *
 * ```js
 * genErrMsg('demo', 10086)
 *
 * ```
 */
exports.__esModule = true;
function genErrMsg(message, code, type) {
    console.log(2);
    return (message || "\u7F51\u7EDC\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5") + (code ? "(" + code + ")" : "");
}
exports.genErrMsg = genErrMsg;
genErrMsg('demo', "10086");
