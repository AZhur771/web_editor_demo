import React from 'react';

import styles from './styles.scss';

export interface IButtonProps {
    title: string;
    cb: () => void;
};

const Button: React.FC<IButtonProps> = ({ title, cb }) => {
    return (
        <div className={styles.button}>
            <button onClick={() => cb()}>
                {title}
            </button>
        </div>
    );
};

export default Button;
