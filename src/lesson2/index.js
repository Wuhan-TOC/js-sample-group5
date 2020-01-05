// / 随机获取box的id
export const getRandomInt = (m) => parseInt(Math.random() * m, 10)

// / 获取box的临时的取货码
export const getRandomString = (boxId) => {
  const currentDate = new Date()
  const dateStr = currentDate.format('yyyyMMddHHmmss')
  const randomStr = Math.random().toString()
  return dateStr + boxId + randomStr
}

export const STORE_PACKAGE_ERROR = 'No available box.'
export const GET_PACKAGE_ERROR = 'The barcode is invalid!'
export const GET_PACKAGE_SUCCESS = 'Scan barcode success.'
export const TOTAL_BOXES = 24

Date.prototype.format = function(fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
  return fmt
}
