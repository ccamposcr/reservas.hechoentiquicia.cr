<div id="divContent" class="divMainContentGallery" ng-controller="galleryController" ng-init="loadGallery()">
	<h1>Galer&iacute;a</h1>

	<div role="tabpanel">

	  <!-- Nav tabs -->
	  <ul class="nav nav-tabs" role="tablist">
	    <li role="album" class="active"><a class="album-header" ng-click="loadGallery('#album1')" href="#album1" aria-controls="album1" role="tab" data-toggle="tab">&Aacute;lbum 1</a></li>
	    <li role="album"><a class="album-header" ng-click="loadGallery('#album2')" href="#album2" aria-controls="album2" role="tab" data-toggle="tab">&Aacute;lbum 2</a></li>
	    <li role="album"><a class="album-header" ng-click="loadGallery('#album3')" href="#album3" aria-controls="album3" role="tab" data-toggle="tab">&Aacute;lbum 3</a></li>
	    <li role="album"><a class="album-header" ng-click="loadGallery('#album4')" href="#album4" aria-controls="album4" role="tab" data-toggle="tab">&Aacute;lbum 4</a></li>
	  </ul>

	  <!-- Tab panes -->
	  <div class="tab-content">
	    <div role="tabpanel" class="tab-pane active" id="album1">
	    	<div class="slider flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
			  	</ul>
			</div>

			<div class="carousel flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				</ul>
			</div>
	    </div>
	    <div role="tabpanel" class="tab-pane" id="album2">
	    	<div class="slider flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
			  	</ul>
			</div>

			<div class="carousel flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				</ul>
			</div>
	    </div>
	    <div role="tabpanel" class="tab-pane" id="album3">
	    	<div class="slider flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
			  	</ul>
			</div>

			<div class="carousel flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				</ul>
			</div>
	    </div>
	    <div role="tabpanel" class="tab-pane" id="album4">
	    	<div class="slider flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
			  	</ul>
			</div>

			<div class="carousel flexslider">
			 	<ul class="slides">
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_2.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_3.jpg"/></li>
				    <li><img src="<?php echo base_url(); ?>img/gallery/picture_1.jpg"/></li>
				</ul>
			</div>
	    </div>

	  </div>
	</div>
</div>

