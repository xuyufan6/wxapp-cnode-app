// pages/topics/topics.js
import Api from '../../utils/api';
import { getDateDiff } from '../../utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '话题列表',
    postsList: [],
    topBarItems: [
      // id name selected 选中状态
      { id: 'all', name: '全部', selected: true },
      { id: 'good', name: '精华', selected: false },
      { id: 'share', name: '分享', selected: false },
      { id: 'ask', name: '问答', selected: false },
      { id: 'job', name: '招聘', selected: false }
    ],
    page: 1,
    tab: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchData();
  },

  onTapTag(e) {
    const tab = e.currentTarget.id;
    const topBarItems = this.data.topBarItems.map(item => {
      if (item.id === tab) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });

    this.setData({
      tab,
      topBarItems
    });

    if (tab !== 'all') {
      this.fetchData({ tab });
    } else {
      this.fetchData();
    }
  },

  fetchData(data = {}) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    if (!data.page) {
      data.page = 1;
    }

    if (data.page === 1) {
      this.data.postsList = [];
    }

    wx.request({
      url: Api.getTopics(data),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: res => {
        let postsList = this.data.postsList.concat(
          res.data.data.map(item => {
            item.last_reply_at = getDateDiff(new Date(item.last_reply_at));
            return item;
          })
        );
        this.setData({
          postsList
        });
      },
      fail: () => {},
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const tab = this.data.tab;
    if (tab !== 'all') {
      this.fetchData({ tab });
    } else {
      this.fetchData();
    }
    console.log('下拉刷新', new Date());
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  lower(e) {
    this.setData({
      page: this.data.page + 1
    });

    if (this.data.tab !== 'all') {
      this.fetchData({ tab: this.data.tab, page: this.data.page });
    } else {
      this.fetchData({ page: this.data.page });
    }
  }
});
