(this["webpackJsonptask-tracker"]=this["webpackJsonptask-tracker"]||[]).push([[0],{115:function(e,t,a){e.exports=a(143)},143:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(12),i=a.n(s),l=a(42),o=a(68),c=a(18),u=a(19),d=a(22),p=a(21),m=a(186),h=a(185),f=a(100),y=a(198),g=a(181),k=a(97),v=a.n(k),E=a(183),C=a(192),D=a(188),b=a(98),S=a.n(b),M=a(187),Y=a(4),O=a(194),A=a(92),w=a.n(A),T=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={showDetails:!1},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.task,n=e.completeTask,s=e.launchModal;return r.a.createElement("div",{className:t.taskContainer,key:a.id},"Completed"!==a.status&&r.a.createElement(O.a,{checked:"Completed"===a.status,className:t.checkbox,onChange:function(){return n(a.id)},color:"primary",size:"small"}),r.a.createElement(C.a,{className:t.taskStyle,disabled:!0,InputProps:{disableUnderline:!0,style:{paddingLeft:"5px"},classes:{disabled:t.blackColor}},value:a.description,multiline:!0}),r.a.createElement(g.a,{onClick:function(){return s("Edit",a.id)},size:"small"},r.a.createElement(w.a,{className:t.moveButtons})))}}]),a}(n.Component),x=Object(Y.a)((function(e){return{taskStyle:{border:"1px solid #ccc",borderRadius:"25px",width:"700px",marginTop:"5px"},checkbox:{width:"5px"},taskContainer:{display:"flex"},blackColor:{color:"black"}}}))(T),j=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.header,a=e.tasks,n=e.currentSort,s=e.completeTask,i=e.edit,l=e.launchModal,o=e.getKeyName,c=e.filterOption,u=o(n),d=[];return d="Active"===c?a.filter((function(e){return e[u]===t&&!0===e.isActive})):"Inactive"===c?a.filter((function(e){return e[u]===t&&!1===e.isActive})):a.filter((function(e){return e[u]===t})),r.a.createElement(r.a.Fragment,null,0!==d.length&&r.a.createElement("h2",null,t),d.map((function(e,t){return r.a.createElement(x,{task:e,key:t,completeTask:s,edit:i,launchModal:l})})))}}]),a}(n.Component),N=a(196),I=a(193),U=a(184),L=a(67),V=a(15),z=a(190),B=a(11),P=a.n(B),W=a(93),F=a.n(W),q={fieldStyle:{width:"700px"},fieldLabel:{alignContent:"center",minWidth:"90px",maxWidth:"90px"},fieldContainer:{display:"flex",alignContent:"center",alignItems:"center",margin:".5rem"},inputStyle:{paddingLeft:"15px",paddingTop:"10px",paddingBottom:"10px"},dateStyle:{height:"40px",padding:0},dateContainer:{display:"flex",alignContent:"center",alignItems:"center",padding:0,margin:0},buttonContainer:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center"},buttonStyle:{alignContent:"center",alignItems:"center",justifyContent:"center",margin:"5px"},headerName:{color:"#aaa",margin:"10px"},headerClose:{margin:"10px",color:"#aaa"},headerContainer:{display:"flex",justifyContent:"space-between",padding:"10px"},dialogContainer:{display:"flex"}},R=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={id:"Edit"===e.props.type?e.props.taskDetails.id:"",description:"Edit"===e.props.type?e.props.taskDetails.description:"",category:"Edit"===e.props.type?e.props.taskDetails.category:"",status:"Edit"===e.props.type?e.props.taskDetails.status:"",dueDate:"Edit"===e.props.type?e.props.taskDetails.dueDate:P()().format("MM/DD/YYYY"),actual:"Edit"===e.props.type?e.props.taskDetails.actual:0,goal:"Edit"===e.props.type?e.props.taskDetails.goal:0,priority:"Edit"===e.props.type?e.props.taskDetails.priority:"",assigned:"Edit"===e.props.type?e.props.taskDetails.assigned:"",contact:"Edit"===e.props.type?e.props.taskDetails.contact:"",isActive:"Edit"!==e.props.type||e.props.taskDetails.isActive,activeDate:"Edit"===e.props.type?e.props.taskDetails.activeDate:P()().format("MM/DD/YYYY"),workTime:"Edit"===e.props.type?e.props.taskDetails.workTime:[],tags:"Edit"===e.props.type?e.props.taskDetails.tags:[],completedDate:"Edit"===e.props.type?e.props.taskDetails.completedDate:"",dueWeek:"Edit"===e.props.type?e.props.taskDetails.dueweek:P()().startOf("isoweek").format("MM/DD/YYYY"),dueMonth:"Edit"===e.props.type?e.props.taskDetails.dueMonth:P()().format("MMMM YYYY"),notes:"Edit"===e.props.type?e.props.taskDetails.notes:"",type:"Edit"===e.props.type?e.props.taskDetails.type:"One-time",recurDays:"Edit"===e.props.type?e.props.taskDetails.recurDays:0,isUpdating:!1},e.onChange=function(t){e.setState(Object(l.a)({},t.target.name,t.target.value))},e.dateChange=function(t){e.setState({dueDate:P()(t).format("MM/DD/YYYY"),dueWeek:P()(t).startOf("week").format("MM/DD/YYYY"),dueMonth:P()(t).format("MMMM YYYY")})},e.activeDateChange=function(t){e.setState({activeDate:P()(t).format("MM/DD/YYYY"),isActive:P()().format("YYYY-MM-DD")>=P()(t).format("YYYY-MM-DD")||e.state.isActive})},e.onAutoChange=function(t,a,n){e.setState(Object(l.a)({},n,a))},e.onStatusChange=function(t,a,n){var r=e.state,s=r.type,i=r.dueDate,o=r.activeDate,c=r.recurDays;!1===r.isUpdating&&("Completed"===a?"Recurring"===s?e.setState({isUpdating:!0,status:"",completedDate:"",dueDate:P()(i).add(c,"days").format("MM/DD/YYYYY"),dueWeek:P()(i).add(c,"days").startOf("week").format("MM/DD/YYYY"),dueMonth:P()(i).add(c,"days").format("MMMM YYYY"),activeDate:P()(o).add(c,"days"),isActive:P()(o).format("YYYY-MM-DD")<P()().format("YYYY-MM-DD")},(function(){e.setState({isUpdating:!1})})):"One-time"===s&&e.setState({isUpdating:!0,completedDate:P()().format("MM/DD/YYYY"),status:"Completed",isActive:!1},(function(){e.setState({isUpdating:!1})})):e.setState(Object(l.a)({},n,a)))},e.onCheck=function(){e.setState({isActive:!e.state.isActive})},e.uuidv4=function(){return Math.random().toString(36).substring(2)+Date.now().toString(36)},e.addTask=function(){e.props.createTask({id:e.uuidv4(),description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,activeDate:e.state.activeDate,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes,type:e.state.type,recurDays:e.state.recurDays}),e.props.toggleModal()},e.saveCurrentTask=function(){e.props.saveTask(e.state.id,{id:e.state.id,description:e.state.description,category:e.state.category,status:e.state.status,dueDate:e.state.dueDate,actual:e.state.actual,goal:e.state.goal,priority:e.state.priority,assigned:e.state.assigned,contact:e.state.contact,isActive:e.state.isActive,activeDate:e.state.activeDate,workTime:e.state.workTime,tags:e.state.tags,completedDate:e.state.completedDate,dueWeek:e.state.dueWeek,dueMonth:e.state.dueMonth,notes:e.state.notes,type:e.state.type,recurDays:e.state.recurDays}),e.props.toggleModal()},e.deleteCurrentTask=function(){e.props.deleteTask(e.state.id),e.props.toggleModal()},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.toggleModal,n=t.openModal,s=t.type,i=t.categories,l=t.assignedUsers,o=t.contactUsers;return r.a.createElement(N.a,{onClose:function(){return a()},open:n,maxWidth:"md",fullWidth:!0,disableBackdropClick:!0,disableEscapeKeyDown:!0},r.a.createElement("div",{className:q.dialogContainer},r.a.createElement("div",{style:q.headerContainer},r.a.createElement("div",{style:q.headerName},r.a.createElement(E.a,{variant:"h5"},"Task Management")),r.a.createElement("div",{style:q.headerClose},r.a.createElement(g.a,{onClick:function(){return a()},size:"small"},r.a.createElement(F.a,null)))),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Description"),r.a.createElement(C.a,{style:q.fieldStyle,name:"description",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.description,multiline:!0})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Category"),r.a.createElement(I.a,{size:"small",style:q.fieldStyle,options:i,defaultValue:this.state.category,getOptionLabel:function(e){return"string"===typeof e?e:e.category},renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.category,onInputChange:function(t,a){return e.onAutoChange(t,a,"category")}})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Type"),r.a.createElement(I.a,{options:["One-time","Recurring"],defaultValue:this.state.type,getOptionLabel:function(e){return"string"===typeof e?e:e.type},style:q.fieldStyle,size:"small",renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.type,onInputChange:function(t,a){return e.onAutoChange(t,a,"type")}})),"\\",r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Recurring Days"),r.a.createElement(C.a,{style:q.fieldStyle,name:"recurDays",type:"number",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.recurDays,multiline:!0})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Status"),r.a.createElement(I.a,{options:["Not Started","In Progress","On Hold","Completed"],defaultValue:this.state.status,getOptionLabel:function(e){return"string"===typeof e?e:e.status},style:q.fieldStyle,size:"small",renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.status,onInputChange:function(t,a){return e.onStatusChange(t,a,"status")}})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Priority"),r.a.createElement(I.a,{options:["1","2","3","4","5"],defaultValue:this.state.priority,getOptionLabel:function(e){return"string"===typeof e?e:e.priority},style:q.fieldStyle,size:"small",renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},inputValue:this.state.priority,onInputChange:function(t,a){return e.onAutoChange(t,a,"priority")}})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Due Date"),r.a.createElement("div",{style:q.dateContainer},r.a.createElement(V.a,{utils:L.a},r.a.createElement(z.a,{disableToolbar:!0,autoOk:!0,variant:"inline",format:"MM/dd/yyyy",value:this.state.dueDate,onChange:function(t){return e.dateChange(t)},KeyboardButtonProps:{"aria-label":"change date"},inputVariant:"outlined",InputProps:{style:q.dateStyle}})))),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Active Date"),r.a.createElement("div",{style:q.dateContainer},r.a.createElement(V.a,{utils:L.a},r.a.createElement(z.a,{disableToolbar:!0,autoOk:!0,variant:"inline",format:"MM/dd/yyyy",value:this.state.activeDate,onChange:function(t){return e.activeDateChange(t)},KeyboardButtonProps:{"aria-label":"change date"},inputVariant:"outlined",InputProps:{style:q.dateStyle}})))),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Actual"),r.a.createElement(C.a,{style:q.fieldStyle,name:"actual",type:"number",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.actual,multiline:!0})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Goal"),r.a.createElement(C.a,{style:q.fieldStyle,name:"goal",type:"number",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.goal,multiline:!0})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Assigned"),r.a.createElement(I.a,{options:l,defaultValue:this.state.assigned,getOptionLabel:function(e){return"string"===typeof e?e:e.assigned},style:q.fieldStyle,size:"small",renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.assigned,onInputChange:function(t,a){return e.onAutoChange(t,a,"assigned")}})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Contact"),r.a.createElement(I.a,{options:o,defaultValue:this.state.contact,getOptionLabel:function(e){return"string"===typeof e?e:e.contact},style:q.fieldStyle,size:"small",renderInput:function(e){return r.a.createElement(C.a,Object.assign({},e,{variant:"outlined"}))},freeSolo:!0,inputValue:this.state.contact,onInputChange:function(t,a){return e.onAutoChange(t,a,"contact")}})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Active"),r.a.createElement(O.a,{checked:this.state.isActive,name:"isActive",onChange:this.onCheck,color:"primary",size:"small"})),r.a.createElement("div",{style:q.fieldContainer},r.a.createElement(E.a,{style:q.fieldLabel},"Notes"),r.a.createElement(C.a,{style:q.fieldStyle,name:"notes",variant:"outlined",InputProps:{style:q.inputStyle},onChange:this.onChange,value:this.state.notes,multiline:!0})),r.a.createElement("div",{style:q.buttonContainer},"Add"===s&&r.a.createElement("div",{style:q.buttonStyle},r.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.addTask},"Add")),"Edit"===s&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:q.buttonStyle},r.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.saveCurrentTask},"Save")),r.a.createElement("div",{style:q.buttonStyle},r.a.createElement(U.a,{style:q.buttonStyle,variant:"contained",color:"primary",onClick:this.deleteCurrentTask},"Delete"))))))}}]),a}(n.Component),K=a(95),J=a.n(K),H=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={sortOptions:["Category","Status","Priority","Assigned","Contact","Due Date","Due Week","Due Month"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleSortChange(t),e.handleClose()},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{edge:"start",color:"inherit",onClick:this.handleMenu},r.a.createElement(J.a,null)),r.a.createElement(f.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.sortOptions.map((function(t,a){return r.a.createElement(y.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),G=a(96),_=a.n(G),Q=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={filterOptions:["Active","Inactive","Both"],anchorEl:null,setAnchorEl:!1},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleClick=function(t){e.props.handleFilterChange(t),e.handleClose()},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{edge:"start",color:"inherit",onClick:this.handleMenu},r.a.createElement(_.a,null)),r.a.createElement(f.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},this.state.filterOptions.map((function(t,a){return r.a.createElement(y.a,{key:a,value:t,onClick:function(){return e.handleClick(t)}},t)}))))}}]),a}(n.Component),X=a(50),Z=a.n(X),$=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={tasks:[],headers:[],lastSaved:null,isLoading:!1,anchorEl:null,setAnchorEl:!1,currentSort:"Category",trackerName:"Test Title",selectedTask:null,openModal:!1,modalType:null,categories:[],assignedUsers:[],contactUsers:[],taskDetails:{},filterOption:"Active"},e.componentDidMount=function(){e.getServerData()},e.componentDidUpdate=function(t,a){e.state.tasks!==a.tasks&&(e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers"))},e.getServerData=function(){var t=window.location.search,a=new URLSearchParams(t).get("query");void 0!==a&&null!==a&&e.setState({isLoading:!0},(function(){Z.a.get("https://guarded-mesa-76047.herokuapp.com/api/lists/".concat(a)).then((function(t){return e.setState({trackerName:t.data.listName,tasks:t.data.list,lastSaved:t.data.lastSaved,isLoading:!1})})).then((function(){e.activateTasks(),e.getSortHeaders(e.state.tasks,e.state.currentSort),e.getUniqueValues(e.state.tasks,"category","categories"),e.getUniqueValues(e.state.tasks,"assigned","assignedUsers"),e.getUniqueValues(e.state.tasks,"contact","contactUsers")}))}))},e.saveData=function(){e.handleClose();var t=window.location.search,a=new URLSearchParams(t).get("query"),n=new Date;null===a?Z.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:e.state.tasks,listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()})):Z.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/update/".concat(a),{list:e.state.tasks,listName:e.state.trackerName,lastSaved:n}).then((function(){e.setState({lastSaved:n}),alert("Data saved successfully!")}))},e.downloadFile=function(e,t,a){var n=document.createElement("a"),r=new Blob([e],{type:a});n.href=URL.createObjectURL(r),n.download=t,n.click()},e.exportJSON=function(){e.handleClose(),e.downloadFile(JSON.stringify(e.state.tasks),"data.json","text/plain")},e.getFile=function(t){e.handleClose();var a=t.target.files,n=new FileReader;n.readAsText(a[0]),n.onload=function(t){e.setState({tasks:JSON.parse(t.target.result)})}},e.createNew=function(){e.handleClose(),Z.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:[],listName:e.state.trackerName,lastSaved:new Date}).then((function(e){return alert("New list created!"),e})).then((function(e){var t=e.data._id,a=document.createElement("a");a.href="https://wmxgroup.github.io/task-tracker/?query=".concat(t),a.click()}))},e.createTask=function(t){e.setState({tasks:[].concat(Object(o.a)(e.state.tasks),[t])})},e.launchModal=function(t,a){var n=e.state.tasks.filter((function(e){return e.id===a}));e.setState({modalType:t,taskDetails:n[0]},(function(){return e.toggleModal()}))},e.completeTask=function(t){var a=e.state.tasks.map((function(e){return e.id===t&&("Recurring"===e.type?(e.dueDate=P()(e.dueDate).add(e.recurDays,"days").format("MM/DD/YYYY"),e.dueWeek=P()(e.dueDate).add(e.recurDays,"days").startOf("week").format("MM/DD/YYYY"),e.dueMonth=P()(e.dueDate).add(e.recurDays,"days").format("MMMM YYYY"),e.activeDate=P()(e.activeDate).add(e.recurDays,"days"),e.isActive=P()(e.activeDate).format("YYYY-MM-DD")<P()().format("YYYY-MM-DD")):"One-time"===e.type&&(e.completedDate=P()().format("MM/DD/YYYY"),e.status="Completed",e.isActive=!1)),e}));e.setState({tasks:a})},e.activateTasks=function(){var t=e.state.tasks.map((function(e){return P()().format("YYYY-MM-DD")>=P()(e.activeDate).format("YYYY-MM-DD")&&""!==e.activeDate&&(e.isActive=!0),e}));e.setState({tasks:t})},e.saveTask=function(t,a){var n=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:[].concat(Object(o.a)(n),[a])})},e.deleteTask=function(t){var a=e.state.tasks.filter((function(e){return e.id!==t}));e.setState({tasks:a})},e.getSortHeaders=function(t,a){var n=e.getKeyName(a),r=[];t.filter((function(e){return r.findIndex((function(t){return t===e[n]}))<=-1&&r.push(e[n]),null})),r.sort(),e.setState({headers:r,currentSort:a})},e.getKeyName=function(e){var t="";switch(e){case"Category":t="category";break;case"Status":t="status";break;case"Priority":t="priority";break;case"Assigned":t="assigned";break;case"Contact":t="contact";break;case"Due Date":t="dueDate";break;case"Due Week":t="dueWeek";break;case"Due Month":t="dueMonth";break;default:t=""}return t},e.getUniqueValues=function(t,a,n){var r=[];t.filter((function(e){return r.findIndex((function(t){return t===e[a]}))<=-1&&r.push(e[a]),null})),e.setState(Object(l.a)({},n,r))},e.handleMenu=function(t){e.setState({anchorEl:t.currentTarget,setAnchorEl:!0})},e.handleClose=function(){e.setState({setAnchorEl:!1})},e.handleTitleChange=function(t){e.setState({trackerName:t.target.value})},e.handleSwitchChange=function(t){e.setState(Object(l.a)({},t.target.name,t.target.checked))},e.handleSortChange=function(t){e.getSortHeaders(e.state.tasks,t)},e.handleFilterChange=function(t){e.setState({filterOption:t})},e.toggleModal=function(){e.setState({openModal:!e.state.openModal})},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{position:"fixed",color:"primary"},r.a.createElement(h.a,null,r.a.createElement(g.a,{edge:"start",color:"inherit",onClick:this.handleMenu},r.a.createElement(v.a,null)),r.a.createElement(f.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},r.a.createElement("input",{type:"file",style:{display:"none"},id:"raised-button-file",name:"file",onChange:this.getFile,accept:".json"}),r.a.createElement("label",{htmlFor:"raised-button-file"},r.a.createElement(y.a,{onClick:function(){return e.getFile()}},"Import JSON")),r.a.createElement(y.a,{onClick:function(){return e.exportJSON()}},"Export Data"),r.a.createElement(y.a,{onClick:function(){return e.saveData()}},"Save Data"),r.a.createElement(y.a,{onClick:function(){return e.createNew()}},"Create New")),r.a.createElement(E.a,{variant:"h6"},"Task Tracker"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.addButton},r.a.createElement(H,{handleSortChange:this.handleSortChange})),r.a.createElement("div",{className:t.addButton},r.a.createElement(Q,{handleFilterChange:this.handleFilterChange})))),r.a.createElement(h.a,null),r.a.createElement("div",{style:{fontStyle:"italic",color:"#bbb"}},null===this.state.lastSaved?"Not Saved":"Last Saved: "+this.state.lastSaved),r.a.createElement(C.a,{InputProps:{disableUnderline:!0,style:{display:"block",fontSize:"2em",marginTop:"0.3em",marginBottom:"0.3em"}},value:this.state.trackerName,onChange:this.handleTitleChange}),r.a.createElement(M.a,null),r.a.createElement("div",{className:t.taskContainer},this.state.headers.map((function(t,a){return r.a.createElement(j,{tasks:e.state.tasks,header:t,currentSort:e.state.currentSort,key:a,completeTask:e.completeTask,launchModal:e.launchModal,getKeyName:e.getKeyName,filterOption:e.state.filterOption})}))),!0===this.state.openModal&&r.a.createElement(R,{toggleModal:this.toggleModal,openModal:this.state.openModal,type:this.state.modalType,categories:this.state.categories,assignedUsers:this.state.assignedUsers,contactUsers:this.state.contactUsers,createTask:this.createTask,taskDetails:this.state.taskDetails,saveTask:this.saveTask,deleteTask:this.deleteTask}),r.a.createElement(m.a,{position:"fixed",color:"primary",className:t.appBar},r.a.createElement(h.a,null,r.a.createElement(D.a,{color:"secondary","aria-label":"add",className:t.fabButton,onClick:function(){return e.launchModal("Add")}},r.a.createElement(S.a,null)))))}}]),a}(n.Component),ee=Object(Y.a)((function(e){return{taskContainer:{maxWidth:"700px",marginBottom:"70px"},formControl:{minWidth:120,margin:"5px"},addButton:{margin:"5px",alignContent:"center",fontSize:"17px",color:"white"},actionBar:{display:"flex"},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}}))($),te=a(189),ae=a(99),ne=a(64),re=Object(ae.a)({palette:{primary:ne.a},typography:{},overrides:{}});var se=function(){return r.a.createElement(te.a,{theme:re},r.a.createElement(ee,null))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(se,null)),document.getElementById("root"))}},[[115,1,2]]]);
//# sourceMappingURL=main.f525c462.chunk.js.map