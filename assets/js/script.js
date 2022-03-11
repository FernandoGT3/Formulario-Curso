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

        this.checkFields();
    }

    checkFields(){
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validate')){
            if(!field.value){
                const message = `Campo "${field.previousElementSibling.innerHTML}" não pode estar em branco`;
                this.createError(field, message);
                valid = false;
            }
            //console.log(valid);

            if(field.classList.contains('cpf')){
                if(!this.validationCPF(field)) valid = false;
            }
        }
    }

    validationCPF(field){
        const cpf = new ValidaCPF(field.value);

        if(!cpf.valida()){
            const message = 'CPF Inválido'
            this.createError(field, message);
            return false;
        }
        return true;
    }

    createError(field, message){
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div); //colocando a mensgaem logo depois do campo
    }
}

const valida = new ValidateForm()


