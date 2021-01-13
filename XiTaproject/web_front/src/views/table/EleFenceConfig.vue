<template>
  <div>
   
    <template>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{"ADD" }}
      </el-button>
      <el-input
      v-model="searchEleFence.railname"
      placeholder="搜索电子围栏名称"
      style="width:200px;"
      prefix-icon="el-icon-document"
    />
    <!-- <el-input
      v-model="searchEleFence.floor"
      placeholder="搜索电子围栏楼层"
      style="width:200px;"
      prefix-icon="el-icon-document"
    /> -->
    
    <el-select v-model="searchEleFence.zmetre" style="width:190px;" placeholder="搜索电子围栏楼层">
      <el-option
        v-for="item in optionFloor"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-table
        :data="tableData5.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        highlight-current-row
        border
        style="width: 100%">
        

        <el-table-column
          prop="railname"
          label="电子围栏名称"
          width="220">
        </el-table-column>

        <el-table-column
          prop="zmetre"
          label="电子围栏楼层"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.zmetre}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="raildesc"
          label="电子围栏范围描述"
          >
        </el-table-column>
        <el-table-column
          prop="rangex"
          label="电子围栏起始X坐标"
          >
        </el-table-column>
        <el-table-column
          prop="rangey"
          label="电子围栏起始Y坐标"
          >
        </el-table-column>
        <el-table-column
          prop="width"
          label="电子围栏宽度"
          >
        </el-table-column>
        <el-table-column
          prop="height"
          label="电子围栏高度"
          >
        </el-table-column>

        <el-table-column
          prop="modifiedBy"
          label="最后编辑人"
          >
        </el-table-column>




        <!-- <el-table-column
          prop="date"
          label="最后设置时间"
          sortable
          width="180"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column> -->
        
        
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData5.length">
    </el-pagination>
  </div>
    <el-dialog :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item :label="'table.type'" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item> -->
        <el-form-item :label="'电子围栏名称'" >
          <el-input v-model="temp.railname" />
        </el-form-item>
        <el-form-item :label="'电子围栏楼层'" >
          <el-select v-model="temp.zmetre"  placeholder="Please select">
            <el-option v-for="item in optionFloor" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        
        <el-form-item :label="'电子围栏范围描述'">
          <!-- <el-input v-model="temp.eleFenceDescribe" /> -->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.raildesc">
          </el-input>
        </el-form-item>
        <el-form-item :label="'电子围栏起始X坐标'">
          <el-input v-model="temp.rangex" />
        </el-form-item>
        <el-form-item :label="'电子围栏起始Y坐标'">
          <el-input v-model="temp.rangey" />
        </el-form-item>
        <el-form-item :label="'电子围栏宽度'">
          <el-input v-model="temp.width" />
        </el-form-item>
        <el-form-item :label="'电子围栏高度'">
          <el-input v-model="temp.height" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

    </template>
  </div>
</template>

<script>
// const calendarTypeOptions = [
//         { key: 'CN', display_name: 'China' },
//         { key: 'US', display_name: 'USA' },
//         { key: 'JP', display_name: 'Japan' },
//         { key: 'EU', display_name: 'Eurozone' },
//       ]
export default {
  name: 'filterTable',
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      searchEleFence: {
        railname: "",
        zmetre: ""
      },
        
      textMap: {
        update: '编辑电子围栏',
        create: '新建电子围栏'
      },
      optionFloor: [
        {
          value: "",
          label: "无"
        },
        {
          value: "1",
          label: "一层"
        },
        {
          value: "2",
          label: "二层"
        },
        {
          value: "3",
          label: "三层"
        },
        {
          value: "4",
          label: "四层"
        },
        {
          value: "5",
          label: "五层"
        }
      ],
      dialogStatus: '',
      dialogFormVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      temp: {
        id:'',
        raildesc:'',
        railname: '',
        zmetre: '',
        rangex:'',
        rangey:'',
        width: '',
        height: '',
        modifiedBy: ''
      },
       tableData5:
       [{
         
      //   modifiedBy: '管理员1',
      //   eleFenceName: '电子围栏A',
      //   eleFenceDescribe: '包括餐厅，篮球场，足球场，活动室，收发室',
      //   floor: '一层',
      //   startX:'20',
      //   startY:'20',
      //   width:'100',
      //   height:'100'
      // }, {
      //   modifiedBy: '管理员2',
      //   eleFenceName: '电子围栏B',
      //   eleFenceDescribe: '包括餐厅，篮球场，足球场，活动室，收发室',
      //   floor: '二层',
      //   startX:'40',
      //   startY:'40',
      //   width:'200',
      //   height:'200'
        
      // }, {
      //   modifiedBy: '管理员3',
      //   eleFenceName: '电子围栏C',
      //   eleFenceDescribe: '包括餐厅，篮球场，足球场，活动室，收发室',
      //   floor: '三层',
      //   startX:'80',
      //   startY:'80',
      //   width:'400',
      //   height:'400'
      // }, {
      //   modifiedBy: '管理员4',
      //   eleFenceName: '电子围栏D',
      //   eleFenceDescribe: '包括餐厅，篮球场，足球场，活动室，收发室',
      //   floor: '四层',
      //   startX:'160',
      //   startY:'160',
      //   width:'800',
      //   height:'800'
       }],
       theCreatedData:''
    }
  },
  computed: {
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    this.$ajax
      .post("http://192.168.1.25:8080/person/getAllRailList", `searchEleFence=${JSON.stringify(this.searchEleFence)}`)
      .then(response => {
        //this.list=response.data
        this.tableData5=response.data
        console.log(this.tableData5[0].id);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.axios)
  },
  // watch:{
  //    searchEleFence: {
  //     // handler(newName, oldName) {
  //     //   console.log('请求')
  //     // this.$ajax
  //     // .post("api/person/getAllRailList", `sousou=${JSON.stringify(newName)}`)
  //     // .then(respones => {
  //     //   this.tableData5=respones.data
  //     //   console.log(respones.data);
  //     //   console.log(11111111111);
  //     // })
  //     // .catch(function(error) {
  //     //   console.log(error);
  //     // });
  //     // console.log(sousou)
  //     // },
  //     deep: true
  //   }
  // },
  methods: {
    createData(){
      this.dialogFormVisible=false;
      this.$ajax.post('http://192.168.1.25:8080/person/insertRail', `rail=${JSON.stringify(this.temp)}`
          )
    .then((response)=>{
    this.$message({
            type: 'success',
            message:'新增数据成功！'
          });  
            console.log(response.data)
            this.$ajax
      .post("http://192.168.1.25:8080/person/getAllRailList", `searchEleFence=${JSON.stringify(this.searchEleFence)}`)
      .then(response => {
        //this.list=response.data
        this.tableData5=response.data
        console.log(this.tableData5[0].id);
      })
      .catch(function(error) {
        console.log(error);
      });

      })
      
    .catch(function (error) {
        console.log(error);
      });
    },
    updateData(){
      this.dialogFormVisible=false;
      this.$ajax.post('http://192.168.1.25:8080/person/updateRail', `rail=${JSON.stringify(this.temp)}`
          )
    .then((response)=>{
    this.$message({
            type: 'success',
            message:'编辑已保存！'
          });  
            console.log(response.data)
      })
    .catch(function (error) {
        console.log(error);
      });
    },
    deleteData(theId){
      //alert(typeof(theId))
      this.$ajax.post('http://192.168.1.25:8080/person/delRail', `id=${theId}`
          )
    .then((response)=>{
      //alert(response.data)
    this.$message({
            type: 'success',
            message:'已删除该信息！'
          });  
            console.log(response.data)
            this.$ajax
      .post("http://192.168.1.25:8080/person/getAllRailList", `searchEleFence=${JSON.stringify(this.searchEleFence)}`)
      .then(response => {
        this.tableData5=response.data
        
      })
      .catch(function(error) {
        console.log(error);
      });
      })
    .catch(function (error) {
        console.log(error);
      });

    
    },
    search() {
          this.$ajax.post('http://192.168.1.25:8080/person/getAllRailList', `searchEleFence=${JSON.stringify(this.searchEleFence)}`)
      .then((response)=>{
        this.tableData5=response.data

      })
      .catch(function (error) {
        console.log(error);
      });

      this.$emit("clackhand", this.searchEleFence);
    },
    resetTemp() {
      this.temp = {
        id:'',
        raildesc:'',
        railname: '',
        zmetre: '',
        rangex:'',
        rangey:'',
        width: '',
        height: '',
        modifiedBy: ''
        
      }
    },
    handleEdit (index, row) {
      console.log(index)
      console.log(row)
      this.temp=row;
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.$message({
      //   showClose: true,
      //   message: index, row,
      //   type: 'success'
      // })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete (index, row) {
      this.deleteData(row.id);
      console.log(row.id)

      // this.$message({
      //   showClose: true,
      //   message: index, row,
      //   type: 'success'
      // })
    },
    handleSizeChange(size) {
        this.pagesize = size;
        
      },
      handleCurrentChange(currentPage) {
        
        this.currentPage = currentPage
      },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.floor === value
    }
  }
}
</script>

<style scoped>

</style>
