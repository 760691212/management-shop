<template>
  <div class="app-digital-clock no-select">
    <div class="clockBox">
      <div class="time">{{time}}</div>
      <div class="dayBox">
        <div class="day">{{day}}</div>
        <div class="date">{{date}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'DigitalClock',
  props:{
    dateFormat:{
      type: String,
      default: 'YYYY-MM-DD'
    },
    timeFormat:{
      type: String,
      default: 'HH:mm:ss'
    }
  },
  data(){
    return{
      time: '',
      date: '',
      week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      day:'',
      timeInterval:null
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      const momentNow=moment();
      this.date = momentNow.format(this.dateFormat);
      this.day = this.week[momentNow.format('e')];
      this.updateTime();
    },
    updateTime(){
      const _this = this;
      this.timeInterval = setInterval(function(){
          _this.time = moment().format(_this.timeFormat);
      },1000);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.app-digital-clock{
  cursor: default;
  height: 50px;
  color: $clockColor;
  text-shadow: 0 0 3px $clockTextShadow, 0 0 3px $clockTextBrightness;
  .clockBox{
    display: flex;
    flex-direction: row;
     align-items: center;
    .time{
      font-size: 18px;
      font-weight: bold;
    }
    .dayBox{
      height: 50px;
      padding: 10px;
      font-weight: bold;
     .date,
     .day{
       height: 15px;
       line-height: 15px;
     }
     .date{
       font-size: 12px;
     }
     .day{
       font-size: 10px;
     }
    }
  }
}
</style>