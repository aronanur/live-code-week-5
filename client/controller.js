class Controller {

    static loginHandler($email, $password) {
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
                this.fetchData()
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

    static registerHandler($name, $email, $password) {
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

    static fetchData() {
        return $.ajax({
            headers: {
                access_token: localStorage.access_token
            },
            url: `${url}/comics`,
            success: (result) => {
                this.listData(result)
            },
            error: (xhr, status) => {
                console.log(xhr)
            }

        })
    }

    static fetchDataById(id) {
        return $.ajax({
            headers: {
                access_token: localStorage.access_token
            },
            url: `${url}/comics/${id}`,
            success: (result) => {
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

    static updateData($title, $author, $image, $id) {
        let objValue = {
            title: $title,
            author: $author,
            imageUrl: $image
        }
        $.ajax({
            url: `${url}/update/${$id}`,
            method: 'PUT',
            data: objValue,
            success: (result) => {
                $('#error-notif').find('p').addClass('text-primary').text('Sukses')
                $('#update').hide()
                this.fetchData()
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

    static listData(data) {
        for (let i = 0; i < data.length; i++) {
            let $item = $($template)
            $item.find('img').attr('src', data[i].imageUrl)
            $item.find('.card-title').text(data[i].title)
            $item.find('.card-text').text(data[i].author)
            $item.find('.updates').attr('data-id', data[i].id)
            $container.append($item)
        }
    }

}