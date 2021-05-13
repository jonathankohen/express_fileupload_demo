import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import FileUpload from './components/FileUpload';

function App() {
    return (
        <div className="container mt-4">
            <h4 className="display-4 text-center mb-4">
                <FontAwesomeIcon icon={faFile} /> File Upload
            </h4>

            <FileUpload />
        </div>
    );
}

export default App;
