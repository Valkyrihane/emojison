# emojison
npm package letting you access any base64 emoji image from https://unicode.org/emoji/charts/full-emoji-list.html.

The goal of this package is to provide an easy access to ALL existing emoji images, while being able to choose the emoji style with its service, Twitter, Apple, Google, ...

The downside to the easy access is that all images are stored into json files that can get pretty heavy (a few MB), which is why it is encouraged to load only the service you will use in your app, thus loading less data in RAM.

## Usage

```bash
npm install --save emojison
```

```js
const Emojison = require('emojison');

const e = new Emojison('appl');

e.currentService(); // check chosen service, appl in this case

e.getData(); // get the json file data

e.getEmoji('grinning face'); // get an object with base64 src, index, codes
                            // and utf-8 version on the emoji

e.getEmojiSrc('face with tongue'); // directly return the base64 source
                                  // empty string if there is no src for the chosen service

e.getEmojiSrc('grinning face', 'appl'); // return the apple style grinning face emoji source
```

## API

### Constructor
Take the service name as parameter, defaults to `goog` and can take `all` or `emoji` to load all services images at once.
```js
new Emojison(); // load goog.json file

new Emojison('kddi'); // load kddi.json file

new Emojison('all'); // load emoji.json file, with all services images
new Emojison('emoji'); // same as above
```

### currentService()
Returns the currently loaded service
```js
const e = new Emojison();
e.currentService(); // returns 'goog'
```

### getData()
Returns the loaded json file object. Data layout can be found [here](https://github.com/Valkyrihane/emoji-scrapper).
```js
const e = new Emojison();
e.getData(); // returns a big object
```

### getEmoji(emojiName)
Returns the emoji object associated to the name, `undefined` if no entry is found
```js
const e = new Emojison();
e.getEmoji('grinning face'); // { src: 'data:image/png...', codes: [...], ... }
e.getEmoji('my new emoji'); // undefined
```

### getEmojiSrc(emojiName, serviceName)
Returns the image src of the selected service. If `all` or `emoji` was chosen as an initial service, the second parameter will let you chose between the emoji different images. An empty string will be returned if the service does not support the emoji.
```js
const e = new Emojison('appl');
e.getEmoji('my new emoji') // undefined
e.getEmoji('grinning face') // 'data:image/png;base64...' apple style
e.getEmoji('grinning face', 'goog') // second parameter is ignored

const j = new Emojison('all');
j.getEmoji('grinning face') // { goog: 'base64image', appl: 'base64image', ... }
j.getEmoji('grinning face', 'goog') // 'data:image/png;base64...' google style
```

For more info about supported services and emoji name list, please check https://unicode.org/emoji/charts/full-emoji-list.html, https://unicode.org/emoji/format.html#col-vendor, or https://github.com/Valkyrihane/emoji-scrapper.

Note that all emoji and service names are lowercase versions of those seen in the previous links.

## Troubleshooting

For data troubleshooting, please file an issue on the [scrapping repo](https://github.com/Valkyrihane/emoji-scrapper). Otherwise, feel free to create an issue on this repo, I will answer it as soon as I can.

Json files come from [here](https://github.com/Valkyrihane/emoji-scrapper).

## Alternatives

https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json

https://github.com/mrowa44/emojify

https://github.com/node-modules/emoji

https://github.com/omnidan/node-emoji