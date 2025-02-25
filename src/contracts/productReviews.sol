// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductReview {
    struct Review {
        address reviewer;
        string content;
    }

    Review[] public reviews;

    function addReview(string memory _content) public {
        reviews.push(Review(msg.sender, _content));
    }

    function getReview(uint _index) public view returns (address, string memory) {
        require(_index < reviews.length, "Review index out of bounds.");
        Review storage review = reviews[_index];
        return (review.reviewer, review.content);
    }

    function getReviewsCount() public view returns (uint) {
        return reviews.length;
    }
}

