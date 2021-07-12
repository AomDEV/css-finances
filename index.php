<link rel="stylesheet" href="banks.css" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<style>
    div.container-fluid{
        margin-top:1em;
    }
    div.desc{
        width:100px;
        color:grey;
        font-size:12px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        text-align:center;
    }
</style>

<div align="center">
<div class="container-fluid">
  <div class="row">
    <?php
    $banks = json_decode(file_get_contents("banks.json"),true);
    foreach(array_keys($banks["th"]) as $bank){
        echo '<div class="col-sm-1" style="margin-bottom:1em;">';
        echo "<div style='margin-bottom:0.5em;'><i class='bank bank-{$bank} shadow huge' style='margin-right:5px;'></i></div>";
        echo "<div><b>bank-{$bank}</b></div>";
        echo "<div class='desc'>{$banks["th"][$bank]["nice_name"]}</div>";
        echo "</div>";
    }
    ?>
  </div>
</div>
</div>

<div style='color:dark-grey;margin:1em;font-size:0.75em;'>
Reference: <i style='color:grey;'><a href='https://github.com/AomDEV/css-finances'>https://github.com/AomDEV/css-finances</a></i>
</div>
