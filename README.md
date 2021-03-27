# cpqa-Dashboard

Dashboard app for [CP9A](https://en.wikipedia.org/wiki/Mitsubishi_Lancer_Evolution).
(9 is pronounced like "q" in Japanese)

Displays car information using the MUT protocol via the OBD (OnBoard Diagnostic) connector.  
For Mitsubishi cars 1990s to 2000s.  

This app is inspired by "[Evoscan](https://evoscan.com/)".

## :sparkles:Features

- Display MUT values.

## :egg:Requirement

- [Tactrix](https://www.tactrix.com/) Openport 1.3 cable
  or compatible cable
- [FTDI Driver](https://www.ftdichip.com/FTDrivers.htm)
- Node v14 or later

## :hatching_chick:Installation

```sh
git clone https://github.com/sabiz/cpqa-dashboard.git cpqa

cd cpqa

npm ci

npm run build
```

## :hatched_chick:Getting started

1. Connect Openport 1.3 cable to Mitsubishi car

2. Run [cpqa-dashboard]

   ```shell
   node __sapper__/build
   ```

3. Open http://localhos:3000

## :chicken:FAQ

 

## License

[MIT License](LICENSE) :copyright: [sAbIz](https://github.com/sabiz):jp: