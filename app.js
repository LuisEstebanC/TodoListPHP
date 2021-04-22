$(document).ready(function() {

    let edit = false;
    let icontrash = '<i id="first" class="fa fa-trash-alt">';
    console.log('Jquery is working');
    $('#todo-result').hide();

    fetchTodos();

    $('#search').keyup(function(e) {
        console.log('Jquery is working');



        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'todo-search.php',
                type: 'POST',
                data: { search: search },
                success: function(response) {
                    let todos = JSON.parse(response);
                    console.log(todos);
                    let template = '';

                    todos.forEach(todo => {
                        template += `<li >${todo.title}</li>`
                    });

                    $('#container').html(template);
                    $('#todo-result').show();

                }
            });
        }
    });

    $('#todo-form').submit(function(e) {
        const postData = {
            title: $('#title').val(),
            description: $('#description').val(),
            id: $('#todoId').val()
        };

        let url = edit === false ? 'todo-add.php' : 'todo-edit.php';
        console.log(url);

        $.post(url, postData, function(response) {
            edit = false;
            fetchTodos();

            $('#todo-form').trigger('reset');
        });
        e.preventDefault();
        swal({
            title: "Todo save!",
            text: "Your todo is save!",
            icon: "success",
            button: "ok!",
        });
    });

    function fetchTodos() {
        $.ajax({
            url: 'todo-list.php',
            type: 'GET',
            success: function(response) {
                let todos = JSON.parse(response);
                let template = '';
                var count = 1;
                todos.forEach(todo => {

                    template += `
                        <tr todoId = "${todo.id}">
                            <td >${count}</td>
                            <td>
                                <a href='#' class='todo-item'>${todo.title}</a>
                            </td>
                            <td>${todo.description}</td>
                            <td>
                                <button class="todo-delete btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </td>
                            <td>
                            <button class="todo-item btn btn-info"><i class="far fa-edit"></i></button>
                        </td>
                        </tr>
                        
                    `
                    count++;
                });
                $('#todos').html(template);

            }
        });
    }

    $(document).on('click', '.todo-delete', function() {
        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this todo!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    let element = $(this)[0].parentElement.parentElement;
                    let id = $(element).attr('todoId');
                    $.post('todo-delete.php', { id }, function(response) {
                        fetchTodos();
                    })
                    swal("Your todo has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your todo is safe!");
                }
            });



    })

    $(document).on('click', '.todo-item', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('todoId');
        $.post('todo-single.php', { id }, function(response) {
            const todo = JSON.parse(response);
            $('#title').val(todo.title);
            $('#description').val(todo.description);
            $('#todoId').val(todo.id);
            edit = true;
        })

    });


});