$('#userForm').on('submit', function() {

    var formData = $(this).serialize()
        //向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            //刷新页面
            location.reload()
        },
        error: function() {
            alert('用户添加失败')
        }
    })
    return false

})
$('#modifyBox').on('change', '#avatar', function() {
        var formData = new FormData
        formData.append('avatar', this.files[0])

        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //告诉ajax不要解析请求参数
            processData: false,
            //告诉ajax不要设置请求参数的类型
            contentType: false,

            success: function(data) {
                $('#preview').attr('src', data[0].avatar)
                $('#hiddenAvatar').val(data[0].avatar)

            }
        })
    })
    // 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response)
            // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', { data: response });
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})

//通过事件委托为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(response) {
                console.log(response);
                var html = template('modifyTpl', response);
                $('#modifyBox').html(html);
            }
        })
    })
    //未修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
        //获取用户在表单输入的内容
        var formData = $(this).serialize()
            //获取要修改用户的id
        var id = $(this).attr('data-id')
            //发送请求 修改用户信息
        $.ajax({
                type: 'put',
                url: '/users/' + id,
                data: formData,
                success: function(response) {
                    // 修改用户信息成功 重新加载页面
                    location.reload()
                }
            })
            //阻止表单提交
        return false
    })
    // 点击删除按钮
$('#userBox').on('click', '.delete', function() {
        if (confirm('您真的要删除吗')) {
            // 获取要删除用户的id
            var id = $(this).attr('data-id')
        }
        // 向服务器端气你去数据
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    })
    // 获取全选按钮
var selectAll = $('#selectAll')
    // 获取批量删除按钮
var deleteMany = $('#deleteMany')
    // 当全选按钮的状态发生改变时
selectAll.on('change', function() {
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked')
    console.log(status)

    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status)
})



$('#userBox').on('change', '.userStatus', function() {
    // 获取到所有用户 在所有用户中过滤出选中的用户
    // 判断选中用户的数量和所有用户的数量是否一致
    // 如果一致 就说明所有的用户都是选中的
    // 否则 就是有用户没有被选中
    var inputs = $('#userBox').find('input');

    if (inputs.length == inputs.filter(':checked').length) {
        // alert('所有用户都是选中的')
        selectAll.prop('checked', true)
    } else {
        // alert('不是所有用户都是选中的')
        selectAll.prop('checked', false)
    }

    console.log(inputs.filter(':checked').length);
    console.log(deleteMany);


    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
})


deleteMany.on('click', function() {
    console.log(1);

    var ids = []

    var checkedUser = $('#userBox').find('input').filter(':checked')

    console.log(checkedUser);

    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })

    if (confirm('您真的要批量删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }
})