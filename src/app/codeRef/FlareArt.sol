// src/contracts/FlareArt.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlareArt {
    address public owner;
    uint256 public constant FLARE_AMOUNT = 0.001 ether;

    event FlareArtSent(uint256 artId, string artistName, address artistAddress);
    event CraftiaxFlareSent(
        uint256 artId,
        uint256 artistId,
        address artistAddress,
        address craftiaxAddress
    );

    constructor() {
        owner = msg.sender;
    }

    function flareArt(
        uint256 artId,
        string memory artistName,
        address payable artistAddress
    ) public payable {
        require(msg.value >= FLARE_AMOUNT, "Insufficient ETH sent");

        // Send the FLARE_AMOUNT to the artist
        (bool sent, ) = artistAddress.call{value: FLARE_AMOUNT}("");
        require(sent, "Failed to send ETH");

        // Refund any excess ETH to the sender
        if (msg.value > FLARE_AMOUNT) {
            (bool refundSent, ) = payable(msg.sender).call{
                value: msg.value - FLARE_AMOUNT
            }("");
            require(refundSent, "Failed to refund excess ETH");
        }

        emit FlareArtSent(artId, artistName, artistAddress);
    }

    function craftiax_flare(
        uint256 artId,
        uint256 artistId,
        address payable artistAddress,
        address payable craftiaxAddress
    ) public payable {
        require(msg.value >= FLARE_AMOUNT, "Insufficient ETH sent");

        uint256 craftiaxAmount = (FLARE_AMOUNT * 5) / 100; // 5% of FLARE_AMOUNT
        uint256 artistAmount = FLARE_AMOUNT - craftiaxAmount; // 95% of FLARE_AMOUNT

        // Send 5% to Craftiax
        (bool sentCraftiax, ) = craftiaxAddress.call{value: craftiaxAmount}("");
        require(sentCraftiax, "Failed to send ETH to Craftiax");

        // Send 95% to the artist
        (bool sentArtist, ) = artistAddress.call{value: artistAmount}("");
        require(sentArtist, "Failed to send ETH to artist");

        // Refund any excess ETH to the sender
        if (msg.value > FLARE_AMOUNT) {
            (bool refundSent, ) = payable(msg.sender).call{
                value: msg.value - FLARE_AMOUNT
            }("");
            require(refundSent, "Failed to refund excess ETH");
        }

        emit CraftiaxFlareSent(artId, artistId, artistAddress, craftiaxAddress);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
