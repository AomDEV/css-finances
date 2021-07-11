<link rel="stylesheet" href="banks.css" />
<?php
$banks = json_decode(file_get_contents("banks.json"),true);
foreach(array_keys($banks["th"]) as $bank){
    echo "<div style='margin-bottom:0.2em;'>";
    echo "<i class='bank bank-{$bank} shadow' style='margin-right:5px;'></i> ";
    echo "<b>bank-{$bank}</b> <i style='color:grey;'>({$banks["th"][$bank]["nice_name"]})</i>";
    echo "</div>";
}
echo "<div style='margin-top:1em;font-size:0.75em;'>";
echo "Reference: <i style='color:grey;'><a href='https://github.com/AomDEV/css-finances'>https://github.com/AomDEV/css-finances</a></i>";
echo "</div>";
?>