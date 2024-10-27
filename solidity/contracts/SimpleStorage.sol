// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SimpleStorage {
   uint public storedData;

   event DataStored (
      uint data
   );

   constructor(uint initVal) public {
      storedData = initVal;
   }

   function set(uint x) public returns (uint value) {
      require(x < 100, "Value can not be over 100");
      storedData = x;

      emit DataStored(x);

      return storedData;
   }

   function get() view public returns (uint retVal) {
      return storedData;
   }

   function query() view public returns (uint retVal) {
      return storedData;
   }
}