import React from 'react';
import './styles.css'

function Card({ id, url, onClick }) {
    return (
        <div className="card" onClick={() => onClick(id)}>
            <img src={url} alt="Memory Card" className="card-image"/>
        </div>
    );
}

export default Card;
