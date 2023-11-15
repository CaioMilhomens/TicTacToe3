import { useState } from 'react'
import './jogo.css'

const Jogo = () => {

    const [game, setGame] = useState({
        tabuleiro: [
            { casa: 0, texto: "", deletar: false, congelar: false },
            { casa: 1, texto: "", deletar: false, congelar: false },
            { casa: 2, texto: "", deletar: false, congelar: false },
            { casa: 3, texto: "", deletar: false, congelar: false },
            { casa: 4, texto: "", deletar: false, congelar: false },
            { casa: 5, texto: "", deletar: false, congelar: false },
            { casa: 6, texto: "", deletar: false, congelar: false },
            { casa: 7, texto: "", deletar: false, congelar: false },
            { casa: 8, texto: "", deletar: false, congelar: false },
        ],
        vez: "X",
        rodada: 0,
        ganhador: "",
        acabou: false,
        final: "parte_1"
    })

    const estadoDoJogo = (gameAtual) => {
        if ((gameAtual.tabuleiro[0].texto === "X" && gameAtual.tabuleiro[1].texto === "X" && gameAtual.tabuleiro[2].texto === "X") ||
            (gameAtual.tabuleiro[3].texto === "X" && gameAtual.tabuleiro[4].texto === "X" && gameAtual.tabuleiro[5].texto === "X") ||
            (gameAtual.tabuleiro[6].texto === "X" && gameAtual.tabuleiro[7].texto === "X" && gameAtual.tabuleiro[8].texto === "X") ||
            (gameAtual.tabuleiro[0].texto === "X" && gameAtual.tabuleiro[4].texto === "X" && gameAtual.tabuleiro[8].texto === "X") ||
            (gameAtual.tabuleiro[2].texto === "X" && gameAtual.tabuleiro[4].texto === "X" && gameAtual.tabuleiro[6].texto === "X") ||
            (gameAtual.tabuleiro[1].texto === "X" && gameAtual.tabuleiro[4].texto === "X" && gameAtual.tabuleiro[7].texto === "X") ||
            (gameAtual.tabuleiro[0].texto === "X" && gameAtual.tabuleiro[3].texto === "X" && gameAtual.tabuleiro[6].texto === "X") ||
            (gameAtual.tabuleiro[2].texto === "X" && gameAtual.tabuleiro[5].texto === "X" && gameAtual.tabuleiro[8].texto === "X")) 
            {gameAtual.ganhador = "X"; gameAtual.acabou = true; return(gameAtual)}
            
            else if (
             (gameAtual.tabuleiro[0].texto === "O" && gameAtual.tabuleiro[1].texto === "O" && gameAtual.tabuleiro[2].texto === "O") ||
             (gameAtual.tabuleiro[3].texto === "O" && gameAtual.tabuleiro[4].texto === "O" && gameAtual.tabuleiro[5].texto === "O") ||
             (gameAtual.tabuleiro[6].texto === "O" && gameAtual.tabuleiro[7].texto === "O" && gameAtual.tabuleiro[8].texto === "O") ||
             (gameAtual.tabuleiro[0].texto === "O" && gameAtual.tabuleiro[4].texto === "O" && gameAtual.tabuleiro[8].texto === "O") ||
             (gameAtual.tabuleiro[2].texto === "O" && gameAtual.tabuleiro[4].texto === "O" && gameAtual.tabuleiro[6].texto === "O") ||
             (gameAtual.tabuleiro[1].texto === "O" && gameAtual.tabuleiro[4].texto === "O" && gameAtual.tabuleiro[7].texto === "O") ||
             (gameAtual.tabuleiro[0].texto === "O" && gameAtual.tabuleiro[3].texto === "O" && gameAtual.tabuleiro[6].texto === "O") ||
             (gameAtual.tabuleiro[2].texto === "O" && gameAtual.tabuleiro[5].texto === "O" && gameAtual.tabuleiro[8].texto === "O")) 
             {gameAtual.ganhador = "O"; gameAtual.acabou = true; return(gameAtual)}
    }

    function jogar(itemCasa) {
        // Recebe o game e cria um novo array e atualiza a rodada
        let gameAtual = { ...game };
        let rodadaAtual = game.rodada

        //Quando a rodada for menor que 7 não há necessidade de tirar peças
        if (rodadaAtual < 5 && gameAtual.acabou === false) {

            if (gameAtual.tabuleiro[itemCasa].texto === "") {

                // Troca texto da casa de "" para a letra da "Vez"
                gameAtual.tabuleiro[itemCasa].texto = game.vez
                gameAtual.rodada += 1

                // tentativa de fazer o IF
                if (gameAtual.vez === "X") { gameAtual.vez = "O" }
                else if (gameAtual.vez === "O") { gameAtual.vez = "X" }

                //finalizando o estado
                estadoDoJogo(gameAtual)
                setGame({ ...gameAtual })
                console.log(gameAtual)
                
            }

        }

        if (rodadaAtual === 5 && gameAtual.acabou === false) {

            if (gameAtual.tabuleiro[itemCasa].texto === "") {

                // Troca texto da casa de "" para a letra da "Vez"
                gameAtual.tabuleiro[itemCasa].texto = game.vez
                gameAtual.rodada += 1

                // tentativa de fazer o IF
                if (gameAtual.vez === "X") { gameAtual.vez = "O" }
                else if (gameAtual.vez === "O") { gameAtual.vez = "X" }

                //faz um foreach e adiciona classes às divs
                
                gameAtual.tabuleiro.forEach(elemento => {
                    if (elemento.texto === gameAtual.vez) {
                        elemento.deletar = true
                    }
                    if (elemento.texto !== gameAtual.vez) {
                        elemento.congelar = true
                    }})

                //finalizando o estado
                estadoDoJogo(gameAtual)
                setGame({ ...gameAtual })
                console.log(gameAtual)
                
            }

        }

        if (rodadaAtual >= 6 && gameAtual.final === "parte_1" && gameAtual.acabou === false) {
            //cria nova instancia para trabalharmos
            gameAtual.tabuleiro[itemCasa].texto = "";

            gameAtual.tabuleiro.forEach(elemento => { elemento.deletar = false; elemento.congelar = false});
            gameAtual.final = "parte_2";
            setGame(gameAtual);
            estadoDoJogo(gameAtual)
            console.log(gameAtual)
        }

        else if (rodadaAtual >= 6 && gameAtual.final === "parte_2" && gameAtual.acabou === false) {
            //cria nova instancia para trabalharmos
            gameAtual.tabuleiro[itemCasa].texto = gameAtual.vez;
            
            if (gameAtual.vez === "X") {
                gameAtual.vez = "O";
            } else if (gameAtual.vez === "O") {
                gameAtual.vez = "X"
            }
            
            gameAtual.final = "parte_1";
            console.log(gameAtual)

            gameAtual.tabuleiro.forEach(elemento => {
                if (elemento.texto === gameAtual.vez) {
                    elemento.deletar = true                   
                } else if (elemento.texto !== gameAtual.vez) {
                    elemento.congelar = true
                }
            })

            setGame(gameAtual);
            estadoDoJogo(gameAtual)
            console.log(gameAtual)
        }
        
    }


    return (
        <div className='pagina'>
            <div>
                <div className='linha' >
                    {game.tabuleiro.slice(0, 3).map(item => <div key={item.casa} className={`bloco ${game.acabou? "cabou": null}  ${item.deletar === true ? "deletar" : null} ${item.congelar ? "congelar": null}`} onClick={() => jogar(item.casa)} >{item.texto}</div>)}
                </div>

                <div className='linha' >
                    {game.tabuleiro.slice(3, 6).map(item => <div key={item.casa} className={`bloco ${game.acabou? "cabou": null} ${item.deletar === true ? "deletar" : null} ${item.congelar ? "congelar": null}`} onClick={() => jogar(item.casa)} >{item.texto}</div>)}
                </div>

                <div className='linha' >
                    {game.tabuleiro.slice(6, 9).map(item => <div key={item.casa} className={`bloco ${game.acabou? "cabou": null} ${item.deletar === true ? "deletar" : null} ${item.congelar ? "congelar": null}`} onClick={() => jogar(item.casa)} >{item.texto}</div>)}
                </div>
            </div>

            <div>
                {game.ganhador !== "" ? `o time "${game.ganhador}" ganhou o jogo` : game.ganhador}    
            </div>

            <div>
                <button className={`botao ${game.acabou ? "botaoAcabou" : null}` } onClick={() => window.location.reload()} >Resetar a partida</button>
            </div>

        </div>


    )
}

export default Jogo