//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    forecast: ['国内','国际','财经','娱乐','军事','体育','其他'],
    swiperImgUrlList:['/images/news01.jpg'],
    news:[1,2,3,4,5,6,7,8],
    newsTitle:'新闻|测试标题',
    newsSource:'光明日报',
    newsDate:'2018-10-22',
    newsFirstImage:'/images/news01.jpg'
  },  

  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res=> {
        let result = res.data.result
        this.setNewsList(result)
      }
    })
  },
  setNewsList(result){
    let news = []
    for (let i = 0; i < 8; i++){
      news.push({
        title: result[i].title,
        source: result[i].source,
        date: result[i].date.slice(0, 10)
      })
    }
    this.setData({
      news
    })
  }

})
