<?php header('content-type: application/json; charset=utf-8'); 
$rows = array();

$key = $_GET['key'];
$venue = $_GET['venue'];
$category = $_GET['category'];

mysql_select_db("db99605_racevendors") or die(mysql_error());


$data = mysql_query("SELECT * FROM sponsors WHERE venue='$venue' || venue='global' order by RAND()") or die(mysql_error());

/*
if(!$key && $category != "all") { 
	
} else if(!$key && $category == "all"){
	$data = mysql_query("SELECT * FROM listings WHERE venue='$venue' order by name") or die(mysql_error());
}else {
	$data = mysql_query("SELECT * FROM listings WHERE venue='$venue' OR id='$key' OR category='$key' OR category='$category' OR FIND_IN_SET('$key', keywords) order by name") or die(mysql_error());
}
*/


while($r = mysql_fetch_assoc($data)) { $rows[] = $r;}
echo 'racevendorsSponsors' . '(' . json_encode($rows) . ');';

//echo json_encode($rows);

/*
$result = mysql_query("SELECT * FROM files WHERE MATCH(tags, name, company, brand) AGAINST ('$seach_ar' IN boolean MODE)"); 
*/

?>
