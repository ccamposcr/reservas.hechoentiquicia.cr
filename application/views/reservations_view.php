
    <div  id="divContent" ng-click="onClickParentContainer()" ng-controller="reservationController">
        <h1>Reservaciones</h1>
        <div id="pitchs" ng-if="pitchsContainer">
            <ul>
                <li ng-repeat="data in pitchs">
                    <a class="{{(pitchValue == data.id_pitch) ? 'active' : ''}}" href="<?php echo base_url() . $this->uri->segment(1) . '/{{data.id_pitch}}/' . 'reservaciones' ?>">Cancha {{data.id_pitch}}</a>
                </li>
            </ul>
            <?php
                $pitch = $this->uri->segment(2);
                $group = $this->uri->segment(1);
            ?>
            <input type="hidden" value="<?=$pitch?>" id="pitch" ng-model="pitchValue"/>
            <input type="hidden" value="<?=$group?>" id="group" ng-model="groupValue"/>
        </div>
        <div id="calendar">
        	<?=$calendar?>
        	<?php
	        	$year = $this->uri->segment(4);
	        	$month = $this->uri->segment(5);
        
            $year = ($year == '') ? date("Y", time()) : $year;
            $month = ($month == '') ? date("m", time()) : $month; 

            $isAdminUser = (!!$this->session->userdata('logged_in')) ? '1' : '0';

			     ?>
          <input type="hidden" value="<?=$year?>" id="year" ng-model="yearValue"/>
		      <input type="hidden" value="<?=$month?>" id="month" ng-model="monthValue"/>
          <input type="hidden" value="" id="day" ng-model="dayValue"/>
          <input type="hidden" value="" id="team_id" ng-model="teamIDValue"/>
          <input type="hidden" value="" id="reservation_time" ng-model="reservationTimeValue"/>
          <input type="hidden" value="<?=$isAdminUser?>" id="isAdminUser" ng-model="isAdminUserValue"/>
        </div>
        <div id="dailyResevations" ng-init="getDateFromServer()" ng-if="dailyResevationsActive">
            <ul id="timeAndTeamInfo">
                <li>Hora</li>
                <li>Equipo 1</li>
                <li>Equipo 2</li>
            </ul>
            <ul id="reservations" ng-if="isDateForBookingValid() || !isDateForBookingValid() && isAdminUser()">
                <li class="row" ng-repeat="data in reservations">
                    <span class="reservation-time" data-time="{{timesForReservations[$index]}}">{{times[$index]}}</span>
                    <span ng-if="!!reservation.id && $index+1 == reservation.team_id && $index+1 == 1 && !isAdminUser()" class="blocked class1 {{reservation.type_reservation == 1 ? 'completa' : ''}}" data-team="{{$index+1}}" ng-repeat="reservation in data">
                        <span>Reservado por:</span> {{reservation.name}} {{reservation.lastname}}
                    </span>
                    <span ng-if="!!reservation.id && $index+1 == reservation.team_id && $index+1 == 1 && isAdminUser()" class="blocked class2 {{reservation.type_reservation == 1 ? 'completa' : ''}} showInfo" data-team="{{$index+1}}" ng-repeat="reservation in data">
                        <span>Reservado por:</span>  {{reservation.name}} {{reservation.lastname}}
                    </span>
                    <span ng-if="!reservation.id && $index+1 == 1 || $index+1 == 2 && !!data[$index - 1].id && !data[$index].id" class="available" data-toggle="tooltip" data-delay='{ show: 10, hide: 50 }' data-placement="left" title="Haga click aquí para Reservar en Línea" data-team="{{$index+1}}" ng-repeat="reservation in data" ng-click="($index+1 == 2 && !!data[$index - 1].id || $index+1 == 1 && !!data[$index + 1].id ) ? fields.typeReservationSelected = 'reto' : fields.typeReservationSelected = 'normal'">{{($index+1 == 2 && !!data[$index - 1].id) ? 'Equipo 1 Busca Reto' : ''}}</span>
                    <span ng-if="!reservation.id && $index+1 == 2 && !data[$index - 1].id" class="locked" data-team="{{$index+1}}" ng-repeat="reservation in data"></span>
                    <span ng-if="!!reservation.id && $index+1 == reservation.team_id && $index+1 == 2 && !isAdminUser()" class="blocked class3 {{reservation.type_reservation == 1 ? 'completa' : ''}}" data-team="{{$index+1}}" ng-repeat="reservation in data">
                        <span>Reservado por:</span>  {{reservation.name}} {{reservation.lastname}}
                    </span>
                    <span ng-if="!!reservation.id && $index+1 == reservation.team_id && $index+1 == 2 && isAdminUser()" class="blocked class4 {{reservation.type_reservation == 1 ? 'completa' : ''}} showInfo" data-team="{{$index+1}}" ng-repeat="reservation in data">
                        <span>Reservado por:</span>  {{reservation.name}} {{reservation.lastname}}
                    </span>
                </li>
            </ul>
            <ul id="reservations" ng-if="!isDateForBookingValid() && !isAdminUser()">
                <li class="row" ng-repeat="data in reservations">
                    <span class="reservation-time" data-time="{{timesForReservations[$index]}}">{{times[$index]}}</span>
                    <span ng-if="($index+1 == reservation.team_id && $index+1 == 1) || ($index+1 == reservation.team_id && $index+1 == 2)" class="blocked class5 {{reservation.type_reservation == 1 ? 'completa' : ''}}" data-team="{{$index+1}}" ng-repeat="reservation in data">
                        <span ng-if="!!reservation.name && !! reservation.lastname">Reservado por:</span>  {{reservation.name}} {{reservation.lastname}}
                    </span>
                    <span ng-if="(!($index+1 == reservation.team_id && $index+1 == 1) && !($index+1 == reservation.team_id && $index+1 == 2) && !data[$index - 1].id) || (!reservation.id && $index+1 == 1 || $index+1 == 2 && !!data[$index - 1].id && !data[$index].id)" class="blocked {{reservation.type_reservation == 1 ? 'completa' : ''}}" data-team="{{$index+1}}" ng-repeat="reservation in data"></span>
                </li>
            </ul>
        </div>
        <?php 
          if( $isAdminUser ){
        ?>
          <button type="button" class="btn btn-primary searchBtn">Buscar</button>
        <?php
          } 
        ?>
    </div>
    <div id="modals" ng-controller="modalController" ng-init="getRates()">
        <div class="modal fade" id="formReservationModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" ng-init="isAdminUser() && (bookingType = 'bookingOnLine')">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" ng-hide="bookingType == 'bookingOnLine'"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">Reservaciones<br/><span>Fecha y Hora a Reservar: <span id="reservationInfo"></span></span></h4>
                <p ng-if="bookingType == 'bookingOnLine'">Tiempo Restante: <span>{{time}}</span></p>
              </div>
              <div class="modal-body">
                <div ng-hide="bookingType == 'bookingByCall' || bookingType == 'bookingOnLine'">
                    <h3>Elija el modo de reservaci&oacute;n</h3>
                    <ol>
                        <li>
                            <dl>
                                <dt>Reservaci&oacute;n en l&iacute;nea: le permite reservar y pagar la cancha usando su tarjeta de cr&eacute;dito o d&eacute;bito.</dt>
                                    <dd class="radio"><input id="bookingOnLine" class="bookingOnLine" type="radio" name="bookingOnLine" value="bookingOnLine" ng-model="bookingType"><label for="bookingOnLine">Reservar en l&iacute;nea</label></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>También puede reservar su cancha mediante una llamada telef&oacute;nica.</dt>
                                    <dd class="radio"><input id="bookingByCall" type="radio" name="bookingByCall" value="bookingByCall" ng-model="bookingType"><label for="bookingByCall">Reservar por tel&eacute;fono</label></dd>
                            </dl>
                        </li>
                    </ol>
                </div>

                <div id="bookingByCall" ng-show="bookingType == 'bookingByCall'">
                    <h3>Reservaci&oacute;n por tel&eacute;fono</h3>
                    <p>Para reservar llame a los siguientes n&uacute;meros: <a href="tel:"></a> &oacute; <a href="tel:"></a></p>
                </div>
                <div id="bookingOnLine" ng-show="bookingType == 'bookingOnLine'">
                    <div id="bookingForm">
                        <form name="bookingForm">
                            <dl>
                                <dt>Informaci&oacute;n Personal 
                                  <?php 
                                  if( $isAdminUser ){
                                  ?>
                                    <button type="button" class="btn btn-primary selectUserBtn">Seleccionar Usuario</button>
                                  <?php
                                    } 
                                  ?>
                                </dt>
                                    <dd class="contentInfoForm">
                                        <label>Nombre</label><input type="text" class="form-control capitalize-text" ng-model="fields.name" name="name" required/>
                                        <span class="error" ng-show="bookingForm.name.$error.required && bookingForm.name.$dirty">Por favor ingrese su Nombre</span>
                                    </dd>
                                    <dd class="contentInfoForm">
                                        <label>1<sub>er</sub> Apellido</label><input type="text" class="form-control capitalize-text" ng-model="fields.lastname1" name="lastname1" required/>
                                        <span class="error" ng-show="bookingForm.lastname1.$error.required && bookingForm.lastname1.$dirty">Por favor ingrese su 1<sub>er</sub>Apellido</span>
                                    </dd>
                                    <dd class="contentInfoForm">
                                        <label>2<sub>do</sub> Apellido</label><input type="text" class="form-control capitalize-text" ng-model="fields.lastname2" name="lastname2" required/>
                                        <span class="error" ng-show="bookingForm.lastname2.$error.required && bookingForm.lastname2.$dirty">Por favor ingrese su 2<sub>do</sub>Apellido</span>
                                    </dd>
                                    <dd class="contentInfoForm">
                                        <label>Email:</label><input type="email"  class="form-control" ng-model="fields.email" name="email"/>
                                        <!--<span class="error" ng-show="bookingForm.email.$error.required && bookingForm.email.$dirty">Por favor ingrese su correo el&eacute;ctronico</span>-->
                                        <span class="error" ng-show="bookingForm.email.$dirty && bookingForm.email.$invalid">Por favor ingrese un correo el&eacute;ctronico v&aacute;lido</span>
                                    </dd>
                                    <dd class="contentInfoForm">
                                        <label>Celular:</label><input type="tel" class="form-control" ng-model="fields.phone" name="phone" ng-minlength="8" ng-maxlength="8" ng-pattern="/^\d+$/" required/>
                                        <span class="error" ng-show="bookingForm.phone.$dirty && (bookingForm.phone.$error.minlength || bookingForm.phone.$error.maxlength) || bookingForm.phone.$dirty && bookingForm.phone.$invalid">Por favor ingrese un t&eacute;lefono de 8 n&uacute;meros</span>
                                        <span class="error" ng-show="bookingForm.phone.$error.required && bookingForm.phone.$dirty">Por favor ingrese su celular</span>
                                    </dd>
                                <dt>Tipo de Reservaci&oacute;n</dt>
                                    <dd ng-if="fields.typeReservationSelected == 'normal'" class="radio"><input id="complete" type="radio" name="typeReservation" value="1" ng-model="fields.typeReservation" required><label for="complete">Completa (Marque esta opci&oacute;n si ya tiene formado Equipo 1 y Equipo 2)</label></dd>
                                    <dd class="radio"><input id="challenge" type="radio" name="typeReservation" value="2" ng-model="fields.typeReservation" ng-click="fields.setReferee = true" ng-checked="(fields.typeReservationSelected == 'reto') && (fields.typeReservation = 2)" required><label for="challenge">Reto <span ng-if="fields.typeReservationSelected == 'normal'">(Marque esta opci&oacute;n si necesita Equipo 2 para Reto)</span></label></dd>
                                    <!--<span class="error" ng-show="!fields.typeReservation">Por favor seleccione una opci&oacute;n</span>-->
                                <dt>Opciones Adicionales</dt>
                                    <dd class="checkbox"><input id="setReferee" name="setReferee" type="checkbox" ng-model="fields.setReferee" ng-disabled="fields.typeReservation==2" ng-checked="(fields.typeReservationSelected == 'reto') && (fields.setReferee = true)"><label for="setReferee">Pagar &Aacute;rbitro (Reto: se cobra obligatoriamente la mitad del costo del &aacute;rbitro<br/>en ambos equipos)</label></dd>
                                    <dd ng-if="fields.typeReservationSelected == 'normal'" class="checkbox"><input id="setPitchAllWeeks" name="setPitchAllWeeks" type="checkbox" ng-model="fields.setPitchAllWeeks"><label for="setPitchAllWeeks">Cancha Fija(Reservar esta cancha este mismo día todas las semanas)<br/>*Se cobra d&eacute;posito</label><button ng-if="fields.setPitchAllWeeks" type="button" class="btn btn-primary checkAvailabilityBtn">Comprobar Disponibilidad</button></dd>
                            </dl>
                            
                        </form>
                    </div>
                    <?php 
                    if( !$isAdminUser ){
                    ?>
                    <div id="carDataForm">
                        <form name="carDataForm">
                            <dl>
                                <dd class="contentInfoForm paymentInformation">
                                    <h4>Detalle a cobrar:</h4>
                                    <!--<p><span>Cancha:</span> {{(fields.typeReservation == '1') ? rates.cancha_completa : rates.cancha_completa/2 | currency:""}} colones</p>
                                    <p ng-if="!!fields.setReferee"><span>&Aacute;rbitro:</span> {{(fields.typeReservation == '1') ? rates.arbitro : rates.arbitro/2 | currency:""}} colones</p>
                                    <p ng-if="!!fields.setPitchAllWeeks"><span>D&eacute;posito</span> (Cancha Fija): {{rates.cancha_fija_deposito | currency:""}} colones</p>
                                    <p><span>Total:</span> {{ ( (fields.typeReservation == '1') ? rates.cancha_completa * 1 : rates.cancha_completa/2 ) + ( (!!fields.setReferee) ? ( (fields.typeReservation == '1') ? rates.arbitro * 1 : rates.arbitro/2 ) : 0 ) + ( (!!fields.setPitchAllWeeks) ? rates.cancha_fija_deposito * 1 : 0 ) | currency:""}} colones</p>-->
                                    <table>
                                      <tr>
                                        <th>Detalle</th>
                                        <th>Monto</th>
                                      </tr>
                                      <tr>
                                        <td>Cancha</td>
                                        <td>{{(fields.typeReservation == '1') ? specificRates.cancha_completa : specificRates.cancha_completa/2 | currency:""}} colones</td>
                                      </tr>
                                      <tr ng-if="!!fields.setReferee">
                                        <td>&Aacute;rbitro</td>
                                        <td>{{(fields.typeReservation == '1') ? specificRates.arbitro : specificRates.arbitro/2 | currency:""}} colones</td>
                                      </tr>
                                      <tr ng-if="!!fields.setPitchAllWeeks">
                                        <td>D&eacute;posito (Cancha Fija)</td>
                                        <td>{{(fields.typeReservation == '1') ? specificRates.cancha_fija_completa_deposito : specificRates.cancha_fija_reto_deposito | currency:""}} colones</td>
                                      </tr>
                                      <tr class="total">
                                        <td>Total</td>
                                        <td>{{ ( (fields.typeReservation == '1') ? specificRates.cancha_completa * 1 : specificRates.cancha_completa/2 ) + ( (!!fields.setReferee) ? ( (fields.typeReservation == '1') ? specificRates.arbitro * 1 : specificRates.arbitro/2 ) : 0 ) + ( (!!fields.setPitchAllWeeks) ? ( (fields.typeReservation == '1') ? specificRates.cancha_fija_completa_deposito * 1 : specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) | currency:""}} colones</td>
                                      </tr>
                                    </table>
                                </dd>
                                <dd class="contentInfoForm"><label>Nombre:</label> {{fields.name}}<br/><label>Apellido:</label> {{fields.lastname1}}</dd>
                                <dd class="contentInfoForm">
                                    <label>Tarjeta</label>
                                    <input type="text" class="form-control input_number" ng-model="fields.number" name="number" required ng-pattern="/^\d+$/"/>
                                    <span class="error" ng-show="carDataForm.number.$error.required && carDataForm.number.$dirty">Por favor ingrese su Tarjeta</span>
                                    <span class="error" ng-show="carDataForm.number.$invalid && carDataForm.number.$dirty">Por favor ingrese &uacute;nicamente n&uacute;meros</span>
                                </dd>
                                <dd class="contentInfoForm">
                                    <label>Tipo</label>
                                    <select ng-model="fields.type" name="type" required class="form-control">
                                        <option value="visa">Visa</option>
                                        <option value="mastercard">Mastercard</option>
                                        <option value="discover">Discover</option>
                                        <option value="amex">Amex</option>
                                    </select>
                                    <span class="error" ng-show="carDataForm.type.$error.required && carDataForm.type.$dirty">Por favor seleccione un tipo de tarjeta</span>
                                </dd>
                                <dd class="contentInfoForm">
                                    <label>Mes Expiraci&oacute;n</label>
                                    <select ng-model="fields.expire_month" name="expire_month" required class="form-control">
                                        <option value="1">1 - Enero</option>
                                        <option value="2">2 - Febrero</option>
                                        <option value="3">3 - Marzo</option>
                                        <option value="4">4 - Abril</option>
                                        <option value="5">5 - Mayo</option>
                                        <option value="6">6 - Junio</option>
                                        <option value="7">7 - Julio</option>
                                        <option value="8">8 - Agosto</option>
                                        <option value="9">9 - Septiembre</option>
                                        <option value="10">10 - Octubre</option>
                                        <option value="11">11 - Noviembre</option>
                                        <option value="12">12 - Diciembre</option>
                                    </select>
                                    <span class="error" ng-show="carDataForm.expire_month.$error.required && carDataForm.expire_month.$dirty">Por favor seleccione el mes de expiraci&oacute;n</span>
                                </dd>
                                <dd class="contentInfoForm">
                                    <label>A&ntilde;o Expiraci&oacute;n</label>
                                    <select ng-model="fields.expire_year" name="expire_year" required class="form-control">
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </select>
                                    <span class="error" ng-show="carDataForm.expire_year.$error.required && carDataForm.expire_year.$dirty">Por favor seleccione el a&ntilde;o de expiraci&oacute;n</span>
                                </dd>
                                <dd class="contentInfoForm">
                                    <label>C&oacute;digo de Validaci&oacute;n (cvv)</label>
                                    <input type="text" class="form-control input_ccv" ng-model="fields.cvv" name="cvv" required ng-minlength="3" ng-maxlength="4" ng-pattern="/^\d+$/"/>
                                    <span class="error" ng-show="carDataForm.cvv.$error.required && carDataForm.cvv.$dirty">Por favor ingrese su ccv</span>
                                    <span class="error" ng-show="carDataForm.cvv.$invalid && carDataForm.cvv.$dirty">Por favor ingrese &uacute;nicamente n&uacute;meros</span>
                                    <span class="error" ng-show="(carDataForm.cvv.$error.minlength || carDataForm.cvv.$error.maxlength) && carDataForm.cvv.$dirty">Por favor ingrese min&iacute;mo 3 o m&aacute;ximo 4 n&uacute;meros</span>
                                </dd>
                                <dd ng-if="!!fields.response_error" class="contentInfoForm">
                                    <span class="error">Error: Por favor corriga los siguientes campos:</span>
                                    <span class="error" ng-repeat="error in fields.response_error">{{error.field}} {{error.issue}}</span>
                                </dd>
                            </dl>
                        </form>
                    </div>
                    <?php
                    }
                    ?>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" ng-hide="bookingType == 'bookingOnLine'">Cerrar</button>
                <button id="cancelReservationBtn" type="button" class="btn btn-danger" data-toggle="confirmation" ng-show="bookingType == 'bookingOnLine'" data-btn-ok-label="Seguir" 
                data-btn-ok-icon="glyphicon glyphicon-share-alt" data-btn-ok-class="btn-success" data-btn-cancel-label="Salir" data-btn-cancel-icon="glyphicon glyphicon-ban-circle" 
                data-btn-cancel-class="btn-danger" data-title="Continuar la reservaci&oacute;n?">Cancelar</button>
                <?php 
                  if( $isAdminUser ){
                  ?>
                <input for="bookingForm" type="submit" class="btn btn-primary reserveBtn" ng-if="bookingType == 'bookingOnLine'" value="Reservar" ng-disabled="bookingForm.$invalid"/>
                <?php
                  } else{
                ?>
                <input for="bookingForm" type="submit" class="btn btn-primary insertCardData" ng-if="bookingType == 'bookingOnLine' && fields.stepReservation == 1" value="Continuar" ng-disabled="bookingForm.$invalid"/>
                <input for="bookingForm" type="submit" class="btn btn-primary returnToFormReservation" ng-if="bookingType == 'bookingOnLine' && fields.stepReservation == 2" value="Regresar"/>
                <input for="bookingForm" type="submit" class="btn btn-primary reserveAndPayBtn" ng-if="bookingType == 'bookingOnLine' && fields.stepReservation == 2" value="Reservar" ng-disabled="carDataForm.$invalid"/>
                <input for="bookingForm" type="submit" class="hide reserveBtn" id="reserveAfterPayBtn" ng-if="bookingType == 'bookingOnLine' && fields.stepReservation == 2">
                <?php
                  }
                ?>
                <!--<button type="button" class="btn btn-primary">Send message</button>-->
              </div>
             <?php 
                if( $isAdminUser ){
              ?>
              <div ng-if="fields.typeReservation != ''" class="paymentInformation">
                <h4>Detalle a cobrar:</h4>
                <!--<p><span>Cancha:</span> {{(fields.typeReservation == '1') ? rates.cancha_completa : rates.cancha_completa/2 | currency:""}} colones</p>
                <p ng-if="!!fields.setReferee"><span>&Aacute;rbitro:</span> {{(fields.typeReservation == '1') ? rates.arbitro : rates.arbitro/2 | currency:""}} colones</p>
                <p ng-if="!!fields.setPitchAllWeeks"><span>D&eacute;posito</span> (Cancha Fija): {{rates.cancha_fija_deposito | currency:""}} colones</p>
                <p><span>Total:</span> {{ ( (fields.typeReservation == '1') ? rates.cancha_completa * 1 : rates.cancha_completa/2 ) + ( (!!fields.setReferee) ? ( (fields.typeReservation == '1') ? rates.arbitro * 1 : rates.arbitro/2 ) : 0 ) + ( (!!fields.setPitchAllWeeks) ? rates.cancha_fija_deposito * 1 : 0 ) | currency:""}} colones</p>-->
                <table>
                  <tr>
                    <th>Detalle</th>
                    <th>Monto</th>
                  </tr>
                  <tr>
                    <td>Cancha</td>
                    <td>{{(fields.typeReservation == '1') ? specificRates.cancha_completa : specificRates.cancha_completa/2 | currency:""}} colones</td>
                  </tr>
                  <tr ng-if="!!fields.setReferee">
                    <td>&Aacute;rbitro</td>
                    <td>{{(fields.typeReservation == '1') ? specificRates.arbitro : specificRates.arbitro/2 | currency:""}} colones</td>
                  </tr>
                  <tr ng-if="!!fields.setPitchAllWeeks">
                    <td>D&eacute;posito (Cancha Fija)</td>
                    <td>{{(fields.typeReservation == '1') ? specificRates.cancha_fija_completa_deposito : specificRates.cancha_fija_reto_deposito | currency:""}} colones</td>
                  </tr>
                  <tr class="total">
                    <td>Total</td>
                    <td>{{ ( (fields.typeReservation == '1') ? specificRates.cancha_completa * 1 : specificRates.cancha_completa/2 ) + ( (!!fields.setReferee) ? ( (fields.typeReservation == '1') ? specificRates.arbitro * 1 : specificRates.arbitro/2 ) : 0 ) + ( (!!fields.setPitchAllWeeks) ? ( (fields.typeReservation == '1') ? specificRates.cancha_fija_completa_deposito * 1 : specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) | currency:""}} colones</td>
                  </tr>
                </table>
              </div>
              <?php
                }
               ?>
            </div>
          </div>
        </div>
<!-- reservation-watching-by-other-user-modal -->
        <div class="modal fade" id="reservation-watching-by-other-user-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>En este momento esta casilla está siendo vista por otro usuario.<br/>Por favor intente m&aacute;s tarde.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
<!-- reservation-in-use-by-other-user-modal -->
        <div class="modal fade" id="reservation-in-use-by-other-user-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>En este momento esta casilla está siendo reservada por otro usuario.<br/>Por favor intente con otra casilla.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade loading" id="set-pitch-all-weeks-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Por favor no cierre el navegador. El sistema está reservando la cancha fija el d&iacute;a elegido todas las semanas</p>
                <img src="<?php echo base_url(); ?>img/loading.gif" width="127" height="128"/>
              </div>
            </div>
          </div>
        </div>

<!-- loading-modal -->
        <div class="modal fade loading" id="loading-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Cargando ...</p>
                <img src="<?php echo base_url(); ?>img/loading.gif" width="127" height="128"/>
              </div>
            </div>
          </div>
        </div>
<!-- sending-email -->
        <div class="modal fade loading" id="sending-email-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Enviando email, por favor no cierre esta ventana ...</p>
                <img src="<?php echo base_url(); ?>img/loading.gif" width="127" height="128"/>
              </div>
            </div>
          </div>
        </div>
<!-- sending-email -->
        <div class="modal fade loading" id="sending-sms-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Enviando SMS, por favor no cierre esta ventana ...</p>
                <img src="<?php echo base_url(); ?>img/loading.gif" width="127" height="128"/>
              </div>
            </div>
          </div>
        </div>
<!-- processing-credit-card-modal -->
        <div class="modal fade loading" id="processing-card-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Procesando Tarjeta, por favor no cierre esta ventana ...</p>
                <img src="<?php echo base_url(); ?>img/loading.gif" width="127" height="128"/>
              </div>
            </div>
          </div>
        </div>
<!-- already-reserved-modal -->
        <div class="modal fade" id="already-reserved-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Esta casilla ya fue reservada. Por favor escoja otra casilla para reservar</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
<!-- successful-reserved-modal -->
        <div class="modal fade" id="successful-reserved-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">F5 Reservaciones</h4>
              </div>
              <div class="modal-body">
                <p>Su reservacion ha sido creada satisfactoriamente</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
  <!-- check-availability-modal -->
            <div class="modal fade" id="check-availability-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Comprobar Disponibilidad</h4>
                  </div>
                  <div class="modal-body">
                    <div class="{{(days[1]) ? 'available' : 'busy'}}" ng-repeat="days in daysAvailables">
                      <span>{{days[0]}}</span><span>{{(days[1]) ? 'Disponible' : 'Ocupado'}}</span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

        <?php 
          if( $isAdminUser ){
        ?>
<!-- show-info-modal -->
            <div class="modal fade" id="show-info-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title"><span ng-if="isAdminUser() && getRol() == isRol('Dependiente')">Informaci&oacute;n</span> <span ng-if="isAdminUser() && getRol() == isRol('Admin')">Edici&oacute;n</span> de la Reservaci&oacute;n</h4>
                  </div>
                  <div class="modal-body">
                     <div ng-if="isAdminUser() && getRol() == isRol('Dependiente')">
                       <div class="divContentShowInfoModal"><label>Nombre:</label><span> {{completeInfo.name}}</span></div>
                       <div class="divContentShowInfoModal"><label>Apellidos:</label><span> {{completeInfo.lastname}}</span></div>
                       <div class="divContentShowInfoModal"><label>Tel&eacute;fono:</label><span> {{completeInfo.phone}}</span></div>
                       <div class="divContentShowInfoModal"><label>Email:</label><span> {{completeInfo.email}}</span></div>
                     </div>
                     <div ng-if="isAdminUser() && getRol() == isRol('Admin')" id="{{completeInfo.id}}">
                        <div ng-if="completeInfo.id_group_all_weeks != '0' && completeInfo.id_group_all_weeks != ''" class="divContentShowInfoModal pitchInformation">
                            <p>Esta reservaci&oacute;n forma parte de una reserva de cancha fija.</p>
                        </div>
                        <form id="editReservationForm" name="editReservationForm">
                            <div class="divContentShowInfoModal">
                                <label>Nombre:</label>
                                <input class="capitalize-text" ng-model="completeInfo.name" type="text" name="name" required/>
                                <span class="error" ng-show="editReservationForm.name.$error.required && editReservationForm.name.$dirty">Por favor ingrese el Nombre</span>
                            </div>
                            <div class="divContentShowInfoModal">
                                <label>Apellidos:</label>
                                <input class="capitalize-text" ng-model="completeInfo.lastname" type="text" name="lastname" required/>
                                <span class="error" ng-show="editReservationForm.lastname.$error.required && editReservationForm.lastname.$dirty">Por favor ingrese los Apellidos</span>
                            </div>
                            <div class="divContentShowInfoModal">
                                <label>Celular:</label>
                                <input ng-model="completeInfo.phone" type="tel" name="phone" required ng-minlength="8" ng-maxlength="8" ng-pattern="/^\d+$/" />
                                <span class="error" ng-show="editReservationForm.phone.$dirty && (editReservationForm.phone.$error.minlength || editReservationForm.phone.$error.maxlength) || editReservationForm.phone.$dirty && editReservationForm.phone.$invalid">Por favor ingrese un t&eacute;lefono de 8 n&uacute;meros</span>
                                <span class="error" ng-show="editReservationForm.phone.$error.required && editReservationForm.phone.$dirty">Por favor ingrese el celular</span>
                            </div>
                            <div class="divContentShowInfoModal">
                                <label>Email:</label>
                                <input ng-model="completeInfo.email" type="email" name="email"/>
                                <span class="error" ng-show="editReservationForm.email.$dirty && editReservationForm.email.$invalid">Por favor ingrese un correo el&eacute;ctronico v&aacute;lido</span>
                            </div>
                            <div ng-if="completeInfo.id_group_all_weeks != '0' && completeInfo.id_group_all_weeks != ''" class="divContentShowInfoModal pitchInformation">
                                <input type="checkbox" ng-model="fields.editAllCccurrences" name="editAllCccurrences" /><span>(Seleccione si desea actualizar las dem&aacute;s ocurrencias de esta cancha fija).</span>
                            </div>
                            <button type="submit" ng-disabled="editReservationForm.$invalid" ng-if="isAdminUser() && getRol() == isRol('Admin')" class="btn btn-warning saveBookingEdited" data-dismiss="modal">Actualizar <span ng-hide="fields.editAllCccurrences">Reservaci&oacute;n</span><span ng-show="fields.editAllCccurrences">Reservaciones</span></button>
                        </form>
                     </div>

                      <div class="divContentShowInfoModal"><label>Requiere &Aacute;rbitro:</label><span> {{(completeInfo.referee_required == 1) ? 'S&iacute;' : 'No'}}</span></div>
                      <div class="divContentShowInfoModal"><label>Fecha de Reservaci&oacute;n:</label><span> {{completeInfo.reservation_day}}/{{completeInfo.reservation_month}}/{{completeInfo.reservation_year}}</span></div>
                      <div class="divContentShowInfoModal"><label>Hora de Reservaci&oacute;n:</label><span> {{getCorrectTimeReservation(completeInfo.reservation_time)}}</span></div>
                      <div class="divContentShowInfoModal"><label>Usuario del sistema:</label><span> {{(completeInfo.admin_user) ? completeInfo.admin_user : 'N/A' }}</span></div>
                      <div class="divContentShowInfoModal"><label>Total Cobrado:</label><span> {{completeInfo.reservation_price}}</span></div>
                      
                      <div class="divContentShowInfoModal">
                        <div ng-if="completeInfo.id_group_all_weeks != '0' && completeInfo.id_group_all_weeks != ''" class="divContentShowInfoModal pitchInformation">
                            <input type="checkbox" ng-model="fields.deleteAllCccurrences" name="deleteAllCccurrences" /><span>(Seleccione si desea eliminar las dem&aacute;s ocurrencias de esta cancha fija).</span>
                        </div>
                        <button ng-if="isAdminUser() && getRol() == isRol('Admin')" type="button" class="btn btn-warning delete" data-dismiss="modal">Eliminar <span ng-hide="fields.deleteAllCccurrences">Reservaci&oacute;n</span><span ng-show="fields.deleteAllCccurrences">Reservaciones Fijas</span></button>
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
<!--search-modal -->
            <div class="modal fade" id="search-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Clientes</h4>
                  </div>
                  <div class="modal-body">
                    <label>Buscar:</label> <input class="searchInput" ng-model="searchText">
                    <table id="searchResults">
                      <tr><th ng-if="selectUserMode"></th><th>Nombre</th><th>Apellidos</th><th>Tel&eacute;fono</th><th>Email</th></tr>
                      <tr ng-repeat="client in clients | filter:searchText" class="rowClient">
                        <td ng-if="selectUserMode" class="client_info"><input class="client" type="radio" name="client" ng-model="fields.client" value="{{$index}}"/></td>
                        <td class="client_info capitalize-text">{{$index+1}}. {{client.name}}</td>
                        <td class="client_info capitalize-text">{{client.lastname}}</td>
                        <td class="client_info">{{client.phone}}</td>
                        <td class="client_info">{{client.email}}</td>
                        <input type="hidden" value="{{client.name}}" class="clientName" />
                        <input type="hidden" value="{{client.lastname}}" class="clientLastName" />
                        <input type="hidden" value="{{client.phone}}" class="clientPhone" />
                        <input type="hidden" value="{{client.email}}" class="clientEmail" />
                      </tr>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button ng-if="selectUserMode" type="button" class="btn btn-primary fillFormClientBtn" ng-disabled="fields.client == ''">Aceptar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

<!-- show-accounts-modal-->
            <div class="modal fade" id="show-accounts-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Modificar Cuentas</h4>
                  </div>
                  <div class="modal-body">
                    <table id="searchResults">
                      <tr><th>Usuario</th><th>Nombre asociado a la cuenta</th><th></th></tr>
                      <tr ng-repeat="account in accounts" class="rowClient">
                        <td class="client_info">{{$index+1}}. {{account.user}}</td>
                        <td class="client_info">{{account.name}}</td>
                        <td class="client_info"><a href="#" class="editAccountBtn" name="account" data-accountnametoedit="{{account.name}}" data-usertoedit="{{account.user}}">Editar</a></td>
                      </tr>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
<!-- change-account data-modal -->
            <div class="modal fade" id="edit-account-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Modificar datos de la cuenta</h4>
                  </div>
                  <div class="modal-body">
                    <form name="changePassForm">
                      <label>Usuario</label><span class="userAccountToEdit">{{fields.userAccountToEdit}}</span>
                      <label>Nombre Cuenta</label><input type="text" ng-model="fields.nameAccountToEdit" class="form-control" name="nameAccountToEdit" required/>
                      <label>Nueva contrase&ntilde;a</label><input type="password" ng-model="fields.password" class="form-control" name="password" ng-minlength="5" required/>
                      <label>Confirmaci&oacute;n contrase&ntilde;a</label><input type="password" ng-model="fields.confirmation" class="form-control" name="confirmation" ng-minlength="5" required/>
                      <span class="error" ng-show="changePassForm.password.$error.required && changePassForm.password.$dirty || changePassForm.confirmation.$error.required && changePassForm.confirmation.$dirty">Ambos campos de password son requeridos</span>
                      <span class="error" ng-show="fields.password != fields.confirmation && changePassForm.password.$dirty && changePassForm.confirmation.$dirty">Las contrase&ntilde;as deben ser iguales</span>
                      <span class="error" ng-show="changePassForm.password.$error.minlength && changePassForm.password.$dirty || changePassForm.confirmation.$error.minlength && changePassForm.confirmation.$dirty">La contrase&ntilde;a debe tener un m&iacute;nimo de 5 caracteres</span>
                      <span class="error" ng-show="changePassForm.accountName.$error.required && changePassForm.accountName.$dirty">El nombre de la cuenta es requerido</span>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary changePasswordBtn" ng-disabled="changePassForm.$invalid">Guardar</button>
                  </div>
                </div>
              </div>
            </div>

<!-- change-rates-modal -->
            <div class="modal fade" id="edit-rates-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Modificar tarifas</h4>
                  </div>
                  <div class="modal-body">
                    <form name="changeRatesForm">
                        <table>
                            <tr>
                                <th>Fin de semana</th>
                                <th>Hora inicio</th>
                                <th>Hora final</th>
                                <th>Tarifa cancha completa</th>
                                <th>Tarifa &aacute;rbitro</th>
                                <th>Tarifa C. fija completa (dep)</th>
                                <th>Tarifa C. fija reto (dep)</th>
                            </tr>
                            <tr id="{{rate.id}}" ng-repeat="rate in rates" class="rates">
                                <td>{{(rate.weekend == '1') ? 'Sí' : 'No'}}</td>
                                <td>{{rate.hora_inicio}}</td>
                                <td>{{rate.hora_final}}</td>
                                <td><input class="cancha_completa" name="cancha_completa" type="text" ng-value="{{rate.cancha_completa}}" required ng-pattern="/^\d+$/"/></td>
                                <td><input class="arbitro" name="arbitro" type="text" ng-value="{{rate.arbitro}}" required ng-pattern="/^\d+$/"/></td>
                                <td><input class="cancha_fija_completa" name="cancha_fija_completa" type="text" ng-value="{{rate.cancha_fija_completa_deposito}}" required ng-pattern="/^\d+$/"/></td>
                                <td><input class="cancha_fija_reto" name="cancha_fija_reto" type="text" ng-value="{{rate.cancha_fija_reto_deposito}}" required ng-pattern="/^\d+$/"/></td>
                            </tr>
                        </table>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary updateRatesBtn" ng-disabled="changeRatesForm.$invalid">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
        <?php
          } 
        ?>

    </div>