with import <nixpkgs> {};

mkShell {
  NPM_TOKEN = "c19538f9-3fb3-468f-ba2b-a7a96a8e3dcb";
  buildInputs = [
    nodejs-12_x
    (yarn.override { nodejs = nodejs-12_x; })
    python
    bluez # Provides libbluetooth-dev
  ];
}
