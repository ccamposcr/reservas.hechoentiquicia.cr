    <div id="divContent" class="home clearfix">
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
        <h1>Canchas de f&uacute;tbol 5</h1>
        <p>En los complejos de F&uacute;tbol F5 nos complace ofrecerles el mejor servicio, con canchas de c&eacute;sped sint&eacute;tico elaboradas con tecnolog&iacute;as de punta bajo los mejores est&aacute;ndares de seguridad garantizando satisfacci&oacute;n a nuestros usuarios en cada una de sus visitas.</p>
        <h2><span>¿</span>D&oacute;nde desea reservar<span>?</span></h2>
        <div id="divContentButtons" class="clearfix">
            <div id="goEscazuSiteBtn">
                <a href="<?php echo base_url(); ?>escazu/1/reservaciones"><img src="<?php echo base_url(); ?>img/f5-escazu-button.png" alt="F5" height="77" width="159"></a>
            </div>
             <div id="goDesamparadosSiteBtn">
                <a href="<?php echo base_url(); ?>desamparados/1/reservaciones"><img src="<?php echo base_url(); ?>img/f5-desamparados-button.png" alt="F5" height="77" width="159"></a>
            </div>

        </div>
        <div class="content-column column-1">
            <p>Contamos con servicios como:</p>
            <ul class="services">
                <li>Ventas de snacks y bebidas hidratantes.</li>
                <li>Amplios camerinos para hombres y mujeres con agua caliente.</li>
                <li>Realizamos campeonatos personalizados para empresas.</li>
                <li>Conseguimos retos.</li>
                <li>&Aacute;rbitros capacitados.</li>
                <li>CCTV.</li>
                <li>Escuela de f&uacute;tbol</li>
            </ul>
        </div>
        <div class="content-column column-2">
            <p>Adem&aacute;s contamos con servicio gratuito de:</p>
            <ul class="services">
                <li>Amplio parqueo.</li>
                <li>Chalecos.</li>
                <li>Bolas.</li>
            </ul>
        </div>
    </div>
