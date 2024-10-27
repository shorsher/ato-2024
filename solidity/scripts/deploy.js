async function main() {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();

  const simpleStorage = await deploy('SimpleStorage', {
    from: deployer.address,
    gasLimit: 4000000,
    args: [0],
  });
  console.log(`Successfully deployed SimpleStorage to: ${simpleStorage.address}`);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});