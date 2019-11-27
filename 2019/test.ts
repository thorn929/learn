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

export function genErrMsg (message: string, code: number | string, type?: ('demo1' | 'demo2')): string {
    console.log(2)
    return (message || `网络繁忙，请稍候再试`) + (code ? `(${code})` : ``)
}
genErrMsg('demo', "10086")
