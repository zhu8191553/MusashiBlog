<template>
    <div style="padding-bottom: 100px;">
        <div class="header_two">
            <span class="header_two_logo">
                <router-link to="/home">YUYAN</router-link>
            </span>
            <span style="margin-left: 500px;font-weight:800">欲言网数据管理系统</span>
        </div>
        <div class="admin_home_main">
            <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                <el-tab-pane label="数据可视化" name="first">
                    <div>
                        <Chart :data='all' />
                    </div>
                    <div>
                        <Chart :data='code' />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="用户管理" name="second">
                    <h3 style="margin-bottom: 15px;">用户管理列表</h3>
                    <el-table stripe border :data="userData" style="width:100%;" max-height="600">
                        <el-table-column label="序号" type="index" width="100">
                        </el-table-column>
                        <el-table-column prop="username" label="用户名">
                        </el-table-column>
                        <el-table-column prop="description" label="简介">
                        </el-table-column>
                        <el-table-column prop="gender" label="性别">
                        </el-table-column>
                        <el-table-column prop="createdAt" label="创建时间">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'User')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
                            </template>
</el-table-column>
</el-table>
</el-tab-pane>
<el-tab-pane label="文章管理" name="third">
    <h3 style="margin-bottom: 15px;">文章管理列表</h3>
    <el-table border stripe :data="articleData" style="width: 100%" max-height="600">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="username" label="创建用户" width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="articleType" label="话题">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Article')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
        </el-table-column>
    </el-table>
    <h3 style="margin: 15px 0;">评论管理列表(文章)</h3>
    <el-table border stripe :data="articleCommentData" style="width: 100%;margin-bottom: 100px;" max-height="600">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="username" label="评论用户" width="180">
        </el-table-column>
        <el-table-column prop="aid" label="文章标题">
        </el-table-column>
        <el-table-column prop="comment" label="评论内容">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'ArticleComment')" type="text" size="small">删除</el-button>
                            </template>
        </el-table-column>
    </el-table>
</el-tab-pane>
<el-tab-pane label="提问＆回答管理" name="fourth">
    <h3 style="margin: 15px 0;">提问管理列表</h3>
    <el-table border stripe :data="questionData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="username" label=创建用户>
        </el-table-column>
        <el-table-column prop="title" label="问题标题">
        </el-table-column>
        <el-table-column prop="content" label="问题描述">
        </el-table-column>
        <el-table-column prop="topic" label="话题">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Question')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
        </el-table-column>
    </el-table>
    <h3 style="margin: 15px 0;">回答管理列表</h3>
    <el-table border stripe :data="answerData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="id" label="回答ID">
        </el-table-column>
        <el-table-column prop="answerid" label="文章ID">
        </el-table-column>
        <el-table-column prop="username" label=回答用户>
        </el-table-column>
        <el-table-column prop="content" label="回答内容">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Answer')" type="text" size="small">删除</el-button>
                            </template>
        </el-table-column>
    </el-table>
    <h3 style="margin: 15px 0;">回答的评论</h3>
    <el-table border stripe :data="answerCommentData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="username" label=创建用户>
        </el-table-column>
        <el-table-column prop="answerId" label="回答ID">
        </el-table-column>
        <el-table-column prop="comment" label="评论内容">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'AnswerComment')" type="text" size="small">删除</el-button>
                            </template>
        </el-table-column>
    </el-table>
</el-tab-pane>
<el-tab-pane label="话题管理" name="fifth">
    <el-table border stripe :data="topicData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="title" label=话题名>
        </el-table-column>
        <el-table-column prop="content" label="话题描述">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Topic')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small" @click="editTopic(scope.row)">编辑</el-button>
                            </template>
        </el-table-column>
    </el-table>
</el-tab-pane>
<el-tab-pane label="图书管理" name="six">
    <el-table border stripe :data="bookData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="name" label=书名>
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="promotion" label="价格">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Topic')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small" @click="editBook(scope.row)">编辑</el-button>
                            </template>
        </el-table-column>
    </el-table>
</el-tab-pane>
</el-tabs>
</div>
<!-- 用户eidt -->
<el-dialog title="修改用户信息" :visible.sync="userEditVisible" width="30%">
    <span>
        <div class="personnalCenterLabel">
            用户名
        </div>
        <el-input v-model="userEditForm.username"></el-input>
        <div class="personnalCenterLabel">
            修改密码
        </div>
        <el-input v-model="userEditForm.password" placeholder="修改密码" type="password"></el-input>
        <div class="personnalCenterLabel">
            修改性别
        </div>
        <el-radio-group v-model="userEditForm.gender">
            <el-radio border :label="0">男孩子</el-radio>
            <el-radio border :label="1">女孩子</el-radio>
            <el-radio border :label="2"> 其他</el-radio>
        </el-radio-group>
        <div class="personnalCenterLabel">
            修改简介
        </div>
        <el-input v-model="userEditForm.description" placeholder="个人简介"></el-input>
</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="userEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">修改</el-button>
    </span>
</el-dialog>
<!-- 图书edit -->
<el-dialog title="修改图书信息" :visible.sync="bookEditVisible" width="30%">
    <span>
        <div class="personnalCenterLabel">
            图书户名
        </div>
        <el-input v-model="bookEditForm.name"></el-input>
        <div class="personnalCenterLabel">
            修改作者
        </div>
        <el-input v-model="bookEditForm.author" placeholder="作者"></el-input>
        <div class="personnalCenterLabel">
            修改价格
        </div>
        <el-input v-model="bookEditForm.promotion" placeholder="修改价格"></el-input>
        <div class="personnalCenterLabel">
            修改简介
        </div>
        <el-input v-model="bookEditForm.description" type="textarea" placeholder="图书简介" :rows="5"></el-input>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="bookEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBookInfo()">修改</el-button>
    </span>
</el-dialog>
<!-- 话题edit -->
<el-dialog title="修改话题信息" :visible.sync="topicEditVisible" width="30%">
    <span>
        <div class="personnalCenterLabel">
            话题名
        </div>
        <el-input v-model="topicEditForm.title"></el-input>
        <div class="personnalCenterLabel">
            话题描述
        </div>
        <el-input v-model="topicEditForm.content" type="textarea" placeholder="图书简介" :rows="5"></el-input>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="topicEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTopicInfo()">修改</el-button>
    </span>
</el-dialog>
</div>
</template>

<script>
    import axios from '../../utils/axiosService'
    import Chart from '@/components/chart.vue'
    import md5 from 'js-md5'
    import moment from 'moment'
    export default {
        name: 'adminHome',
        components: {
            Chart
        },
        data() {
            return {
                activeName: this.$route.params.tab,
                userData: [],
                articleData: [],
                articleCommentData: [],
                questionData: [],
                answerData: [],
                answerCommentData: [],
                topicData: [],
                bookData: [],
                userEditVisible: false,
                bookEditVisible: false,
                topicEditVisible: false,
                userEditForm: {
                    username: '',
                    gender: '',
                    description: '',
                    uid: '',
                    password: ''
                },
                topicEditForm: {
                    id: '',
                    content: '',
                    title: ''
                },
                bookEditForm: {
                    id: '',
                    name: '',
                    author: '',
                    promotion: '',
                    description: ''
                },
                all: {},
                chart2: {
                    id: 'chart2',
                    width: 300,
                    height: 300,
                    type: 'line',
                    name: 'study',
                    column: ['aa', 'bb', 'cc', 'dd', 'ee'],
                    title: 'First Demo',
                    nums: [11, 22, 33, 44, 22]
                },
                code: {}
            }
        },
        created() {
            if (this.$route.params.password !== md5('gang way')) {
                this.$router.push({
                    path: '/NotFoundComponent'
                })
            } else {
                this.$message({
                    message: '热烈欢迎我们的管理员！！！',
                    type: 'success',
                    duration: 2000
                })
            }
            this.getData()
            this.all = {
                id: 'chart1',
                width: 700,
                height: 400,
                type: 'bar',
                name: '数据汇总',
                column: ['文章', '文章评论', '提问', '回答', '回答评论', '用户', '话题', '图书'],
                title: '数据数量汇总',
                nums: [88590, 41555, 46761, 11, 70, 22, 8, 6]
            }
            this.code = {
                id: 'chart3',
                width: 400,
                height: 400,
                type: 'pie',
                name: 'study',
                column: ['CSS', 'JavaScript', 'component(Vue.js)'],
                title: 'First Demo',
                nums: [6512, 4234, 5234]
            }
        },
        methods: {
            tabHandleClick(tab, event) {
                this.$router.push({
                    path: `/adminHome/${md5('gang way')}/${tab.name}`
                })
            },
            deleteItem(row, type) {
                this.$confirm('是否确定删除当前数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        id: row.id
                    }
                    axios.post(`/api/delete${type}`, data).then((res) => {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 1000
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 1000
                    });
                });
            },
            getData() {
                axios.get('/api/userList').then((res) => {
                    res.data.forEach(element => {
                        element.createdAt = moment(element.createdAt).format('YYYY/MM-DD hh:mm')
                        if (element.gender == 0) {
                            element.gender = "男"
                        } else if (element.gender == 1) {
                            element.gender = "女"
                        } else if (element.gender == 2) {
                            element.gender = "其他"
                        }
                    });
                    this.userData = res.data
                }).catch((error) => {
                    console.log(error)
                })
                axios.get('/api/articleList').then((req) => {
                    req.data.forEach(item => {
                        item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
                    })
                    this.articleData = req.data
                }).catch((error) => {
                    console.warn(error)
                })
                axios.get('/api/getAllAriticleComment').then((req) => {
                    this.articleCommentData = req.data
                }).catch((error) => {
                    console.warn(error)
                })
                axios.get('/api/getAnswers').then((req) => {
                    this.questionData = req.data
                }).catch((error) => {
                    console.log(error)
                })
                axios.get('/api/getAnswerComments').then((req) => {
                    this.answerCommentData = req.data
                }).catch((error) => {
                    console.log(error)
                })
                axios.get('/api/getAllQuestions').then((req) => {
                    this.answerData = req.data
                }).catch((error) => {
                    console.log(error)
                })
                axios.get('/api/getTopics').then((req) => {
                    this.topicData = req.data
                }).catch((error) => {
                    console.log(error)
                })
                axios.get('/api/getBooks').then((req) => {
                    this.bookData = req.data
                }).catch((error) => {
                    console.log(error)
                })
            },
            message(type, message) {
                this.$message({
                    type: type,
                    message: message,
                    duration: 1000
                })
            },
            editUser(item) {
                let tmpData = this.userEditForm
                tmpData.username = item.username
                if (item.gender === '男') {
                    tmpData.gender = 0
                } else if (item.gender === '女') {
                    tmpData.gender = 1
                } else if (item.gender === '其他') {
                    tmpData.gender = 2
                }
                tmpData.description = item.description
                tmpData.uid = item.id
                this.userEditVisible = true
            },
            editBook(item) {
                let tmpData = this.bookEditForm
                tmpData.id = item.id
                tmpData.name = item.name
                tmpData.author = item.author
                tmpData.promotion = item.promotion
                tmpData.description = item.description
                this.bookEditVisible = true
            },
            editTopic(item) {
                let tmpData = this.topicEditForm
                tmpData.id = item.id
                tmpData.title = item.title
                tmpData.content = item.content
                this.topicEditVisible = true
            },
            editUserInfo() {
                axios.post('/api/updataUserInfo', this.userEditForm).then((res) => {
                    this.getData()
                    this.message('success', '修改成功')
                    this.userEditVisible = false
                }).catch((error) => {
                    console.log(error)
                })
            },
            editBookInfo() {
                axios.post('/api/updatBook', this.bookEditForm).then((res) => {
                    this.getData()
                    this.message('success', '修改成功')
                    this.bookEditVisible = false
                }).catch((error) => {
                    console.log(error)
                })
            },
            editTopicInfo() {
                axios.post('/api/updatTopic', this.topicEditForm).then((res) => {
                    this.getData()
                    this.message('success', '修改成功')
                    this.topicEditVisible = false
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>
<style>
    .admin_home_main {
        padding: 0 50px;
    }
    
    .el-table__row td .cell {
        max-height: 55px;
        overflow: hidden;
    }
    
    .el-table table {
        width: 100%;
    }
</style>