var CasJobs = {
	endpoint : "http://scitest02.pha.jhu.edu/CasJobs",
	syncquery : function(sql, context, token, callback) {
		$.ajax({
			type : "POST",
			url : CasJobs.endpoint + "/RestApi/contexts/" + context + "/query",
			contentType : "application/json",
			headers : {
				"X-Auth-Token" : token
			},
			dataType : "text",
			data : JSON.stringify({
				Query : sql
			}),
			complete : function(data) {
				callback(data)
			}
		})

	},
	queryaspromise : function(sql, context, token) {
		return $.ajax({
			type : "POST",
			url : CasJobs.endpoint + "/RestApi/contexts/" + context + "/query",
			contentType : "application/json",
			headers : {
				"X-Auth-Token" : token
			},
			dataType : "text",
			data : JSON.stringify({
				Query : sql
			})
		})

	}

}