/**
 * ------------------------------------------------------------------------
 * More Imports
 * ------------------------------------------------------------------------
 */

// Feather Icons
import feather from "../vendor/feather-icons/dist/feather.min";

/**
 * ------------------------------------------------------------------------
 * JS Functions
 * ------------------------------------------------------------------------
 */
(function($) {
  "use strict";

  const windowEl = window,
    html = document.html,
    bodyEl = document.body,
    youtubePop = document.querySelectorAll(".popup-youtube"),
    vimeoPop = document.querySelectorAll(".popup-vimeo"),
    wrapNewFn = function(el, wrapper) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    },
    getClosest = (elem, selector) => {
      // Element.matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          function(s) {
            var matches = (
                this.document || this.ownerDocument
              ).querySelectorAll(s),
              i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
          };
      }

      // Get closest match
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
      }

      return null;
    };
  const app = {
    init: () => {
      app.featherIcons();
      app.videoPopUp();
    },
    featherIcons: () => {
      feather.replace();
    },
    videoPopUp: () => {
      if (youtubePop.length || vimeoPop.length) {
        $(youtubePop)
          .add($(vimeoPop))
          .magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });
      }
    }
  };
  $(document).ready(function() {
    app.init();
  });
})(jQuery);
