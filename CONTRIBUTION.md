Let's jump directly into the main part/.

## **How to Contribute**
Want to share your Quira experience on the **Voices Wall**? Here’s how to add your own story or tweet:

### **1. Locate the `tweets.json` file**

You can find it in any of these ways:

* Search for `tweets.json` in the project files.
* Navigate manually:
  `public > data > tweets.json`
* Or click here to open it directly → [tweets.json](https://github.com/RS-labhub/quira-voices/blob/master/public/data/tweets.json)

&nbsp;

### **2 (A). Add your entry**

At the end of the `tweets.json` file, copy and paste this template:

```json
{
  "id": "q-0xx",
  "name": "your-name",
  "username": "your-username",
  "avatarUrl": "/your-username.png?height=64&width=64",
  "tweet": "your first tweet in the thread",
  "createdAt": "2025-xx-yyT07:40:00.000Z",
  "verified": false,
  "role": "Community Member",
  "link": "replace_with_your_tweet_url",
  "tags": ["open-source contributor"],
  "images": []
}
```

### **2 (B). For longer stories (threads)**

If your post is more than one tweet long, use this **thread format** instead:

```json
{
  "id": "q-0xx",
  "name": "your-name",
  "username": "your-username",
  "avatarUrl": "/your-username.png?height=64&width=64",
  "tweet": "your first tweet in the thread",
  "createdAt": "2025-xx-yyT07:40:00.000Z",
  "verified": false,
  "role": "Community Member",
  "link": "replace_with_your_tweet_url",
  "tags": ["open-source contributor"],
  "images": [],
  "thread": [
    {
      "id": "q-0xx-1",
      "tweet": "tweet 1"
    },
    {
      "id": "q-0xx-2",
      "tweet": "tweet 2"
    }
  ]
}
```

&nbsp;

### **3. Add your avatar**

* Place your avatar image in the [`public`](https://github.com/RS-labhub/Radhika/blob/master/public/) folder of the repository.
* Use the file path in your `avatarUrl` field, e.g.:

  ```
  "/your-twitter-x-username.png?height=64&width=64"
  ```
* **If you don’t want to upload an avatar**, set `avatarUrl` to:

  ```
  "/default-avatar.png?height=64&width=64"
  ```

&nbsp;

## **How to Contribute to a `JSON` file Without Breaking It**

### **1. Understand the JSON structure**

* The file is basically a **list of entries** (inside square brackets `[]`).
* Each entry is wrapped in `{ ... }` curly braces.
* Entries are **separated by commas**, except the **last one** in the file.
* **Don’t remove or change** other people’s entries.

Example simplified structure:

```json
[
  { "id": "q-001", "name": "Alice" },
  { "id": "q-002", "name": "Bob" }
]
```

&nbsp;

### **2. Adding your own entry**

* Scroll to the **very bottom** of the file, just **before the closing `]`**.
* If the last entry **does not** have a comma at the end, **add one** before inserting yours.
* Paste your template (either the single tweet or thread version).

&nbsp;

That’s it! Once your pull request is merged, your message will appear on the Quira Voices page for everyone to see. 🌠
