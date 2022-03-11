class ValidateForm {
    constructor() {
        this.form = document.querySelector('.form-content');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log('Não enviou');

        const fieldsIsValid = this.checkFields();
        const passwordsIsValid = this.checkPasswords();

        if(fieldsIsValid && passwordsIsValid){
            alert('Cadastrado com Sucesso!');
            this.form.submit();
        }
    }

    checkFields() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let field of this.form.querySelectorAll('.validate')) {
            if (!field.value) {
                const message = `Campo "${field.previousElementSibling.innerHTML}" não pode estar em branco`;
                this.createError(field, message);
                valid = false;
            }
            //console.log(valid);

            if (field.classList.contains('cpf')) {
                if (!this.validationCPF(field)) valid = false;
            }


            if (field.classList.contains('user')) {
                if (!this.validationUser(field)) valid = false;
            }
        }

        return valid;
    }

    validationUser(field) {
        const user = field.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            const message = 'Usuário Inválido, deve conter entre 3 e 12 caracteres'
            this.createError(field, message);
            valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            const message = 'Usuário Inválido, deve conter apenas letras e/ou números'
            this.createError(field, message);
            valid = false;
        }
        return valid;
    }

    validationCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if (!cpf.valida()) {
            const message = 'CPF Inválido'
            this.createError(field, message);
            return false;
        }
        return true;
    }

    checkPasswords(){
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');

        if(password.value !== repeatPassword.value) {
            const message = 'As senhas nos campos "Senha" e "Repetir Senha" precisam ser iguais'
            this.createError(password, message);
            this.createError(repeatPassword, message);
            return false;
        }

        if(password.value.length < 6 || password.value.length > 12){
            const message = 'Senha Inválida, deve conter entre 6 e 12 caracteres'
            this.createError(password, message);
            valid = false;
        }
        return valid;
    }

    createError(field, message) {
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div); //colocando a mensgaem logo depois do campo
    }
}

const valida = new ValidateForm()


