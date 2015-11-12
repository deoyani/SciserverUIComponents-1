var Tables = {
	/// Write JSON Table in html
	/// Added by @Deoyani Nandrekar-Heinis
	/// Pass JSON object to make html table with given style and container 
	writeJSONTable : function(data,targetdiv, tblclass){
		
		
		///column names in DataTable readable format
		columnsData =[];
		for(i=0; i<data.Columns.length; i++)
			columnsData.push({title:data.Columns[i]});
		
		
		
		var tbl=$("<table id='testtable'"+tblclass+"></table>") ;
		targetdiv.append(tbl);
		tbl.DataTable( {
	        data: data.Data,
	        columns: columnsData
	        
	    } );
	
	}
};