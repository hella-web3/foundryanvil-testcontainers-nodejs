export enum LogVerbosity {
  One = "-v",
  Two = "-vv",
  Three = "-vvv",
  Four = "-vvvv",
  Five = "-vvvvv",
}

export enum Hardfork {
  Frontier = "frontier",
  Homestead = "homestead",
  Dao = "dao",
  Tangerine = "tangerine",
  SpuriousDragon = "spuriousDragon",
  Byzantium = "byzantium",
  Constantinople = "constantinople",
  Petersburg = "petersburg",
  Istanbul = "istanbul",
  MuirGlacier = "muirGlacier",
  Berlin = "berlin",
  London = "london",
  ArrowGlacier = "arrowGlacier",
  GrayGlacier = "grayGlacier",
  Paris = "paris",
  Shanghai = "shanghai",
  Cancun = "cancun",
  Prague = "prague",
  Latest = "latest",
}

export enum Order {
  Fees = "fees",
  Fifo = "fifo",
}

export enum Color {
  Auto = "auto",
  Always = "always",
  Never = "never",
}

export type HexString = `0x${string}`;
