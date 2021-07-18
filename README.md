## share from mobile

For when you want to share links/text to your PC from phone.

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
