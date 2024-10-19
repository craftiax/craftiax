import { ethers } from "hardhat";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  // Get the network from Hardhat config
  const network = await ethers.provider.getNetwork();
  console.log(`Connected to network: ${network.name} (chainId: ${network.chainId})`);

  // Get signers
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  console.log("Deploying FlareArt contract...");
  const FlareArt = await ethers.getContractFactory("FlareArt");
  const flareArt = await FlareArt.deploy();
  await flareArt.waitForDeployment();
  console.log("FlareArt deployed to:", await flareArt.getAddress());

  async function getBalance(address: string): Promise<string> {
    return ethers.formatEther(await ethers.provider.getBalance(address));
  }

  async function displayBalances() {
    console.log("Current balances:");
    console.log("Deployer:", await getBalance(deployer.address));
    console.log("Contract:", await getBalance(await flareArt.getAddress()));
    console.log("--------------------");
  }

  while (true) {
    console.log("\nChoose an action:");
    console.log("1. Send a flare");
    console.log("2. Withdraw funds (deployer only)");
    console.log("3. Display balances");
    console.log("4. Exit");

    const choice = await promptUser("Enter your choice (1-4): ");

    switch (choice) {
      case "1":
        const artId = await promptUser("Enter art ID: ");
        const artistName = await promptUser("Enter artist name: ");
        const artistAddress = await promptUser("Enter artist address: ");
        const amount = await promptUser("Enter amount to send (in ETH): ");

        try {
          if (!ethers.isAddress(artistAddress)) {
            throw new Error("Invalid artist address");
          }

          const tx = await flareArt.connect(deployer).flareArt(
            artId,
            artistName,
            "0xFB2C55a36c23eBC9AB642AF5BCdBd24Db9f7C1AA",
            { value: ethers.parseEther(amount) }
          );
          console.log("Transaction sent. Waiting for confirmation...");
          await tx.wait();
          console.log("Flare sent successfully!");
          console.log("Artist new balance:", await getBalance(artistAddress));
        } catch (error) {
          console.error("Error sending flare:", error.message);
        }
        break;

      case "2":
        try {
          const tx = await flareArt.connect(deployer).withdraw();
          console.log("Transaction sent. Waiting for confirmation...");
          await tx.wait();
          console.log("Funds withdrawn successfully!");
        } catch (error) {
          console.error("Error withdrawing funds:", error.message);
        }
        break;

      case "3":
        await displayBalances();
        break;

      case "4":
        console.log("Exiting...");
        rl.close();
        return;

      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  rl.close();
});
