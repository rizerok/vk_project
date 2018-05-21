export default  (html,state,manifest,helmet)=>`
    <!doctype html>
    <html>
      <head>
        <title>React isomorphic app</title>
        <link rel="stylesheet" href="${manifest['app.css']}">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\\\\u003c')}
        </script>
        <script src=${manifest['vendors.js']}></script>
        <script src=${manifest['app.js']}></script>
      </body>
    </html>
`;