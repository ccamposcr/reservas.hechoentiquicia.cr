<?php
	$curl = curl_init('f5.cr/deleteAllTmpReservationsEndDay');
	$resp = curl_exec($curl);
	curl_close($curl);
	echo $resp;
?>