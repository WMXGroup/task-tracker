(this["webpackJsonptask-tracker"]=this["webpackJsonptask-tracker"]||[]).push([[0],{115:function(e,t,a){e.exports=a(143)},143:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(11),i=a.n(r),o=a(44),l=a(67),c=a(17),d=a(18),u=a(21),p=a(20),h=a(186),m=a(185),g=a(100),f=a(198),k=a(181),y=a(96),v=a.n(y),E=a(183),C=a(192),b=a(188),S=a(97),D=a.n(S),M=a(187),A=a(4),O=a(194),T=a(91),j=a.n(T),x=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={showDetails:!1},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.task,n=e.completeTask,r=(e.deleteTask,e.launchModal);return s.a.createElement("div",{className:t.taskContainer,key:a.id},s.a.createElement(O.a,{checked:a.completed,className:t.checkbox,onChange:function(){return n(a.id)},color:"primary",size:"small"}),s.a.createElement(C.a,{className:t.taskStyle,disabled:!0,InputProps:{disableUnderline:!0,style:{paddingLeft:"5px"},classes:{disabled:t.blackColor}},value:a.description,multiline:!0}),s.a.createElement(k.a,{onClick:function(){return r("Edit",a.id)},size:"small"},s.a.createElement(j.a,{className:t.moveButtons})))}}]),a}(n.Component),w=Object(A.a)((function(e){return{taskStyle:{border:"1px solid #ccc",borderRadius:"25px",width:"700px",marginTop:"5px"},checkbox:{width:"5px"},taskContainer:{display:"flex"},blackColor:{color:"black"}}}))(x),N=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e,t=this.props,a=t.header,n=t.tasks,r=t.currentSort,i=t.completeTask,o=t.deleteTask,l=t.edit,c=t.launchModal,d=t.getKeyName,u=t.filterOption,p=d(r);return e="Active"===u?n.filter((function(e){return e[p]===a&&!0===e.isActive})):"Inactive"===u?n.filter((function(e){return e[p]===a&&!1===e.isActive})):n.filter((function(e){return e[p]===a})),s.a.createElement("div",null,s.a.createElement("h2",null,a),e.map((function(e,t){return s.a.createElement(w,{task:e,key:t,completeTask:i,deleteTask:o,edit:l,launchModal:c})})))}}]),a}(n.Component),I=a(196),L=a(193),U=a(184),W=a(98),Y=a(14),F=a(190),z=a(41),V=a.n(z),B=a(92),P=a.n(B),q={fieldStyle:{width:"700px"},fieldLabel:{alignContent:"center",minWidth:"90px"},fieldContainer:{display:"flex",alignContent:"center",alignItems:"center",margin:".5rem"},inputStyle:{paddingLeft:"15px",paddingTop:"10px",paddingBottom:"10px"},dateStyle:{height:"40px",padding:0},dateContainer:{display:"flex",alignContent:"center",alignItems:"center",padding:0,margin:0},buttonContainer:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center"},buttonStyle:{alignContent:"center",alignItems:"center",justifyContent:"center",margin:"5px"},headerName:{color:"#aaa",margin:"10px"},headerClose:{margin:"10px",color:"#aaa"},headerContainer:{display:"flex",justifyContent:"space-between",padding:"10px"},dialogContainer:{display:"flex"}},J=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={id:"Edit"===e.props.type?e.props.taskDetails.id:"",description:"Edit"===e.props.type?e.props.taskDetails.description:"",category:"Edit"===e.props.type?e.props.taskDetails.category:"",status:"Edit"===e.props.type?e.props.taskDetails.status:"",dueDate:"Edit"===e.props.type?e.props.taskDetails.dueDate:V()().format("MM/DD/YYYY"),actual:"Edit"===e.props.type?e.props.taskDetails.actual:0,goal:"Edit"===e.props.type?e.props.taskDetails.goal:0,priority:"Edit"===e.props.type?e.props.taskDetails.priority:"",assigned:"Edit"===e.props.type?e.props.taskDetails.assigned:"",contact:"Edit"===e.props.type?e.props.taskDetails.contact:"",isActive:"Edit"!==e.props.type||e.props.taskDetails.isActive,workTime:"Edit"===e.props.type?e.props.taskDetails.workTime:[],tags:"Edit"===e.props.type?e.props.taskDetails.tags:[],completedDate:"Edit"===e.props.type?e.props.taskDetails.completedDate:"",dueWeek:"Edit"===e.props.type?e.props.taskDetails.dueweek:V()().startOf("isoweek").format("MM/DD/YYYY"),dueMonth:"Edit"===e.props.type?e.props.taskDetails.dueMonth:V()().format("MMMM YYYY"),notes:"Edit"===e.props.type?e.props.taskDetails.notes:""},e.onChange=function(t){e.setState(Object(o.a)({},t.target.name,t.target.value))},e.dateChange=function(t){e.setState({dueDate:V()(t).format("MM/DD/YYYY"),dueWeek:V()(t).startOf("week").format("MM/DD/YYYY"),dueMonth:V()(t).format("MMMM YYYY")})},e.onAutoChange=function(t,a,n){e.setState(Object(o.a)({},n,a))},e.onCheck=function(){e.setState({isActive:!e.state.isActive})},e.uuidv4=function(){return Math.random().toString(36).substring(2)+Date.now().toString(36)},e.addTask=function(){e.props.createTask({id:e.uuidv4(),description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes}),e.props.toggleModal()},e.saveCurrentTask=function(){e.props.saveTask(e.state.id,{id:e.state.id,description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes}),e.props.toggleModal()},e.deleteCurrentTask=function(){e.props.deleteTask(e.state.id),e.props.toggleModal()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.toggleModal,n=t.openModal,r=t.type,i=t.categories,o=t.assignedUsers,l=t.contactUsers;return s.a.createElement(I.a,{onClose:function(){return a()},open:n,maxWidth:"md",fullWidth:!0,disableBackdropClick:!0,disableEscapeKeyDown:!0},s.a.createElement("div",{className:q.dialogContainer},s.a.createElement("div",{style:q.headerContainer},s.a.createElement("div",{style:q.headerName},s.a.createElement(E.a,{variant:"h5"},"Task Management")),s.a.createElement("div",{style:q.headerClose},s.a.createElement(k.a,{onClick:function(){return a()},size:"small"},s.a.createElement(P.a,null)))),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Description"),s.a.createElement(C.a,{style:q.fieldStyle,name:"description",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.description,multiline:!0})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Category"),s.a.createElement(L.a,{size:"small",style:q.fieldStyle,options:i,defaultValue:this.state.category,getOptionLabel:function(e){return"string"===typeof e?e:e.category},renderInput:function(e){return s.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.category,onInputChange:function(t,a){return e.onAutoChange(t,a,"category")}})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Status"),s.a.createElement(L.a,{options:["Not Started","In Progress","On Hold","Complete"],defaultValue:this.state.status,getOptionLabel:function(e){return"string"===typeof e?e:e.status},style:q.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.status,onInputChange:function(t,a){return e.onAutoChange(t,a,"status")}})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Priority"),s.a.createElement(L.a,{options:["1","2","3","4","5"],defaultValue:this.state.priority,getOptionLabel:function(e){return"string"===typeof e?e:e.priority},style:q.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.priority,onInputChange:function(t,a){return e.onAutoChange(t,a,"priority")}})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Due Date"),s.a.createElement("div",{style:q.dateContainer},s.a.createElement(Y.a,{utils:W.a},s.a.createElement(F.a,{disableToolbar:!0,autoOk:!0,variant:"inline",format:"MM/dd/yyyy",value:this.state.dueDate,onChange:function(t){return e.dateChange(t)},KeyboardButtonProps:{"aria-label":"change date"},inputVariant:"outlined",InputProps:{style:q.dateStyle}})))),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Actual"),s.a.createElement(C.a,{style:q.fieldStyle,name:"actual",type:"number",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.actual,multiline:!0})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Goal"),s.a.createElement(C.a,{style:q.fieldStyle,name:"goal",type:"number",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.goal,multiline:!0})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Assigned"),s.a.createElement(L.a,{options:o,defaultValue:this.state.assigned,getOptionLabel:function(e){return"string"===typeof e?e:e.assigned},style:q.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.assigned,onInputChange:function(t,a){return e.onAutoChange(t,a,"assigned")}})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Contact"),s.a.createElement(L.a,{options:l,defaultValue:this.state.contact,getOptionLabel:function(e){return"string"===typeof e?e:e.contact},style:q.fieldStyle,size:"small",renderInput:function(e){return s.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.contact,onInputChange:function(t,a){return e.onAutoChange(t,a,"contact")}})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Active"),s.a.createElement(O.a,{checked:this.state.isActive,name:"isActive",onChange:this.onCheck,color:"primary",size:"small"})),s.a.createElement("div",{style:q.fieldContainer},s.a.createElement(E.a,{style:q.fieldLabel},"Notes"),s.a.createElement(C.a,{style:q.fieldStyle,name:"notes",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.notes,multiline:!0})),s.a.createElement("div",{style:q.buttonContainer},"Add"===r&&s.a.createElement("div",{style:q.buttonStyle},s.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.addTask},"Add")),"Edit"===r&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{style:q.buttonStyle},s.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.saveCurrentTask},"Save")),s.a.createElement("div",{style:q.buttonStyle},s.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.deleteCurrentTask},"Delete"))))))}}]),a}(n.Component),H=[{id:1,description:"Test 1",category:"House",status:"Started",tags:[],dueDate:"8/1/2020",completedDate:"",actual:10,goal:200,completed:!1,priority:"1",dueWeek:1,dueMonth:1,assigned:"Adam",contact:"Dan",notes:"this is a test note",isActive:!0},{id:2,description:"Test 2",category:"Finances",status:"Not Started",tags:[],startDate:"",duedate:"8/1/2020",completedDate:"",actual:0,goal:0,completed:!0,priority:"1",dueWeek:1,dueMonth:1,assigned:"John",contact:"Jeff",isActive:!0,notes:"dsf jksdfjk sdjfkjs djf skjdf ksdjkf jsdf ksdjhf kjhsdkfh sdhkj skdjfh sd jkhsdhjfkh skjdfh kjsdhfksj hdf kjsdhf kjshdfshdkf hsdkjfh sjkdfh jksdf cxvb xcvb cxvb xcvb xcvb xcv bxcvb xcv bxcvb xcvb xcvb xcvb cxvb xcvb cxvb xcvbxcbx cg xcfb xcfbf "},{id:3,description:"Test 3",category:"Fitness",status:"Not Started",tags:[],duedate:"8/16/2020",completedDate:"",actual:0,goal:0,completed:!1,priority:1,dueWeek:2,dueMonth:2,assigned:"Adam",contact:"Dan",isActive:!0},{id:4,description:"Test 4",category:"Finances",status:"In Progress",tags:[],dueDate:"8/17/2020",completedDate:"",actual:0,goal:0,completed:!1,priority:1,dueWeek:3,dueMonth:3,assigned:"Adam",contact:"Dan",isActive:!0},{id:5,description:"Test 5",category:"House",status:"Complete",tags:[],dueDate:"8/19/2020",completedDate:"",actual:0,goal:0,completed:!1,priority:1,dueWeek:3,dueMonth:4,assigned:"Adam",contact:"Dan",isActive:!0},{id:6,description:"Test 6",category:"House",status:"In Progress",tags:[],dueDate:"8/19/2020",completedDate:"",actual:0,goal:0,completed:!1,priority:1,dueWeek:4,dueMonth:5,assigned:"Adam",contact:"Dan",isActive:!0},{id:7,description:"Test 7",category:"Fitness",status:"Complete",tags:[],dueDate:"8/20/2020",completedDate:"",actual:0,goal:0,completed:!1,priority:1,dueWeek:3,dueMonth:2,assigned:"Adam",isActive:!0,contact:"Dan"},{id:8,description:"First Task",category:"",status:"",dueDate:"8/17/2020",actual:0,goal:0,priority:"",assigned:"",contact:"",isActive:!1,workTime:[],tags:[],completedDate:"",dueWeek:"8/17/2020",dueMonth:"August 2020",notes:""},{id:9,description:"Firssdfsdft Task",category:"",status:"",dueDate:"8/17/2020",actual:0,goal:0,priority:"",assigned:"",contact:"",isActive:!1,workTime:[],tags:[],completedDate:"",dueWeek:"8/17/2020",dueMonth:"August 2020",notes:""},{id:10,description:"First Taskdddd",category:"",status:"",dueDate:"8/17/2020",actual:0,goal:0,priority:"",assigned:"",contact:"",isActive:!1,workTime:[],tags:[],completedDate:"",dueWeek:"8/17/2020",dueMonth:"August 2020",notes:""}],K=a(94),R=a.n(K),G=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={sortOptions:["Category","Status","Priority","Assigned","Contact","Due Date","Due Week","Due Month"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleSortChange(t),e.handleClose()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(R.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.sortOptions.map((function(t,a){return s.a.createElement(f.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),_=a(95),Q=a.n(_),X=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={filterOptions:["Active","Inactive","Both"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleFilterChange(t),e.handleClose()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(Q.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.filterOptions.map((function(t,a){return s.a.createElement(f.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),Z=a(50),$=a.n(Z),ee=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={tasks:[],headers:[],lastSaved:null,isLoading:!1,anchorEl:null,setAnchorEl:!1,currentSort:"Category",trackerName:"Test Title",selectedTask:null,openModal:!1,modalType:null,categories:[],assignedUsers:[],contactUsers:[],taskDetails:{},filterOption:"Active"},e.componentDidMount=function(){e.setState({tasks:H})},e.componentDidUpdate=function(t,a){e.state.tasks!==a.tasks&&(e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers"))},e.getServerData=function(){var t=window.location.search,a=new URLSearchParams(t).get("query");void 0!==a&&null!==a&&e.setState({isLoading:!0},(function(){$.a.get("https://guarded-mesa-76047.herokuapp.com/api/lists/".concat(a)).then((function(t){return e.setState({trackerName:t.data.listName,tasks:t.data.list,lastSaved:t.data.lastSaved,isLoading:!1})})).then((function(){e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers")}))}))},e.saveData=function(){e.handleClose();var t=window.location.search,a=new URLSearchParams(t).get("query"),n=new Date;null===a?$.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:e.state.tasks,listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()})):$.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/update/".concat(a),{list:e.state.tasks,listName:e.state.trackerName,lastSaved:n}).then((function(){e.setState({lastSaved:n}),alert("Data saved successfully!")}))},e.downloadFile=function(e,t,a){var n=document.createElement("a"),s=new Blob([e],{type:a});n.href=URL.createObjectURL(s),n.download=t,n.click()},e.exportJSON=function(){e.handleClose(),e.downloadFile(JSON.stringify(e.state.tasks),"data.json","text/plain")},e.getFile=function(t){e.handleClose();var a=t.target.files,n=new FileReader;n.readAsText(a[0]),n.onload=function(t){e.setState({tasks:JSON.parse(t.target.result)})}},e.createNew=function(){e.handleClose(),$.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:[],listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()}))},e.createTask=function(t){e.setState({tasks:[].concat(Object(l.a)(e.state.tasks),[t])})},e.launchModal=function(t,a){var n=e.state.tasks.filter((function(e){return e.id===a}));e.setState({modalType:t,taskDetails:n[0]},(function(){return e.toggleModal()}))},e.completeTask=function(t){var a=e.state.tasks.map((function(e){return e.id===t&&(e.completed=!e.completed),e}));e.setState({tasks:a})},e.saveTask=function(t,a){var n=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:[].concat(Object(l.a)(n),[a])})},e.deleteTask=function(t){var a=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:a})},e.getSortHeaders=function(t,a){var n=e.getKeyName(a),s=[];t.filter((function(e){return s.findIndex((function(t){return t===e[n]}))<=-1&&s.push(e[n]),null})),s.sort(),e.setState({headers:s,currentSort:a})},e.getKeyName=function(e){var t="";switch(e){case"Category":t="category";break;case"Status":t="status";break;case"Priority":t="priority";break;case"Assigned":t="assigned";break;case"Contact":t="contact";break;case"Due Date":t="dueDate";break;case"Due Week":t="dueWeek";break;case"Due Month":t="dueMonth";break;default:t=""}return t},e.getUniqueValues=function(t,a,n){var s=[];t.filter((function(e){return s.findIndex((function(t){return t===e[a]}))<=-1&&s.push(e[a]),null})),e.setState(Object(o.a)({},n,s))},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleTitleChange=function(t){e.setState({trackerName:t.target.value})},e.handleSwitchChange=function(t){e.setState(Object(o.a)({},t.target.name,t.target.checked))},e.handleSortChange=function(t){e.getSortHeaders(e.state.tasks,t)},e.handleFilterChange=function(t){e.setState({filterOption:t})},e.toggleModal=function(){e.setState({openModal:!e.state.openModal})},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.props.classes;return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{position:"fixed",color:"primary"},s.a.createElement(m.a,null,s.a.createElement(k.a,{edge:"start",color:"inherit",onClick:this.handleMenu},s.a.createElement(v.a,null)),s.a.createElement(g.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},s.a.createElement("input",{type:"file",style:{display:"none"},id:"raised-button-file",name:"file",onChange:this.getFile,accept:".json"}),s.a.createElement("label",{htmlFor:"raised-button-file"},s.a.createElement(f.a,{onClick:function(){return e.getFile()}},"Import JSON")),s.a.createElement(f.a,{onClick:function(){return e.exportJSON()}},"Export Data"),s.a.createElement(f.a,{onClick:function(){return e.saveData()}},"Save Data"),s.a.createElement(f.a,{onClick:function(){return e.createNew()}},"Create New")),s.a.createElement(E.a,{variant:"h6"},"Task Tracker"),s.a.createElement("div",{className:t.grow}),s.a.createElement("div",{className:t.addButton},s.a.createElement(G,{handleSortChange:this.handleSortChange})),s.a.createElement("div",{className:t.addButton},s.a.createElement(X,{handleFilterChange:this.handleFilterChange})))),s.a.createElement(m.a,null),s.a.createElement("div",{style:{fontStyle:"italic",color:"#bbb"}},null===this.state.lastSaved?"Not Saved":"Last Saved: "+this.state.lastSaved),s.a.createElement(C.a,{InputProps:{disableUnderline:!0,style:{display:"block",fontSize:"2em",marginTop:"0.3em",marginBottom:"0.3em"}},value:this.state.trackerName,onChange:this.handleTitleChange}),s.a.createElement(M.a,null),s.a.createElement("div",{className:t.taskContainer},this.state.headers.map((function(t,a){return s.a.createElement(N,{tasks:e.state.tasks,header:t,currentSort:e.state.currentSort,key:a,completeTask:e.completeTask,deleteTask:e.deleteTask,launchModal:e.launchModal,getKeyName:e.getKeyName,filterOption:e.state.filterOption})}))),!0===this.state.openModal&&s.a.createElement(J,{toggleModal:this.toggleModal,openModal:this.state.openModal,type:this.state.modalType,categories:this.state.categories,assignedUsers:this.state.assignedUsers,contactUsers:this.state.contactUsers,createTask:this.createTask,taskDetails:this.state.taskDetails,saveTask:this.saveTask,deleteTask:this.deleteTask}),s.a.createElement(h.a,{position:"fixed",color:"primary",className:t.appBar},s.a.createElement(m.a,null,s.a.createElement(b.a,{color:"secondary","aria-label":"add",className:t.fabButton,onClick:function(){return e.launchModal("Add")}},s.a.createElement(D.a,null)))))}}]),a}(n.Component),te=Object(A.a)((function(e){return{taskContainer:{maxWidth:"700px",marginBottom:"70px"},formControl:{minWidth:120,margin:"5px"},addButton:{margin:"5px",alignContent:"center",fontSize:"17px",color:"white"},actionBar:{display:"flex"},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}}))(ee),ae=a(189),ne=a(99),se=a(64),re=Object(ne.a)({palette:{primary:se.a},typography:{},overrides:{}});var ie=function(){return s.a.createElement(ae.a,{theme:re},s.a.createElement(te,null))};i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(ie,null)),document.getElementById("root"))}},[[115,1,2]]]);
//# sourceMappingURL=main.569be1a7.chunk.js.map