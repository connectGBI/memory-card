import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';    // Card component

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  const fetchAndShuffleCards = async () => {
    const apiKey = 'F981o2gElB7QcQB540hUdYXfUPqCuhiV';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=12`;

    try {
      const response = await axios.get(url);
      const fetchedCards = response.data.data.map(img => ({
        id: img.id,
        url: img.images.original.url,
        clicked: false
      }));
      // Shuffle cards
      const shuffledCards = fetchedCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchAndShuffleCards();
  }, []);

  useEffect(() => {
    let interval;
    if (gameActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!gameActive && time !== 0) {
      clearInterval(interval);
      setTime(0); // Reset time after game stops
    }
    return () => clearInterval(interval);
  }, [gameActive, time]);

  const handleCardClick = (id) => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameActive(true); // Start the clock
    }
  
    // Shuffle cards whether or not the card has been previously clicked
    setCards(currentCards => shuffleCards(currentCards));

    if (clickedIds.includes(id)) {
      // Check for new best score before resetting the game
      if (score > bestScore || score === bestScore) {
        setBestScore(score);
        if (bestTime === null || time < bestTime) {
            setBestTime(time);
        };
      }
  
      // Reset game since the card was already clicked
      setClickedIds([]);
      setScore(0);
      setGameStarted(false); // Optionally stop the game
      setGameActive(false);
    } else {
      // Add card to the list of clicked IDs and increment score
      setClickedIds([...clickedIds, id]);
      setScore(score + 1);
    }
  };
  
  // Function to shuffle cards
  const shuffleCards = cards => {
    return cards.sort(() => Math.random() - 0.5);
  };
  

  return (
    <div>
      <div className="cards-container">
        {cards.map(card => (
          <Card key={card.id} onClick={() => handleCardClick(card.id)} {...card} />
        ))}
      </div>
      <p>Score: {score} | Best Score: {bestScore}</p>
      <p>Time: {time}s | Best Time: {bestTime ? `${bestTime}s` : 'N/A'}</p>
    </div>
  );
}

export default MemoryGame;
