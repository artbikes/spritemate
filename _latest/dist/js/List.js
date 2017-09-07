"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
  function List(window, config) {
    _classCallCheck(this, List);

    this.config = config;
    this.window = window;
    this.zoom = this.config.zoom_list; // this.config.zoom;
    this.pixels_x = this.config.sprite_x;
    this.pixels_y = this.config.sprite_y;
    this.width = this.pixels_x * this.zoom;
    this.height = this.pixels_y * this.zoom;
    this.clicked_sprite = 0;
    this.sorted_array = [];

    $("#spritelist").sortable({
      cursor: "move",
      tolerance: "pointer",
      revert: 'invalid'
    });

    // this line is ridiculous, but apparently it is needed for the sprite sorting to not screw up
    $("<style type='text/css'> .list-sprite-size{ width:" + this.width + "px; height:" + this.height + "px;} </style>").appendTo("head");

    $("#spritelist").disableSelection();
  }

  _createClass(List, [{
    key: "create_canvas",
    value: function create_canvas(id, current_sprite) {
      var _this = this;

      var canvas_element = document.createElement('canvas');
      canvas_element.id = id;
      canvas_element.width = this.width;
      canvas_element.height = this.height;

      $("#spritelist").append(canvas_element);
      $(canvas_element).addClass("sprite_in_list");
      $(canvas_element).addClass("list-sprite-size"); // see comment in constructor

      if (current_sprite == id) $(canvas_element).addClass("sprite_in_list_selected");

      $(canvas_element).mouseup(function (e) {
        _this.clicked_sprite = id;
      });

      $(canvas_element).mouseenter(function (e) {
        return $(canvas_element).addClass("sprite_in_list_hover");
      });
      $(canvas_element).mouseleave(function (e) {
        return $(canvas_element).removeClass("sprite_in_list_hover");
      });
    }
  }, {
    key: "get_clicked_sprite",
    value: function get_clicked_sprite() {
      return this.clicked_sprite;
    }
  }, {
    key: "get_sorted_array",
    value: function get_sorted_array() {
      return this.sorted_array;
    }
  }, {
    key: "update",
    value: function update(spritelist, current_sprite) {

      $(".sprite_in_list").remove();

      for (var i = 0; i < spritelist.length; i++) {
        this.create_canvas(i, current_sprite);

        var canvas = document.getElementById(i).getContext('2d');
        var sprite_data = spritelist[i];
        var x_grid_step = 1;
        if (sprite_data.multicolor) x_grid_step = 2;

        for (var _i = 0; _i < this.pixels_x; _i = _i + x_grid_step) {
          for (var j = 0; j < this.pixels_y; j++) {
            canvas.fillStyle = this.config.colors[sprite_data.pixels[j][_i]];
            canvas.fillRect(_i * this.zoom, j * this.zoom, this.pixels_x * x_grid_step, this.pixels_y);
          }
        }
      }
    }
  }]);

  return List;
}();