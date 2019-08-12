$('#login').on('click', function {
    var isConfirm = confirm('确定退出吗')

    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/login',
            success: function(response) {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }

})