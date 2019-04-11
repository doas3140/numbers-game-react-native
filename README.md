# Numbers Game

Simple strategic guessing game. Implemented using React Native.  

![alt text](https://github.com/doas3140/numbers-game-react-native/raw/master/Screenshots.png "Screenshots") 

The goal is to guess a randomly generated 4 digit number. On each guess, you get hints of how many numbers were guessed right and how many were guessed in the correct position.


## Development Set Up

1) Install NodeJS and npm
2) Install Android Studio + SDK
3) Connect your device using USB debugging
4) Run:
```
git clone https://github.com/doas3140/numbers-game-react-native.git
cd numbers-game-react-native
npm install
chmod +x android/gradlew
echo 'sdk.dir = /home/USER/Android/Sdk' > android/local.properties
react-native run-android # (sometimes needs 2 tries to work)
```

## Release Set Up (no animation lags)

5) Generate keystore:
```
cd android/app
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA \ -keysize 2048 -validity 10000
<PASSWORD>
cd ../..
```
6) Append to file `android/gradle.properties`:
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=<PASSWORD>
MYAPP_RELEASE_KEY_PASSWORD=<PASSWORD>
```
7) Run `react-native run-android --variant=release`
