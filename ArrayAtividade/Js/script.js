class Objeto {

    constructor(){
        this.id = 1;    
        this.arrayObjetos = [];  
        this.editId = null
    }
    
    salvar() {
        let objeto = this.lerdados();

        if(this.validarCampos(objeto)) {
            if(this.editId == null) {
                this.adicionar(objeto);
            } else{
                this.atualizar(this.editId, objeto);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayObjetos.length; i++ ) {
            let tr = tbody.insertRow();
            
            let td_id = tr.insertCell();
            let td_objeto = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayObjetos[i].id;
            td_objeto.innerText = this.arrayObjetos[i].nomeobjeto;
            
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = "/Imagens/create-outline.svg";
            imgEdit.setAttribute('onclick', "objeto.preparaEditacao("+ JSON.stringify(this.arrayObjetos[i]) +")");

            let imgdelete = document.createElement('img');
            imgdelete.src = '/Imagens/trash-outline.svg';
            imgdelete.setAttribute('onclick', "objeto.deletar("+ this.arrayObjetos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgdelete);
            //<td> <img> </td>

        }
    }

    adicionar(objeto) {
        this.arrayObjetos.push(objeto);
        this.id++;
    }

    atualizar(id, objeto) {
        for(let i = 0; i < this.arrayObjetos.length; i++ ) {
            if(this.arrayObjetos[i].id == id) {
                this.arrayObjetos[i].nomeobjeto = objeto.nomeobjeto
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;

        document.getElementById('objeto').value = dados.nomeobjeto;

        document.getElementById('btn1').innerText = 'Atualizar'
        
    }
    

    lerdados() {
        let objeto = {}
        
        objeto.id = this.id;
        objeto.nomeobjeto = document.getElementById('objeto').value;

        return objeto;
    }

    validarCampos(objeto) {
        let msg = '';

        if(objeto.nomeobjeto == '') {
            msg += '- Informe o nome do Objeto \n';
        }

        if(msg !='') {
            alert(msg);
            return false
        }

        return true
    }


    cancelar() {
        objeto.nomeobjeto = document.getElementById('objeto').value = '';

        document.getElementById('btn1').value = 'Salvar';
        this.editId = null
        
    }

    deletar(id) {
        if(confirm('Deseja realmente deletar o Objeto de ID ' + id +'?')) {
        
            let tbody = document.getElementById('tbody');

                for(let i = 0; i < this.arrayObjetos.length; i++) {
                    if(this.arrayObjetos[i].id == id) {
                        this.arrayObjetos.splice(i, 1);
                        tbody.deleteRow(i);
                }
            }
        }
    }

}

var objeto = new Objeto();