<template>
<div id="app">
  <mt-header title="记事本">
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="main">
    <div class="event-add">
      <cube-input v-model="msg" class="cub1" placeholder="待办事项"></cube-input>
      <cube-button :primary="true" class="cub2" @click="submit">提交</cube-button>
    </div>
    <div class="event-content">
      <div class="event-tab" @click="changeCollapse(0,$event)">
        <h2>未完成</h2>
        <span :class="{'close-span': !collapse[0].show}"></span>
      </div>
      <div class="event-box">
        <ul>
          <li class="event-list" v-for="item in eventList">
            <div>{{item.content}}</div>
            <cube-button @click="moveToDone(item.id),showPopup()">完成</cube-button>
          </li>
        </ul>
      </div>
      <div class="event-tab" @click="changeCollapse(1,$event)">
        <h2>已完成</h2>
        <span :class="{'close-span': !collapse[1].show}"></span>
      </div>
      <div class="event-box">
        <ul>
          <li v-for="item in eventDoneList" class="over">
            <div>{{item.content}}</div>
            <span class="event-time">{{item.time}}</span>
            <cube-button @click="showMessAgeBox(item.id)">删除</cube-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import {
  Toast,
  MessageBox
} from 'mint-ui';
import {
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      msg: '',
      eventList: [],
      eventDoneList: [],
      params: {
        id: 0,
        type: 1,
        content: '',
        time: ''
      },
      collapse: [{
          show: true,
        },
        {
          show: true,
        }
      ],

    }
  },
  computed: {
    ...mapState([
      'event'
    ])
  },
  watch: {
    event: function() {
      this._getEventList()
    }
  },
  components: {
    eventList: function() {
      return this.eventList
    },
    eventDoneList: function() {
      return this.eventDoneList
    }
  },
  mounted() {
    this._getEventList()
  },
  methods: {
    //提交事件
    submit() {
      let params = {
        id: 0,
        type: 1,
        content: '',
        time: ''
      }
      this.msg = this.msg.trim();
      if (this.msg) {
        params.content = this.msg;
        this.$store.dispatch('addevent', params);
        this.msg = '';
      }
    },
    _getEventList() {
      this.eventList = []
      this.eventDoneList = []
      this.event.filter((d) => {
        if (d.type === 1) {
          this.eventList.push(d)
        }
        if (d.type === 2) {
          this.eventDoneList.push(d)
        }
      })
    },
    changeCollapse(num, event) {
      const show = this.collapse[num].show
      if (show) {
        this.closeCollapse(event);
      } else {
        this.openCollapse(event);
      }
      this.collapse[num].show = !show;
    },
    closeCollapse(event) { // 关闭折叠面板
      let ulElement = event.currentTarget.nextElementSibling,
        children = ulElement.getElementsByTagName('ul')[0];
      ulElement.style.height = children.offsetHeight + 'px';
      setTimeout(function() {
        ulElement.style.height = '0px';
        setTimeout(function() {
          ulElement.style.display = 'none';
        }, 300)
      }, 10)
    },
    openCollapse(event) { // 打开折叠面板
      let ulElement = event.currentTarget.nextElementSibling,
        children = ulElement.getElementsByTagName('ul')[0];
      ulElement.style.display = 'block';
      ulElement.style.height = children.offsetHeight + 'px';
      setTimeout(function() {
        ulElement.style.height = 'auto';
      }, 300)
    },
    //移除事情
    moveToDone(id) {
      this.$store.dispatch('eventdone', id)
    },
    //删除事情
    deleteEvent(id) {
      this.$store.dispatch('deleteEvent', id)
    },
    showPopup() {
      Toast({
        message: '恭喜你完成啦!',
        position: 'middle',
        duration: 2000
      });
    },
    showMessAgeBox(id){
      MessageBox({
        title: '提示',
        message: '少侠删除不可恢复哦!',
        showCancelButton: true
      }).then(action=>{
        if(action=='confirm'){
          this.deleteEvent(id)
        }else{
          console.log('1111111')
        }
      })
    }
  }
}
</script>

<style lang="stylus">
body
 background #fff
.mint-header
  background-color #26b6be
  font-size 18px
.main
  padding 30px 15px
.event-add
  display flex
  margin-bottom 20px
  .cub1
    flex 75%
    margin-right 5%
    border: 1px solid #c0ccda;
  .cub2
    flex 20%
    padding 0
.event-content
 .event-tab
   background #26b6be
   position: relative;
   height: 44px;
   line-height: 44px;
   padding-left: 20px;
   border-bottom: 1px solid #fff;
   box-sizing: border-box;
   color: #fff;
   cursor: pointer;
   span
     &.close-span
      transform: rotate(45deg);
     position: absolute;
     right: 20px;
     top: 15px;
     width: 10px;
     height: 10px;
     content: "";
     border-top: 2px solid #fff;
     border-right: 2px solid #fff;
     -webkit-transform: rotate(135deg);
     transform: rotate(135deg);
     /* transition: -webkit-transform .3s;
     transition: transform .3s;
     -webkit-transform .3s; */
 .event-box
   list-style: none;
   overflow: hidden;
   border-left: 1px solid #eee;
   border-right: 1px solid #eee;
   transition: all .3s;
   ul
     li
        &.over
          padding-right 130px
        position: relative;
        min-height: 44px;
        line-height: 25px;
        padding: 10px 80px 10px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        color: #373e40;
       div
        padding-left 10px
        flex 80%
        margin-right 5%
        word-wrap:break-word
      span
        position: absolute;
        right: 70px;
        top: 0;
        line-height: 44px;
        font-size: 12px;
        color: #aaa;
       button
        position: absolute;
        right: 10px;
        top: 7px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        padding: 0;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #666;
        font-size: 12px;
</style>
