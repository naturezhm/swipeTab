Page({
  data: {
    window_width: 375,// 单位是px
    tab_config: {
      tabs: ['tab0', 'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7'],// tabs
      fixed: false, // tabbar是否固定宽度
      active_tab: 0, //当前激活的tab
      item_width: 90,// 单位是px
      tab_left: 0, // 如果tabbar不是固定宽度，则目前左移的位置
      underline: {
        offset: 0 //下划线的位移
      }
    },
    swipe_config: {
      swipes: ['demo-text-1', 'demo-text-2', 'demo-text-3', 'demo-text-1', 'demo-text-2', 'demo-text-3', 'demo-text-1', 'demo-text-2'],// 不同面板的内容
      indicator_dots: false, // 不显示小圆点
      autoplay: false,// 自动切换
      interval: 2000,// 自动切换频率
      duration: 500, // 切换时间
      current: 0 // 当前激活的panel
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    try {
      let {window_width, tab_config} = that.data;
      var res = wx.getSystemInfoSync()
      window_width = res.windowWidth;

      if (tab_config.fixed) {
        tab_config.item_width = window_width / tab_config.tabs.length;
      }

      that.setData({ "window_width": window_width, "tab_config": tab_config });

    } catch (e) {

    }
  },
  // 更换页面到指定page ，从0开始
  updateSelectedPage(page) {
    let that = this;
    // console.log("====_updateSelectedPage");
    let {window_width, tab_config, swipe_config } = this.data;
    let underline_offset = tab_config.item_width * page;

    tab_config.active_tab = page;
    swipe_config.current = page;
    tab_config.underline.offset = underline_offset;
    if (!tab_config.fixed) {
      // 如果tab不是固定的 就要 检测tab是否被遮挡
      let show_item_num = Math.round(window_width / tab_config.item_width); // 一个界面完整显示的tab item个数
      let min_left_item = tab_config.item_width * (page - show_item_num + 1); // 最小scroll-left 
      let max_left_item = tab_config.item_width * page; //  最大scroll-left
      if (tab_config.tab_left < min_left_item || tab_config.tab_left > max_left_item) {
        // 如果被遮挡，则要移到当前元素居中位置
        tab_config.tab_left = max_left_item - (window_width - tab_config.item_width) / 2;
      }
    }
    that.setData({
      "tab_config": tab_config,
      "swipe_config": swipe_config
    });
  },
  handlerTabTap(e) {
    let that = this;
    that.updateSelectedPage(e.currentTarget.dataset.index);
  },
  swiperChange(e) {
    let that = this;
    // console.log("===== swiperChange " + e.detail.current);
    that.updateSelectedPage(e.detail.current);
  },
  onScroll(e) {
    let that = this;
  }
})