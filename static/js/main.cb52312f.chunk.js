(this["webpackJsonptask-tracker"]=this["webpackJsonptask-tracker"]||[]).push([[0],{118:function(e,t,a){e.exports=a(146)},146:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(12),i=a.n(r),o=a(44),l=a(40),c=a(18),u=a(19),d=a(22),p=a(21),m=a(192),y=a(189),g=a(100),h=a(191),f=a(184),D=a(97),k=a.n(D),v=a(187),E=a(199),C=a(194),Y=a(98),b=a.n(Y),S=a(193),M=a(4),T=a(201),O=a(93),A=a.n(O),w=a(92),x=a.n(w),j=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={showDetails:!1},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.task,n=e.completeTask,r=e.ignoreTask,i=e.launchDetails;return s.a.createElement("div",{className:t.taskContainer,key:a.id},"Completed"!==a.status&&s.a.createElement(T.a,{checked:"Completed"===a.status,className:t.checkbox,onChange:function(){return n(a.id)},color:"primary",size:"small"}),s.a.createElement(f.a,{onClick:function(){return r(a.id)},size:"small"},s.a.createElement(x.a,{className:t.moveButtons})),s.a.createElement(E.a,{className:t.taskStyle,disabled:!0,InputProps:{disableUnderline:!0,style:{paddingLeft:"5px"},classes:{disabled:t.blackColor}},value:a.description,multiline:!0}),s.a.createElement(f.a,{onClick:function(){return i("Edit",a.id)},size:"small"},s.a.createElement(A.a,{className:t.moveButtons})))}}]),a}(n.Component),N=Object(M.a)((function(e){return{taskStyle:{border:"1px solid #ccc",borderRadius:"25px",width:"700px",marginTop:"5px"},checkbox:{width:"5px"},taskContainer:{display:"flex"},blackColor:{color:"black"}}}))(j),I=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.header,a=e.tasks,n=e.currentSort,r=e.completeTask,i=e.ignoreTask,o=e.launchDetails,l=e.getKeyName,c=e.filterOption,u=l(n),d=[];return(d="Active"===c?a.filter((function(e){return e[u]===t&&!0===e.isActive})):"Inactive"===c?a.filter((function(e){return e[u]===t&&!1===e.isActive&&"Completed"!==e.status})):"Completed"===c?a.filter((function(e){return e[u]===t&&"Completed"===e.status})):a.filter((function(e){return e[u]===t}))).sort((function(e,t){return e.priority>t.priority?1:-1})),s.a.createElement(s.a.Fragment,null,0!==d.length&&s.a.createElement("h2",null,t),d.map((function(e,t){return s.a.createElement(N,{task:e,key:t,completeTask:r,ignoreTask:i,launchDetails:o})})))}}]),a}(n.Component),L=a(200),U=a(188),W=a(70),F=a(15),P=a(197),z=a(7),V=a.n(z),B=a(69),R=a.n(B),q=a(147),H=a(186),J=a(148),K=a(190),G={fieldStyle:{width:"700px"},fieldLabel:{alignContent:"center",minWidth:"90px",maxWidth:"90px"},fieldContainer:{display:"flex",alignContent:"center",alignItems:"center",margin:".5rem"},inputStyle:{paddingLeft:"15px",paddingTop:"10px",paddingBottom:"10px"},dateStyle:{height:"40px",padding:0},dateContainer:{display:"flex",alignContent:"center",alignItems:"center",padding:0,margin:0},buttonContainer:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center"},buttonStyle:{alignContent:"center",alignItems:"center",justifyContent:"center",margin:"5px"},headerName:{color:"#aaa",margin:"10px"},headerClose:{margin:"10px",color:"#aaa"},headerContainer:{display:"flex",justifyContent:"space-between",padding:"10px"},dialogContainer:{marginBottom:"70px"}},_=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={id:"Edit"===e.props.type?e.props.taskDetails.id:"",description:"Edit"===e.props.type?e.props.taskDetails.description:"",category:"Edit"===e.props.type?e.props.taskDetails.category:"",status:"Edit"===e.props.type?e.props.taskDetails.status:"",dueDate:"Edit"===e.props.type?e.props.taskDetails.dueDate:V()().format("MM/DD/YYYY"),actual:"Edit"===e.props.type?e.props.taskDetails.actual:0,goal:"Edit"===e.props.type?e.props.taskDetails.goal:0,priority:"Edit"===e.props.type?e.props.taskDetails.priority:"",assigned:"Edit"===e.props.type?e.props.taskDetails.assigned:"",contact:"Edit"===e.props.type?e.props.taskDetails.contact:"",isActive:"Edit"!==e.props.type||e.props.taskDetails.isActive,activeDate:"Edit"===e.props.type?e.props.taskDetails.activeDate:V()().format("MM/DD/YYYY"),workTime:"Edit"===e.props.type?e.props.taskDetails.workTime:[],tags:"Edit"===e.props.type?e.props.taskDetails.tags:[],completedDate:"Edit"===e.props.type?e.props.taskDetails.completedDate:"",completedDates:"Edit"===e.props.type?e.props.taskDetails.completedDates:[],dueWeek:"Edit"===e.props.type?e.props.taskDetails.dueweek:V()().startOf("isoweek").format("MM/DD/YYYY"),dueMonth:"Edit"===e.props.type?e.props.taskDetails.dueMonth:V()().format("MMMM YYYY"),notes:"Edit"===e.props.type?e.props.taskDetails.notes:"",type:"Edit"===e.props.type?e.props.taskDetails.type:"One-time",recurDays:"Edit"===e.props.type?e.props.taskDetails.recurDays:0,isUpdating:!1,startTime:"Edit"===e.props.type?e.props.taskDetails.startTime:V()({hour:5}),points:"Edit"===e.props.type?e.props.taskDetails.points:""},e.onChange=function(t){e.setState(Object(o.a)({},t.target.name,t.target.value))},e.dateChange=function(t){e.setState({dueDate:V()(t).format("MM/DD/YYYY"),dueWeek:V()(t).startOf("week").format("MM/DD/YYYY"),dueMonth:V()(t).format("MMMM YYYY")})},e.activeDateChange=function(t){e.setState({activeDate:V()(t).format("MM/DD/YYYY"),isActive:t=V()().format("YYYY-MM-DD")>=V()(t).format("YYYY-MM-DD")||!(V()(t).format("YYYY-MM-DD")>V()().format("YYYY-MM-DD"))&&e.state.isActive})},e.startTimeChange=function(t){e.setState({startTime:V()(t)})},e.onAutoChange=function(t,a,n){e.setState(Object(o.a)({},n,a))},e.onStatusChange=function(t,a,n){var s=e.state,r=s.type,i=s.dueDate,c=s.activeDate,u=s.recurDays,d=s.isUpdating,p=s.completedDates;!1===d&&("Completed"===a?"Recurring"===r?e.setState({isUpdating:!0,status:"",completedDate:"",dueDate:V()(i).add(u,"days").format("MM/DD/YYYYY"),dueWeek:V()(i).add(u,"days").startOf("week").format("MM/DD/YYYY"),dueMonth:V()(i).add(u,"days").format("MMMM YYYY"),activeDate:V()(c).add(u,"days"),isActive:V()(c).format("YYYY-MM-DD")<V()().format("YYYY-MM-DD"),completedDates:[].concat(Object(l.a)(p),[V()(i).format("MM/DD/YYYY")])},(function(){e.setState({isUpdating:!1},(function(){return e.saveCurrentTask()}))})):"One-time"===r&&e.setState({isUpdating:!0,completedDate:V()().format("MM/DD/YYYY"),completedDates:[V()(i).format("MM/DD/YYYY")],status:"Completed",isActive:!1},(function(){e.setState({isUpdating:!1},(function(){return e.saveCurrentTask()}))})):e.setState(Object(o.a)({},n,a)))},e.onCheck=function(){e.setState({isActive:!e.state.isActive})},e.uuidv4=function(){return Math.random().toString(36).substring(2)+Date.now().toString(36)},e.addTask=function(){e.props.createTask({id:e.uuidv4(),description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,activeDate:e.state.activeDate,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,completedDates:e.state.completedDates,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes,type:e.state.type,recurDays:e.state.recurDays,startTime:e.state.startTime,points:e.state.points}),e.props.toggleDisplay("Tasks")},e.saveCurrentTask=function(){e.props.saveTask(e.state.id,{id:e.state.id,description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,activeDate:e.state.activeDate,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,completedDates:e.state.completedDates,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes,type:e.state.type,recurDays:e.state.recurDays,startTime:e.state.startTime,points:e.state.points}),e.props.toggleDisplay("Tasks")},e.deleteCurrentTask=function(){e.props.deleteTask(e.state.id),e.props.toggleDisplay("Tasks")},e.handleDeleteDate=function(t){var a=e.state.completedDates.filter((function(e){return e!==t}));e.setState({completedDates:a})},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){window.scrollTo(0,0)}},{key:"render",value:function(){var e=this,t=this.props,a=t.type,n=t.categories,r=t.assignedUsers,i=t.contactUsers,o=t.toggleDisplay;return s.a.createElement("div",{style:G.dialogContainer},s.a.createElement("div",{style:G.headerContainer},s.a.createElement("div",{style:G.headerName},s.a.createElement(v.a,{variant:"h5"},"Task Management")),s.a.createElement("div",{style:G.headerClose},s.a.createElement(f.a,{onClick:function(){return o("Tasks")},size:"small"},s.a.createElement(R.a,null)))),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Description"),s.a.createElement(E.a,{style:G.fieldStyle,name:"description",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.description,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Category"),s.a.createElement(L.a,{size:"small",style:G.fieldStyle,options:n,defaultValue:this.state.category,getOptionLabel:function(e){return"string"===typeof e?e:e.category},renderInput:function(e){return s.a.createElement(E.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.category,onInputChange:function(t,a){return e.onAutoChange(t,a,"category")}})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Type"),s.a.createElement(L.a,{options:["One-time","Recurring"],defaultValue:this.state.type,getOptionLabel:function(e){return"string"===typeof e?e:e.type},style:G.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(E.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.type,onInputChange:function(t,a){return e.onAutoChange(t,a,"type")}})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Recurring Days"),s.a.createElement(E.a,{style:G.fieldStyle,name:"recurDays",type:"number",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.recurDays,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Status"),s.a.createElement(L.a,{options:["Not Started","In Progress","On Hold","Completed"],defaultValue:this.state.status,getOptionLabel:function(e){return"string"===typeof e?e:e.status},style:G.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(E.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.status,onInputChange:function(t,a){return e.onStatusChange(t,a,"status")}})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Priority"),s.a.createElement(E.a,{style:G.fieldStyle,name:"priority",type:"number",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.priority,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Due Date"),s.a.createElement("div",{style:G.dateContainer},s.a.createElement(F.a,{utils:W.a},s.a.createElement(P.a,{disableToolbar:!0,autoOk:!0,variant:"inline",format:"MM/dd/yyyy",value:this.state.dueDate,onChange:function(t){return e.dateChange(t)},KeyboardButtonProps:{"aria-label":"change date"},inputVariant:"outlined",InputProps:{style:G.dateStyle}})))),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Active Date"),s.a.createElement("div",{style:G.dateContainer},s.a.createElement(F.a,{utils:W.a},s.a.createElement(P.a,{disableToolbar:!0,autoOk:!0,variant:"inline",format:"MM/dd/yyyy",value:this.state.activeDate,onChange:function(t){return e.activeDateChange(t)},KeyboardButtonProps:{"aria-label":"change date"},inputVariant:"outlined",InputProps:{style:G.dateStyle}})))),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Actual"),s.a.createElement(E.a,{style:G.fieldStyle,name:"actual",type:"number",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.actual,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Goal"),s.a.createElement(E.a,{style:G.fieldStyle,name:"goal",type:"number",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.goal,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Points"),s.a.createElement(E.a,{style:G.fieldStyle,name:"points",type:"number",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.points,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Assigned"),s.a.createElement(L.a,{options:r,defaultValue:this.state.assigned,getOptionLabel:function(e){return"string"===typeof e?e:e.assigned},style:G.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(E.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.assigned,onInputChange:function(t,a){return e.onAutoChange(t,a,"assigned")}})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Contact"),s.a.createElement(L.a,{options:i,defaultValue:this.state.contact,getOptionLabel:function(e){return"string"===typeof e?e:e.contact},style:G.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(E.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.contact,onInputChange:function(t,a){return e.onAutoChange(t,a,"contact")}})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Active"),s.a.createElement(T.a,{checked:this.state.isActive,name:"isActive",onChange:this.onCheck,color:"primary",size:"small"})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Notes"),s.a.createElement(E.a,{style:G.fieldStyle,name:"notes",variant:"outlined",InputProps:{style:G.inputStyle},onChange:this.onChange,value:this.state.notes,multiline:!0})),s.a.createElement("div",{style:G.fieldContainer},s.a.createElement(v.a,{style:G.fieldLabel},"Completed Dates"),s.a.createElement(q.a,{variant:"outlined",style:{maxHeight:100,width:200,overflow:"auto"}},s.a.createElement(H.a,null,this.state.completedDates.map((function(t){return s.a.createElement(J.a,{button:!0},t,s.a.createElement(K.a,null,s.a.createElement(f.a,{edge:"end","aria-label":"delete",onClick:function(){return e.handleDeleteDate(t)}},s.a.createElement(R.a,null))))}))))),s.a.createElement("div",{style:G.buttonContainer},"Add"===a&&s.a.createElement("div",{style:G.buttonStyle},s.a.createElement(U.a,{style:G.buttonStyle,variant:"contained",color:"primary",onClick:this.addTask},"Add")),"Edit"===a&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{style:G.buttonStyle},s.a.createElement(U.a,{style:G.buttonStyle,variant:"contained",color:"primary",onClick:this.saveCurrentTask},"Save")),s.a.createElement("div",{style:G.buttonStyle},s.a.createElement(U.a,{style:G.buttonStyle,variant:"contained",color:"primary",onClick:this.deleteCurrentTask},"Delete")))))}}]),a}(n.Component),Q=[{id:1,description:"Fix the door",category:"House",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:2,description:"Check Transactions",category:"Finance",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:3,description:"Review Task list",category:"Work",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:4,description:"Get a lower interest rate",category:"Finance",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:5,description:"Fix the front steps",category:"House",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:6,description:"Go see a movie",category:"Fun",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"One-time",recurDays:"",completedDates:[]},{id:7,description:"Drink 8 cups of water",category:"Daily",status:"Started",dueDate:"7/16/2021",actual:0,goal:0,priority:"1",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"7/16/2021",notes:"",dueWeek:"8/10/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"Recurring",recurDays:"1",completedDates:["05/01/2020","06/01/2021","06/02/2021","06/03/2021"]},{id:8,description:"Exercise",category:"Daily",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"2",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"Recurring",recurDays:"1",completedDates:[]},{id:9,description:"Plan tommorows dinner",category:"Daily",status:"Started",dueDate:"8/17/2020",actual:0,goal:0,priority:"3",assigned:"Adam",contact:"Dan",isActive:!0,activeDate:"8/1/2020",notes:"",dueWeek:"8/17/2020",dueMonth:"August 2020",completedDate:"",workTime:[],tags:[],type:"Recurring",recurDays:"1",completedDates:[]}],X=a(95),Z=a.n(X),$=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={sortOptions:["Category","Status","Priority","Assigned","Contact","Due Date","Due Week","Due Month"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleSortChange(t),e.handleClose()},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(Z.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.sortOptions.map((function(t,a){return s.a.createElement(h.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),ee=a(96),te=a.n(ee),ae=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={filterOptions:["Active","Inactive","Completed","All"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleFilterChange(t),e.handleClose()},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(te.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.filterOptions.map((function(t,a){return s.a.createElement(h.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),ne=a(51),se=a.n(ne),re=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={tasks:[],headers:[],lastSaved:null,isLoading:!1,anchorEl:null,setAnchorEl:!1,currentSort:"Category",trackerName:"Test Title",selectedTask:null,detailType:null,categories:[],assignedUsers:[],contactUsers:[],taskDetails:{},filterOption:"Active",display:"Tasks",debugMode:!1},e.componentDidMount=function(){!0===e.state.debugMode?e.setState({tasks:Q}):e.getServerData()},e.componentDidUpdate=function(t,a){e.state.tasks!==a.tasks&&(e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers"))},e.fixMissingFields=function(){var t=e.state.tasks.map((function(e){return void 0===e.points&&(e.points=0),e}));e.setState({tasks:t},(function(){return e.saveData()}))},e.getServerData=function(){var t=window.location.search,a=new URLSearchParams(t).get("query");void 0!==a&&null!==a&&e.setState({isLoading:!0},(function(){se.a.get("https://guarded-mesa-76047.herokuapp.com/api/lists/".concat(a)).then((function(t){return e.setState({trackerName:t.data.listName,tasks:t.data.list,lastSaved:t.data.lastSaved,isLoading:!1})})).then((function(){e.activateTasks(),e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers"),e.fixMissingFields()}))}))},e.saveData=function(){e.handleClose();var t=window.location.search,a=new URLSearchParams(t).get("query"),n=new Date;!1===e.state.debugMode&&(null===a?se.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:e.state.tasks,listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()})):se.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/update/".concat(a),{list:e.state.tasks,listName:e.state.trackerName,lastSaved:n}).then((function(){e.setState({lastSaved:n})})))},e.downloadFile=function(e,t,a){var n=document.createElement("a"),s=new Blob([e],{type:a});n.href=URL.createObjectURL(s),n.download=t,n.click()},e.exportJSON=function(){e.handleClose(),e.downloadFile(JSON.stringify(e.state.tasks),"data.json","text/plain")},e.getFile=function(t){e.handleClose();var a=t.target.files,n=new FileReader;n.readAsText(a[0]),n.onload=function(t){e.setState({tasks:JSON.parse(t.target.result)})}},e.createNew=function(){e.handleClose(),se.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:[],listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()}))},e.createTask=function(t){e.setState({tasks:[].concat(Object(l.a)(e.state.tasks),[t])},(function(){return e.saveData()}))},e.launchDetails=function(t,a){var n=e.state.tasks.filter((function(e){return e.id===a}));e.setState({detailType:t,taskDetails:n[0]},(function(){return e.toggleDisplay("Details")}))},e.launchNewTask=function(){e.setState({detailType:"Add"},(function(){return e.toggleDisplay("Details")}))},e.completeTask=function(t){var a=e.state.tasks.map((function(e){return e.id===t&&("Recurring"===e.type?(e.dueDate=V()(e.dueDate).add(e.recurDays,"days").format("MM/DD/YYYY"),e.dueWeek=V()(e.dueDate).add(e.recurDays,"days").startOf("week").format("MM/DD/YYYY"),e.dueMonth=V()(e.dueDate).add(e.recurDays,"days").format("MMMM YYYY"),e.activeDate=V()(e.activeDate).add(e.recurDays,"days"),e.isActive=V()(e.activeDate).format("YYYY-MM-DD")<V()().format("YYYY-MM-DD"),e.completedDates=[].concat(Object(l.a)(e.completedDates),[V()(e.dueDate).format("MM/DD/YYYY")])):"One-time"===e.type&&(e.completedDate=V()().format("MM/DD/YYYY"),e.completedDates=[].concat(Object(l.a)(e.completedDates),[V()(e.dueDate).format("MM/DD/YYYY")]),e.status="Completed",e.isActive=!1)),e}));e.setState({tasks:a},(function(){return e.saveData()}))},e.ignoreTask=function(t){var a=e.state.tasks.map((function(e){return e.id===t&&("Recurring"===e.type?(e.dueDate=V()(e.dueDate).add(e.recurDays,"days").format("MM/DD/YYYY"),e.dueWeek=V()(e.dueDate).add(e.recurDays,"days").startOf("week").format("MM/DD/YYYY"),e.dueMonth=V()(e.dueDate).add(e.recurDays,"days").format("MMMM YYYY"),e.activeDate=V()(e.activeDate).add(e.recurDays,"days"),e.isActive=V()(e.activeDate).format("YYYY-MM-DD")<V()().format("YYYY-MM-DD")):"One-time"===e.type&&(e.status="On Hold",e.isActive=!1)),e}));e.setState({tasks:a},(function(){return e.saveData()}))},e.activateTasks=function(){var t=e.state.tasks.map((function(e){return V()().format("YYYY-MM-DD")>=V()(e.activeDate).format("YYYY-MM-DD")&&""!==e.activeDate&&"Completed"!==e.status&&(e.isActive=!0),e}));e.setState({tasks:t},(function(){return e.saveData()}))},e.saveTask=function(t,a){var n=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:[].concat(Object(l.a)(n),[a]),completedTasks:"completed"===a.status?[].concat(Object(l.a)(e.state.completedTasks),[a]):e.state.completedTasks},(function(){return e.saveData()}))},e.deleteTask=function(t){var a=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:a},(function(){return e.saveData()}))},e.getSortHeaders=function(t,a){var n=e.getKeyName(a),s=[];t.filter((function(e){return s.findIndex((function(t){return t===e[n]}))<=-1&&s.push(e[n]),null})),s.sort(),e.setState({headers:s,currentSort:a})},e.getKeyName=function(e){var t="";switch(e){case"Category":t="category";break;case"Status":t="status";break;case"Priority":t="priority";break;case"Assigned":t="assigned";break;case"Contact":t="contact";break;case"Due Date":t="dueDate";break;case"Due Week":t="dueWeek";break;case"Due Month":t="dueMonth";break;default:t=""}return t},e.getUniqueValues=function(t,a,n){var s=[];t.filter((function(e){return s.findIndex((function(t){return t===e[a]}))<=-1&&s.push(e[a]),null})),s.sort((function(e,t){return e.priority>t.priority?1:-1})),e.setState(Object(o.a)({},n,s))},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleTitleChange=function(t){e.setState({trackerName:t.target.value})},e.handleSwitchChange=function(t){e.setState(Object(o.a)({},t.target.name,t.target.checked))},e.handleSortChange=function(t){e.getSortHeaders(e.state.tasks,t)},e.handleFilterChange=function(t){e.setState({filterOption:t})},e.toggleDisplay=function(t){e.setState({display:t})},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.props.classes;return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{position:"fixed",color:"primary"},s.a.createElement(y.a,null,s.a.createElement(f.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(k.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},s.a.createElement("input",{type:"file",style:{display:"none"},id:"raised-button-file",name:"file",onChange:this.getFile,accept:".json"}),s.a.createElement("label",{htmlFor:"raised-button-file"},s.a.createElement(h.a,{onClick:function(){return e.getFile()}},"Import JSON")),s.a.createElement(h.a,{onClick:function(){return e.exportJSON()}},"Export Data"),s.a.createElement(h.a,{onClick:function(){return e.createNew()}},"Create New")),s.a.createElement(v.a,{variant:"h6"},"Task Tracker"),s.a.createElement("div",{className:t.grow}),s.a.createElement("div",{className:t.addButton},s.a.createElement($,{handleSortChange:this.handleSortChange})),s.a.createElement("div",{className:t.addButton},s.a.createElement(ae,{handleFilterChange:this.handleFilterChange})))),s.a.createElement(y.a,null),"Tasks"===this.state.display&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{style:{fontStyle:"italic",color:"#bbb"}},null===this.state.lastSaved?"Not Saved":"Last Saved: "+this.state.lastSaved),s.a.createElement(E.a,{InputProps:{disableUnderline:!0,style:{display:"block",fontSize:"2em",marginTop:"0.3em",marginBottom:"0.3em"}},value:this.state.trackerName,onChange:this.handleTitleChange}),s.a.createElement(S.a,null),s.a.createElement("div",{className:t.taskContainer},this.state.headers.map((function(t,a){return s.a.createElement(I,{tasks:e.state.tasks,header:t,currentSort:e.state.currentSort,key:a,completeTask:e.completeTask,launchDetails:e.launchDetails,ignoreTask:e.ignoreTask,getKeyName:e.getKeyName,filterOption:e.state.filterOption})})))),"Details"===this.state.display&&s.a.createElement(_,{toggleDisplay:this.toggleDisplay,type:this.state.detailType,categories:this.state.categories,assignedUsers:this.state.assignedUsers,contactUsers:this.state.contactUsers,createTask:this.createTask,taskDetails:this.state.taskDetails,saveTask:this.saveTask,deleteTask:this.deleteTask}),"Details"!==this.state.display&&s.a.createElement(m.a,{position:"fixed",color:"primary",className:t.appBar},s.a.createElement(y.a,null,s.a.createElement(C.a,{color:"secondary","aria-label":"add",className:t.fabButton,onClick:function(){return e.launchNewTask()}},s.a.createElement(b.a,null)))))}}]),a}(n.Component),ie=Object(M.a)((function(e){return{taskContainer:{maxWidth:"700px",marginBottom:"70px"},formControl:{minWidth:120,margin:"5px"},addButton:{margin:"5px",alignContent:"center",fontSize:"17px",color:"white"},actionBar:{display:"flex"},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}}))(re),oe=a(196),le=a(99),ce=a(195),ue=a(66),de=Object(le.a)({palette:{primary:{main:ce.a[500]},secondary:{main:ue.a[500]}},typography:{},overrides:{MuiAutocomplete:{}}});var pe=function(){return s.a.createElement(oe.a,{theme:de},s.a.createElement(ie,null))};i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(pe,null)),document.getElementById("root"))}},[[118,1,2]]]);
//# sourceMappingURL=main.cb52312f.chunk.js.map