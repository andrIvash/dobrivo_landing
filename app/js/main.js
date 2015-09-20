$(document).ready(function(){
    if($('.slider')) {    
		startSlider.init();
	}
	if($('.lang__container .corn__list')) {
		viewChanger.init();
	}
  if($('.orderform')) {
    validation.init();
    getSum.init();
  }
});