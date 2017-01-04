Handlebars.registerHelper("getIcon", function(title) {
  	var icon = ""
  	if (title == "Family"){
  		icon = "ico-family"
  	} else if (title == "Culture" ){
  		icon = "ico-culture"
  	} else if (title == "Finances" ){
  		icon = "ico-finances"
  	} else if (title == "Weather" ){
  		icon = "ico-climate"
  	} else if (title == "Activities" ){
  		icon = "ico-activities"
  	} else if (title == "Health" ){
  		icon = "ico-health"
  	} else if (title == "Location" ){
  		icon = "ico-location"
  	} 

  	return icon
})

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
})

Handlebars.registerHelper("each_with_index", function(array, fn) {
  var buffer = "";
  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];

    // stick an index property onto the item, starting with 1, may make configurable later
    item.index = i+1;

    // show the inside of the block
    buffer += fn(item);
  }

  // return the finished buffer
  return buffer;

});

var template = $('#handlebars-categories').html();
var templateScript = Handlebars.compile(template);

var context = (function () {
    var context = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'json/questions.json',
        'dataType': "json",
        'success': function (data) {
            context = data;
        }
    });
    return context;
})(); 

var html = templateScript(context);

$('#json-categories').prepend(html);

var template2 = $('#handlebars_cat_with_qustions').html();
var templateScript2 = Handlebars.compile(template2);

var html2 = templateScript2(context);

$('#json-result_cat_with_questions').prepend(html2);

