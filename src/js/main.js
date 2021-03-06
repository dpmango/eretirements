$(document).ready(function(){

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

  ////////////////
  // ROADMAP PAGE
  ////////////////

  $('.roadmap__questions__checkboxes .category__questions__item__checkboxes__item').click(function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    var target = $(this).data('id');
    $('.roadmap__questions__info').each(function () {
      if ( $(this).data('id') == target ){
        $(this).fadeToggle();
      }
    });
  });

  $('.roadmap__questions__info__compleate').on('click', function(e){
    var target = $(this).data('id');
    var doAction = true
    if ( $(this).text() == 'Not compleated' ){
      doAction = false
      $(this).text('Mark as compleated');
    } else {
      doAction = true
      $(this).text('Not compleated');
    }
    $('.roadmap__questions__checkboxes .category__questions__item__checkboxes__item').each(function () {
      if ( $(this).data('id') == target ) {
        $(this).find('input[type=checkbox]').prop('checked', doAction);
      }
    });
  });

  var friendsCounter = 0
  $('#addMoreFields').on('click', function(){
    var str = "<input class='input__regular' placeholder='Your friend’s email address'></input>";
    if (friendsCounter < 9) {
      $('.dashboard__invite-form__inputs').append(str);
    } else{
      $('.dashboard__invite-form__inputs').append("<div style='color: tomato; font-size: 10px'>maximum 10 invites per time</div>");
    }
    friendsCounter ++
  });
  // $('.roadmap__questions__checkboxes .category__questions__item__checkboxes__item label').click(function(e){
  //   //set checkbox on active item
  //   console.log('fired');
  // });

  ////////////////
  // FAVORITE CITIES PAGE
  ////////////////
  $('.dash-fav-cities .dashboard__favorite-city').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    var target = $(this).data('id');
    $('.dashboard__favorite-city__content').each(function () {
      if ( $(this).data('id') == target ){
        $(this).toggleClass('active');
      }
    });
  });

  ////////////////
  // FORMS UI
  ////////////////

  $('.select__custom select').on('change', function(){
    var currentVal = $(this).val();
    $(this).parent().find('span').text(currentVal);
  });

  var inputs = document.querySelectorAll( '.inputFile' );

  Array.prototype.forEach.call( inputs, function( input )
  {
  	var label	 = input.nextElementSibling,
  		labelVal = label.innerHTML;

  	input.addEventListener( 'change', function( e )
  	{
  		var fileName = '';
  		if( this.files && this.files.length > 1 )
  			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  		else
  			fileName = e.target.value.split( '\\' ).pop();

  		if( fileName )
  			label.innerHTML = fileName;
  		else
  			label.innerHTML = labelVal;
  	});
  });

  // tinymce
  tinymce.init({
    selector: '.dashboard__textnote textarea',
    plugins: 'advlist save autolink link image lists charmap hr anchor pagebreak spellchecker template textcolor colorpicker',
    toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | link image | forecolor backcolor',
    menubar: '',
    height: 130
  });

  // full featured preset
  tinymce.init({
    selector: '.dashboard__notepad textarea',
    height: 300,
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
    ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
  });


  // bind editor
  $('.dashboard__city-note').on('click', function(){
    $(this).next().fadeToggle();
  });
  $('.dashboard__textnote__saver').on('click', function(){
    $(this).parent().fadeToggle();
  });

  // OWL carousel
  $('#owlNotesBlog').owlCarousel({
    loop: true,
    // margin: 10,
    nav: true,
    nestedItemSelector: 'col-sm-12',
    responsive:{
        0:{
            items:1
        },
        768:{
            items:3
        },
        992:{
            items:4
        }
    }
  })

  $('#owlNotesCity').owlCarousel({
    loop: true,
    // margin: 10,
    nav: true,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:3
        },
        992:{
            items:5
        }
    }
  })

});
