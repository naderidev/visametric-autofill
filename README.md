# Vismetric  autofill
a script for fast auto fill visametric appointment form

## setup
fill this list with your own information:
```js
const VA_CONFIG = {
    'city': 0,
    'office': 0,
    'officeType': 0,
    'card': {
        'number': '**********',
        'date': '0000/00/00'
    },
    'sheba': {
        'number': '***********************',
        'holderName': '*******' // in persian
    },
    'persons': [
        {
            'name': '*****',
            'surname': '*****',
            'birthDate': [
                '0000', // Year
                '00', // Month
                '00' // Day
            ],
            'passport': '**********',
            'phone': '**********',
            'email': '******@gmail.com'
        },
        {
            'name': '*****',
            'surname': '*****',
            'birthDate': [
                '0000', // Year
                '00', // Month
                '00' // Day
            ],
            'passport': '*******',
            'phone': '*********',
            'email': '******@gmail.com'
        },
    ]
}
var script = document.createElement('script')
script.src = 'https://cdn.jsdelivr.net/gh/naderidev/visametric-autofill/plugin.js'
script.type = 'text/javascript'
document.body.appendChild(script)
```
then install an extension for injecting javascript into page for your browser.
-  for chrome ```Custom JavaScript for Websites 2``` is good.

then copy the whole this code and paste that in the code section of that extension and apply it to page.

> or if you don't want to use any extensions you can just copy the code and go to the appointment form page and paste it in console section.


Hope to enjoy :)
