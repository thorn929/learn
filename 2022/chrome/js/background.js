// background.js

const baseUrl = 'https://juejin.cn/user/'

const reqQuery = {
  aid: '', // 需要自己找哟
  uuid: '', // 需要自己找哟
  user_id: '',
  not_self: '1',
  need_badge: '1'
}

 /**
 * 正则匹配用户 user_id
 */
const regFunc = (str) => {
  return str.match(/\d{15,16}/g)[0]
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'wangzaimisuAdd') {
    if (clickData.linkUrl && clickData.linkUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.linkUrl)
      reqQuery.user_id = user_id

      // 发起请求
      requestUserInfo()
    } else if (clickData.pageUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.pageUrl)
      reqQuery.user_id = user_id

      // 发起请求
      requestUserInfo()
    }
  }

  if (clickData.menuItemId === 'wangzaimisuCancel') {
    if (clickData.linkUrl && clickData.linkUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.linkUrl)

      // 从storage中删除
      cnacelFollowUserInfo(user_id)
    } else if (clickData.pageUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.pageUrl)

      // 从storage中删除
      cnacelFollowUserInfo(user_id)
    }
  }
})

const contextMenus = {
  id: 'wangzaimisuAdd',
  title: '添加为特别关注-掘金',
  type: 'radio',
  contexts: ['image']
}

const contextMenus2 = {
  id: 'wangzaimisuCancel',
  title: '取消对该用户特别关注',
  type: 'radio',
  contexts: ['image']
}

chrome.contextMenus.create(contextMenus)
chrome.contextMenus.create(contextMenus2)

// background.js

/**
 * 获取本地存储
 */
 const getUserList = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('userlist', (arg) => {
      resolve(arg.hasOwnProperty('userlist') ? arg.userlist : [])
    })
  })
}

/**
 * 添加 本地存储
 */
const setStorage = (userListItem, tabId) => {
  return new Promise((resolve, reject) => {
    getUserList().then((userlist) => {
      let flag = true

      const { user_id } = userListItem

      // 判断是否存在相同的用户，有则更新
      for (let i = 0; i < userlist.length; i++) {
        if (userlist[i].user_id === user_id) {
          userlist[i] = userListItem
          flag = false
        }
      }

      // 没有则push
      if (flag) userlist.push(userListItem)

      // 进行存储
      chrome.storage.sync.set({ userlist: userlist })


      // 判断入口，是 手动录入 还是 右键添加
      if (tabId) {
        sendDataPopup(tabId)
      } else {
        sendData()
      }

      resolve()
    })
  })
}

/**
 * 进行请求
 * @param {*} tabId 页面id
 */
const requestUserInfo = (tabId = 0) => {
  const reqUrl = `https://api.juejin.cn/user_api/v1/user/get?aid=${reqQuery.aid}&uuid=${reqQuery.uuid}&user_id=${reqQuery.user_id}&not_self=${reqQuery.not_self}&need_badge=${reqQuery.need_badge}`

  return new Promise((resolve, reject) => {
    fetch(reqUrl)
      .then((response) => response.text())
      .then((text) => {
        const resObj = JSON.parse(text)

        const { user_name, avatar_large, user_id } = resObj.data

        const userListItem = {
          user_name,
          avatar_large,
          user_id
        }

        console.log(userListItem, 'userListItem')

        setStorage(userListItem, tabId)
          .then(() => {
            resolve()
          })
          .catch((error) => {
            reject(2)
          })
      })
      .catch((error) => {
        console.log(error)
        reject(1)
      })
  })
}


/**
 * 取消 特别关注
 */
 const cnacelFollowUserInfo = (user_id) => {
  getUserList().then((userlist) => {
    const newUserList = userlist.filter((item) => {
      return item.user_id !== user_id
    })

    chrome.storage.sync.set({ userlist: newUserList })

    sendData()
  })
}

// background.js

/**
 * 页面右键菜单，只需要 background  向 content-script 发送数据
 */
 const sendData = () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      let message = {
        refresh: true
      }
      chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
        console.log('background => content-script')
      })
    }
  )
}

/**
 * 点击 popup 里面的确认，发过来的消息
 */
const sendDataPopup = (tabId) => {
  let message = {
    refresh: true
  }

  chrome.tabs.sendMessage(tabId, message, (res) => {
    console.log('bg=>content, popup')
    // console.log('res', res)
  })
}

/**
 * 接收到 popup 发来的消息
 */
 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  const { user_id, tabId } = message
  reqQuery.user_id = user_id

  let flag = false

  requestUserInfo(tabId)
    .then(() => {
      flag = true
    })
    .catch((res) => {
      flag = false
      console.log('fail', fail)
      console.log('res', res)
    })
    .finally(() => {
      console.log('ssss', flag)
      flag ? sendResponse('success') : sendResponse('fail')

      return true
    })
})