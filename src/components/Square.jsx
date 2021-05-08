import React from 'react';
import './Styles.css';
export default function Square({value,revealGrid}) {
    return (
        <div className='square' onClick={revealGrid}>
            {value}
        </div>
    )
}
