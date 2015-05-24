(function () {
    'use strict';

    angular
        .module('comedyStore')
        .value('fakeEvents', getFakeEvents());

    function getFakeEvents() {
        return [
            {
                title: 'King Gong',
                artists: [
                    'Jarred Christmas'
                ],
                price: {
                    regular: 8.0,
                    concession: 5.0
                }
            },
            {
                title: 'The Cutting Edge',
                artists: [
                    'Paul Sinha',
                    'Mick Ferry',
                    'Steve Gribbin',
                    'Alistair Barrie',
                    'Scott Capurro',
                    'Ola'
                ],
                price: {
                    regular: 14.0,
                    concession: 9.0
                }
            },
            {
                title: 'Comedy Store Players',
                artists: [
                    'Josie Lawrence',
                    'Lee Simpson',
                    'Richard Vranch',
                    'Andy Smart',
                    'Neil Mullarkey',
                    'Niall Ashdown'
                ],
                price: {
                    regular: 17.0,
                    concession: 12.0
                }
            }
        ];
    }
})();
