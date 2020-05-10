with import <nixpkgs> {};

mkShell {
  buildInputs = [
    nodejs-12_x
    (yarn.override { nodejs = nodejs-12_x; })
    python
    bluez # Provides libbluetooth-dev
  ];
}
