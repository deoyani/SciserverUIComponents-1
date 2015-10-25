/* 
 * CSV parser obtained from reply by Andy VanWagoner on
 * http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
 * Modified a bit.
 */
var Tables = {
		format_datatable:["html","Inline DataTable"],
		format_csv: ["csv","Inline CSV"],
		format_csvfile:["csvfile","CSV File"],
			
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
writeTable: function(csv, targetdiv, format) {
	var table = {data:[],header:null}
	if(format==Tables.format_csv[0]){
		Tables.writeCSV(targetdiv,csv)
	} else if(format == Tables.format_datatable[0]){
		var table = Tables.parseCSV(csv, table);
		Tables.writeDataTable(targetdiv, table);
	}else if(format == Tables.format_csvfile[0]){
		Tables.writeLink(targetdiv,csv);
	}
},
writeCSV : function(targetdiv, csv){
	var newdiv=$('<textarea cols="120" rows="20" style="white-space:nowrap;overflow:auto;font-family:Courier New,monospace;"></textarea>');
	newdiv.append(csv);
	$(targetdiv).append(newdiv);
},
writeDataTable : function(targetdiv, table){
	if(table.data == null || table.data.length == 0) {
		$(targetdiv).html("0 rows returned")			
	} else {
		var dtbl=Tables.startTable(targetdiv,table.header) ;
		dtbl.DataTable( {"data":table.data});			
	}
},
writeLink : function(targetdiv, link){
	$(targetdiv).append('<a href="'+link+'">'+link+'</a><br/>');
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