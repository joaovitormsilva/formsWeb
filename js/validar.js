//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector('#inputEmail');
var emailHelp = document.querySelector("#inputEmailHelp");

var senha = document.querySelector('#inputPassword');
var senhaHelp = document.querySelector("#inputPasswordHelp");

var barrinha = document.querySelector("#passStrengthMeter");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);
email.addEventListener('focusout',validarEmail);
senha.addEventListener('blur', () => {
        const nivelSeguranca = validarSenha(senha);
        if (nivelSeguranca === 'fraca') {
            senhaHelp.textContent = 'Senha fraca';
            senhaHelp.style.color = 'red';
            passStrengthMeter.value = 10; // Valor para senha fraca
        } else if (nivelSeguranca === 'moderada') {
            senhaHelp.textContent = 'Senha moderada';
            senhaHelp.style.color = 'orange';
            passStrengthMeter.value = 20; // Valor para senha moderada
        } else if (nivelSeguranca === 'forte') {
            senhaHelp.textContent = 'Senha forte';
            senhaHelp.style.color = 'green';
            passStrengthMeter.value = 30; // Valor para senha moderada
        }
    }
);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(nome){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[a-zA-Z ]{6,}$/; // Expressão regular para validar nome com apenas letras e mais de 6 caracteres


    console.log(nome); //impressão em console do objeto evento e
    console.log(nome.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   



  if (!regexNome.test(nome.target.value)) {
   // if(nome.target.value.length()<6 && !/^[a-zA-Z]+$/.test(nome.target.value)){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }
    
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>



ano.addEventListener('focusout', () => {
    const regexAno = /^[0-9]{4}$/; // Expressão regular para validar um ano no formato yyyy
  
    const anoTrimado = ano.value.trim(); // Remover espaços em branco antes e depois do ano
  
    if (anoTrimado.match(regexAno) == null) {
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red"; // Retorna mensagem de erro se o ano não atender ao formato yyyy
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()-2) ){
            //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()-2}.`;
            anoHelp.style.color="red";
        }

        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-124 ){
            //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
           anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-124}.`;
           anoHelp.style.color="red";
       }
        else{
            anoHelp.textContent = "";
        }
        return ""; // Retorna uma string vazia se o ano for válido

    }
}
);

function validarEmail(email){
   
    console.log(email.target.value);

    if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/.test(email.target.value)){
        emailHelp.textContent = ``;
    }
    else{
        emailHelp.textContent = "formato de email errado";
        emailHelp.style.color="red";

    }

}

function validarSenha(senha) {

    const senhaArrumada= senha.value;

    console.log(senhaArrumada);
    // Verifica se a senha atende aos critérios especificados
    const regexLetra = /[a-zA-Z]/;
    const regexNumero = /[0-9]/;
    const regexEspecial = /[@#%&!+]/;
   // const regexNome = new RegExp(nome.target.value, 'i');
    // const regexAno = new RegExp(ano.target.value, 'g');

    if(nome.value.split(' ').some(x => senhaArrumada.includes(x)) || senhaArrumada.includes(ano.value)){
        senhaHelp.textContent = "Senha não pode ser igual ao nome ou ano";
        senhaHelp.style.color="red";
    }
    else if(senhaArrumada.length >= 6 && senhaArrumada.length <= 20 && regexLetra.test(senhaArrumada) && regexEspecial.test(senhaArrumada) && regexNumero.test(senhaArrumada)){
        if(senhaArrumada.length < 8){
            return 'fraca';
        } else if(senhaArrumada.length >= 8 && senhaArrumada.length <= 12){
            return 'moderada';
        } else if(senhaArrumada.length > 12){
            const especiais = (senhaArrumada.match(/[@#%&!+]/g) || []).length;
            const numeros = (senhaArrumada.match(/[0-9]/g) || []).length;
            const maiusculas = (senhaArrumada.match(/[A-Z]/g) || []).length;

            if (especiais > 1 && numeros > 1 && maiusculas > 1) {
                return 'forte';
            }
        }
    }
    else{
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color="red";
    }

}
