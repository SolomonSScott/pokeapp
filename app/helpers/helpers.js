import $ from 'jquery';

var helpers = {

  uppercase: function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  pokeimg: function(name) {
    return 'http://img.pokemondb.net/artwork/' + name + '.jpg';
  },

  getpokeID: function(url) {
    var url = url.split("/");
    return url[3];
  },

  order: function(a, b) {
    return helpers.getpokeID(a.resource_uri) - helpers.getpokeID(b.resource_uri);
  },

  pad: function(n) {
    if(n < 10) {
      n = "00" + n;
    }
    else if (n > 10 && n < 100) {
      n = "0" + n;
    }
    else {
      n = n;
    }
    return n;
  },

  addSpace: function(text) {
    var text = String(text).replace("-", " ");
    return text;
  },

  calculateHeight: function(height) {
    return (height/10).toFixed( 1 );

    //return Number(height).toFixed(1);
  },

  getPokemon: function(id) {
    $.get('http://pokeapi.co/api/v1/pokemon/' + id + '/' , function (data) {
      return data;
    });
  }
}

export default helpers;