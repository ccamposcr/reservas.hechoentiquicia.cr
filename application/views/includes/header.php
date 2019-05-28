<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>F5 | Canchas Fútbol 5</title>
        <meta name="description" content="">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->

        <link rel="stylesheet" href="<?php echo base_url(); ?>css/fonts.css"/>
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap.min.css"/>
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/normalize.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/flexslider.css" />
        <script src="<?php echo base_url(); ?>js/vendor/modernizr-2.6.2.min.js"></script>

        <?php if( $this->config->item('development') ){?>
        <link rel="stylesheet/less" type="text/css" href="<?php echo base_url(); ?>css/style.less" />
        <script>
          less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            functions: {},
            dumpLineNumbers: "comments",
            relativeUrls: false,
            rootpath: ":/a.com/"
          };
        </script>
        <script src="<?php echo base_url(); ?>js/vendor/less.js"></script>
        <?php
        }
        else{ 
        ?>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/style.css" />
        <?php
        }
        ?>
        
    </head>

    <body ng-app="F5App">
        
        <div id="mainWrapper" class="clearfix">

            <div id="divWrapperHeader" class="clearfix" ng-controller="headerController">
                <div id="divContentHeader" class="clearfix">
                    <a id="logo" class="clearfix" href="<?php echo base_url(); ?>">
                        <img id="mainLogo" src="<?php echo base_url(); ?>img/<?php echo $this->uri->segment(1) ?>logo.png" alt="F5"/>
                    </a>
                    <ul id="mainNav" class="clearfix" ng-init="setActive()">
                        <?php foreach ($button as $index => $row) {
                            $url_segment = ($index == 0) ? '' : $this->uri->segment(1);
                            echo '<li class="' . $row->type . '"><a href="' . base_url() . $url_segment . $row->url .'">'. $row->text .'</a></li>';
                        }?>
                    </ul>
                </div>
            </div>