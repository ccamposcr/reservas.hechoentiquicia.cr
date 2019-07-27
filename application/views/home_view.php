    <div id="divContent" class="home">
        <?php 
        if( isset($session_data) ){
        ?>
            <input type="hidden" value="<?=$session_data['user']?>" id="user"/>
            <input type="hidden" value="<?=$session_data['id']?>" id="id_user"/>
            <input type="hidden" value="<?=$session_data['rol']?>" id="rol_user"/>
            <input type="hidden" value="<?=$session_data['groupManager']?>" id="group_manager"/>
        <?php 
        }
        ?>
        <h1>Reservas</h1>
        <p>HT Digital</p>
        <h2><span>¿</span>D&oacute;nde desea reservar<span>?</span></h2>
        <div id="divContentButtons">
            <div id="goEscazuSiteBtn">
                <a href="<?php echo base_url(); ?>complejo1/1/reservaciones"><img src="<?php echo base_url(); ?>img/" alt="" height="77" width="159"></a>
            </div>
             <div id="goDesamparadosSiteBtn">
                <a href="<?php echo base_url(); ?>complejo2/1/reservaciones"><img src="<?php echo base_url(); ?>img/" alt="" height="77" width="159"></a>
            </div>

        </div>
    </div>
