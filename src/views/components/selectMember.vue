<!-- 所写者HJ -->
<template>
  <div class="selAddDiv" v-show="showStatus">
    <div class="sel_BG"></div>
    <div class="selList">
      <div class="toolbar">
        <span @click="cancalCity">取消</span><span></span><span @click="submit" style="text-align: right;">确定</span>
      </div>
      <mt-radio v-model="radioValue" align="left" :options="slots" v-if="display"> </mt-radio>
      <mt-checklist v-model="checkValue" align="left" :options="slots" v-if="!display"></mt-checklist> 
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
        radioValue:'',
        checkValue:[],
        slots:[],
        display:true,//默认是单选先显示
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
    //判断是单选框还是多选框
    if(this.parameter == 'teamMenber'){
      this.display = false;
    }
    this.update(this.content);
  },
  methods:{
    update(content){
         this.slots=content;    
    },
    cancalCity(){
       //关闭弹框
        this.showStatus=false
    },
    submit(){
      //选择确定时候赋值
      if(this.display == true){
        this.$emit('select',{value:this.radioValue,type:this.parameter})
      }else{
        this.$emit('select',{value:this.checkValue,type:this.parameter})
      }
      this.cancalCity();
    },
    open(){
      //打开弹框
      this.showStatus=true
    }
  }
}
</script>
<style lang="less">
@import url('../../assets/css/base.less');
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
      line-height: .49rem;
      border-bottom: 0.01rem solid #eaeaea;
      background:#FAFAFA;
      padding: 0 0.1rem;
      >span{
        display: inline-block;
        width: 33.33%;
        text-align: left;
        height:.4rem;
        line-height:.4rem;
        font-size: 0.15rem;
        color: #1588FF;
        vertical-align:top;
      }
      span:nth-child(1){
        font-size: 0.17rem;
        color: @fontSizeColor;
      }
      span:nth-child(3){
        font-size: 0.17rem;
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
    .mint-radiolist , .mint-checklist{
      height: 2rem;
      overflow: auto;
      .mint-cell{
        border-bottom:0.01rem solid #E9E9E9;
      }
    }
  }
</style>
