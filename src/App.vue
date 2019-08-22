<template>
    <div class="app_wrapper">
        <header>xxAPP</header>
        <div class="view_wrapper">
            <router-view></router-view>
        </div>
        <footer @click="linkTo($event)">
            <section name="list" class="el-icon-s-operation"></section>
            <section name="add" class="el-icon-circle-plus-outline"></section>
            <section name="completed" class="el-icon-s-claim"></section>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "app",
        methods:{
            linkTo:function(e){
                this.$router.push({name:e.target.getAttribute("name")});
                

            }
        }
    }
</script>

<style scoped lang="scss">
    .app_wrapper {
        width: 26%;
        height: 100%;
        min-width: 350px;
        min-height: 600px;
        margin: 0 auto;
        box-sizing: border-box;
        border: 1px solid #a0a0a0;
        position: relative;
        header{
            height: 60px;
            line-height: 60px;
            font-size: 2rem;
            background-color: #36DA33;
            color: #fff;
            text-align: center;
        }
        .view_wrapper{
            width: 100%;
            height: 530px;
            overflow: hidden;
        }
        footer{
            width: 100%;
            font-weight: bold;
            position: absolute;
            bottom: 0;
            section{
                height:60px;
                line-height: 60px;
                border-top: 1px solid #a0a0a0;
                font-size: 2.5rem;
                color: #a0a0a0;
                /*background-color: #a0a0a0;*/
                width: 33.3%;
                float: left;
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: green;
                }
            }
        }
    }
</style>