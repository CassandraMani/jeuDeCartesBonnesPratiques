import React, { useState, useEffect } from 'react';

// Import card images (you'll need to add these to your project)
import sasTransfertImg from './cards/sas_transfert.jpg';
import reparationImg from './cards/reparation.jpg';
import nettoyageImg from './cards/nettoyage.jpg';
import personnelImg from './cards/personnel.jpg';
import traitementAirImg from './cards/traitement_air.jpg';
import stockageImg from './cards/stockage.jpg';
import zonesReposImg from './cards/zones_repos.jpg';
import materielsImg from './cards/materiels.jpg';
import implantationImg from './cards/implantation.jpg';
import melangeFluxImg from './cards/melange_flux.jpg';
import insectesImg from './cards/insectes.jpg';
import humiditeImg from './cards/humidite.jpg';
import eclairageImg from './cards/eclairage.jpg';
import poussiereImg from './cards/poussiere.jpg';
import proliferationImg from './cards/proliferation.jpg';
import contaminationImg from './cards/contamination.jpg';
import fuiteAirImg from './cards/fuite_air.jpg';
import intrusionImg from './cards/intrusion.jpg';
import inspectionImg from './cards/inspection.jpg';
import conflitImg from './cards/conflit.jpg';
import volImg from './cards/vol.jpg';
import jokerImg from './cards/joker.jpg';

//Importing the css
import "./GMPGame.css"

const GMPGame = () => {
  // Define card types with image references
  const goodPracticesCards = [
    { id: 1, name: 'SAS DE TRANSFERT', value: 2, img: sasTransfertImg },
    { id: 2, name: 'RÉPARATION ET ENTRETIEN NETTOYAGE', value: 1, img: reparationImg },
    { id: 3, name: 'PERSONNEL BIEN DÉFINI', value: 1, img: personnelImg },
    { id: 4, name: 'Traitement de l\'air et de la ventilation', value: 1, img: traitementAirImg },
    { id: 5, name: 'Stockage', value: 1, img: stockageImg },
    { id: 6, name: 'Zones de repos/restauration séparées', value: 2, img: zonesReposImg },
    { id: 7, name: 'Matériels et équipements', value: 1, img: materielsImg },
    { id: 8, name: 'Implantation et environnement', value: 1, img: implantationImg },
    { id: 9, name: 'Mélange de Flux', value: 2, img: melangeFluxImg }
  ];

  const dangerCards = [
    { id: 10, name: 'ENTRÉE INSECTE ET ANIMAUX', value: -2, img: insectesImg },
    { id: 11, name: 'HUMIDITÉ', value: -1, img: humiditeImg },
    { id: 12, name: 'MAUVAIS ÉCLAIRAGE', value: -1, img: eclairageImg },
    { id: 13, name: 'Poussière en suspension', value: -2, img: poussiereImg },
    { id: 14, name: 'Prolifération microbienne', value: -1, img: proliferationImg },
    { id: 15, name: 'Contamination croisée', value: -1, img: contaminationImg },
    { id: 16, name: 'Fuite d\'air', value: -1, img: fuiteAirImg },
    { id: 17, name: 'Intrusion nuisible', value: -2, img: intrusionImg }
  ];

  const problemCards = [
    { id: 18, name: 'INSPECTION SURPRISE', img: inspectionImg },
    { id: 19, name: 'CONFLIT D\'ÉQUIPE', img: conflitImg },
    { id: 20, name: 'VOL DE MATÉRIEL', img: volImg }
  ];

  const jokerCards = [
    { id: 21, name: 'JOKER', img: jokerImg },
    { id: 22, name: 'JOKER', img: jokerImg },
    { id: 23, name: 'JOKER', img: jokerImg }
  ];

  // Game state
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDangerCard, setSelectedDangerCard] = useState(null);
  const [targetPlayer, setTargetPlayer] = useState(null);
  const [actionLog, setActionLog] = useState([]);
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Responsable Qualité 1', 'Responsable Qualité 2']);

  // Handle player name change
  const handleNameChange = (index, newName) => {
    const newNames = [...playerNames];
    newNames[index] = newName;
    setPlayerNames(newNames);
  };

  // Initialize the game
  const initializeGame = () => {
    // Create players array based on selected number
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: playerNames[i] || `Responsable Qualité ${i + 1}`,
      hand: [],
      score: 0,
      isActive: i === 0,
      skipTurn: false
    }));

    // Combine all cards
    let allCards = [
      ...goodPracticesCards,
      ...dangerCards,
      ...problemCards,
      ...jokerCards
    ];
    
    // Shuffle the deck
    const shuffledDeck = [...allCards].sort(() => Math.random() - 0.5);
    
    // Deal initial hands (3 cards per player)
    const playersWithHands = newPlayers.map(player => ({
      ...player,
      hand: shuffledDeck.splice(0, 3)
    }));
    
    setDeck(shuffledDeck);
    setPlayers(playersWithHands);
    setCurrentPlayerIndex(0);
    setGameOver(false);
    setGameStarted(true);
    setSelectedCard(null);
    setSelectedDangerCard(null);
    setTargetPlayer(null);
    setActionLog([{ text: 'Game started!', timestamp: new Date() }]);
  };

  // Add to action log
  const addToLog = (text) => {
    setActionLog(prev => [...prev, { text, timestamp: new Date() }]);
  };

  // Draw a card
  const drawCard = () => {
    if (deck.length === 0) {
      endGame();
      return;
    }
    
    const newDeck = [...deck];
    const drawnCard = newDeck.pop();
    
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].hand.push(drawnCard);
    
    setDeck(newDeck);
    setPlayers(newPlayers);
    addToLog(`${players[currentPlayerIndex].name} drew a card`);
  };

  // Start player turn (draw card if not skipping)
  const startPlayerTurn = () => {
    const currentPlayer = players[currentPlayerIndex];
    
    if(deck.length===0){
        endGame();
    }
    if (!currentPlayer.skipTurn && deck.length > 0) {
      drawCard();
    }
  };

  // Select a card from hand
  const selectCard = (cardIndex) => {
    const card = players[currentPlayerIndex].hand[cardIndex];
    setSelectedCard({ index: cardIndex, card });
    setSelectedDangerCard(null); // Reset danger card selection
    
    // For problem cards, need to select target player
    if (problemCards.some(p => p.id === card.id)) {
      // Default to next player as target
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setTargetPlayer(players[nextPlayerIndex]);
    } else {
      setTargetPlayer(null);
    }
  };

  // Play the selected card
  const playSelectedCard = () => {
    if (!selectedCard) return;
    
    const currentPlayer = players[currentPlayerIndex];
    const card = selectedCard.card;
    
    if (currentPlayer.skipTurn) {
      addToLog(`${currentPlayer.name} tried to play but must skip turn!`);
      setSelectedCard(null);
      setSelectedDangerCard(null);
      return;
    }
    
    // Handle different card types
    if (goodPracticesCards.some(c => c.id === card.id)) {
      // Good practice card - can be used to eliminate danger
      const dangerIndex = currentPlayer.hand.findIndex(c => 
        dangerCards.some(d => d.id === c.id)
      );
      
      if (dangerIndex >= 0) {
        // Eliminate danger and gain +3 points
        const newPlayers = [...players];
        newPlayers[currentPlayerIndex].hand.splice(dangerIndex, 1);
        newPlayers[currentPlayerIndex].hand.splice(selectedCard.index, 1);
        newPlayers[currentPlayerIndex].score += 3;
        setPlayers(newPlayers);
        addToLog(`${currentPlayer.name} used ${card.name} to eliminate a danger and gained +3 points!`);
      } else {
        addToLog(`${currentPlayer.name} has no danger cards to eliminate with ${card.name}`);
        setSelectedCard(null);
        return;
      }
    } else if (jokerCards.some(j => j.id === card.id)) {
      // Joker card - can eliminate any danger
      const dangerCardsInHand = currentPlayer.hand.filter(c => 
        dangerCards.some(d => d.id === c.id)
      );
      
      if (dangerCardsInHand.length > 0) {
        if (!selectedDangerCard) {
          // Show danger card selection if not already selected
          addToLog(`${currentPlayer.name} must select a danger card to eliminate with JOKER`);
          return;
        }
        
        const dangerIndex = currentPlayer.hand.findIndex(c => c.id === selectedDangerCard.id);
        if (dangerIndex >= 0) {
          const newPlayers = [...players];
          newPlayers[currentPlayerIndex].hand.splice(dangerIndex, 1);
          newPlayers[currentPlayerIndex].hand.splice(selectedCard.index, 1);
          newPlayers[currentPlayerIndex].score += 3;
          setPlayers(newPlayers);
          addToLog(`${currentPlayer.name} used a JOKER to eliminate ${selectedDangerCard.name} and gained +3 points!`);
          setSelectedDangerCard(null);
        }
      } else {
        addToLog(`${currentPlayer.name} has no danger cards to eliminate with JOKER`);
        setSelectedCard(null);
        setSelectedDangerCard(null);
        return;
      }
    } else if (problemCards.some(p => p.id === card.id)) {
      // Problem card - target another player
      if (!targetPlayer) return;
      
      const otherPlayerIndex = players.findIndex(p => p.id === targetPlayer.id);
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].hand.splice(selectedCard.index, 1);
      newPlayers[otherPlayerIndex].skipTurn = true;
      setPlayers(newPlayers);
      addToLog(`${currentPlayer.name} played ${card.name} on ${targetPlayer.name} who must skip their next turn!`);
    } else {
      // Danger card or other - can't be played directly
      addToLog(`${currentPlayer.name} cannot play ${card.name} directly`);
      setSelectedCard(null);
      setSelectedDangerCard(null);
      return;
    }
    
    // End turn
    endTurn();
  };

  // End current player's turn
  const endTurn = () => {
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].isActive = false;
    newPlayers[currentPlayerIndex].skipTurn = false;
    
    // Move to next player (skip players who need to skip turn)
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    while (newPlayers[nextPlayerIndex].skipTurn) {
      newPlayers[nextPlayerIndex].skipTurn = false;
      addToLog(`${newPlayers[nextPlayerIndex].name}'s skip turn was consumed`);
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
    
    newPlayers[nextPlayerIndex].isActive = true;
    
    setPlayers(newPlayers);
    setCurrentPlayerIndex(nextPlayerIndex);
    setSelectedCard(null);
    setSelectedDangerCard(null);
    setTargetPlayer(null);
    
  };

  // End the game
  const endGame = () => {
    // Calculate final scores
    const newPlayers = players.map(player => {
      const handScore = player.hand.reduce((sum, card) => {
        if (goodPracticesCards.some(c => c.id === card.id)) {
          return sum + card.value;
        } else if (dangerCards.some(d => d.id === card.id)) {
          return sum + card.value;
        }
        return sum;
      }, 0);
      
      return {
        ...player,
        score: player.score + handScore
      };
    });
    
    setPlayers(newPlayers);
    setGameOver(true);
    addToLog(`Game over! Final scores: ${newPlayers.map(p => `${p.name}: ${p.score}`).join(', ')}`);
  };

  // Skip turn
  const skipTurn = () => {
    addToLog(`${players[currentPlayerIndex].name} skips their turn`);
    endTurn();
  };

  // Start player's turn when it's their turn
  useEffect(() => {
    if (gameStarted && !gameOver) {
      startPlayerTurn();
    }
  }, [currentPlayerIndex, gameStarted, gameOver]);

  return (
    <div className="gmp-game">
      <h1>Good Manufacturing Practices (GMP) Card Game</h1>
      <h2>Pharmaceutical Quality Management Simulation</h2>
      
      {!gameStarted ? (
        <div className="game-start">
          <div className="game-description">
            <p>Quality managers compete to implement best practices while avoiding dangers in a pharmaceutical facility.</p>
            <h3>Game Rules:</h3>
            <ul>
              <li>Use Good Practice cards to eliminate Danger cards (+3 points)</li>
              <li>Jokers can eliminate any Danger card</li>
              <li>Problem cards make opponents skip their turn</li>
              <li>Game ends when deck is empty</li>
              <li>Final score = card values + elimination bonuses</li>
            </ul>
          </div>
          
          <div className="player-setup">
            <div className="num-players">
              <label>Number of Players (2-4):</label>
              <select 
                value={numPlayers} 
                onChange={(e) => setNumPlayers(parseInt(e.target.value))}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            
            <div className="player-names">
              {Array.from({ length: numPlayers }).map((_, i) => (
                <div key={i} className="player-name-input">
                  <label>Player {i + 1} Name:</label>
                  <input
                    type="text"
                    value={playerNames[i] || ''}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder={`Responsable Qualité ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <button onClick={initializeGame}>Start Game</button>
          </div>
        </div>
      ) : (
        <div className="game-board">
          <div className="game-info">
            <p>Cards remaining: {deck.length} | Current turn: {players[currentPlayerIndex].name}</p>
            {gameOver && <h2 className="game-over">Game Over!</h2>}
          </div>
          
          <div className="players-container">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className={`player ${player.isActive ? 'active' : ''} ${targetPlayer?.id === player.id ? 'target' : ''}`}
                onClick={() => selectedCard?.card && problemCards.some(p => p.id === selectedCard.card.id) && setTargetPlayer(player)}
              >
                <h3>{player.name}</h3>
                <p className="score">Score: {player.score}</p>
                {player.skipTurn && <p className="skip-turn">Must skip turn!</p>}
                
                <div className="hand">
                  <h4>Hand ({player.hand.length} cards):</h4>
                  <div className="cards">
                    {player.hand.map((card, cardIndex) => (
                      <div 
                        key={cardIndex} 
                        className={`card ${
                          goodPracticesCards.some(c => c.id === card.id) ? 'good-practice' :
                          dangerCards.some(d => d.id === card.id) ? 'danger' :
                          problemCards.some(p => p.id === card.id) ? 'problem' : 'joker'
                        } ${selectedCard?.index === cardIndex && index === currentPlayerIndex ? 'selected' : ''}`}
                        onClick={() => index === currentPlayerIndex && !gameOver && selectCard(cardIndex)}
                      >
                        <img src={card.img} alt={card.name} className="card-image" />
                        <div className="card-info">
                          <h5>{card.name}</h5>
                          {(goodPracticesCards.some(c => c.id === card.id) || dangerCards.some(d => d.id === card.id)) && (
                            <span className={`value ${goodPracticesCards.some(c => c.id === card.id) ? 'positive' : 'negative'}`}>
                              {goodPracticesCards.some(c => c.id === card.id) ? '+' : ''}{card.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedCard && (
            <div className="selected-card-actions">
              <h3>Selected: {selectedCard.card.name}</h3>
              
              {/* Danger card selection for Joker */}
              {jokerCards.some(j => j.id === selectedCard.card.id) && (
                <div className="danger-selection">
                  <p>Select Danger Card to Eliminate:</p>
                  <div className="danger-options">
                    {players[currentPlayerIndex].hand
                      .filter(card => dangerCards.some(d => d.id === card.id))
                      .map((card, index) => (
                        <div
                          key={index}
                          className={`danger-card ${selectedDangerCard?.id === card.id ? 'selected' : ''}`}
                          onClick={() => setSelectedDangerCard(card)}
                        >
                          <img src={card.img} alt={card.name} className="card-image" />
                          <div className="card-info">
                            <h5>{card.name}</h5>
                            <span className="value negative">{card.value}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Target player selection for problem cards */}
              {targetPlayer && (
                <div className="target-selection">
                  <p>Target Player:</p>
                  <div className="target-options">
                    {players.filter(p => p.id !== players[currentPlayerIndex].id).map(player => (
                      <button
                        key={player.id}
                        className={targetPlayer.id === player.id ? 'selected' : ''}
                        onClick={() => setTargetPlayer(player)}
                      >
                        {player.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                onClick={playSelectedCard}
                disabled={jokerCards.some(j => j.id === selectedCard.card.id) && !selectedDangerCard}
              >
                Play This Card
              </button>
              <button onClick={() => {
                setSelectedCard(null);
                setSelectedDangerCard(null);
              }}>
                Cancel
              </button>
            </div>
          )}
          
          {!gameOver && !selectedCard && (
            <div className="game-controls">
              <button onClick={skipTurn}>
                Skip Turn
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="game-results">
              <h2>Final Scores:</h2>
              {players.map(player => (
                <p key={player.id} className="final-score">
                  {player.name}: <strong>{player.score}</strong> points
                </p>
              ))}
              <button onClick={initializeGame}>Play Again</button>
            </div>
          )}
          
          <div className="action-log">
            <h3>Game Log:</h3>
            <div className="log-entries">
              {actionLog.slice().reverse().map((entry, index) => (
                <p key={index} className="log-entry">
                  [{entry.timestamp.toLocaleTimeString()}] {entry.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GMPGame;