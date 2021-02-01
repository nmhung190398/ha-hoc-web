String.prototype.format = function (data) {
  data.render = function (tmp) {
    if (tmp != null && tmp != undefined) {
      return tmp.toString();
    }
    return "";
  };
  data.arrayAsString = function (tmp) {
    if (tmp != null && tmp != undefined) {
      return arrayAsString(tmp);
    }
    return "";
  };
  // console.log(data);
  return this.replace(/\{{(.*?)}}/g, function (_, code) {
    var scoped = code.replace(/(["'\.\w\$]+)/g, function (match) {
      return /["']/.test(match[0]) ? match : "scope." + match;
    });
    try {
      return new Function("scope", "return " + scoped)(data);
    } catch (e) {
      return "";
    }
  });
};
// var data = {
//   name1: "Silento",
//   name2: "Miley",
//   nested: { greeting: "Dude", useName1: true },
//   verb: function () {
//     return this.nested.useName1 ? "nae nae" : "twerk";
//   },
//   //   render: function (data) {
//   //     console.log(data);
//   //     if (data) {
//   //       return data.toString();
//   //     }
//   //     return "";
//   //   },
// };
// console.log("{{render(name1)}}".format(data));
// 'Hello, {{nested["greeting"]}}!'.format(data);
// // returns 'Hello, Dude!'
// "{{!nested.useName1 ? name1 : nested.greeting}}".format(data);
// // returns 'Silento'
// "${name1} likes to {{verb()}}".format(data);
//   // returns 'Silento likes to nae nae'