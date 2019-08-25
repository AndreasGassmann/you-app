# You. Mobile App

## Inspiration

## What it does
You. is a password manager leveraging decentralized storage and messaging that authenticates Web 2 and Web 3 logins with your mobile device.

You. stores your data in a secure distributed cloud using the power 3box.io

All of your passwords are encrypted and unlockable by using your Ethereum Account. This means that you can recover your passwords by simply re-entering your Ethereum Account in a secure device.

The passwords are all encrypted and only unlockable by You.

You. is leveraging Biometric secure enclaves in mobile devices and turns you into your password.

## How we built it

You has 3 components:

- Mobile Application
- Chrome Extension
- Push Notifications Oracle

These three components communicate to each other using only secure 3box messaging. All persisted data is encrypted using an advanced crypto system that allows for:

- multi party sharing using Diffie Helmann
- complete recovery using Ethereum account
- secure storage of sensitive data on public context
- cuckoo filter lookups of entries
- easy change of Ethereum accounts

### Mobile Application

This is the actual password manager and the bridge between your passwords and you. Using secure enclave unlockable with biometrics the user becomes the authentication. Whenever a new login request reaches the device the user is prompted to acknowledge/approve the authentication. If the approval was positive using 3box messaging the encrypted credentials are sent to the chrome extension who will input them in the form.

### Chrome Extension

This component is responsible to detect sites that contain login fields _and_ the password manager knows a credential for. The latter is done by using a cuckoo filter which is shared from the mobile application. The chrome extension itself does never have access to all passwords, only the ones forwarded by the mobile application.

### Push Notification Oracle

This component is responsible to trigger a push notification on the mobile device. The communication with this oracle happens using 3box messaging feature. The workflow is that a Mobile Device registers a given Ethereum address with a push token. Then when a Chrome Extension gets a login request, it will forward the details to the push oracle, who will be sending a push to the mobile application.

All communication is authenticated (<3 3box) and encrypted.

## Challenges we ran into

In a decentralised world push notifications to mobile devices (iOS, Android) are currently not possible, because Apple and Google only allow these to be sent over their infrastructure. Since You. is a decentralised App (dApp) we had to make the tradeoff that centralised push notifications are used (because the offer the best UX), but a user can also manually open the app and then no pushes are required, this provides a graceful fallback to a fully decentralised app.  

## Accomplishments that we're proud of

- Secret material is stored in secure enclave (HSM) of mobile devices only unlockable by the user's biometrics. This makes **you** the authentication mechanism
- 3box API's allowed us to build a secure solution on a public storage for a use case that is very private with high security requirements
- The user disruption for login is minimal, making it an optimal tradeoff between UX and security 

## What we learned

- caching allows dApps to overcome performance short comings
- push notifications pose a serious challenge to dApp projects, however having a graceful fallback gives the user the best of both worlds
- it's the first time we used 3box <3

## What's next for You.

- Shareable password in groups
- Password request audit trails
- Support for hardware wallets (AirGap Vault, Ledger, Trezor)
- Ethereum Single Sign On
