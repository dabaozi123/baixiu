//修改密码
$('#modifyForm').on('submit', function() {
    var formData = $(this).serialize()

    //向服务端发送请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            // alert('密码修改成功')
            location.href = "/admin/login.html"
        }
    })
    return false;
})