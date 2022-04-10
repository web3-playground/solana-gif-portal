const anchor = require('@project-serum/anchor');

const { SystemProgram } = anchor.web3;

describe('solana', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    const program = anchor.workspace.Solana;

    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();

    let tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log('📝 Your transaction signature', tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString());

    // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
    await program.rpc.addGif('insert_a_giphy_link_here', {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    // Call the account.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString());

    // Access gif_list on the account!
    console.log('👀 GIF List', account.gifList);
  });
});
