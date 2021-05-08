import React, { useState, useEffect } from 'react';
import Square from './Square';
import createBoard from '../utils/createBoard';
import revealWinner from '../utils/revealWinner';
import randomIndex from '../utils/randomIndex';
import './Styles.css';
let score={'X':0,'O':0}
export default function Board() {
    const [board, setBoard] = useState([]);
    const [xnext, setxNext] = useState(true);
    const [nextmove, setnextMove] = useState(null);
    const [turn, setTotalTurn] = useState(0);
    const [players, setPlayers] = useState({
        human: 'X',
        computer: 'O'
    })

    const winner = revealWinner(board);
    let status;
    if (winner) {
        score[winner]+=1;
        status = winner === 'X' ? 'You won' : 'Computer Won';
    }else if(turn<9) {
        status = (xnext ? "Your Turn" : "Computer's Turn");
    } else if (turn===9){
        status = 'Match Tie';
    }

    const computerMove = () => {
        let index = randomIndex(0, 8);
        while (board[index]) {
            index = randomIndex(0, 8);
        };
        setxNext(!xnext);
        setBoard(board => {
            const newBoard = board.concat();
            newBoard[index] = xnext ? 'X' : 'O';
            return newBoard;
        });
        if(turn<9){
            setnextMove(players.human);
            setTotalTurn(turn+1);
        }
        


    }

    useEffect(() => {
        let timeout;
        if (nextmove !== null && nextmove === players.computer && winner === null && turn !==9 ) {
            timeout = setTimeout(() => {
                computerMove();
            }, 500);
        }
        return () => timeout && clearTimeout(timeout);
    }, [nextmove]);


    const handleRefresh=()=>{
        const newBoard = createBoard();
        setBoard(newBoard);
        setTotalTurn(0);
        setxNext(true);
        setnextMove(players.human);
    }

    useEffect(() => {
        handleRefresh();
    }, []);

    const humanPlayerMove = (index) => {
        if (board[index] || revealWinner(board) || nextmove===players.computer) {
            return;
        }
        setxNext(!xnext);
        setBoard(board => {
            const newBoard = board.concat();
            newBoard[index] = xnext ? 'X' : 'O';
            return newBoard;
        });
        if(turn<9){
            setnextMove(players.computer);
            setTotalTurn(turn+1);   
        }
        
    }


    return (
        <div>
            <div className="player">
                
                {status} 

                

                <button className="btn" onClick={handleRefresh} >Restart</button>
            
            </div>
            <div className="score">
                   <span>
                    Your Score : {score['X']}
                   </span>
                   <span>
                    Computer Score : {score['O']}
                   </span>
                    
            </div>
            
            <div className="display-flex">
                {
                    board.map((grid, index) => {
                        return <Square value={board[index]} key={index} revealGrid={() => humanPlayerMove(index)} />
                    })
                }
            </div>
            <div className="game-info">
                <span className="info">Human : X</span>
                <span className="info">Computer : O</span>
            </div>
        </div>
    )
}
