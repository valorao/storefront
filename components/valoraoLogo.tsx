import React from 'react';

// Modify the props definition to include a color prop
export default function ValoraoLogo(props: { className: string; color?: string }) {
    // Define default styles with dynamic color
    const styles = {
        fill: props.color || '#FFFFFF', // Default color is white if not specified
    };

    return (
        <div className={props.className}>
            <svg viewBox="0 0 32 32" id="Camada_1" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g>
                    <path style={{ fill: styles.fill }} d="M19.8,26.1h-0.2c-2.4,0-4.8,0-7.2,0c-0.3,0-0.5-0.1-0.6-0.3c-2.5-3.2-5.1-6.3-7.6-9.5C4.1,16.1,4,16,4,15.8   c0-3.1,0-6.1,0-9.2c0-0.1,0-0.2,0.1-0.2h0.1c5.2,6.5,10.4,13,15.5,19.5c0,0,0,0.1,0.1,0.1L19.8,26.1L19.8,26.1z" />
                    <path style={{ fill: styles.fill }} d="M27.8,16.3c-0.7,0.9-1.5,1.8-2.2,2.8c-0.2,0.2-0.4,0.3-0.6,0.3c-2.4,0-4.8,0-7.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.2-0.1-0.1-0.2   c0,0,0-0.1,0.1-0.1c2.4-3,4.7-5.9,7.1-8.9c1-1.2,2-2.5,2.9-3.7c0-0.1,0.1-0.1,0.2-0.1c0,0,0.1,0,0.1,0c0,0.1,0,0.1,0,0.2   c0,3,0,6.1,0,9.1C28,16,27.9,16.2,27.8,16.3L27.8,16.3z" />
                </g>
            </svg>
        </div>
    );
}