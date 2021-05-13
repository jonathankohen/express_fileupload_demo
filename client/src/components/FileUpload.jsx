import React, { useState } from 'react';
import axios from 'axios';

import Message from './Message';
import Progress from './Progress';

export default function FileUpload() {
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState({});
    const [message, setMessage] = useState('');
    const [percentage, setPercentage] = useState(0);

    const onChangeHandler = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    setPercentage(
                        parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    );
                },
            })
            .then(res => {
                const { file_name, file_path } = res.data;
                setUploaded({ file_name, file_path });
                setMessage('File Uploaded');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setMessage('There was a problem with the server');
                } else {
                    setMessage(err.response.data.msg);
                }
                setPercentage(0);
            });
    };

    return (
        <>
            {message && <Message msg={message} />}

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={onChangeHandler}
                    />
                </div>

                <Progress percentage={percentage} />

                <input
                    type="submit"
                    className="btn btn-primary
                    btn-block mt-4"
                    value="Submit"
                />
            </form>

            {uploaded && (
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{uploaded.file_name}</h3>
                        <img
                            src={uploaded.file_path}
                            alt=""
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
