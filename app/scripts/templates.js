Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <li>\n                        <a href='#' class='link-light' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleEvents", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Events</a>\n                    </li>\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <li class='dropdown'>\n                        <a href=\"#\" data-toggle=\"dropdown\" class='navbar-text link-light navbar-user'>\n                            <b class=\"caret\"></b>\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "controllers.login.user.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("controllers.login.user.gravatar")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        </a>\n\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#\">Settings</a></li>\n                            <li><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "signOut", {hash:{
    'target': ("controllers.login")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Sign Out</a></li>\n                        </ul>\n                    </li>\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <li>\n                        <a href='#' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "askForLogin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class='link-light'>Login or Singn Up</a>\n                    </li>\n                ");
  return buffer;
  }

  data.buffer.push("<!-- Static navbar -->\n<div class=\"navbar navbar-static-top navbar-theme\" role=\"navigation\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("navbar-brand link-light")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "YAMS", "events.index", options) : helperMissing.call(depth0, "link-to", "YAMS", "events.index", options))));
  data.buffer.push("\n        </div>\n        <div class=\"navbar-collapse collapse\">\n            <ul class=\"nav navbar-nav\">\n                ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n                ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n        <!--/.nav-collapse -->\n    </div>\n    <!--/.container-fluid -->\n</div>\n\n<div class=\"wrapper\">\n    <div class=\"container\">\n        <!-- Main component for a primary marketing message or call to action -->\n        <div class=\"jumbotron jumbotron-theme\">\n            ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n    </div>\n    <!-- /container -->\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/address-picker"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'id': ("mapId")
  },hashTypes:{'id': "ID"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class='address-picker-map'></div>\n<div class='top-margin'>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'class': ("addresspicker form-control"),
    'value': ("value"),
    'placeholder': ("Type address here")
  },hashTypes:{'type': "STRING",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/date-range"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"form-group\">\n    <div class=\"input-group\">\n        <label class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i>\n        </label>\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'class': ("input-daterange form-control"),
    'value': ("formattedRange")
  },hashTypes:{'type': "STRING",'class': "STRING",'value': "ID"},hashContexts:{'type': depth0,'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/draw-location"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class='address-picker-map'></div>\n<h5>");
  stack1 = helpers._triageMustache.call(depth0, "location.address", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h5>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/draw-participant"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push(" <i class='glyphicon glyphicon-time'></i> ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isAccepted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push(" <i class='glyphicon glyphicon-ok'></i> ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isRejected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push(" <i class='glyphicon glyphicon-remove'></i> ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push(" <i class='glyphicon glyphicon-question-sign'></i> ");
  }

  data.buffer.push("<div class='col-md-2'>\n    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("participant.user.gravatar")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n</div>\n<div class='col-md-8'>\n    <div>");
  stack1 = helpers._triageMustache.call(depth0, "participant.user.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n    <div>");
  stack1 = helpers._triageMustache.call(depth0, "participant.user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n</div>\n<div class='col-md-2'>\n    <span class='participant-status'>\n        ");
  stack1 = helpers['if'].call(depth0, "isPending", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </span>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/email-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("select"),
    'class': ("emailbar")
  },hashTypes:{'type': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/photo-carousel"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <li>\n            <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("item.thumbnailUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "overlayItem", "item", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n        </li>\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <a href=\"#\" class=\"carousel-control left\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollLeft", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n        <span class='glyphicon glyphicon-chevron-left'></span>\n    </a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <a href=\"#\" class=\"carousel-control right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollRight", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n        <span class='glyphicon glyphicon-chevron-right'></span>\n    </a>\n    ");
  return buffer;
  }

  data.buffer.push("<div class='carousel'>\n\n    <ul>\n        ");
  stack1 = helpers.each.call(depth0, "item", "in", "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n\n    ");
  stack1 = helpers['if'].call(depth0, "isLeftScrollable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isRightScrollable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<div class=\"modal fade\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("currentItem.url")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class='image-in-modal'>\n            </div>\n        </div>\n        <!-- /.modal-content -->\n    </div>\n    <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->\n");
  return buffer;
  
});

Ember.TEMPLATES["components/public-private"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"onoffswitch\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("title")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("checked"),
    'id': ("checkbox_id"),
    'name': ("checkbox_id"),
    'class': ("onoffswitch-checkbox")
  },hashTypes:{'type': "STRING",'checked': "ID",'id': "ID",'name': "ID",'class': "STRING"},hashContexts:{'type': depth0,'checked': depth0,'id': depth0,'name': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label class=\"onoffswitch-label\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("checkbox_id")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        <span class=\"onoffswitch-inner\"></span>\n        <span class=\"onoffswitch-switch\"></span>\n    </label>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["event"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n<div class='edit-buttons'>\n    ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <button class='btn btn-success' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveChanges", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button>\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <button class='btn btn-default' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleEditMode", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Edit</button>\n    ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n        <span class='fa fa-globe' title='This event is public'></span>\n    ");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n        <span class='fa fa-lock' title='This event is private'></span>\n    ");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                <div class='row top-margin'>\n                    <div class='col-md-2'>\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['public-private'] || (depth0 && depth0['public-private']),options={hash:{
    'checked': ("public"),
    'checkbox_id': ("public_private_onoff")
  },hashTypes:{'checked': "ID",'checkbox_id': "STRING"},hashContexts:{'checked': depth0,'checkbox_id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "public-private", options))));
  data.buffer.push(" \n                    </div>\n                    <div class='col-md-10 onofflabel'>\n                        ");
  stack1 = helpers['if'].call(depth0, "public", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </div>\n            ");
  return buffer;
  }
function program11(depth0,data) {
  
  
  data.buffer.push(" \n                            <label for='public_private_onoff'>Anyone who has the link can see this event</label>\n                        ");
  }

function program13(depth0,data) {
  
  
  data.buffer.push(" \n                            <label for='public_private_onoff'>Only invited participants can see this event</label>\n                        ");
  }

function program15(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("title"),
    'class': ("form-control top-margin")
  },hashTypes:{'type': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <h2>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>by ");
  stack1 = helpers._triageMustache.call(depth0, "creator.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("description"),
    'class': ("form-control top-margin")
  },hashTypes:{'value': "ID",'class': "STRING"},hashContexts:{'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <p>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                <div class='top-margin'>\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['date-range'] || (depth0 && depth0['date-range']),options={hash:{
    'startDate': ("startDate"),
    'endDate': ("endDate")
  },hashTypes:{'startDate': "ID",'endDate': "ID"},hashContexts:{'startDate': depth0,'endDate': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "date-range", options))));
  data.buffer.push("\n                </div>\n            ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                <p>At: ");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "startDate", "short+time", options) : helperMissing.call(depth0, "formatDate", "startDate", "short+time", options))));
  data.buffer.push(" &mdash; ");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "endDate", "short+time", options) : helperMissing.call(depth0, "formatDate", "endDate", "short+time", options))));
  data.buffer.push(" (");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "startDate", "fromnow", options) : helperMissing.call(depth0, "formatDate", "startDate", "fromnow", options))));
  data.buffer.push(")</p>\n            ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div classs='comment'>\n                <div class='row'>\n                    <div class='col-md-1'>\n                        <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("author.gravatar")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    </div>\n                    <div class='col-md-11'>\n                        <h5 class='comment-header'>");
  stack1 = helpers._triageMustache.call(depth0, "author.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <i>");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "creationTime", "fromnow", options) : helperMissing.call(depth0, "formatDate", "creationTime", "fromnow", options))));
  data.buffer.push("</i></h5>\n                        <p>");
  stack1 = helpers._triageMustache.call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                    </div>\n                </div>\n            </div>\n            ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers['address-picker'] || (depth0 && depth0['address-picker']),options={hash:{
    'value': ("location.address"),
    'lat': ("location.geopoint.latitude"),
    'lng': ("location.geopoint.longitude")
  },hashTypes:{'value': "ID",'lat': "ID",'lng': "ID"},hashContexts:{'value': depth0,'lat': depth0,'lng': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "address-picker", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "location.address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program32(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers['draw-location'] || (depth0 && depth0['draw-location']),options={hash:{
    'location': ("location")
  },hashTypes:{'location': "ID"},hashContexts:{'location': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "draw-location", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                <div class='top-margin'>");
  data.buffer.push(escapeExpression((helper = helpers['email-bar'] || (depth0 && depth0['email-bar']),options={hash:{
    'event': ("model")
  },hashTypes:{'event': "ID"},hashContexts:{'event': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "email-bar", options))));
  data.buffer.push("</div>\n            ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers['draw-participant'] || (depth0 && depth0['draw-participant']),options={hash:{
    'participant': ("participant")
  },hashTypes:{'participant': "ID"},hashContexts:{'participant': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "draw-participant", options))));
  data.buffer.push(" ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "canEdit", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":privacy-indicator public:indicator-public:indicator-private")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    ");
  stack1 = helpers['if'].call(depth0, "public", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n<div class='row'>\n    <div class='col-lg-8 event-left-column'>\n        <div class='row'>\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class='row top-margin'>\n            ");
  data.buffer.push(escapeExpression((helper = helpers['photo-carousel'] || (depth0 && depth0['photo-carousel']),options={hash:{
    'content': ("pictures"),
    'elementWidth': (100)
  },hashTypes:{'content': "ID",'elementWidth': "INTEGER"},hashContexts:{'content': depth0,'elementWidth': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "photo-carousel", options))));
  data.buffer.push("\n        </div>\n        <div class='row new-comment-row top-margin'>\n            ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'class': ("form-control"),
    'value': ("newComment"),
    'placeholder': ("Leave a comment..."),
    'action': ("postComment")
  },hashTypes:{'class': "STRING",'value': "ID",'placeholder': "STRING",'action': "STRING"},hashContexts:{'class': depth0,'value': depth0,'placeholder': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n            <button class='btn btn-default new-comment-btn' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "postComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add Message</button>\n        </div>\n        <div class='row top-margin'>\n            ");
  stack1 = helpers.each.call(depth0, "sortedComments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n    <div class='col-lg-4 event-right-column'>\n        <div class='row'>\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class='row'>\n            <h3>Participants</h3>\n            ");
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "participant", "in", "participants", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["events/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<p class=\"text-center\">\n    <button class=\"btn btn-lg btn-primary\" role=\"button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createEvent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Schedule an event</button>\n</p>\n");
  return buffer;
  
});

Ember.TEMPLATES["events/wizard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers['draw-participant'] || (depth0 && depth0['draw-participant']),options={hash:{
    'participant': ("participant")
  },hashTypes:{'participant': "ID"},hashContexts:{'participant': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "draw-participant", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                <div class='upload-container'>\n                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("picture.thumbnailUrl"),
    'class': (":thumbnail :thumbnail-upload")
  },hashTypes:{'src': "STRING",'class': "STRING"},hashContexts:{'src': depth0,'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":thumbnail-rollover :cover-rollover picture.isCover:cover-rollover-active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setCover", "picture", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">Cover</a>\n                    <a class='thumbnail-rollover delete-rollover' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "remove", "picture", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">Remove</a>\n                </div>\n                ");
  return buffer;
  }

  data.buffer.push("<div class='row'>\n    <div class='publish-button'>\n        <button class='btn btn-success' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "publishEvent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">That's it, publish!</button>\n    </div>\n</div>\n\n<div class='row'>\n    <div class='col-lg-2'>\n        <ul class=\"nav nav-stacked wizard-nav\">\n            <li>\n                <a href='#' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollTo", "describe", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isDescribeActive:wizard-nav-active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Describe</a>\n            </li>\n            <li>\n                <a href='#' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollTo", "people", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isPeopleActive:wizard-nav-active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Invite</a>\n            </li>\n            <li>\n                <a href='#' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollTo", "location", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isLocationActive:wizard-nav-active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Choose location</a>\n            </li>\n            <li>\n                <a href='#' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "scrollTo", "uploads", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isUploadsActive:wizard-nav-active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Upload</a>\n            </li>\n        </ul>\n    </div>\n\n    <div class='col-lg-10 wizard-overflow'>\n        <div class='wizard-row event-row'>\n            <a id='describe'></a>\n            <div class='row'>\n                <div class='col-lg-4'>\n                    <h3>Describe your event</h3>\n                </div>\n                <div class='col-lg-8'>\n                    <div class='form-public-private-switch'>\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['public-private'] || (depth0 && depth0['public-private']),options={hash:{
    'checked': ("public"),
    'checkbox_id': ("public_private_onoff")
  },hashTypes:{'checked': "ID",'checkbox_id': "STRING"},hashContexts:{'checked': depth0,'checkbox_id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "public-private", options))));
  data.buffer.push("\n                    </div>\n                </div>\n            </div>\n\n            <div class='form-group top-margin'>\n                <label>Title it</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("title"),
    'size': (30),
    'placeholder': ("Party for everybody"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'value': "ID",'size': "INTEGER",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'size': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n            <div class='form-group'>\n                <label>Choose dates</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers['date-range'] || (depth0 && depth0['date-range']),options={hash:{
    'startDate': ("startDate"),
    'endDate': ("endDate")
  },hashTypes:{'startDate': "ID",'endDate': "ID"},hashContexts:{'startDate': depth0,'endDate': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "date-range", options))));
  data.buffer.push("\n            </div>\n            <div class='form-group'>\n                <label>Add description</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("description"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'class': "STRING"},hashContexts:{'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n            </div>\n\n        </div>\n\n\n        <div class='wizard-row people-row'>\n            <a id='people'></a>\n            <h3>Invite your friends</h3>\n\n            <p>Just type their emails, they will receive email notifications once event will be puplished.</p>\n            ");
  data.buffer.push(escapeExpression((helper = helpers['email-bar'] || (depth0 && depth0['email-bar']),options={hash:{
    'event': ("model")
  },hashTypes:{'event': "ID"},hashContexts:{'event': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "email-bar", options))));
  data.buffer.push("\n            <div>\n                ");
  stack1 = helpers.each.call(depth0, "participant", "in", "participants", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        </div>\n\n        <div class='wizard-row location-row'>\n            <a id='location'></a>\n            <h3>Choose the location</h3>\n\n            ");
  data.buffer.push(escapeExpression((helper = helpers['address-picker'] || (depth0 && depth0['address-picker']),options={hash:{
    'value': ("location.address"),
    'lat': ("location.geopoint.latitude"),
    'lng': ("location.geopoint.longitude")
  },hashTypes:{'value': "ID",'lat': "ID",'lng': "ID"},hashContexts:{'value': depth0,'lat': depth0,'lng': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "address-picker", options))));
  data.buffer.push("\n        </div>\n\n\n        <div class='wizard-row uploads-row'>\n            <a id='uploads'></a>\n            <h3>Upload some images and choose an event cover</h3>\n\n            <div class='well uploads-wrapper'>\n                ");
  stack1 = helpers.each.call(depth0, "picture", "in", "pictures", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                <button class='btn btn-default upload-image-button' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "upload", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><i class='fa fa-plus'></i>&nbsp;Upload an image</button>\n            </div>\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n<div class='participant top-margin link' ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginAs", "user", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    <div class='col-md-2'>\n        <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("user.gravatar")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    </div>\n    <div class='col-md-10'>\n        <div>");
  stack1 = helpers._triageMustache.call(depth0, "user.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        <div>");
  stack1 = helpers._triageMustache.call(depth0, "user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n    </div>\n</div>\n");
  return buffer;
  }

  data.buffer.push("<h3>Login as:</h3>\n");
  stack1 = helpers.each.call(depth0, "user", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});