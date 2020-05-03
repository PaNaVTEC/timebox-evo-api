let pkgs = import <nixpkgs> {};

  buildNodejs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> {};

  # https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/web/nodejs/v10.nix
  nodejs-10 = buildNodejs {
    enableNpm = true;
    version = "10.20.1";
    sha256 = "14pljmfr0dkj6y63j0qzj173kdpbbs4v1g4v56hyv2k09jh8h7zf";
  };

in pkgs.mkShell rec {
  name = "webdev";

  buildInputs = with pkgs; [
    nodejs-10
    (yarn.override { nodejs = nodejs-10; })
    python
    bluez # Provides libbluetooth-dev
  ];
}
