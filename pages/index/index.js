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
    swiperImgUrlList:[],

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
        let data = res.data.result;
        // 修正date数据格式
        data.forEach(d => {
          let date = new Date(d.date);
          d.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        })
        // 随机排序，模拟获取到的新闻列表发生变化，测试pulldownrefresh
        data.sort(this.randomsort)
        this.setData({
          // 提取获得的数据的前三项作为swiper的数据，不满3项取全部
          swiperImgUrlList: data.length >= 3 ? data.slice(0, 3) : data,
          // 提取获得的数据的前三项以后的数据作为newsList的数据
          newsList: data.slice(3, data.length)
        })
      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
 * 排序辅助函数，用于打乱新闻列表，模拟获取新新闻列表
 */
  randomsort: (a, b) => {
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    return Math.random() > .5 ? -1 : 1;
  },
  
//变更当前栏目
  onTapMenuType(event) {
    this.setData({
      menuType: event.currentTarget.dataset.menuType
    })
    this.getNews()
  },

//下拉刷新
  onPullDownRefresh() {
    // console.log('refresh executed!')
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  onTapNews(event){
    // console.log(event)
    let newsID = event.currentTarget.dataset.newsid
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + newsID
    })
  }
})
