<?php header('content-type: application/json; charset=utf-8'); 
$rows = array();

$key = $_GET['key'];
$venue = $_GET['venue'];
$category = $_GET['category'];

mysql_select_db("db99605_racevendors") or die(mysql_error());


//$phrase  = "You should eat fruits, vegetables, and fiber every day.";
//$healthy = array("fruits", "vegetables", "fiber");
//$yummy   = array("pizza", "beer", "ice cream");
//$newphrase = str_replace($healthy, $yummy, $phrase);

//$data = mysql_query("SELECT * FROM listings WHERE id='$key' OR category='$key' OR FIND_IN_SET('$key', keywords)") or die(mysql_error());

if(!$key && $category != "all") { 
	$data = mysql_query("SELECT * FROM listings WHERE category='$category' && venue='$venue' order by name ") or die(mysql_error());
} else if(!$key && $category == "all"){
	$data = mysql_query("SELECT * FROM listings WHERE venue='$venue' order by name") or die(mysql_error());
}else {
	$data = mysql_query("SELECT * FROM listings WHERE venue='$venue' OR id='$key' OR category='$key' OR category='$category' OR FIND_IN_SET('$key', keywords) order by name") or die(mysql_error());
}



while($r = mysql_fetch_assoc($data)) { $rows[] = $r;}
echo 'racevendors' . '(' . json_encode($rows) . ');';

//echo json_encode($rows);

/*
$result = mysql_query("SELECT * FROM files WHERE MATCH(tags, name, company, brand) AGAINST ('$seach_ar' IN boolean MODE)"); 
*/

?>
