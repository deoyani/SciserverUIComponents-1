/* 
 * CSV parser obtained from reply by Andy VanWagoner on
 * http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
 * Modified a bit.
 */
var Tables = {
parseCSV: function(csv, table, reviver) {
    reviver = reviver || function(r, c, v) { return v; };
    var chars = csv.split(''), c = 0, cc = chars.length, start, end,  row;
    var i=0
    while (c < cc) {
    	row = []
    	if(i == 0){
    		table.header=row
    	} else {
    		table.data.push(row)
    	} 
    	i=i+1
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
            start = end = c;
            if ('"' === chars[c]){
                start = end = ++c;
                while (c < cc) {
                    if ('"' === chars[c]) {
                        if ('"' !== chars[c+1]) { break; }
                        else { chars[++c] = ''; } // unescape ""
                    }
                    end = ++c;
                }
                if ('"' === chars[c]) { ++c; }
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
            } else {
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
            }
            row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
            if (',' === chars[c]) { ++c; }
        }
        if ('\r' === chars[c]) { ++c; }
        if ('\n' === chars[c]) { ++c; }
    }
    return table;
},
/* _table is a json object with header and data as produced by parseCSV */
stringify: function(_table, replacer) {
	var table = _table.data
    replacer = replacer || function(r, c, v) { return v; };
    var csv = '', c, cc, r, rr = table.length, cell;
    for (r = 0; r < rr; ++r) {
        if (r) { csv += '\r\n'; }
        for (c = 0, cc = table[r].length; c < cc; ++c) {
            if (c) { csv += ','; }
            cell = replacer(r, c, table[r][c]);
            if (/[,\r\n"]/.test(cell)) { cell = '"' + cell.replace(/"/g, '""') + '"'; }
            csv += (cell || 0 === cell) ? cell : '';
        }
    }
    return csv;
},
writeTable: function(csv, targetdiv) {
	var table = Tables.parseCSV(csv);
	var dtbl=Tables.startTable(targetdiv,table.header) ;
	dtbl.DataTable( {columns:table.header,data:table.data});			
},
/*
 * Create a single table holding results from >=1 queries to same tables in different databases
 */
writeTables : function(csvs, targetdiv) {
	var table = {}
	table.data=[]
	table.header=null
	for(var i = 0; i < csvs.length; i++){
		Tables.parseCSV(csvs[i], table);
	}	
	if(table.data == null || table.data.length == 0) {
		$(targetdiv).html("0 rows returned")			
	} else {
		var dtbl=Tables.startTable(targetdiv,table.header) ;
		dtbl.DataTable( {"data":table.data});			
	}
},
/* 
 * create a <table> element with a header for the column names, simplest way to 
 * create an element to which DataTables() can be applied
 */
startTable : function(targetdiv,header){
	var tbl= "<table class=\"table table-striped table-bordered nowrap\"><thead><tr>"
	for(icol = 0; icol< header.length; icol++) {
					tbl+="<th>"+header[icol]+"</th>"
				}
	tbl+="</tr></thead><tbody/></table>"
	var dtbl = $(tbl)
	$(targetdiv).append(dtbl)
	return dtbl 
}


};