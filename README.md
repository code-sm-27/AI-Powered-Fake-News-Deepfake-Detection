# AI-Powered Fake News & Deepfake Detection

## Overview
This project aims to address the growing challenges of misinformation and digital media manipulation. By leveraging advanced AI techniques and blockchain technology, the system provides tools for real-time credibility scoring, deepfake detection, and crowdsourced reporting of news articles and videos.

---

## Features
1. **Real-Time Credibility Scoring for News Articles**
   - Uses NLP techniques and APIs to evaluate the credibility of news articles.
   - Sentiment analysis and named entity recognition to extract key details.
   - Google Fact Check API for fact-check verification.

2. **AI-Driven Deepfake Video Analysis**
   - Detects manipulated video content using pre-trained models like Xception.
   - Processes video frames to distinguish between real and fake videos.

3. **Blockchain-Based Verification for News Sources**
   - Verifies and stores metadata of news sources on the blockchain.
   - Smart contract functionality for transparent verification.

4. **Crowdsourced Reporting and Verification Mechanisms**
   - A web interface to allow users to submit, flag, and verify news articles.
   - Reputation and trust score system for contributors.

---

## Technologies Used
### **Frontend**
- **React.js**: For the web-based user interface.
- **Lucide Icons**: For modern, lightweight icons.
- **TypeScript**: Ensures type safety in the frontend code.

### **Backend**
- **Flask**: For API development and integration.
- **MongoDB**: A NoSQL database to store user submissions and verification statuses.

### **AI Models**
- **Xception (TensorFlow/Keras)**: Pre-trained model for deepfake detection.
- **SpaCy**: For named entity recognition.
- **TextBlob**: For sentiment analysis.
- **Sumy**: For summarizing text content.

### **Blockchain**
- **Solidity**: Smart contracts for storing news source verification data.
- **Web3.js**: Interacts with the Ethereum blockchain.
- **Truffle**: Manages and deploys smart contracts.

### **Other Tools**
- **OpenCV**: For video frame extraction and preprocessing.
- **Google Fact Check API**: For validating claims in articles.

---

## Installation
### Prerequisites
1. Python 3.8+
2. Node.js and npm
3. MongoDB
4. Truffle Suite (for blockchain development)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/code-sm-27/AI-Powered-Fake-News-Deepfake-Detection.git
   cd AI-Powered-Fake-News-Deepfake-Detection
   ```
2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   flask run
   ```
3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Blockchain Deployment**:
   - Navigate to the `blockchain` folder.
   - Compile and deploy smart contracts using Truffle:
     ```bash
     truffle compile
     truffle migrate
     ```

---

## Usage
1. Access the web interface at `http://localhost:3000`.
2. Submit articles or videos for analysis.
3. View credibility scores and deepfake detection results.
4. Verify or flag submitted content using the crowdsourced reporting mechanism.

---

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---
