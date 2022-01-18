## MailTo 

#### Function
```js
      const sendMail = ( ) => {
         const mailto = `mailto:ask@me.now?subject='Test Subject'&body='Test Body'`
         window.location.href = mailto;
      }

      <button onClick={sendMail}>Send Mail</button>
```

#### Inline
```js
    <Link to='javascript:void(0)'
        onClick={() => window.location = 'mailto:ask@mew.now'}>

    </Link>
```