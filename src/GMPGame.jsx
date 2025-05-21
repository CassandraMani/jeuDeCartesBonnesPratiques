import React, { useState, useEffect } from 'react';

// Import card images (you'll need to add these to your project)
import sasTransfertImg from './cards/sas_transfert.jpg';
import reparationImg from './cards/reparation.jpg';
import nettoyageImg from './cards/nettoyage.jpg';
import personnelImg from './cards/personnel.jpg';
import traitementAirImg from './cards/traitement_air.jpg';
import stockageImg from './cards/stockage.jpg';
import zonesReposImg from './cards/zones_repos.jpg';
import melangeFluxImg from './cards/melange_flux.jpg';
import insectesImg from './cards/insectes.jpg';
import humiditeImg from './cards/humidite.jpg';
import eclairageImg from './cards/eclairage.jpg';
import poussiereImg from './cards/poussiere.jpg';
import proliferationImg from './cards/proliferation.jpg';
import contaminationImg from './cards/contamination.jpg';
import inspectionImg from './cards/inspection.jpg';
import conflitImg from './cards/conflit.jpg';
import volImg from './cards/vol.jpg';
import jokerImg from './cards/joker.jpg';
import enregistrementNonControlImg from './cards/enregistrement_non_controle.jpg';
import enregistrementTemperatureImg from './cards/enregistrement_temp.jpg';
import preventionParasitaireImg from './cards/prevention_parasit.jpg';
import riskImg from './cards/risque_erreur_lot.jpg';



//Importing the css
import "./GMPGame.css"

const GMPGame = () => {
  // Define card types with image references
  const goodPracticesCards = [
    { id: 1, match:[101,110], name: 'Sas de transfert', value: 2, img: sasTransfertImg },
    { id: 2, match:[102,111], name: 'Nettoyage', value: 2, img: nettoyageImg },
    { id: 3, match:[103,112], name: 'Personnel bien défini', value: 1, img: personnelImg },
    { id: 4, match:[104,113], name: 'Réparation et entretien', value: 1, img: reparationImg },
    { id: 5, match:[105,114], name: "Traitement de l'air et de la ventilation", value: 1, img: traitementAirImg },
    { id: 6, match:[106,115], name: 'Stockage', value: 1, img: stockageImg },
    { id: 7, match:[107,116], name: 'Zones de repos/restauration séparées', value: 2, img: zonesReposImg },
    { id: 8, match:[108,117], name: 'Enregistrement de température', value: 1, img: enregistrementTemperatureImg },
    { id: 9, match:[109,118], name: 'Prévention parasitaire', value: 1, img: preventionParasitaireImg },

    { id: 10, match:[101,110], name: 'Sas de transfert', value: 2, img: sasTransfertImg },
    { id: 11, match:[102,111], name: 'Nettoyage', value: 2, img: nettoyageImg },
    { id: 12, match:[103,112], name: 'Personnel bien défini', value: 1, img: personnelImg },
    { id: 13, match:[104,113], name: 'Réparation et entretien', value: 1, img: reparationImg },
    { id: 14, match:[105,114], name: "Traitement de l'air et de la ventilation", value: 1, img: traitementAirImg },
    { id: 15, match:[106,115], name: 'Stockage', value: 1, img: stockageImg },
    { id: 16, match:[107,116], name: 'Zones de repos/restauration séparées', value: 2, img: zonesReposImg },
    { id: 17, match:[108,117], name: 'Enregistrement de température', value: 1, img: enregistrementTemperatureImg },
    { id: 18, match:[109,118], name: 'Prévention parasitaire', value: 1, img: preventionParasitaireImg },
    
  ];

  const dangerCards = [
    { id: 101, match:[1,10], name: 'Contamination croisée', value: -1, img: contaminationImg },
    { id: 102, match:[2,11], name: 'Poussière en suspension', value: -2, img: poussiereImg },
    { id: 103, match:[3,12], name: 'Mélange de flux', value: -2, img: melangeFluxImg },
    { id: 104, match:[4,13], name: 'Mauvais éclairage', value: -1, img: eclairageImg },
    { id: 105, match:[5,14], name: 'Humidité', value: -1, img: humiditeImg },
    { id: 106, match:[6,15], name: "Risque d'erreur de lot", value: -1, img: riskImg },
    { id: 107, match:[7,16], name: 'Prolifération microbienne', value: -1, img: proliferationImg },
    { id: 108, match:[8,17], name: 'Enregistrement non contrôlé', value: -2, img: enregistrementNonControlImg },
    { id: 109, match:[9,18], name: 'Entrée insecte et animaux', value: -2, img: insectesImg },

    { id: 110, match:[1,10], name: 'Contamination croisée', value: -1, img: contaminationImg },
    { id: 111, match:[2,11], name: 'Poussière en suspension', value: -2, img: poussiereImg },
    { id: 112, match:[3,12], name: 'Mélange de flux', value: -2, img: melangeFluxImg },
    { id: 113, match:[4,13], name: 'Mauvais éclairage', value: -1, img: eclairageImg },
    { id: 114, match:[5,14], name: 'Humidité', value: -1, img: humiditeImg },
    { id: 115, match:[6,15], name: "Risque d'erreur de lot", value: -1, img: riskImg },
    { id: 116, match:[7,16], name: 'Prolifération microbienne', value: -1, img: proliferationImg },
    { id: 117, match:[8,17], name: 'Enregistrement non contrôlé', value: -2, img: enregistrementNonControlImg },
    { id: 118, match:[9,18], name: 'Entrée insecte et animaux', value: -2, img: insectesImg },
  ];

  const problemCards = [
    { id: 200, name: 'Inspection surprise', img: inspectionImg },
    { id: 201, name: "Conflit d'équipe", img: conflitImg },
    { id: 202, name: 'Vol de matériel', img: volImg },

    { id: 203, name: 'Inspection surprise', img: inspectionImg },
    { id: 204, name: "Conflit d'équipe", img: conflitImg },
    { id: 205, name: 'Vol de matériel', img: volImg }
  ];

  const jokerCards = [
    { id: 250, name: 'Joker', img: jokerImg },
    { id: 251, name: 'Joker', img: jokerImg },
    { id: 252, name: 'Joker', img: jokerImg },
    { id: 253, name: 'Joker', img: jokerImg },
    { id: 254, name: 'Joker', img: jokerImg },
    { id: 255, name: 'Joker', img: jokerImg }
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
    setActionLog([{ text: 'Le jeu a commencé', timestamp: new Date() }]);
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
    addToLog(`${players[currentPlayerIndex].name} a pioché une carte`);
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
      addToLog(`${currentPlayer.name} a essayé de jouer mais doit passer son tour !`);
      setSelectedCard(null);
      setSelectedDangerCard(null);
      return;
    }
    
    // Handle different card types
    if (goodPracticesCards.some(c => c.id === card.id)) {
      // Good practice card - can be used to eliminate its corresponding danger card
      const matchingGoodCard = goodPracticesCards.find(c => c.id === card.id);
      const matchingDangerIds = matchingGoodCard?.match || [];
      
      // Find index of matching danger card in player's hand
       const dangerIndex = currentPlayer.hand.findIndex(c => matchingDangerIds.includes(c.id));

      if (dangerIndex >= 0) {
        // Eliminate danger and gain +3 points
        const newPlayers = [...players];
        const eliminatedDangerCard = currentPlayer.hand[dangerIndex];
        newPlayers[currentPlayerIndex].hand.splice(dangerIndex, 1);
        newPlayers[currentPlayerIndex].hand.splice(selectedCard.index, 1);
        newPlayers[currentPlayerIndex].score += 3;
        setPlayers(newPlayers);
        addToLog(`${currentPlayer.name} a utilisé ${card.name} pour éliminer un danger "${eliminatedDangerCard.name}" et a gagné +3 points !`);
      } else {
        addToLog(`${currentPlayer.name} n'a pas de carte danger à éliminer avec ${card.name}`);
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
          addToLog(`${currentPlayer.name} doit sélectionner une carte danger à éliminer avec le joker`);
          return;
        }
        
        const dangerIndex = currentPlayer.hand.findIndex(c => c.id === selectedDangerCard.id);
        if (dangerIndex >= 0) {
          const newPlayers = [...players];
          newPlayers[currentPlayerIndex].hand.splice(dangerIndex, 1);
          newPlayers[currentPlayerIndex].hand.splice(selectedCard.index, 1);
          // newPlayers[currentPlayerIndex].score += 3;
          setPlayers(newPlayers);
          addToLog(`${currentPlayer.name} a utilisé un joker pour éliminer ${selectedDangerCard.name}`);
          setSelectedDangerCard(null);
        }
      } else {
        addToLog(`${currentPlayer.name} n'a pas de carte danger à éliminer avec le joker`);
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
      addToLog(`${currentPlayer.name} a joué ${card.name} sur ${targetPlayer.name} qui doit passer son prochain tour !`);
    } else {
      // Danger card or other - can't be played directly
      addToLog(`${currentPlayer.name} ne peut pas jouer ${card.name} directement`);
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
      addToLog(`Le tour sauté de ${newPlayers[nextPlayerIndex].name} a été consommé`);
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
    addToLog(`Partie terminée ! Scores finaux : ${newPlayers.map(p => `${p.name}: ${p.score}`).join(', ')}`);
  };

  // Skip turn
  const skipTurn = () => {
    addToLog(`${players[currentPlayerIndex].name} passe son tour`);
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
      <h1>Jeu de Cartes Bonnes Pratiques de Fabrication (BPF)</h1>
      <h2>Simulation de Gestion de la Qualité Pharmaceutique</h2>
      
      {!gameStarted ? (
        <div className="game-start">
          <div className="game-description">
            <p>Les responsables qualité s'affrontent pour mettre en œuvre les meilleures pratiques tout en évitant les dangers dans une installation pharmaceutique.</p>
            <h3>Règles du jeu :</h3>
            <ul>
              <li>Utilisez les cartes Bonne Pratique pour éliminer les cartes Danger (+3 points)</li>
              <li>Les Jokers peuvent éliminer n'importe quelle carte Danger</li>
              <li>Les cartes Problème font passer le tour à un adversaire</li>
              <li>La partie se termine lorsque le paquet est vide</li>
              <li>Score final = valeurs des cartes + bonus d'élimination</li>
            </ul>
          </div>
          
          <div className="player-setup">
            <div className="num-players">
              <label>Nombre de joueurs (2-4) :</label>
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
                  <label>Nom du Joueur {i + 1} :</label>
                  <input
                    type="text"
                    value={playerNames[i] || ''}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder={`Responsable Qualité ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <button onClick={initializeGame}>Démarrer la partie</button>
          </div>
        </div>
      ) : (
        <div className="game-board">
          <div className="game-info">
            <p>Cartes restantes : {deck.length} | Tour actuel : {players[currentPlayerIndex].name}</p>
            {gameOver && <h2 className="game-over">Partie terminée !</h2>}
          </div>
          
          <div className="players-container">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className={`player ${player.isActive ? 'active' : ''} ${targetPlayer?.id === player.id ? 'target' : ''}`}
                onClick={() => selectedCard?.card && problemCards.some(p => p.id === selectedCard.card.id) && setTargetPlayer(player)}
              >
                <h3>{player.name}</h3>
                <p className="score">Score : {player.score}</p>
                {player.skipTurn && <p className="skip-turn">Doit passer son tour !</p>}
                
                <div className="hand">
                  <h4>Main ({player.hand.length} cartes) :</h4>
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
              <h3>Sélectionné : {selectedCard.card.name}</h3>
              
              {/* Danger card selection for Joker */}
              {jokerCards.some(j => j.id === selectedCard.card.id) && (
                <div className="danger-selection">
                  <p>Sélectionnez une carte Danger à éliminer :</p>
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
                  <p>Joueur ciblé :</p>
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
                Jouer cette carte
              </button>
              <button onClick={() => {
                setSelectedCard(null);
                setSelectedDangerCard(null);
              }}>
                Annuler
              </button>
            </div>
          )}
          
          {!gameOver && !selectedCard && (
            <div className="game-controls">
              <button onClick={skipTurn}>
                Passer le tour
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="game-results">
              <h2>Scores finaux :</h2>
              {players.map(player => (
                <p key={player.id} className="final-score">
                  {player.name} : <strong>{player.score}</strong> points
                </p>
              ))}
              <button onClick={initializeGame}>Rejouer</button>
            </div>
          )}
          
          <div className="action-log">
            <h3>Historique du jeu :</h3>
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