// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewsVerification {

    struct NewsSource {
        string name;
        string url;
        bool isVerified;
    }

    mapping(address => NewsSource[]) public userNewsSources;

    // Add a news source for the sender (user)
    function addNewsSource(string memory _name, string memory _url) public {
        userNewsSources[msg.sender].push(NewsSource({
            name: _name,
            url: _url,
            isVerified: false
        }));
    }

    // Verify a specific news source by user address and index
    function verifyNewsSource(address user, uint index) public {
        userNewsSources[user][index].isVerified = true;
    }

    // Unverify a specific news source by user address and index
    function unverifyNewsSource(address user, uint index) public {
        userNewsSources[user][index].isVerified = false;
    }

    // Retrieve news source details for a user
    function getNewsSource(address user, uint index) public view returns (string memory, string memory, bool) {
        NewsSource memory news = userNewsSources[user][index];
        return (news.name, news.url, news.isVerified);
    }
}
