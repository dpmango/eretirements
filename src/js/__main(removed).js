$(document).ready(function(){

	$.getJSON('json/questions.json', function (data) {

	  // parse categories and questions
	  var result_categories = [];
	  var result_cat_with_questions = [];
	  // var result_questions = [];

	  $.each( data.categories, function( index_main, category ) {
	  	// set icons
	  	var icon = ""
	  	if (category.title == "Family"){
	  		icon = "ico-family"
	  	} else if (category.title == "Culture" ){
	  		icon = "ico-culture"
	  	} else if (category.title == "Finances" ){
	  		icon = "ico-finances"
	  	} else if (category.title == "Weather" ){
	  		icon = "ico-climate"
	  	} else if (category.title == "Activities" ){
	  		icon = "ico-activities"
	  	} else if (category.title == "Health" ){
	  		icon = "ico-health"
	  	} else if (category.title == "Location" ){
	  		icon = "ico-location"
	  	} 

	  	// push categories
	    result_categories.push( "<li data-catid='" + index_main + "'><i class='ico " + icon + "'></i><span>" + category.title + "</span></li>" );

	    // push questions

	    var result_questions = [];

	    if (category.hasOwnProperty('questions')){
			$.each( category.questions, function( index, question ) {

				var result_answer_single = [];
				var result_answer_img_checkboxes = [];
				var result_answer_checkboxes = [];

				$.each(question.answers, function(i, a){
					result_answer_single.push("<span data-points='"+ a.points +"' class='category__questions__item__slider__tip'>" + a.label + "</span>");
				});
				$.each(question.answers, function(i, a){
					result_answer_img_checkboxes.push(
						"<div class='category__questions__item__img-checkboxes__item'>"
							+ "<input type='checkbox' id='data_" + index_main + "_" + index + "_" + i + "'>"
							+ "<label for='data_" + index_main + "_" + index + "_" + i + "'>"
								+ "<span>"+ a.label +"</span>"
								+ "<img src='"+ a.img +"' class='img-fluid'>"
							+ "</label>"
						+ "</div>"
					);
				});
				$.each(question.answers, function(i, a){
					result_answer_checkboxes.push(
						"<div class='category__questions__item__checkboxes__item'>"
							+ "<input type='checkbox' name='" + index_main + "_" + index + "' id='data_" + index_main + "_" + index + "_" + i + "'>"
							+ "<label for='data_" + index_main + "_" + index + "_" + i + "'>"
							+ "<span>" + a.label + "</span>"
							+ "</label>"
						+ "</div>"
					);
				});

				// slider 
				if (question.format == "single"){
					result_questions.push(
						"<div class='category__questions__item' data-item='" + index_main + "_" + index + "'>"
							+ "<div class='category__questions__item__heading'>"
							+ question.label
								+ "<div class='category__questions__item__heading__star' data-toggle='tooltip' data-placement='top' title='This is important for me'>"
								+ "<span>Top priority</span> <i class='ico ico-star'></i>"
								+ "</div>" 
							+ "</div>"
							+ "<div class='category__questions__item__slider' data-id='" + index_main + "_" + index + "'>"
							+ result_answer_single.join( "" )
							+ "</div>"
							+ "<input type='hidden' class='slider-value' data-id='"+ index_main + "_" + index + "' value=''>"
						+ "</div>"
					);
				// images checkboxes
				} else if (question.format == "images-checkbox"){
					result_questions.push(
						"<div class='category__questions__item' data-category='" + index_main + "_" + index + "'>"
							+ "<div class='category__questions__item__heading'>"
								+ question.label
									+ "<div class='category__questions__item__heading__star' data-toggle='tooltip' data-placement='top' title='This is important for me'>"
									+ "<span>Top priority</span> <i class='ico ico-star'></i>"
									+ "</div>" 
							+ "</div>"
							+ "<div class='category__questions__item__img-checkboxes'>"
								+ result_answer_img_checkboxes.join( " " )
							+ "</div>"
						+ "</div>"
					);
				// regular checkboxes
				} else if (question.format == "regular-checkbox"){
					result_questions.push(
						"<div class='category__questions__item' data-category='" + index_main + "_" + index + "'>"
							+ "<div class='category__questions__item__heading'>"
								+ question.label
									+ "<div class='category__questions__item__heading__star' data-toggle='tooltip' data-placement='top' title='This is important for me'>"
									+ "<span>Top priority</span> <i class='ico ico-star'></i>"
									+ "</div>" 
							+ "</div>"
							+ "<div class='category__questions__item__checkboxes'>"
								+ result_answer_checkboxes.join( " " )
							+ "</div>"
						+ "</div>"
					);
				}
			});
		};

	    result_cat_with_questions.push(
				"<div class='toggle-categories' data-category='" + index_main + "'>"
					+ "<div class='category__helper-text'>"
					+	"Set your " + category.title + " Preferences"
					+	"<span>3/12 answered</span>"
					+ "</div>"
					+ "<div class='category__questions whitebox'>"
					+	result_questions.join( " " )
					+ "</div>"
				+ "</div>"
	    );


	  });


	 // RENDER
	  // $( "<span/>", {
	  //   html: result_categories.join( "" )
	  // }).appendTo( "#json-categories" );

	  // $( "<span/>", {
	  //   html: result_cat_with_questions.join( " " )
	  // }).appendTo( "#json-result_cat_with_questions" );

	  // $( "<span/>", {
	  //   html: result_questions.join( "" )
	  // }).appendTo( "#json-questions" );

	  $('.category__questions .category__questions__item__slider').slider(sliderOptions);

	  $('#json-categories').find('li:first-child').addClass('active');
	  $("#json-result_cat_with_questions").find('.toggle-categories:first-child').addClass('active');

	  $("<span/>",{
		html: "<div class='walkthrough__item walkthrough__item--wide' id='walkthrough__step1'>"
			+ "<div class='walkthrough__item__wrapper left'>"
			+	"<div class='walkthrough__item__content'>"
			+		"Set up your preferences using the sliders. Use the filters on the right to narrow preferences."
			+	"</div>"
			+	"<div class='walkthrough__item__link'>"
			+		"<a href='#'>Ok, next <i class='ico ico-next'></i></a>"
			+	"</div>"
			+ "</div>"
		+ "</div>"
	  }).appendTo("#json-result_cat_with_questions .toggle-categories:first-child .category__questions");

	});


	////////////////
	// Category Page
	////////////////

	// star togler
	$('#json-result_cat_with_questions').on('click', '.category__questions__item__heading__star', function(){
		$(this).toggleClass('active');
	});

	// category tabs
	$('.category__navigation.clickable').on('click', 'li:not(.active)', function() {
		$(this).addClass('active').siblings().removeClass('active')
		.closest('.row').find('.toggle-categories').removeClass('active').eq($(this).index()).addClass('active');
	});

	// Call BS tooltip
	$(function () {
	  $('*[data-toggle="tooltip"]').tooltip()
	})

	var sliderOptions = {
		min: 1,
		max: 3,
		value: 2,
		animate: 'slow',
		change: function( event, ui ) {
			$(this).find(".slider-value").val(ui.value);
			$(this).find('.category__questions__item__slider__tip').removeClass('active');
			$(this).find('.category__questions__item__slider__tip:nth-child(' + ui.value + ')').addClass('active');
		}
	};

	$( ".category__questions__item__slider" ).slider(sliderOptions);

	$( ".category__questions__item__slider.5-items" ).slider(sliderOptions);


	// WALKTHROUGH
	///////////////

	$('#start-walkthrough').click(function(){
		$('.walkthrough__wrap').hide();
		$('.walkthrough').addClass('active-step');
		$('#walkthrough__step1').show();
	});

	$('#json-result_cat_with_questions').on('click', '#walkthrough__step1 .walkthrough__item__link a', function(e){
		e.preventDefault();
		$('#walkthrough__step1').hide();
		$('#walkthrough__step2').show();
	});

	$('#walkthrough__step2 .walkthrough__item__link a').click(function(){
		$('#walkthrough__step2').hide();
		$('#walkthrough__step3').show();
	});

	$('#walkthrough__step3 .walkthrough__item__link a').click(function(){
		$('#walkthrough__step3').hide();
		$('#walkthrough__step4').show();
	});

	$('#walkthrough__step4 .walkthrough__item__link a').click(function(){
		$('#walkthrough__step4').hide();
		$('.walkthrough').hide();
	});

	/////////
	// General tempalte
	/////////


	// Call BS tooltip
	$(function () {
	  $('*[data-toggle="tooltip"]').tooltip()
	})


    // hamburger
	var click = 1;

	$("#show-me-menu").on("click", clickHamb);

	function clickHamb() {
	    if ( click == 1 ) {
	        $(this).addClass('is-active');
	        $('.mobile-nav').slideToggle(300);
	        $('body').css('overflow-y', 'hidden');
	        click = 2;
	    } else {
			$(this).removeClass('is-active');
			$('.mobile-nav').hide();
			$('body').css('overflow-y', 'scroll');
	        click = 1;
	    }
	}
	function resize_progess(){
		if (window.innerWidth < 768){
			$('.results-page .progress').removeClass('progress--big');
			$('.results-page .btn__blue').removeClass('mt35').addClass('mt10');
		} else if (window.innerWidth > 768) {
			$('.results-page .progress').addClass('progress--big');
			$('.results-page .btn__blue').removeClass('mt10').addClass('mt35');
		}
	}
	resize_progess();
	$(window).resize(function () {
		resize_progess();
	});

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false; 
	});

});
