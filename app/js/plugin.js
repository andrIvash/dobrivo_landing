//Модуль работы меню и списков

var viewChanger = (function(){
    // Подключаем прослушку событий
    function _setUpListners(){
        $('.langselect__item, .corn__item').on('click', _changeData);
        $('.lang__selected, .corn__selected').on('click', _openList);
        $('.mainmenu__item').on('click', _openSubmenuItem);
    }
    // изменение данных в блоке вывода в зависимости от выбора элемента списка
    function _changeData(e) {
        var elem = $(this),
            target = elem.text(),
            price = elem.data('price'),
            list = elem.parent(),
            viewData = list.prev();
        
        viewData.text(target);
        viewData.data('price', price);
        list.hide();
           
    }

   // вывод элементов списка в виде субменю
    function _openList(e) {
        var elem = $(this),
            list = elem.next();
        if (!list.is(":visible") ) {
            list.show();
        }
    }
    // открытие и закрытие горизонтального субменю в случае его наличия
    function _openSubmenuItem (e){
        e.preventDefault();
        var menuItem = $(this),
        subMenu = $('.mainmenu-dropdown__list'),
        menuLink = $('.mainmenu__link');
      
        menuLink.removeClass('active');
        subMenu.removeClass('active').hide('slow');

        menuItem.children(menuLink).addClass('active');
        if (!menuItem.children('.mainmenu-dropdown__list').is(':visible')) {
            menuItem.children('.mainmenu-dropdown__list').show('slow');
        } 
    }
 
    // возвращаем модуль 
    return {
        init: function () {
            _setUpListners();
        }
    }
}());

    // Модуль показа слайдов 
    var startSlider = (function(){
    // Подключаем прослушку событий
        function _setUpListners(){
            $(document).on('ready', _changeSlide);
        }

        // Переход к следующему слайду
        function _moveSlide() {
            var container = $('.slider__list-wrap'),
                list = container.find('.slider__list'),
                items = container.find('.slider__item'),
                firstSlide = items.first(),
                lastSlide = items.last(),
                activeSlide = items.filter('.active'),
                nextSlide = activeSlide.next(),
                prevSlide = activeSlide.prev(),
                sliderOffset = container.offset().left,
                reqPos = 0;
                
                if(nextSlide.length) {
                    reqPos = nextSlide.offset().left - sliderOffset;
                    nextSlide.addClass('active').siblings().removeClass('active');
                } else {
                    reqPos = firstSlide.offset().left - sliderOffset;
                    firstSlide.addClass('active').siblings().removeClass('active');
                }
                
                list.css('left', '-=' + reqPos + 'px');
            };
        
        // Таймер замены слайдов
        function _changeSlide() {
            var timerId = setTimeout(function tick() {
                    _moveSlide();
                    timerId = setTimeout(tick, 3000);
                }, 3000);

        };   
        
        
 
    // возвращаем модуль 
        return {
            init: function () {
                _setUpListners();
            }
        }
    }());




    // Модуль валидации
var validation = (function (){

        _setUpListners = function () { // Прослушивает все события 
          $('.orderform').on('keyup', _validateForm);  
          $('.orderform').on('keydown', '.has-error', _removeError); // удаляем ошибку у элементов форм
          
        };
    
        _validateForm = function () { // Проверяет, чтобы все поля формы были не пустыми и вводились только числа. Если пустые - вызывает тултипы
            
            var self = $(this),
                elements = self.find('input'),
                valid = true;
              
          $.each(elements, function(index, val) {
            var element = $(val),
                val = element.val(),
                pos = element.attr('qtip-position'); 
                       
            if(val.length === 0 || parseFloat(val) === 0) {
                _addError(element);
                valid = false;
            }
            if(/[^[0-9]/.test(val)){
                _addError(element);
                valid = false;
            }

          }); // each

          if(valid) {
            getSum.getSum(); 
          }
          
      };
            
        _removeError = function() { // Убирает красную обводку у элементов форм
          
          $(this).removeClass('has-error');


        };

        
        
        _addError = function (element) {
            element.addClass('has-error');
            _createQtip(element, element.attr('qtip-position'));    
            element.val('');
        };

        _createQtip = function (element, position) { // Создаёт тултипы
         

          // позиция тултипа
          if (position === 'right') {
            position = {
              my: 'left center', 
              at: 'right center'
            }
          }else{
            position = {
              my: 'right center', 
              at: 'left center',
              adjust: {
                method: 'shift none'
              }
            }
          }

          // инициализация тултипа
          element.qtip({
            content: {
              text: function() {
                return $(this).attr('qtip-content');
              }
            },
            show: {
              event: 'show'
            },
            hide: {
              event: 'keydown hideTooltip'
            },
            position: position,
            style: {
              classes: 'qtip-mystyle qtip-rounded',
              tip: {
                height: 10,
                width: 16
              }
            }
          }).trigger('show');

        };

    return {
            init: function () {
                _setUpListners();
            }
        }

})();

// Модуль подсчета данных формы
    var getSum = (function(){
    // Подключаем прослушку событий
        function _setUpListners(){
            $('.orderform').on('click', '.corn__item' , function(e) {
                $(e.target).trigger('keyup');

            });
        }

        // Вычисление суммы
        _getSum = function() {
            var harv = parseFloat($('#harv').val()),
                fert = parseFloat($('#fert').val()),
                area = parseFloat($('#area').val()),
                corn = $('.corn__selected').data('price'),
                price = $('.order__footer_price'),
                sum = ((harv * area)* 0.1 * corn) - (area * fert);

            price.text(sum);
            
        };

        
 
    // возвращаем модуль 
        return {
            init: function () {
                _setUpListners();
            },
            getSum: function () {
                _getSum();
            }
        }
    }());
