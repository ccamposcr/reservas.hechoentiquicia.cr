<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Reservas | Hecho en Tiquicia</title>
        <meta name="description" content="">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/style.css" />
    </head>

    <body ng-app="App">
        
        <div id="mainWrapper">

            <div id="divWrapperHeader" ng-controller="headerController">
                <div id="divContentHeader">
                    <a id="logo" href="<?php echo base_url(); ?>">
                        <!--<img id="mainLogo" src="<?php echo base_url(); ?>img/<?php echo $this->uri->segment(1) ?>logo.png" alt="F5"/>-->
                    </a>
                    <ul id="mainNav" ng-init="setActive()">
                        <?php foreach ($button as $index => $row) {
                            $url_segment = $index != 0 ? $this->uri->segment(1) : '';
                            $url = base_url() . $url_segment . $row->url;
                            $url_str = "'" . $url . "'";
                            echo '<li class="' . $row->type . '"><a ng-class="{active: menuOptionActive == '. $url_str .'}" ng-model="menuOptionActive" href="' . $url .'">'. $row->text .'</a></li>';
                        }?>
                    </ul>
                </div>
            </div>