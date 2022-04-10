## Deploy to blockchain

```sh
solana config set --url devnet
```

Make sure you're on devnet.

```sh
solana config get
```

```sh
anchor build
```

Get the new program id.

```sh
solana address -k target/deploy/solana-keypair.json
```

Update Anchor.toml and lib.rs w/ new program id.
Make sure Anchor.toml is on devnet.

Build again.

```sh
anchor build
```
