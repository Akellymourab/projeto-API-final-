function listarTodos(){
    fetch('http://localhost:8000/produtos')
        .then(res => res.json())
        .then(dados => {
            tabela_produtos.innerHTML = "";
            dados.map(cada => {
                tabela_produtos.innerHTML += `
                    <tr>
                        <td>${cada.id}</td>
                        <td>${cada.nome}</td>
                        <td>
                            <img width="100px" src="${cada.imagem}">
                        </td>
                        <td>
                            <button class="btn btn-primary">Editar</button>
                            <button class="btn btn-primary" onclick="remover('${cada.id}')">Excluir</button>
                            <button class="btn btn-primary" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Outras Informações</button>
                        </td>
                    </tr>
                `;  
            })
        });
}listarTodos();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mostrar()                                               
{
    event.preventDefault();
    let produto = {
        titulo: titulo.value,
        descricao: descricao.value,
        imagem: imagem.value
    }

    fetch('http://localhost:8000/produtos/', {
        headers:{
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(banner)
    })
    .then(res => res.json())
    .then(() => {
        listarTodos();
    })
}
//////////////////////////////////////////////////////////////////
function remover(id) {
    fetch('http://localhost:8000/produtos/'+id, {
        method: 'DELETE'
    });

    alert('Pronto, banner excluido');
    location.href="banners.html";
}