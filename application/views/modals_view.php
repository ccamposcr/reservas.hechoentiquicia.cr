<div ng-controller="modalController as $modalCtrl" class="modal-demo">
    <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">I'm a modal!</h3>
        </div>
        <div class="modal-body" id="modal-body">
            <ul>
                <li ng-repeat="item in $modalCtrl.items">
                    <a href="#" ng-click="$event.preventDefault(); $modalCtrl.selected.item = item">{{ item }}</a>
                </li>
            </ul>
            Selected: <b>{{ $modalCtrl.selected.item }}</b>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="$modalCtrl.ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="$modalCtrl.cancel()">Cancel</button>
        </div>
    </script>
    <script type="text/ng-template" id="stackedModal.html">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title-{{name}}">The {{name}} modal!</h3>
        </div>
        <div class="modal-body" id="modal-body-{{name}}">
            Having multiple modals open at once is probably bad UX but it's technically possible.
        </div>
    </script>

    <button type="button" class="btn btn-default" ng-click="$modalCtrl.open()">Open me!</button>
    <div ng-show="$modalCtrl.selected">Selection from a modal: {{ $modalCtrl.selected }}</div>
    <div class="modal-parent">
    </div>
</div>