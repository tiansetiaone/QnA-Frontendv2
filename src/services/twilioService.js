const sendMessage = async (message) => {
    try {
        const response = await fetch('/twilio/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Body: message, From: 'whatsapp:+62...' }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export default sendMessage;
