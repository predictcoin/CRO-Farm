// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.2;

import "./interfaces/IBEP20.sol";
import './utils/SafeBEP20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract MasterCRPWallet is Ownable {
    using SafeBEP20 for IBEP20;
    // The CRP TOKEN!
    IBEP20 public CRP;
    address public MasterCRP;

    constructor(
        IBEP20 _CRP
    ) {
        CRP = _CRP;
    }

    function setMasterCRP(address _MasterCRP) onlyOwner external{
        MasterCRP = _MasterCRP;
    }

    // Safe CRP transfer function, just in case if rounding error causes pool to not have enough CRPs.
    function safeCRPTransfer(address _to, uint256 _amount) public returns(uint) {
        require(msg.sender == MasterCRP || msg.sender == owner(), "Wallet: Only MasterCRP and Owner can transfer");
        uint256 CRPBal = CRP.balanceOf(address(this));
        if (_amount > CRPBal) {
            CRP.safeTransfer(_to, CRPBal);
            return CRPBal;
        } else {
            CRP.safeTransfer(_to, _amount);
            return _amount;
        }
    }
}