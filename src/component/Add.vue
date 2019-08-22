<template>
    <div id="add">
        <h1>添加任务</h1>

        <el-date-picker class="add_time" type="datetime" placeholder="选择日期时间" v-model="taskTime"></el-date-picker>  

        <el-input  class="add_details" type="textarea" name="" id="" placeholder="任务详情"rows="3" v-model="taskDetail"></el-input>

        <!-- <div>时间</div> -->
        <!-- <div>任务详情</div> -->
        <el-button type="primary" icon="el-icon-search" @click="addTask()" :disabled="submitLimit">添加</el-button>
        <!-- <button class="button" @click="addTask()" :disabled="submitLimit">添加</button> -->
    </div>
</template>

<script>
    export default {
        name: "add",
        data:function(){
            return{
                taskTime:"",
                taskDetail:""
            }
        },
        computed:{
            submitLimit:function(){
                return this.taskTime&&this.taskDetail?false:true;
            }
        },
        methods:{
            addTask:function(){
                this.list.push({
                    date:this.taskTime,
                    todo:this.taskDetail
                })
                this.$router.push({name:"list"});
            }
        }
    }
</script>

<style scoped lang="scss">
    .add_time{
        width:280px;
    }
    .add_details{
        width: 280px;
    }
</style>