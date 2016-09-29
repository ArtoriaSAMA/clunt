var Modal = function (option) {
    if($('.mine-modal').length){
        return;
    }

    // 一个公共的模态框
    var _modalHtml = [];

    // step1:创建遮罩层
    // todo:之后模态框html可以使用模板文件
    _modalHtml.push('<div class="mine-modal ' + (option.fade ? 'fade' : '') + '">');
    _modalHtml.push('<div class="mine-modal-dialog" style="' + option.style + '">');
    if (option.title) {
        _modalHtml.push('<div class="mine-modal-header">' + option.title + '<span class="mine-modal-cls js-cls">×</span></div>');
    }
    _modalHtml.push('<div class="mine-modal-body">' + (option.cont || '') + '</div>');

    if (option.btn) {
        _modalHtml.push('<div class="mine-modal-footer">' + (option.btn || '') + '</div>');
    }
    _modalHtml.push('</div>');
    _modalHtml.push('</div>');

    var $modal = $(_modalHtml.join('')).on('click', '.js-cls', function () {
        if ($modal.hasClass('fade')) {
            $modal.removeClass('in');
            setTimeout(function () {
                $modal.remove();
            }, 200);
        } else {
            $modal.remove();
        }
    });

    $('body').append($modal);
    if ($modal.hasClass('fade')) {
        setTimeout(function () {
            $modal.addClass('in');
        }, 0);
    }

    return $modal;
};

$('#openbtn').on('click', function () {
    Modal({
        style: 'width:390px;',
        fade: false,
        title: '标题'
    });
});