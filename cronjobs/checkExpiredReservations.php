<?php
	$curl = curl_init('f5.cr/checkExpiredReservations');
	$resp = curl_exec($curl);
	curl_close($curl);
	echo $resp;
?>