<div id="divWrapperFooter" class="clearfix">
		    <div id="divContentFooter" class="clearfix">

		    	<div id="divContentInfoFooter">
		    		<span><!--F5 <?php echo $this->uri->segment(1)?>-->C&oacute;mo llegar:</span>
		    		<p><?php echo $detail ?></p>
		    	</div>
		    	
		    	<div id="contentSocialIcons" class="clearfix">
		    		<span>S&iacute;guenos en:</span>
		    		<div id="socialIcons">
			            <!--<a target="_blank" href="https://www.facebook.com/f5costarica" class="fa fa-facebook"></a>-->
			            <!--<a href="#" class="fa fa-twitter"></a>
			            <a href="#" class="fa fa-youtube"></a>-->  
			        </div>	     
		    	</div>	       

		    	<div id="infoContact" class="clearfix">
		    		<span>Cont&aacute;ctenos:</span> 	 
			    	<ul>
			    		<li><span class="fa fa-map-marker"></span><a target="_blank"  href="<?php echo $mapUrl ?>">Google Maps</a></li>
			            <li><span class="fa fa-phone-square"></span><a target="_blank" href="tel:<?php echo $phone1 ?>"><?php echo $phone1 ?></a><a class="phone-2" target="_blank" href="tel:<?php echo $phone2 ?>"><?php echo $phone2 ?></a></li>
			            <li><span class="fa fa-envelope"></span><a target="_blank"  href="mailto:<?php echo $email ?>"><?php echo $email ?></a></li>
			            <li><span><img src="<?php echo base_url(); ?>img/img_waze1.png"/></span><a target="_blank"  href="<?php echo $waze ?>">Waze</a></li>
			            <!--<li><span class="fa fa-skype"></span><a href="skype:<?php echo $skype ?>?call"><?php echo $skype ?></a></li>-->
			    	</ul>
		            
			    </div>

		        <p id="copy-right">©2019 HT Digital | Hecho en Tiquicia</p>
		        <span id="siteseal"><script type="text/javascript" src="https://seal.godaddy.com/getSeal?sealID=cMzcYREMtupIS3ZxQa3zaq8M3sZ6FgK8xmOFZDbVVjvuzPXaBzvWXXHmV5Kx"></script></span>
		    </div>
		</div>
	</div>

	<script src="<?php echo base_url(); ?>js/vendor.js"></script>
	<script src="<?php echo base_url(); ?>js/util.js"></script>
	<script src="<?php echo base_url(); ?>js/components.js"></script>

    </body>
</html>
