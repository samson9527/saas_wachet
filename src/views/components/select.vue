<!-- 所写者HJ -->
<template>
  <div class="selAddDiv" v-show="showStatus">
    <div class="sel_BG"></div>
    <div class="selList">
      <div class="toolbar">
        <span @click="cancalCity">取消</span><span></span><span @click="submit" style="text-align: right;">确定</span>
      </div>
      <mt-picker value-key="name" :slots="slots" @change="onValChange"></mt-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: "allSelect",
  //content为选项内容  selectDate为已经选好的值  parameter为赋予给上层的值
  props:['content','selectDate','parameter'],
  data: function data() {
    return {
      showStatus:false,
      slots:[{
            flex: 1,
            defaultIndex:0,
            values: [],
            textAlign: 'center'
        },{
            flex: 1,
            defaultIndex:0,
            values: [],
            textAlign: 'center'
        }
        ],
      value:""
    }
  },
  watch:{
     content: {
            handler: function (val, oldVal) {
              //数据改变的时候执行
                this.update(val);
            },
            deep: true
      }
  },
  mounted(){
     this.update(this.content);
  },
  methods:{
    update(content){
       this.slots[0].values=Object.keys(content);    
    },
    cancalCity(){
       //关闭弹框
        this.showStatus=false
    },
    submit(){
      //选择确定时候赋值
      this.$emit('select',{value:this.value,type:this.parameter})
      this.cancalCity();
    },
    onValChange(picker, values){
      //组件事件弹框获取
      // this.value = values[0] ? values[0] :'';
      picker.setSlotValues(1, this.content[values[0]]);
      if(values[0]&&values[1]){
        this.value = values[0] +'-'+ values[1]
      }else{
        this.value = values[0]
      }
      
    },
    open(){
      //打开弹框
      this.showStatus=true
    }
  }
}
</script>
<style lang="less">
  .selAddDiv{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:820;
    .sel_BG{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      z-index:820;
      background:#000;
      opacity:0.3;
    }
    .toolbar{
      height:.49rem;
      line-height: 0.49rem;
      border-bottom: 0.01rem solid #eaeaea;
      background:#FAFAFA;
      padding: 0  4%;
      >span{
        display: inline-block;
        width: 33.33%;
        text-align: left;
        font-size: 0.17rem;
        vertical-align:top;
      }
      span:nth-child(1){
        color: #9E9E9E;
      }
      span:nth-child(3){
        color: #00796B;
      }
    }
    .selList{
      position:absolute;
      bottom: -3.2rem;
      left:0;
      width:100%;
      z-index:830;
      background:#fff;
      -webkit-animation:myadd 0.4s;
      animation-fill-mode: forwards;
    }
    @keyframes myadd{
        from{bottom:-2.6rem;}
        to{bottom:0;}
    }
  }
</style>
