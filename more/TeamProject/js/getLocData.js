var locData = {
  getHash: function () {
    var lc = window.location.hash.substring(1);
    var data = {}
    lc = lc.split('=');
    data.name = lc[0];
    data.value = lc[1];
    return data;
  },
  getSearch: function () {
    var lc = location.search.length > 0 ? location.search.substring(1) : '',
        data = {},
        items = lc.length ? lc.split('&') : [],
        item = null,
        name = null,
        value = null,
        i=0,
        len = items.length;
    for (var i = 0; i < len; i++) {
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      for (var i = 0; i < item.length; i++) {
        data[name] = value;
      }
    }
    return data;
  }
}