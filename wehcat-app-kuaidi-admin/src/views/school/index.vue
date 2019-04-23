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
        <el-input
          v-model="listQuery.searchItem"
          placeholder="请输入学校"
          v-if="listQuery.selectIndex=='1'"
          class="filter-item inputs"
        ></el-input>
        <el-input
          v-model="listQuery.searchItem"
          placeholder="请输入编号"
          v-else-if="listQuery.selectIndex=='2'"
          class="filter-item inputs"
        ></el-input>
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
          v-else-if="listQuery.selectIndex=='3'"
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
      <el-table-column label="学校名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校编号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.codeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="轮播图张数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.swipeList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
        <!-- <el-form-item :label="学校名称" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>-->
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入要学校名称"/>
        </el-form-item>
        <el-form-item label="编号" prop="codeName">
          <el-input v-model="temp.codeName" placeholder="请输入要学校编号"/>
        </el-form-item>
        <el-form-item label="校园快递放置点" prop="place">
          <el-input type="textarea" v-model="temp.place" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="tag">
          <el-select v-model="temp.tag" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="上传轮播图" prop="tag">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
          date: "2016-05-02",
          name: "武汉大学",
          codeName: "A",
          swipeList: 4,
          tag: "已生效"
        },
        {
          date: "2016-05-04",
          name: "华中科技大学",
          codeName: "B",
          swipeList: 4,
          tag: "已禁用"
        },
        {
          date: "2016-05-01",
          name: "华中师范大学",
          codeName: "C",
          swipeList: 4,
          tag: "已生效"
        },
        {
          date: "2016-05-03",
          name: "武汉理工大学",
          codeName: "D",
          swipeList: 4,
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
          selectName: "按编号查询"
        },
        {
          selectValue: "3",
          selectName: "按时间查询"
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
        times: "",
        sort: "+id"
      },
      total: 100,
      temp: {
        id: undefined,
        name: "",
        codeName: "",
        tag: "",
        place: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      rules: {
        name: [{ required: true, message: "请填写学校", trigger: "blur" }],
        codeName: [
          { required: true, message: "请填写学校编号", trigger: "blur" }
        ],
        tag: [{ required: true, message: "请选择状态", trigger: "change" }],
        place: [
          { required: true, message: "请输入快递存放地址", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      textMap: {
        update: "编辑学校",
        create: "创建学校"
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
        name: "",
        codeName: "",
        status: "",
        place: ""
      };
      this.fileList = [];
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

