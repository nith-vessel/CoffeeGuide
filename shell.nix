{ pkgs ? import <nixpkgs> { } }:
let
  mynode = pkgs.nodejs;
in
pkgs.stdenv.mkDerivation {
  name = "my-shell";
  packages = [  ];
  shellHook = "";
  buildInputs = [ mynode ];
}
