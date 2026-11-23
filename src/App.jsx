import { useState, useEffect } from 'react';

function ItemFilme({ nome, ano }) {
  return (
    <li>
      {nome} ({ano})
    </li>
  );
}

function ListaFilmes({ filmes }) {
  return (
    <ul>
      {filmes.map((filme) => (
        <ItemFilme key={filme.id} nome={filme.nome} ano={filme.ano} />
      ))}
    </ul>
  );
}

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/filmes')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Deu problema na consulta');
        }
        return resposta.json();
      })
      .then((dados) => {
        setFilmes(dados);
        setCarregando(false);
      })
      .catch((e) => {
        setErro(e.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (filmes.length === 0) return <p>Nenhum filme cadastrado.</p>;

  return (
    <div>
      <h1>Meus filmes</h1>
      <ListaFilmes filmes={filmes} />
    </div>
  );
}

export default App;