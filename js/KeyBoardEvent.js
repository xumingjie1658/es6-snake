'use strict';

import Event from './Event';

export default (function() {
    return {
        'KeyUpEvent' : new Event('KeyUpEvent'),
        'KeyDownEvent' : new Event('KeyDownEvent'),
        'KeyLeftEvent' : new Event('KeyLeftEvent'),
        'KeyRightEvent' : new Event('KeyRightEvent')
    }
})();