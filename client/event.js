//event login

function loginHandler($email, $password) {
    console.log('tes')
    let objValue = {
        email: $email,
        password: $password
    }
    $.ajax({
        url: `http://localhost:3000/login`,
        method: 'POST',
        data: objValue,
        success: (result) => {
            localStorage.access_token = result.access_token
            $mainPage.show()
            $loginPage.hide()
            fetchData()
        },
        error: (xhr, status) => {
            const error = JSON.parse(xhr.responseText)
            console.log(error)
            $('#error-notif').find('p').addClass('text-danger').text(error.message)
            setTimeout(() => {
                $('#error-notif').hide().fadeOut(2000)
            }, 2000);
        }
    })
}

function registerHandler($name, $email, $password) {
    let objValue = {
        name: $name,
        email: $email,
        password: $password
    }
    $.ajax({
        url: `${url}/register`,
        method: 'POST',
        data: objValue,
        success: (result) => {
            $('#error-notif').find('p').addClass('text-primary').text('Sukses')
        },
        error: (xhr, status) => {
            const error = JSON.parse(xhr.responseText)
            console.log(error)
            $('#error-notif').find('p').addClass('text-danger').text(error.message)
            setTimeout(() => {
                $('#error-notif').hide().fadeOut(2000)
            }, 2000);
        }
    })
}

function fetchData() {
    return $.ajax({
        headers: {
            access_token: localStorage.access_token
        },
        url: `${url}/comics`,
        success: (result) => {
            listData(result)
        },
        error: (xhr, status) => {
            console.log(xhr)
        }

    })
}

function fetchDataById(id) {
    return $.ajax({
        headers: {
            access_token: localStorage.access_token
        },
        url: `${url}/comics/${id}`,
        success: (result) => {
            $('#edit_id').val(result.id)
            $('#title').val(result.title)
            $('#author').val(result.author)
            $('#image').val(result.imageUrl)
            $('#update').show()
        },
        error: (xhr, status) => {
            console.log(xhr)
        }
    })
}

function updateData($title, $author, $image, $id) {
    let objValue = {
        title: $title,
        author: $author,
        imageUrl: $image
    }
    $.ajax({
        url: `${url}/comics/${$id}`,
        method: 'PUT',
        data: objValue,
        success: (result) => {
            $('#error-notif').find('p').addClass('text-primary').text('Sukses')
            $('#update').hide()
            fetchData()
        },
        error: (xhr, status) => {
            const error = JSON.parse(xhr.responseText)
            console.log(error)
            $('#error-notif').find('p').addClass('text-danger').text(error.message)
            setTimeout(() => {
                $('#error-notif').hide().fadeOut(2000)
            }, 2000);
        }
    })
}

function listData(data) {
    for (let i = 0; i < data.length; i++) {
        let $item = $($template)
        $item.find('img').attr('src', data[i].imageUrl)
        $item.find('.card-title').text(data[i].title)
        $item.find('.card-text').text(data[i].author)
        $item.find('.updates').attr('data-id', data[i].id)
        $container.append($item)
    }
}


$formLogin.submit(function (e) {
    e.preventDefault()
    loginHandler($email.val(), $password.val())
})

if (localStorage.access_token) {
    $loginPage.hide()
    $registerPage.hide()
    $('#btn-logout').show()
    fetchData()
    $mainPage.show()
} else {
    $registerPage.hide()
    $('#btn-logout').hide()
}

$('#btnRegisterPage').click(function () {
    $loginPage.hide()
    $registerPage.show()
})

$('#form-register').submit(function (e) {
    alert('tes')
    e.preventDefault()
    registerHandler($nameReg.val(), $emailReg.val(), $passwordReg.val())
})

$('#btnLoginPage').click(function () {
    $loginPage.show()
    $registerPage.hide()
})

$(this).click(function (e) {
    if (document.activeElement.id === 'updatecommic') {
        e.preventDefault()
        fetchDataById($(document.activeElement).data('id'))
    }
})

$formUpdate.submit(function (e) {
    e.preventDefault()
    updateData($title.val(), $author.val(), $image.val(), $id.val())
})