(function (fn) {
    'use strict';
    try {
        fn($);
    } catch (e) {
        console.log(e.message);
    }

})(function ($) {
    if ($.fn.cluntSelect) {
        return;
    }

    $(function () {
        $('body').on('click', function () {
            $('.clunt-select').removeClass('open');
        });
    });

    $.fn.cluntSelect = function (option) {
        this.each(function () {
            if ($(this).is('select')) {
                bind($(prep(this)), $(this)).insertBefore($(this).hide());
            }
        });

        /**
         * 注册需要的事件
         */
        function bind($select, $target) {
            $select.on('click', function (event) {
                if (!$(this).hasClass('open') && !$target.attr('data-readonly')) {
                    event.stopPropagation();
                    $('.clunt-select').removeClass('open');

                    $(this).addClass('open').find('.clunt-item.checked').addClass('hover').siblings().removeClass('hover');
                }
            }).on('click', '.clunt-item', function () {
                if (!$target.attr('data-readonly')) {
                    if ($(this).hasClass('disabled')) {
                        event.stopPropagation();
                    } else {
                        if (!$(this).hasClass('checked')) {
                            $target.val($(this).attr('data-value')).change();
                        }
                    }
                }
            }).on('mouseleave', '.clunt-select-list', function (event) {
                $('.clunt-select').removeClass('open');
            }).on('mouseenter', '.clunt-group', function (event) {
                $(this).find('ul:first').show();
            }).on('mouseleave', '.clunt-group', function (event) {
                $(this).find('ul:first').hide();
            }).on('mouseenter', function () {
                if (option.mouseenter) {
                    $(this).click();
                }
            });

            $target.on('change', function () {
                var list = param($target.children());
                $select.find('.clunt-select-list').html(list);

                var val = $(this).val();
                var $checked = $select.find('.clunt-item[data-value="' + val + '"]');
                var text = $checked.html() || ($target.attr('data-placeholder' || ''));

                updateValue($checked, text);
            });

            return $select;
        }

        function updateValue($checked, text) {
            $checked.parents('.clunt-select').find('.clunt-select-show').html(text);
            $checked.addClass('checked').siblings().removeClass('checked');
        }

        /**
         * 创建下拉菜单显示部分 
         */
        function prep(select) {
            var val = $(select).find('option:selected').html() || ($(select).attr('data-placeholder') || '');
            var list = param($(select).children());

            var _html = [];
            _html.push('<div class="clunt-select">');
            _html.push('<div class="clunt-select-show">' + val + '</div>');
            _html.push('<div class="clunt-select-options"><ul class="clunt-select-list">' + list + '</ul></div>');
            _html.push('</div>');

            return _html.join('');
        }

        /**
         * 创建下拉菜单列表部分
         */
        function param(options) {
            var _html = [];
            options.each(function () {
                var text = $(this).text();
                var val = $(this).val();
                var selected = $(this).is(':selected');
                var disabled = $(this).attr('disabled');
                if ($(this).is('option')) {
                    _html.push('<li class="clunt-item ' + (selected ? 'hover checked' : '') + (disabled ? ' disabled' : '') + '" data-value="' + val + '">' + text + '</li>');
                } else if ($(this).is('optgroup')) {
                    var list = param($(this).children());
                    text = $(this).attr('label');
                    _html.push('<li class="clunt-group">' + text + '<ul class="clunt-item-list">' + list + '</ul></li>');
                }
            });

            return _html.join('');
        }
    }
});


(function (fn) {
    'use strict';
    try {
        fn($);
    } catch (e) {
        console.log(e.message);
    }
})(function ($) {
    if ($.fn.cluntInput) {
        return;
    }

    $.fn.cluntInput = function (option, fn) {
        this.each(function () {
            bind($(this), prep()).insertAfter($(this));
        });

        var $this = this;

        function bind($input, $list) {
            $input.on('keydown', function (event) {
                var code = event.keyCode;
                switch (code) {
                    case 38:
                        event.preventDefault();
                        if ($list.find('li.on').length) {
                            var i = $list.find('li.on').index();
                            if (i) {
                                $list.find('li').eq(i - 1).addClass('on').siblings().removeClass('on');
                            }
                        } else {
                            $list.find('li:last').addClass('on');
                        }
                        break;
                    case 40:
                        event.preventDefault();
                        if ($list.find('li.on').length) {
                            if (!$list.find('li:last').hasClass('on')) {
                                var i = $list.find('li.on').index();
                                $list.find('li').eq(i + 1).addClass('on').siblings().removeClass('on');
                            }
                        } else {
                            $list.find('li:first').addClass('on');
                        }
                        break;
                    case 13:
                        event.preventDefault();
                        if ($list.find('li.on').length) {
                            $list.find('li.on').click();
                        }
                        break;
                    case 27:
                        $list.hide();
                        $list.find('li.checked').addClass('on').siblings().removeClass('on');
                        break;
                    default:
                        break;
                }
            }).on('input propertychange', function () {
                if (fn) {
                    fn($input, $list);
                } else {
                    if (option.data instanceof Array) {
                        var val = $input.val();
                        if (!val) { return; }
                        var data = option.data.filter(function (item) {
                            return ~(option.text ? item[option.text] : item).indexOf(val);
                        });
                        updateList(data);
                        $list.show();
                    }
                }
            });

            $list.on('click', '.clunt-input-item', function () {
                $input.val($(this).html());

                if (option['data-key'] instanceof Array) {
                    option['data-key'].forEach(function (_item) {
                        $input.attr('data-' + _item, ($(this).attr('data-' + _item) || ''));
                    });
                }

                $(this).addClass('checked').siblings().removeClass('checked');
                $list.hide();
            }).on('mouseenter', '.clunt-input-item', function () {
                $(this).addClass('on').siblings().removeClass('on');
            }).on('mouseleave', function () {
                $(this).hide();
                $(this).find('li.checked').addClass('on').siblings().removeClass('on');
            });
            return $list;
        }

        function prep() {
            var _html = [];

            _html.push('<div class="clunt-input-panel">');
            _html.push('<ul class="clunt-input-list">');

            _html.push((option.data ? param(option.data) : ''));

            _html.push('</ul>');
            _html.push('</div>');

            return $(_html.join(''));
        }

        function param(arr) {
            if (arr instanceof Array) {
                var _list = arr.map(function (item) {
                    if (option['data-key'] instanceof Array) {
                        var key = option['data-key'].map(function (_item) {
                            return 'data-' + _item + '="' + item[_item] + '"';
                        });
                    }
                    return '<li class="clunt-input-item" ' + (key ? key.join(' ') : '') + '>' + (option.text ? item[option.text] : item) + '</li>';
                });

                return _list.join('');
            }
        }

        function updateList(data) {
            var _data = data || option.data;
            var _html = param(data);
            $this.next().find('.clunt-input-list').html(_html);
        }

        return {
            refresh: updateList
        }
    }
});

$('select').cluntSelect({
    // mouseenter: true
});

var obj = $('#clunt-input').cluntInput({
    text: '',
    'data-key': [],
    data: [
        'one',
        'two',
        'thr',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten'
    ]
}, function ($input, $list) {

    // 更新下拉面板，data是需要更新的数据
    obj.refresh(data);
    // 手动打开下拉面板
    $list.show();
});

// var cluntdate = $('#cluntdate').Zebra_DatePicker().data('Zebra_DatePicker');