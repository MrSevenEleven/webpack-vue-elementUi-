<template>
        <ul>
            <li v-for="(item,index) in taskLists">
                <div class="time">时间：{{item.date}}</div>
                <div class="detail">任务详情：{{item.todo}}</div>
                <div class="delete el-icon-share" @click="deleteTask(index)"></div>
                <div class="iconfont icon-wancheng complete" @click="completeTask(index)"></div>
            </li>
        </ul>
</template>

<script>
    export default {
        name: "list",
        data:function(){
            return{
                taskLists:this.list,
            }
        },
        methods:{
            deleteTask:function(taskIndex){
                this.taskLists.splice(taskIndex,1);
            },
            completeTask:function(taskIndex){
                this.completedList.push(this.taskLists[taskIndex]);
                this.taskLists.splice(taskIndex,1);
            }
        }
    }
</script>

<style scoped lang="scss">
        ul{
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow-y: auto;
            padding: 5px 10px;
            li{
                height: 70px;
                line-height: 1.5;
                list-style: none;
                margin: 4px auto;
                padding: 2px  4px;
                box-sizing: border-box;
                width: 100%;
                background-color:#D8E5D7;
                position: relative;
                .time{
                    width: 80%;
                    height: 20px;
                    float: left;
                }
                .detail{
                    width: 80%;
                    height: 50px;
                    float: left;
                }
                .delete{
                    text-align: center;
                    width: 15%;
                    height: 70px;
                    line-height: 70px;
                    font-size: 25px;
                    color: #fff;
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .complete{
                    text-align: center;
                    width: 10%;
                    height: 70px;
                    line-height: 70px;
                    font-size: 25px;
                    color: #fff;
                    cursor: pointer;
                    position: absolute;
                    right: 15%;
                    top: 0;
                }
            }
        }

</style>