<template>
  <div class="school">
    <div class="filter-container">
      <el-select
        v-model="listQuery.selectIndex"
        placeholder="选择条件"
        clearable
        style="width: 90px"
        class="filter-item inputs"
        @change="selectItem"
      >
        <el-option
          v-for="item in optionItem"
          :key="item.selectValue"
          :label="item.selectName"
          :value="item.selectValue"
        />
      </el-select>
      <div class="selectItem">
        <el-select
          v-model="listQuery.school"
          placeholder="选择学校"
          clearable
          style="width: 90px"
          class="filter-item inputs"
          v-if="listQuery.selectIndex=='1'"
        >
          <el-option
            v-for="item in optionschool"
            :key="item.id"
            :label="item.school"
            :value="item.id"
          />
        </el-select>
        <el-date-picker
          v-model="listQuery.times"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          v-else-if="listQuery.selectIndex=='2'"
          @change="getTime"
          class="filter-items"
        ></el-date-picker>
      </div>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
      >导出</el-button>
      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >{{ $t('table.reviewer') }}</el-checkbox>-->
    </div>
    <el-table :data="tableData" style="width: 100%" border v-loading="listLoading">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校名称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '已生效' ? 'success' : 'info'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            :type="scope.row.tag === '已生效' ? 'info' : 'success'"
          >{{scope.row.tag === '已生效' ? '禁用' : '启用'}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="tableData"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" fullscreen>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="150px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="商铺名称" prop="shopName">
          <el-input v-model="temp.shopName" placeholder="请输入要商铺名称"/>
        </el-form-item>
        <el-form-item label="选择学校" prop="school">
          <el-select v-model="temp.id" placeholder="请选择学校" clearable style="width: 250px">
            <el-option
              v-for="item in optionschool"
              :key="item.id"
              :label="item.school"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="temp.phone" placeholder="请输入联系电话"/>
        </el-form-item>
        <el-form-item label="请输入店铺地址" prop="place">
          <el-input type="textarea" v-model="temp.place" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="请输入商品" prop="food">
          <el-input type="textarea" v-model="temp.food" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="tag">
          <el-select v-model="temp.tag" class="filter-item" placeholder="请选择" style="width: 250px">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入日期" prop="date" required>
          <el-date-picker
            v-model="temp.times"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            @change="getTime"
            class="filter-items"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      tableData: [
        {
          startTime: "2016-05-02",
          name: "武汉大学",
          endTime: "2016-05-03",
          shopName: "鼓励奶茶店",
          phone: "13111111111",
          tag: "已生效"
        },
        {
          startTime: "2016-05-02",
          name: "武汉大学",
          endTime: "2016-05-03",
          shopName: "鼓励奶茶店",
          phone: "13111111111",
          tag: "已生效"
        },
        {
          startTime: "2016-05-02",
          name: "武汉大学",
          endTime: "2016-05-03",
          shopName: "鼓励奶茶店",
          phone: "13111111111",
          tag: "已生效"
        },
        {
          startTime: "2016-05-02",
          name: "武汉大学",
          endTime: "2016-05-03",
          shopName: "鼓励奶茶店",
          phone: "13111111111",
          tag: "已生效"
        }
      ],
      statusOptions: ["发布", "保存"],
      optionItem: [
        {
          selectValue: "1",
          selectName: "按学校查询"
        },
        {
          selectValue: "2",
          selectName: "按时间查询"
        }
      ],
      optionschool: [
        {
          id: 1,
          school: "武汉大学"
        },
        {
          id: 2,
          school: "华中科技大学"
        },
        {
          id: 3,
          school: "武汉理工大学"
        }
      ],
      downloadLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      listQuery: {
        page: 1,
        limit: 20,
        searchItem: null,
        selectIndex: "",
        sort: "+id"
      },
      total: 100,
      temp: {
        id: undefined,
        name: "",
        tag: "",
        place: "",
        phone: "",
        shopName: "",
        food: "",
        times: ""
      },
      rules: {
        name: [{ required: true, message: "请填写学校", trigger: "blur" }],
        shopName: [
          { required: true, message: "请填写店铺名称", trigger: "blur" }
        ],
        tag: [{ required: true, message: "请选择状态", trigger: "change" }],
        school: [{ required: true, message: "请选择学校", trigger: "blur" }],
        place: [{ required: true, message: "请输入商家地址", trigger: "blur" }],
        food: [{ required: true, message: "请输入商品", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        date: [{ required: true, message: "请输入时间", trigger: "blur" }]
      },
      dialogFormVisible: false,
      textMap: {
        update: "编辑外卖卡",
        create: "创建外卖卡"
      },
      dialogStatus: ""
    };
  },
  created() {
    setTimeout(() => {
      this.listLoading = false;
    }, 1.5 * 1000);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    selectItem(index) {
      // console.log(index);
      // console.log(this.selectIndex);
    },
    getTime(time) {
      // console.log(time);
      // console.log(this.times);
    },
    //重置表单
    resetTemp() {
      this.temp = {
        id: undefined,
        status: "",
        place: "",
        phone: "",
        shopName: "",
        food: "",
        times: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      if (row.tag == "已生效") {
        row.tag = "发布";
      } else {
        row.tag = "保存";
      }
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
.school {
  padding: 40px;
  text-align: left;
  .filter-container {
    padding-bottom: 10px;
    text-align: left;
    .selectItem {
      display: inline-block !important;
    }
    .inputs {
      width: 200px !important;
    }
    .filter-item {
      display: inline-block !important;
      vertical-align: middle;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .filter-items {
      vertical-align: middle;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>

