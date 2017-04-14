
var host = "localhost";
var user = "root";
var password = "your_password_here";
var database = "tagcloud";
    
//make connection
var server = mysql_connect(host, user, password);
var connection = mysql_select_db(database, server);
    
//query the database
var query = mysql_query("SELECT * FROM tags");

var json = "({ tags:[";

for ($x = 0; $x < mysql_num_rows($query); $x++) {
    $row = mysql_fetch_assoc($query);
            
    //continue json object
    $json += "{tag:'" . $row["tag"] + "',freq:'" + $row["frequency"] + "'}";
            
    //add comma if not last row, closing brackets if is
    if ($x < mysql_num_rows($query) -1)
        $json += ",";
    else
        $json += "]})";

    var response = $.get(
        "somepage.php",
        {paramOne : 1, paramX : 'abc'},
        function(data) {
        alert('page content: ' + data);
        }
    );
}