"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ApiWrapper = /*#__PURE__*/function () {
  function ApiWrapper() {
    (0, _classCallCheck2["default"])(this, ApiWrapper);
  }

  (0, _createClass2["default"])(ApiWrapper, null, [{
    key: "getTopStoriesIds",
    value: function () {
      var _getTopStoriesIds = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(ApiWrapper.URLS.TOP);

              case 2:
                response = _context.sent;
                return _context.abrupt("return", response.json());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getTopStoriesIds() {
        return _getTopStoriesIds.apply(this, arguments);
      }

      return getTopStoriesIds;
    }()
  }, {
    key: "getStory",
    value: function () {
      var _getStory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var urlStory, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                urlStory = ApiWrapper.getStoryUrl(id);
                _context2.next = 3;
                return fetch(urlStory);

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", response.json());

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getStory(_x) {
        return _getStory.apply(this, arguments);
      }

      return getStory;
    }()
  }, {
    key: "getStoryUrl",
    value: function getStoryUrl(id) {
      var url = "".concat(ApiWrapper.URLS.STORY).concat(id, ".json");
      return url;
    }
  }, {
    key: "getUserUrl",
    value: function getUserUrl(userID) {
      return "".concat(ApiWrapper.URL_USER_BASE).concat(userID);
    }
  }]);
  return ApiWrapper;
}();

(0, _defineProperty2["default"])(ApiWrapper, "URL_BASE", 'https://hacker-news.firebaseio.com/v0/');
(0, _defineProperty2["default"])(ApiWrapper, "URL_USER_BASE", 'https://news.ycombinator.com/user?id=');
(0, _defineProperty2["default"])(ApiWrapper, "URLS", {
  TOP: ApiWrapper.URL_BASE + 'topstories.json',
  STORY: ApiWrapper.URL_BASE + 'item/'
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Comment = /*#__PURE__*/function () {
  function Comment(a_oApiResponse) {
    (0, _classCallCheck2["default"])(this, Comment);
    this.by = null;
    this.id = null;
    this.kids = null;
    this.parent = null;
    this.text = null;
    this.time = null;
    this.type = null;
    this.dt = null;

    for (var _i = 0, _Object$keys = Object.keys(this); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (a_oApiResponse[key] != undefined) {
        this[key] = a_oApiResponse[key];
      }
    }

    this.dt = DateTime.fromSeconds(this.time);
    this.dtDiff = Dates.getDiffNow(this.dt);
  }

  (0, _createClass2["default"])(Comment, [{
    key: "getHtml",
    value: function getHtml() {
      var self = this;
      var userUrl = ApiWrapper.getUserUrl(self.by);
      var userUrlDisplay = "<a class=\"text-reset\" href=".concat(userUrl, ">").concat(self.by, "</a>");
      var dateDisplay = Dates.getDiffDisplayString(this.dtDiff);
      var kidsCommentsDisplay = this.getChildrenHtml();
      var html = "<hr>\n        <li class=\"comment-item\">\n            <div class=\"d-flex\">\n                <p class=\"comment-item-meta\">\n                    <small class=\"text-muted\">\n                        <span>".concat(userUrlDisplay, " &#183; ").concat(dateDisplay, "</span> &#183; \n                        <a href=\"#\" class=\"text-reset comment-item-btn-toggle-thread\">Hide</a>\n                    </small>\n                </p>\n            </div>\n\n            <div class=\"comment-item-thread\">\n                <div class=\"comment-item-text\">").concat(self.text, "</div>\n                <ul class=\"list-comments list-unstyled\">").concat(kidsCommentsDisplay, "</ul>\n            </div>\n        </li>");
      return html;
    }
  }, {
    key: "getChildrenHtml",
    value: function getChildrenHtml() {
      var kidsCommentsHtml = '';

      if (this.kids == null) {
        return kidsCommentsHtml;
      }

      var _iterator = _createForOfIteratorHelper(this.kids),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var kid = _step.value;
          var kidComment = new Comment(kid);
          kidsCommentsHtml += kidComment.getHtml();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return kidsCommentsHtml;
    }
  }]);
  return Comment;
}();
"use strict";

var DateTime = luxon.DateTime;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Dates = /*#__PURE__*/function () {
  function Dates() {
    (0, _classCallCheck2["default"])(this, Dates);
  }

  (0, _createClass2["default"])(Dates, null, [{
    key: "getDiffNow",
    value:
    /** Time difference units */

    /**
     * Returns the time difference between a datetime and now.
     * 
     * @param {Constants.DateTime} a_dtDateTime - the datetime object
     * 
     * @returns {Object} diff - The point generated by the factory.
     * @returns {number} diff.years - Difference in years
     * @returns {number} diff.months - Difference in months
     * @returns {number} diff.days - Difference in days
     * @returns {number} diff.hours - Difference in hours
     * @returns {number} diff.minutes - Difference in minutes
     * @returns {number} diff.seconds - Difference in seconds
     */
    function getDiffNow(a_dtDateTime) {
      var diff = DateTime.now().diff(a_dtDateTime, Dates.DIFF_UNITS);
      return diff.values;
    }
    /**
     * Generate the date difference display string.
     */

  }, {
    key: "getDiffDisplayString",
    value: function getDiffDisplayString(a_dtDiff) {
      var numUnits = null;
      var unitType = null;

      if (a_dtDiff.days > 0) {
        numUnits = a_dtDiff.days;
        unitType = 'day';
      } else if (a_dtDiff.hours > 0) {
        numUnits = a_dtDiff.hours;
        unitType = 'hour';
      } else if (a_dtDiff.minutes > 1) {
        numUnits = a_dtDiff.minutes;
        unitType = 'minute';
      } // item was created less than a minute ago


      if (null in [numUnits, unitType]) {
        return 'just now';
      } // append an s if there is more than 1 of the units


      if (numUnits > 1) {
        unitType += 's';
      } // throw them all together


      var result = "".concat(numUnits, " ").concat(unitType, " ago");
      return result;
    }
  }]);
  return Dates;
}();

(0, _defineProperty2["default"])(Dates, "DIFF_UNITS", ["years", "months", "days", "hours", "minutes", "seconds"]);
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * This class is responsible for retrieving and displaying all the stories.
 */
var Stories = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {string} a_strDisplayElement css selector of where to place all the story cards
   */
  function Stories(a_strDisplayElement) {
    (0, _classCallCheck2["default"])(this, Stories);
    this.displayElement = a_strDisplayElement;
    this.stories = [];
  }
  /**
   * Fetch the stories from the hackernews api 
   * @param {Stories.SortingTypes} a_enumSortingType How should the stories be sorted once they have been fetched
   */


  (0, _createClass2["default"])(Stories, [{
    key: "fetchTopStories",
    value: function () {
      var _fetchTopStories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var a_enumSortingType,
            topStoriesList,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                a_enumSortingType = _args.length > 0 && _args[0] !== undefined ? _args[0] : Stories.SORTING_TYPES.Default;
                _context.next = 3;
                return ApiWrapper.getTopStoriesIds();

              case 3:
                topStoriesList = _context.sent;
                this.fetchStories(topStoriesList, a_enumSortingType);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchTopStories() {
        return _fetchTopStories.apply(this, arguments);
      }

      return fetchTopStories;
    }()
    /**
     * Fetch the stories api responses using the given sorting types 
     * @param {list[number]} a_listStoryIDs list of story ids
     * @param {number} a_enumSortingType sorting type
     */

  }, {
    key: "fetchStories",
    value: function () {
      var _fetchStories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(a_listStoryIDs, a_enumSortingType) {
        var self, storyPromises, _iterator, _step, storyID, storyResponse, storyPromisesResponses, _iterator2, _step2, story;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                storyPromises = [];
                _iterator = _createForOfIteratorHelper(a_listStoryIDs);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    storyID = _step.value;
                    storyResponse = ApiWrapper.getStory(storyID);
                    storyPromises.push(storyResponse);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context2.next = 6;
                return Promise.all(storyPromises);

              case 6:
                storyPromisesResponses = _context2.sent;
                this.stories = []; // clear out the existing stories
                // weed out all of the non stories

                _iterator2 = _createForOfIteratorHelper(storyPromisesResponses);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    story = _step2.value;

                    if (story.type == Stories.STORY_TYPES.STORY) {
                      this.stories.push(story);
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                _context2.t0 = a_enumSortingType;
                _context2.next = _context2.t0 === Stories.SORTING_TYPES.Score ? 13 : _context2.t0 === Stories.SORTING_TYPES.Descendants ? 15 : _context2.t0 === Stories.SORTING_TYPES.Title ? 17 : 19;
                break;

              case 13:
                self.sortStoriesByScore();
                return _context2.abrupt("break", 19);

              case 15:
                self.sortStoriesByDescendants();
                return _context2.abrupt("break", 19);

              case 17:
                self.sortStoriesByTitle();
                return _context2.abrupt("break", 19);

              case 19:
                this.displayStories();

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchStories(_x, _x2) {
        return _fetchStories.apply(this, arguments);
      }

      return fetchStories;
    }()
    /**
     * Sort the stories by their score
     */

  }, {
    key: "sortStoriesByScore",
    value: function sortStoriesByScore() {
      this.stories = this.stories.sort(function (a, b) {
        return a.score > b.score ? -1 : 1;
      });
    }
    /**
     * Sort the stories by the number of comments
     */

  }, {
    key: "sortStoriesByDescendants",
    value: function sortStoriesByDescendants() {
      this.stories = this.stories.sort(function (a, b) {
        return a.descendants > b.descendants ? -1 : 1;
      });
    }
    /**
     * Sort the stories by the title
     */

  }, {
    key: "sortStoriesByTitle",
    value: function sortStoriesByTitle() {
      this.stories = this.stories.sort(function (a, b) {
        var titleA = a.title.toUpperCase();
        var titleB = b.title.toUpperCase();
        return titleA < titleB ? -1 : 1;
      });
    }
    /**
     * Display the stories on the page
     */

  }, {
    key: "displayStories",
    value: function displayStories() {
      var html = '<div class="card-deck">';
      var count = 0;

      var _iterator3 = _createForOfIteratorHelper(this.stories),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var story = _step3.value;

          if (count == 3) {
            html += '</div><div class="card-deck">';
            count = 0;
          }

          var storyCard = new StoryComp(story);
          html += storyCard.getCardHtml();
          count++;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      html += '</div>';
      $(this.displayElement).html(html);
    }
  }]);
  return Stories;
}();

(0, _defineProperty2["default"])(Stories, "DISPLAY_TYPES", {
  Card: 'card',
  List: 'list'
});
(0, _defineProperty2["default"])(Stories, "SORTING_TYPES", {
  Default: 0,
  Score: 1,
  Descendants: 2,
  Title: 3
});
(0, _defineProperty2["default"])(Stories, "STORY_TYPES", {
  JOB: 'job',
  STORY: 'story',
  COMMENT: 'comment',
  POLL: 'poll',
  POLLOPT: 'pollopt'
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var StoryComments = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {number} a_iStoryID - story id
   */
  function StoryComments(a_iStoryID) {
    (0, _classCallCheck2["default"])(this, StoryComments);
    this.comments = {};
    this.storyID = a_iStoryID;
  }
  /**
   * Retrieve the story data
   * 
   * @param {number} a_iStoryID - story id
   */


  (0, _createClass2["default"])(StoryComments, [{
    key: "fetchStoryData",
    value: function () {
      var _fetchStoryData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var storyApiResponse, storyComp;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return ApiWrapper.getStory(this.storyID);

              case 2:
                storyApiResponse = _context.sent;
                storyComp = new StoryComp(storyApiResponse); // display the metadata

                this.displayStoryMetadata(storyComp); // fetch all the story comments

                this.comments = storyComp;
                _context.next = 8;
                return this.fetchAllComments(this.comments);

              case 8:
                this.comments = this.comments.kids; // display the story comments

                this.displayComments();

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchStoryData() {
        return _fetchStoryData.apply(this, arguments);
      }

      return fetchStoryData;
    }()
    /**
     * Display story metadata on the page
     * 
     * @param {StoryComp} a_oStoryMetadata - Story comp object
     */

  }, {
    key: "displayStoryMetadata",
    value: function displayStoryMetadata(a_oStoryMetadata) {
      $('title').text(a_oStoryMetadata.title);
    }
    /**
     * Display the top level comments  
     * 
     * @param {StoryComp} storyComp the story
     */

  }, {
    key: "fetchAllComments",
    value: function () {
      var _fetchAllComments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(storyComp) {
        var promiseList, _iterator, _step, commentID, count;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (storyComp.hasOwnProperty('kids')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                promiseList = [];
                _iterator = _createForOfIteratorHelper(storyComp.kids);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    commentID = _step.value;
                    promiseList.push(ApiWrapper.getStory(commentID));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context2.next = 7;
                return Promise.all(promiseList);

              case 7:
                storyComp.kids = _context2.sent;
                count = 0;

              case 9:
                if (!(count < storyComp.kids.length)) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 12;
                return this.fetchAllComments(storyComp.kids[count]);

              case 12:
                count++;
                _context2.next = 9;
                break;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchAllComments(_x) {
        return _fetchAllComments.apply(this, arguments);
      }

      return fetchAllComments;
    }()
    /**
     * Display the comments
     */

  }, {
    key: "displayComments",
    value: function displayComments() {
      var html = '';

      var _iterator2 = _createForOfIteratorHelper(this.comments),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var comment = _step2.value;
          var commentObj = new Comment(comment);
          html += commentObj.getHtml();
        } // display the html
        // make all links found within the comments section open a new tab

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      $('#comments-list').html(html).find('a').attr("target", "_blank");
    }
  }]);
  return StoryComments;
}();
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var StoryComp = /*#__PURE__*/function () {
  function StoryComp(a_apiResponse) {
    (0, _classCallCheck2["default"])(this, StoryComp);
    this.by = null;
    this.descendants = null;
    this.id = null;
    this.kids = [];
    this.score = null;
    this.time = null;
    this.title = null;
    this.type = null;
    this.url = null;

    for (var _i = 0, _Object$keys = Object.keys(a_apiResponse); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      this[key] = a_apiResponse[key];
    }

    this.siteUrl = "https://news.ycombinator.com/item?id=".concat(this.id);
    this.dt = DateTime.fromSeconds(this.time);
    this.dtDiff = Dates.getDiffNow(this.dt);
  }
  /**
   * Generate the card html
   * @returns Story card html string
   */


  (0, _createClass2["default"])(StoryComp, [{
    key: "getCardHtml",
    value: function getCardHtml() {
      var url = this.url == null ? this.siteUrl : this.url;
      var dtDisplay = Dates.getDiffDisplayString(this.dtDiff);
      var html = "\n        <div class=\"card ".concat(StoryComp.cardElementClass, " custom-shadow\" data-id=").concat(this.id, ">\n            <div class=\"card-body\">\n                <h5 class=\"card-title\"><a href=\"").concat(url, "\" target=\"_blank\" class=\"card-story-link\">").concat(this.title, "</a></h5>\n                <p class=\"text-muted\"><small>").concat(dtDisplay, "</small></p>\n                <p class=\"text-muted\"><i class='bx bxs-user'></i>&nbsp;").concat(this.by, "</p>\n            </div>\n            <div class=\"card-footer px-4\">\n                <div class=\"d-flex align-baseline justify-content-between\">\n                    <span><i class='bx bx-like'></i>&nbsp;").concat(this.score, "</span>\n                    <span><i class='bx bx-comment-detail'></i>&nbsp;").concat(this.descendants, "</span>\n                </div>\n            </div>\n        </div>");
      return html;
    }
  }]);
  return StoryComp;
}();

(0, _defineProperty2["default"])(StoryComp, "cardElementClass", 'card-story');
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Class to display the metadata for a story.
 */
var StoryMeta =
/**
 * Constructor
 * @param {number} a_iStoryID - story ID
 */
function StoryMeta(a_iStoryID) {
  var _this = this;

  (0, _classCallCheck2["default"])(this, StoryMeta);
  (0, _defineProperty2["default"])(this, "loadAndDisplayData", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var storyApiResponse, storyComp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ApiWrapper.getStory(_this.storyID);

          case 2:
            storyApiResponse = _context.sent;
            storyComp = new StoryComp(storyApiResponse); // set the appropriate fields

            _this.title = storyComp.title;
            _this.countComments = storyComp.descendants;
            _this.countLikes = storyComp.score;
            _this.date = storyComp.dt;
            _this.dateDiff = storyComp.dtDiff;
            _this.linkStory = storyComp.url;
            _this.linkSite = storyComp.siteUrl; // now display it

            _this.displayData();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2["default"])(this, "displayData", function () {
    _this.displayTitle();

    _this.displayCountComments();

    _this.displayCountLikes();

    _this.displayDate();

    _this.displayLinkStory();

    _this.displayLinkSite();
  });
  (0, _defineProperty2["default"])(this, "displayTitle", function () {
    if (_this.title == null) {
      return;
    }

    $(StoryMeta.TITLE).text(_this.title).removeClass('skeleton-text skeleton-effect-wave');
  });
  (0, _defineProperty2["default"])(this, "displayCountComments", function () {
    if (_this.countComments == null) {
      return;
    }

    var countCommentsText = "".concat(_this.countComments, " comments");
    $(StoryMeta.COUNT_COMMENTS).text(countCommentsText);
  });
  (0, _defineProperty2["default"])(this, "displayCountLikes", function () {
    if (_this.countLikes == null) {
      return;
    }

    var countLikesText = "".concat(_this.countLikes, " likes");
    $(StoryMeta.COUNT_LIKES).text(countLikesText);
  });
  (0, _defineProperty2["default"])(this, "displayDate", function () {
    var dateDiffString = Dates.getDiffDisplayString(_this.dateDiff);
    $(StoryMeta.DATE).text(dateDiffString);
  });
  (0, _defineProperty2["default"])(this, "displayLinkStory", function () {
    _this.setLink(_this.linkStory, StoryMeta.LINK_STORY);
  });
  (0, _defineProperty2["default"])(this, "displayLinkSite", function () {
    _this.setLink(_this.linkSite, StoryMeta.LINK_SITE);
  });
  (0, _defineProperty2["default"])(this, "setLink", function (a_strValue, a_strSelector) {
    if (a_strValue == null) {
      return;
    }

    $(a_strSelector).attr('href', a_strValue);
    $(a_strSelector).removeClass('disabled');
  });
  this.storyID = a_iStoryID; // init everything to null before we fetch the data

  this.title = null;
  this.countComments = null;
  this.countLikes = null;
  this.date = null;
  this.dateDiff = null;
  this.linkStory = null;
  this.linkSite = null;
}
/**
 * Load the metadata then display it.
 */
;

(0, _defineProperty2["default"])(StoryMeta, "CONTAINER", '#meta-container');
(0, _defineProperty2["default"])(StoryMeta, "TITLE", '#meta-title');
(0, _defineProperty2["default"])(StoryMeta, "COUNT_COMMENTS", '#meta-count-comments');
(0, _defineProperty2["default"])(StoryMeta, "COUNT_LIKES", '#meta-count-likes');
(0, _defineProperty2["default"])(StoryMeta, "DATE", '#meta-date');
(0, _defineProperty2["default"])(StoryMeta, "LINK_STORY", '#meta-link-story');
(0, _defineProperty2["default"])(StoryMeta, "LINK_SITE", '#meta-link-site');
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var UrlParser = /*#__PURE__*/function () {
  function UrlParser() {
    var a_strUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, UrlParser);

    if (a_strUrl == undefined || a_strUrl == null) {
      this.url = window.location;
    }

    this.queryString = window.location.search;
    this.urlParms = new URLSearchParams(this.queryString);
  }

  (0, _createClass2["default"])(UrlParser, [{
    key: "getQueryParm",
    value: function getQueryParm(a_strKey) {
      return this.urlParms.get(a_strKey);
    }
  }]);
  return UrlParser;
}();
"use strict";

var eSortingSelect = '#stories-sort-option';
var eStoriesContainer = '#stories-container';
var eStoryCardClass = ".".concat(StoryComp.cardElementClass);
var mStories = new Stories(eStoriesContainer); // main logic

$(document).ready(function () {
  mStories.fetchTopStories(Stories.SORTING_TYPES.Default);
  addEventListeners();
});

function addEventListeners() {
  $(eSortingSelect).on('change', function () {
    updateStorySorting();
  });
  $('body').on('click', eStoryCardClass, function (e) {
    gotoStory(e);
  });
}

function updateStorySorting() {
  var newSortingValue = parseInt($(eSortingSelect).find('option:checked').val());
  mStories.fetchTopStories(newSortingValue);
  showStoriesContainerSpinner();
} // show the spinner in the stories container


function showStoriesContainerSpinner() {
  var html = "\n    <div class=\"d-flex justify-content-center mt-5\">\n        <div class=\"spinner-border text-primary mt-5\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n        </div>\n    </div>";
  $(eStoriesContainer).html(html);
}

function gotoStory(e) {
  if (e.target.className == 'card-story-link') {
    return;
  }

  var card = $(e.target).closest(eStoryCardClass);
  var storyID = $(card).attr('data-id');
  var url = "story.html?storyID=".concat(storyID);
  window.open(url, "_blank");
}
"use strict";

var eMetaIDs = {
  container: '#meta-container',
  title: '#meta-title',
  countComments: '#meta-count-comments',
  countLikes: '#meta-count-likes',
  date: '#meta-date',
  linkStory: '#meta-link-story',
  linkSite: '#meta-link-site'
};
var eCommentsContainer = '#comments-list';
var eComments = {
  item: '.comment-item',
  toggleButton: '.comment-item-btn-toggle-thread',
  meta: '.comment-item-meta',
  thread: '.comment-item-thread',
  text: '.comment-item-text',
  visibilityClass: 'comment-item-hidden'
};
var mUrlParser = new UrlParser();
var mStoryID = mUrlParser.getQueryParm('storyID');
var mStoryMeta = new StoryMeta(mStoryID);
var mStoryComments = new StoryComments(mStoryID, eMetaIDs.title); // main logic

$(document).ready(function () {
  mStoryMeta.loadAndDisplayData();
  mStoryComments.fetchStoryData();
  addListeners();
});
/**
 * Add the event listeners to the page elements
 */

function addListeners() {
  $(eCommentsContainer).on('click', eComments.toggleButton, function (e) {
    e.preventDefault();
    toggleCommentVisibility(this);
  });
}
/**
 * Show/hide a comment thread actions
 */


function toggleCommentVisibility(a_eCommentItemButton) {
  var eComment = $(a_eCommentItemButton).closest(eComments.item); // toggle comment visibility

  $(eComment).toggleClass(eComments.visibilityClass); // update the button text to show or hide

  var btnText = $(eComment).hasClass(eComments.visibilityClass) ? 'Show' : 'Hide';
  $(a_eCommentItemButton).text(btnText);
}
