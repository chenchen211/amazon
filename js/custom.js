jQuery(document).ready(function ($) {
    var height_win = $(window).height();
    if (height_win < 800) {
        $('.shadown-bird').css('bottom', '15%');
    }
    // Drag & Drop Before - After
    var windowWidth = $(window).width(),
        haft_win = windowWidth / 2;
    $('.wrapper-after').width(windowWidth);
    $(window).resize(function () {
        var windowWidth = $(window).width();
        $('.wrapper-after').css('width', windowWidth + 'px');
    });
    // Menu navigation right (responsive)
    var trigger = $('#hamburger'),
        isClosed = true;
    trigger.click(function () {
        burgerTime();
    });
    function burgerTime() {
        if (isClosed == true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    var menuRight = document.getElementById('cbp-spmenu-s2'),
        showRightPush = document.getElementById('hamburger'),
        body = document.body;
    if (!!showRightPush) {
        showRightPush.onclick = function () {
            classie.toggle(this, 'active');
            classie.toggle(body, 'cbp-spmenu-push-toleft');
            classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    $(function () {
        /*
         Dependencies : TweenMax and Draggable
         Test on touch device @ http://cloud.bassta.bg/before-after.html
         */
        var $dragMe = $("#dragme");
        var $beforeAfter = $("#before-after");
        var $viewAfter = $(".view-after");
        if ($("#dragme").length == 0)
            return;
        Draggable.create($dragMe, {
            type: "left",
            bounds: $beforeAfter,
            onDrag: updateImages
        });
        //Intro Animation
        animateTo(haft_win);
        $(window).resize(function () {
            var windowWidth = $(window).width(),
                haft_win = windowWidth / 2;
            animateTo(haft_win);
        });
        function updateImages() {
            TweenLite.set($viewAfter, {width: $dragMe.css("left")});
        }

        function animateTo(_left) {
            TweenLite.to($dragMe, 1, {left: _left, onUpdate: updateImages});
        }

        $beforeAfter.on("click", function (event) {
            var eventLeft = event.clientX - $beforeAfter.offset().left;
            animateTo(eventLeft);
        });
    });//end jQuery wrapper

});
