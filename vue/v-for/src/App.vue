<template>
  <div>
    <!-- <div class="first common">
      <ul>
        <li v-for="(person, index) in persons" :key="index">
          {{ person.name }}
        </li>
      </ul>
    </div>
    <div class="second common">
      <p v-for="(item, i) in list" :key="i">{{ i }}:{{ item }}</p>
    </div>
    <div class="third">
      <p v-for="(user, id) in listObject" :key="id">
        {{ user.id }}:{{ user.name }}
      </p>
    </div>
    <div class="fourth">
      <p v-for="(person, id) in user" :key="id">{{ id }}:{{ person }}</p>
    </div>
    <div class="fifth">
      <p v-for="count in 10" :key="count">这是第{{ count }}次循环数</p>
    </div> -->
    <el-table :data="tableData" border stripe>
      <!-- <el-table-column
        v-for="(col, index) in columns"
        prop="age"
        :key="index"
        :label="col.label"
        :width="col.width"
      >
      </el-table-column> -->
      <el-table-column prop="name" label="日期" width="180"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [{ name: "zhangsan" }, { name: "lisi" }],
      list: [1, 2, 3, 4, 5, 6],
      listObject: [
        { id: 1, name: "zhangsan" },
        { id: 2, name: "lisi" },
        { id: 3, name: "wangwu" },
        { id: 4, name: "tiezhu" },
        { id: 5, name: "xiuqin" },
      ],
      user: {
        id: 1,
        name: "刘德华",
        sex: "男",
        age: 51,
      },
      columns: [
        { id: "name", label: "姓名", width: 180 },
        { id: "age", label: "年龄", width: 180 },
        { id: "height", label: "高度", width: 180 },
        { id: "width", label: "宽度", width: 180 },
      ],
      tableData: [
        {
          name: "ss",
          age: "12",
          height: "13",
          width: "12",
        },
        {
          name: "sqs",
          age: "12q",
          height: "1w3",
          width: "12e",
        },
      ],
    };
  },
};
</script>

<style>
ul {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
.common {
  transition: width 2s;
  -webkit-transition: width 2s;
}
.first {
  display: flex;
  align-items: center;
  width: 200px;
  background-color: black;
  color: antiquewhite;
}
.second {
  width: 200px;
  background-color: greenyellow;
  color: black;
}
.first:hover {
  width: 100%;
}
.second:hover {
  width: 100%;
}
</style>
