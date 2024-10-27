import FireFly from '@hyperledger/firefly-sdk';
import * as SimpleStorage from '../../solidity/artifacts/contracts/SimpleStorage.sol/SimpleStorage.json';

import {
  SIMPLE_STORAGE_API_NAME,
  SIMPLE_STORAGE_INTERFACE_NAME,
  SIMPLE_STORAGE_INTERFACE_VERSION,
} from '../constants';

const firefly = new FireFly({
  host: 'http://localhost:5000',
  namespace: 'default',
});

const simpleStorageAddress = process.env.SIMPLESTORAGE_ADDRESS;

async function main() {
  const simpleStorageExisting = await firefly.getContractInterfaces({
    name: SIMPLE_STORAGE_API_NAME,
    version:SIMPLE_STORAGE_INTERFACE_NAME,
  });
  if (simpleStorageExisting.length === 0) {
    console.log('Creating SimpleStorage interface...');
    const simpleStorageFFI = await firefly.generateContractInterface({
      name: SIMPLE_STORAGE_API_NAME,
      version: SIMPLE_STORAGE_INTERFACE_VERSION,
      input: { abi: SimpleStorage.abi },
    });
    const result = await firefly.createContractInterface(simpleStorageFFI, {
      confirm: true,
    });
    console.log(`SimpleStorage interface = ${result.id}`);
  } else {
    console.log(`SimpleStorage interface = ${simpleStorageExisting[0].id}`);
  }

  const simpleStorageAPI = await firefly.getContractAPI(SIMPLE_STORAGE_API_NAME);
  if (simpleStorageAPI === undefined) {
    console.log('Creating Simple Storage API...');
    const api = await firefly.createContractAPI({
      name: SIMPLE_STORAGE_API_NAME,
      interface: {
        name:SIMPLE_STORAGE_INTERFACE_NAME,
        version: SIMPLE_STORAGE_INTERFACE_VERSION,
      },
      location: { address: simpleStorageAddress },
    });
    console.log(`SimpleStorage API = ${api.id}`);
  } else {
    console.log(`SimpleStorage API = ${simpleStorageAPI.id}`);
  }
  console.log('Complete');
}

main().catch((err) => {
  console.error('Error running script:', err);
});