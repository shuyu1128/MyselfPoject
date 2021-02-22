<template>
    <div class="zongqu">
        <div class="qu">
            <h1>手环自检</h1>
            <shouhuanzidong />
        </div>
        <div class="qu">
            <h1>基站自检</h1>
            <jizhanzidong/>
        </div>
    </div>
</template>
<script>
import shouhuanzidong from './shouhuanzidong.vue'
import jizhanzidong from './jizhanzidong.vue'
export default {
    components:{
        shouhuanzidong,
        jizhanzidong
    }
}
</script>

<style scoped>
.qu{
    width: 800px;
    height: 760px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    float: left;
    margin-left: 20px;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-left: 10px;
}
.zongqu>.qu:nth-of-type(2) {
/* float: right; */
}
</style>
