//index.js
//获取应用实例
// const app = getApp()

const menuTypeMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他',
}

Page({
  data: {
    // forecast: ['国内','国际','财经','娱乐','军事','体育','其他'],
    newsList: [],
    menuType: 'gn', //当前类别
    menuTypeList: [
      {'en': 'gn', 'cn': '国内'}
    ],
    swiperImgUrlList:['/images/news01.jpg'],

  },  


  // 首次加载
  onLoad() {
    this.setMenuType()
    this.getNews()
  },

  // 设定顶部导航栏
  setMenuType() {
    let menuTypeList = []
    for (var key in menuTypeMap) {
      menuTypeList.push({
        en: key,
        cn: menuTypeMap[key]
      })
    }
    this.setData({
      menuTypeList: menuTypeList
    })
  },
  
  //获取新闻列表
  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.menuType
      },
      success: res => {
        let result = res.data.result
        this.setNewsList(result)
      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

//更新新闻列表
  setNewsList(result) {
    let newsList =[]
    // console.log(result)
    for (let i = 0; i < result.length; i+=1) {
      newsList.push({
        id: result[i].id,
        title: result[i].title.slice(0, 30), //处理过长的标题
        source: result[i].source || '未知来源', //值不存在的情况
        firstImage: result[i].firstImage || "/images/news-img.png", //值不存在的情况
        date: result[i].date.slice(0, 10),
      })
    }
    this.setData({
      newsList: newsList
    })

  },
  
//变更当前栏目

  onTapMenuType(event) {
    this.setData({
      menuType: event.currentTarget.dataset.menuType
    })
    this.getNews()
  }

  // onLoad() {
  //   wx.request({
  //     url: 'https://test-miniprogram.com/api/news/list',
  //     data: {
  //       type: 'gn'
  //     },
  //     success: res=> {
  //       let result = res.data.result
  //       this.setNewsList(result)
  //     }
  //   })
  // },
  // setNewsList(result){
  //   let news = []
  //   for (let i = 0; i < 8; i++){
  //     news.push({
  //       title: result[i].title,
  //       source: result[i].source,
  //       date: result[i].date.slice(0, 10),
  //       firstImage: result[i].firstImage
  //     })
  //   }
  //   this.setData({
  //     news
  //   })
  // }

})
