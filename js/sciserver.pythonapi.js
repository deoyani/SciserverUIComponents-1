var PythonAPI = {
  endpoint : "http://scitest02.pha.jhu.edu/ScriptExecutorWebService/api/ScriptExecution",
  run : function(script,token, async, scriptname, callback){
	$.ajax({
	  type: "POST",
	  url: PythonAPI.endpoint,
	  contentType: "application/json",
      dataType: "text",
      headers : {
		"X-Auth-Token" : token
	  },
	  data: JSON.stringify( {
		"scriptText": script,
		"scriptName":scriptname,
		"async":async
	  }), 
	  complete: function(data) {
		callback(data)
	  }
    })
  }
};
var Hangfire = {
  asyncjobsendpoint : "http://scitest02.pha.jhu.edu/HangfireJobMonitor/api/AsyncPythonJobs/",
  getjobinfo : function(jobid, token,callback){
		$.ajax({
			  type: "GET",
			  url: Hangfire.asyncjobsendpoint+jobid,
		      headers : {
				"X-Auth-Token" : token
			  },
			  complete: function(data) {
				callback(data.responseJSON)
			  }
		    })
  }

}