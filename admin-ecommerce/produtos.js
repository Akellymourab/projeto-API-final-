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
                            <button class="btn btn-primary" onclick="mostrar">Outras Informações</button>
                        </td>
                    </tr>
                `;  
            })
        });
}listarTodos();