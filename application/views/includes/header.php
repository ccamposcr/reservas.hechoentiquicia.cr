<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Reservas | Hecho en Tiquicia</title>
        <meta name="description" content="">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->


        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/style.css" />
    </head>

    <body ng-app="App">
        
        <div id="mainWrapper" class="clearfix">

            <div id="divWrapperHeader" class="clearfix" ng-controller="headerController">
                <div id="divContentHeader" class="clearfix">
                    <a id="logo" class="clearfix" href="<?php echo base_url(); ?>">
                        <!--<img id="mainLogo" src="<?php echo base_url(); ?>img/<?php echo $this->uri->segment(1) ?>logo.png" alt="F5"/>-->
                    </a>
                    <ul id="mainNav" class="clearfix" ng-init="setActive()">
                        <?php foreach ($button as $index => $row) {
                            $url_segment = ($index == 0) ? '' : $this->uri->segment(1);
                            echo '<li class="' . $row->type . '"><a href="' . base_url() . $url_segment . $row->url .'">'. $row->text .'</a></li>';
                        }?>
                    </ul>
                </div>
            </div>