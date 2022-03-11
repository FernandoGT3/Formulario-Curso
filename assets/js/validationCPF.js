//Valindando CPF

class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this,'cpfLimpo',{
            value: cpfEnviado.replace(/\D+/g, ''),
            writable: false
        });
    }
    
    static criaDigito(cpfParcial){
        const cpfParcialArray = Array.from(cpfParcial);

        const soma = ValidaCPF.realizaConta(cpfParcialArray);

        const digito = 11 - (soma % 11);

        return digito > 9 ? 0 : digito;
    }

    static realizaConta(cpfParcialArray){
        let contRegressivo = cpfParcialArray.length + 1;

        const soma = cpfParcialArray.reduce((acumulador, valor) =>{
            acumulador += Number(valor) * contRegressivo;
            contRegressivo--;
            return acumulador;
        }, 0);

        return soma;
    }

    valida(){
        if(typeof this.cpfLimpo === 'undefined') return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;

        if(this.éSequencia()) return false;

        const novoCPF = this.geraNovoCPF();

        return (novoCPF === this.cpfLimpo);
    }

    geraNovoCPF(){

        const cpfParcial = this.cpfLimpo.slice(0,-2);

        const primeiroDigito = ValidaCPF.criaDigito(cpfParcial);

        const segundoDigito = ValidaCPF.criaDigito(cpfParcial + primeiroDigito);

        return cpfParcial + String(primeiroDigito) + String(segundoDigito);
    }

    éSequencia(){
        return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo; 
    }
}
