/**
 * User: peijialong
 * Date: 2020/06/16
 * Description: 功能向导状态
 */
import { functionarrs } from '../../../api/api'
import router from '@/router'
export default {
    state: {
        // 智能健康测评步骤管理状态
        stepshow: "step1",
        stepshowNum: "1",
        intro: introJs(),
        // 配置项
        allOptions: {
            index: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: "#v-step1",
                        intro: "此功能为跳转到一下功能页面快捷方式，点击后即可跳转到相应模块进行操作。",
                        position: "right"
                    },
                    {
                        element: "#v-step2",
                        intro: "此功能会提示您危机人员，特殊关注人员和未读公告的信息数量。",
                        position: "right"
                    },
                    {
                        element: "#v-step3",
                        intro: "点击后进入监控大屏，监控大屏页面将全面展示院内人员基本数据。",
                        position: "left"
                    },
                    {
                        element: "#v-step4",
                        intro: "该图表以每个用户的责任区域来展示当前七天以内的入住人数、离院人数、紧急情况、特殊关注、外出人数，分别以不同颜色的线条来区分，鼠标悬浮会显示各项的人数信息。",
                        position: "top"
                    }
                ]
            },
            Roomstate: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".v-step1",
                        intro: "院内房间床位统计：将房间、床位、分类为全自理、半自理、全介护，同时也分为空余房间和空余床位并以表格形式展示。",
                        position: "right"
                    },
                    {
                        element: ".v-step2",
                        intro: "房间图表统计：将房间以饼状图形式展现，鼠标悬浮可查看房间数量。",
                        position: "right"
                    },
                    {
                        element: ".v-step3",
                        intro: "楼层房间表格：此功能可按条件搜索查询各个房间的情况和房间下床铺入住情况，如果床铺有人员入住便可点击下图中人员姓名跳转到该人员的详情页面。",
                        position: "bottom"
                    }
                ]
            },
            Information: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".v-step1",
                        intro: "院内公告展示区域，可查看公告标题、内容、时间、已读、未读。",
                        position: "right"
                    },
                    {
                        element: ".v-step2",
                        intro: "院内新闻展示区域，可查看新闻标题、内容、时间、已读、未读。",
                        position: "left"
                    }
                ]
            },
            Rollcall: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".v-step1",
                        intro: "设置开始时间，设置自检周期之后，点击【确定】按钮，系统会根据用户所设置的时间、周期进行人员定期的检查。点击【手动点名】按钮，系统将会跳过用户设置的时间、周期，直接进入检查状态，待数据返回后，可查看点名数据",
                        position: "bottom"
                    },
                    {
                        element: ".v-step2",
                        intro: "人员点名数据展示区域，可查看开始时间、结束时间、异常个数，点击详情后可查看异常详情。",
                        position: "right"
                    }
                ]
            },
            Backtracking: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".v-step1",
                        intro: "人员搜索：文本框中输入将要进行轨迹回溯的人员姓名,点击搜索，下列图表便会展示根据搜索条件查询的人员。",
                        position: "right"
                    },
                    {
                        element: ".v-step2",
                        intro: "人员选择：直接点击列表中人员进行选中。",
                        position: "right"
                    },
                    {
                        element: ".v-step3",
                        intro: "时间选择：选中将要查看的开始时间和结束时间后，点击确定",
                        position: "bottom"
                    },
                    {
                        element: ".v-step4",
                        intro: "轨迹回放区域：点击播放，轨迹线开始跟随虚拟老人移动，并且在人员跨越楼层时将会自动将当前屏幕截图",
                        position: "left"
                    }
                ]
            },
            history: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".v-step1",
                        intro: "输入人员姓名（可下拉选择）选择开始时间，结束时间后点击搜索，下列图表便会根据搜索条件所展示相应内容。点击导出可导出根据搜索条件所筛选的相应内容",
                        position: "bottom"
                    },
                    {
                        element: ".v-step2",
                        intro: "图表展示：该功能用于展示异常情况的名称、人员姓名、开始时间、人员位置、人员身体健康状况",
                        position: "left"
                    }
                ]
            },
            Evaluating: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Evaluating-step1",
                        intro: "通过弹窗选择将要测评的人员，弹窗可选择的人员都为未测评的人员（弹窗搜索框可录入关键字进行搜索)。",
                        position: "bottom"
                    },
                    {
                        element: ".Evaluating-step2",
                        intro: "题目概览区域：该功能用于展示所有题目概览将会跟随您答题的进度",
                        position: "right"
                    },
                    {
                        element: ".Evaluating-step3",
                        intro: "答题卡区域：选择完成后点击下一题即可",
                        position: "left"
                    }
                ]
            },
            seniorindex_0: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                    element: ".seniorindex_0-step1",
                    intro: "通过弹窗选择将要测评的人员，弹窗可选择的人员都为未测评的人员（如需继续引导请点击结束引导并完成当前步骤，进入答题页面再次点击功能向导)。",
                    position: "bottom"
                }]
            },
            seniorindex_1: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".seniorindex_1-step1",
                        intro: "答题进度区域:步骤图将会跟随您答题的进度进行变化。",
                        position: "bottom"
                    },
                    {
                        element: ".seniorindex_1-step2",
                        intro: "答题区域:通过点选即可完成答题（不可不选或漏选）。",
                        position: "bottom"
                    },
                    {
                        element: ".seniorindex_1-step3",
                        intro: "答题结束后通过点击下一步按钮进行接下来的测评（本次向导已结束如需继续引导请点击结束引导并完成当前向导步骤，进入下一步后再次点击功能向导）。",
                        position: "bottom"
                    }
                ]
            },
            seniorindex_2: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".seniorindex_2-step1",
                        intro: "答题区域:通过点选即可完成答题。",
                        position: "bottom"
                    },
                    {
                        element: ".seniorindex_2-step2",
                        intro: "答题完成后请点击生成初步结果按钮，跳转到初步结果页面（本次向导结束，如需初步结果页面向导请点击结束引导并完成当前向导步骤并，进入初步结果页面再次点击功能向导）。",
                        position: "bottom"
                    }
                ]
            },
            seniorindex_3: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".seniorindex_3-step1",
                        intro: "初步结果:此页面将会把各项评估标准分别以雷达图和文字的形式进行显示，并且显示总分。",
                        position: "bottom"
                    },
                    {
                        element: ".seniorindex_3-step2",
                        intro: "请选择框进行选择护理模板，选择完成后点击生成护理方案进入护理方案页面（本次向导结束，如需护理方案页面向导请点击结束引导并完成当前向导步骤并，进入护理方案页面再次点击功能向导）。",
                        position: "bottom"
                    }
                ]
            },
            seniorindex_4: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".seniorindex_4-step1",
                        intro: "此页面将会详细展示每一项护理内容的具体收费和总收费，并且可以更改每一项护理内容的等级和价位。",
                        position: "left"
                    },
                    {
                        element: ".seniorindex_4-step2",
                        intro: "点击生成评估报告按钮，会以弹窗形式来进行选择生成新方案或者仅应用于本次，点击生成新模板，将会以本次修改内容生成新的护理方案，点击仅应用于本次将不会对护理方案有任何影响，选择完成后会自动跳转到智能健康评估结果页面（本次向导结束，如需智能健康评估结果页面向导请点击结束引导并完成当前向导步骤并，进入智能健康评估结果页面再次点击功能向导）",
                        position: "left"
                    }
                ]
            },
            seniorindex_5: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".seniorindex_5-step1",
                        intro: "此区域将会展示测评结果,和护理内容鼠标滚轮下滑浏览。",
                        position: "bottom"
                    },

                    {
                        element: ".seniorindex_5-step2",
                        intro: "点击下载为pdf按钮，本页将会已pdf文件格式进行下载。",
                        position: "bottom"
                    }
                ]
            },
            filterTable: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".filterTable-step1",
                        intro: "录入或选择框中信息，点击搜索，即可根据相关信息来查看人员。",
                        position: "bottom"
                    },
                    {
                        element: ".filterTable-step2",
                        intro: "点击添加按钮，弹出人员姓名/住院号/手环，输入对应信息点击确定，添加人员完成。",
                        position: "bottom"
                    },
                    {
                        element: ".filterTable-step3",
                        intro: "点击批量添加按钮将会提示下载模板（已下载可忽略），根据模板进行录入之后再次点击批量添加之后点击我已下载，选中录入好的模板完成批量添加。",
                        position: "bottom"
                    },
                    {
                        element: ".filterTable-step4",
                        intro: "点击导出按钮将会根据当前搜索条件来导出表格。",
                        position: "bottom"
                    },
                    {
                        element: ".filterTable-step5",
                        intro: "<p> 批量入院：如人员在院状态为离院/外出，多条信息勾选后，点击批量入院，在院状态将更新为在院。</p><p>批量外出：如人员在院状态为在院，多条信息勾选后，点击批量外出，在院状态将更新为外出。</p><p>批量离院：如人员在院状态为在院，多条信息勾选后，点击批量离院，在院状态将更新为离院，对应设备解绑，对应设置解除。</p><p>批量删除：如人员在院状态为在院/外出/离院，多条信息勾选后，点击批量删除，人员信息将删除，对应设备解绑，对应设置解除。</p>",
                        position: "bottom"
                    },
                    {
                        element: ".filterTable-step6",
                        intro: "<p>1.点击表格中详情，页面将会跳转至相对应的人员信息详情页面。</p><p>2.点击表格中编辑，页面将会跳转至相对应的人员信息编辑页面</p><p>3.点击表格中删除，该人员信息将会删除，所关联设备解除</p><p>4.修改表格中在院状态为离院，该人员在院状态更新为离院状态，所关联设备解除</p><p>5.修改表格中在院状态为外出，该人员在院状态更新为外出状态</p><p>6.修改表格中在院状态为入院，该人员在院状态更新为在院</p>",
                        position: "bottom"
                    }
                ]
            },
            fDetails: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".fDetails-step1",
                        intro: "人员搜索：文本框中输入将要查看的人员姓名,点击搜索，下列图表便会展示根据搜索条件查询的人员。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step2",
                        intro: "人员选择：直接点击列表中人员进行选中。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step3",
                        intro: "点击便可更换人员头像。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step4",
                        intro: "快捷信息：此处将会根据挡墙登录人的设置来显示被查看人员的信息字段。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step5",
                        intro: "点击快捷信息卡内容，弹出提示框勾选想要展示的人员信息作为快捷信息字段，点击保存即刻生效（快捷信息字段上限为八个）。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-1",
                        intro: "个人信息：用于展示选中人员的个人信息。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-2",
                        intro: "在院信息：用于查看选中人员的在院信息。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-3",
                        intro: "护理方案：用于查看选中人员的护理方案和历史测评结果。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-7",
                        intro: "实时健康监测：用于查看该人员当前的血压、心率、体温，也可查看这些信息的过往时间的数据，可选择一天、半天、小时为单位并且以图标的形式进行展示。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-8",
                        intro: "历史健康档案：该功能可查看选中人员的某段过去时间的健康数据报表，并且可生成pdf供下载。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-4",
                        intro: "电子围栏：该功能可查看当前选中人员已分配的电子围栏组。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-5",
                        intro: "智能设备：该功能可查看当前选中人员已佩戴的智能设备。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-6",
                        intro: "附件管理：该功能中的附件分为入院合同、体检报告、证件扫描件、其他，在某个类型下添加的附件就会被归类到这一类型，右侧表格用于展示该类型下的附件",
                        position: "bottom"
                    }
                ]
            },
            Detailsx: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".fDetails-step1",
                        intro: "人员搜索：文本框中输入将要查看的人员姓名,点击搜索，下列图表便会展示根据搜索条件查询的人员。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step2",
                        intro: "人员选择：直接点击列表中人员进行选中。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step3",
                        intro: "点击便可更换人员头像。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step4",
                        intro: "快捷信息：此处将会根据挡墙登录人的设置来显示被查看人员的信息字段。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step5",
                        intro: "点击快捷信息卡内容，弹出提示框勾选想要展示的人员信息作为快捷信息字段，点击保存即刻生效（快捷信息字段上限为八个）。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-1",
                        intro: "个人信息：用于展示选中人员的个人信息。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-2",
                        intro: "在院信息：用于查看选中人员的在院信息。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-3",
                        intro: "护理方案：用于查看选中人员的护理方案和历史测评结果。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-7",
                        intro: "实时健康监测：用于查看该人员当前的血压、心率、体温，也可查看这些信息的过往时间的数据，可选择一天、半天、小时为单位并且以图标的形式进行展示。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-8",
                        intro: "历史健康档案：该功能可查看选中人员的某段过去时间的健康数据报表，并且可生成pdf供下载。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-4",
                        intro: "电子围栏：该功能可查看当前选中人员已分配的电子围栏组。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-5",
                        intro: "智能设备：该功能可查看当前选中人员已佩戴的智能设备。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-6",
                        intro: "附件管理：该功能中的附件分为入院合同、体检报告、证件扫描件、其他，在某个类型下添加的附件就会被归类到这一类型，右侧表格用于展示该类型下的附件",
                        position: "bottom"
                    }
                ]
            },
            Details: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".fDetails-step1",
                        intro: "人员搜索：文本框中输入将要编辑的人员姓名,点击搜索，下列图表便会展示根据搜索条件查询的人员。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step2",
                        intro: "人员选择：直接点击列表中人员进行选中。",
                        position: "right"
                    },
                    {
                        element: ".fDetails-step3",
                        intro: "点击便可更换人员头像。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step4",
                        intro: "快捷信息：此处将会根据挡墙登录人的设置来显示被查看人员的信息字段。",
                        position: "bottom"
                    },
                    {
                        element: ".fDetails-step5",
                        intro: "点击快捷信息卡内容，弹出提示框勾选想要展示的人员信息作为快捷信息字段，点击保存即刻生效（快捷信息字段上限为八个）。",
                        position: "bottom"
                    },
                    {
                        element: "#tab-1",
                        intro: "个人信息：用于查看、编辑选中人员的个人信息（编辑结束后，需点击右下角对号图标形式的保存按钮）",
                        position: "bottom"
                    },
                    {
                        element: "#tab-2",
                        intro: "在院信息：用于查看、编辑选中人员的在院信息。（编辑结束后，需点击右下角对号图标形式的保存按钮）",
                        position: "bottom"
                    },
                    {
                        element: "#tab-3",
                        intro: "护理方案：用于查看选中人员的护理方案并且编辑历史测评结果。（编辑结束后，需点击右下角对号图标形式的保存按钮）",
                        position: "bottom"
                    },
                    {
                        element: "#tab-4",
                        intro: "电子围栏：该功能可查看、编辑当前选中人员已分配的电子围栏组。（编辑结束后，需点击右下角对号图标形式的保存按钮）",
                        position: "bottom"
                    },
                    {
                        element: "#tab-5",
                        intro: "智能设备：该功能可查看、编辑当前选中人员已佩戴的智能设备。（编辑结束后，需点击右下角对号图标形式的保存按钮）",
                        position: "bottom"
                    },
                    {
                        element: "#tab-6",
                        intro: "附件管理：该功能中的附件分为入院合同、体检报告、证件扫描件、其他，在某个类型下添加的附件就会被归类到这一类型，右侧表格为该类型下的附件，可下载也可删除.",
                        position: "bottom"
                    }
                ]
            },
            Fences: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".is-left",
                        intro: "围栏组选择区域：该区域为定义的围栏组名称，围栏组适用于右侧建筑结构区域的建筑、房间、或者人员。",
                        position: "right"
                    },
                    {
                        element: ".el-tabs__content",
                        intro: "建筑结构区域：被勾选的内容将被绑定左侧围栏组选择区域的电子围栏组。",
                        position: "left"
                    },
                    {
                        element: ".Fences_3-step3",
                        intro: "点击保存即可保存当前设置。",
                        position: "left"
                    }
                ]
            },
            Userrole: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: "#tab-0",
                        intro: "角色管理：该功能可生成用于分配给用户的角色，可对角色进行删除也可更改选中角色的浏览权限。",
                        position: "right"
                    },
                    {
                        element: "#tab-1",
                        intro: "责任区域管理：该功能可创建用于分配给用户的责任区域，可对责任区域进行删除也可更改选中的责任区域范围。",
                        position: "right"
                    },
                    {
                        element: "#tab-2",
                        intro: "用户管理：该功能用于管理当前系统的所有用户，可对选中的账户进行角色的分配，责任区域的分配，发布公告区域的分配",
                        position: "right"
                    }
                ]
            },
            Equipmentall: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: "#tab-0",
                        intro: "<h4>手环管理：用于增加、修改、删除手环。</h4><p>1.页面会显示手环和人员设备信息，用户也可以输入手环的编码/名称/类型/版本/电量范围等，点击【搜索】按钮查询设备的信息</p><p>2.点击表格中【编辑】按钮，用户可以很据当前的设备信息进行修改。</p><p>3.点击表格中【删除】按钮，当前选中的设备信息将删除。</p><p>4.点击【手环录入】按钮，弹出录入手环信息页面，输入手环的基本信息后，点击【确定】按钮，手环信息增加完毕。</p>",
                        position: "right"
                    },
                    {
                        element: "#tab-1",
                        intro: "<h4>基站：用于增加、修改、删除基站。</h4><p>1.页面会显示基站信息，用户也可以输入基站的编码、名称、楼层等，点击【搜索】按钮查询基站的信息。</p><p>2.点击表格中的【编辑】按钮，用户可以很据当前的基站信息进行修改。</p><p>3.点击表格中【删除】按钮，当前选中的基站信息将删除。</p><p>4.点击【基站录入】按钮，弹出录入基站信息页面，输入基站的基本信息后，点击【确定】按钮，基站信息增加完毕。</p>",
                        position: "right"
                    }
                ]
            },
            Selfchecking: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Selfchecking-step1",
                        intro: "设置开始时间，设置自检周期之后，点击【确定】按钮，系统将会根据所设置的时间、周期，定期返回自检数据。点击【手动自检】按钮，系统将会跳过用户设置的时间、周期，直接进入检查状态，待数据返回后，可查看数据",
                        position: "bottom"
                    },
                    {
                        element: ".Selfchecking-step2",
                        intro: "手环自检数据展示区域：可查看开始时间、结束时间、异常个数，点击详情后可查看异常详情。",
                        position: "right"
                    },
                    {
                        element: ".Selfchecking-step3",
                        intro: "设置开始时间，设置自检周期之后，点击【确定】按钮，系统将会根据所设置的时间、周期，定期返回自检数据。点击【手动自检】按钮，系统将会跳过用户设置的时间、周期，直接进入检查状态，待数据返回后，可查看数据",
                        position: "bottom"
                    },
                    {
                        element: ".Selfchecking-step4",
                        intro: "基站自检数据展示区域：可查看开始时间、结束时间、异常个数，点击详情后可查看异常详情。",
                        position: "right"
                    }
                ]
            },
            Beadhouse: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Beadhouse-step1",
                        intro: "建筑结构选择区域：通过点击来进行选中某一建筑结构，选中后右侧建筑结构展示区域将会展示该建筑结构下的子集结构，同时可在该区域进行编辑和删除(如果没有任何建筑结构时，可点击图中 ➕进行初次添加养老院)",
                        position: "right"
                    },
                    {
                        element: ".Beadhouse-step2",
                        intro: "建筑结构展示区域：该区域用于查看左侧建筑结构选择区域被选中层级下的建筑结构，可进行添加、删除、编辑等操作（当左侧建筑结构选择区域未选中或者选中床位结构时右侧结构展示区域为空）。",
                        position: "right"
                    }
                ]
            },
            Fence: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Fence-step1",
                        intro: "新增围栏区域：录入或选择文本框中内容，确定围栏位置后，点击添加即可完成围栏新增",
                        position: "right"
                    },
                    {
                        element: ".Fence-step2",
                        intro: "围栏预览区域：该区域用于展示新增围栏时的预览，和右侧围栏组方案管理区域的围栏勾选时的预览。",
                        position: "right"
                    },
                    {
                        element: ".Fence-step3",
                        intro: "围栏组方案管理区域：用于添加删除围栏组，同时可分配给每个围栏组分配电子围栏（围栏组是多个电子围栏的集合，直接作用于系统内人员，而单个电子围栏不可直接与系统内人员进行绑定）。",
                        position: "left"
                    },
                    {
                        element: ".Fence-step4",
                        intro: "围栏方案管理区域：用于查看、删除、编辑单个电子围栏，可根据搜索条件进行展示。",
                        position: "left"
                    }
                ]
            },
            Evaluatiomaintenance: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Evaluatiomaintenance-step1",
                        intro: "护理方案选择区域：通过点击进行选择护理方案，选择完成后右侧护理方案内容选择区域将展示当前选中的护理方案内容，可在此区域进行护理方案的删除和名称修改。",
                        position: "right"
                    },
                    {
                        element: ".Evaluatiomaintenance-step2",
                        intro: "护理方案内容选择区域：该区域用于展示当前选中的护理方案内容可进行护理内容的位置移动，同时用户可通过点击进行选择护理内容，选择完成后右侧护理内容修改区域将会展示选中护理内容的详细信息。",
                        position: "right"
                    },
                    {
                        element: ".Evaluatiomaintenance-step3",
                        intro: "护理内容修改区域：该区域可在左侧护理方案内容选择区域选中的护理内容下新增护理内容，并且可修改护理内容的名称和收费金额，可删除护理内容",
                        position: "left"
                    }
                ]
            },
            HealthConfiguration: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                    element: ".HealthConfiguration-step1",
                    intro: "该处可对于系统的基本信息进行查看和配置,点击表格中【修改】可更改系统配置。",
                    position: "right"
                }]
            },
            Organization: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Organization-step1",
                        intro: "组织结构选择区域：通过点击进行选择组织结构，选择完成后右侧部门人员展示区域将会展示被选中结构下的所有人员（包括子集部门所包含的人员），同时可进行组织结构的的增加、编辑、删除。",
                        position: "right"
                    },
                    {
                        element: ".Organization-step2",
                        intro: "部门人员展示区域：该区域用于管理左侧组织结构选择区域所选中的组织结构下的人员，可进行增加和删除。",
                        position: "right"
                    }
                ]
            },
            Notice: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Notice-step1",
                        intro: "文本框中输入标题。",
                        position: "right"
                    },
                    {
                        element: ".Notice-step2",
                        intro: "请选择文档类型（院内公告、院内新闻）。",
                        position: "right"
                    },
                    {
                        element: ".Notice-step3",
                        intro: "录入文档内容，可用工具栏进行修改。",
                        position: "right"
                    },
                    {
                        element: ".Notice-step4",
                        intro: "点击发送，将会弹出选择发布公告区域提示，勾选完成后点击确定即可完成发送。",
                        position: "top"
                    }
                ]
            },
            Invitation: {
                nextLabel: "下一步",
                skipLabel: "跳 过",
                doneLabel: "结束引导",
                exitOnOverlayClick: false,
                disableInteraction: true,
                steps: [{
                        element: ".Invitation-step1",
                        intro: "点击生成新的邀请码。",
                        position: "right"
                    },
                    {
                        element: ".Invitation-step2",
                        intro: "邀请码展示区域：用于展示所有邀请码，点击表格中的删除按钮即可删除（邀请码用于注册时使用，使用过后自动销毁）。",
                        position: "right"
                    },
                ]
            }
        },
    },
    mutations: {
        // 更能智能健康测评步骤管理状态
        changeStepshow(state, data) {
            state.stepshow = data
            switch (data) {
                case 'step1':
                    state.stepshowNum = '1'
                    break;
                case 'step2':
                    state.stepshowNum = '2'
                    break;
                case 'step3':
                    state.stepshowNum = '3'
                    break;
                case 'step4':
                    state.stepshowNum = '4'
                    break;
                case 'step5':
                    state.stepshowNum = '5'
                    break;
            }
        },
        // 开启功能向导
        startIntro(state) {
            if (router.app._route.path.slice(1) == 'seniorindex' && document.querySelector('.el-message-box__wrapper').style.display == 'block') {
                state.intro.setOptions(state.allOptions.seniorindex_0)
            } else {
                router.app._route.path.slice(1) == 'seniorindex' ? state.intro.setOptions(state.allOptions[(router.app._route.path.slice(1)) + '_' + state.stepshowNum]) : state.intro.setOptions(state.allOptions[router.app._route.path.slice(1)])
            }

            if (router.app._route.path.slice(1) == 'Evaluating' && document.querySelector('.el-message-box__wrapper').style.display == 'none') state.intro.goToStep(1);
            state.intro.start();
        },
        // 关闭功能向导
        closeIntro(state) {
            state.intro.exit();
        }
    },
    actions: {

    }
}