import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function QrCode() {
    const [userInfo, setUserInfo] = useState('');
    const [qrCodeData, setQRCodeData] = useState('');

    const handleChange = (event) => {
        setUserInfo(event.target.value);
    };

    const generateQRCode = () => {
        setQRCodeData(userInfo);
    };
    return (
        <div>
            <input
                type="text"
                value={userInfo}
                onChange={handleChange}
                placeholder="Enter user information"
            />
            <button onClick={generateQRCode}>Generate QR Code</button>
            {qrCodeData && (
                <div>
                    <QRCode value={qrCodeData} />
                </div>
            )}
        </div>
    );
}

export default QrCode
