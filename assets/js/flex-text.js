angular.module('flex-text', [])
.directive('flexText', /* @ngInject */ function ($log) {
    return {
        restrict: 'A',
        link: function postLink  (scope, element, attributes) {
            // Check to make sure it is used on the right element.
            if ( element[0].toString() !== '[object HTMLTextAreaElement]') {
                return $log.error('Directive flexText: must be used on a textarea element');
            }

            var wrapper, pre, span;

            // Call the initialize function.
            initialize();

            // Cleanup the element
            element.on('$destroy', cleanUp);

            // Set up the directive.
            function initialize () {
                // Set dom elements.
                wrapper = angular.element('<div class="flex-text-wrap"/>');
                pre = angular.element('<pre aria-hidden="true"/>');
                span = angular.element('<span/>');

                // DOM maniupluations.
                element.wrap(wrapper);
                pre.append(span);
                pre.append('</br></br>');
                wrapper.prepend(pre);

                // Listen for changes on the textarea element.
                element
                    .on('input propertychange keyup change', mirror)
                    .on('blur', setWrapperMaxHeight)
                    .on('focus', removeWrapperMaxHeight);
                // Sets value to span element to match
                function mirror () {
                    var value = element[0].value;
                    span[0].textContent = value.replace(/\r?\n/g, "\r\n");
                }

                function setWrapperMaxHeight () {
                    var maxHeight = window.getComputedStyle(element[0]).maxHeight;
                    wrapper[0].style.maxHeight = maxHeight;
                    wrapper[0].style.overflowY = 'hidden';
                }

                function removeWrapperMaxHeight () {
                    wrapper[0].style.maxHeight = 'none';
                    wrapper[0].style.overflowY = 'auto';
                }
            }

            // Clean up listeners and added elements.
            function cleanUp () {
                element
                    .off('input propertychange keyup change')
                    .off('blur')
                    .off('focus');
                wrapper.remove();
            }
        }
    };
});
