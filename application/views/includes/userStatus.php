<div id="userStatus">
    <?php 
    if( isset($session_data) ){
    ?>
        <input type="hidden" value="<?=$session_data['user']?>" id="user"/>
        <input type="hidden" value="<?=$session_data['id']?>" id="id_user"/>
        <input type="hidden" value="<?=$session_data['rol']?>" id="rol_user"/>
        <input type="hidden" value="<?=$session_data['name']?>" id="name_user"/>
        <input type="hidden" value="<?=$session_data['groupManager']?>" id="group_manager"/>
        <span>Bienvenido <?php echo $session_data['name'];?></span> <span ng-if="isAdminUser() && getRol() == isRol('Admin')"> | <a href="#" class="modifyAccountsBtn">Modificar Cuentas</a></span> <span ng-if="isAdminUser() && getRol() == isRol('Admin')"> | <a data-toggle="modal" data-target="#edit-rates-modal" href="#" class="modifyRatesBtn">Modificar Tarifas</a></span> | <a href="<?php echo base_url(); ?>logout">Cerrar Sesi&oacute;n</a>
    <?php
    }
    else/*( isset($adminBtn) )*/{
    ?>
        <a href="<?php echo base_url() . $this->uri->segment(1)?>/login">Administrar</a>
    <?php
    }
    ?>
</div>