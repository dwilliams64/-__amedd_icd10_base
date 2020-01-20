if($(".js-svg-tabs").length>0) {

 $(".js-svg-tabs").each(function(idx_a){

  $('.backToMenu').click(function() {
    $('#men').focus();
  });

  var svgTabs = function(options) {

  // alert('gonna try '+parseInt(idx_a+1));
    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var activeIndex = 0;
    var initCalled = false;

    var init = function() {
      if (!initCalled) {
        initCalled = true;

        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };

    var goToTab = function(index) {
      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {

        tabNavigationLinks[activeIndex].classList.remove('is-active');
        tabNavigationLinks[index].classList.add('is-active');
        tabContentContainers[activeIndex].classList.remove('is-active');
        tabContentContainers[index].classList.add('is-active');
        tabContentContainers[index].focus();
        activeIndex = index;
      }
    };

    return {
      init: init,
      goToTab: goToTab
    };
  };
  window.svgTabs = svgTabs;
  svgTabs({el: '.js-svg-tabs', tabNavigationLinks: '.c-tabs-nav__link', tabContentContainers: '.c-tab'}).init();
   })
}
