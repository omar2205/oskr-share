## share from mobile

For when you want to share links/text to your PC from phone.

## How to use

You need the following

1. Nodejs
2. surge.sh account
3. firebase config; use src/db.example.js

### Notes

TODO -- files

```json
"share_target": {
"action": "/share/image/",
"method": "POST",
"enctype": "multipart/form-data",
"params": {
  "files": [
    {
      "name": "file",
      "accept": ["image/*"]
    }
  ]
}
```
