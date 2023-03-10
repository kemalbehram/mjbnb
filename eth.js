
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/")

const addressReceiver = '0x9b37f7e772690AC9653bB49270983B5064f3489D' //wallet 2

const privateKeys = ["6226e07fe7576c0601db9a99b8d09d8c41906a43cc743ef3761737da464ea400"] //wallet 1

//KENI proof
const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.000110");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with BNB");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();
