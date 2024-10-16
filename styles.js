function showForm(formNumber) {
    var forms = document.querySelectorAll('.form-register');
    forms.forEach(function(form) {
        form.classList.remove('button-active');
    });

    var form = document.getElementById('form' + formNumber);
    form.classList.add('button-active');

    var buttons = document.querySelectorAll('.buttons-register button');
    buttons.forEach(function(button, index) {
        if (index === formNumber - 1) {
            button.classList.add('button-active');
        } else {
            button.classList.remove('button-active');
        }
    });
}