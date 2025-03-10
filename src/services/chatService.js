const getChatHistory = async () => {
    const response = await fetch('/api/chat-history');
    return await response.json();
};

export default getChatHistory;
