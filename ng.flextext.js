angular.module('flexText', [])
.directive('flexText', /* @ngInject */ function ($log) {
    return {
        restrict: 'A',
        link: function postLink  (scope, element, attributes) {
            // Check to make sure it is used on the right element.
            if ( element[0].toString() !== '[object HTMLTextAreaElement]') {
                return $log.error('Directive flexText: must be used on a textarea element');
            }
            var wrapper, pre, span;

            initialize();

            // Set up the directive.
            function initialize () {
                // Set dom elements.
                wrapper = angular.element('<div class="flex-text-wrap"/>');
                pre = angular.element('<pre/>');
                span = angular.element('<span/>');

                // DOM maniupluations.
                element.wrap(wrapper);
                pre.append(span);
                pre.append('</br></br>');
                wrapper.prepend(pre);

                // Listen for changes on the textarea element.
                element.on('input propertychange keyup change', mirror);
                function mirror () {
                    var value = element.val();
                    span.text(value.replace(/\r?\n/g, "\r\n"));
                }
            }


        }
    };
});
