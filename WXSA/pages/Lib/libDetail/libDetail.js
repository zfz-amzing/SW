// pages/libDeatil/libDetail.js
"use strict";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    app.ajax({
      load: 2,
      url: app.globalData.url + "funct/lib/signalBookdetail",
      data:{
        id:e.id
      },
      fun:res=>{
        if(res.data.Message === "Yes"){
          var bookInfo = {};
          var repx = /<table.*?>[\s\S]*?<\/table>/;
          var bookInfoString = res.data.info.match(repx);
          repx = /<h2>.*?<\/h2>/;
          bookInfo.name = bookInfoString[0].match(repx)[0].replace("<h2>", "").replace("</h2>", "");
          repx = /<tr><td>.*<\/td><\/tr>/g;
          var bookInfoArray = [];
          bookInfoString[0].match(repx).map((value, index) => {
            bookInfoArray.push(value.replace("<tr><td>", "").replace("</td></tr>", ""));
            return value;
          })
          var bookStroageArray = [];
          repx = /<li>[\s\S]*?<\/li>/g;
          bookInfoString = res.data.info.match(repx);
          repx = /<p.*>.*<\/p>/g;
          bookInfoString.forEach(value => {
            var stroageMatch = value.match(repx);
            if (stroageMatch){
              stroageMatch.map((value, index) => {
                bookStroageArray.push(value.replace(/<p.*?>/, "").replace("</p>", ""));
                return value;
              })
            }
          })
          bookInfo.bookInfoArray = bookInfoArray;
          bookInfo.bookStroageArray = bookStroageArray;
          that.setData({
            "data": bookInfo
          })
        }else{
          app.toast("请求超时");
        }
        
      }
    })
  }
})